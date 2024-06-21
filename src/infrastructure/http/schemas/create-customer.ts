import z from 'zod';

import { ZodValidationPipe } from '@/infrastructure/http/pipes/zod-validation';

const createCustomerSchema = z.object({
	cpf: z.string().toUpperCase(),
	email: z.string().email(),
	fullName: z.string(),
	password: z.string(),
});

export const CreateCustomerBodyPipe = new ZodValidationPipe(
	createCustomerSchema,
);

export type CreateCustomerBodySchema = z.infer<typeof createCustomerSchema>;
