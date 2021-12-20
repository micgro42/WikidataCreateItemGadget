import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'

// @ts-ignore
window.zvpunryCreateItemApp = ( mountSelector ) => {

    const app = createApp(App);
    app.use(createPinia());

    app.mount(mountSelector);

}
