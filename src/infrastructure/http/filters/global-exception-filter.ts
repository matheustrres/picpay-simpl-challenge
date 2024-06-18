import {
	type ArgumentsHost,
	Catch,
	type ExceptionFilter,
	Logger,
	HttpException,
} from '@nestjs/common';

import { BaseExceptionFilter } from './base-exception-filter';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
	readonly #logger = new Logger(GlobalExceptionFilter.name);

	catch(exception: unknown, host: ArgumentsHost) {
		const { endpoint, response } = BaseExceptionFilter.initHttp(host);

		if (exception instanceof HttpException) {
			return BaseExceptionFilter.replyError(response, {
				code: exception.getStatus(),
				content: exception.message,
				endpoint,
			});
		}

		this.#logger.error(
			'An unhandled exception has been caught: ',
			console.trace(exception),
		);

		return BaseExceptionFilter.replyError(response, {
			code: 500,
			content: 'Internal Server Error',
			endpoint,
		});
	}
}
