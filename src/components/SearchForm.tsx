import React, { useState, useRef } from 'react';

import { PokemonAttributes } from '../interfaces/Pokemon';

interface SearchFormProps {
    // React.Dispatch<React.SetStateAction<PokemonAttributes>> - for setting it directly to the useState
    onResults: (pokemon: PokemonAttributes) => void
}

const SearchForm: React.FC<SearchFormProps> = ({ onResults }: SearchFormProps) => {
    const inputRef = useRef<HTMLInputElement>(null);

    // Setting up the type for this is optional unless you're expecting multiple
    // Data Types
    const [loading, setLoading] = useState(false);
    const [query, setQuery] = useState<string>('');

    const doSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);

        // Perform API Call
        fetch(`https://pokeapi.co/api/v2/pokemon/${query}`)
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                onResults(result);

                setLoading(false);
                // Triggers the onBlur event
                inputRef.current?.blur();
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    };

    const handleOnChangeQuery = (event: React.FormEvent<HTMLInputElement>) => {
        // Sets the value of the query
        setQuery(event.currentTarget.value);
    }

    return (
        <div className="search-form">
            <form onSubmit={doSubmit}>
                <div className="nes-field">
                    <input  
                        className="query nes-input"
                        disabled={loading}
                        onChange={handleOnChangeQuery}
                        ref={inputRef}
                        type="text" />
                </div>
            </form>
        </div>
    );
};

export default SearchForm;