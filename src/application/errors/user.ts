import { ServerError } from '@/@core/enterprise/errors/server-error';

class UserError extends ServerError {
	constructor(message: string, statusCode = 400) {
		super(message, statusCode);
	}
}

export class UserAlreadyExistsError extends UserError {
	private constructor(message: string) {
		super(message);
	}

	static byCNPJ(value: string): UserAlreadyExistsError {
		return new UserAlreadyExistsError(
			`Given CNPJ "${value}" is already taken.`,
		);
	}

	static byCPF(value: string): UserAlreadyExistsError {
		return new UserAlreadyExistsError(`Given CPF "${value}" is already taken.`);
	}

	static byEmail(value: string): UserAlreadyExistsError {
		return new UserAlreadyExistsError(
			`Given e-mail address "${value}" is already taken.`,
		);
	}
}
