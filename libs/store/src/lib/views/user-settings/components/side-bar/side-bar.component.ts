import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'nabu-side-bar',
	templateUrl: './side-bar.component.html',
	styleUrls: ['./side-bar.component.scss'],
})
export class SideBarComponent {
	actives = ['', '', '', '', '', '', ''];

	constructor(private router: Router) {
		switch (router.url) {
			case '/user':
				this.actives[0] = 'active';
				break;
			case '/user/carrito':
				this.actives[1] = 'active';
				break;
			case '/user/historial':
				this.actives[2] = 'active';
				break;
			case '/user/editar':
				this.actives[3] = 'active';
				break;
			case '/user/pagos':
				this.actives[4] = 'active';
				break;
			case '/user/ubicaciones':
				this.actives[5] = 'active';
				break;
			case '/user/mensajes':
				this.actives[6] = 'active';
				break;

			default:
				this.actives[0] = 'active';
				break;
		}
	}

	markActive(index: number) {
		const newActives = ['', '', '', '', '', '', ''];
		newActives[index] = 'active';
		this.actives = newActives;
	}
}
