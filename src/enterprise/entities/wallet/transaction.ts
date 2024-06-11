import { TransactionId } from './value-objects/transaction-id';

import { type UserId } from '../user/value-objects/user-id';

import { type CreateEntityProps, Entity } from '@/@core/enterprise/entity';
import { type Optional } from '@/@core/types';

export type TransactionProps = {
	amount: number;
	payerId: UserId;
	payeeId: UserId;
	description: string | null;
};

type OptionalTransactionProps = Optional<TransactionProps, 'description'>;

type TransactionConstructorProps = CreateEntityProps<
	TransactionId,
	TransactionProps
>;

export class Transaction extends Entity<TransactionId, TransactionProps> {
	private constructor(props: TransactionConstructorProps) {
		super(props);
	}

	static create(props: OptionalTransactionProps): Transaction {
		return new Transaction({
			id: new TransactionId(),
			props: {
				...props,
				description: props.description || null,
			},
		});
	}

	static restore(props: TransactionConstructorProps): Transaction {
		return new Transaction(props);
	}

	protected validate(): void {}
}
