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

	static byCPF(CPF: string): UserAlreadyExistsError {
		return new UserAlreadyExistsError(`Given CPF "${CPF}" is already taken.`);
	}

	static byEmail(email: string): UserAlreadyExistsError {
		return new UserAlreadyExistsError(
			`Given email address "${email}" is already taken.`,
		);
	}
}
