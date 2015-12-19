/// <reference path="PokeUtil.ts" />
/// <reference path="../../typings/jquery/jquery.d.ts" />

$(() => {
    initDropDown();
    var allPokemon = PokeUtil.getPokemonTotalCount();
    updateCounter(0, allPokemon);
    populatePokedex(0, allPokemon);
});

function updateCounter(basis, upperLimit): void {
    
    if (basis == 721) {
        basis = 0;
        upperLimit = 721;
    }
    var solved = PokeUtil.getSolvedIndices();
    var solvedCount = 0;
    solved.forEach( solvedIndex => {
        solvedIndex = parseInt(solvedIndex);
        if (solvedIndex >= basis & solvedIndex <= upperLimit){
            solvedCount += 1;
        }
    });

    $('#pokedexCounter').text(solvedCount + ' / ' + (upperLimit-basis));
}

function populatePokedex(basis, upperLimit): void {
    var cols = 10;

    if (basis == 721) {
        basis = 0;
        upperLimit = 721;
    }

    for (var row = 0; row < (upperLimit-basis)/cols; row++) {
        $('#pokedexGrid').append('<div class="row" id="row' + row.toString() + '"></div>');
    }
    
    for (var i = 1; i <= upperLimit-basis; i++) {
        var basisIndex = basis+i;
        var index = PokeUtil.getIndexStr(basisIndex);
        var sprite = $('<div class="pokedexCell"><a href="/' + index + '" /></div>');
        var spriteImage = $('<img class="pokedexSprite" src="/images/sprites/' + index + '.png" />');
        
        sprite.children().append(spriteImage);
        
        if (!PokeUtil.isSolved(index)) {
            sprite.addClass('pokedexNonSolved');
        }
        $('#row' + Math.floor((i - 1) / cols).toString()).append(sprite);
    }
}

function selectPokedex(): void {
    var pokedexLimits = PokeUtil.getLimits();

    var dropdown = <HTMLSelectElement>$('#pokedexSelector')[0];
    var pokedexId = dropdown.options[dropdown.selectedIndex].value;
    $('#pokedexGrid').html('');
    populatePokedex(pokedexLimits[pokedexId], pokedexLimits[parseInt(pokedexId)+1]);
    updateCounter(pokedexLimits[pokedexId], pokedexLimits[parseInt(pokedexId)+1]);
}
/**
* Returns the Pokedex the names for each regional Pokedex
*/
 function initDropDown(): void {
    var pokedexNames = PokeUtil.getPokedex();

    for (var i = 0; i < pokedexNames.length; ++i) {
        var option = $('<option/>', {
            value: i,
            id : 'pokedex ' + i,
            text: pokedexNames[i] + ' Pokedex'
        });

        $('#pokedexSelector').append(option);

        if (pokedexNames[i] == 'Entire') {
            option.attr('selected', 'selected');
        }
        
    }

    
}