import { deepStrictEqual, strictEqual } from 'node:assert';
import { describe, it } from 'node:test';

import { UserNotFoundError } from '@/application/errors/user';
import { LoginUserUseCase } from '@/application/use-cases/login-user';

import {
	makeMockedHashProvider,
	type MockedHashProvider,
} from '#/data/mocks/providers/hash-provider';
import {
	makeMockedTokenProvider,
	type MockedTokenProvider,
} from '#/data/mocks/providers/token-provider';
import {
	makeMockedUsersRepository,
	type MockedUsersRepository,
} from '#/data/mocks/repositories/users-repository';

type SUT = {
	usersRepository: MockedUsersRepository<any>;
	hashProvider: MockedHashProvider;
	tokenProvider: MockedTokenProvider;
	sut: LoginUserUseCase;
};

function makeSUT(): SUT {
	const usersRepository = makeMockedUsersRepository();
	const hashProvider = makeMockedHashProvider();
	const tokenProvider = makeMockedTokenProvider();

	return {
		hashProvider,
		tokenProvider,
		usersRepository,
		sut: new LoginUserUseCase(usersRepository, hashProvider, tokenProvider),
	};
}

describe('LoginUserUseCase', () => {
	it('should fail if no user is found with given credentials [LEFT]', async () => {
		const { sut, usersRepository } = makeSUT();

		usersRepository.findByEmail.mock.mockImplementationOnce(() => null);

		const { isLeft, isRight, value } = await sut.exec({
			email: 'john.doe@gmail.com',
			password: 'youshallnotpass',
		});

		strictEqual(isLeft(), true);
		strictEqual(isRight(), false);
		deepStrictEqual(
			value instanceof UserNotFoundError &&
				value.message ==
					'No user with email address "john.doe@gmail.com" was found.',
			true,
		);
	});
});
