class Cell {
    open: boolean;
    bomb: boolean;
    adjBombCount: number;
    adjCells: Cell[];
    
    constructor(bomb: boolean) {
        this.bomb = bomb;
    }
}