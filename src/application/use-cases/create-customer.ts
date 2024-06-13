import { Inject, Injectable } from '@nestjs/common';

import { type Either, left, right } from '@/@core/enterprise/logic/either';
import { HashProvider } from '@/@core/enterprise/ports/providers/hash-provider';
import { type UseCase } from '@/@core/enterprise/ports/use-case';

import { CustomersRepository } from '@/application/repositories/customers-repository';
import {
	CreateUserService,
	type CreateUserServiceLeftResult,
} from '@/application/services/create-user';

import {
	Customer,
	type CustomerProps,
} from '@/enterprise/entities/user/customer';

export type CreateCustomerUseCaseInput = {
	fullName: string;
	email: string;
	password: string;
	cpf: string;
};

export type CreateCustomerUseCaseOutput = Either<
	CreateUserServiceLeftResult,
	Customer
>;

@Injectable()
export class CreateCustomerUseCase
	implements UseCase<CreateCustomerUseCaseInput, CreateCustomerUseCaseOutput>
{
	readonly #createUserService: CreateUserService<CustomerProps, Customer>;

	constructor(
		@Inject(CustomersRepository)
		usersRepository: CustomersRepository,
		@Inject(HashProvider)
		hashProvider: HashProvider,
	) {
		this.#createUserService = new CreateUserService(
			usersRepository,
			hashProvider,
		);
	}

	async exec(
		input: CreateCustomerUseCaseInput,
	): Promise<CreateCustomerUseCaseOutput> {
		const userCreationResult = await this.#createUserService.exec(input);

		if (userCreationResult.isLeft()) {
			return left(userCreationResult.value);
		}

		const user = userCreationResult.value;

		const customer = Customer.create(user);

		await this.#createUserService.usersRepository.upsert(customer);

		return right(customer);
	}
}
