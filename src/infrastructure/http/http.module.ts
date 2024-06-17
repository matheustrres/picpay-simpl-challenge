import { Module } from '@nestjs/common';

import { CryptographyModule } from '@/infrastructure/gateways/adapters/cryptography/cryptography.module';
import { HashingModule } from '@/infrastructure/gateways/adapters/hashing/hashing.module';

@Module({
	imports: [CryptographyModule, HashingModule],
})
export class HttpModule {}
