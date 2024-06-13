import { deepStrictEqual, strictEqual } from 'node:assert';
import { describe, it } from 'node:test';

import { UserAlreadyExistsError } from '@/application/errors/user';
import { CreateCustomerUseCase } from '@/application/use-cases/create-customer';

import { Customer } from '@/enterprise/entities/user/customer';
import { CPFError } from '@/enterprise/errors/cpf';
import { EmailError } from '@/enterprise/errors/email';

import { CustomerBuilder } from '#/data/builders/entities/user/customer';
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
	it('should return CPFError if CPF creation fails [LEFT]', async () => {
		const { sut } = makeSUT();

		const { isLeft, isRight, value } = await sut.exec({
			...new CreateCustomerUseCaseBuilder().getProps(),
			cpf: '11257245286',
		});

		strictEqual(isLeft(), true);
		strictEqual(isRight(), false);
		strictEqual(value instanceof CPFError, true);
	});

	it('should return EmailError if email creation fails [LEFT]', async () => {
		const { sut } = makeSUT();

		const { isLeft, isRight, value } = await sut.exec({
			...new CreateCustomerUseCaseBuilder().getProps(),
			email: 'adam_smith@.br',
		});

		strictEqual(isLeft(), true);
		strictEqual(isRight(), false);
		strictEqual(value instanceof EmailError, true);
	});

	it('should return UserAlreadyExistsError if given CPF is already in use [LEFT]', async () => {
		const { sut, usersRepository } = makeSUT();

		const user = new CustomerBuilder().build();

		usersRepository.findByCPF.mock.mockImplementationOnce(() => user);

		const { isLeft, isRight, value } = await sut.exec(
			new CreateCustomerUseCaseBuilder()
				.withCPF(user.getProps().CPF.props.value)
				.getProps(),
		);

		strictEqual(isLeft(), true);
		strictEqual(isRight(), false);
		strictEqual(value instanceof UserAlreadyExistsError, true);
	});

	it('should return UserAlreadyExistsError if given email address is already in use [LEFT]', async () => {
		const { sut, usersRepository } = makeSUT();

		const user = new CustomerBuilder().build();

		usersRepository.findByEmail.mock.mockImplementationOnce(() => user);

		const { isLeft, isRight, value } = await sut.exec(
			new CreateCustomerUseCaseBuilder()
				.withEmail(user.getProps().email.props.value)
				.getProps(),
		);

		strictEqual(isLeft(), true);
		strictEqual(isRight(), false);
		strictEqual(value instanceof UserAlreadyExistsError, true);
	});

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
