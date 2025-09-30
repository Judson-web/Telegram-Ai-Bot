/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Load environment variables from a .env file if it exists
import * as dotenv from 'dotenv';
dotenv.config();

import TelegramBot from 'node-telegram-bot-api';

// Import all plugins
import * as startPlugin from './plugins/start';
import * as alivePlugin from './plugins/alive';
import * as echoPlugin from './plugins/echo';
import * as quotesPlugin from './plugins/quotes';

// --- Main Bot Logic ---

const token = process.env.BOT_TOKEN;

if (!token) {
  console.error('ERROR: BOT_TOKEN is not set in the environment variables.');
  console.error('Please add your Telegram bot token to your .env file or your Heroku config vars.');
  process.exit(1);
}

console.log('Bot token found. Starting bot...');

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, { polling: true });

// Initialize all plugins
try {
  startPlugin.initialize(bot);
  alivePlugin.initialize(bot);
  echoPlugin.initialize(bot);
  quotesPlugin.initialize(bot);
  console.log('All plugins initialized successfully.');
} catch (error) {
  console.error('Failed to initialize plugins:', error);
  process.exit(1);
}

console.log('Telegram AI Bot is running...');

// Graceful shutdown
const shutdown = () => {
  console.log('Shutting down bot...');
  bot.stopPolling().then(() => {
    console.log('Bot polling stopped.');
    process.exit(0);
  });
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
