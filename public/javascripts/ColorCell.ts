/// <reference path="Cell.ts" />

class ColorCell extends Cell {
    
    color: string;
    
    constructor(color: string, bomb: boolean) {
        this.color = color;
        super(bomb);
    }
}