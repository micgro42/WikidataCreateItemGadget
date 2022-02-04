import { ApiParams, ReadingApi } from './Api';
import SearchEntitiesRepository from './SearchEntityRepository';
import { ItemSearchResult, PropertySearchResult } from './SearchResult';

export default class ApiSearchEntitiesRepository
  implements SearchEntitiesRepository
{
  private readonly api: ReadingApi;

  public constructor(api: ReadingApi) {
    this.api = api;
  }

  searchProperties(
    _searchString: string,
    _limit?: number,
    _offset?: number,
  ): Promise<PropertySearchResult[]> {
    throw new Error('Method not implemented.');
  }

  async searchItems(
    searchString: string,
    limit?: number,
    offset?: number,
  ): Promise<ItemSearchResult[]> {
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

    return response.search;
  }
}
