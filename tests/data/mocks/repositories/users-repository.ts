import { mock, type Mock } from 'node:test';

import { type UsersRepository } from '@/application/repositories/users-repository';

import { type User } from '@/enterprise/entities/user';

export type MockedUsersRepository<T extends User<any>> = {
	delete: Mock<UsersRepository<T>['delete']>;
	find: Mock<UsersRepository<T>['find']>;
	findByCPF: Mock<UsersRepository<T>['findByCPF']>;
	findByEmail: Mock<UsersRepository<T>['findByEmail']>;
	findById: Mock<UsersRepository<T>['findById']>;
	upsert: Mock<UsersRepository<T>['upsert']>;
};

export function makeMockedUsersRepository<
	T extends User<any>,
>(): MockedUsersRepository<T> {
	return {
		delete: mock.fn(),
		find: mock.fn(),
		findByCPF: mock.fn(),
		findByEmail: mock.fn(),
		findById: mock.fn(),
		upsert: mock.fn(),
	};
}
