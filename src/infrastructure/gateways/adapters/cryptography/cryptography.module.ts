import { Module } from '@nestjs/common';

import { CryptographyService } from './cryptography.service';

import { TokenProvider } from '@/@core/enterprise/ports/providers/token-provider';

@Module({
	providers: [
		{
			provide: TokenProvider,
			useClass: CryptographyService,
		},
	],
	exports: [TokenProvider],
})
export class CryptographyModule {}
