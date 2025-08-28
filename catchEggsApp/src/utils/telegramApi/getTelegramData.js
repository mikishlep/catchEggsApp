export function getUserData() {
    const tg = window.Telegram.WebApp;

    if (!tg.initDataUnsafe || !tg.initDataUnsafe.user) {
        return null;
    }

    return tg.initDataUnsafe.user;
}

export function getRawData() {
    const tg = window.Telegram.WebApp;

    if (!tg.initDataUnsafe) {
        return null;
    }

    return tg.initDataUnsafe;
}