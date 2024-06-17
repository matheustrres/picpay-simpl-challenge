import { Injectable } from '@nestjs/common';

import { PrismaShopkeeperMapper } from '../mappers/shopkeeper-mapper';
import { type PrismaService } from '../prisma.service';

import { type ShopkeepersRepository } from '@/application/repositories/shopkeepers-repository';

import { type Shopkeeper } from '@/enterprise/entities/user/shopkeeper';

@Injectable()
export class PrismaShopkeepersRepository implements ShopkeepersRepository {
	constructor(private readonly prismaService: PrismaService) {}

	async delete(id: string): Promise<void> {
		await this.prismaService.shopkeeper.delete({
			where: {
				id,
			},
		});
	}

	async find(): Promise<Shopkeeper[]> {
		const prismaShopkeepers = await this.prismaService.shopkeeper.findMany();

		const prismaShopkeepersMappedToDomain = prismaShopkeepers.map(
			new PrismaShopkeeperMapper().toDomain,
		);

		return prismaShopkeepersMappedToDomain || [];
	}

	async findByCPF(CPF: string): Promise<Shopkeeper | null> {
		const prismaShopkeeper = await this.prismaService.shopkeeper.findUnique({
			where: {
				CPF,
			},
		});

		if (!prismaShopkeeper) return null;

		return new PrismaShopkeeperMapper().toDomain(prismaShopkeeper);
	}

	async findByCNPJ(CNPJ: string): Promise<Shopkeeper | null> {
		const prismaShopkeeper = await this.prismaService.shopkeeper.findUnique({
			where: {
				CNPJ,
			},
		});

		if (!prismaShopkeeper) return null;

		return new PrismaShopkeeperMapper().toDomain(prismaShopkeeper);
	}

	async findByEmail(email: string): Promise<Shopkeeper | null> {
		const prismaShopkeeper = await this.prismaService.shopkeeper.findUnique({
			where: {
				email,
			},
		});

		if (!prismaShopkeeper) return null;

		return new PrismaShopkeeperMapper().toDomain(prismaShopkeeper);
	}

	async findById(id: string): Promise<Shopkeeper | null> {
		const prismaShopkeeper = await this.prismaService.shopkeeper.findUnique({
			where: {
				id,
			},
		});

		if (!prismaShopkeeper) return null;

		return new PrismaShopkeeperMapper().toDomain(prismaShopkeeper);
	}

	async upsert(shopkeeper: Shopkeeper): Promise<void> {
		const shopkeeperMappedToPrisma = new PrismaShopkeeperMapper().toInfra(
			shopkeeper,
		);

		await this.prismaService.shopkeeper.upsert({
			where: {
				id: shopkeeper.id.toString(),
			},
			create: shopkeeperMappedToPrisma,
			update: shopkeeperMappedToPrisma,
		});
	}
}
