import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CityPickerComponent } from './city-picker.component';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
	declarations: [CityPickerComponent],
	imports: [CommonModule, NgbDropdownModule],
	exports: [CityPickerComponent],
})
export class CityPickerModule {}
