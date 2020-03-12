import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DatasetProvider } from '../../providers/dataset/dataset';
import { WorkoutTimerPage } from '../workout-timer/workout-timer';
import { StorageProvider } from '../../providers/storage/storage';
import { DbProvider } from '../../providers/db/db';


/**
 * Generated class for the TrainingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-training',
  templateUrl: 'training.html',
})
export class TrainingPage {

  workoutDataset = <any>[];  
  totalProgress = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams,public datasetProvider: DatasetProvider,public db: DbProvider) {
    //this.loadData()
  }

  loadData(){
    this.workoutDataset = <any>[]; 
    this.totalProgress = 0;
    this.datasetProvider.getWorkout().subscribe(d => {
      //this.workoutDataset = d.day
      let i = 0;
      for(let w of d.day){
        i++
        let workout = {
          workout:w.workout,
          time:w.time,
          progress:0
        };
        this.db.getProgressByDay(i).then(res => {
          //console.log(res)
          try {
            workout.progress = res.res.rows[0].workoutPassed/7*100
            this.totalProgress += res.res.rows[0].workoutPassed/7 | 0
          } catch (error) {
            
          }
        })

        this.workoutDataset.push(workout)
      }
      console.log(this.workoutDataset);
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TrainingPage');
  }

  goWorkoutTimerPage(i, day) {
    this.navCtrl.push(WorkoutTimerPage, { day: i + 1, workout: day.workout })
  }

  getProgessByDay(i){
    return this.db.getProgressByDay(i)
  }

  ionViewWillEnter(){
    console.log("ionViewWillEnter")
  }
  ionViewDidEnter(){
    console.log("ionViewDidEnter")
    this.loadData()
  }
  ionViewWillLeave(){
    console.log("ionViewWillLeave")
  }
  ionViewDidLeave(){
    console.log("ionViewDidLeave")
  }
  ionViewWillUnload(){
    console.log("ionViewWillUnload")
  }
  ionViewCanEnter(){
    console.log("ionViewCanEnter")
  }
  ionViewCanLeave(){
    console.log("ionViewCanLeave")
  }
  
}
