import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DatasetProvider } from '../../providers/dataset/dataset';
import { TrackerPage } from '../tracker/tracker'

/**
 * Generated class for the WorkoutTimerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-workout-timer',
  templateUrl: 'workout-timer.html',
})
export class WorkoutTimerPage {

  workoutDataset;
  //param;

  constructor(public navCtrl: NavController, public navParams: NavParams, datasetProvider: DatasetProvider) {
    /* datasetProvider.getWorkout().subscribe(d => {
      this.workoutDataset = d
      console.log(d);
    }) */
    this.workoutDataset = navParams.data.workout
    console.log(navParams)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WorkoutTimerPage');
  }

  StartTraining(){
    this.navCtrl.push(TrackerPage,this.navParams.data)
  }
}
