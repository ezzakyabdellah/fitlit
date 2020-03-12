import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

/*
  Generated class for the DatasetProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DatasetProvider {

  constructor(public http: Http) {
    console.log('Hello DatasetProvider Provider');
  }
  data;

  public getWorkout(){
    return this.http.get('assets/data/fitnessWorkoutDataset.json').map(res => res.json());
  }

}
