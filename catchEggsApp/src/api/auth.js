import { api } from "@/api/ApiClient.js";

export function login(data) {
    return api.post("/login", data);
}

export function register(data) {
    return api.post("/register", data);
}

export function tgLogin(initData) {
    return api.post("/login", { initData });
}