import { type UsersRepository } from './users-repository';

import { type Shopkeeper } from '@/enterprise/entities/user/shopkeeper';

export interface ShopkeepersRepository extends UsersRepository<Shopkeeper> {
	findByCNPJ(CNPJ: string): Promise<Shopkeeper | null>;
}

export const ShopkeepersRepository = 'ShopkeepersRepository';
