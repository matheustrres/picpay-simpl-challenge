import { deepStrictEqual, strictEqual } from 'node:assert';
import { describe, it } from 'node:test';

import { CreateUserService } from '@/application/services/create-user';
import { CreateShopkeeperUseCase } from '@/application/use-cases/create-shopkeeper';

import { Shopkeeper } from '@/enterprise/entities/user/shopkeeper';
import { CNPJError } from '@/enterprise/errors/cnpj';

import { CreateShopkeeperUseCaseBuilder } from '#/data/builders/use-cases/create-shopkeeper';
import {
	type MockedHashProvider,
	makeMockedHashProvider,
} from '#/data/mocks/providers/hash-provider';
import {
	type MockedShopkeepersRepository,
	makeMockedShopkeepersRepository,
} from '#/data/mocks/repositories/shopkeepers-repository';

type SUT = {
	shopkeepersRepository: MockedShopkeepersRepository;
	hashProvider: MockedHashProvider;
	sut: CreateShopkeeperUseCase;
};

function makeSUT(): SUT {
	const shopkeepersRepository = makeMockedShopkeepersRepository();
	const hashProvider = makeMockedHashProvider();

	return {
		hashProvider,
		shopkeepersRepository,
		sut: new CreateShopkeeperUseCase(
			shopkeepersRepository,
			new CreateUserService(shopkeepersRepository, hashProvider),
		),
	};
}

describe('CreateShopkeeperUseCase', () => {
	it('should return CNPJError if CNPJ creation fails [LEFT]', async () => {
		const { sut } = makeSUT();

		const { isLeft, isRight, value } = await sut.exec(
			new CreateShopkeeperUseCaseBuilder().withCNPJ('12312312312').getProps(),
		);

		strictEqual(isLeft(), true);
		strictEqual(isRight(), false);
		strictEqual(value instanceof CNPJError, true);
	});

	it('should return a Shopkeeper [RIGHT]', async () => {
		const { sut, shopkeepersRepository } = makeSUT();

		shopkeepersRepository.findByCPF.mock.mockImplementationOnce(() => null);
		shopkeepersRepository.findByEmail.mock.mockImplementationOnce(() => null);
		shopkeepersRepository.findByCNPJ.mock.mockImplementationOnce(() => null);

		const { isLeft, isRight, value } = await sut.exec(
			new CreateShopkeeperUseCaseBuilder()
				.withFullName('Adam Smith')
				.withCNPJ('51.970.233/0001-58')
				.getProps(),
		);

		strictEqual(isRight(), true);
		strictEqual(isLeft(), false);
		deepStrictEqual(value instanceof Shopkeeper, true);
	});
});
