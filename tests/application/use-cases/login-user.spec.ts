import { deepStrictEqual, strictEqual } from 'node:assert';
import { describe, it } from 'node:test';

import {
	UserInvalidCredentialsError,
	UserNotFoundError,
} from '@/application/errors/user';
import {
	type LoginAccessToken,
	LoginUserUseCase,
} from '@/application/use-cases/login-user';

import { ShopkeeperBuilder } from '#/data/builders/entities/user/shopkeeper';
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
				value.message ===
					'No user with email address "john.doe@gmail.com" was found.',
			true,
		);
	});

	it('should fail if given password does not match current user hashed password [LEFT]', async () => {
		const { hashProvider, sut, usersRepository } = makeSUT();

		const user = new ShopkeeperBuilder().build();

		usersRepository.findByEmail.mock.mockImplementationOnce(() => user);
		hashProvider.compareStrings.mock.mockImplementationOnce(() => false);

		const { isLeft, isRight, value } = await sut.exec({
			email: 'adamsmith_uk@gmail.com',
			password: 'different_user_password',
		});

		strictEqual(isLeft(), true);
		strictEqual(isRight(), false);
		deepStrictEqual(
			value instanceof UserInvalidCredentialsError &&
				value.message === 'Invalid credentials.',
			true,
		);
	});

	it('should return an access token [RIGHT]', async () => {
		const { hashProvider, sut, tokenProvider, usersRepository } = makeSUT();

		const user = new ShopkeeperBuilder().build();

		usersRepository.findByEmail.mock.mockImplementationOnce(() => user);
		hashProvider.compareStrings.mock.mockImplementationOnce(() => true);
		tokenProvider.signToken.mock.mockImplementationOnce(
			() => 'super_random_secret_access_token',
		);

		const { isLeft, isRight, value } = await sut.exec({
			email: user.getProps().email.props.value,
			password: user.getProps().password,
		});

		strictEqual(isRight(), true);
		strictEqual(isLeft(), false);
		deepStrictEqual(
			(value as LoginAccessToken).accessToken,
			'super_random_secret_access_token',
		);
	});
});
