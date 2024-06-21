import { randomInt } from 'node:crypto';

import { EntityId } from '@/@core/enterprise/entity-id';

/**
 * @todo
 *
 * Improve way of generating sequential integer ids
 */
export class WalletdId extends EntityId {
	constructor(value = randomInt(999_999)) {
		super(value);
	}
}
