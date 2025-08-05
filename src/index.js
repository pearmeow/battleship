import { Ship, Player } from "./scripts/classes.js";
import "./style.css";

console.log("This is some template text");

function redrawGrid(player, otherPlayer, domParent) {
    const theGrid = player.gameboard.board;
    domParent.replaceChildren();
    for (let y = 0; y < 10; ++y) {
        for (let x = 0; x < 10; ++x) {
            const btn = document.createElement("button");
            if (theGrid[x][y][0] === true) {
                if (theGrid[x][y][1] instanceof Ship) {
                    btn.textContent = "X";
                } else {
                    btn.textContent = "O";
                }
                btn.setAttribute("disabled", "");
            }
            btn.addEventListener("click", () => {
                if (player.getAttacked(x, y) !== null) {
                    if (!player.lost()) {
                        player.toggleTurn();
                        otherPlayer.toggleTurn();
                        currPlayer.textContent = `${player.name}'s turn`;
                    } else {
                        winText.textContent = `${otherPlayer.name} won!`;
                    }
                    redrawGrid(player, otherPlayer, domParent);
                }
            });
            domParent.appendChild(btn);
        }
    }
}

const body = document.querySelector("body");
const content = document.createElement("div");
const currPlayer = document.createElement("p");
const winText = document.createElement("p");
const playerOne = new Player("Real Player", true);
const playerTwo = new Player();
const playerOneGrid = document.createElement("div");
const playerTwoGrid = document.createElement("div");

currPlayer.textContent = `${playerOne.name}'s turn`;
currPlayer.classList.add("turn");
content.classList.add("content");
playerOneGrid.classList.add("gridOne");
playerTwoGrid.classList.add("gridTwo");
redrawGrid(playerOne, playerTwo, playerOneGrid);
redrawGrid(playerTwo, playerOne, playerTwoGrid);

content.appendChild(playerOneGrid);
content.appendChild(playerTwoGrid);
body.appendChild(currPlayer);
body.appendChild(content);
body.appendChild(winText);
