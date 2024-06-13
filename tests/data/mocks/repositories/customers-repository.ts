import {
	type MockedUsersRepository,
	makeMockedUsersRepository,
} from './users-repository';

import { type Customer } from '@/enterprise/entities/user/customer';

export type MockedCustomersRepository = MockedUsersRepository<Customer>;

export function makeMockedCustomersRepository(): MockedCustomersRepository {
	return {
		...makeMockedUsersRepository(),
	};
}
