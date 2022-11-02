import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRegisterRoutingModule } from './user-register-routing.module';
import { NgbAlertModule, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { UserRegisterComponent } from './user-register.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SexPickerModule } from '../../components/sex-picker/sex-picker.module';
import { CityPickerModule } from '../../components/city-picker/city-picker.module';

@NgModule({
	declarations: [UserRegisterComponent],
	imports: [CommonModule, UserRegisterRoutingModule, FormsModule, CityPickerModule, NgbDatepickerModule, FontAwesomeModule, SexPickerModule, NgbAlertModule],
})
export class UserRegisterModule {}
