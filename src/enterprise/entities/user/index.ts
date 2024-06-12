import { type CPF } from './value-objects/cpf';
import { type Email } from './value-objects/email';
import { UserId } from './value-objects/user-id';

import { type Wallet } from '../wallet';

import { Entity, type CreateEntityProps } from '@/@core/enterprise/entity';

export type UserProps = {
	fullName: string;
	CPF: CPF;
	email: Email;
	password: string;
	wallet: Wallet;
};

export type UserConstructorProps<Props extends UserProps> = CreateEntityProps<
	UserId,
	Props
>;

export abstract class User<Props extends UserProps> extends Entity<
	UserId,
	Props
> {
	protected static $createUser<Props extends UserProps, T extends User<Props>>(
		this: new (props: CreateEntityProps<UserId, Props>) => T,
		props: Props,
	): T {
		return new this({
			id: new UserId(),
			props,
		});
	}

	protected static $restoreUser<Props extends UserProps, T extends User<Props>>(
		this: new (props: CreateEntityProps<UserId, Props>) => T,
		props: CreateEntityProps<UserId, Props>,
	): T {
		return new this(props);
	}
}
