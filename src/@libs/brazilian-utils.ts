import {
	formatCNPJ,
	formatCPF,
	isValidCNPJ,
	isValidCPF,
	isValidEmail,
} from '@brazilian-utils/brazilian-utils';

export class BrazilianUtils {
	static isValidEmail(value: string): boolean {
		return isValidEmail(value);
	}

	static isValidCNPJ(value: string): boolean {
		return isValidCNPJ(formatCNPJ(value));
	}

	static isValidCPF(value: string): boolean {
		return isValidCPF(formatCPF(value));
	}
}
