import { StatementMap, Fingerprintable } from '@wmde/wikibase-datamodel-types';
import WritingEntityRepository from './WritingEntityRepository';
import EntityRevision from '../datamodel/EntityRevision';
import Entity from '../datamodel/Entity';
import { ApiParams, WritingApi } from './Api';
import ApiErrors from './errors/ApiErrors';
import SavingError from './errors/SavingError';

interface ApiResponseEntity {
  id: string;
  claims: StatementMap;
  lastrevid: number;
}

interface ResponseSuccess {
  success: number;
  entity: ApiResponseEntity;
}

export default class ApiWritingRepository implements WritingEntityRepository {
  private api: WritingApi;
  private tags?: readonly string[];

  public constructor(api: WritingApi, tags?: readonly string[]) {
    this.api = api;
    this.tags = tags || undefined;
  }

  public saveNewEntity(
    terms: Fingerprintable,
    statements: StatementMap,
  ): Promise<EntityRevision> {
    const params = {
      action: 'wbeditentity',
      data: JSON.stringify({
        ...terms,
        claims: statements,
      }),
      tags: this.tags,
    };

    return this.storeEntity(params, true);
  }

  public saveEntity(
    entity: Entity,
    base?: EntityRevision,
    assertUser = true,
  ): Promise<EntityRevision> {
    const params = {
      action: 'wbeditentity',
      id: entity.id,
      baserevid: base?.revisionId,
      data: JSON.stringify({
        claims: entity.statements,
      }),
      tags: this.tags,
    };

    return this.storeEntity(params, assertUser);
  }

  private storeEntity(
    params: ApiParams<string>,
    assertUser = true,
  ): Promise<EntityRevision> {
    let promise;

    if (assertUser) {
      promise = this.api.postWithEditTokenAndAssertUser(params);
    } else {
      promise = this.api.postWithEditToken(params);
    }
    return promise.then(
      (response: unknown): EntityRevision => {
        return new EntityRevision(
          new Entity(
            (response as ResponseSuccess).entity.id,
            (response as ResponseSuccess).entity.claims,
          ),
          (response as ResponseSuccess).entity.lastrevid,
        );
      },
      (error: Error): never => {
        if (!(error instanceof ApiErrors)) {
          throw error;
        }

        throw new SavingError(
          error.errors.map((apiError): { type: string; info: unknown } => {
            switch (apiError.code) {
              case 'assertuserfailed':
                return { type: 'assert_user_failed', info: apiError };
              default:
                return { type: 'saving_failed', info: apiError };
            }
          }),
        );
      },
    );
  }
}
