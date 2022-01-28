import { Fingerprintable, StatementMap } from '@wmde/wikibase-datamodel-types';
import Entity from '../datamodel/Entity';
import EntityRevision from '../datamodel/EntityRevision';

interface WritingEntityRepository {
  saveNewEntity(
    terms: Fingerprintable,
    statements: StatementMap,
  ): Promise<EntityRevision>;

  /**
   * Rejects to TechnicalProblem or EntityNotFound errors in case of problems
   * @param assertUser Flag to determine if to do assert user when saving. Defaults to true
   */
  saveEntity(
    entity: Entity,
    base?: EntityRevision,
    assertUser?: boolean,
  ): Promise<EntityRevision>;
}
export default WritingEntityRepository;
