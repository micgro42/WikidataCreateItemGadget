import { createApp } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia';
import createMockServices from './createMockServices';

const services = createMockServices();
const app = createApp(App);
app.use(createPinia());

console.log('before mount');
app.mount('#app');
