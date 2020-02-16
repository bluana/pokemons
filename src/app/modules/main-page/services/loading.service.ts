import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private loading: boolean = false;
  
  public get isLoading() : boolean {
    return this.loading;
  }

  public set isLoading(v : boolean) {
    setTimeout(()=> {
      this.loading = v;
    }, 0);
  }
  
}
