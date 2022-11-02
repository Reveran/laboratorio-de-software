import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserSettingsComponent } from './user-settings.component';
import { UserSettingsRoutingModule } from './user-settings-routing.module';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';

@NgModule({
	declarations: [UserSettingsComponent, SideBarComponent, NavBarComponent],
	imports: [CommonModule, UserSettingsRoutingModule],
})
export class UserSettingsModule {}
