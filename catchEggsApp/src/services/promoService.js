import { PromoAPI } from "@/api";
import { useUserStore } from "@/stores/user.js";

export async function loadUserCoupons() {
    const userStore = useUserStore();

    const userId = userStore.user?.userId; // берем уже после autoRegister()

    if (!userId) {
        console.error("Нет userId для загрузки купонов!");
        return;
    }

    try {
        const res = await PromoAPI.getCouponsByUserId(userId);
        console.log("Купоны юзера: ", res.data);
        return res.data;
    } catch (err) {
        console.error("Ошибка при получении купонов:", err.response?.data || err.message);
    }
}

export async function createCoupon() {
    const userStore = useUserStore();

    const userId = localStorage.getItem("userId") || userStore.user?.userId;

    if (!userId) {
        console.error("Нет userId для создания купона!");
        return;
    }

    try {
        const res = await PromoAPI.createCouponApi(userId);
        console.log("Купон создан: ", res.data);
        return res.data;
    } catch (e) {
        console.error("Ошибка при создании купона:", e.response?.data || e.message);
    }
}