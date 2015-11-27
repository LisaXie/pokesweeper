import fs = require('fs');
import pngjs = require('pngjs');

/**
 * Takes a PNG file and converts it into a 2D array of RGBA colors as strings
 */
class PngParser {
    /**
     * Parses the image at the specified location, and passes the generated 2D array into the callback
     */
    static parseImage(file: string, callback: (image: string[][]) => void): void {
        var _this = this;

        fs.createReadStream(file).pipe(new pngjs.PNG({
            filterType: 4
        })).on('parsed', function() {
            callback(_this.trimImage(_this.generateImageArray(this)));
        });
    }

    private static generateImageArray(image): string[][] {
        var imageArray = [];

        for (var row = 0; row < image.height; row++) {
            var rowArray = [];

            for (var col = 0; col < image.width; col++) {
                rowArray.push(this.getNthPixel(image.data, row * image.width + col));
            }
            imageArray.push(rowArray);
        }
        return imageArray;
    }

    private static getNthPixel(data, n): string {
        var r = data[n * 4];
        var g = data[n * 4 + 1];
        var b = data[n * 4 + 2];

        return this.toTwoDigHex(r) + this.toTwoDigHex(g) + this.toTwoDigHex(b);
    }
    
    private static toTwoDigHex(num: number): string {
        var hex = num.toString(16);
        
        if (hex.length == 1) {
            return '0' + hex;
        } else if (hex.length == 2) {
            return hex;
        }
        
        throw 'Invalid color value';
    }
    
    private static trimImage(image: string[][]): string[][] {
        var rowOffsets = this.getRowOffsets(image);
        var colOffsets = this.getColOffsets(image);
        var offsets = { upper: rowOffsets.upper, lower: rowOffsets.lower, left: colOffsets.left, right: colOffsets.right };
        console.log(offsets);
        
        var trimmed = [];
        
        for (var row = offsets.upper; row <= offsets.lower; row++) {
            var rowArr = [];
            
            for (var col = offsets.left; col <= offsets.right; col++) {
                rowArr.push(image[row][col]);
            }
            trimmed.push(rowArr);
        }
        
        return trimmed;
    }
    
    private static getRowOffsets(image: string[][]) {
        var row = 0, upperOffset = 0, lowerOffset = image.length - 1;
        while (row < image.length && this.isEmptyRow(image, row)) {
            upperOffset++;
            row++;
        }
        
        row = image.length - 1;
        while (row >= 0 && this.isEmptyRow(image, row)) {
            lowerOffset--;
            row--;
        }
        
        return { upper: upperOffset, lower: lowerOffset };
    }
    
    private static getColOffsets(image: string[][]) {
        var col = 0, leftOffset = 0, rightOffset = image[0].length - 1;
        while (col < image[0].length && this.isEmptyCol(image, col)) {
            leftOffset++;
            col++;
        }
        
        col = image[0].length - 1;
        while (col >= 0 && this.isEmptyCol(image, col)) {
            rightOffset--;
            col--;
        }
        
        return { left: leftOffset, right: rightOffset };
    }
    
    private static isEmptyRow(image, row): boolean {
        for (var col = 0; col < image[0].length; col++) {
            if (parseInt(image[row][col], 16) != 0) {
                return false;
            }
        }
        return true;
    }
    
    private static isEmptyCol(image, col): boolean {
        for (var row = 0; row < image.length; row++) {
            if (parseInt(image[row][col], 16) != 0) {
                return false;
            }
        }
        return true;
    }
}

export = PngParser;