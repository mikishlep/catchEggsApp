import { defineStore } from 'pinia';
import { getUserData, getRawData, getInitData } from "@/utils/telegramApi/getTelegramData.js";

export const useUserStore = defineStore('user', {
    state: () => ({
        user: {}, // тут чисто сам юзер
        raw: null, // если что тут будет хранение всего initDataUnsafe в сыром виде
        initData: null,
        providerData: null,
        coupons: [],
    }),
    actions: {
        loadUser() {
            this.user = getUserData();
            this.raw = getRawData();
            this.initData = getInitData();
        },
        setUserData(userData, providerData) {
            this.user = {
                ...this.user,
                ...userData,
                userId: userData.idUser ?? null,
            };
            this.providerData = providerData ?? {};
        },
        setCoupons(coupons) {
            this.coupons = coupons;
        }
    }
})