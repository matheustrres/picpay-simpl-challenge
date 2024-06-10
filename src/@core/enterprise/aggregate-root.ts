import { type EntityId } from './entity-id';

import { Entity } from '@/@core/enterprise/entity';
import { type IDomainEvent } from '@/@core/enterprise/events/domain-event';
import { DomainEvents } from '@/@core/enterprise/events/domain-events';

export class AggregateRoot<T> extends Entity<EntityId, T> {
	#domainEvents: IDomainEvent[] = [];

	protected validate(): void {}

	get domainEvents() {
		return this.#domainEvents;
	}

	protected addDomainEvent(event: IDomainEvent) {
		this.#domainEvents.push(event);
		DomainEvents.markAggregateForDispatch(this);
	}

	clearEvents() {
		this.#domainEvents = [];
	}
}
