import { type ObjectValues } from '@/@core/types';

export const ROLE = {
	USER: 'USER',
	CUSTOMER: 'CUSTOMER',
	SHOPKEEPER: 'SHOPKEEPER',
} as const;

export type ROLE = ObjectValues<typeof ROLE>;
