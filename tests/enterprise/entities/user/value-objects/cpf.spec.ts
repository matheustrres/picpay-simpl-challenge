import { deepStrictEqual, throws } from 'node:assert';
import { describe, it } from 'node:test';

import { CPF } from '@/enterprise/entities/user/value-objects/cpf';
import { CPFIsInvalidError } from '@/enterprise/errors/cpf';

import { clearString } from '@/shared/utils/funcs/clear-string';

describe('CPF', () => {
	it('should throw if an invalid CPF is provided', () => {
		throws(() => CPF.create('11257245286'), new CPFIsInvalidError());
	});

	it('should create a valid CPF', () => {
		const data = '298.942.410-50';
		const cpf = CPF.create(data);

		deepStrictEqual(cpf.props.value, clearString(data));
	});
});
