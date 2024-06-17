export interface TokenProvider {
	signToken<T extends object>(payload: T): Promise<string>;
	verifyToken<T extends object>(token: string): Promise<T | null>;
}

export const TokenProvider = 'TokenProvider';
