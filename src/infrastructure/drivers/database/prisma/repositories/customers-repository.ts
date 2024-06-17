import { Injectable } from '@nestjs/common';

import { PrismaCustomerMapper } from '../mappers/customer-mapper';
import { type PrismaService } from '../prisma.service';

import { type CustomersRepository } from '@/application/repositories/customers-repository';

import { type Customer } from '@/enterprise/entities/user/customer';

@Injectable()
export class PrismaCustomersRepository implements CustomersRepository {
	constructor(private readonly prismaService: PrismaService) {}

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
			new PrismaCustomerMapper().toDomain,
		);

		return prismaCustomersMappedToDomain || [];
	}

	async findByCPF(CPF: string): Promise<Customer | null> {
		const prismaCustomer = await this.prismaService.customer.findUnique({
			where: {
				CPF,
			},
		});

		if (!prismaCustomer) return null;

		return new PrismaCustomerMapper().toDomain(prismaCustomer);
	}

	async findByEmail(email: string): Promise<Customer | null> {
		const prismaCustomer = await this.prismaService.customer.findUnique({
			where: {
				email,
			},
		});

		if (!prismaCustomer) return null;

		return new PrismaCustomerMapper().toDomain(prismaCustomer);
	}

	async findById(id: string): Promise<Customer | null> {
		const prismaCustomer = await this.prismaService.customer.findUnique({
			where: {
				id,
			},
		});

		if (!prismaCustomer) return null;

		return new PrismaCustomerMapper().toDomain(prismaCustomer);
	}

	async upsert(customer: Customer): Promise<void> {
		const customerMappedToPrisma = new PrismaCustomerMapper().toInfra(customer);

		await this.prismaService.customer.upsert({
			where: {
				id: customer.id.toString(),
			},
			create: customerMappedToPrisma,
			update: customerMappedToPrisma,
		});
	}
}
