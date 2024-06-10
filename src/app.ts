export abstract class Application {
	async start(port: number): Promise<void> {
		await this.#setupAppConfigs();
		this.setupMiddlewares();
		await this.init(port);
	}

	async #setupAppConfigs() {
		await this.setupAppConfig();
	}

	protected abstract setupAppConfig(): Promise<void>;
	protected abstract setupMiddlewares(): void;

	protected abstract init(port: number): Promise<void>;
	abstract close(): Promise<void>;
}
