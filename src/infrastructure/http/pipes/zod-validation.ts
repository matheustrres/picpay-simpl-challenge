import {
	type ArgumentMetadata,
	Injectable,
	type PipeTransform,
} from '@nestjs/common';
import { type SafeParseReturnType, type ZodSchema } from 'zod';

@Injectable()
export class ZodValidationPipe implements PipeTransform {
	constructor(private readonly schema: ZodSchema) {}

	transform(
		value: unknown,
		_metadata: ArgumentMetadata,
	): SafeParseReturnType<unknown, unknown> {
		return this.schema.parse(value);
	}
}
