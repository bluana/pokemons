import { TypeWrapper } from './type-wrapper.model';

export interface TypeList{
    count: number;
    next: any;
    previous: any;
    results: TypeWrapper[];
}