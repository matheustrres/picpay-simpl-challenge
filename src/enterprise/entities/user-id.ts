import { randomUUID } from 'node:crypto';

import { EntityId } from '@/@core/enterprise/entity-id';

export class UserId extends EntityId {
	constructor(value?: string) {
		const id = value ?? randomUUID();

		super(id);
	}
}
