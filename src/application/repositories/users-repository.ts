import { type Repository } from '@/@core/enterprise/ports/repository';

import { type User } from '@/enterprise/entities/user';

export interface UsersRepository<T extends User<any>> extends Repository<T> {
	findByCPF(CPF: string): Promise<T | null>;
	findByEmail(email: string): Promise<T | null>;
}

export const UsersRepository = 'UsersRepository';
