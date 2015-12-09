/// <reference path="PokeUtil.ts" />
/// <reference path="../../typings/jquery/jquery.d.ts" />

$(() => {
    updateCounter();
    populatePokedex();
});

function updateCounter(): void {
    var solved = PokeUtil.getSolvedIndices().length.toString();
    var total = PokeUtil.getPokemonTotalCount().toString();
    $('#pokedexCounter').text(solved + ' / ' + total);
}

function populatePokedex(): void {
    var cols = 10;
    
    for (var row = 0; row < PokeUtil.getPokemonTotalCount()/cols; row++) {
        $('#pokedexGrid').append('<div class="row" id="row' + row.toString() + '"></div>');
    }
    
    for (var i = 1; i <= PokeUtil.getPokemonTotalCount(); i++) {
        var index = PokeUtil.getIndexStr(i);
        var sprite = $('<div class="pokedexCell"><a href="/' + index + '" /></div>');
        var spriteImage = $('<img class="pokedexSprite" src="/images/sprites/' + index + '.png" />');
        
        sprite.children().append(spriteImage);
        
        if (!PokeUtil.isSolved(index)) {
            sprite.addClass('pokedexNonSolved');
        }
        $('#row' + Math.floor((i - 1) / cols).toString()).append(sprite);
    }
}
