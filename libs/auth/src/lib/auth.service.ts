import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '@laboratorio-de-software/prisma';
import { AuthDTO, RegisterDTO } from './dto';
import * as argon2 from 'argon2';
import { Tokens } from './types';
import { JwtService } from '@nestjs/jwt';
import { RefreshToken } from '@prisma/client';

@Injectable()
export class AuthService {
	constructor(private prisma: PrismaService, private jwtService: JwtService) {}

	async signupLocal(dto: RegisterDTO): Promise<Tokens> {
		const fact = {
			pais: dto.facturacion[0],
			departamento: dto.facturacion[1],
			municipio: dto.facturacion[2],
			linea1: dto.facturacion[3],
			linea2: dto.facturacion[4],
			detalle: dto.facturacion[5],
		};

		const pass = await this.hashData(dto.contrasena);

		const client = await this.prisma.cliente.create({
			data: {
				nombres: dto.nombres,
				apellidos: dto.apellidos,
				correo: dto.correo,
				DNI: dto.DNI,
				usuario: dto.usuario,
				contrasena: pass,
				facturacion: {
					create: fact,
				},
				nacimiento: new Date(dto.nacimiento),
				genero: dto.genero,
				lugarNacimiento: ''.concat(dto.lugarNacimiento),
				temasPreferidos: {
					connect: dto.temasPreferidos.map((tema) => {
						return { id: tema };
					}),
				},
			},
		});

		const tokens = this.getTokens(client.id, client.correo);
		this.addRt(client.id, (await tokens).refresh_token);
		return tokens;
	}

	async signinLocal(dto: AuthDTO): Promise<Tokens> {
		const client = await this.prisma.cliente.findUnique({
			where: {
				usuario: dto.usuario,
			},
		});

		if (!client) throw new ForbiddenException('Usuario No Encontrado');

		const passMatch = await argon2.verify(client.contrasena, dto.contrasena);
		if (!passMatch) throw new ForbiddenException('Contraseña Incorrecta');

		const tokens = this.getTokens(client.id, client.correo);
		this.addRt(client.id, (await tokens).refresh_token);
		return tokens;
	}

	async logout(userId: number, rt: string) {
		const tokens: RefreshToken[] = await this.prisma.refreshToken.findMany({
			where: {
				clienteId: userId,
			},
		});
		tokens.forEach(async (t) => {
			if (argon2.verify(t.value, rt)) {
				await this.prisma.refreshToken.delete({
					where: { id: t.id },
				});
				return;
			}
		});
	}

	async refresh(userId: number, rt: string) {
		const client = await this.prisma.cliente.findUnique({
			where: {
				id: userId,
			},
		});

		if (!client) throw new ForbiddenException('Acceso Denegado');

		const userRtTokens: RefreshToken[] = await this.prisma.refreshToken.findMany({
			where: {
				clienteId: userId,
			},
		});

		let targetRt: RefreshToken | undefined;

		userRtTokens.forEach((t) => {
			const rtMatch = argon2.verify(t.value, rt);

			if (rtMatch) {
				targetRt = t;
				return;
			}
		});


		if (!targetRt) throw new ForbiddenException('Acceso Denegado 2');

		const tokens = this.getTokens(client.id, client.correo);
		this.updateRt(targetRt.id, (await tokens).refresh_token);
		return tokens;
	}

	async addRt(userId: number, rt: string) {
		const hashedRt = await this.hashData(rt);
		await this.prisma.refreshToken.create({
			data: {
				clienteId: userId,
				value: hashedRt,
				fecha: new Date().toISOString(),
			},
		});
	}

	async updateRt(rtId: number, newRt: string) {
		const hashedRt = await this.hashData(newRt);
		await this.prisma.refreshToken.update({
			where: { id: rtId },
			data: { value: hashedRt },
		});
	}

	hashData(data: string) {
		return argon2.hash(data);
	}

	async getTokens(userId: number, email: string): Promise<Tokens> {
		const [at, rt] = await Promise.all([
			this.jwtService.signAsync(
				{
					sub: userId,
					email,
				},
				{
					secret: 'at-secret',
					expiresIn: 60 * 15,
				}
			),

			this.jwtService.signAsync(
				{
					sub: userId,
					email,
				},
				{
					secret: 'rt-secret',
					expiresIn: 60 * 60 * 24 * 7,
				}
			),
		]);

		return {
			access_token: at,
			refresh_token: rt,
		};
	}
}
