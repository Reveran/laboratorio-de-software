import { HttpClient } from '@angular/common/http';
import { Component, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { CityPickerComponent } from 'libs/store/src/lib/components/city-picker/city-picker.component';
import { SexPickerComponent } from 'libs/store/src/lib/components/sex-picker/sex-picker.component';

@Component({
	selector: 'nabu-edit',
	templateUrl: './edit.component.html',
	styleUrls: ['./edit.component.scss'],
})
export class EditComponent {
	constructor(private http: HttpClient) {}

	bornDate!: NgbDateStruct;
	today = new Date();
	oldestDate = { year: this.today.getFullYear() - 100, month: this.today.getMonth(), day: this.today.getDate() };
	newestDate = { year: this.today.getFullYear() - 18, month: this.today.getMonth(), day: this.today.getDate() };
	faCalendarDays = faCalendarDays;
	@ViewChild('sexPicker') sexPicker: SexPickerComponent | undefined;
	@ViewChildren(CityPickerComponent) cityPickers!: QueryList<CityPickerComponent>;

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
		this.checkSex();
		this.checkBornPlace();
		this.checkFactPlace();
		console.log(this.validation);
		if (this.checkForm()) {
			const resp = await this.http.post('http://localhost:3333/api/auth/local/signup', this.formData);
			console.log(resp);
		}
	}

	checkForm(): boolean {
		return Object.values(this.validation).every((value) => value === true);
	}

	checkName(): void {
		const nombre = <HTMLInputElement>document.getElementById('Nombre');
		if (/[^A-Za-z]+/.test(nombre.value) || nombre.value == '') {
			nombre.classList.add('is-invalid');
			this.validation.name = false;
			return;
		}
		nombre.classList.remove('is-invalid');
		nombre.classList.add('is-valid');
		this.validation.name = true;
	}

	checkLastName(): void {
		const apellido = <HTMLInputElement>document.getElementById('Apellido');
		if (/[^A-Za-z]+/.test(apellido.value) || apellido.value == '') {
			apellido.classList.add('is-invalid');
			this.validation.lastName = false;
			return;
		}
		apellido.classList.remove('is-invalid');
		apellido.classList.add('is-valid');
		this.validation.lastName = true;
	}

	checkDNI(): void {
		const dni = <HTMLInputElement>document.getElementById('DNI');
		const dniDotless = dni.value.replace(/\./gi, '');
		console.log(dniDotless);
		if (/[^0-9]+/.test(dniDotless) || dniDotless === '') {
			dni.classList.add('is-invalid');
			this.validation.dni = false;
			return;
		}
		dni.classList.remove('is-invalid');
		dni.classList.add('is-valid');
		this.validation.dni = true;
	}

	checkSex(): void {
		if (this.sexPicker?.value === undefined) {
			this.sexPicker?.markUnchecked();
			this.validation.sex = false;
			return;
		}
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
		this.validation.bornDate = true;
	}

	checkBornPlace(): void {
		const picker = this.cityPickers?.first;
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
		if (repass.value != pass.value) {
			repass.classList.add('is-invalid');
			this.validation.repass = false;
			return;
		}
		repass.classList.remove('is-invalid');
		repass.classList.add('is-valid');
		this.validation.repass = true;
	}

	checkFactPlace(): void {
		const picker = this.cityPickers?.last;
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
		return;
	}

	checkAddr() {
		const pass = <HTMLInputElement>document.getElementById('Addr1');
		if (pass.value.length < 1) {
			pass.classList.add('is-invalid');
			this.validation.add1 = false;
			return;
		}
		pass.classList.remove('is-invalid');
		pass.classList.add('is-valid');
		this.validation.add1 = true;
	}
}
