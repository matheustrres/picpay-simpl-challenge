import { type Wallet as PrismaWallet } from '@prisma/client';

import { type Mapper } from '@/@core/enterprise/ports/mapper';

import { Wallet } from '@/enterprise/entities/wallet';
import { WalletdId } from '@/enterprise/entities/wallet/value-objects/wallet-id';

export class PrismaWalletMapper implements Mapper<Wallet, PrismaWallet> {
	toDomain(model: PrismaWallet): Wallet {
		return Wallet.restore({
			id: new WalletdId(model.id),
			props: {
				balance: model.balance,
				transactions: [],
			},
		});
	}

	toInfra(wallet: Wallet): PrismaWallet {
		const { balance } = wallet.getProps();

		return {
			id: wallet.id.toNumber(),
			balance,
			createdAt: wallet.createdAt,
			updatedAt: new Date(),
		};
	}
}
