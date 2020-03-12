import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NavController } from 'ionic-angular';

/**
 * Generated class for the ProgressBarComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'progress-bar',
  templateUrl: 'progress-bar.html'
})
export class ProgressBarComponent {

  @Input('progress') progress;
  @Output() someEvent = new EventEmitter();

  text: string;

  constructor() {
    console.log('Hello ProgressBarComponent Component');
    this.text = 'Hello World';
  }

}
