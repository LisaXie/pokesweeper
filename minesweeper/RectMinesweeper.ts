import Cell = require('./Cell');
import Minefield = require('./Minefield');
import Minesweeper = require('./Minesweeper');

/**
 * One game run of rectangular minesweeper
 */
class RectMinesweeper extends Minesweeper {

    constructor(rows: number, cols: number, bombCount: number) {
        this.rows = rows;
        this.cols = cols;
        this.bombCount = bombCount;

        super();
    }

    protected getField(): Minefield {
        var cells = new Array(this.rows);
        for (var row = 0; row < this.rows; row++) {
            cells[row] = new Array(this.cols);

            for (var col = 0; col < this.cols; col++) {
                cells[row][col] = new Cell(false);
            }
        }

        return new Minefield(cells);
    }
}

export = RectMinesweeper;