import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
    state: () => ({
        token: null,
        username: '',
        isLoggedIn: false
    }),
    actions: {
        setUser(data) {
            this.token = data.token;
            this.username = data.username;
            this.isLoggedIn = true;
        },
        logout() {
            this.token = null;
            this.username = '';
            this.isLoggedIn = false;
        }
    }
});