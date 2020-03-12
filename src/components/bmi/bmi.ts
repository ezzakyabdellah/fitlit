import { Component } from '@angular/core';
import { BmiProvider } from '../../providers/bmi/bmi';

/**
 * Generated class for the BmiComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'bmi',
  templateUrl: 'bmi.html'
})
export class BmiComponent {

  height: number;
  weight: number;
  BMI: BMI;


  text: string;

  constructor(private bmiProvider: BmiProvider) {
    console.log('Hello BmiComponent Component');
    this.text = 'Hello World';
  }

  calculateBmi(){
    this.BMI = this.bmiProvider.calculateBMI(this.height, this.weight);
  }

}
