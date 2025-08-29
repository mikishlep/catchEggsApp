import axios from "axios";

class ApiClient {
    constructor(baseURL) {
        this.client = axios.create({
            baseURL,
        });

        this.client.interceptors.request.use((config) => {
            const token = localStorage.getItem("token");

            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        });
    }

    get(url, params) {
        return this.client.get(url, { params });
    }

    post(url, data) {
        return this.client.post(url, data);
    }

    put(url, data) {
        return this.client.put(url, data);
    }

    delete(url) {
        return this.client.delete(url);
    }
}

export const api = new ApiClient("БУДУЩИЙ АПИ ЮРЛ");