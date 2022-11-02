import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SexPickerComponent } from './sex-picker.component';

@NgModule({
	declarations: [SexPickerComponent],
	imports: [CommonModule],
	exports: [SexPickerComponent],
})
export class SexPickerModule {}
