import { BrazilianUtils } from '@/@libs/brazilian-utils';

import { ValueObject } from '@/@core/enterprise/value-object';

import { CPFIsInvalidError } from '@/enterprise/errors/cpf';

import { clearString } from '@/utils/funcs/clear-string';

type CPFProps = {
	value: string;
};

export class CPF extends ValueObject<CPFProps> {
	private constructor(value: string) {
		super({ value });
	}

	static create(value: string): CPF {
		this.#validate(value);

		return new CPF(clearString(value));
	}

	static #validate(value: string): void {
		if (!this.#isValid(value)) {
			throw new CPFIsInvalidError();
		}
	}

	static #isValid(value: string): boolean {
		return BrazilianUtils.isValidCPF(value);
	}
}
