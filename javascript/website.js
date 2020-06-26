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

