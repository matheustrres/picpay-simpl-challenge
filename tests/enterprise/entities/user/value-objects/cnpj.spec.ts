import { deepStrictEqual, throws } from 'node:assert';
import { describe, it } from 'node:test';

import { clearString } from '@/utils/funcs/clear-string';

import { CNPJ } from '@/enterprise/entities/user/value-objects/cnpj';
import { CNPJIsInvalidError } from '@/enterprise/errors/cnpj';

describe('CNPJ', () => {
	it('should throw if an invalid CNPJ is provided', () => {
		throws(() => CNPJ.create('12312312312'), new CNPJIsInvalidError());
	});

	it('should create a valid CNPJ', () => {
		const data = '06.108.507/0001-40';
		const cnpj = CNPJ.create(data);

		deepStrictEqual(cnpj.props.value, clearString(data));
	});
});
