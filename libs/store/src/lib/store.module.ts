import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';

export const storeRoutes: Route[] = [
	{
		path: 'login',
		loadChildren: () => import('./views/user-login/user-login.module').then((m) => m.UserLoginModule),
	},
	{
		path: 'register',
		loadChildren: () => import('./views/user-register/user-register.module').then((m) => m.UserRegisterModule),
	},
	{
		path: 'user',
		loadChildren: () => import('./views/user-settings/user-settings.module').then((m) => m.UserSettingsModule),
	},
	{
		path: '**',
		loadChildren: () => import('./views/home-page/home-page.module').then((m) => m.HomePageModule),
	},
];

@NgModule({
	imports: [CommonModule, RouterModule.forRoot(storeRoutes)],
	exports: [RouterModule],
})
export class StoreModule {}
