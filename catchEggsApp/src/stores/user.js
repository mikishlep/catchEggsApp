import { defineStore } from 'pinia';
import { getUserData, getRawData, getInitData } from "@/utils/telegramApi/getTelegramData.js";

export const useUserStore = defineStore('user', {
    state: () => ({
        user: null, // тут чисто сам юзер
        raw: null, // если что тут будет хранение всего initDataUnsafe в сыром виде
        initData: null,
        providerData: null,
    }),
    actions: {
        loadUser() {
            this.user = getUserData();
            this.raw = getRawData();
            this.initData = getInitData();
        },
        setUserData(userData, providerData) {
            this.user = userData;
            this.providerData = providerData;
        }
    }
})