import { Component, ViewChild, ElementRef } from '@angular/core';
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { SexPickerComponent } from '../../components/sex-picker/sex-picker.component';
import { CityPickerComponent } from '../../components/city-picker/city-picker.component';

@Component({
	selector: 'nabu-user-register',
	templateUrl: './user-register.component.html',
	styleUrls: ['./user-register.component.scss'],
})
export class UserRegisterComponent {
	constructor(private http: HttpClient) {}

	bornDate!: NgbDateStruct;
	today = new Date();
	oldestDate = { year: this.today.getFullYear() - 100, month: this.today.getMonth(), day: this.today.getDate() };
	newestDate = { year: this.today.getFullYear() - 18, month: this.today.getMonth(), day: this.today.getDate() };
	faCalendarDays = faCalendarDays;
	@ViewChild('sexPicker') sexPicker!: SexPickerComponent;
	@ViewChild('bornPlacePicker') bornPlacePicker!: CityPickerComponent;
	@ViewChild('FacturationPlacePicker') FacturationPlacePicker!: CityPickerComponent;

	alertVisivility = 'd-none';
	responseType = 'danger';
	serverResponse = '';

	validation = {
		name: false,
		lastName: false,
		sex: false,
		dni: false,
		bornDate: false,
		bornPlace: false,

		username: false,
		email: false,
		pass: false,
		repass: false,
		fact: false,
		add1: false,
	};

	formData = {
		nombres: '',
		apellidos: '',
		usuario: '',
		correo: '',
		DNI: '',
		contrasena: '',
		facturacion: ['', '', '', '', '', ''],
		nacimiento: '',
		lugarNacimiento: ['', '', ''],
		genero: '',
		temasPreferidos: [],
	};

