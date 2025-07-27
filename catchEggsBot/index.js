import { Bot } from "grammy";
import 'dotenv/config';

const bot = new Bot(process.env.BOT_TOKEN);

bot.command('start', ctx => ctx.reply('Добро пожаловать, вас приветствует бот компании "Главреклама"! Для доступа к скидкам, пожалуйста, нажмите кнопку старта приложения в нижнем левом углу.'));

bot.start();