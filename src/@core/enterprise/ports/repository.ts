import { type Entity } from '../entity';
import { type EntityId } from '../entity-id';

export interface Repository<DomainEntity extends Entity<EntityId, unknown>> {
	delete(id: string): Promise<void>;
	findById(id: string): Promise<DomainEntity | null>;
	find(): Promise<DomainEntity[]>;
	upsert(DomainEntity: DomainEntity): Promise<void>;
}
