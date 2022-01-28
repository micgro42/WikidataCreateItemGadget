export interface ItemSearchResult {
  id: string;
  label: string;
  description?: string;
  match: {
    type: string;
    language?: string;
    text: string;
  };
}

export interface PropertySearchResult {
  id: string;
  label: string;
  description?: string;
  match: {
    type: string;
    language?: string;
    text: string;
  };
  datatype: string;
}
