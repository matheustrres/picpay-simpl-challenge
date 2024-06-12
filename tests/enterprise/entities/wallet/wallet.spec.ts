import { deepStrictEqual } from 'node:assert';
import { describe, it } from 'node:test';

import { Wallet } from '@/enterprise/entities/wallet';

import { WalletBuilder } from '#/data/builders/entities/wallet/wallet';

describe('Wallet', () => {
	it('should create a Wallet', () => {
		const wallet = new WalletBuilder().withBalance(2_000).build();

		deepStrictEqual(wallet.getProps().balance, 2_000);
	});

	it('should restore a Wallet', () => {
		const wallet = new WalletBuilder().build();

		const restoredWallet = Wallet.restore({
			id: wallet.id,
			props: wallet.getProps(),
		});

		deepStrictEqual(restoredWallet, wallet);
	});
});
