import { UserBuilder } from './user';

import { Customer, type CustomerProps } from '@/enterprise/entities/customer';

export class CustomerBuilder extends UserBuilder<CustomerProps, Customer> {
	build(): Customer {
		return Customer.create(this.input);
	}
}
