import { type ArgumentsHost } from '@nestjs/common';
import { type Request, type Response } from 'express';

export type ErrorResponse<Content> = {
	readonly content: Content;
	readonly code: number;
	readonly endpoint: string;
};

export class BaseExceptionFilter {
	static initHttp(host: ArgumentsHost) {
		const http = host.switchToHttp();

		const request = http.getRequest<Request>();
		const response = http.getResponse<Response>();

		return {
			response,
			endpoint: BaseExceptionFilter.#buildEndpoint(request),
		};
	}

	static replyError<Content>(
		response: Response,
		{ code, content, endpoint }: ErrorResponse<Content>,
	): Response {
		return response.status(code).json({
			timestamp: new Date().toISOString(),
			status: 'ERROR',
			code,
			content,
			endpoint,
		});
	}

	static #buildEndpoint({ method, path }: Request) {
		return `${method} ${path}`;
	}
}
