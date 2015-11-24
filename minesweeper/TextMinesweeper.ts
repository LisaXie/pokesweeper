import input = require('./Input');
import Cell = require('./Cell');
import Minefield = require('./Minefield');
import Minesweeper = require('./Minesweeper');
import RectMinesweeper = require('./RectMinesweeper');

/**
 * Allows you to play multiple games of regular Minesweeper in console.
 * Supports one board size up to 36x36
 */
class TextMinesweeper implements MSObserver {
    private indices = '123456789abcdefghijklmnopqrstuvwxyz';
    private ms: Minesweeper;
    private rows: number;
    private cols: number;
    private bombCount: number;

    constructor() {
        this.rows = 8;
        this.cols = 8;
        this.bombCount = 10;

        this.ms = new RectMinesweeper(this.rows, this.cols, this.bombCount);
        this.ms.addObserver(this);
        this.ms.play();
    }

    onGameStart() {
        this.printBoard();
    }

    onWaitingInput() {
        this.getUserInput();
    }

    onFieldChanged() {
        this.printBoard();
    }

    onBombStepped(row: number, col: number) {
        console.log('Stepped on a bomb!');
    }

    onVictory() {
        console.log('Congrats! You win!');
    }

    private getUserInput(): void {
        input('Please enter a move (e.g. "1,2" for row 1, col 2): ', (moveStr: string) => {
            var move: { row: number, col: number } = this.parseMove(moveStr);

            if (this.isValidMove(move)) {
                this.ms.makeMove(move.row, move.col);
            } else {
                console.log('Invalid move!');
                this.getUserInput();
            }
        });
    }

    private parseMove(move: string): { row: number, col: number } {
        var rowColStr = move.split(',');

        if (rowColStr.length < 2) {
            return {row: NaN, col: NaN};
        }

        return {row: this.indices.indexOf(rowColStr[0]),
            col: this.indices.indexOf(rowColStr[1])};
	}

    private isValidMove(move: { row: number, col: number }): boolean {
        if (move.row === NaN || move.col === NaN) {
            return false;
        }

        return this.ms.isValidMove(move.row, move.col);
    }

    private printBoard(): void {
        console.log();

        var firstRowStr = '    ' + this.indices.slice(0, this.cols).split('').join(' ');
        console.log(firstRowStr);
        console.log(); // a blank row
		
        for (var row = 0; row < this.rows; row++) {
            var rowArr = [this.indices[row], ' '];

            for (var col = 0; col < this.cols; col++) {
                var cell = this.ms.getCellAt(row, col);
                rowArr.push(this.getCellSymbol(cell));
            }

            console.log(rowArr.join(' '));
        }
        console.log();
    }

    private getCellSymbol(cell: Cell): string {
        if (cell.open) {
            if (cell.bomb) {
                return 'X';
            } else if (cell.adjBombCount > 0) {
                return cell.adjBombCount.toString();
            } else {
                return ' ';
            }
        }
        return 'O';
    }
}

new TextMinesweeper();