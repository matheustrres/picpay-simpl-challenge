import { type Mock, mock } from 'node:test';

import {
	type MockedUsersRepository,
	makeMockedUsersRepository,
} from './users-repository';

import { type ShopkeepersRepository } from '@/application/repositories/shopkeepers-repository';

import { type Shopkeeper } from '@/enterprise/entities/user/shopkeeper';

export type MockedShopkeepersRepository = MockedUsersRepository<Shopkeeper> & {
	findByCNPJ: Mock<ShopkeepersRepository['findByCNPJ']>;
};

export function makeMockedShopkeepersRepository(): MockedShopkeepersRepository {
	return {
		...makeMockedUsersRepository(),
		findByCNPJ: mock.fn(),
	};
}
