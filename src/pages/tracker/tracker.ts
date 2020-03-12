import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Insomnia } from '@ionic-native/insomnia';
import { DbProvider } from '../../providers/db/db';
import { WorkoutFinishedPage } from '../workout-finished/workout-finished'

/**
 * Generated class for the TrackerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tracker',
  templateUrl: 'tracker.html',
})
export class TrackerPage {

  timerIcon = 'pause';
  params;
  workout = "Get Ready!";
  timeLeft = 3;
  paused = false;
  currentWorkout = -1;
  insomnia;
  nativeAudio;
  timeWorkout = 3;
  totalStep = 1;
  stepLeft = 3;
  timeForStep;
  lamp
  timerVar;
  doingSet = 0;
  dayWorkout;
  stepPerSec = 1;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    insomnia: Insomnia,
    public db  : DbProvider/* 
    nativeAudio: NativeAudio,
    public admob: AdMobFree */) {
      console.log(navParams.data)
    this.params = navParams.data.workout;
    this.dayWorkout = navParams.data.day;
    this.insomnia = insomnia;
    /* this.nativeAudio = nativeAudio */;

  }
/*   showBanner() {
    let bannerConfig: AdMobFreeBannerConfig = {
      isTesting: false,
      autoShow: true,
      id: 'ca-app-pub-8884366005214744/7623386145'
    }
    this.admob.banner.config(bannerConfig);
    this.admob.banner.prepare().then(() => {


    }).catch(e => console.log(e));
  }

  showInterstitial() {
    let interstitialConfig: AdMobFreeInterstitialConfig = {
      isTesting: false,
      autoShow: true,
      id: 'ca-app-pub-8884366005214744/5084852713'
    }
    this.admob.interstitial.config(interstitialConfig);

    this.admob.interstitial.prepare().then(() => {

    });
  } */

  ionViewDidLoad() {
    this.insomnia.keepAwake();
    /* this.nativeAudio.play('smolBeep') */
    this.timer();
 /*    this.showBanner(); */


  }
  playPause() {

    if (this.paused) {
      this.paused = false;
      this.timerIcon = 'pause';
    } else {
      this.timerIcon = 'play';
      this.paused = true;
    }
  }
  ionViewWillLeave() {
    clearInterval(this.timerVar);
  }
  timer() {
    this.timerVar = setInterval(x => {

      if (!this.paused) {

        if (this.timeLeft > 1) {
          if (this.timeLeft <= 4) {
            /* this.nativeAudio.play('smolBeep'); */
          }
          this.timeLeft--;
          this.lamp += 1
          if(this.lamp == this.timeForStep){
            this.lamp = 0;
            this.stepLeft--;
          }
        }
        // else if (this.currentWorkout < this.params.reps.length - 1) {
          else if (this.currentWorkout <= this.params.length - 1) {
            if (this.doingSet == this.params.length) {
              
                          /* this.nativeAudio.play('bigBeep'); */
                          this.workout = "Done!";
                          this.timeLeft = 1;
                          this.stepLeft = 1;
                          this.insomnia.allowSleepAgain();
                          clearInterval(this.timerVar);
                          //this.SaveState(7);
                          this.navCtrl.push(WorkoutFinishedPage,this.navParams.data)
                          /* this.showInterstitial(); */
                        } else {
                          this.doingSet++;
                          this.currentWorkout ++;
                          this.workout = this.params[this.currentWorkout].workout;
                          this.totalStep = this.params[this.currentWorkout].step;
                          this.stepLeft = this.totalStep;
                          this.lamp = 0;
                          this.timeForStep = this.params[this.currentWorkout].time;
                          this.timeLeft = this.params[this.currentWorkout].time * this.totalStep;
                          this.timeWorkout = this.timeLeft;
                          /* this.nativeAudio.play('bigBeep'); */

                        }
        } 

      }
    }, 1000);


  }

  SaveState(workoutPassed){
    this.db.SaveNewState(this.dayWorkout,workoutPassed);
  }

  /* ngOnDestroy(){
    console.log( "ngOnDestroy()" )
  } */

  ionViewDidLeave() {
    console.log( "viewDidLeave()" )   
    this.SaveState(this.currentWorkout + 1)
  }

}
