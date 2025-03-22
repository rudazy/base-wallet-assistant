const TelegramBot = require("node-telegram-bot-api");
const { ethers } = require("ethers");

// Replace with your Telegram bot token
const bot = new TelegramBot("7696282888:AAHKINXwkXbS7msTOoeJU4T5APM7iyqbtKM", { polling: true });

// Replace with your Base RPC URL
const provider = new ethers.providers.JsonRpcProvider("https://goerli.base.org");

// Command: /balance <wallet_address>
bot.onText(/\/balance (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const walletAddress = match[1];

  try {
    // Fetch balance
    const balance = await provider.getBalance(walletAddress);
    const balanceInEth = ethers.utils.formatEther(balance);

    bot.sendMessage(chatId, `Balance: ${balanceInEth} ETH`);
  } catch (error) {
    bot.sendMessage(chatId, "Error fetching balance. Please check the wallet address.");
  }
});
