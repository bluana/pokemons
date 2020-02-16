import { Injectable} from '@angular/core';
import { HttpClient } from '../../../../../node_modules/@angular/common/http';
import { Observable } from 'rxjs';
import { TypeList } from '../models/type-list.model';
import { Type } from '../models/type.model';
import { Pokemon } from '../models/pokemon.model';

@Injectable({
  providedIn: 'root'
})
export class CommunicatorService {
  private api: string = 'https://pokeapi.co/api/v2';

  constructor(private http: HttpClient) { }

  getTypeList(): Observable<TypeList>{
    return this.http.get<TypeList>(`${this.api}/type`);
  }

  getTypeById(id: number): Observable<Type>{
    return this.http.get<Type>(`${this.api}/type/${id}`);
  }

  getTypeByUrl(url: string): Observable<Type>{
    return this.http.get<Type>(url);
  }

  getPokemonById(id: number): Observable<Pokemon>{
    return this.http.get<Pokemon>(`${this.api}/pokemon/${id}`);
  }

  getPokemonByUrl(url: string): Observable<Pokemon>{
    return this.http.get<Pokemon>(url);
  }

}
