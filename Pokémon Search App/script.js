document.getElementById("search-button").addEventListener("click", function() {
    const input = document.getElementById("search-input").value.trim().toLowerCase();
    const url = `https://pokeapi.co/api/v2/pokemon/${input}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error("Pokémon not found");
            }
            return response.json();
        })
        .then(data => {
            // Clear previous data
            clearPokemonData();

            // Set Pokémon data
            document.getElementById("pokemon-name").textContent = data.name.toUpperCase();
            document.getElementById("pokemon-id").textContent = data.id; // Use only the ID
            document.getElementById("weight").textContent = `Weight: ${data.weight}`;
            document.getElementById("height").textContent = `Height: ${data.height}`;
            document.getElementById("hp").textContent = data.stats[0].base_stat; // Remove "HP:"
            document.getElementById("attack").textContent = data.stats[1].base_stat; // Remove "Attack:"
            document.getElementById("defense").textContent = data.stats[2].base_stat; // Remove "Defense:"
            document.getElementById("special-attack").textContent = data.stats[3].base_stat; // Remove "Special Attack:"
            document.getElementById("special-defense").textContent = data.stats[4].base_stat; // Remove "Special Defense:"
            document.getElementById("speed").textContent = data.stats[5].base_stat; // Remove "Speed:"

            // Set types
            const typesContainer = document.getElementById("types");
            data.types.forEach(type => {
                const typeElement = document.createElement("div");
                typeElement.textContent = type.type.name.toUpperCase();
                typesContainer.appendChild(typeElement);
            });

            // Set sprite
            const sprite = document.getElementById("sprite");
            sprite.src = data.sprites.front_default;
            sprite.alt = `${data.name} sprite`;
        })
        .catch(error => {
            alert(error.message);
        });
});

function clearPokemonData() {
    document.getElementById("pokemon-name").textContent = '';
    document.getElementById("pokemon-id").textContent = '';
    document.getElementById("weight").textContent = '';
    document.getElementById("height").textContent = '';
    document.getElementById("hp").textContent = '';
    document.getElementById("attack").textContent = '';
    document.getElementById("defense").textContent = '';
    document.getElementById("special-attack").textContent = '';
    document.getElementById("special-defense").textContent = '';
    document.getElementById("speed").textContent = '';
    document.getElementById("types").innerHTML = '';
    document.getElementById("sprite").src = '';
}
