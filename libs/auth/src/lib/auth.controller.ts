import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDTO, RegisterDTO } from './dto';
import { Tokens } from './types';
import { RtGuard } from '../../../common/guards';
import { GetCurrentUser, Public } from '../../../common/decorators';

@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	@Public()
	@Post('/local/signup')
	@HttpCode(HttpStatus.CREATED)
	signupLocal(@Body() dto: RegisterDTO): Promise<Tokens> {
		return this.authService.signupLocal(dto);
	}

	@Public()
	@Post('/local/signin')
	@HttpCode(HttpStatus.OK)
	signinLocal(@Body() dto: AuthDTO): Promise<Tokens> {
		return this.authService.signinLocal(dto);
	}

	@Post('/logout')
	@HttpCode(HttpStatus.OK)
	logout(@GetCurrentUser('sub') userId: number, @Body() payload) {
		this.authService.logout(userId, payload.rt);
	}

	@Public()
	@UseGuards(RtGuard)
	@Post('/refresh')
	@HttpCode(HttpStatus.OK)
	refresh(@GetCurrentUser('sub') clientId: number, @GetCurrentUser('refreshToken') rt: string) {
		return this.authService.refresh(clientId, rt);
	}
}
