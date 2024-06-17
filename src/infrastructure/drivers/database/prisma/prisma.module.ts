import { Module } from '@nestjs/common';

import { PrismaService } from './prisma.service';
import { PrismaCustomersRepository } from './repositories/customers-repository';
import { PrismaShopkeepersRepository } from './repositories/shopkeepers-repository';

import { CustomersRepository } from '@/application/repositories/customers-repository';
import { ShopkeepersRepository } from '@/application/repositories/shopkeepers-repository';

@Module({
	providers: [
		PrismaService,
		{
			provide: CustomersRepository,
			useClass: PrismaCustomersRepository,
		},
		{
			provide: ShopkeepersRepository,
			useClass: PrismaShopkeepersRepository,
		},
	],
	exports: [PrismaService, CustomersRepository, ShopkeepersRepository],
})
export class PrismaModule {}
