import { createApp, markRaw, configureCompat } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia';
import createServices from './createServices';
import MwWindow from './@types/MwWindow';

configureCompat({
  MODE: 3,
});
// @ts-ignore
window.zvpunryCreateItemApp = (
  mountSelector = '#app',
  closeWithNewItem: (itemId: string) => void,
  cancelAndClose: () => void,
) => {
  /**
   * config: indexOfPid subclassOfPid
   */

  const services = createServices(window as unknown as MwWindow); // TODO: type this better
  const app = createApp(App);
  const pinia = createPinia();
  pinia.use(storeServices);
  app.use(pinia);

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
