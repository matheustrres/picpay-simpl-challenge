import { faker } from '@faker-js/faker';

import { Builder } from '../builder';

import { User, type UserProps } from '@/enterprise/entities/user';
import { CPF } from '@/enterprise/entities/value-objects/cpf';
import { Email } from '@/enterprise/entities/value-objects/email';

export class UserBuilder extends Builder<UserProps, User> {
	protected input: UserProps = {
		fullName: faker.person.fullName(),
		email: Email.create(faker.internet.email()),
		CPF: CPF.create('938.549.360-44'),
		password: faker.internet.password(),
	};

	withFullName(fullName: string): this {
		this.input.fullName = fullName;
		return this;
	}

	withEmail(email: string): this {
		this.input.email = Email.create(email);
		return this;
	}

	withCPF(cpf: string): this {
		this.input.CPF = CPF.create(cpf);
		return this;
	}

	withPassword(password: string): this {
		this.input.password = password;
		return this;
	}

	build(): User {
		return User.create(this.input);
	}
}
