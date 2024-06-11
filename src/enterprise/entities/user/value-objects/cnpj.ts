import { BrazilianUtils } from '@/@libs/brazilian-utils';
import { clearString } from '@/utils/funcs/clear-string';

import { ValueObject } from '@/@core/enterprise/value-object';

import { CNPJIsInvalidError } from '@/enterprise/errors/cnpj';

type CNPJProps = {
	value: string;
};

export class CNPJ extends ValueObject<CNPJProps> {
	private constructor(value: string) {
		super({ value });
	}

	static create(value: string): CNPJ {
		this.#validate(value);

		return new CNPJ(clearString(value));
	}

	static #validate(value: string): void {
		if (!this.#isValid(value)) {
			throw new CNPJIsInvalidError();
		}
	}

	static #isValid(value: string): boolean {
		return BrazilianUtils.isValidCNPJ(value);
	}
}
