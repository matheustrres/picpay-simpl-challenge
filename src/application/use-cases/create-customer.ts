import { Inject, Injectable } from '@nestjs/common';

import { type Either, left, right } from '@/@core/enterprise/logic/either';
import { type UseCase } from '@/@core/enterprise/ports/use-case';

import { CustomersRepository } from '@/application/repositories/customers-repository';
import {
	type CreateUserService,
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
	constructor(
		@Inject(CustomersRepository)
		private readonly customersRepository: CustomersRepository,
		private readonly createUserService: CreateUserService<
			CustomerProps,
			Customer
		>,
	) {}

	async exec(
		input: CreateCustomerUseCaseInput,
	): Promise<CreateCustomerUseCaseOutput> {
		const userCreationResult = await this.createUserService.exec(input);

		if (userCreationResult.isLeft()) {
			return left(userCreationResult.value);
		}

		const user = userCreationResult.value;

		const customer = Customer.create(user);

		await this.customersRepository.upsert(customer);

		return right(customer);
	}
}
