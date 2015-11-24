/// <reference path="MSObserver.ts" />
/// <reference path="Minesweeper.ts" />
/// <reference path="ImageMinesweeper.ts" />

class Pokesweeper implements MSObserver {
    private ms: Minesweeper;
    private bombCount: number;
    
    constructor(cells: number[][]) {
        this.ms = new ImageMinesweeper(cells, 5);
    }
    
    onGameStart() {
        
    }
    
    onWaitingInput() {
        
    }
    
    onFieldChanged() {
        
    }
    
    onBombStepped(row: number, col: number) {
        
    }
    
    onVictory() {
        
    }
}