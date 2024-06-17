import { type ROLE } from '../enterprise/constants/role';

export type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

export type ObjectValues<T> = T[keyof T];

export type JwtPayload = {
	sub: string;
	role: ROLE;
};
