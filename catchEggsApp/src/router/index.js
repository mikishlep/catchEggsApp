import { createWebHistory, createRouter } from 'vue-router';

import Cabinet from '../pages/Cabinet/Cabinet.vue';
import MainMenu from '../pages/MainMenu/MainMenu.vue';
import PersonalCabinet from "@/pages/Cabinet/PersonalCabinet.vue";

// Чилдрены кабинета
const Promocodes = () => import('../pages/Cabinet/Promocodes.vue');
const Settings = () => import('../pages/Cabinet/Settings.vue')

const routes = [
    { path: '/', component: MainMenu },
    { path: '/cabinet', component: Cabinet,
      children: [
          { path: '', component: PersonalCabinet },
          { path: 'promocodes', component: Promocodes },
          { path: 'settings', component: Settings},
      ]
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;