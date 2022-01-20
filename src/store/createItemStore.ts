import { defineStore } from 'pinia';
import FetchSearchEntityRepository from '../data-access/FetchSearchEntitiesRepository';
import SearchResult from '../data-access/SearchResult';
import { MenuOption } from 'vue-components/src/types';

export const useCreateItemStore = defineStore('createItemStore', {
  state: () => ({
    labelValue: '',
    descriptionValue: '',
    aliases: [] as string[],
    ontologyPropertyId: 'P31' as string, // TODO: set from config!
    ontologyItemId: null as string | null,
    instanceOfOptions: [] as SearchResult[],
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
      this.instanceOfOptions = await repo.searchItemValues(searchText);
      console.log(this.instanceOfOptions[0]);
    },
    submitForm() {
      // TODO: add validation!
      console.log(
        this.labelValue,
        this.descriptionValue,
        this.aliases,
        this.ontologyPropertyId,
        this.ontologyItemId,
      );
    },
  },
} );
