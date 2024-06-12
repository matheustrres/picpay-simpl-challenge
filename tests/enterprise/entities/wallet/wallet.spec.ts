import { deepStrictEqual } from 'node:assert';
import { describe, it } from 'node:test';

import { WalletBuilder } from '#/data/builders/entities/wallet/wallet';

describe('Wallet', () => {
	it('should create a Wallet', () => {
		const wallet = new WalletBuilder().withBalance(2_000).build();

		deepStrictEqual(wallet.getProps().balance, 2_000);
	});
});
