/// <reference path="Cell.ts" />

/**
 * Keeps track of the state of the cells and the field, and doesn't make
 * changes to the state aside from updating cell adjacencies.
 */
class Minefield {
    steppedOnBomb: boolean;
    openCellCount: number;
    cellCount: number;
    flagCount: number;
    private cells: Cell[][];
    private rows: number;
    private cols: number;

    constructor(cells: Cell[][]) {
        if (cells.length == 0 || cells[0].length == 0) {
            throw "Cannot make an empty minefield";
        }

        this.cells = cells;
        this.rows = cells.length;
        this.cols = cells[0].length;
        this.cellCount = this.getCellCount();

        this.init();
    }

    init(): void {
        this.steppedOnBomb = false;
        this.openCellCount = 0;
        this.flagCount = 0;
        
        for (var row = 0; row < this.rows; row++) {
            for (var col = 0; col < this.cols; col++) {
                var cell = this.cells[row][col];
                if (cell != null) {
                    cell.open = false;
                    cell.row = row;
                    cell.col = col;
                }
            }
        }

        this.updateCellAdjacency();
    }

    isValidCell(row: number, col: number): boolean {
        if (row < 0 || col < 0 || row >= this.rows || col >= this.cols) {
            return false;
        }

        return this.cells[row][col] != null;
    }

    getCellAt(row: number, col: number): Cell {
        if (!this.isValidCell(row, col)) {
            throw "Invalid row or column value";
        }

        return this.cells[row][col];
    }
	
    /**
     * Updates the adjCells property for each cell
     */
    updateCellAdjacency(): void {
        for (var row = 0; row < this.rows; row++) {
            for (var col = 0; col < this.cols; col++) {
                var cell = this.cells[row][col];
                if (!cell) { continue; }
                
                cell.adjCells = [];
                cell.adjBombCount = 0;

                for (var dr = -1; dr <= 1; dr++) {
                    for (var dc = -1; dc <= 1; dc++) {
                        if (this.isValidCell(row + dr, col + dc)) {
                            var adjCell = this.cells[row + dr][col + dc];

                            if (cell != adjCell) {
                                cell.adjCells.push(adjCell);

                                if (adjCell.bomb) {
                                    cell.adjBombCount++;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
	
    /**
     * Gets a cell without a bomb in it. Will not terminate if no such cell exists
     */
    getRandomCellWithoutBomb(): Cell {
        do {
            var cell = this.getRandomCell();
        } while (cell.bomb);

        return cell;
    }
    
    hasWon(): boolean {
        for (var row = 0; row < this.rows; row++) {
            for (var col = 0; col < this.cols; col++) {
                if (!this.isValidCell(row, col)) {
                    continue;
                }
                
                var cell = this.getCellAt(row, col);
                
                if ((cell.open && cell.bomb) || (!cell.open && !cell.bomb)) {
                    return false;
                }
            }
        }
        return true;
    }
	
    /**
     * Will not terminate if no valid cell exists
     */
    private getRandomCell(): Cell {
        do {
            // choose between [0, rows) and [0, cols)
            var row = Math.floor(Math.random() * (this.rows));
            var col = Math.floor(Math.random() * (this.cols));

            var cell = this.cells[row][col];
        } while (!cell);

        return cell;
    }
    
    /**
     * Requires that this.rows and this.cols are valid
     */
    private getCellCount(): number {
        var count = 0;

        for (var row = 0; row < this.rows; row++) {
            for (var col = 0; col < this.cols; col++) {
                if (this.cells[row][col]) {
                    count++;
                }
            }
        }
        return count;
    }
}