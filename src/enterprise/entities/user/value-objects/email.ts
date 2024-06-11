import { BrazilianUtils } from '@/@libs/brazilian-utils';

import { ValueObject } from '@/@core/enterprise/value-object';

import { EmailIsInvalidError } from '@/enterprise/errors/email';

export type EmailProps = {
	value: string;
};

export class Email extends ValueObject<EmailProps> {
	private constructor(value: string) {
		super({ value });
	}

	static create(value: string): Email {
		this.#validate(value);

		return new Email(value);
	}

	static #validate(value: string): void {
		if (!this.#isValid(value)) {
			throw new EmailIsInvalidError();
		}
	}

	static #isValid(value: string): boolean {
		return BrazilianUtils.isValidEmail(value);
	}
}
