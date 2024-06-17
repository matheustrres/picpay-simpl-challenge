import { Module } from '@nestjs/common';

import { CoreModule } from '@/@core/core.module';

import { PrismaModule } from '@/infrastructure/drivers/database/prisma/prisma.module';
import { HttpModule } from '@/infrastructure/http/http.module';

@Module({
	imports: [CoreModule, HttpModule, PrismaModule],
	providers: [],
	controllers: [],
	exports: [],
})
export class AppModule {}
