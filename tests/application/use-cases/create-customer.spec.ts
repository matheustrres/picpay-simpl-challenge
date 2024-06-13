import { deepStrictEqual, strictEqual } from 'node:assert';
import { describe, it } from 'node:test';

import { CreateCustomerUseCase } from '@/application/use-cases/create-customer';

import { Customer } from '@/enterprise/entities/user/customer';

import { CreateCustomerUseCaseBuilder } from '#/data/builders/use-cases/create-customer';
import {
	type MockedHashProvider,
	makeMockedHashProvider,
} from '#/data/mocks/providers/hash-provider';
import {
	type MockedCustomersRepository,
	makeMockedCustomersRepository,
} from '#/data/mocks/repositories/customers-repository';

type SUT = {
	usersRepository: MockedCustomersRepository;
	hashProvider: MockedHashProvider;
	sut: CreateCustomerUseCase;
};

function makeSUT(): SUT {
	const usersRepository = makeMockedCustomersRepository();
	const hashProvider = makeMockedHashProvider();

	return {
		hashProvider,
		usersRepository,
		sut: new CreateCustomerUseCase(usersRepository, hashProvider),
	};
}

describe('CreateCustomerUseCase', () => {
	it('should return a Customer [RIGHT]', async () => {
		const { sut, usersRepository } = makeSUT();

		usersRepository.findByCPF.mock.mockImplementationOnce(() => null);
		usersRepository.findByEmail.mock.mockImplementationOnce(() => null);

		const { isLeft, isRight, value } = await sut.exec(
			new CreateCustomerUseCaseBuilder()
				.withFullName('John Doe')
				.withEmail('john.doe@live.com')
				.getProps(),
		);

		strictEqual(isRight(), true);
		strictEqual(isLeft(), false);
		deepStrictEqual(value instanceof Customer, true);
	});
});
