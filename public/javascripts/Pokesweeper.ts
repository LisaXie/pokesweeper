/// <reference path="MSObserver.ts" />
/// <reference path="Minesweeper.ts" />
/// <reference path="ImageMinesweeper.ts" />
/// <reference path="Timer.ts" />
/// <reference path="PokeUtil.ts" />
/// <reference path="../../typings/jquery/jquery.d.ts" />

class Pokesweeper implements MSObserver {
    private ms: Minesweeper;
    protected rows: number;
    protected cols: number;
    private bombCount: number;
    private fieldDomId = '#field';
    private timer: Timer;
    /**
     * The key for Pokedex count in localStorage
     */
    private pokedexKey = 'pokedex';
    private timeCounterDomId = '#timeCounter';
    private highScoreDomId = '#highScoreCounter';
    private pokedexDomId = '#pokedexCounter';
    private bombCountDomId = '#bombCounter';
    private resetButtonDomId = '#resetButton';
    private resetButtonImage = 'url("/images/pikachu_button.png")';
    private happyButtonImage = 'url("/images/pikachu_button_happy.png")';
    private sadButtonImage = 'url("/images/pikachu_button_sad.png")';
    
    constructor(cells: string[][]) {
        this.rows = cells.length;
        this.cols = cells[0].length;
        this.ms = new ImageMinesweeper(cells, PokeUtil.getBombRatio());
        this.ms.addObserver(this);
        this.bindResetButton();
        this.updateScores();
        this.updateBombCount(this.ms.getRemainingBombCount());
        this.timer = new Timer($(this.timeCounterDomId));
        this.initField();
    }
    
    onGameStart() {
        this.timer.start();
    }
    
    onWaitingInput() {
        
    }
    
    onFieldChanged() {
        this.updateBombCount(this.ms.getRemainingBombCount());
    }
    
    onCellChanged(cell: Cell) {
        this.updateCell(<ColorCell>cell);
    }
    
    onBombStepped() {
        this.timer.stop();
        $('.cell').unbind();
        $(this.resetButtonDomId).css('background-image', this.sadButtonImage);
    }
    
    onVictory() {
        this.drawSprite();
        this.saveScore(this.timer.stop());
        $(this.resetButtonDomId).css('background-image', this.happyButtonImage);
    }
    
    private initField(): void {
        this.drawInitialField();
        this.bindCells();
    }
    
    private updateBombCount(bombs: number) {
        $(this.bombCountDomId).text(bombs);
    }
    
    private saveScore(score: number): void {
        if (!localStorage.getItem(currentId)) {
            // Solved for the first time
            localStorage.setItem(currentId, score.toString());
            
            var pokedex = localStorage.getItem(this.pokedexKey);
            localStorage.setItem(this.pokedexKey, (parseInt(pokedex) + 1).toString());
        } else {
            var highscore = parseInt(localStorage.getItem(currentId));
            localStorage.setItem(currentId, (Math.min(highscore, score)).toString());
        }
        
        this.updateScores();
    }
    
    private updateScores(): void {
        if (!localStorage.getItem(currentId)) {
            // Haven't solved this one yet
            $(this.highScoreDomId).text('--');
        } else {
            $(this.highScoreDomId).text(localStorage.getItem(currentId));
        }
        
        if (!localStorage.getItem(this.pokedexKey)) {
            localStorage.setItem(this.pokedexKey, '0');
        }
        
        $(this.pokedexDomId).text(localStorage.getItem(this.pokedexKey));
    }
    
    private bindCells(): void {
        var longPress = false;
        
        this.disableRightClick('.cell');
        
        $('.cell').mouseup((event: JQueryEventObject) => {
            var move = this.getCellMove($(event.target));
            
            if (event.which == 1 && !longPress) {
                // left click
                this.ms.makeMove(move.row, move.col);
            } else if (event.which == 3 || longPress) {
                // right click or long press
                this.ms.toggleFlag(move.row, move.col);
                longPress = false;
            }
        });
        
        $('.cell').mousedown((event: JQueryEventObject) => {
            longPress = false;
            
            setTimeout(() => {
                navigator.vibrate(1);
                longPress = true;
            }, 300);
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
    
    private bindResetButton(): void {
        $(this.resetButtonDomId).mousedown(function() {
            $(this).removeAttr('style'); // remove hardcoded CSS style
        });
        
        $(this.resetButtonDomId).click(() => {
            this.ms.init();
            this.timer.stop();
            this.initField();
        });
    }
    
    private updateCell(cell: ColorCell): void {
        var domCell = $('#cell' + cell.row.toString() + '_' + cell.col.toString());
        this.removeCellClasses(domCell);
        
        if (cell.open) {
            if (cell.bomb) {
                domCell.addClass('bombCell');
            } else if (cell.adjBombCount !== 0) {
                domCell.text(cell.adjBombCount);
            }
        } else {
            if (cell.flag) {
                domCell.addClass('flaggedCell');
            } else {
                domCell.addClass('unopenCell');
            }
        }
    }
    
    private removeCellClasses(domCell: JQuery): void {
        domCell.removeClass('unopenCell');
        domCell.removeClass('flaggedCell');
    }
    
    private drawInitialField(): void {
        $(this.fieldDomId).empty();
        
        for (var row = 0; row < this.rows; row++) {
            $(this.fieldDomId).append('<div class="row" id="row' + row.toString() + '"></div>');
            
            for (var col = 0; col < this.cols; col++) {
                if (this.ms.isValidCell(row, col)) {
                    var domCell = this.getInitialDomCell(<ColorCell>this.ms.getCellAt(row, col));
                } else {
                    var domCell = this.getEmptyCell();
                }
                $('#row' + row.toString()).append(domCell);
            }
        }
    }
    
    private drawSprite() {
        $('.cell').text('');
        $('.cell').css('background-image', 'none');
    }
    
    private getEmptyCell() {
        return $('<div class="cell emptyCell"></div>');
    }
    
    private getInitialDomCell(cell: ColorCell) {
        
        var domCell = $('<div/>', {
            class: 'cell unopenCell',
            id: this.getCellId(cell.row, cell.col),
            row: cell.row,
            col: cell.col
        });
        
        domCell.css('background-color', '#' + cell.color);
        return domCell;
    }
}