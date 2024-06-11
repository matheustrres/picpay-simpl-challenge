import { UserId } from './user-id';
import { type CPF } from './value-objects/cpf';
import { type Email } from './value-objects/email';

import { AggregateRoot } from '@/@core/enterprise/aggregate-root';
import { type CreateEntityProps } from '@/@core/enterprise/entity';

import { UserCreatedEvent } from '@/enterprise/events/user-created';

export type UserProps = {
	fullName: string;
	CPF: CPF;
	email: Email;
	password: string;
};

type UserConstructorProps = CreateEntityProps<UserId, UserProps>;

export class User extends AggregateRoot<UserId, UserProps> {
	private constructor(props: UserConstructorProps) {
		super(props);
	}

	static create(props: UserProps): User {
		const user = new User({
			id: new UserId(),
			props,
		});

		user.addDomainEvent(new UserCreatedEvent(user));

		return user;
	}

	static restore(props: UserConstructorProps): User {
		return new User(props);
	}
}
