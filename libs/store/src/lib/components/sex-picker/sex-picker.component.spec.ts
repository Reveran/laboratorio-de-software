import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SexPickerComponent } from './sex-picker.component';

describe('SexPickerComponent', () => {
	let component: SexPickerComponent;
	let fixture: ComponentFixture<SexPickerComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [SexPickerComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(SexPickerComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
