

var lastPaintTime =0;
let SnakeSpeed = 3;   // to control the speed of snake 1 means it will run 1 time in 1 second ... if 2 means it will run 2 times in 2 seconds
let inputDirecton = {x:0,y:0};   // ye batayega ki kis direction mai badna hai hm isko keyboard ki arrows se change karenge
let lastInputDirection = inputDirecton;
const ExpensionAmount = 1;// kitne column badne chaiye

let score=0;
var audio1 = new Audio('getFood2.wav');
var audio2 = new Audio('gameover.wav');
const snakeBody =[
    {x:10,y:10},  // ye poora ek segment hai
    
];
let food = getFoodRandomPosition();


const gameBoard = document.querySelector(".game-board");
const scoreBox = document.getElementById("score");
function paint(currentTime){
  var TimeSeconds = (currentTime-lastPaintTime)/1000;
    requestAnimationFrame(paint);
    if(TimeSeconds < 1/SnakeSpeed) return;
    lastPaintTime = currentTime;

    //console.log("rakesh ");

    update(); // (processing) isme ye hoga ki agar snake ka accident ho jaye
              // ya snake apple kaye  to kya changes honge
    draw();   // snake ko draw karna ya apple ko show karna
}
window.requestAnimationFrame(paint); 



function draw(){
    drawSnake();
    drawfood();
}

function update(){
    gameBoard.innerHTML = "";
     sankeMove();
     sankeEatFood();
}

function drawSnake(){
    snakeBody.forEach((segment,index)=>{
         var sankeElement = document.createElement("div");
          sankeElement.style.gridColumnStart = segment.x;
          sankeElement.style.gridRowStart= segment.y;
         // sankeElement.innerHTML = index;
         sankeElement.style.transform = "rotate(0deg)";
           
          if(index==0){
            sankeElement.classList.add("head");

            if(inputDirecton.x ==1){
                sankeElement.style.transform = "rotate(-90deg)";
            }else if(inputDirecton.x==-1) {
                sankeElement.style.transform = "rotate(90deg)";
            }else if(inputDirecton.y==-1) {
                sankeElement.style.transform = "rotate(180deg)";
            }else if(inputDirecton.y== 1) {
                sankeElement.style.transform = "rotate(0deg)";
            }
          }else{
            sankeElement.classList.add("snake");
            
          }
          gameBoard.appendChild(sankeElement);
});
}
//29:31 

function drawfood(){
    var foodElement = document.createElement("div");
    foodElement.style.gridColumnStart = food.x;
    foodElement.style.gridRowStart= food.y;

    foodElement.classList.add("food");
    gameBoard.appendChild(foodElement);
}

function sankeMove(){

    inputDirecton = getInputDirecton();

   for(i= snakeBody.length-2; i>=0;i--){
    snakeBody[i+1] = {...snakeBody[i]}

   }


    snakeBody[0].x += inputDirecton.x;  // sanke aage to bd rha hai but piche piche clear nhi ho rha hai
                       
    // isliye update mai gameboard.innerhtml ko empty kr do jis se ye bar bar refresh hota rahga
    snakeBody[0].y +=inputDirecton.y; 
    checkGameOver();
}

function getInputDirecton(){

    window.addEventListener("keydown",e=>{
        //console.log(e.key); ye function batata hai ki konsi ki press hui hai
        
        
        switch(e.key){
            case 'ArrowUp' :
            if(lastInputDirection.y==1) break;   
            inputDirecton={x:0,y:-1}
            break;
            case 'ArrowDown' :
            if(lastInputDirection.y==-1) break;     
            inputDirecton={x:0,y:+1}
            break;
            case 'ArrowLeft' :
            if(lastInputDirection.x==1) break;       
            inputDirecton={x:-1,y:0}
            break;
            case 'ArrowRight' :
            if(lastInputDirection.x==-1) break; 
            inputDirecton={x:1,y:0}
            break;  

           default: inputDirecton = {x:0,y:0}
        }

       
    })

    lastInputDirection = inputDirecton;
    return inputDirecton;
}

//1 : 10:34

function sankeEatFood(){
  
    if(isEat()){
        //console.log("eated");
        // food.x = 5;
        // food.y = 5;
        score +=10;
          scoreBox.innerHTML = score;
          audio1.play();
        food = getFoodRandomPosition();
         expandSnake();
         SnakeSpeed = SnakeSpeed+0.5;
    }
   
}
function isEat(){
  return snakeBody[0].x=== food.x && snakeBody[0].y === food.y ;
}




function getFoodRandomPosition(){
   // return {x: 5,y:5};
   let a,b;
   let myCondition= true;
   while(myCondition){
    a = Math.ceil(Math.random()*16);
    b = Math.ceil(Math.random()*16);
    myCondition = snakeBody.some(segment=>{
        return(segment.x === a && segment.y === b );

    })
   }
   return {x:a ,y:b};
}

function expandSnake(){
    for(i=0;i<= ExpensionAmount;i++){
        snakeBody.push(snakeBody[snakeBody.length-1]); 
    }
}
//const gameArea = document.querySelector("#gameArea");
function checkGameOver(){
    if(snakeOutOfGrid() || sankeIntersection()){
       
        //gameArea.style.border = "10px solid";
        //gameArea.style.borderColor = "red";
        audio2.play();
        location.reload();
        alert("Game Over : Your score is "+ score);
    }
}

function snakeOutOfGrid(){
    return snakeBody[0].x < 0 || snakeBody[0].x >16 || snakeBody[0].y < 0 || snakeBody[0].y >16;

}

function sankeIntersection(){
       for(i=1;i<snakeBody.length;i++){
        if(snakeBody[0].x === snakeBody[i].x && snakeBody[0].y === snakeBody[i].y ){
            return true;
        }
       }
}

