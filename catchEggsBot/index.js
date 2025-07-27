import { Bot, InputFile, InlineKeyboard } from "grammy";
import 'dotenv/config';

const bot = new Bot(process.env.BOT_TOKEN);
const supportSessions = new Map();
const ADMIN_ID = Number(process.env.ADMIN_ID);

bot.command("start", async (ctx) => {
    const keyboard = new InlineKeyboard().text("📩 Написать нам", "support");
    await ctx.replyWithPhoto(
      new InputFile("img/glavskidaLogo.jpg"),
      {
        caption: `<b>Добро пожаловать, вас приветствует бот компании "Главреклама"!</b>\n\nДля доступа к скидкам, пожалуйста, нажмите кнопку старта приложения в нижнем левом углу.`,
        parse_mode: "HTML",
        reply_markup: keyboard
      }
    );
});

bot.callbackQuery("support", async ctx => {
    await ctx.answerCallbackQuery();
    supportSessions.set(ctx.from.id, true);
    await ctx.reply("Вы вошли в режим поддержки. Напишите свой вопрос, и оператор ответит вам.");
});

bot.on("message:text", async (ctx) => {
    const userId = ctx.from.id;

    // Логика админа
    if (userId === ADMIN_ID && ctx.message.reply_to_message) {
        const originalText = ctx.message.reply_to_message.text;

        // Извлекаем ID пользователя из исходного текста
        const match = originalText.match(/ID: (\d+)/);
        const targetUserId = match ? Number(match[1]) : null;

        if (targetUserId) {
            await bot.api.sendMessage(targetUserId, ctx.message.text);
        } else {
            await ctx.reply("Не удалось определить пользователя для ответа.");
        }

        return;
    }

    if (supportSessions.get(userId)) {
        const keyboard = new InlineKeyboard()
            .text("Завершить чат", `end_${userId}`);

        const message = ctx.message.text;

        await bot.api.sendMessage(
            ADMIN_ID,
            `📩 Новое сообщение от пользователя:\n\n<b>${message}</b>\n\nID: ${userId}`,
            { 
                parse_mode: "HTML",
                reply_markup: keyboard
            }
        );

        await ctx.reply("Ваше сообщение отправлено в поддержку. Ожидайте ответ.");
    }
});

bot.callbackQuery(/end_(\d+)$/, async (ctx) => {
    await ctx.answerCallbackQuery();
    const targetUserId = Number(ctx.match[1]);
    // Удаляем сессию
    supportSessions.delete(targetUserId);
    // Уведомляем админа
    await ctx.reply(`Сессия с пользователем ${targetUserId} завершена.`);
    // Уведомляем пользователя
    await bot.api.sendMessage(
      targetUserId,
      "Оператор завершил чат. Если понадобится помощь — нажмите «Написать нам»."
    );
});

bot.catch(err => console.error("Ошибка в боте:", err));
bot.start();
console.log("Бот запущен");