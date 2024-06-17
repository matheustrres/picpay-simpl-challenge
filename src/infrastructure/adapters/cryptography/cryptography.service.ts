import { sign, verify } from '@node-rs/jsonwebtoken';

import { type TokenProvider } from '@/@core/enterprise/ports/providers/token-provider';

export class CryptographyService implements TokenProvider {
	async signToken<T extends object>(payload: T): Promise<string> {
		return sign(payload, process.env['JWT_PUBLIC_KEY'] as string);
	}

	async verifyToken<T extends object>(token: string): Promise<T | null> {
		return verify(token, process.env['JWT_PRIVATE_KEY'] as string) as T;
	}
}
