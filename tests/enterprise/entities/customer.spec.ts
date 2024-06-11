import { describe, it } from 'node:test';

import { deepStrictEqual } from 'assert';

import { Customer } from '@/enterprise/entities/customer';

import { CustomerBuilder } from '#/data/builders/entities/customer';

describe('Customer', () => {
	it('should create a Customer', () => {
		const customer = new CustomerBuilder()
			.withFullName('John Doe')
			.withPassword('youshallnotpass')
			.build();

		deepStrictEqual(customer.getProps().fullName, 'John Doe');
		deepStrictEqual(customer instanceof Customer, true);
	});

	it('should restore a Customer', () => {
		const customer = new CustomerBuilder().build();

		const restoredCustomer = Customer.restore({
			id: customer.id,
			props: customer.getProps(),
		});

		deepStrictEqual(restoredCustomer, customer);
	});
});
