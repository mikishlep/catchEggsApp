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