import {
	type ArgumentsHost,
	Catch,
	type ExceptionFilter,
} from '@nestjs/common';
import { ZodError, type ZodIssue } from 'zod';

import { BaseExceptionFilter } from './base-exception-filter';

@Catch(ZodError)
export class ZodExceptionFilter implements ExceptionFilter {
	catch(exception: ZodError, host: ArgumentsHost) {
		const { endpoint, response } = BaseExceptionFilter.initHttp(host);

		return BaseExceptionFilter.replyError(response, {
			code: 400,
			content: this.#mapZodIssuesToResponse(exception.issues),
			endpoint,
		});
	}

	#mapZodIssuesToResponse(issues: ZodIssue[]): string[] {
		return issues.map(
			(issue) => `Path \"${issue.path}"\ is invalid: ${issue.message}`,
		);
	}
}
