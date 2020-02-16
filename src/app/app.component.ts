import { Component, OnInit } from '@angular/core';
import { LoadingService } from './modules/main-page/services/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'pokemons';

  constructor(
    private loadingService: LoadingService,
  ){}
  
}
