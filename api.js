async function getPokemonData(pokedexNum) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokedexNum}`);
    if (!response.ok) throw new Error(`Failed to fetch data for Pokédex #${pokedexNum}`);
    return await response.json();
}

export { getPokemonData };
