import { deepStrictEqual } from 'node:assert';
import { describe, it } from 'node:test';

import { clearString } from '@/utils/funcs/clear-string';

import { User } from '@/enterprise/entities/user';
import { CPF } from '@/enterprise/entities/value-objects/cpf';
import { Email } from '@/enterprise/entities/value-objects/email';
import { UserCreatedEvent } from '@/enterprise/events/user-created';

describe('User', () => {
	it('should create a User', () => {
		const user = User.create({
			fullName: 'John Doe',
			CPF: CPF.create('764.543.960-29'),
			email: Email.create('john.doe@gmail.com'),
			password: 'youshallnotpass',
		});

		const { CPF: userCpf, email: userEmail } = user.getProps();

		deepStrictEqual(
			user.domainEvents[0]!.name,
			UserCreatedEvent.name.toLowerCase(),
		);
		deepStrictEqual(userCpf.props.value, clearString('764.543.960-29'));
		deepStrictEqual(userEmail.props.value, 'john.doe@gmail.com');
	});
});
