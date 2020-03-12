import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WorkoutTimerPage } from './workout-timer';

@NgModule({
  declarations: [
    WorkoutTimerPage,
  ],
  imports: [
    IonicPageModule.forChild(WorkoutTimerPage),
  ],
})
export class WorkoutTimerPageModule {}
