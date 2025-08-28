import { defineStore } from 'pinia';
import { getUserData, getRawData } from "@/utils/telegramApi/getTelegramData.js";

// export const useUserStore = defineStore('user', {
//     state: () => ({
//         token: null,
//         username: '',
//         isLoggedIn: false
//     }),
//     actions: {
//         setUser(data) {
//             this.token = data.token;
//             this.username = data.username;
//             this.isLoggedIn = true;
//         },
//         logout() {
//             this.token = null;
//             this.username = '';
//             this.isLoggedIn = false;
//         }
//     }
// });

export const useUserStore = defineStore('user', {
    state: () => ({
        user: null, // тут чисто сам юзер
        raw: null, // если что тут будет хранение всего initDataUnsafe в сыром виде
    }),
    actions: {
        loadUser() {
            this.user = getUserData();
            this.raw = getRawData();
        }
    }
})