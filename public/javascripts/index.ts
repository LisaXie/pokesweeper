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