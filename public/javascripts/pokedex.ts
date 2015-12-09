/// <reference path="PokeUtil.ts" />

$(() => {
    var solved: string[] = getSolved();
    populatePokedex(solved);
});

function getSolved(): string[] {
    var solvedPokemonId: string[] = [];
    var counter = 1;
    while (counter <= PokeUtil.getPokemonTotalCount()) {
        var id = ('00' + counter.toString()).substr(-3);
        if (localStorage.getItem(id) !== null) {
            solvedPokemonId[solvedPokemonId.length] = id;
        }
        counter++;
    }
    return solvedPokemonId;
}

function populatePokedex(solved): void {
    var indexes = PokeUtil.getPokemonTotalCount();
    for (var row = 0; row <= (indexes / 10); row ++) {
        $('#pokedexGrid').append('<div class="row" id="row' + row.toString() + '"></div>');
        for (var col = 0; col < 10; col ++) {
            var sprite = $('<div/>', {
                class: 'pokedexCell',
                row: row,
                col: col,
            });
            var numIndex = row * 10 + col + 1;
            var index = ("00" + (numIndex).toString()).substr(-3);
            if (solved.indexOf(index) !== -1){
                sprite.html('<img class=pokedexSprite src=/images/sprites/' + index + '.png>');
            } else if (numIndex <= PokeUtil.getPokemonTotalCount()) {
                sprite.html('<img class="pokedexSprite pokedexNonSolved" src=/images/sprites/' + index + '.png>');
            }
            $('#row' + row.toString()).append(sprite);
        }
    }
}
