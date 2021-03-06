import SearchEntitiesRepository from './SearchEntityRepository';
import { ItemSearchResult, PropertySearchResult } from './SearchResult';
import TechnicalProblem from './errors/TechnicalProblem';

export default class FetchSearchEntityRepository
  implements SearchEntitiesRepository
{
  private readonly forLanguageCode: string;
  private readonly endpoint: string;

  public constructor(languageCode: string, endpoint: string) {
    this.forLanguageCode = languageCode;
    this.endpoint = endpoint;
  }

  private async searchEntities(
    searchString: string,
    entityType: string,
    limit?: number,
    offset?: number,
  ): Promise<PropertySearchResult[] | ItemSearchResult[]> {
    if (!searchString) {
      throw new Error('The parameter searchString must not be empty!');
    }
    const params: { [key: string]: string } = {
      action: 'wbsearchentities',
      search: searchString,
      language: this.forLanguageCode,
      uselang: this.forLanguageCode,
      type: entityType,
      format: 'json',
      formatversion: '2',
      errorformat: 'plaintext',
      origin: '*',
    };
    if (limit) {
      params.limit = `${limit}`;
    }
    if (offset) {
      params.continue = `${offset}`;
    }

    const url = new URL(this.endpoint);
    for (const key in params) {
      url.searchParams.set(key, params[key]);
    }
    let response: Response;
    try {
      response = await fetch(url.toString());
    } catch (e) {
      throw new TechnicalProblem('Network error');
    }

    if (!response.ok) {
      throw new TechnicalProblem(`${response.status}: ${response.statusText}`);
    }

    const data = await response.json();

    return data.search;
  }

  public searchProperties(
    searchString: string,
    limit?: number,
    offset?: number,
  ): Promise<PropertySearchResult[]> {
    return this.searchEntities(
      searchString,
      'property',
      limit,
      offset,
    ) as Promise<PropertySearchResult[]>;
  }

  public searchItems(
    searchString: string,
    limit?: number,
    offset?: number,
  ): Promise<ItemSearchResult[]> {
    return this.searchEntities(searchString, 'item', limit, offset);
  }
}
