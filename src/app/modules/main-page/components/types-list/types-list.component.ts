import { Component, OnInit } from '@angular/core';
import { CommunicatorService } from '../../services/communicator.service';
import { TypeList } from '../../models/type-list.model';
import { Type } from '../../models/type.model';
import { LoadingService } from '../../services/loading.service';
import { TypeWrapper } from '../../models/type-wrapper.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-types-list',
  templateUrl: './types-list.component.html',
  styleUrls: ['./types-list.component.css']
})
export class TypesListComponent implements OnInit {
  types: TypeWrapper[] = [];

  constructor(
    private communicatorService: CommunicatorService,
    private loadingService: LoadingService,
    private router: Router,
  ) { }

  ngOnInit() {
    const storedList = localStorage.getItem('list');
    if (storedList) {
        this.types = JSON.parse(storedList);
    } else {
      this.loadingService.isLoading = true;
      this.communicatorService.getTypeList().toPromise().then( 
        (typeList: TypeList) => {
          for (const typeWrapper of typeList.results) {
            this.types.push(typeWrapper);
          }
          localStorage.setItem('list', JSON.stringify(this.types));
          this.loadingService.isLoading=false;
        }
      );
    }
  }

  selectType(event): void{
    this.loadingService.isLoading = true;
    this.communicatorService.getTypeByUrl(event.value).toPromise().then(
      (type: Type) => {
        localStorage.setItem('type_' + type.id, JSON.stringify(type));
        this.router.navigate(['/type', type.id]);
        this.loadingService.isLoading = false;
      }
    );
  }
}
