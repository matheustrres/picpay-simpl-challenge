import { type Entity } from '../entity';
import { type EntityId } from '../entity-id';

export interface Mapper<
	DomainEntity extends Entity<EntityId, unknown>,
	Model extends object,
> {
	toDomain(model: Model): DomainEntity;
	toInfra(domainEntity: DomainEntity): Model;
}
