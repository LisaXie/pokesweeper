/// <reference path="Pokesweeper.ts" />

$(() => {
    var game = new Pokesweeper(cells);
    initDropdown();
});

function initDropdown(): void {
    for (var i = 1; i < names.length; i++) {
        var id = ('00' + i.toString()).substr(-3);
        var option = $('<option/>', {
            value: id,
            id: 'dropdown' + id,
            text: id + ' - ' + names[i]
        });
        
        if (currentId == id) {
            option.attr('selected', 'selected');
        }
        
        $('#dropdown').append(option);
    }
}

function selectPokemon(): void {
    var dropdown = $('#dropdown')[0];
    var pokemonId = dropdown.options[dropdown.selectedIndex].value;
    window.location.replace(pokemonId);
}

function chooseRandom(): void {
    window.location.replace(getRandomPokemonId());
}

function chooseRandomUnsolved(): void {
    if (localStorage.getItem('pokedex') === getPokemonTotalCount().toString()) {
        console.log('Congrats, you have no unsolved Pokémon left!');
    } else {
        do {
            var pokemonId = getRandomPokemonId();
        } while (localStorage.getItem(pokemonId) !== null);
        
        window.location.replace(pokemonId);
    }
}

/**
 * Returns a random string in 001 through 721.
 */
function getRandomPokemonId(): string {
    var total = getPokemonTotalCount();
    var index = Math.ceil(Math.random() * total);
    
    return ('00' + index.toString()).substr(-3);
}

function getPokemonTotalCount(): number {
    return 721;
}