	async summitForm() {
		this.checkName();
		this.checkLastName();
		this.checkSex();
		this.checkDNI();
		this.checkBornDate();
		this.checkBornPlace();
		this.checkUsername();
		this.checkEmail();
		this.checkPass();
		this.checkRePass();
		this.checkFactPlace();
		this.checkAddr();

		if (this.checkForm()) {
			this.http.post('http://localhost:3333/api/auth/local/signup', this.formData).subscribe({
				next: (resp) => {
					this.alertVisivility = 'd-block';
					this.responseType = 'success';
					this.serverResponse = '<strong>Usuario Creado Satisfactoriamente</strong>';
					console.log(resp);
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

	checkForm(): boolean {
		return Object.values(this.validation).every((value) => value === true);
	}

	checkName(): void {
		const nombre = <HTMLInputElement>document.getElementById('Nombre');
		if (/[^A-Za-z\s]+/.test(nombre.value) || nombre.value == '') {
			nombre.classList.add('is-invalid');
			this.validation.name = false;
			return;
		}
		nombre.classList.remove('is-invalid');
		nombre.classList.add('is-valid');
		this.formData.nombres = nombre.value;
		this.validation.name = true;
	}

	checkLastName(): void {
		const apellido = <HTMLInputElement>document.getElementById('Apellido');
		if (/[^A-Za-z\s]+/.test(apellido.value) || apellido.value == '') {
			apellido.classList.add('is-invalid');
			this.validation.lastName = false;
			return;
		}
		apellido.classList.remove('is-invalid');
		apellido.classList.add('is-valid');
		this.formData.apellidos = apellido.value;
		this.validation.lastName = true;
	}

	checkDNI(): void {
		const dni = <HTMLInputElement>document.getElementById('DNI');
		const dniDotless = dni.value.replace(/\./gi, '');
		if (/[^0-9]+/.test(dniDotless) || dniDotless === '') {
			dni.classList.add('is-invalid');
			this.validation.dni = false;
			return;
		}
		dni.classList.remove('is-invalid');
		dni.classList.add('is-valid');
		this.formData.DNI = dniDotless;
		this.validation.dni = true;
	}

	checkSex(): void {
		if (this.sexPicker.value === undefined) {
			this.sexPicker.markUnchecked();
			this.validation.sex = false;
			return;
		}
		this.formData.genero = this.sexPicker.value;
		this.validation.sex = true;
	}

	checkBornDate(): void {
		const BornDatePicker = <HTMLInputElement>document.getElementById('BornDatePicker');
		if (isNaN(new Date(BornDatePicker.value).getDate()) || new Date(BornDatePicker.value).getFullYear() > this.newestDate.year || new Date(BornDatePicker.value).getFullYear() < this.oldestDate.year) {
			BornDatePicker.classList.add('is-invalid');
			BornDatePicker.classList.remove('is-valid');
			this.validation.bornDate = false;
			return;
		}
		BornDatePicker.classList.add('is-valid');
		BornDatePicker.classList.remove('is-invalid');
		this.formData.nacimiento = BornDatePicker.value;
		this.validation.bornDate = true;
	}

	checkBornPlace(): void {
		const picker = this.bornPlacePicker;
		if (picker.selectedCountry === undefined) {
			picker.markCountryUnchecked();
			this.validation.bornPlace = false;
			return;
		}

		if (picker.selectedState === undefined) {
			picker.markStateUnchecked();
			this.validation.bornPlace = false;
			return;
		}

		if (picker.selectedCity === undefined) {
			picker.markCityUnchecked();
			this.validation.bornPlace = false;
			return;
		}

		this.validation.bornPlace = true;
		this.formData.lugarNacimiento[0] = picker.selectedCountry.name;
		this.formData.lugarNacimiento[1] = picker.selectedState.name;
		this.formData.lugarNacimiento[2] = picker.selectedCity.name;
		return;
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

	checkEmail() {
		const email = <HTMLInputElement>document.getElementById('Email');
		if (email.value == '' || !/[A-z0-9]+@[A-z0-9]+\.[A-z0-9]+/.test(email.value)) {
			email.classList.add('is-invalid');
			this.validation.email = false;
			return;
		}
		email.classList.remove('is-invalid');
		email.classList.add('is-valid');
		this.formData.correo = email.value;
		this.validation.email = true;
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
		this.validation.pass = true;
	}

	checkRePass() {
		const repass = <HTMLInputElement>document.getElementById('Repass');
		const pass = <HTMLInputElement>document.getElementById('Pass');
		if (repass.value != pass.value || repass.value.length === 0) {
			repass.classList.add('is-invalid');
			this.validation.repass = false;
			return;
		}
		repass.classList.remove('is-invalid');
		repass.classList.add('is-valid');
		this.formData.contrasena = pass.value;
		this.validation.repass = true;
	}

	checkFactPlace(): void {
		const picker = this.FacturationPlacePicker;
		if (picker.selectedCountry === undefined) {
			picker.markCountryUnchecked();
			this.validation.fact = false;
			return;
		}

		if (picker.selectedState === undefined) {
			picker.markStateUnchecked();
			this.validation.fact = false;
			return;
		}

		if (picker.selectedCity === undefined) {
			picker.markCityUnchecked();
			this.validation.fact = false;
			return;
		}

		this.validation.fact = true;
		this.formData.facturacion[0] = picker.selectedCountry.name;
		this.formData.facturacion[1] = picker.selectedState.name;
		this.formData.facturacion[2] = picker.selectedCity.name;
		return;
	}

	checkAddr() {
		const addr1 = <HTMLInputElement>document.getElementById('Addr1');
		const addr2 = <HTMLInputElement>document.getElementById('Addr2');
		const addr3 = <HTMLInputElement>document.getElementById('Addr3');
		if (addr1.value.length < 1) {
			addr1.classList.add('is-invalid');
			this.validation.add1 = false;
			return;
		}
		addr1.classList.remove('is-invalid');
		addr1.classList.add('is-valid');
		this.formData.facturacion[3] = addr1.value;
		this.formData.facturacion[4] = addr2.value;
		this.formData.facturacion[5] = addr3.value;
		this.validation.add1 = true;
	}
}
