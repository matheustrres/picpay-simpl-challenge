import { type UsersRepository } from './users-repository';

import { type Customer } from '@/enterprise/entities/user/customer';

export interface CustomersRepository extends UsersRepository<Customer> {}

export const CustomersRepository = 'CustomersRepository';
