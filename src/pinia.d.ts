import 'pinia';
import WritingEntityRepository from './data-access/WritingEntityRepository';
import SearchEntitiesRepository from './data-access/SearchEntityRepository';

declare module 'pinia' {
  export interface PiniaCustomProperties {
    writingEntityRepo: WritingEntityRepository;
    searchEntitiesRepo: SearchEntitiesRepository;
    closeWithNewItem: (itemId: string) => void;
    cancelAndClose: () => void;
  }
}
