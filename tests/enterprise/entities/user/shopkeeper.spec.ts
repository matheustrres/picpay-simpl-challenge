import { deepStrictEqual } from 'node:assert';
import { describe, it } from 'node:test';

import { Shopkeeper } from '@/enterprise/entities/user/shopkeeper';

import { clearString } from '@/utils/funcs/clear-string';

import { ShopkeeperBuilder } from '#/data/builders/entities/user/shopkeeper';

describe('Shopkeeper', () => {
	it('should create a Shopkeeper', () => {
		const shopkeeper = new ShopkeeperBuilder()
			.withCNPJ('82.981.287/0001-42')
			.build();

		deepStrictEqual(
			shopkeeper.getProps().CNPJ.props.value,
			clearString('82.981.287/0001-42'),
		);
		deepStrictEqual(shopkeeper instanceof Shopkeeper, true);
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
