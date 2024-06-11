import { ServerError } from '@/@core/enterprise/errors/server-error';

export class CNPJError extends ServerError {
	constructor(message: string, statusCode = 400) {
		super(message, statusCode);
	}
}

export class CNPJIsInvalidError extends CNPJError {
	constructor(message = 'Invalid CNPJ.') {
		super(message);
	}
}
