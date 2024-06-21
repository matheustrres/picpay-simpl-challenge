import { Module } from '@nestjs/common';

import { CreateCustomerController } from './controllers/users/create-customer';

import { HashProvider } from '@/@core/enterprise/ports/providers/hash-provider';

import { CustomersRepository } from '@/application/repositories/customers-repository';
import { ShopkeepersRepository } from '@/application/repositories/shopkeepers-repository';
import { CreateUserService } from '@/application/services/create-user';
import { CreateCustomerUseCase } from '@/application/use-cases/create-customer';
import { CreateShopkeeperUseCase } from '@/application/use-cases/create-shopkeeper';

import { PrismaModule } from '@/infrastructure/drivers/database/prisma/prisma.module';
import { CryptographyModule } from '@/infrastructure/gateways/adapters/cryptography/cryptography.module';
import { HashingModule } from '@/infrastructure/gateways/adapters/hashing/hashing.module';

@Module({
	imports: [CryptographyModule, HashingModule, PrismaModule],
	providers: [
		{
			provide: CreateCustomerUseCase,
			useFactory: (
				customersRepository: CustomersRepository,
				hashProvider: HashProvider,
			) =>
				new CreateCustomerUseCase(
					customersRepository,
					new CreateUserService(customersRepository, hashProvider),
				),
			inject: [CustomersRepository, HashProvider],
		},
		{
			provide: CreateShopkeeperUseCase,
			useFactory: (
				shopkeepersRepository: ShopkeepersRepository,
				hashProvider: HashProvider,
			) =>
				new CreateShopkeeperUseCase(
					shopkeepersRepository,
					new CreateUserService(shopkeepersRepository, hashProvider),
				),
			inject: [ShopkeepersRepository, HashProvider],
		},
	],
	controllers: [CreateCustomerController],
})
export class HttpModule {}
