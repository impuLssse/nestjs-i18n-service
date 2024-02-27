import { DataSource, EntityTarget, ObjectLiteral, Repository } from 'typeorm';

export interface IBaseRepository<Entity> extends Repository<Entity> {}

export abstract class BaseRepository<Entity extends ObjectLiteral>
  extends Repository<Entity>
  implements IBaseRepository<Entity>
{
  constructor(entity: EntityTarget<Entity>, dataSource: DataSource) {
    super(entity, dataSource.createEntityManager());
  }
}
