import { NgModule } from '@angular/core';
import { ProgressBarComponent } from './progress-bar/progress-bar';
import { BmiComponent } from './bmi/bmi';
@NgModule({
	declarations: [ProgressBarComponent,
    BmiComponent],
	imports: [],
	exports: [ProgressBarComponent,
    BmiComponent]
})
export class ComponentsModule {}
