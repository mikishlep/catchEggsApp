import router from "@/router/index.js";

export function initBackButton(onBack) {
    if (!window.Telegram?.WebApp) {
        console.warn("Telegram WebApp не найден");
        return;
    }

    const backButton = window.Telegram.WebApp.BackButton;
    backButton.show();

    backButton.onClick(() => {
        if (typeof onBack === "function") {
            onBack();
        } else if (router) {
            router.back();
        } else {
            console.warn("onBack не передан и router не найден");
        }
    });
}

export function hideBackButton() {
    if (!window.Telegram?.WebApp) return;
    window.Telegram.WebApp.BackButton.hide();
}