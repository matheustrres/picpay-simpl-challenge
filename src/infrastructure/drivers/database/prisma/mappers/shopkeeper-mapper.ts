import { type Shopkeeper as PrismaShopkeeper } from '@prisma/client';

import { type Mapper } from '@/@core/enterprise/ports/mapper';

import { Shopkeeper } from '@/enterprise/entities/user/shopkeeper';
import { CNPJ } from '@/enterprise/entities/user/value-objects/cnpj';
import { CPF } from '@/enterprise/entities/user/value-objects/cpf';
import { Email } from '@/enterprise/entities/user/value-objects/email';
import { UserId } from '@/enterprise/entities/user/value-objects/user-id';
import { Wallet } from '@/enterprise/entities/wallet';

export class PrismaShopkeeperMapper
	implements Mapper<Shopkeeper, PrismaShopkeeper>
{
	toDomain(model: PrismaShopkeeper): Shopkeeper {
		return Shopkeeper.restore({
			id: new UserId(model.id),
			props: {
				CNPJ: CNPJ.create(model.CNPJ),
				CPF: CPF.create(model.CPF),
				email: Email.create(model.email),
				fullName: model.fullName,
				password: model.password,
				/**
				 * @todo Improving wallet recovery
				 */
				wallet: Wallet.create({}),
			},
		});
	}

	toInfra(shopkeeper: Shopkeeper): PrismaShopkeeper {
		const { CNPJ, CPF, email, fullName, password, wallet } =
			shopkeeper.getProps();

		return {
			id: shopkeeper.id.toString(),
			CNPJ: CNPJ.props.value,
			CPF: CPF.props.value,
			email: email.props.value,
			fullName,
			password,
			role: shopkeeper.getRole(),
			walletId: wallet.id.toNumber(),
			createdAt: shopkeeper.createdAt,
			updatedAt: new Date(),
		};
	}
}
