import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PokemonsListComponent } from './modules/main-page/components/pokemons-list/pokemons-list.component';
import { PokemonDetailComponent } from './modules/main-page/components/pokemon-detail/pokemon-detail.component';
import { TypesListComponent } from './modules/main-page/components/types-list/types-list.component';

const routes: Routes = [
  { path: 'type/:id', component: PokemonsListComponent, pathMatch: 'full' },
  { path: 'pokemon/:id', component: PokemonDetailComponent, pathMatch: 'full' },
  { path: '', component: TypesListComponent, pathMatch: 'full'},
  { path: '**', component: TypesListComponent, pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
