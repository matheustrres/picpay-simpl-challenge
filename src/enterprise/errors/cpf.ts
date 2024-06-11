import { ServerError } from '@/@core/enterprise/errors/server-error';

export class CPFError extends ServerError {
	constructor(message: string, statusCode = 400) {
		super(message, statusCode);
	}
}

export class CPFIsInvalidError extends CPFError {
	constructor(message = 'Invalid CPF.') {
		super(message);
	}
}
