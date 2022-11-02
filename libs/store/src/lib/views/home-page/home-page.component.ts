import { Component } from '@angular/core';

@Component({
	selector: 'nabu-home-page',
	templateUrl: './home-page.component.html',
	styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent {
	books = [
		{
			portada: 'https://pic3.zhimg.com/v2-bd318359202d5f6076e43ff2bd651f26_b.jpg',
			nombre: 'La Sangre de los Elfos',
		},
		{
			portada: 'https://static.ishtar-collective.net/books/book-acts-of-mercy.png',
			nombre: 'Actos de Piedad',
		},
		{
			portada: 'https://static.ishtar-collective.net/books/book-ripples.png',
			nombre: 'Ondas',
		},
		{
			portada: 'https://static.ishtar-collective.net/books/book-tales-of-the-forgotten.png',
			nombre: 'Historias de los Olvidados',
		},
		{
			portada: 'https://www.simonillustration.co.uk/wp-content/uploads/2018/05/The-Dunwich-Horror-watermarked-01-scaled.jpg',
			nombre: 'El Horror de Dunwich',
		},
		{
			portada: 'https://static.ishtar-collective.net/books/book-call-of-the-cryptolith.png',
			nombre: 'El Llamado del Criptolito',
		},
		{
			portada: 'https://static.ishtar-collective.net/books/book-a-tangled-web.png',
			nombre: 'La Red Enmarañada',
		},
		{
			portada: 'https://cdn11.bigcommerce.com/s-9zhx02uo/images/stencil/1280x1280/products/2009/3514/CHA23153_-_Masks_of_Nyarlathotep_-_Front_Cover_700x900_-_PDF__70172.1558088835.jpg?c=2',
			nombre: 'Nyarlathotep, El Caos Reptante',
		},
		{
			portada: 'https://static.ishtar-collective.net/books/book-unveiling.png',
			nombre: 'Desvelando',
		},
		{
			portada: 'https://static.ishtar-collective.net/books/book-nothing-ends.png',
			nombre: 'Nada Termina',
		},
		{
			portada: 'https://images-na.ssl-images-amazon.com/images/I/81rHR4HYYSL.jpg',
			nombre: 'El llamado de Cthulhu',
		},
	];
}
