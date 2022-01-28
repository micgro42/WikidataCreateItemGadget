import { Fingerprintable, StatementMap } from '@wmde/wikibase-datamodel-types';
import FetchSearchEntityRepository from './data-access/FetchSearchEntitiesRepository';
import WritingEntityRepository from './data-access/WritingEntityRepository';
import Entity from './datamodel/Entity';
import EntityRevision from './datamodel/EntityRevision';
import ServiceContainer from './ServiceContainer';

class MockWritingRepository implements WritingEntityRepository {
  saveNewEntity(
    terms: Fingerprintable,
    statements: StatementMap,
  ): Promise<EntityRevision> {
    console.log({ terms, statements });
    return Promise.resolve(new EntityRevision(new Entity('Q123', {}), 1));
  }
  saveEntity(
    entity: Entity,
    base?: EntityRevision,
    assertUser?: boolean,
  ): Promise<EntityRevision> {
    console.log(entity, base, assertUser);
    return Promise.resolve(new EntityRevision(new Entity('Q123', {}), 1));
  }
}

export default function createServices(): ServiceContainer {
  const services = new ServiceContainer();

  services.set('writingEntityRepository', new MockWritingRepository());

  services.set(
    'searchEntitiesRepository',
    new FetchSearchEntityRepository('en', 'https://www.wikidata.org/w/api.php'),
  );

  return services;
}
