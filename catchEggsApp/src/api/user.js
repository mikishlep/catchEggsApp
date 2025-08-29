import { api } from "@/api/ApiClient.js";

export function getUserProfile() {
    return api.get("/user");
}

export function getUserScore() {
    return api.get("/user/score");
}

export function updateUserScore(amount) {
    return api.put("/user/score", { amount });
}