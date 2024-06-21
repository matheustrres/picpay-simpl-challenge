import z from 'zod';

import { ZodValidationPipe } from '@/infrastructure/http/pipes/zod-validation';

const cpfRegex = /^(?:\d{3}\.\d{3}\.\d{3}-\d{2}|\d{11})$/;
const cnpjRegex = /^(?:\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}|\d{14})$/;

const createShopkeeperSchema = z.object({
	cpf: z
		.string()
		.regex(
			cpfRegex,
			'Invalid CPF format, use "XXX.XXX.XXX-XX" or "XXXXXXXXXXX".',
		),
	cnpj: z
		.string()
		.regex(
			cnpjRegex,
			'Invalid CNPJ format, use "XX.XXX.XXX/XXXX-XX" or "XXXXXXXXXXXXXX".',
		),
	email: z.string().email(),
	fullName: z.string(),
	password: z.string(),
});

export const CreateShopkeeperBodyPipe = new ZodValidationPipe(
	createShopkeeperSchema,
);

export type CreateShopkeeperBodySchema = z.infer<typeof createShopkeeperSchema>;
