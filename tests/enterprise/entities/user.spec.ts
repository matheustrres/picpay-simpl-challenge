import { deepStrictEqual } from 'node:assert';
import { describe, it } from 'node:test';

import { clearString } from '@/utils/funcs/clear-string';

import { User } from '@/enterprise/entities/user';
import { UserCreatedEvent } from '@/enterprise/events/user-created';

import { UserBuilder } from '#/data/builders/entities/user';

describe('User', () => {
	it('should create a User', () => {
		const user = new UserBuilder().withCPF('764.543.960-29').build();

		const { CPF } = user.getProps();

		deepStrictEqual(
			user.domainEvents[0]!.name,
			UserCreatedEvent.name.toLowerCase(),
		);
		deepStrictEqual(CPF.props.value, clearString('764.543.960-29'));
	});

	it('should restore a User', () => {
		const user = new UserBuilder().build();

		const restoredUser = User.restore({
			id: user.id,
			props: user.getProps(),
		});

		deepStrictEqual(restoredUser, user);
	});
});
