const request = require('request');

const TelegramBot = require('node-telegram-bot-api');
// bot_token
const token = require('./token.js');

const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, (msg) => {
	bot.sendMessage(msg.chat.id, "Welcome")
});


// homeblockcoin
const url = 'https://api.coinmarketcap.com/v1/ticker/homeblockcoin/';

const prepareData = (body) => {
	const hbc = JSON.parse(body);
	return hbc.map((coin) => `${coin.name}
							  HBC:  ${coin.price_usd} $
							  HBC:  ${coin.price_btc} BTC
							 `)
		.join('\n\n');
};

bot.onText(/\/hbc/, (msg) => {
	return request(url, (err, res, body) => {
		bot.sendMessage(msg.chat.id, `
                                        ${prepareData(body)} Website: homeblockcoin.site
                                     `, { disable_web_page_preview: "true" })
	})
});

// bitcoin 
const bitcoin = 'https://api.coinmarketcap.com/v1/ticker/bitcoin/';
const dataBitcoin = (body) => {
	const hbc = JSON.parse(body);
	return hbc.map((coin) => `${coin.name}
							  BTC:  ${coin.price_usd} $
							 `)
		.join('\n\n');
};

bot.onText(/\/btc/, (msg) => {
	return request(bitcoin, (err, res, body) => {
		bot.sendMessage(msg.chat.id, `
                                        ${dataBitcoin(body)} Website: homeblockcoin.site
                                     `, { disable_web_page_preview: "true" })
	})
});

const ethereum = 'https://api.coinmarketcap.com/v1/ticker/ethereum/';
const dataEthereum = (body) => {
	const eth = JSON.parse(body);
	return eth.map((coin) => `${coin.name}
         ETH:  ${coin.price_usd} $
         ETH:  ${coin.price_btc} BTC
							 `)
		.join('\n\n');
};

bot.onText(/\/eth/, (msg) => {
	return request(ethereum, (err, res, body) => {
		bot.sendMessage(msg.chat.id, `
                                        ${dataEthereum(body)} Website: homeblockcoin.site
                                     `, { disable_web_page_preview: "true" })
	})
});
