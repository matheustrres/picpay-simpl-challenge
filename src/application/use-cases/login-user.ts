import { Inject, Injectable } from '@nestjs/common';

import { left, right, type Either } from '@/@core/enterprise/logic/either';
import { HashProvider } from '@/@core/enterprise/ports/providers/hash-provider';
import { TokenProvider } from '@/@core/enterprise/ports/providers/token-provider';
import { type UseCase } from '@/@core/enterprise/ports/use-case';
import { type JwtPayload } from '@/@core/types';

import {
	UserInvalidCredentialsError,
	UserNotFoundError,
} from '@/application/errors/user';
import { UsersRepository } from '@/application/repositories/users-repository';

import { type User, type UserProps } from '@/enterprise/entities/user';

export type LoginAccessToken = {
	accessToken: string;
};

export type LoginUserUseCaseInput = {
	email: string;
	password: string;
};

export type LoginUserUseCaseOutput = Either<
	UserNotFoundError | UserInvalidCredentialsError,
	LoginAccessToken
>;

@Injectable()
export class LoginUserUseCase
	implements UseCase<LoginUserUseCaseInput, LoginUserUseCaseOutput>
{
	constructor(
		@Inject(UsersRepository)
		private readonly usersRepository: UsersRepository<User<UserProps>>,
		@Inject(HashProvider)
		private readonly hashProvider: HashProvider,
		@Inject(TokenProvider)
		private readonly tokenProvider: TokenProvider,
	) {}

	async exec({
		email,
		password,
	}: LoginUserUseCaseInput): Promise<LoginUserUseCaseOutput> {
		const user = await this.usersRepository.findByEmail(email);

		if (!user) {
			return left(UserNotFoundError.byEmail(email));
		}

		const isValidPassword = await this.hashProvider.compareStrings(
			password,
			user.getProps().email.props.value,
		);

		if (!isValidPassword) {
			return left(new UserInvalidCredentialsError());
		}

		const accessToken = await this.tokenProvider.signToken<JwtPayload>({
			sub: user.id.toString(),
			role: user.getRole(),
		});

		return right({
			accessToken,
		});
	}
}
