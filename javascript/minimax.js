let  table = [];
let combo =[["","",""],
            ["","",""],
            ["","",""]];

let playerTurn = true;

let playerSymbol = "X";
let aiSymbol = "0";
function init(){

      table =Array.prototype.slice.call(document.getElementsByTagName("td"));

    table.forEach(element => {
    element.addEventListener("click",function(){
        if(isIdle()){
            return;
        }
        
        let id = element.getAttribute("id")/3;
        if(playerTurn && combo[Math.trunc(id)][Math.round(((id-Math.trunc(id)))*3)] ==""){
            element.setAttribute("style"," background-color:#B36344;");
            playerTurn = true;
           
            //AI
            if(state == 1){
                combo[Math.trunc(id)][Math.round(((id-Math.trunc(id)))*3)] = "X";
                //minimax
                AiMove();

                let result =checkWin(combo);
                if(result !=-99){
                
                    console.log("Won " +result)
                    state = 0;
                    setTimeout(() => {

                        reset();
                    }, 500);
                    reDraw();
                    
                    if(result == 1){
                        status.innerHTML = "Enemy won";
                    }
                    else if(result == 1){
                        status.innerHTML = "Player won";
                    }
                    else{
                        status.innerHTML = "Draw";
                    }
                }
                
            }
            //Multiplayer
            else{
                console.log(Math.trunc(id) +"X" + Math.round(((id-Math.trunc(id)))*3)+"Y");
                reDraw();
            }

            
            
            
            
            
            
        }
    });
});
}
function AiMove(){
    status.innerHTML= "Enemy turn.";
    let eval = -Infinity;
            for (let y = 0; y < combo.length; y++) {
                for (let x = 0; x < combo[y].length; x++) {
                   if(combo[y][x] == ""){

                    temp =[combo[0].slice(),combo[1].slice(),combo[2].slice()]
                    //swap
                    temp[y][x] = aiSymbol;
                    
                    let value =minimax(temp,false,maxDepth-1);
                    //console.log(value)
                    if(value > eval){
                        eval = value;
                        bestmove = [y,x];
                    }
                   }
                }
                
            }
            status.innerHTML= "Your turn.";
            combo[bestmove[0]][bestmove[1]] = aiSymbol;
            reDraw();
}
function emptySpaces(table){
    let count = 0;
    for (let index = 0; index < table.length; index++) {
        for (let x = 0; x < table[index].length; x++) {
            
            if(table[index][x] ==""){
                count++;
            }
        }
        
    }
    return (count !=0 ? true:false);
}
function checkWin(table){
  let symbol = playerSymbol;
  
  let value = -99;
for (let index = 0; index < 2; index++) {
    if(value !=-99){
        break;
    }
    table.forEach(x=>{
        row =""
        x.forEach(y=>{
            row +=y;
        })
        if(row ==symbol+symbol+symbol){

          //  //console.log((playerSymbol == symbol ?"Player" :"Enemy") +" won")
            value= (playerSymbol == symbol ?-1:1);
        }
    })
    
    for (let x = 0; x < table.length; x++) {
        row =""
        for (let y = 0; y < table[x].length; y++) {
            row += table[y][x];
        }
        if(row ==symbol+symbol+symbol){
    
           ////console.log((playerSymbol == symbol ?"Player" :"Enemy") +" won")
           value= (playerSymbol == symbol ?-1 :1);
        }
    }
    if(table[0][0] == symbol && table[1][1] == symbol && table[2][2] == symbol){
       // //console.log((playerSymbol == symbol ?"Player" :"Enemy") +" won")
        value= (playerSymbol == symbol ?-1 :1);
    }
    else if(table[2][0] == symbol && table[1][1] == symbol && table[0][2] == symbol){
        ////console.log((playerSymbol == symbol ?"Player" :"Enemy") +" won")
        value= (playerSymbol == symbol ?-1 :1);
    }
   if(value !=-99){
       return value;
       
   }
    symbol = aiSymbol; 
}
if(!emptySpaces(table)){
    return 0;
}
return -99;
}

function reset(){
    status.innerHTML= "";
    combo =[["","",""],
            ["","",""],
            ["","",""]];

    table.forEach(element=>{element.setAttribute("style","");});
   
}
function reDraw(){
    for (let index = 0; index < table.length; index++) {
        if(!table[index].getAttribute("style")){
            let id = table[index].getAttribute("id")/3;
        
        if(combo[Math.trunc(id)][Math.round(((id-Math.trunc(id)))*3)] == "0"){
            table[index].setAttribute("style"," background-color:#32B39D;");
        }
        }
        
    }
}
let bestmove = [];
let maxDepth = 9;
function minimax(table,maximize,depth){
    //bottom
    let win = checkWin(table)
    
  //  //console.log(table[0]+"\n"+table[1]+"\n"+table[2]+"\nScore: "+win+"\nDepth: " +depth)
    if(win != -99 || depth ==0){
        return win;
    }
    else{
        
        let eval = -Infinity;
        if(maximize == true){
            for (let y = 0; y < table.length; y++) {
                for (let x = 0; x < table[y].length; x++) {
                   if(table[y][x] == ""){

                    temp =[table[0].slice(),table[1].slice(),table[2].slice()]
                    //swap
                    temp[y][x] = aiSymbol;
                    let value =minimax(temp,false,depth-1);
                    if(value > eval){
                        eval = value;
                        
                    }
                   }
                }
                
            }
            return eval;
        }
        else if(maximize == false){
            eval = Infinity;
            for (let y = 0; y < table.length; y++) {
                for (let x = 0; x < table[y].length; x++) {
                   if(table[y][x] == ""){

                    temp =[table[0].slice(),table[1].slice(),table[2].slice()]
                    //swap
                    temp[y][x] = playerSymbol;
                    let value =minimax(temp,true,depth-1);
                    if(value < eval){
                        eval = value;
                    }
                   }
                }
                
            }
            return eval;
        }
    }
    
}

init();

