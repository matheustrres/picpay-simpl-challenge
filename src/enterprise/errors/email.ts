import { ServerError } from '@/@core/enterprise/errors/server-error';

export class EmailError extends ServerError {
	constructor(message: string, statusCode = 400) {
		super(message, statusCode);
	}
}

export class EmailIsInvalidError extends EmailError {
	constructor(message = 'Invalid email address.') {
		super(message);
	}
}
