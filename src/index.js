import { Ship, Player } from "./scripts/classes.js";
import "./style.css";

console.log("This is some template text");

function computerAttacks(computer, otherPlayer, domParent, otherDomParent) {
    setTimeout(() => {
        const newAttack = computer.generateAttack();
        otherPlayer.getAttacked(newAttack[0], newAttack[1]);
        if (otherPlayer.lost()) {
            winText.textContent = `${computer.name} won!`;
        } else {
            computer.toggleTurn();
            otherPlayer.toggleTurn();
        }
        redrawGrid(otherPlayer, computer, otherDomParent, domParent);
        redrawGrid(computer, otherPlayer, domParent, otherDomParent);
    }, 1);
}

function redrawGrid(player, otherPlayer, domParent, otherDomParent) {
    const theGrid = player.gameboard.board;
    domParent.replaceChildren();
    for (let y = 0; y < 10; ++y) {
        for (let x = 0; x < 10; ++x) {
            const btn = document.createElement("button");
            if (player.turn === true || otherPlayer.type === "cpu") {
                btn.setAttribute("disabled", "");
            }
            if (theGrid[x][y][0] === true) {
                if (theGrid[x][y][1] instanceof Ship) {
                    btn.textContent = "X";
                } else {
                    btn.textContent = "O";
                }
                btn.setAttribute("disabled", "");
            }
            btn.addEventListener("click", () => {
                player.getAttacked(x, y);
                if (!player.lost()) {
                    player.toggleTurn();
                    otherPlayer.toggleTurn();
                    if (player.type === "cpu") {
                        computerAttacks(
                            player,
                            otherPlayer,
                            domParent,
                            otherDomParent,
                        );
                    }
                    currPlayer.textContent = `${player.name}'s turn`;
                } else {
                    winText.textContent = `${otherPlayer.name} won!`;
                }
                redrawGrid(player, otherPlayer, domParent, otherDomParent);
                redrawGrid(otherPlayer, player, otherDomParent, domParent);
            });
            domParent.appendChild(btn);
        }
    }
}

function domPlaceShip(x1, y1, x2, y2, player) {
    let len = 0;
    let errorMessage = "";
    if (x1 === x2) {
        len = Math.abs(y2 - y1) + 1;
    } else if (y1 === y2) {
        len = Math.abs(x2 - x1) + 1;
    } else {
        errorMessage = "The ship can't be diagonal!";
        return errorMessage;
    }
    let currSize = validLengths.length;
    for (let i = 0; i < currSize; ++i) {
        if (len === validLengths[i]) {
            validLengths.splice(i, 1);
            break;
        }
    }
    if (currSize === validLengths.length) {
        errorMessage = "That's not a valid length for a ship!";
        return errorMessage;
    }
    let success = player.gameboard.placeShip(x1, y1, x2, y2);
    if (success === null) {
        errorMessage = "You can't place a ship on another ship!";
        return errorMessage;
    }
    redrawGrid(playerOne, playerTwo, playerOneGrid, playerTwoGrid);
    redrawGrid(playerTwo, playerOne, playerTwoGrid, playerOneGrid);
    return errorMessage;
}

function makePlaceShipsForm() {
    const body = document.querySelector("body");
    const formDivider = document.createElement("div");
    const form = document.createElement("form");
    const x1Label = document.createElement("label");
    const x2Label = document.createElement("label");
    const y1Label = document.createElement("label");
    const y2Label = document.createElement("label");
    const x1 = document.createElement("input");
    const x2 = document.createElement("input");
    const y1 = document.createElement("input");
    const y2 = document.createElement("input");
    const submitBtn = document.createElement("button");
    const errMsg = document.createElement("p");
    x1Label.textContent = "x1";
    x2Label.textContent = "x2";
    y1Label.textContent = "y1";
    y2Label.textContent = "y2";
    x1.setAttribute("id", "x1");
    x2.setAttribute("id", "x2");
    y1.setAttribute("id", "y1");
    y2.setAttribute("id", "y2");
    x1.setAttribute("name", "x1");
    x2.setAttribute("name", "x2");
    y1.setAttribute("name", "y1");
    y2.setAttribute("name", "y2");
    x1.setAttribute("type", "number");
    x2.setAttribute("type", "number");
    y1.setAttribute("type", "number");
    y2.setAttribute("type", "number");
    x1.setAttribute("min", "0");
    x2.setAttribute("min", "0");
    y1.setAttribute("min", "0");
    y2.setAttribute("min", "0");
    x1.setAttribute("max", "9");
    x2.setAttribute("max", "9");
    y1.setAttribute("max", "9");
    y2.setAttribute("max", "9");
    x1Label.setAttribute("for", "x1");
    x2Label.setAttribute("for", "x2");
    y1Label.setAttribute("for", "y1");
    y2Label.setAttribute("for", "y2");
    submitBtn.textContent = "Place ship";
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        let err = domPlaceShip(
            x1.value,
            y1.value,
            x2.value,
            y2.value,
            playerOne,
        );
        errMsg.textContent = err;
        x1.value = 0;
        x2.value = 0;
        y1.value = 0;
        y2.value = 0;
    });
    form.appendChild(x1Label);
    form.appendChild(x1);
    form.appendChild(x2Label);
    form.appendChild(x2);
    form.appendChild(y1Label);
    form.appendChild(y1);
    form.appendChild(y2Label);
    form.appendChild(y2);
    form.appendChild(submitBtn);
    formDivider.appendChild(form);
    formDivider.appendChild(errMsg);
    body.appendChild(formDivider);
}

const body = document.querySelector("body");
const content = document.createElement("div");
const currPlayer = document.createElement("p");
const winText = document.createElement("p");
const playerOne = new Player("Real Player", true);
const playerTwo = new Player();
const validLengths = [5, 4, 3, 2, 1];
const playerOneGrid = document.createElement("div");
const playerTwoGrid = document.createElement("div");

currPlayer.textContent = `${playerOne.name}'s turn`;
currPlayer.classList.add("turn");
content.classList.add("content");
playerOneGrid.classList.add("gridOne");
playerTwoGrid.classList.add("gridTwo");
redrawGrid(playerOne, playerTwo, playerOneGrid, playerTwoGrid);
redrawGrid(playerTwo, playerOne, playerTwoGrid, playerOneGrid);

content.appendChild(playerOneGrid);
content.appendChild(playerTwoGrid);
body.appendChild(currPlayer);
body.appendChild(content);
body.appendChild(winText);
makePlaceShipsForm();
