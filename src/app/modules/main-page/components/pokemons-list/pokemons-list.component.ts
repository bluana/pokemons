import { Component, OnInit } from '@angular/core';
import { CommunicatorService } from '../../services/communicator.service';
import { Type } from '../../models/type.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Pokemon } from '../../models/pokemon.model';
import { Location } from '@angular/common';
import { CatchService } from '../../services/catch.service';
import { LoadingService } from '../../services/loading.service';
import { PokemonWrapper } from '../../models/pokemon-wrapper.model';

@Component({
  selector: 'app-pokemons-list',
  templateUrl: './pokemons-list.component.html',
  styleUrls: ['./pokemons-list.component.css']
})
export class PokemonsListComponent implements OnInit {
  type: Type = {
    id: 0,
    name: '',
    pokemon: [],
  };

  pokemons: PokemonWrapper[];

  filteredPokemons: PokemonWrapper[] = [];

  searchValue: string = '';

  caught: boolean = false;

  constructor(
    private communicatorService: CommunicatorService,
    private route: ActivatedRoute,
    private _location: Location,
    public catchService: CatchService,
    private loadingService: LoadingService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.pokemons = [];
    this.searchValue = '';

    this.route.params.subscribe(params => { 
      const id = params['id'];
      const storedType = localStorage.getItem('type_' + id);
      if (storedType) {
        this.type = JSON.parse(storedType);
      } else {
        this.loadingService.isLoading = true;
        this.communicatorService.getTypeById(id).toPromise().then(
          (type: Type) => {
            this.type = type; 
            localStorage.setItem('type_' + id, JSON.stringify(this.type));
            this.loadingService.isLoading = false;
          }
        );
      }
      for (const pokeWrapper of this.type.pokemon) {
      this.pokemons.push(pokeWrapper.pokemon);
    }
    this.filteredPokemons = this.pokemons;
    });

    
  }

  selectPokemon(pokemonWrap: PokemonWrapper): void{
    this.loadingService.isLoading = true;
    this.communicatorService.getPokemonByUrl(pokemonWrap.url).toPromise().then(
      (pokemon: Pokemon) => {
        localStorage.setItem('pokemon_' + pokemon.id, JSON.stringify(pokemon));
        this.router.navigate(['/pokemon', pokemon.id]);
        this.loadingService.isLoading = false;
      }
    );
  }

  filterPokemon(): void{
    if(!this.searchValue && !this.caught){
      this.filteredPokemons = this.pokemons;
    }
    if(this.caught && this.searchValue){
      this.filteredPokemons = Object.assign([], this.pokemons)
      .filter((pokemon: Pokemon) => this.catchService.getChatched().includes(pokemon.name))
      .filter((pokemon: Pokemon) => pokemon.name.toLowerCase().indexOf(this.searchValue.toLowerCase()) > -1);
    }
    if(!this.caught && this.searchValue){
      this.filteredPokemons = Object.assign([], this.pokemons)
      .filter((pokemon: Pokemon) => pokemon.name.toLowerCase().indexOf(this.searchValue.toLowerCase()) > -1);
    }
    if(this.caught && !this.searchValue){
      this.filteredPokemons = Object.assign([], this.pokemons)
      .filter((pokemon: Pokemon) => this.catchService.getChatched().includes(pokemon.name));
    }
  }

  goBack(): void{
    this._location.back();
  }

}
