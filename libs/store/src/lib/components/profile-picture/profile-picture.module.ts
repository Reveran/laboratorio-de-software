import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfilePictureComponent } from './profile-picture.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
	declarations: [ProfilePictureComponent],
	imports: [CommonModule, FontAwesomeModule],
	exports: [ProfilePictureComponent],
})
export class ProfilePictureModule {}
