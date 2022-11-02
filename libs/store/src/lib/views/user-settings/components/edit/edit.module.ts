import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditRoutingModule } from './edit-routing.module';
import { EditComponent } from './edit.component';
import { CityPickerModule } from 'libs/store/src/lib/components/city-picker/city-picker.module';
import { SexPickerModule } from 'libs/store/src/lib/components/sex-picker/sex-picker.module';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
	declarations: [EditComponent],
	imports: [CommonModule, EditRoutingModule, CityPickerModule, SexPickerModule, FormsModule, FontAwesomeModule, NgbDatepickerModule, HttpClientModule],
	exports: [EditComponent],
})
export class EditModule {}
