import { faker } from '@faker-js/faker';

import { Builder } from '../builder';

import {
	type CreateShopkeeperUseCaseInput,
	type CreateCustomerUseCaseOutput,
} from '@/application/use-cases/create-shopkeeper';

import { Shopkeeper } from '@/enterprise/entities/user/shopkeeper';
import { CNPJ } from '@/enterprise/entities/user/value-objects/cnpj';
import { CPF } from '@/enterprise/entities/user/value-objects/cpf';
import { Email } from '@/enterprise/entities/user/value-objects/email';
import { Wallet } from '@/enterprise/entities/wallet';

export class CreateShopkeeperUseCaseBuilder extends Builder<
	CreateShopkeeperUseCaseInput,
	CreateCustomerUseCaseOutput
> {
	protected input: CreateShopkeeperUseCaseInput = {
		fullName: faker.person.fullName(),
		email: faker.internet.email(),
		password: faker.internet.password(),
		cpf: '993.471.220-25',
		cnpj: '24.480.298/0001-42',
	};

	withCNPJ(value: string): this {
		this.input.cnpj = value;
		return this;
	}

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
			value: Shopkeeper.create({
				...this.input,
				CNPJ: CNPJ.create(this.input.cnpj),
				CPF: CPF.create(this.input.cpf),
				email: Email.create(this.input.email),
				wallet: Wallet.create({}),
			}),
		};
	}
}
