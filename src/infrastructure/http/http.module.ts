import { Module } from '@nestjs/common';

import { CryptographyModule } from '@/infrastructure/adapters/cryptography/cryptography.module';
import { HashingModule } from '@/infrastructure/adapters/hashing/hashing.module';

@Module({
	imports: [CryptographyModule, HashingModule],
})
export class HttpModule {}
