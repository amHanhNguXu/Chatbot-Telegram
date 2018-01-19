const Bot = require('node-telegram-bot-api');
const request = require('request');

const token = require('./token');
// const url = 'https://launchlibrary.net/1.3/launch';
const url = 'https://api.coinmarketcap.com/v1/ticker/homeblockcoin/';
const trigger = 'I want information of homeblockcoin';

const bot = new Bot(token, { polling: true });

// const prepareData = (body) => {
// 	const launches = JSON.parse(body).launches;
// 	return launches.filter((launch) => launch !== undefined)
// 		.map((launch) => `${launch.name} on ${launch.net}`)
// 		.join('\n\n');
// };

const prepareData = (body) => {
    const hbc = JSON.parse(body);
    console.log(hbc);
    return hbc.map((coin) => `Name: ${coin.name},
							  Price HBC/USD: ${coin.price_usd},
							  Price HBC/BTC: ${coin.price_btc},
							` )
        .join('\n\n');
}

bot.on('message', (msg) => {
    if (msg.text.toString() === trigger) {
        return request(url, (err, resp, body) => {
            bot.sendMessage(msg.chat.id, prepareData(body));
        });
    }

    bot.sendMessage(msg.chat.id, 'Hi, do you want homeblockcoin', {
        reply_markup: {
            keyboard: [[trigger], ['Information']]
        }
    }
    );
});