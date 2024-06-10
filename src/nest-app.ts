import {
	type INestApplication,
	type INestApplicationContext,
} from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';

import { Application } from './app';
import { AppModule } from './ioC/app.module';

export class NestApplication extends Application {
	#app!: INestApplication;
	protected context!: INestApplicationContext;

	private constructor() {
		super();
	}

	static create(): NestApplication {
		return new NestApplication();
	}

	protected async init(port: number): Promise<void> {
		await this.#app.listen(port);
	}

	async close(): Promise<void> {
		await this.#app.close();
	}

	protected async setupAppConfig(): Promise<void> {
		this.#app = await NestFactory.create(AppModule, {
			bufferLogs: true,
			autoFlushLogs: true,
		});

		this.context = await NestFactory.createApplicationContext(AppModule);

		this.#app.enableShutdownHooks();
	}

	protected setupMiddlewares(): void {
		this.#app.use(express.json());
		this.#app.use(
			express.urlencoded({
				extended: true,
				inflate: true,
			}),
		);
		this.#app.use(
			cors({
				origin: '*',
				credentials: true,
				methods: 'GET,PUT,PATCH,POST,DELETE',
				allowedHeaders:
					'Content-Type,Accept,Authorization,Access-Control-Allow-Origin',
			}),
		);
		this.#app.use(
			helmet({
				contentSecurityPolicy: true,
				hsts: true,
				frameguard: true,
			}),
		);
	}
}
