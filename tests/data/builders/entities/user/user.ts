import { faker } from '@faker-js/faker';

import { Builder } from '../../builder';
import { WalletBuilder } from '../wallet/wallet';

import { type User, type UserProps } from '@/enterprise/entities/user';
import { CPF } from '@/enterprise/entities/user/value-objects/cpf';
import { Email } from '@/enterprise/entities/user/value-objects/email';
import { type Wallet } from '@/enterprise/entities/wallet';

export abstract class UserBuilder<
	Props extends UserProps,
	Entity extends User<Props>,
> extends Builder<Props, Entity> {
	protected input: Props = {
		fullName: faker.person.fullName(),
		email: Email.create(faker.internet.email()),
		CPF: CPF.create('938.549.360-44'),
		password: faker.internet.password(),
		wallet: new WalletBuilder().build(),
	} as Props;

	withCPF(value: string): this {
		this.input.CPF = CPF.create(value);
		return this;
	}

	withEmail(value: string): this {
		this.input.email = Email.create(value);
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

	withWallet(wallet: Wallet): this {
		this.input.wallet = wallet;
		return this;
	}
}
