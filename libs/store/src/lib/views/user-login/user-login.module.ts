import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserLoginRoutingModule } from './user-login-routing.module';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { UserLoginComponent } from './user-login.component';
import { FormsModule } from '@angular/forms';

@NgModule({
	declarations: [UserLoginComponent],
	imports: [CommonModule, UserLoginRoutingModule, NgbAlertModule, FormsModule],
})
export class UserLoginModule {}
