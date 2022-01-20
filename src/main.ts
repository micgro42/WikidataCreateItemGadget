import { createApp } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia';
import createServices from './createServices';
import MwWindow from './@types/MwWindow';

// @ts-ignore
window.zvpunryCreateItemApp = (mountSelector = '#app') => {
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
      writingEntityRepo: services.get('writingEntityRepository'),
      searchEntitiesRepo: services.get('searchEntitiesRepository'),
    };
  }

  console.log('before mount');
  app.mount(mountSelector);
  console.log('after mount');
};
