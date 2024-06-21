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
import { CreateCustomerUseCase } from '@/application/use-cases/create-customer';

import { type Customer } from '@/enterprise/entities/user/customer';
import { CPFError } from '@/enterprise/errors/cpf';
import { EmailError } from '@/enterprise/errors/email';

import {
	CreateCustomerBodyPipe,
	type CreateCustomerBodySchema,
} from '@/infrastructure/http/schemas/create-customer';

@Controller('customers')
export class CreateCustomerController implements BaseController {
	constructor(private readonly useCase: CreateCustomerUseCase) {}

	@Post()
	async handle(
		@Body(CreateCustomerBodyPipe) body: CreateCustomerBodySchema,
	): Promise<Customer> {
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
