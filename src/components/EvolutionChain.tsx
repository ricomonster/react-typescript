import React, { useEffect, useState } from 'react';

// Component
import Pokedex from './Pokedex';

// Interface
import { EvolutionChain as EvolutionChainInterface, NamedAPIResource, PokemonAttributes } from '../interfaces/Pokemon';

interface EvolutionProps {
    url: string
}

interface EvolutionDetails {
    id: number,
    species_name: string,
    min_level: number,
    trigger_name: string | null,
    item: NamedAPIResource | null,
}

const EvolutionChain: React.FC<EvolutionProps> = (props: EvolutionProps) => {
    const { url } = props;

    const [evolutionChain, setEvolutionChain] = useState<EvolutionDetails[]>([]);

    const sortEvolutionChain = (evolution: EvolutionChainInterface) => {
        const evolutionSequence: EvolutionDetails[] = [];
        let evolutionData = evolution.chain;

        do {
            const evolutionDetails = evolutionData.evolution_details[0];

            const splitUrl = evolutionData.species.url.split('/');
            const id = parseInt(splitUrl[splitUrl.length - 2], 10);

            evolutionSequence.push({
                id,
                species_name: evolutionData.species.name,
                min_level: !evolutionDetails ? 1 : evolutionDetails.min_level,
                trigger_name: !evolutionDetails ? null : evolutionDetails.trigger.name,
                item: !evolutionDetails ? null : evolutionDetails.item
            });

            // Set the next evolution data
            evolutionData = evolutionData.evolves_to[0];
        } while (!!evolutionData && evolutionData.evolves_to);

        console.log(evolutionSequence);
        setEvolutionChain(evolutionSequence);
    };

    useEffect(() => {
        const getEvolutionChain = (url: string) => {
            fetch(url)
                .then((res) => res.json())
                .then((result) => {
                    console.log(result);
                    sortEvolutionChain(result);
                })
                .catch((error) => {
                    console.log(error);
                });
        };

        if (url) {
            getEvolutionChain(url);
        }
    }, [url]);

    return (
        <div className="evolution">
            {evolutionChain && evolutionChain.map((evolution) => {
                const pokemon = {
                    id: evolution.id,
                    name: evolution.species_name,
                } as PokemonAttributes;

                return (
                    <div className="chain" key={evolution.species_name}>
                        {evolution.trigger_name === 'level-up' &&
                            <p>evolves at level {evolution.min_level}</p>
                        }

                        {evolution.item && evolution.item.name &&
                            <p>evolves using {evolution.item.name}</p>
                        }

                        <Pokedex pokemon={pokemon} withDetails={false} />
                    </div>
                );
            })}
        </div>
    );
};

export default EvolutionChain;