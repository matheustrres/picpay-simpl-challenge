import { type EntityId } from '@/@core/enterprise/entity-id';
import { type IDomainEvent } from '@/@core/enterprise/events/domain-event';

import { type User } from '@/enterprise/entities/user';

export class UserCreatedEvent implements IDomainEvent {
	name = UserCreatedEvent.name.toLowerCase();
	occurredAt = new Date();

	constructor(readonly user: User) {}

	getAggregateId(): EntityId {
		return this.user.id;
	}
}
