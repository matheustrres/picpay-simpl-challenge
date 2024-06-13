import { faker } from '@faker-js/faker';

import { Builder } from '../builder';

import {
	type CreateCustomerUseCaseInput,
	type CreateCustomerUseCaseOutput,
} from '@/application/use-cases/create-customer';

import { Customer } from '@/enterprise/entities/user/customer';
import { CPF } from '@/enterprise/entities/user/value-objects/cpf';
import { Email } from '@/enterprise/entities/user/value-objects/email';
import { Wallet } from '@/enterprise/entities/wallet';

export class CreateCustomerUseCaseBuilder extends Builder<
	CreateCustomerUseCaseInput,
	CreateCustomerUseCaseOutput
> {
	protected input: CreateCustomerUseCaseInput = {
		fullName: faker.person.fullName(),
		email: faker.internet.email(),
		password: faker.internet.password(),
		cpf: '993.471.220-25',
	};

	withCPF(value: string): this {
		this.input.cpf = value;
		return this;
	}

	withEmail(value: string): this {
		this.input.email = value;
		return this;
	}

	withFullName(value: string): this {
		this.input.fullName = value;
		return this;
	}

	withPassword(value: string): this {
		this.input.password = value;
		return this;
	}

	build(): CreateCustomerUseCaseOutput {
		return {
			isLeft() {
				return false;
			},
			isRight() {
				return true;
			},
			value: Customer.create({
				...this.input,
				CPF: CPF.create(this.input.cpf),
				email: Email.create(this.input.email),
				wallet: Wallet.create({}),
			}),
		};
	}
}
