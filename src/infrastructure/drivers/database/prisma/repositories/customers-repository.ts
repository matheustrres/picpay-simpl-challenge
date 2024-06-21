import { Injectable } from '@nestjs/common';

import { PrismaCustomerMapper } from '../mappers/customer-mapper';
import { PrismaWalletMapper } from '../mappers/wallet-mapper';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { PrismaService } from '../prisma.service';

import { type CustomersRepository } from '@/application/repositories/customers-repository';

import { type Customer } from '@/enterprise/entities/user/customer';

@Injectable()
export class PrismaCustomersRepository implements CustomersRepository {
	readonly #mapper: PrismaCustomerMapper;

	constructor(private readonly prismaService: PrismaService) {
		this.#mapper = new PrismaCustomerMapper();
	}

	async delete(id: string): Promise<void> {
		await this.prismaService.customer.delete({
			where: {
				id,
			},
		});
	}

	async find(): Promise<Customer[]> {
		const prismaCustomers = await this.prismaService.customer.findMany();

		const prismaCustomersMappedToDomain = prismaCustomers.map(
			this.#mapper.toDomain,
		);

		return prismaCustomersMappedToDomain || [];
	}

	async findByCPF(CPF: string): Promise<Customer | null> {
		const customer = await this.prismaService.customer.findUnique({
			where: {
				CPF,
			},
		});

		return customer ? this.#mapper.toDomain(customer) : null;
	}

	async findByEmail(email: string): Promise<Customer | null> {
		const customer = await this.prismaService.customer.findUnique({
			where: {
				email,
			},
		});

		return customer ? this.#mapper.toDomain(customer) : null;
	}

	async findById(id: string): Promise<Customer | null> {
		const customer = await this.prismaService.customer.findUnique({
			where: {
				id,
			},
		});

		return customer ? this.#mapper.toDomain(customer) : null;
	}

	async upsert(customer: Customer): Promise<void> {
		const customerMappedToPrisma = this.#mapper.toInfra(customer);

		const walletMappedToPrisma = new PrismaWalletMapper().toInfra(
			customer.getProps().wallet,
		);

		await this.prismaService.$transaction(async (prisma) => {
			const wallet = await prisma.wallet.create({
				data: walletMappedToPrisma,
			});

			const commonData = {
				...customerMappedToPrisma,
				walletId: wallet.id,
			};

			await prisma.customer.upsert({
				where: {
					id: customer.id.toString(),
				},
				create: commonData,
				update: commonData,
			});
		});
	}
}
