import { throws } from 'node:assert';
import { describe, it } from 'node:test';

import { CNPJ } from '@/enterprise/entities/value-objects/cnpj';
import { CNPJIsInvalidError } from '@/enterprise/errors/cnpj';

describe('CNPJ', () => {
	it('should throw if an invalid CNPJ is provided', () => {
		throws(() => CNPJ.create('12312312312'), new CNPJIsInvalidError());
	});
});
