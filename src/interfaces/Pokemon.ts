export interface APIResource {
    url: string
}

export interface ChainLink {
    is_baby: boolean,
    species: NamedAPIResource,
    evolution_details: EvolutionDetail[],
    evolves_to: ChainLink[]
}

export interface EvolutionDetail {
    item: NamedAPIResource,
    trigger: NamedAPIResource,
    gender: number,
    held_item: NamedAPIResource,
    known_move: NamedAPIResource,
    known_move_type: NamedAPIResource,
    location: NamedAPIResource,
    min_level: number,
    min_happiness: number,
    min_beauty: number,
    min_affection: number,
    needs_overworld_rain: boolean,
    party_species: NamedAPIResource,
    relative_physical_stats: number,
    time_of_day: string,
    trade_species: NamedAPIResource,
    turn_upside_down: boolean
}

export interface EvolutionChain {
    id: number,
    baby_trigger_item: NamedAPIResource | undefined,
    chain: ChainLink
}

export interface FlavorText {
    flavor_text: string,
    language: NamedAPIResource,
    version: NamedAPIResource
}

export interface NamedAPIResource {
    name: string,
    url: string,
}

export interface PokemonAbility {
    is_hidden: boolean,
    slot: number,
    ability: NamedAPIResource
}

export interface PokemonSpecies {
    id: number,
    name: string,
    order: number,
    gender_rate: number,
    capture_rate: number,
    base_happiness: number,
    is_baby: boolean,
    is_legendary: boolean,
    is_mythical: boolean,
    hatch_counter: number,
    has_gender_differences: boolean,
    forms_switchable: boolean,
    growth_rate: Record<any, any>
    pokedex_numbers: string[],
    egg_groups: NamedAPIResource[],
    color: Record<any, any>,
    shape: Record<any, any>,
    evolves_from_species: Record<any, any>,
    evolution_chain: APIResource,
    habitat: string[],
    generation: number[],
    names: string[],
    pal_park_encounters: Record<any, any>,
    flavor_text_entries: FlavorText[],
    form_descriptions: Record<any, any>,
    genera: Record<any, any>,
    varieties: Record<any, any>
}

export interface PokemonSprites {
    front_default: string,
    front_shiny: string,
    front_female: string,
    front_shiny_female: string,
    back_default: string,
    back_shiny: string,
    back_female: string,
    back_shiny_female: string
}

export interface PokemonStat {
    stat: NamedAPIResource,
    base_stat: number,
    effort: number
}

export interface PokemonType {
    slot: number,
    type: NamedAPIResource
}

export interface PokemonAttributes {
    id: number,
    name: string,
    base_experience: number,
    height: number,
    is_default: boolean,
    order: number,
    weight: number,
    abilities: PokemonAbility[],
    forms: string[],
    game_indices: string[],
    held_items: string[],
    location_area_encouters: string,
    moves: Record<any, any>,
    past_types: string[],
    sprites: PokemonSprites,
    species: Record<any, any>,
    stats: PokemonStat[],
    types: PokemonType[]
}

// Default inteface
// export interface PokemonAttributes {
//     id: number,
//     name: string,
//     base_experience: number,
//     height: number,
//     is_default: boolean,
//     order: number,
//     weight: number,
//     abilities: string[],
//     forms: string[],
//     game_indices: string[],
//     held_items: string[],
//     location_area_encouters: string,
//     moves: Record<any, any>,
//     past_types: string[],
//     sprites: Record<any, any>,
//     species: Record<any, any>,
//     stats: Record<any, any>,
//     types: string[]
// }