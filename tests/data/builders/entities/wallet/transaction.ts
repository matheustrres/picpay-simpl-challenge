import { faker } from '@faker-js/faker';

import { Builder } from '../../builder';
import { CustomerBuilder } from '../user/customer';
import { ShopkeeperBuilder } from '../user/shopkeeper';

import { type UserId } from '@/enterprise/entities/user/value-objects/user-id';
import {
	Transaction,
	type TransactionProps,
} from '@/enterprise/entities/wallet/transaction';

export class TransactionBuilder extends Builder<TransactionProps, Transaction> {
	protected input: TransactionProps = {
		amount: faker.number.int(),
		description: faker.lorem.paragraph(),
		payeeId: new ShopkeeperBuilder().build().id,
		payerId: new CustomerBuilder().build().id,
	};

	withAmount(amount: number): this {
		this.input.amount = amount;
		return this;
	}

	withDescription(description: string): this {
		this.input.description = description;
		return this;
	}

	withPayeeId(payeeId: UserId): this {
		this.input.payeeId = payeeId;
		return this;
	}

	withPayerId(payerId: UserId): this {
		this.input.payerId = payerId;
		return this;
	}

	build(): Transaction {
		return Transaction.create(this.input);
	}
}
