import { User, type UserProps } from './index';

import { type CNPJ } from './value-objects/cnpj';
import { type UserId } from './value-objects/user-id';

import { ROLE } from '@/@core/enterprise/constants/role';
import { type CreateEntityProps } from '@/@core/enterprise/entity';

export type ShopkeeperProps = UserProps & {
	CNPJ: CNPJ;
};

export type ShopkeeperConstructorProps = CreateEntityProps<
	UserId,
	ShopkeeperProps
>;

export class Shopkeeper extends User<ShopkeeperProps> {
	protected role = ROLE.SHOPKEEPER;

	static create(props: ShopkeeperProps): Shopkeeper {
		return this.$createUser<ShopkeeperProps, Shopkeeper>(props);
	}

	static restore(props: ShopkeeperConstructorProps): Shopkeeper {
		return this.$restoreUser<ShopkeeperProps, Shopkeeper>(props);
	}

	protected validate(): void {}
}
