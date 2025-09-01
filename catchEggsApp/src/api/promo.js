import { api } from "@/api/ApiClient.js";
import qs from "qs";

export function getCouponsByUserId(userId) {
    if (!userId) throw new Error("userId пустой!");

    return api.post(
        `/coupon/get_by_user_id?user_id=${userId}`,
        '',
        {
            headers: {
                'Accept': 'application/json',
            }
        }
    );
}

export function createCouponApi(userId) {
    if (!userId) throw new Error("userId пустой!");

    const data = qs.stringify({
        name: "Купон",
        description: "дима питух",
        user_id: userId,
    });

    return api.post(
        `/coupon/create_coupon?name=Промокод&description=дима%20питух&user_id=${userId}`,
        '',
        { headers: { 'Accept': 'application/json' } }
    );
}