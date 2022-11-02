import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SumaryRoutingModule } from './sumary-routing.module';
import { SumaryComponent } from './sumary.component';
import { ProfilePictureModule } from 'libs/store/src/lib/components/profile-picture/profile-picture.module';

@NgModule({
	declarations: [SumaryComponent],
	imports: [CommonModule, SumaryRoutingModule, ProfilePictureModule],
	exports: [SumaryComponent],
})
export class SumaryModule {}
