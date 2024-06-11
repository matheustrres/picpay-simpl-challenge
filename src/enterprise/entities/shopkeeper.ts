import { User, type UserProps } from './user';
import { UserId } from './user-id';
import { type CNPJ } from './value-objects/cnpj';

import { type CreateEntityProps } from '@/@core/enterprise/entity';

export type ShopkeeperProps = UserProps & {
	CNPJ: CNPJ;
};

export type ShopkeeperConstructorProps = CreateEntityProps<
	UserId,
	ShopkeeperProps
>;

export class Shopkeeper extends User<ShopkeeperProps> {
	private constructor(props: ShopkeeperConstructorProps) {
		super(props);
	}

	static create(props: ShopkeeperProps): Shopkeeper {
		return new Shopkeeper({
			id: new UserId(),
			props,
		});
	}

	static restore(props: ShopkeeperConstructorProps): Shopkeeper {
		return new Shopkeeper(props);
	}

	protected validate(): void {}
}
