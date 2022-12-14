import { PrismaClient } from '@prisma/client'
import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {

    constructor(){
        super({
            datasources: {
                db: {
                    url: "file:./dev.db"
                }
            }
        });
    }

    async onModuleDestroy() {
        await this.$connect();
    }
    async onModuleInit() {
        await this.$disconnect();
    }

}
