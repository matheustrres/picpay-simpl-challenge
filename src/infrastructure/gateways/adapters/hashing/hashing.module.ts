import { Module } from '@nestjs/common';

import { HashingService } from './hashing.service';

import { HashProvider } from '@/@core/enterprise/ports/providers/hash-provider';

@Module({
	providers: [
		{
			provide: HashProvider,
			useClass: HashingService,
		},
	],
	exports: [HashProvider],
})
export class HashingModule {}
