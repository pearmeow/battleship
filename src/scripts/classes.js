export class Ship {
    constructor(length) {
        this._length = length;
        this._hit = 0;
    }
    length() {
        return this._length;
    }
    hit() {
        ++this._hit;
    }
    isSunk() {
        return this._hit === this.length();
    }
}

export class Gameboard {
    constructor() {
        this.ships = 0;
        this.board = [];
        for (let i = 0; i < 10; ++i) {
            let row = [];
            for (let col = 0; col < 10; ++col) {
                row.push([false, null]);
            }
            this.board.push(row);
        }
    }
    placeShip(x1, y1, x2, y2) {
        if (!(x1 === x2 || y1 === y2)) {
            throw new Error("Ships cannot be diagonal");
        }
        let length = Math.max(Math.abs(x2 - x1 + 1), Math.abs(y2 - y1 + 1));
        let ship = new Ship(length);
        for (let i = y1; i <= y2; ++i) {
            this.board[x1][i][1] = ship;
        }
        for (let i = x1; i <= x2; ++i) {
            this.board[i][y1][1] = ship;
        }
        ++this.ships;
    }
    receiveAttack(x, y) {
        if (this.board[x][y][0] === true) {
            throw Error("Can't attack same place twice");
        }
        this.board[x][y][0] = true;
        if (this.board[x][y][1] !== null) {
            this.board[x][y][1].hit();
            if (this.board[x][y][1].isSunk()) {
                --this.ships;
            }
            return true;
        }
        return false;
    }
    allSunk() {
        return this.ships === 0;
    }
}
