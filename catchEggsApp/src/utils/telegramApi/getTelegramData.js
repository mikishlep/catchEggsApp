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

export function getInitData() {
    const tg = window.Telegram.WebApp;

    if (!tg.initData) {
        return null;
    }

    return tg.initData;
}