import { defineStore } from 'pinia';
import FetchSearchEntityRepository from '../data-access/FetchSearchEntitiesRepository';
import { ItemSearchResult } from '../data-access/SearchResult';
import { MenuOption } from '@wikimedia/codex/packages/vue-components';

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
    ontologyPropertyId: 'P31' as string, // TODO: set from config!
    ontologyItemId: null as string | null,
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
    async searchInstanceOfOptions(searchText: string) {
      if (!searchText) {
        return [];
      }
      const repo = new FetchSearchEntityRepository(
        'en',
        'https://www.wikidata.org/w/api.php',
      );
      // this.instanceOfOptions = await repo.searchItems(searchText);
      this.instanceOfOptions = await this.searchEntitiesRepo.searchItems(
        searchText,
      );
      console.log(this.instanceOfOptions[0]);
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
        // @ts-ignore
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
                    'numeric-id': parseInt(this.ontologyItemId!.slice(1)), // FIXME: proper validation!
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
