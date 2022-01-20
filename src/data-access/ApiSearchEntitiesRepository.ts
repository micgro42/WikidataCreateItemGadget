import { ApiParams, ReadingApi } from './Api';
import TechnicalProblem from './errors/TechnicalProblem';
import SearchEntitiesRepository from './SearchEntityRepository';
import SearchResult from './SearchResult';

export default class ApiSearchEntitiesRepository
  implements SearchEntitiesRepository
{
  private readonly api: ReadingApi;

  public constructor(api: ReadingApi) {
    this.api = api;
  }

  searchProperties(
    searchString: string,
    limit?: number,
    offset?: number,
  ): Promise<SearchResult[]> {
    throw new Error('Method not implemented.');
  }

  async searchItems(
    searchString: string,
    limit?: number,
    offset?: number,
  ): Promise<SearchResult[]> {
    const params: ApiParams<'wbsearchentities'> = {
      action: 'wbsearchentities',
      search: searchString,
      language: 'en',
      uselang: 'en',
      type: 'item',
    };
    if (limit) {
      params.limit = `${limit}`;
    }
    if (offset) {
      params.continue = `${offset}`;
    }
    const response = await this.api.get(params); // TODO: try/catch
    // FIXME
    // @ts-ignore 
    return response.search;
  }
}
