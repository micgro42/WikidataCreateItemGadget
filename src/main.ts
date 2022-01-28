// @ts-ignore configureCompat is only available in the vue on-wiki
import { createApp, markRaw, configureCompat } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia';
import createServices from './createServices';
import MwWindow from './@types/MwWindow';
import { useCreateItemStore } from './store/createItemStore';

type wikiConfig = {
  instanceOfProperty: string;
  subclassOfProperty: string;
};

configureCompat({
  MODE: 3,
});
// @ts-ignore
window.zvpunryCreateItemApp = (
  mountSelector = '#app',
  closeWithNewItem: (itemId: string) => void,
  cancelAndClose: () => void,
  config: wikiConfig,
  initialInput: string,
) => {
  const services = createServices(window as unknown as MwWindow); // TODO: type this better
  const app = createApp(App);
  const pinia = createPinia();
  pinia.use(storeServices);
  app.use(pinia);

  const store = useCreateItemStore(pinia);
  store.labelValue = initialInput;
  if (config) {
    store.wikiConfig = {
      ...store.wikiConfig,
      ...config,
    };
  }

  function storeServices() {
    return {
      writingEntityRepo: markRaw(services.get('writingEntityRepository')),
      searchEntitiesRepo: markRaw(services.get('searchEntitiesRepository')),
      closeWithNewItem,
      cancelAndClose,
    };
  }

  console.log('before mount');
  app.mount(mountSelector);
  console.log('after mount');
};
