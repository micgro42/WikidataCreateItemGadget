import SearchResult from './SearchResult';

/**
 * Repository to search for entities.
 * The language will be defined in the constructor as will be further options
 */
export default interface SearchEntitiesRepository {
  searchProperties(
    searchString: string,
    limit?: number,
    offset?: number,
  ): Promise<SearchResult[]>;
  searchItems(
    searchString: string,
    limit?: number,
    offset?: number,
  ): Promise<SearchResult[]>;
}
