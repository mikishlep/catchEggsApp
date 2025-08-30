import { createApp } from 'vue';
import router from './router';
import { createPinia } from 'pinia';
import './style.css';
import App from './App.vue';
import { autoRegister } from "@/services/authService.js";

async function bootstrap() {
    const app = createApp(App);

    const pinia = createPinia();
    app.use(pinia);
    app.use(router);

    await autoRegister();

    app.mount('#app');
}

bootstrap();