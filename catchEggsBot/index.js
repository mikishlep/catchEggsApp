import { Bot, InputFile } from "grammy";
import 'dotenv/config';

const bot = new Bot(process.env.BOT_TOKEN);
const supportSessions = new Map();

bot.command("start", async (ctx) => {
    await ctx.replyWithPhoto(
      new InputFile("img/glavskidaLogo.jpg"),
      {
        caption: `<b>Добро пожаловать, вас приветствует бот компании "Главреклама"!</b>\n\nДля доступа к скидкам, пожалуйста, нажмите кнопку старта приложения в нижнем левом углу.`,
        parse_mode: "HTML",
      }
    );
});

bot.start();