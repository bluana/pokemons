import { Component, OnInit } from '@angular/core';
import { CommunicatorService } from '../../services/communicator.service';
import { ActivatedRoute } from '@angular/router';
import { Pokemon } from '../../models/pokemon.model';
import { Location } from '@angular/common';
import { CatchService } from '../../services/catch.service';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.css']
})
export class PokemonDetailComponent implements OnInit {
  pokemon: Pokemon = {
    id: -1,
    name: '',
    weight: 0,
    height: 0,
    abilities: [],
    sprites: {
      front_default: '',
    },
  };

  constructor(
    private communicatorService: CommunicatorService,
    private route: ActivatedRoute,
    private _location: Location,
    private catchService: CatchService,
    private loadingService: LoadingService,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => { 
      let id = params['id'];
      const storedPokemon= localStorage.getItem('pokemon_' + id);
      if (storedPokemon) {
        this.pokemon = JSON.parse(storedPokemon);
      } else {
        this.loadingService.isLoading = true;
        this.communicatorService.getPokemonById(id).toPromise().then(
          (pokemon: Pokemon) => {
            this.pokemon = pokemon; 
            localStorage.setItem('pokemon_' + id, JSON.stringify(this.pokemon));
            this.loadingService.isLoading = false;
          }
        );
      }
    });
  }

  catch(pokemon: Pokemon){
    this.catchService.catch(pokemon.name);
  }

  release(pokemon: Pokemon){
    this.catchService.release(pokemon.name);
  }

  goBack(): void{
    this._location.back();
  }

}
