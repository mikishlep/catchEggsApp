import { defineStore } from 'pinia';
import { getUserData, getRawData, getInitData } from "@/utils/telegramApi/getTelegramData.js";

export const useUserStore = defineStore('user', {
    state: () => ({
        user: {}, // тут чисто сам юзер
        raw: null, // если что тут будет хранение всего initDataUnsafe в сыром виде
        initData: null,
        providerData: null,
        coupons: [],
        glavbirdScore: 0, // счет из игры главптица
    }),
    getters: {
        // геттер для получения текущего счета
        getCurrentScore: (state) => {
            const localScore = parseInt(localStorage.getItem('glavbirdScore') || '0');
            return Math.max(state.glavbirdScore, localScore);
        }
    },
    actions: {
        loadUser() {
            this.user = getUserData();
            this.raw = getRawData();
            this.initData = getInitData();
            this.loadGlavbirdScore();
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
        },
        loadGlavbirdScore() {
            this.glavbirdScore = parseInt(localStorage.getItem('glavbirdScore') || '0');
        },
        addGlavbirdScore(points) {
            this.glavbirdScore += points;
            localStorage.setItem('glavbirdScore', this.glavbirdScore.toString());
        },
        setGlavbirdScore(score) {
            this.glavbirdScore = score;
            localStorage.setItem('glavbirdScore', score.toString());
        }
    }
})