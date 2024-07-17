// Añade un evento de clic al botón de búsqueda
document.getElementById("search-button").addEventListener("click", function() {
    // Obtiene el valor del campo de entrada, elimina los espacios en blanco y lo convierte a minúsculas
    const input = document.getElementById("search-input").value.trim().toLowerCase();
    // Construye la URL para hacer la solicitud a la API de PokeAPI
    const url = `https://pokeapi.co/api/v2/pokemon/${input}`;

    // Realiza una solicitud a la URL de la API
    fetch(url)
        .then(response => {
            // Si la respuesta no es correcta, lanza un error
            if (!response.ok) {
                throw new Error("Pokémon not found");
            }
            // Convierte la respuesta a JSON
            return response.json();
        })
        .then(data => {
            // Limpia los datos anteriores del Pokémon
            clearPokemonData();

            // Establece los datos del Pokémon
            document.getElementById("pokemon-name").textContent = data.name.toUpperCase(); // Nombre del Pokémon en mayúsculas
            document.getElementById("pokemon-id").textContent = data.id; // ID del Pokémon
            document.getElementById("weight").textContent = `Weight: ${data.weight}`; // Peso del Pokémon
            document.getElementById("height").textContent = `Height: ${data.height}`; // Altura del Pokémon
            document.getElementById("hp").textContent = data.stats[0].base_stat; // Puntos de salud del Pokémon
            document.getElementById("attack").textContent = data.stats[1].base_stat; // Ataque del Pokémon
            document.getElementById("defense").textContent = data.stats[2].base_stat; // Defensa del Pokémon
            document.getElementById("special-attack").textContent = data.stats[3].base_stat; // Ataque especial del Pokémon
            document.getElementById("special-defense").textContent = data.stats[4].base_stat; // Defensa especial del Pokémon
            document.getElementById("speed").textContent = data.stats[5].base_stat; // Velocidad del Pokémon

            // Establece los tipos del Pokémon
            const typesContainer = document.getElementById("types"); // Contenedor para los tipos
            data.types.forEach(type => {
                const typeElement = document.createElement("div"); // Crea un nuevo elemento div para cada tipo
                typeElement.textContent = type.type.name.toUpperCase(); // Establece el nombre del tipo en mayúsculas
                typesContainer.appendChild(typeElement); // Añade el tipo al contenedor
            });

            // Establece el sprite del Pokémon
            const sprite = document.getElementById("sprite"); // Elemento de imagen para el sprite
            sprite.src = data.sprites.front_default; // Establece la fuente de la imagen al sprite frontal del Pokémon
            sprite.alt = `${data.name} sprite`; // Establece el texto alternativo de la imagen
        })
        .catch(error => {
            // Muestra una alerta si hay un error
            alert(error.message);
        });
});

// Función para limpiar los datos del Pokémon
function clearPokemonData() {
    document.getElementById("pokemon-name").textContent = ''; // Limpia el nombre del Pokémon
    document.getElementById("pokemon-id").textContent = ''; // Limpia el ID del Pokémon
    document.getElementById("weight").textContent = ''; // Limpia el peso del Pokémon
    document.getElementById("height").textContent = ''; // Limpia la altura del Pokémon
    document.getElementById("hp").textContent = ''; // Limpia los puntos de salud del Pokémon
    document.getElementById("attack").textContent = ''; // Limpia el ataque del Pokémon
    document.getElementById("defense").textContent = ''; // Limpia la defensa del Pokémon
    document.getElementById("special-attack").textContent = ''; // Limpia el ataque especial del Pokémon
    document.getElementById("special-defense").textContent = ''; // Limpia la defensa especial del Pokémon
    document.getElementById("speed").textContent = ''; // Limpia la velocidad del Pokémon
    document.getElementById("types").innerHTML = ''; // Limpia los tipos del Pokémon
    document.getElementById("sprite").src = ''; // Limpia el sprite del Pokémon
}
