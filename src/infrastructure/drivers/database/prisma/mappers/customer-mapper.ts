import { type Customer as PrismaCustomer } from '@prisma/client';

import { type Mapper } from '@/@core/enterprise/ports/mapper';

import { Customer } from '@/enterprise/entities/user/customer';
import { CPF } from '@/enterprise/entities/user/value-objects/cpf';
import { Email } from '@/enterprise/entities/user/value-objects/email';
import { UserId } from '@/enterprise/entities/user/value-objects/user-id';
import { Wallet } from '@/enterprise/entities/wallet';

export class PrismaCustomerMapper implements Mapper<Customer, PrismaCustomer> {
	toDomain(model: PrismaCustomer): Customer {
		return Customer.restore({
			id: new UserId(model.id),
			props: {
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

	toInfra(customer: Customer): PrismaCustomer {
		const { CPF, email, fullName, password, wallet } = customer.getProps();

		return {
			id: customer.id.toString(),
			CPF: CPF.props.value,
			email: email.props.value,
			fullName,
			password,
			role: customer.getRole(),
			walletId: wallet.id.toNumber(),
			createdAt: customer.createdAt,
			updatedAt: new Date(),
		};
	}
}
