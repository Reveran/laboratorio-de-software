import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SumaryComponent } from './components/sumary/sumary.component';
import { UserSettingsComponent } from './user-settings.component';

const routes: Routes = [
	{
		path: '',
		component: UserSettingsComponent,
		children: [
			{
				path: '',
				loadChildren: () => import('./components/sumary/sumary.module').then((m) => m.SumaryModule),
			},
			{
				path: 'carrito',
				component: SumaryComponent,
			},
			{
				path: 'historial',
				component: SumaryComponent,
			},
			{
				path: 'editar',
				loadChildren: () => import('./components/edit/edit.module').then((m) => m.EditModule),
			},
			{
				path: 'pagos',
				component: SumaryComponent,
			},
			{
				path: 'ubicaciones',
				component: SumaryComponent,
			},
			{
				path: 'mensajes',
				component: SumaryComponent,
			},
		],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class UserSettingsRoutingModule {}
