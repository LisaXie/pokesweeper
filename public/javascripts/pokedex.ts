/// <reference path="PokeUtil.ts" />

$(() => {
    var solved: string[] = getSolved();
    populatePokeDex(solved);
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

function populatePokeDex(indexes): void {

	for (var row = 0; row < (indexes.length / 10); row ++) {
		$('#pokedexGrid').append('<div class="row" id="row' + row.toString() + '"></div>');
		for (var col = 0; col < 10; col ++) {
			var sprite = $('<div/>', {
				class: 'pokedexCell',
				row: row,
				col: col,
			});
			if (indexes.length > row * 10 + col){
				sprite.html('<img class=pokedexSprite src=/images/sprites/' + indexes[row * 10 + col] + '.png>');
			} 
			$('#row' + row.toString()).append(sprite);
		}
	}
}
