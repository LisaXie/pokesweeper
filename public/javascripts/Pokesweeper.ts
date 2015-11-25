/// <reference path="MSObserver.ts" />
/// <reference path="Minesweeper.ts" />
/// <reference path="ImageMinesweeper.ts" />
/// <reference path="../../typings/jquery/jquery.d.ts" />

class Pokesweeper implements MSObserver {
    private ms: Minesweeper;
    protected rows: number;
    protected cols: number;
    private bombCount: number;
    private fieldDomId = '#field';
    
    constructor(cells: string[][]) {
        this.rows = cells.length;
        this.cols = cells[0].length;
        this.ms = new ImageMinesweeper(cells, 5);
        this.drawField();
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
    
    private drawField(): void {
        for (var row = 0; row < this.rows; row++) {
            $(this.fieldDomId).append('<div class="row" id="row' + row.toString() + '"></div>');
            
            for (var col = 0; col < this.cols; col++) {
                try {
                    var cell = <ColorCell>this.ms.getCellAt(row, col);
                    if (cell) {
                        var color = cell.color;
                    }
                } catch (e) {
                    var color = 'white';
                }
                
                var domCell = $('<div/>', {
                    class: 'cell',
                    id: this.getCellId(row, col),
                    style: 'background-color: #' + color
                });
                $('#row' + row.toString()).append(domCell);
            }
        }
    }
    
    /**
     * Returns the ID for the DOM element representing the cell at (row, col) without the hashtag
     */
    private getCellId(row: number, col: number): string {
        return 'cell' + row.toString() + '_' + col.toString();
    }
}