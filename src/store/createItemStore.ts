import { defineStore } from 'pinia';
import { ItemSearchResult } from '../data-access/SearchResult';
import { MenuOption } from '@wikimedia/codex';

interface ItemMenuOption extends MenuOption {
  match: {
    type: string;
    language?: string;
    text: string;
  };
}

export const useCreateItemStore = defineStore('createItemStore', {
  state: () => ({
    labelValue: '',
    descriptionValue: '',
    aliases: [] as string[],
    ontologyPropertyId: '' as string,
    ontologyItemId: null as string | null,
    ontologySearch: '' as string,
    instanceOfOptions: [] as ItemSearchResult[],
    wikiConfig: {
      instanceOfProperty: 'P31',
      subclassOfProperty: 'P265',
    },
  }),
  getters: {
    instanceOfMenuOptions(state): ItemMenuOption[] {
      return state.instanceOfOptions.map(
        (option: ItemSearchResult): ItemMenuOption => {
          return {
            value: option.id,
            label: option.label,
            description: option.description,
            match: option.match,
          };
        },
      );
    },
  },
  actions: {
    async searchInstanceOfOptions(searchText: string): Promise<void> {
      if (!searchText) {
        this.instanceOfOptions = [];
        return;
      }

      this.instanceOfOptions = await this.searchEntitiesRepo.searchItems(
        searchText,
      );
      console.log(this.instanceOfOptions[0]);
    },
    async searchMoreOptions() {
      const nextBatchOfOptions = await this.searchEntitiesRepo.searchItems(
        this.ontologySearch,
        undefined,
        this.instanceOfOptions.length,
      );
      this.instanceOfOptions.push(...nextBatchOfOptions);
    },
    cancel() {
      this.cancelAndClose();
    },
    async submitForm() {
      // TODO: add validation!
      console.log('form submitted!');
      console.log('label', this.labelValue);
      console.log('description', this.descriptionValue);
      console.log('aliases', this.aliases);
      console.log('ontologyPropertyId', this.ontologyPropertyId);
      console.log('ontologyItemId', this.ontologyItemId);

      if (!this.ontologyItemId) {
        // FIXME: proper validation!
        throw new Error('ontologyItemId is not set!');
      }

      const entityRevision = await this.writingEntityRepo.saveNewEntity(
        {
          labels: { en: { language: 'en', value: this.labelValue } },
          descriptions: {
            en: { language: 'en', value: this.descriptionValue },
          },
          aliases: this.aliases.length
            ? {
                en: this.aliases.map((alias) => ({
                  language: 'en',
                  value: alias,
                })),
              }
            : {},
        },
        /* eslint-disable @typescript-eslint/ban-ts-comment */
        // @ts-ignore -- need to extend Snak and DataType type definitions with `wikibase-item`. Tracked in #6
        {
          [this.ontologyPropertyId]: [
            {
              mainsnak: {
                snaktype: 'value',
                property: this.ontologyPropertyId,
                datatype: 'wikibase-item',
                datavalue: {
                  value: {
                    'entity-type': 'item',
                    'numeric-id': parseInt(this.ontologyItemId.slice(1)),
                    id: this.ontologyItemId,
                  },
                  type: 'wikibase-entityid',
                },
              },
              rank: 'normal',
              type: 'statement',
            },
          ],
        },
      );
      this.closeWithNewItem(entityRevision.entity.id);
    },
  },
});
