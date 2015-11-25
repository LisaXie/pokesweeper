/// <reference path="ColorCell.ts" />
/// <reference path="Minefield.ts" />
/// <reference path="Minesweeper.ts" />

class ImageMinesweeper extends Minesweeper {
    
    private image: string[][];
    
    /**
     * Takes an image represented by a 2D ARGB array
     */
    constructor(image: string[][], bombCount: number) {
        this.image = image;
        this.bombCount = bombCount;
        this.rows = image.length;
        this.cols = image[0].length;
        
        super();
    }
    
    protected getField(): Minefield {
        var cells = new Array(this.rows);
        for (var row = 0; row < this.rows; row++) {
            cells[row] = new Array(this.cols);

            for (var col = 0; col < this.cols; col++) {
                var color = this.image[row][col];
                
                if (color) {
                    cells[row][col] = new ColorCell(color, false);
                }
            }
        }

        return new Minefield(cells);
    }
}