import { PokemonWrapper } from './pokemon-wrapper.model';

export interface Type{
    id: number;
    name: string;
    pokemon: {
        pokemon: PokemonWrapper;
    }[]
}