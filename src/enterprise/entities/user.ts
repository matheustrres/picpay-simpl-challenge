import { type UserId } from './user-id';
import { type CPF } from './value-objects/cpf';
import { type Email } from './value-objects/email';

import { Entity, type CreateEntityProps } from '@/@core/enterprise/entity';

export type UserProps = {
	fullName: string;
	CPF: CPF;
	email: Email;
	password: string;
};

export type UserConstructorProps<Props extends UserProps> = CreateEntityProps<
	UserId,
	Props
>;

export abstract class User<Props extends UserProps> extends Entity<
	UserId,
	Props
> {
	protected constructor(props: UserConstructorProps<Props>) {
		super(props);
	}
}
