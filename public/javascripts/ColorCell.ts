/// <reference path="Cell.ts" />

class ColorCell extends Cell {
    
    private color: number;
    
    constructor(color: number, bomb: boolean) {
        this.color = color;
        super(bomb);
    }
}