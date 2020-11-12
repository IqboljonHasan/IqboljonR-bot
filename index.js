const TelegramBot = require('node-telegram-bot-api');
const token = '1084005397:AAEy9MR0pZn7CYDRnx73CY9IwNiuPzLl6JI';
let bot;
if(process.env.NODE_ENV === 'production') {
    bot = new TelegramBot(token)
        bot.setWebHook(process.env.HEROKU_URL, BOT.token)
}
else{
    bot = new TelegramBot(token, {
        polling: {
            interval: 300,
            autoStart: true,
            params: {
                timeout: 10
            }
        }
    });
}

const adminId = 822169271
bot.on('message', msg => {
    const {
        id
    } = msg.chat;
    if(!msg.reply_to_message || id != adminId) {
        if (msg.text === '/start') {
            bot.sendMessage(
                id,
                `
                    Assalomu alaykum, *${msg.from.first_name}.*\n\n_Xabaringizni qoldiring, tez orada javob berishga harakat qilaman._
                `, {
                    parse_mode: "Markdown"
                }
            ).then(() => {
                bot.sendMessage(id, `🙂`)
            })
        }
        else {
            bot.forwardMessage(adminId, id, msg.message_id).then(() => {bot.sendMessage(id, "Xabaringiz qabul qilindi ✅")})
        }
    }
    else {
        if(msg.text) {
            bot.sendMessage(msg.reply_to_message.forward_from.id, msg.text)
        }
        else {
            bot.forwardMessage(msg.reply_to_message.forward_from.id, id, msg.message_id)
        }
    }
});