import { PokemonAttributes } from './Pokemon'

export interface PokedexProps {
    pokemon?: PokemonAttributes
    withDetails?: boolean,
}

export interface Tabs {
    name: string,
    tab: string
}

export interface BaseStatsOptions {
    name: string,
    color: string,
}

export interface BaseStats {
    [key: string]: BaseStatsOptions
}