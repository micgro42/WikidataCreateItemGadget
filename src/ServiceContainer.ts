import SearchEntitiesRepository from './data-access/SearchEntityRepository';
import WritingEntityRepository from './data-access/WritingEntityRepository';

export interface Services {
  writingEntityRepository: WritingEntityRepository;
  searchEntitiesRepository: SearchEntitiesRepository;
}

export default class ServiceContainer {
  private readonly services: Partial<Services> = {};

  public set<K extends keyof Services>(key: K, service: Services[K]): void {
    this.services[key] = service;
  }

  public get<K extends keyof Services>(key: K): Services[K] {
    if (this.services[key] === undefined) {
      throw new Error(`${key} is undefined`);
    }

    return this.services[key] as Services[K];
  }
}
