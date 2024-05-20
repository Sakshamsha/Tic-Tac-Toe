const currentPlayerBtn = document.querySelector(".para");
const boxes = document.querySelectorAll(".box");
const newBtn = document.querySelector(".new-btn");

let currentPlayer;
let gameBtn;

const winnerCondition = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

function initialize(){
    currentPlayer = "X";
    gameBtn = ["","","","","","","","",""];

    // initialize all the boxes with no content
    boxes.forEach((box)=>{
        box.innerText = "";
        box.style.pointerEvents = "all";
        box.classList.remove("winGame");
    })


    currentPlayerBtn.innerText = `Current Player - ${currentPlayer}`;
    newBtn.classList.remove("active");
}

initialize();

function swapPlayer(){
    if(currentPlayer === "X"){
        currentPlayer = "O"
    }
    else{
        currentPlayer = "X";
    }

    currentPlayerBtn.innerText = `current Player - ${currentPlayer}`;
}

function checkGameOver(){
    let answer = "";
    let p;

    winnerCondition.forEach((position)=>{
        if(((gameBtn[position[0]] === "X") && (gameBtn[position[1]] === "X") && (gameBtn[position[2]] === "X")) ||
        ((gameBtn[position[0]] === "O") && (gameBtn[position[1]] === "O") && (gameBtn[position[2]] === "O"))){
            
            answer = `${gameBtn[position[0]]}`;

            p = position;
        }
    })

   if(answer!=""){ 
    p.forEach((ele)=>{
        boxes[ele].classList.add("winGame");
    })

    boxes.forEach((ind)=>{
        ind.style.pointerEvents = "none";
    })
   }

    let checkCount = 0;

    for(let i = 0;i<9;i++){
        if(gameBtn[i]!=""){
            checkCount+=1;
        }
    }

    if(checkCount == 9 || answer!=""){
        newBtn.classList.add("active");
    }



}

function handleBoxes(index){
    if(gameBtn[index] === ""){
        boxes[index].innerText = `${currentPlayer}`;
        gameBtn[index] = `${currentPlayer}`;
        
        boxes[index].style.pointerEvents = "none";

        swapPlayer();

    
        checkGameOver();
    }
}

boxes.forEach((box,index)=>{
    box.addEventListener("click",()=>{
        handleBoxes(index);
    });
})

newBtn.addEventListener("click",initialize);
