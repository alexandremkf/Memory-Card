// Busca um número específico de pokémons
export async function getPokemons(limit = 8) {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${limit}`
  );
  const data = await response.json();

  // Agora buscamos os detalhes de cada pokémon
  const results = await Promise.all(
    data.results.map(async (pokemon) => {
      const res = await fetch(pokemon.url);
      const pokeData = await res.json();

      return {
        id: pokeData.id,
        name: pokeData.name,
        image: pokeData.sprites.other["official-artwork"].front_default,
      };
    })
  );

  return results;
}