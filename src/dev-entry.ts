import { createApp, markRaw } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia';
import createMockServices from './createMockServices';

const services = createMockServices();
const app = createApp(App);
const pinia = createPinia();
pinia.use(storeServices);
app.use(pinia);

function storeServices() {
  return {
    writingEntityRepo: markRaw(services.get('writingEntityRepository')),
    searchEntitiesRepo: markRaw(services.get('searchEntitiesRepository')),
    closeWithNewItem: (newItemId: string) => {
      console.log('closing with new itemId: ', newItemId);
    },
    cancelAndClose: () => {
      console.log('cancelling and closing');
    },
  };
}

console.log('before mount');
app.mount('#app');
