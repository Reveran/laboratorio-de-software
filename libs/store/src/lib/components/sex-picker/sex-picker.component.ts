import { Component, Output } from '@angular/core';

@Component({
	selector: 'nabu-sex-picker',
	templateUrl: './sex-picker.component.html',
	styleUrls: ['./sex-picker.component.scss'],
})
export class SexPickerComponent{
	@Output() value: string | undefined;

	setMale(){
		this.value = 'Masculino';
		this.markChecked();
	}

	setFemale(){
		this.value = 'Femenino';
		this.markChecked();
	}

	markUnchecked() {
		const maleButton = <HTMLElement>document.getElementById('MaleButton');
		const femaleButton = <HTMLElement>document.getElementById('FemaleButton');
		
		maleButton.classList.remove('btn-outline-secondary');
		maleButton.classList.add('btn-outline-danger');

		femaleButton.classList.remove('btn-outline-secondary');
		femaleButton.classList.add('btn-outline-danger');
	}

	markChecked() {
		const maleButton = <HTMLElement>document.getElementById('MaleButton');
		const femaleButton = <HTMLElement>document.getElementById('FemaleButton');
		
		maleButton.classList.remove('btn-outline-secondary');
		maleButton.classList.remove('btn-outline-danger');
		maleButton.classList.add('btn-outline-primary');

		femaleButton.classList.remove('btn-outline-secondary');
		femaleButton.classList.remove('btn-outline-danger');
		femaleButton.classList.add('btn-outline-primary');
	}
}
