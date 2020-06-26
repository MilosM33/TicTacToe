let mobileNav = document.querySelector(".navcontainer");
let status = document.querySelector("#content h2");
let chatButton = document.querySelector("input[type=\"button\"]");
let isInQueue = false;
chatButton.addEventListener("click", function() {
    sendMessage(1, 2, document.querySelector("input[type=\"text\"]").value);
    document.querySelector("input[type=\"text\"]").value = "";

});
status.innerHTML = "";
let state = 0;
setInterval(function() {
    sendMessage(0, 2);
}, 2000)
window.onbeforeunload = function(e) {
    this.sendMessage(1, 3, 0);
};
/*  0== nothing
    1 == ai
    2 == multiplayer
*/
function ShowMobileNav() {
    mobileNav.style.display = (mobileNav.style.display == "none" ? "block" : "none")

}

function isIdle() {
    return (state == 0 ? true : false);
}

function playWithAi() {

    if (!isIdle()) {
        console.log("No idle");
        return;
    }
    state = 1;

    if (Math.random() > 0.5) {
        AiMove();
    }
    status.innerHTML = "Your turn.";

}
let findMatchInterval = undefined;

function findMatch() {
    if (isInQueue == false) {
        isInQueue = true;
        sendMessage(1, 0, 0);
        status.innerHTML = "Waiting for match...";
        findMatchInterval = setInterval(function() {
            sendMessage(0, 0, 0);

        }, 3000);

    }
}
// type 0 get
// type 1 send
//  
function sendMessage(type, state, value) {
    if (type == 0) {
        let xmlHTTPReq = new XMLHttpRequest();
        xmlHTTPReq.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                //is in queue
                if (state == 0) {
                    let answer = Array.prototype.slice.call(this.responseXML.body.children);
                    answer = answer[0].innerHTML;

                    if (answer == "login") {
                        isInQueue = false;
                        clearInterval(findMatchInterval);
                        window.location.replace("http://localhost/tictactoe/login.php");

                        console.log("Please login");
                    } else if (answer == "true") {
                        console.log("Match started");
                        status.innerHTML = "Match found!";
                        clearInterval(findMatchInterval);

                    } else if (answer == "fuck") {
                        console.log("oafoasopfafa");
                    } else {
                        console.log("Waiting for match...");
                        status.innerHTML = "Waiting for match...";
                    }
                }
                //chat history
                else if (state == 2) {
                    let chatHistory = Array.prototype.slice.call(this.responseXML.body.children);
                    chatHistory.reverse();
                    let element = document.getElementById("text");

                    for (let index = 0; index < chatHistory.length; index++) {
                        element.innerHTML = '';
                    }
                    for (let index = 0; index < chatHistory.length; index++) {
                        element.appendChild(chatHistory[index]);
                    }
                    element.scrollTo(0, element.scrollHeight);
                }
            }
        }
        xmlHTTPReq.open("get", "get.php?state=" + state, true);
        xmlHTTPReq.responseType = "document";
        xmlHTTPReq.send();
    } else {
        let xmlHTTPReq = new XMLHttpRequest();
        xmlHTTPReq.onreadystatechange = function() {

            let answer = Array.prototype.slice.call(this.responseXML.body.children);
            answer = answer[0].innerHTML;

        };
        xmlHTTPReq.open("get", "send.php?state=" + state + "&value=" + value, true);
        xmlHTTPReq.send();
    }
}