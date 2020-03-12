import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NavController } from 'ionic-angular';

/**
 * Generated class for the ProgressBarComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'progress-bar1',
  templateUrl: 'progress-bar1.html'
})
export class ProgressBar1Component {

  @Input('progress') progress;
  @Input('Of') Of; 
  @Input('Text') Text; 
  @Input('paused') paused; 

  @Output() pClick = new EventEmitter();

  text: string;

  constructor() {
  }

  mClick(value){
    this.pClick.next(value)
  }
}
