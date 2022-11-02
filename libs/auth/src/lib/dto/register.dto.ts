import { IsAlphanumeric, IsDateString, IsEmail, IsNotEmpty, IsNumberString, IsString, Length } from 'class-validator';
export class RegisterDTO {
	@IsNotEmpty({ message: 'El nombre no puede estar vacio' })
	@IsString({ message: 'El nombre debe ser una cadena de texto' })
	nombres: string;
	@IsNotEmpty({ message: 'El apellido no puede estar vacio' })
	@IsString()
	apellidos: string;
	@IsNotEmpty({ message: 'El correo no puede estar vacio' })
	@IsEmail()
	correo: string;
	@IsNotEmpty({ message: 'El DNI/CC no puede estar vacio' })
	@IsNumberString()
	DNI: string;
	@IsNotEmpty({ message: 'El nombre de Usuario no puede estar vacio' })
	@IsString()
	usuario: string;
	@IsNotEmpty({ message: 'La contraseña no puede estar vacia' })
	@Length(8)
	contrasena: string;
	@IsNotEmpty()
	facturacion: string[5];
	@IsNotEmpty()
	@IsDateString()
	nacimiento: string;
	@IsNotEmpty()
	lugarNacimiento: string[5];
	@IsNotEmpty()
	genero: string;
	temasPreferidos: number[];
}
