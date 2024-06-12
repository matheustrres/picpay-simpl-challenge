import { type Transaction } from './transaction';
import { WalletdId } from './value-objects/wallet-id';

import { type CreateEntityProps, Entity } from '@/@core/enterprise/entity';
import { type Optional } from '@/@core/types';

export type WalletProps = {
	balance: number;
	transactions: Transaction[];
};

export type OptionalWalletProps = Optional<
	WalletProps,
	'balance' | 'transactions'
>;

type WalletConstructorProps = CreateEntityProps<WalletdId, WalletProps>;

export class Wallet extends Entity<WalletdId, WalletProps> {
	private constructor(props: WalletConstructorProps) {
		super(props);
	}

	static create(props: OptionalWalletProps): Wallet {
		return new Wallet({
			id: new WalletdId(),
			props: {
				...props,
				balance: props.balance || 0,
				transactions: props.transactions || [],
			},
		});
	}

	static restore(props: WalletConstructorProps): Wallet {
		return new Wallet(props);
	}

	protected validate(): void {}
}
