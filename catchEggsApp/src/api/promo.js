import { api } from "@/api/ApiClient.js";

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