/// <reference path="Cell.ts" />
/// <reference path="Minefield.ts" />
/// <reference path="MSObserver.ts" />

/**
 * An "abstract" class for one game instance of minesweeper
 */
class Minesweeper {
    protected field: Minefield;
    protected rows: number;
    protected cols: number;
    protected bombCount: number;
    protected observers: MSObserver[];
    protected moveMade = false;

    constructor() {
        this.field = this.getField();
        this.observers = [];
    }

    play(): void {
        this.observers.forEach(observer => {
            observer.onGameStart();
            observer.onWaitingInput();
        });
    }

    addObserver(observer: MSObserver): void {
        this.observers.push(observer);
    }

    getCellAt(row: number, col: number): Cell {
        if (!this.field.isValidCell(row, col)) {
            throw "Invalid row or column value";
        }

        return this.field.getCellAt(row, col);
    }

    isValidMove(row: number, col: number): boolean {
        if (!this.field.isValidCell) {
            return false;
        }

        return !this.field.getCellAt(row, col).open;
    }
    
    isValidCell(row: number, col: number): boolean {
        return this.field.isValidCell(row, col);
    }

    makeMove(row: number, col: number): void {
        console.log([row, col]);
        
        if (!this.moveMade) {
            // first move, so place bombs
            this.placeBombsExceptFor(row, col);
            this.moveMade = true;
        }
        
        this.field.makeMove(row, col);

        this.observers.forEach(observer => {
            if (this.field.steppedOnBomb) {
                observer.onBombStepped(row, col);
            } else {
                observer.onFieldChanged();
                observer.onWaitingInput();
            }
        });
    }

    protected getField(): Minefield {
        throw "getField not implemented!";
    }
    
    private placeBombsExceptFor(row: number, col: number): void {
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
}