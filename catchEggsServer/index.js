// код сверки хэша тгшки и бот токена

const crypto = require('crypto');

function parseInitData(initData) {
    return Object.fromEntries(new URLSearchParams(initData));
}

function checkTelegramInitData(initData, botToken) {
    const parsed = parseInitData(initData);

    const hash = parsed.hash;
    delete parsed.hash;

    const dataCheckArr = [];
    for (const [key, value] of Object.entries(parsed)) {
        dataCheckArr.push(`${key}=${value}`);
    }
    dataCheckArr.sort();
    const dataCheckString = dataCheckArr.join("\n");

    const secretKey = crypto.createHmac("sha256", "WebAppData")
        .update(botToken)
        .digest();

    const computedHash = crypto.createHmac("sha256", secretKey)
        .update(dataCheckString)
        .digest("hex");

    return computedHash === hash;
}

const initData = "";
const botToken = ""; // твой токен бота

console.log(checkTelegramInitData(initData, botToken));