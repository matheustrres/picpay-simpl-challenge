import { deepStrictEqual } from 'node:assert';
import { describe, it } from 'node:test';

import { Shopkeeper } from '@/enterprise/entities/user/shopkeeper';

import { clearString } from '@/utils/funcs/clear-string';

import { ShopkeeperBuilder } from '#/data/builders/entities/user/shopkeeper';
import { WalletBuilder } from '#/data/builders/entities/wallet/wallet';

describe('Shopkeeper', () => {
	it('should create a Shopkeeper', () => {
		const wallet = new WalletBuilder().withBalance(0).build();

		const shopkeeper = new ShopkeeperBuilder()
			.withCNPJ('82.981.287/0001-42')
			.withWallet(wallet)
			.build();

		const { CNPJ, wallet: shopkeeperWallet } = shopkeeper.getProps();

		deepStrictEqual(shopkeeper instanceof Shopkeeper, true);
		deepStrictEqual(CNPJ.props.value, clearString('82.981.287/0001-42'));
		deepStrictEqual(shopkeeperWallet.getProps().balance, 0);
	});

	it('should restore a Shopkeeper', () => {
		const shopkeeper = new ShopkeeperBuilder().build();

		const restoredShopkeeper = Shopkeeper.restore({
			id: shopkeeper.id,
			props: shopkeeper.getProps(),
		});

		deepStrictEqual(restoredShopkeeper, shopkeeper);
	});
});
