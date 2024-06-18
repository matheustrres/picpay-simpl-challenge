import { type Either, left, right } from '@/@core/enterprise/logic/either';
import { type HashProvider } from '@/@core/enterprise/ports/providers/hash-provider';

import { UserAlreadyExistsError } from '@/application/errors/user';
import { type UsersRepository } from '@/application/repositories/users-repository';

import { type User, type UserProps } from '@/enterprise/entities/user';
import { CPF as CPFVO } from '@/enterprise/entities/user/value-objects/cpf';
import { Email as EmailVO } from '@/enterprise/entities/user/value-objects/email';
import { Wallet } from '@/enterprise/entities/wallet';
import { type CPFError } from '@/enterprise/errors/cpf';
import { type EmailError } from '@/enterprise/errors/email';

export type CreateUserServiceInput = {
	fullName: string;
	email: string;
	password: string;
	cpf: string;
};

export type CreateUserServiceLeftResult =
	| CPFError
	| EmailError
	| UserAlreadyExistsError;

export type CreateUserServiceRightResult = UserProps;

export type CreateUserServiceOutput = Either<
	CreateUserServiceLeftResult,
	CreateUserServiceRightResult
>;

export class CreateUserService<Props extends UserProps, T extends User<Props>> {
	constructor(
		readonly usersRepository: UsersRepository<T>,
		private readonly hashProvider: HashProvider,
	) {}

	async exec({
		cpf,
		email,
		fullName,
		password,
	}: CreateUserServiceInput): Promise<CreateUserServiceOutput> {
		const CPFResult = this.#createCPF(cpf);

		if (CPFResult.isLeft()) {
			return left(CPFResult.value);
		}

		const emailResult = this.#createEmail(email);

		if (emailResult.isLeft()) {
			return left(emailResult.value);
		}

		const userCPF = CPFResult.value;
		const userEmail = emailResult.value;

		const userAlreadyExistsByCPFResult = await this.#findUserByCPF(
			userCPF.props.value,
		);

		if (userAlreadyExistsByCPFResult.isLeft()) {
			return left(userAlreadyExistsByCPFResult.value);
		}

		const userAlreadyExistsByEmailResult = await this.#findUserByEmail(
			userEmail.props.value,
		);

		if (userAlreadyExistsByEmailResult.isLeft()) {
			return left(userAlreadyExistsByEmailResult.value);
		}

		const hashedPassword = await this.hashProvider.hashString(password);

		return right({
			fullName,
			email: userEmail,
			CPF: userCPF,
			password: hashedPassword,
			wallet: Wallet.create({}),
		});
	}

	#createCPF(value: string): Either<CPFError, CPFVO> {
		try {
			return right(CPFVO.create(value));
		} catch (error) {
			return left(error as CPFError);
		}
	}

	#createEmail(value: string): Either<EmailError, EmailVO> {
		try {
			return right(EmailVO.create(value));
		} catch (error) {
			return left(error as EmailError);
		}
	}

	async #findUserByCPF(
		value: string,
	): Promise<Either<UserAlreadyExistsError, null>> {
		const user = await this.usersRepository.findByCPF(value);

		return user ? left(UserAlreadyExistsError.byCPF(value)) : right(null);
	}

	async #findUserByEmail(
		email: string,
	): Promise<Either<UserAlreadyExistsError, null>> {
		const user = await this.usersRepository.findByEmail(email);

		return user ? left(UserAlreadyExistsError.byEmail(email)) : right(null);
	}
}
