import { Inject, Injectable } from '@nestjs/common';

import { UserAlreadyExistsError } from '../errors/user';
import { ShopkeepersRepository } from '../repositories/shopkeepers-repository';
import {
	CreateUserService,
	type CreateUserServiceLeftResult,
} from '../services/create-user';

import { left, right, type Either } from '@/@core/enterprise/logic/either';
import { HashProvider } from '@/@core/enterprise/ports/providers/hash-provider';
import { type UseCase } from '@/@core/enterprise/ports/use-case';

import {
	Shopkeeper,
	type ShopkeeperProps,
} from '@/enterprise/entities/user/shopkeeper';
import { CNPJ } from '@/enterprise/entities/user/value-objects/cnpj';
import { type CNPJError } from '@/enterprise/errors/cnpj';

export type CreateShopkeeperUseCaseInput = {
	fullName: string;
	email: string;
	password: string;
	cpf: string;
	cnpj: string;
};

export type CreateCustomerUseCaseOutput = Either<
	CreateUserServiceLeftResult | CNPJError,
	Shopkeeper
>;

@Injectable()
export class CreateShopkeeperUseCase
	implements UseCase<CreateShopkeeperUseCaseInput, CreateCustomerUseCaseOutput>
{
	readonly #createUserService: CreateUserService<ShopkeeperProps, Shopkeeper>;

	constructor(
		@Inject(ShopkeepersRepository)
		private readonly shopkeepersRepository: ShopkeepersRepository,
		@Inject(HashProvider)
		hashProvider: HashProvider,
	) {
		this.#createUserService = new CreateUserService<
			ShopkeeperProps,
			Shopkeeper
		>(shopkeepersRepository, hashProvider);
	}

	async exec(
		input: CreateShopkeeperUseCaseInput,
	): Promise<CreateCustomerUseCaseOutput> {
		const CNPJCreationResult = this.#createCNPJ(input.cnpj);

		if (CNPJCreationResult.isLeft()) {
			return left(CNPJCreationResult.value);
		}

		const userCNPJ = CNPJCreationResult.value;

		const userAlreadyExistsByCNPJResult = await this.#findUserByCNPJ(
			userCNPJ.props.value,
		);

		if (userAlreadyExistsByCNPJResult.isLeft()) {
			return left(userAlreadyExistsByCNPJResult.value);
		}

		const userCreationResult = await this.#createUserService.exec(input);

		if (userCreationResult.isLeft()) {
			return left(userCreationResult.value);
		}

		const user = userCreationResult.value;

		const shopkeeper = Shopkeeper.create({
			...user,
			CNPJ: userCNPJ,
		});

		await this.shopkeepersRepository.upsert(shopkeeper);

		return right(shopkeeper);
	}

	#createCNPJ(value: string): Either<CNPJError, CNPJ> {
		try {
			return right(CNPJ.create(value));
		} catch (error) {
			return left(error as CNPJError);
		}
	}

	async #findUserByCNPJ(
		value: string,
	): Promise<Either<UserAlreadyExistsError, null>> {
		const user = await this.shopkeepersRepository.findByCNPJ(value);

		return user ? left(UserAlreadyExistsError.byCNPJ(value)) : right(null);
	}
}
