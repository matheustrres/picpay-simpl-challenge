import { deepStrictEqual } from 'node:assert';
import { describe, it } from 'node:test';

import { Transaction } from '@/enterprise/entities/wallet/transaction';

import { TransactionBuilder } from '#/data/builders/entities/wallet/transaction';

describe('Transaction', () => {
	it('should create a Transaction', () => {
		const transaction = new TransactionBuilder()
			.withAmount(1000)
			.withDescription('Just bought a PS5')
			.build();

		const { amount, description } = transaction.getProps();

		deepStrictEqual(amount, 1000);
		deepStrictEqual(description, 'Just bought a PS5');
	});

	it('should restore a Transaction', () => {
		const transaction = new TransactionBuilder().build();

		const restoredTransaction = Transaction.restore({
			id: transaction.id,
			props: transaction.getProps(),
		});

		deepStrictEqual(restoredTransaction, transaction);
	});
});
