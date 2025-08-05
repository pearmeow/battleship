import { Ship, Gameboard, Player } from "./classes.js";
import { describe, test, expect } from "@jest/globals";

describe("Ship tests", () => {
    test("Ship(5) length to be 5", () => {
        const ship = new Ship(5);
        expect(ship.length()).toBe(5);
    });

    test("Ship(4) length to be 4", () => {
        const ship = new Ship(4);
        expect(ship.length()).toBe(4);
    });

    test("Ship(4) hit to be 2 after hitting twice", () => {
        const ship = new Ship(4);
        ship.hit();
        ship.hit();
        expect(ship._hit).toBe(2);
    });

    test("Ship(4) hit to be 1 after hitting once", () => {
        const ship = new Ship(4);
        ship.hit();
        expect(ship._hit).toBe(1);
    });

    test("Ship(1) sinks after one hit", () => {
        const ship = new Ship(1);
        ship.hit(1);
        expect(ship.isSunk()).toBeTruthy();
    });

    test("Ship(1) doesn't sink after no hits", () => {
        const ship = new Ship(1);
        expect(ship.isSunk()).toBeFalsy();
    });
});

describe("Gameboard tests", () => {
    describe("Place ship tests", () => {
        test("Place ship of length one at (3,3)", () => {
            const board = new Gameboard();
            let x1 = 3;
            let y1 = 3;
            let x2 = 3;
            let y2 = 3;
            board.placeShip(x1, y1, x2, y2);
            expect(board.board[3][3][1]).toBeInstanceOf(Ship);
        });

        test("Place ship of length one at (4,4)", () => {
            const board = new Gameboard();
            let x1 = 4;
            let y1 = 4;
            let x2 = 4;
            let y2 = 4;
            board.placeShip(x1, y1, x2, y2);
            expect(board.board[4][4][1]).toBeInstanceOf(Ship);
        });

        test("Ship of length 2 vertically at (4,4) to (4,5)", () => {
            const board = new Gameboard();
            let x1 = 4;
            let y1 = 4;
            let x2 = 4;
            let y2 = 5;
            board.placeShip(x1, y1, x2, y2);
            for (let i = y1; i <= y2; ++i) {
                expect(board.board[x1][i][1]).toBeInstanceOf(Ship);
            }
        });

        test("Ship of length 2 horizontally at (4,4) to (5,4)", () => {
            const board = new Gameboard();
            let x1 = 4;
            let y1 = 4;
            let x2 = 5;
            let y2 = 4;
            board.placeShip(x1, y1, x2, y2);
            for (let i = x1; i <= x2; ++i) {
                expect(board.board[i][y1][1]).toBeInstanceOf(Ship);
            }
        });

        test("Ship at (4,4) to (5,4) should be the same ship", () => {
            const board = new Gameboard();
            let x1 = 4;
            let y1 = 4;
            let x2 = 5;
            let y2 = 4;
            board.placeShip(x1, y1, x2, y2);
            let ship = board.board[x1][y1][1];
            for (let i = x1; i <= x2; ++i) {
                expect(board.board[i][y1][1]).toBe(ship);
            }
        });

        test("Ship at (4,4) to (5,4) should have correct length of 2", () => {
            const board = new Gameboard();
            let x1 = 4;
            let y1 = 4;
            let x2 = 5;
            let y2 = 4;
            board.placeShip(x1, y1, x2, y2);
            let ship = board.board[x1][y1][1];
            expect(ship.length()).toBe(2);
        });

        test("Can't place ship at same location", () => {
            const board = new Gameboard();
            board.placeShip(0, 0, 0, 0);
            expect(board.placeShip(0, 0, 0, 0)).toBe(null);
        });

        test("No diagonal ships", () => {
            const board = new Gameboard();
            let x1 = 4;
            let y1 = 4;
            let x2 = 5;
            let y2 = 5;
            expect(board.placeShip(x1, y1, x2, y2)).toBe(null);
        });
    });
    describe("Attack related tests", () => {
        test("Attack at (0,0) marks board at that point", () => {
            const board = new Gameboard();
            board.receiveAttack(0, 0);
            expect(board.board[0][0][0]).toBeTruthy();
        });
        test("Attack at (3,0) marks board at that point", () => {
            const board = new Gameboard();
            board.receiveAttack(3, 0);
            expect(board.board[3][0][0]).toBeTruthy();
        });
        test("Attacking returns whether a ship was hit", () => {
            const board = new Gameboard();
            board.placeShip(0, 0, 0, 0);
            expect(board.receiveAttack(0, 0)).toBe(true);
        });
        test("When all ships are sunk, returns true for allSunk", () => {
            const board = new Gameboard();
            board.placeShip(0, 0, 0, 0);
            board.receiveAttack(0, 0);
            expect(board.allSunk()).toBe(true);
        });
        test("When not all ships are sunk, returns false for allSunk", () => {
            const board = new Gameboard();
            board.placeShip(0, 0, 0, 0);
            expect(board.allSunk()).toBe(false);
        });
    });
});

describe("Player tests", () => {
    test("Computer player should be default", () => {
        const cpu = new Player();
        expect(cpu.type).toBe("cpu");
    });
    test("Player with name should be not computer", () => {
        const real = new Player("Name");
        expect(real.type).toBe("real");
    });
    test("Player should have a board", () => {
        const player = new Player();
        expect(player.gameboard).toBeInstanceOf(Gameboard);
    });
});
