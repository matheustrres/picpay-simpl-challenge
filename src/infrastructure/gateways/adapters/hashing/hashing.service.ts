import { Injectable } from '@nestjs/common';
import { hash, compare } from '@node-rs/bcrypt';

import { type HashProvider } from '@/@core/enterprise/ports/providers/hash-provider';

@Injectable()
export class HashingService implements HashProvider {
	async compareStrings(plainStr: string, hashedStr: string): Promise<boolean> {
		return compare(plainStr, hashedStr);
	}

	async hashString(str: string): Promise<string> {
		return hash(str, 12);
	}
}
