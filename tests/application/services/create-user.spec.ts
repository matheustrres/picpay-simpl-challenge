import { strictEqual } from 'node:assert';
import { describe, it } from 'node:test';

import { CreateUserService } from '@/application/services/create-user';

import { type User, type UserProps } from '@/enterprise/entities/user';
import { CPFError } from '@/enterprise/errors/cpf';

import {
	makeMockedHashProvider,
	type MockedHashProvider,
} from '#/data/mocks/providers/hash-provider';
import {
	makeMockedUsersRepository,
	type MockedUsersRepository,
} from '#/data/mocks/repositories/users-repository';

type SUT = {
	hashProvider: MockedHashProvider;
	usersRepository: MockedUsersRepository<User<any>>;
	sut: CreateUserService<UserProps, User<any>>;
};

function makeSUT(): SUT {
	const hashProvider = makeMockedHashProvider();
	const usersRepository = makeMockedUsersRepository();

	return {
		hashProvider,
		usersRepository,
		sut: new CreateUserService(usersRepository, hashProvider),
	};
}

describe('CreateUserService', () => {
	it('should return CPFError if CPF creation fails', async () => {
		const { sut } = makeSUT();

		const { isLeft, value } = await sut.exec({
			fullName: 'John Doe',
			email: 'john.doe@gmail.com',
			cpf: '11257245286',
			password: 'youshallnotpass',
		});

		strictEqual(isLeft(), true);
		strictEqual(value instanceof CPFError, true);
	});
});
