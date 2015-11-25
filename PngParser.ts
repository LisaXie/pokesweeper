import fs = require('fs');
import pngjs = require('pngjs');

/**
 * Takes a PNG file and converts it into a 2D array of RGBA colors as strings
 */
class PngParser {
    /**
     * Parses the image at the specified location, and passes the generated 2D array into the callback
     */
    static parseImage(file: string, callback: (image: number[][]) => void): void {
        var _this = this;

        fs.createReadStream(file).pipe(new pngjs.PNG({
            filterType: 4
        })).on('parsed', function() {
            callback(_this.generateImageArray(this));
        });
    }

    private static generateImageArray(image): number[][] {
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
}

export = PngParser;