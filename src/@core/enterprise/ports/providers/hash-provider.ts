export interface HashProvider {
	compareStrings(plainStr: string, hashedStr: string): Promise<boolean>;
	hashString(str: string): Promise<string>;
}

export const HashProvider = 'HashProvider';
