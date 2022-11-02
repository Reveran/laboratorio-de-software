import { Module } from '@nestjs/common';
import { PrismaModule } from '@laboratorio-de-software/prisma';
import { AuthModule } from '@laboratorio-de-software/auth';
import { JwtService } from '@nestjs/jwt';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_GUARD } from '@nestjs/core';
import { AtGuard } from 'libs/common/guards';

@Module({
	imports: [AuthModule, PrismaModule],
	controllers: [AppController],
	providers: [
		AppService,
		JwtService,
		{
			provide: APP_GUARD,
			useClass: AtGuard,
		},
	],
})
export class AppModule {}
