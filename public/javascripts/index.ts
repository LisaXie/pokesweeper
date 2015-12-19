/// <reference path="Pokesweeper.ts" />

$(() => {
    loadImages();
    initDropdown();
    var game = new Pokesweeper(cells);
});

function initDropdown(): void {
    for (var i = 1; i < names.length; i++) {
        var id = PokeUtil.getIndexStr(i);
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
    var dropdown = <HTMLSelectElement>$('#dropdown')[0];
    var pokemonId = dropdown.options[dropdown.selectedIndex].value;
    window.location.replace(pokemonId);
}

function chooseRandom(): void {
    window.location.replace(PokeUtil.getRandomPokemonId());
}

function chooseRandomUnsolved(): void {
    if (localStorage.getItem('pokedex') === PokeUtil.getPokemonTotalCount().toString()) {
        alert('Congrats, you have no unsolved Pokémon left!');
    } else {
        do {
            var pokemonId = PokeUtil.getRandomPokemonId();
        } while (localStorage.getItem(pokemonId) !== null);
        
        window.location.replace(pokemonId);
    }
}

function viewPokedex(): void {
    window.location.replace('/pokedex');
}

function loadImages(): void {
    var names = [
        'bomb_cell',
        'pattern_flagged',
        'pattern',
        'pikachu_button_happy',
        'pikachu_button_pressed',
        'pikachu_button_sad',
        'pikachu_button'
    ];
    
    names.forEach(name => {
        $('#cache').append($('<img/>', {
            src: '/images/' + name + '.png'
        }));
    });
}

