let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#winnerMsg");

let turnO = true;
let count = 0;

let player1 = prompt("Enter Player 1 name:") || "Player 1";
let player2 = prompt("Enter Player 2 name:") || "Player 2";

let symbolO = player1;
let symbolX = player2;

alert(`${symbolO} will play as 'O'\n${symbolX} will play as 'X'`);

const winPatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]
];

const resetGame = () => {
    turnO = true;
    count = 0;
    enablebBoxes();
    msgContainer.classList.add("hide");
}

const enablebBoxes= () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
}

const disablebBoxes= () => {
    for (let box of boxes) {
        box.disabled = true;
    }
}

const gamedraw = () => {
    msg.innerText = "Draw";
    msgContainer.classList.remove("hide");
    disablebBoxes();
}

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnO) {
          box.innerText = "O";
          turnO = false;
        }
        else {
           box.innerText = "X";
            turnO = true; 
        }
        box.disabled = true;
        count++;

        let win = checkWinner();
        if (count === 9 && !win) {
            gamedraw();
        }
    });
});


const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;

        if (pos1 != "" && pos2 != "" && pos3 != "") {
            if (pos1 === pos2 && pos2 === pos3) {
                let winnerName;
                if (pos1 === 'O') {
                    winnerName = symbolO;
                }
                else if (pos1 === 'X') {
                    winnerName = symbolX;
                }
                showWinner(winnerName);
                return true
            }
        }
    }
}

const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disablebBoxes();
}


newBtn.addEventListener("click",resetGame);
resetBtn.addEventListener("click",resetGame);