const crypto = require('crypto');

function parseInitData(initData) {
    return Object.fromEntries(new URLSearchParams(initData));
}

function checkTelegramInitData(initData, botToken) {
    const parsed = parseInitData(initData);

    const hash = parsed.hash;
    delete parsed.hash;

    // формируем data_check_string
    const dataCheckArr = [];
    for (const [key, value] of Object.entries(parsed)) {
        dataCheckArr.push(`${key}=${value}`);
    }
    dataCheckArr.sort();
    const dataCheckString = dataCheckArr.join("\n");

    // секретный ключ = HMAC-SHA256(botToken, "WebAppData")
    const secretKey = crypto.createHmac("sha256", "WebAppData")
        .update(botToken)
        .digest();

    // считаем хэш от строки
    const computedHash = crypto.createHmac("sha256", secretKey)
        .update(dataCheckString)
        .digest("hex");

    return computedHash === hash;
}

// пример
const initData = "";
const botToken = ""; // твой токен бота

console.log(checkTelegramInitData(initData, botToken));