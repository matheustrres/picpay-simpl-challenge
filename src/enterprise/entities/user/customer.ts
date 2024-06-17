import { User, type UserProps } from './index';

import { type UserId } from './value-objects/user-id';

import { ROLE } from '@/@core/enterprise/constants/role';
import { type CreateEntityProps } from '@/@core/enterprise/entity';

export type CustomerProps = UserProps;

export type CustomerConstructorProps = CreateEntityProps<UserId, CustomerProps>;

export class Customer extends User<CustomerProps> {
	protected role = ROLE.CUSTOMER;

	static create(props: CustomerProps): Customer {
		return this.$createUser<CustomerProps, Customer>(props);
	}

	static restore(props: CustomerConstructorProps): Customer {
		return this.$restoreUser<CustomerProps, Customer>(props);
	}

	protected validate(): void {}
}
