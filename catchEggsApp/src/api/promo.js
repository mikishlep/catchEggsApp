import { api } from "@/api/ApiClient.js";

export function getPromoList() {
    return api.get("/promoList");
}