async function searchPokemon() {
    const query = document.getElementById('searchInput').value.trim();
    const pokemonCardsDiv = document.getElementById('pokemonCards');
    
    // Clear previous results if the search input is empty
    if (query === '') {
        pokemonCardsDiv.innerHTML = '<p>No Pokémon found</p>';
        return;
    }

    // Validate if the input is numeric for ID search
    const isNumeric = /^\d+$/.test(query); // Check if the input is numeric
    if (isNumeric) {
        console.log("Searching by ID...");
    } else {
        console.log("Searching by Name or Type...");
    }

    // Fetch results based on the user's input
    const response = await fetch(`/search?query=${query}`);
    
    // Ensure response is valid before processing
    if (!response.ok) {
        console.error('Error fetching Pokémon data:', response.statusText);
        pokemonCardsDiv.innerHTML = '<p>Error fetching Pokémon data</p>';
        return;
    }

    const pokemonList = await response.json();
    displayPokemonCards(pokemonList);
}

function displayPokemonCards(pokemonList) {
    const pokemonCardsDiv = document.getElementById('pokemonCards');
    pokemonCardsDiv.innerHTML = ''; // Clear previous results

    if (pokemonList.length === 0) {
        pokemonCardsDiv.innerHTML = '<p>No Pokémon found</p>';
        return;
    }

    pokemonList.forEach(pokemon => {
        const card = document.createElement('div');
        card.className = 'pokemon-card';
        card.innerHTML = `
            <h2>${pokemon.name}</h2>
            <img src="${pokemon.image_url}" alt="${pokemon.name}" class="pokemon-image">
            <p>Type: ${pokemon.type}</p>
            <p>ID: ${pokemon.ID}</p>
            <p>Ability: ${pokemon.abilities}</p>
            <p>HP: ${pokemon.hp}</p>
            <p>Attack: ${pokemon.attack}</p>
            <p>Defense: ${pokemon.defense}</p>
            <p>Speed: ${pokemon.speed}</p>
        `;
        pokemonCardsDiv.appendChild(card);
    });
}





// document.addEventListener('DOMContentLoaded', () => {
//     fetch('/api/pokemon')
//         .then(response => response.json())
//         .then(pokemon => {
//             const select = document.getElementById('pokemonSelect');
//             pokemon.forEach(p => {
//                 const option = document.createElement('option');
//                 option.value = p.id;
//                 option.textContent = `#${p.id} ${p.name}`;
//                 select.appendChild(option);
//             });
//         });

//     document.getElementById('pokemonSelect').addEventListener('change', function() {
//         const id = this.value;
//         if (!id) {
//             document.getElementById('pokemonInfo').style.display = 'none';
//             return;
//         }

//         fetch(`/api/pokemon/${id}`)
//             .then(response => response.json())
//             .then(pokemon => {
//                 document.getElementById('pokemonInfo').style.display = 'block';
//                 document.getElementById('pokemonId').textContent = pokemon.id;
//                 document.getElementById('pokemonName').textContent = pokemon.name;
//                 document.getElementById('pokemonType').textContent = pokemon.type;

//                 document.getElementById('superEffectiveTypes').innerHTML = '';
//                 document.getElementById('notEffectiveTypes').innerHTML = '';
//                 document.getElementById('noEffectTypes').innerHTML = '';

//                 Object.entries(pokemon.type_advantages).forEach(([type, effectiveness]) => {
//                     const badge = document.createElement('span');
//                     badge.textContent = type;
//                     badge.className = 'type-badge';

//                     if (effectiveness === 2) {
//                         badge.classList.add('super-effective');
//                         document.getElementById('superEffectiveTypes').appendChild(badge);
//                     } else if (effectiveness === 0.5) {
//                         badge.classList.add('not-effective');
//                         document.getElementById('notEffectiveTypes').appendChild(badge);
//                     } else if (effectiveness === 0) {
//                         badge.classList.add('no-effect');
//                         document.getElementById('noEffectTypes').appendChild(badge);
//                     }
//                 });
//             });
//     });
// });




// // Load Pokemon list when page loads for the battle helper
// fetch('/api/pokemon')
//     .then(response => {
//         console.log("Fetch response for Pokemon list:", response);
//         return response.json();
//     })
//     .then(pokemon => {
//         console.log("Pokemon list:", pokemon);
//         const select = document.getElementById('pokemonSelect');
//         pokemon.forEach(p => {
//             const option = document.createElement('option');
//             option.value = p.id;
//             option.textContent = `#${p.id} ${p.name}`;
//             select.appendChild(option);
//         });
//     })
//     .catch(error => console.error("Error fetching Pokémon list:", error));

// // Load Pokemon details when selected in the battle helper
// document.getElementById('pokemonSelect').addEventListener('change', function() {
//     const id = this.value;
//     if (!id) {
//         document.getElementById('pokemonInfo').style.display = 'none';
//         return;
//     }

//     fetch(`/api/pokemon/${id}`)
//         .then(response => {
//             console.log("Fetch response for Pokemon details:", response);
//             return response.json();
//         })
//         .then(pokemon => {
//             console.log("Pokemon details:", pokemon);
//             document.getElementById('pokemonInfo').style.display = 'block';
//             document.getElementById('pokemonId').textContent = pokemon.id;
//             document.getElementById('pokemonName').textContent = pokemon.name;
//             document.getElementById('pokemonType').textContent = pokemon.type;

//             // Clear previous type advantages
//             document.getElementById('superEffectiveTypes').innerHTML = '';
//             document.getElementById('notEffectiveTypes').innerHTML = '';
//             document.getElementById('noEffectTypes').innerHTML = '';

//             // Display type advantages
//             Object.entries(pokemon.type_advantages).forEach(([type, effectiveness]) => {
//                 const badge = document.createElement('span');
//                 badge.textContent = type;
//                 badge.className = 'type-badge';

//                 if (effectiveness === 2) {
//                     badge.classList.add('super-effective');
//                     document.getElementById('superEffectiveTypes').appendChild(badge);
//                 } else if (effectiveness === 0.5) {
//                     badge.classList.add('not-effective');
//                     document.getElementById('notEffectiveTypes').appendChild(badge);
//                 } else if (effectiveness === 0) {
//                     badge.classList.add('no-effect');
//                     document.getElementById('noEffectTypes').appendChild(badge);
//                 }
//             });
//         })
//         .catch(error => console.error("Error fetching Pokémon details:", error));
// });