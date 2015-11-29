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
        this.ms = new ImageMinesweeper(cells, 10);
        this.ms.addObserver(this);
        this.drawField();
        this.bindCells();
    }
    
    onGameStart() {
        
    }
    
    onWaitingInput() {
        
    }
    
    onFieldChanged() {
        this.drawField();
        this.bindCells();
    }
    
    onBombStepped(row: number, col: number) {
        console.log('stepped on a bomb!');
    }
    
    onVictory() {
        console.log('WIN');
    }
    
    private drawField(): void {
        $(this.fieldDomId).empty();
        
        for (var row = 0; row < this.rows; row++) {
            $(this.fieldDomId).append('<div class="row" id="row' + row.toString() + '"></div>');
            
            for (var col = 0; col < this.cols; col++) {
                if (this.ms.isValidCell(row, col)) {
                    this.drawCell(row, col);
                } else {
                    this.drawEmptyCell(row, col);
                }
            }
        }
    }
    
    private bindCells(): void {
        this.disableRightClick('.cell');
        
        var _this = this;
        
        $('.cell').mouseup(function(event: JQueryEventObject) {
            var move = _this.getCellMove($(this));
            
            if (event.which == 1) {
                // left click
                _this.ms.makeMove(move.row, move.col);
            }
            if (event.which == 3) {
                // right click
                _this.ms.toggleFlag(move.row, move.col);
            }
        });
    }
    
    private disableRightClick(tag: string): void {
        $(tag).on('contextmenu', (event) => {
            event.preventDefault();
        });
    }
    
    private getCellMove(domCell: JQuery) {
        var row = parseInt(domCell.attr('row'));
        var col = parseInt(domCell.attr('col'));
        
        return { row: row, col: col };
    }
    
    /**
     * Returns the ID for the DOM element representing the cell at (row, col) without the hashtag
     */
    private getCellId(row: number, col: number): string {
        return 'cell' + row.toString() + '_' + col.toString();
    }
    
    private drawEmptyCell(row, col) {
        var domCell = $('<div class="cell emptyCell"></div>');
        $('#row' + row.toString()).append(domCell);
    }
    
    private drawCell(row, col) {
        var cell = <ColorCell>this.ms.getCellAt(row, col);
        
        var domCell = $('<div/>', {
            class: 'cell',
            id: this.getCellId(row, col),
            row: row,
            col: col
        });
        
        if (cell.open) {
            domCell.css('background-color', '#' + cell.color);
            
            if (cell.adjBombCount != 0) {
                domCell.text(cell.adjBombCount);
            }
        } else {
            domCell.addClass('unopenCell');
        }
        
        $('#row' + row.toString()).append(domCell);
    }
}