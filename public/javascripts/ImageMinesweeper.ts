/// <reference path="ColorCell.ts" />
/// <reference path="Minefield.ts" />
/// <reference path="Minesweeper.ts" />

class ImageMinesweeper extends Minesweeper {
    
    private image: string[][];
    private bombRatio: number;
    
    /**
     * Takes an image represented by a 2D RGB array. The bomb ratio should be between 0 and 1
     */
    constructor(image: string[][], bombRatio: number) {
        if (bombRatio <= 0 || bombRatio >= 1) {
            throw 'The bombRatio should be between 0 and 1';
        }
        
        this.image = image;
        this.rows = image.length;
        this.cols = image[0].length;
        this.bombRatio = bombRatio;
        
        super();
    }
    
    protected getField(): Minefield {
        var cells = new Array(this.rows);
        var cellCount = 0;
        
        for (var row = 0; row < this.rows; row++) {
            cells[row] = new Array(this.cols);

            for (var col = 0; col < this.cols; col++) {
                var color = this.image[row][col];
                
                if (color != '') {
                    cells[row][col] = new ColorCell(color, false);
                    cellCount++;
                }
            }
        }
        this.bombCount = Math.floor(cellCount * this.bombRatio);

        return new Minefield(cells);
    }
}