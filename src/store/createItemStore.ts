import { defineStore } from 'pinia';
import FetchSearchEntityRepository from '../data-access/FetchSearchEntitiesRepository';
import SearchResult from '../data-access/SearchResult';
import { MenuOption } from '@wikimedia/codex/packages/vue-components';

export const useCreateItemStore = defineStore('createItemStore', {
  state: () => ({
    labelValue: '',
    descriptionValue: '',
    aliases: [] as string[],
    ontologyPropertyId: 'P31' as string, // TODO: set from config!
    ontologyItemId: null as string | null,
    instanceOfOptions: [] as SearchResult[],
    wikiConfig: {
      instanceOfProperty: 'P31',
      subclassOfProperty: 'P265',
    },
  }),
  getters: {
    instanceOfMenuOptions(state): MenuOption[] {
      return state.instanceOfOptions.map((option: SearchResult): MenuOption => {
        return {
          value: option.id,
          label: option.label,
          description: option.description,
        };
      });
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
        {},
      );
      this.closeWithNewItem(entityRevision.entity.id);
    },
  },
});
