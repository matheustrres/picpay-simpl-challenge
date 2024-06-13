import { mock, type Mock } from 'node:test';

import { type HashProvider } from '@/@core/enterprise/ports/providers/hash-provider';

export type MockedHashProvider = {
	compareStrings: Mock<HashProvider['compareStrings']>;
	hashString: Mock<HashProvider['hashString']>;
};

export function makeMockedHashProvider(): MockedHashProvider {
	return {
		compareStrings: mock.fn(),
		hashString: mock.fn(),
	};
}
