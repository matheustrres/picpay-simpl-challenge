import { EntityId } from '@/@core/enterprise/entity-id';

import { genTimestampNumericId } from '@/shared/utils/funcs/random-timestamp-id';

export class WalletdId extends EntityId {
	constructor(value = genTimestampNumericId()) {
		super(value);
	}
}
