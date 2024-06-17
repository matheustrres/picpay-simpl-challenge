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

export class UserNotFoundError extends UserError {
	private constructor(message: string) {
		super(message);
	}

	static byEmail(value: string): UserNotFoundError {
		return new UserNotFoundError(
			`No user with email address "${value}" was found.`,
		);
	}
}

export class UserInvalidCredentialsError extends UserError {
	constructor(message = 'Invalid credentials.') {
		super(message);
	}
}
