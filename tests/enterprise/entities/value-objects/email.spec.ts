import { deepStrictEqual, throws } from 'node:assert';
import { describe, it } from 'node:test';

import { Email } from '@/enterprise/entities/value-objects/email';
import { EmailIsInvalidError } from '@/enterprise/errors/email';

describe('Email', () => {
	it('should throw if an invalid email address is provided', () => {
		throws(() => Email.create('john.doe@.com'), new EmailIsInvalidError());
	});

	it('should create a valid Email', () => {
		const email = Email.create('john.doe@gmail.com');

		deepStrictEqual(email.props.value, 'john.doe@gmail.com');
	});
});
