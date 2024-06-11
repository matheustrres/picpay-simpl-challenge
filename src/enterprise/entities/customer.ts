import { User, type UserProps } from './user';
import { UserId } from './user-id';

import { type CreateEntityProps } from '@/@core/enterprise/entity';

export type CustomerProps = UserProps;

export type CustomerConstructorProps = CreateEntityProps<UserId, CustomerProps>;

export class Customer extends User<CustomerProps> {
	private constructor(props: CustomerConstructorProps) {
		super(props);
	}

	static create(props: CustomerProps): Customer {
		const customer = new Customer({
			id: new UserId(),
			props,
		});

		return customer;
	}

	static restore(props: CustomerConstructorProps): Customer {
		return new Customer(props);
	}

	protected validate(): void {}
}
