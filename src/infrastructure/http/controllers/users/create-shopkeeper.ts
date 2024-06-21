import {
	BadRequestException,
	Body,
	ConflictException,
	Controller,
	Post,
} from '@nestjs/common';

import { type BaseController } from '@/@core/enterprise/ports/controller';

import { UserAlreadyExistsError } from '@/application/errors/user';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { CreateShopkeeperUseCase } from '@/application/use-cases/create-shopkeeper';

import { type Shopkeeper } from '@/enterprise/entities/user/shopkeeper';
import { CPFError } from '@/enterprise/errors/cpf';
import { EmailError } from '@/enterprise/errors/email';

import {
	CreateShopkeeperBodyPipe,
	type CreateShopkeeperBodySchema,
} from '@/infrastructure/http/schemas/create-shopkeeper';

@Controller('shopkeepers')
export class CreateShopkeeperController implements BaseController {
	constructor(private readonly useCase: CreateShopkeeperUseCase) {}

	@Post()
	async handle(
		@Body(CreateShopkeeperBodyPipe) body: CreateShopkeeperBodySchema,
	): Promise<Shopkeeper> {
		const result = await this.useCase.exec(body);

		if (result.isLeft()) {
			const error = result.value;

			switch (error.constructor) {
				case CPFError:
					throw new BadRequestException(error.message);
				case EmailError:
					throw new BadRequestException(error.message);
				case UserAlreadyExistsError:
					throw new ConflictException(error.message);
				default:
					throw new BadRequestException(error.message);
			}
		}

		return result.value;
	}
}
