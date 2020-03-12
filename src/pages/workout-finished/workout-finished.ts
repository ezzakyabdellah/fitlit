import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DatasetProvider } from '../../providers/dataset/dataset';
import { DbProvider } from '../../providers/db/db';
import { TrainingPage } from '../training/training';

/**
 * Generated class for the WorkoutFinishedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-workout-finished',
  templateUrl: 'workout-finished.html',
})
export class WorkoutFinishedPage {
  weight = 60
  day

  constructor(public navCtrl: NavController, public navParams: NavParams, public db : DbProvider) {
    this.day = navParams.data.day
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WorkoutFinishedPage');
  }

  saveWeight(){
    this.db.saveNewWeight(this.day,this.weight)
  }
  gototraining(){
    this.navCtrl.push(TrainingPage)
  }

}
