import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WorkoutFinishedPage } from './workout-finished';

@NgModule({
  declarations: [
    WorkoutFinishedPage,
  ],
  imports: [
    IonicPageModule.forChild(WorkoutFinishedPage),
  ],
})
export class WorkoutFinishedPageModule {}
