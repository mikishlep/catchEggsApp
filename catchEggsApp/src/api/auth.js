import { api } from "@/api/ApiClient.js";
import qs from "qs";

export function login(data) {
    return api.post("/login", data);
}

export function register(initData) {
    const data = qs.stringify({
        payload: initData
    });

    return api.post("/auth/register_provider?oauth_client=telegram-app", data, {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    });
}