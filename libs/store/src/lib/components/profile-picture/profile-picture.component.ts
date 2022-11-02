import { Component, Input } from '@angular/core';
import { faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
	selector: 'nabu-profile-picture',
	templateUrl: './profile-picture.component.html',
	styleUrls: ['./profile-picture.component.scss'],
})
export class ProfilePictureComponent {
	userIcon = faUser;
	@Input()
	userImage = 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';
	@Input()
	size = '';
}
