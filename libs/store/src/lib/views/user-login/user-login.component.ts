import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

type TokensPair = {
	access_token: string;
	refresh_token: string;
};

@Component({
	selector: 'nabu-user-login',
	templateUrl: './user-login.component.html',
	styleUrls: ['./user-login.component.scss'],
})
export class UserLoginComponent {
	constructor(private http: HttpClient, private router: Router) {}

	alertVisivility = 'd-none';
	responseType = 'danger';
	serverResponse = '';

	validation = {
		username: false,
		pass: false,
	};

	formData = {
		usuario: '',
		contrasena: '',
	};

	checkForm(): boolean {
		return Object.values(this.validation).every((value) => value);
	}

	async summitForm() {
		this.checkUsername();
		this.checkPass();

		if (this.checkForm()) {
			this.http.post<TokensPair>('http://localhost:3333/api/auth/local/signin', this.formData).subscribe({
				next: (resp) => {
					localStorage.setItem('access_token', resp.access_token);
					localStorage.setItem('refresh_token', resp.refresh_token);
					this.router.navigateByUrl('');
				},
				error: (err) => {
					this.alertVisivility = 'd-block';
					this.responseType = 'danger';
					this.serverResponse = '';
					this.serverResponse += '<strong>Error!, Revisa lo Siguiente</strong><ul>';
					err.error.message.forEach((e: string) => {
						this.serverResponse += '<li>' + e + '</li>';
					});
					this.serverResponse += '</ul>';
				},
			});
		}
	}

	checkUsername(): void {
		const username = <HTMLInputElement>document.getElementById('username');
		if (username.value == '' || /[^A-z0-9]+/.test(username.value)) {
			username.classList.add('is-invalid');
			this.validation.username = false;
			return;
		}
		username.classList.remove('is-invalid');
		username.classList.add('is-valid');
		this.formData.usuario = username.value;
		this.validation.username = true;
	}

	checkPass() {
		const pass = <HTMLInputElement>document.getElementById('Pass');
		if (pass.value.length < 8) {
			pass.classList.add('is-invalid');
			this.validation.pass = false;
			return;
		}
		pass.classList.remove('is-invalid');
		pass.classList.add('is-valid');
		this.formData.contrasena = pass.value;
		this.validation.pass = true;
	}
}
