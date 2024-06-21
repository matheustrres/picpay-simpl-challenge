export abstract class BaseController {
	abstract handle(...args: any[]): Promise<unknown>;
}
