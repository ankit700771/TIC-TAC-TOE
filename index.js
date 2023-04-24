const gameInfo = document.querySelector(".game-info");
const boxes = document.querySelectorAll(".box");
const newGameBtn = document.querySelector(".btn");


let currentPlayer;

// this variable used for track of the cells in the matrix
let gameGrid;

const winningPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

function initialiseGame() {
    currentPlayer = "X";
    gameGrid = ["" , "" ,"" ,"", "", "", "", "", ""];

    gameInfo.innerText = `Current Player - ${currentPlayer}`;

    boxes.forEach((box , index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        box.classList.remove("win");
    });
    newGameBtn.classList.remove("active");

}

initialiseGame();

function checkGameOver() {
    let winner = "";

    winningPositions.forEach((position) => {
        if((gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "") 
            && (gameGrid[position[0]] === gameGrid[position[1]] ) && (gameGrid[position[1]] === gameGrid[position[2]])) {

            if(gameGrid[position[0]] == "X"){
                winner = "X";
            }
            else{
                winner = "0";
            }

            boxes.forEach((box) => {
                box.style.pointerEvents = "none";
            })

            

            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }

    })

    if(winner !== ""){
        gameInfo.innerText = `Player ${winner} win`;
        newGameBtn.classList.add("active");
        return;
    }

    let fillCount = 0;
    gameGrid.forEach((box) => {
        if(box !== ""){
            fillCount++;
        }
    })

    if(fillCount === 9){
        gameInfo.innerText = "Game Tied !";
        newGameBtn.classList.add("active");
    }
}

function swapPlayer(){
    if(currentPlayer === "X"){
        currentPlayer = "0";
    }
    else{
        currentPlayer = "X";
    }
}


function handleClick(index){
    if(gameGrid[index] === ""){
        gameGrid[index] = currentPlayer;
        boxes[index].innerText = currentPlayer;
        boxes[index].style.pointerEvents = "none";

        //swap player
        swapPlayer();

        gameInfo.innerText = `Current Player - ${currentPlayer}`;

        checkGameOver();
    }
}


boxes.forEach((box , index) => {
    box.addEventListener('click', () => {
        handleClick(index);
    })
})


newGameBtn.addEventListener('click', initialiseGame);