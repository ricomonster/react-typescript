import React, { useState } from 'react';

// Components
import Pokedex from './components/Pokedex';
import SearchForm from './components/SearchForm';

// Interface
import { PokemonAttributes } from './interfaces/Pokemon';

import './styles.css';

const App = () => {
    const [pokemon, setPokemon] = useState<PokemonAttributes>({} as PokemonAttributes);

    const handleResult = (pokemon: PokemonAttributes) => {
        setPokemon(pokemon);
    };

    return (
        <div className="app">
            <div className="container p-3">
                <div className="title text-center">
                    <i className="nes-pokeball"></i>
                    <h1>Pokedex</h1>
                </div>

                <SearchForm 
                    // onResults={setPokemon}
                    onResults={handleResult}/>

                {pokemon && pokemon.id &&
                    <Pokedex pokemon={pokemon}/>
                }
            </div>
        </div>
    );
}

export default App;
