import { Player } from "./scripts/classes.js";
import "./style.css";

console.log("This is some template text");

const body = document.querySelector("body");
const content = document.createElement("div");
const currPlayer = document.createElement("p");
currPlayer.textContent = "Player 1's turn";
currPlayer.classList.add("turn");
content.classList.add("content");

const playerOne = new Player("Real Player", true);
const playerTwo = new Player();

const playerOneGrid = document.createElement("div");
const playerTwoGrid = document.createElement("div");
playerOneGrid.classList.add("gridOne");
playerTwoGrid.classList.add("gridTwo");
for (let y = 0; y < 10; ++y) {
    for (let x = 0; x < 10; ++x) {
        const btnOne = document.createElement("button");
        btnOne.addEventListener("click", () => {
            let success = playerOne.getAttacked(x, y);
            if (success === null) {
                return;
            }
            if (success === true) {
                btnOne.textContent = "O";
            } else {
                btnOne.textContent = "X";
            }
            playerOne.toggleTurn();
            playerTwo.toggleTurn();
            currPlayer.textContent = "Player 1's turn";
        });
        playerOneGrid.appendChild(btnOne);

        const btnTwo = document.createElement("button");
        btnTwo.addEventListener("click", () => {
            let success = playerTwo.getAttacked(x, y);
            if (success === null) {
                return;
            }
            if (success === true) {
                btnTwo.textContent = "O";
            } else {
                btnTwo.textContent = "X";
            }
            playerOne.toggleTurn();
            playerTwo.toggleTurn();
            currPlayer.textContent = "Player 2's turn";
        });
        playerTwoGrid.appendChild(btnTwo);
    }
}
content.appendChild(playerOneGrid);
content.appendChild(playerTwoGrid);

body.appendChild(currPlayer);
body.appendChild(content);
