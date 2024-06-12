import { faker } from '@faker-js/faker';

import { Wallet, type OptionalWalletProps } from '@/enterprise/entities/wallet';
import { type Transaction } from '@/enterprise/entities/wallet/transaction';

import { Builder } from '#/data/builders/builder';

export class WalletBuilder extends Builder<OptionalWalletProps, Wallet> {
	protected input: OptionalWalletProps = {
		balance: faker.number.int(),
	};

	withBalance(balance: number): this {
		this.input.balance = balance;
		return this;
	}

	withTransactions(transactions: Transaction[]): this {
		this.input.transactions = transactions;
		return this;
	}

	build(): Wallet {
		return Wallet.create(this.input);
	}
}
