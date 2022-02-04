import { ApiResponse } from './Api';

export interface EntitySearchResult {
  id: string;
  title: string;
  pageid: number;
  repository: string;
  url?: string;
  concepturi: string;
  label: string; // FIXME: check if optional
  description?: string;
  match: {
    type: 'alias' | 'label' | 'description' | 'entityId';
    language?: string;
    text: string;
  };
  aliases?: string[];
}

export interface ApiWbSearchEntitiesResponse extends ApiResponse {
  searchinfo: {
    search: string;
  };
  search: EntitySearchResult[];
}
