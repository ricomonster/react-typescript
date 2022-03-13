import React, { useEffect, useState } from 'react';

// Hooks
import usePrevious from '../hooks/usePrevious';

// Components
import EvolutionChain from './EvolutionChain';

// Interface
import { PokemonAttributes, PokemonSpecies } from '../interfaces/Pokemon';
import { PokedexProps, Tabs, BaseStats } from '../interfaces/Pokedex';

const Pokedex: React.FC<PokedexProps> = (props: PokedexProps) => {
    const { pokemon, withDetails } = props;

    const tabs: Tabs[] = [
        { name: 'About', tab: 'about' },
        { name: 'Base Stats', tab: 'stats' },
        { name: 'Evolution', tab: 'evolution' },
        { name: 'Moves', tab: 'moves' },
    ];

    const baseStats: BaseStats = {
        'hp': { name: 'HP', color: 'is-success' },
        'attack': { name: 'Attack', color: 'is-error' },
        'defense': { name: 'Defense', color: 'is-success' },
        'special-attack': { name: 'Special Attack', color: 'is-error' },
        'special-defense': { name: 'Special Defense', color: 'is-success' },
        'speed': { name: 'Speed', color: 'is-error' }
    };

    // In this setup, first show by using useState to save the current pokemon
    // const [currentPokemon, setCurrentPokemon] = useState<PokemonAttributes>({} as PokemonAttributes);
    const previousPokemon = usePrevious<PokemonAttributes>(pokemon);

    const [pokemonSpecies, setPokemonSpecies] = useState<PokemonSpecies>({} as PokemonSpecies);

    const [selectedTab, setSelectedTab] = useState<string>('about');

    const [weight, setWeight] = useState<number>(0);
    const [height, setHeight] = useState<number>(0);

    /**
     * Fetches more in-depth details of the pokemon.
     * 
     * @param {number} id
     * @returns {void}
     */
    const getPokemonSpecies = (id: number): void => {
        fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                setPokemonSpecies(result);
            })
            .catch((error) => {
                console.log(error);
                // setLoading(false);
            });
    };

    // Listens for changes in the variables passed as an argument
    // An empty array indicates this will run once the component is loaded.
    useEffect(() => {
        if (pokemon?.weight) {
            // Weight from the API is in hectorgram
            setWeight(pokemon.weight * 0.1);
        }

        if (pokemon?.height) {
            setHeight(pokemon.height * 10);
        }
    }, [pokemon]);

    useEffect(() => {
        if (
            previousPokemon && 
            pokemon && 
            (previousPokemon.id === pokemon.id)
        ) {
            // Reset the tab selection
            setSelectedTab('about');
        } else {
            // Get additional info about the pokemon
            getPokemonSpecies(pokemon?.id || 0);
        }
    }, [pokemon, previousPokemon]);

    return (
        <div className={'pokedex' + ((withDetails) ? '' : ' no-details')}>
            <div className="pokemon-details d-flex justify-content-between">
                {withDetails ? (
                    <h3>{pokemon?.name}</h3>
                ) : (
                    <h5>{pokemon?.name}</h5>
                )}

                {pokemonSpecies?.order &&
                    <h4 className="pokedex-number float-end">
                        #{pokemonSpecies.order}
                    </h4>
                }
            </div>

            <div className="types">
                {pokemon?.types && pokemon.types.map((type) => {
                    return (
                        <a href="#/" className="nes-badge" key={type.slot}>
                            <span className={type.type.name || ''}>
                                {type.type.name || ''}
                            </span>
                        </a>
                    );
                })}
            </div>

            <div className="row">
                <div className={'col' + ((withDetails) ? ' col-4' : '')}>
                    {pokemon?.id &&
                        <img
                            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
                            alt={pokemon.name}
                            className="img-fluid pokemon-image" />
                    }
                </div>
                
                {withDetails &&
                    <div className="col col-8">
                        <ul className="nav">
                            {tabs.map((tab) => {
                                return (
                                    <li 
                                        className={'nav-item' + (tab.tab === selectedTab) ? 'active' : ''}
                                        key={tab.tab}
                                    >
                                        <a 
                                            className="nav-link" 
                                            href="#/"
                                            onClick={(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
                                                event.preventDefault();
                                                setSelectedTab(tab.tab)
                                            }}
                                        >
                                            {tab.name}
                                        </a>
                                    </li>
                                );
                            })}
                            {/* <li className="nav-item">
                                <a className="nav-link active" href="#/">About</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#/">Base Stats</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#/">Evolution</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#/">Moves</a>
                            </li> */}
                        </ul>

                        <div className="tabs">
                            <div className={"tab nes-container " + (selectedTab === 'about' ? 'active' : '')}>
                                <div className="pokemon-description">
                                    {pokemonSpecies.flavor_text_entries &&
                                        <p>{pokemonSpecies.flavor_text_entries[0].flavor_text.replace(/\s+/g, ' ').trim()}</p>
                                    }
                                </div>

                                <table className="table table-borderless">
                                    <tbody>
                                        <tr>
                                            <th style={{width: "25%"}}>Height</th>
                                            <td>{height}cm</td>
                                        </tr>
                                        <tr>
                                            <th>Weight</th>
                                            <td>{weight}kg</td>
                                        </tr>
                                        <tr>
                                            <th>Abilities</th>
                                            <td>
                                                {pokemon?.abilities && pokemon.abilities.map((ability) => {
                                                    return (
                                                        <p key={ability.slot}>
                                                            {ability.ability.name || ''}
                                                            {ability.is_hidden &&
                                                            <span>(hidden)</span> 
                                                            }
                                                        </p>
                                                    );
                                                })}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>

                                <h4>Breeding</h4>

                                <table className="table table-borderless">
                                    <tbody>
                                        <tr>
                                            <th style={{width: "25%"}}>Gender</th>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <th>Egg Groups</th>
                                            <td>
                                                {pokemonSpecies.egg_groups && pokemonSpecies.egg_groups.map((egg) => {
                                                    return (
                                                        <p className="egg-group" key={egg.name}>{egg.name}</p>
                                                    )
                                                })}
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>Egg Cycle</th>
                                            <td>{pokemonSpecies.hatch_counter}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div className={"tab nes-container " + (selectedTab === 'stats' ? 'active' : '')}>
                                <table className="table table-borderless">
                                    <tbody>
                                        {pokemon?.stats && pokemon.stats.map((stat) => {
                                            return (
                                                <tr key={stat.stat.name}>
                                                    <th style={{width: "25%"}}>{baseStats[stat.stat.name].name}</th>
                                                    <td width="10%">{stat.base_stat}</td>
                                                    <td>
                                                        <progress 
                                                            className={'nes-progress ' + baseStats[stat.stat.name].color}
                                                            style={{height: '18px'}}
                                                            value={stat.base_stat || 0} max="100" />
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>

                            <div className={"tab nes-container " + (selectedTab === 'evolution' ? 'active' : '')}>
                                {pokemonSpecies.evolution_chain &&
                                    <EvolutionChain url={pokemonSpecies.evolution_chain.url} />
                                }
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
};

Pokedex.defaultProps = {
    withDetails: true
} as Partial<PokedexProps>;

export default Pokedex;