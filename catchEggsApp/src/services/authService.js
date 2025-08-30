import { useUserStore } from "@/stores/user.js";
import { AuthAPI } from "@/api";

export async function autoRegister() {
    const userStore = useUserStore();

    userStore.loadUser();

    if (!userStore.initData) {
        console.error('Нет initData от Telegram!');
        return;
    }

    try {
        const res = await AuthAPI.register(userStore.initData);
        console.log("Успешная регистрация: ", res.data);

        const { userData, tokenUser, provideData } = res.data;

        localStorage.setItem("token", tokenUser.access_token);
        localStorage.setItem("refreshToken", tokenUser.refresh_token || "");

        userStore.setUserData(userData, provideData);
    } catch (err) {
        console.error("Ошибка регистрации:", err.response?.data || err.message);
    }
}