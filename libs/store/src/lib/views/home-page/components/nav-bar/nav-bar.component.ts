import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

@Component({
	selector: 'nabu-nav-bar',
	templateUrl: './nav-bar.component.html',
	styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
	constructor(private http: HttpClient) {}

	// Icons
	faMagnifyingGlass = faMagnifyingGlass;

	logedin = false;
	nombre = 'Usuario';
	username = 'Usuario123';
	userImage = 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';

	ngOnInit(): void {
		const rt = localStorage.getItem('refresh_token');

		if (rt) {
			this.logedin = true;
		}
	}

	logout() {
		const access_token = localStorage.getItem('access_token');
		const refresh_token = localStorage.getItem('refresh_token');

		if (!access_token || !refresh_token) return;

		this.http.post('http://localhost:3333/api/auth/logout', { rt: refresh_token }).subscribe({
			next: (req) => {
				localStorage.removeItem('access_token');
				localStorage.removeItem('refresh_token');
				window.location.reload();
			},
			error: (err) => {
				console.log(err);
			},
		});
	}
}
