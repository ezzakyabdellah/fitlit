import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageProvider, TABLES } from '../storage/storage';

/*
  Generated class for the DbProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DbProvider {

  constructor(public http: HttpClient, public storage: StorageProvider) {
    console.log('Hello DbProvider Provider');
  }

  SaveNewState(day, _workoutPassed) {
    let o = {
      id: null,
      day: day,
      date: Date.UTC.toString(),
      workoutPassed: _workoutPassed
    }
    //this.storage.insert(o, TABLES.day)

    this.getProgressByDay(day).then(res => {
      if (res.res.rows.length > 0) {
        o.id = res.res.rows[0].id
        this.storage.update(o, TABLES.day).then(res => {
          console.log(res.res)
        })
      } else {
        this.storage.insert(o, TABLES.day).then(res => {
          console.log(res.res)
        });
      }
    })

  }
  getProgressByDay(day) {
    return this.storage.query('select * from day where day=?', [day])
  }
  // getProgressByDay(day){
  //   let n;
  //   this.storage.query('select * from day where day=?',[day]).then(res => {
  //     return 10/* (res.workoutPassed/7*100).valueOf() */
  //   })
  // }

  saveNewWeight(day, weight) {
    let o = {
      id: null,
      day: day,
      weight: weight
    }
    this.getProgressByDay(day).then(res => {
      if (res.res.rows.length > 0) {
        o.id = res.res.rows[0].id
        this.storage.update(o, TABLES.day).then(res => {
          console.log(res.res)
        })
      } else {
        this.storage.insert(o, TABLES.day).then(res => {
          console.log(res.res)
        });
      }
    })
  }

}
