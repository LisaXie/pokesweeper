/// <reference path="Cell.ts" />
/// <reference path="Minefield.ts" />
/// <reference path="MSObserver.ts" />

/**
 * An "abstract" class for multiple game instances of minesweeper
 */
class Minesweeper {
    protected field: Minefield;
    protected rows: number;
    protected cols: number;
    protected bombCount: number;
    protected observers: MSObserver[];
    protected moveMade: boolean;

    constructor() {
        this.observers = [];
        this.init();
    }

    /**
     * Create the minefield anew, and notify obesrvers
     */
    init(): void {
        this.field = this.getField();
        this.moveMade = false;
        this.notifyObservers();
    }

    addObserver(observer: MSObserver): void {
        this.observers.push(observer);
    }

    getCellAt(row: number, col: number): Cell {
        return this.field.getCellAt(row, col);
    }

    isValidMove(row: number, col: number): boolean {
        if (!this.field.isValidCell(row, col)) {
            return false;
        }

        return !this.field.getCellAt(row, col).open;
    }
    
    isValidCell(row: number, col: number): boolean {
        return this.field.isValidCell(row, col);
    }

    /**
     * Make a move and notify observers
     */
    makeMove(row: number, col: number): void {
        if (!this.moveMade) {
            // first move, so place bombs
            this.placeBombsExceptFor(row, col);
            this.moveMade = true;
            this.observers.forEach(observer => {
                observer.onGameStart();
            })
        }
        
        this.openCell(row, col);
        this.notifyObservers();
    }
    
    /**
     * Toggle flag if the cell is not open
     */
    toggleFlag(row: number, col: number): void {
        if (!this.isValidCell(row, col)) {
            throw 'Tried to toggle flag on an invalid cell';
        }
        
        var cell = this.getCellAt(row, col);
        if (!cell.open) {
            cell.flag = !cell.flag;

            if (cell.flag) {
                this.field.flagCount++;
            } else {
                this.field.flagCount--;
            }

            this.observers.forEach(observer => {
                observer.onCellChanged(cell);
            });
        }
        
    }
    
    /**
     * Gets the number of bombs minus flags
     */
    getRemainingBombCount(): number {
        return this.bombCount - this.field.flagCount;
    }
    
    protected notifyObservers() {
        this.observers.forEach(observer => {
            if (this.field.steppedOnBomb) {
                observer.onBombStepped();
            } else {
                if (this.field.hasWon()) {
                    observer.onVictory();
                } else {
                    observer.onFieldChanged();
                    observer.onWaitingInput();
                }
            }
        });
    }

    protected getField(): Minefield {
        throw "getField not implemented!";
    }
    
    protected placeBombsExceptFor(row: number, col: number): void {
        if (this.bombCount >= this.field.cellCount) {
            throw 'Too many bombs!';
        }
        
        var count = 0;
        while (count < this.bombCount) {
            var cell = this.field.getRandomCellWithoutBomb();
            if (cell != this.field.getCellAt(row, col) && !cell.bomb) {
                cell.bomb = true;
                count++;
            }
        }
        this.field.updateCellAdjacency();
    }

    /**
     * Opens a cell if the cell isn't flagged.
     */
    protected openCell(row: number, col: number): void {
        if (!this.isValidCell(row, col)) {
            throw "Stepped on an invalid cell";
        }

        var cell = this.getCellAt(row, col);
        if (!cell.flag) {
            if (cell.bomb) {
                this.field.steppedOnBomb = true;
            }
    
            this.recursivelyOpenCell(cell);
        }
    }

    protected recursivelyOpenCell(cell: Cell): void {
        cell.open = true;

        this.observers.forEach((observer) => {
            observer.onCellChanged(cell);
        })

        if (cell.adjBombCount == 0) {
            cell.adjCells.forEach(adjCell => {
                if (!adjCell.open && !adjCell.flag) {
                    this.recursivelyOpenCell(adjCell);
                }
            });
        }
    }
}