import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the BmiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class BmiProvider {

  height: number;
  weight: number;
  bmiValue: number;
  bmiMessage: string;

  constructor(public http: HttpClient) {
    console.log('Hello BmiProvider Provider');
  }


calculateBMI(height:number, weight:number){
  const BMI = weight / (height / 100 * height / 100);;
  console.log(BMI)
  let mBMI = <BMI>{
    BMI: BMI.toFixed(2),
    classification: this.classifyBMI(BMI),
  };
  console.log(mBMI)
  return mBMI
}

/* calculateBMI(){
  if(this.weight > 0 && this.height > 0){
    let finalBmi = this.weight / (this.height / 100 * this.height / 100);
    this.bmiValue = parseFloat(finalBmi.toFixed(2));
    this.bmiMessage = this.classifyBMI(this.bmiValue);
  }
} */

private classifyBMI(BMI: number){
  if (BMI < 18.5) {
    return 'Underweight';
  }
  else if (BMI > 18.5 && BMI < 24.9){
    return 'Normal Weight';
  }
  
  else if (BMI > 25 && BMI < 29.9){
    return 'Overweight';
  }
  
  else if (BMI > 30 && BMI < 34.9){
    return 'Class 1 Obesity';
  }
  
  else if (BMI > 35 && BMI < 39.9){
    return 'Class 2 Obesity';
  }
  else if (BMI > 40){
    return 'Class 3 Obesity';
  }
}

}
