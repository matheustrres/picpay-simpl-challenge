import { UserBuilder } from './user';

import {
	Shopkeeper,
	type ShopkeeperProps,
} from '@/enterprise/entities/user/shopkeeper';
import { CNPJ } from '@/enterprise/entities/user/value-objects/cnpj';

export class ShopkeeperBuilder extends UserBuilder<
	ShopkeeperProps,
	Shopkeeper
> {
	withCNPJ(value: string): this {
		this.input.CNPJ = CNPJ.create(value);
		return this;
	}

	build(): Shopkeeper {
		return Shopkeeper.create(this.input);
	}
}
