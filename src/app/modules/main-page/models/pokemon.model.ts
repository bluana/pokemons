import { AbilityWrapper } from './ability-wrapper.model';

export interface Pokemon{
    id: number;
    name: string;
    weight: number;
    height: number;
    abilities: {
        ability: AbilityWrapper;
        is_hidden: string;
    }[];
    sprites: {
        front_default: string;
    };
}