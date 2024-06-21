import { Injectable } from '@nestjs/common';

import { PrismaShopkeeperMapper } from '../mappers/shopkeeper-mapper';
import { PrismaWalletMapper } from '../mappers/wallet-mapper';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { PrismaService } from '../prisma.service';

import { type ShopkeepersRepository } from '@/application/repositories/shopkeepers-repository';

import { type Shopkeeper } from '@/enterprise/entities/user/shopkeeper';

@Injectable()
export class PrismaShopkeepersRepository implements ShopkeepersRepository {
	readonly #mapper: PrismaShopkeeperMapper;

	constructor(private readonly prismaService: PrismaService) {
		this.#mapper = new PrismaShopkeeperMapper();
	}

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
			this.#mapper.toDomain,
		);

		return prismaShopkeepersMappedToDomain || [];
	}

	async findByCPF(CPF: string): Promise<Shopkeeper | null> {
		const shopkeeper = await this.prismaService.shopkeeper.findUnique({
			where: {
				CPF,
			},
		});

		return shopkeeper ? this.#mapper.toDomain(shopkeeper) : null;
	}

	async findByCNPJ(CNPJ: string): Promise<Shopkeeper | null> {
		const shopkeeper = await this.prismaService.shopkeeper.findUnique({
			where: {
				CNPJ,
			},
		});

		return shopkeeper ? this.#mapper.toDomain(shopkeeper) : null;
	}

	async findByEmail(email: string): Promise<Shopkeeper | null> {
		const shopkeeper = await this.prismaService.shopkeeper.findUnique({
			where: {
				email,
			},
		});

		return shopkeeper ? this.#mapper.toDomain(shopkeeper) : null;
	}

	async findById(id: string): Promise<Shopkeeper | null> {
		const shopkeeper = await this.prismaService.shopkeeper.findUnique({
			where: {
				id,
			},
		});

		return shopkeeper ? this.#mapper.toDomain(shopkeeper) : null;
	}

	async upsert(shopkeeper: Shopkeeper): Promise<void> {
		const shopkeeperMappedToPrisma = this.#mapper.toInfra(shopkeeper);

		const walletMappedToPrisma = new PrismaWalletMapper().toInfra(
			shopkeeper.getProps().wallet,
		);

		await this.prismaService.$transaction(async (prisma) => {
			const wallet = await prisma.wallet.create({
				data: walletMappedToPrisma,
			});

			const commonData = {
				...shopkeeperMappedToPrisma,
				walletId: wallet.id,
			};

			await prisma.shopkeeper.upsert({
				where: {
					id: shopkeeper.id.toString(),
				},
				create: commonData,
				update: commonData,
			});
		});
	}
}
