import { describe, it } from 'node:test';

import { deepStrictEqual } from 'assert';

import { ROLE } from '@/@core/enterprise/constants/role';

import { Customer } from '@/enterprise/entities/user/customer';

import { CustomerBuilder } from '#/data/builders/entities/user/customer';
import { WalletBuilder } from '#/data/builders/entities/wallet/wallet';

describe('Customer', () => {
	it('should create a Customer', () => {
		const wallet = new WalletBuilder().withBalance(0).build();

		const customer = new CustomerBuilder()
			.withFullName('John Doe')
			.withPassword('youshallnotpass')
			.withWallet(wallet)
			.build();

		const { fullName, wallet: customerWallet } = customer.getProps();

		deepStrictEqual(customer instanceof Customer, true);
		deepStrictEqual(fullName, 'John Doe');
		deepStrictEqual(customerWallet.getProps().balance, 0);
		deepStrictEqual(customer.getRole(), ROLE.CUSTOMER);
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
