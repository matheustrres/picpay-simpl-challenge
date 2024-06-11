import { User, type UserProps } from './user';
import { type UserId } from './user-id';

import { type CreateEntityProps } from '@/@core/enterprise/entity';

export type CustomerProps = UserProps;

export type CustomerConstructorProps = CreateEntityProps<UserId, CustomerProps>;

export class Customer extends User<CustomerProps> {
	static create(props: CustomerProps): Customer {
		return this.$createUser(props);
	}

	static restore(props: CustomerConstructorProps): Customer {
		return this.$restoreUser(props);
	}

	protected validate(): void {}
}
