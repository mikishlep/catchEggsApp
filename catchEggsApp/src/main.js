import { createApp } from 'vue';
import router from './router';
import { createPinia } from 'pinia';
import './style.css';
import App from './App.vue';
import { autoRegister } from "@/services/authService.js";
import { loadUserCoupons } from "@/services/promoService.js";
import { useUserStore } from "@/stores/user.js";

async function bootstrap() {
    const app = createApp(App);

    const pinia = createPinia();
    app.use(pinia);
    app.use(router);

    await autoRegister();

    const userStore = useUserStore();
    const coupons = await loadUserCoupons();
    userStore.setCoupons(coupons);

    console.log(userStore)

    app.mount('#app');
}

bootstrap();