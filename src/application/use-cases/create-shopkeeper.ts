import { Inject, Injectable } from '@nestjs/common';

import { left, right, type Either } from '@/@core/enterprise/logic/either';
import { type UseCase } from '@/@core/enterprise/ports/use-case';

import { UserAlreadyExistsError } from '@/application/errors/user';
import { ShopkeepersRepository } from '@/application/repositories/shopkeepers-repository';
import {
	type CreateUserService,
	type CreateUserServiceLeftResult,
} from '@/application/services/create-user';

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
	constructor(
		@Inject(ShopkeepersRepository)
		private readonly shopkeepersRepository: ShopkeepersRepository,
		private readonly createUserService: CreateUserService<
			ShopkeeperProps,
			Shopkeeper
		>,
	) {}

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

		const userCreationResult = await this.createUserService.exec(input);

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
