import { IsAlphanumeric, IsNotEmpty, IsString, Length } from 'class-validator';
export class AuthDTO {
	@IsNotEmpty({ message: 'El nombre de usuario no puede estar vacio' })
	@IsString()
	usuario: string;
	@IsNotEmpty()
	@IsAlphanumeric()
	@Length(8)
	contrasena: string;
}
