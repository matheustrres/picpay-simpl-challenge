import { Module } from '@nestjs/common';

import { CoreModule } from '@/@core/core.module';

import { HttpModule } from '@/infrastructure/http/http.module';

@Module({
	imports: [CoreModule, HttpModule],
	providers: [],
	controllers: [],
	exports: [],
})
export class AppModule {}
