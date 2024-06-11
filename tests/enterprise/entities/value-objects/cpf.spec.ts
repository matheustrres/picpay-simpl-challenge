import { throws } from 'node:assert';
import { describe, it } from 'node:test';

import { CPF } from '@/enterprise/entities/value-objects/cpf';
import { CPFIsInvalidError } from '@/enterprise/errors/cpf';

describe('CPF', () => {
	it('should throw if an invalid CPF is provided', () => {
		throws(() => CPF.create('11257245286'), new CPFIsInvalidError());
	});
});
