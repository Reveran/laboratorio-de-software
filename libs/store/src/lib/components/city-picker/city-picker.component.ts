import { Component, OnInit } from '@angular/core';
import { Country, State, City, ICountry, IState, ICity } from 'country-state-city';

@Component({
	selector: 'nabu-city-picker',
	templateUrl: './city-picker.component.html',
	styleUrls: ['./city-picker.component.scss'],
})
export class CityPickerComponent implements OnInit {
	countries!: ICountry[];
	states!: IState[];
	cities!: ICity[];
	selectedCountry: ICountry | undefined;
	selectedState: IState | undefined;
	selectedCity: ICity | undefined;

	countryValidity = 'btn-outline-secondary';
	stateValidity = 'btn-outline-secondary';
	cityValidity = 'btn-outline-secondary';

	ngOnInit(): void {
		this.countries = Country.getAllCountries();
	}

	// Countries Related

	filterCountry(query: string): void {
		this.countries = Country.getAllCountries().filter((c) => c.name.toLowerCase().includes(query.toLowerCase()));
	}

	setCountry(country: ICountry) {
		this.selectedCountry = country;
		this.states = State.getStatesOfCountry(country.isoCode);
		this.selectedState = undefined;
		this.selectedCity = undefined;
		this.countryValidity = 'btn-outline-primary';
	}

	// States Related

	filterState(query: string): void {
		this.states = State.getStatesOfCountry(this.selectedCountry?.isoCode).filter((c) => c.name.toLowerCase().includes(query.toLowerCase()));
	}

	setState(state: IState): void {
		this.selectedState = state;
		this.cities = City.getCitiesOfState(state.countryCode, state.isoCode);
		this.selectedCity = undefined;
		this.stateValidity = 'btn-outline-primary';
	}

	// Cities Related

	filterCity(query: string): void {
		this.cities = City.getCitiesOfState(this.selectedCountry ? this.selectedCountry.isoCode : '', this.selectedState ? this.selectedState.isoCode : '').filter((c) => c.name.toLowerCase().includes(query.toLowerCase()));
	}

	setCity(city: ICity): void {
		this.selectedCity = city;
		this.cityValidity = 'btn-outline-primary';
	}

	markCountryUnchecked() {
		this.countryValidity = 'btn-outline-danger';
	}

	markStateUnchecked() {
		this.stateValidity = 'btn-outline-danger';
	}

	markCityUnchecked() {
		this.cityValidity = 'btn-outline-danger';
	}
}
