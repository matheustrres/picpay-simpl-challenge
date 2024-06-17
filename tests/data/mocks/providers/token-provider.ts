import { mock, type Mock } from 'node:test';

import { type TokenProvider } from '@/@core/enterprise/ports/providers/token-provider';

export type MockedTokenProvider = {
	signToken: Mock<TokenProvider['signToken']>;
	verifyToken: Mock<TokenProvider['verifyToken']>;
};

export function makeMockedTokenProvider(): MockedTokenProvider {
	return {
		signToken: mock.fn(),
		verifyToken: mock.fn(),
	};
}
