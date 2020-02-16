import { Injectable } from '@angular/core';
import { Pokemon } from '../models/pokemon.model';

@Injectable({
  providedIn: 'root'
})
export class CatchService {
  catched: string[] = [];

  constructor() { }

  catch(name: string): void{
    this.catched.push(name);
  }

  release(name: string): void{
    this.catched.splice(this.catched.indexOf(name));
  }

  isCatched(name: string): boolean{
    return this.catched.indexOf(name) > -1;
  }

  getChatched(): string[]{
    return this.catched;
  }
}
