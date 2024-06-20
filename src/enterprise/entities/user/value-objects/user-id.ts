import { ulid } from 'ulid';

import { EntityId } from '@/@core/enterprise/entity-id';

export class UserId extends EntityId {
	constructor(value?: string) {
		const id = value ?? ulid(Date.now());

		super(id);
	}
}
