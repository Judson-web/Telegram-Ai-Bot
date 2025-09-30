/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import TelegramBot from 'node-telegram-bot-api';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const token = process.env.BOT_TOKEN;

if (!token) {
  console.error('Error: BOT_TOKEN is not set in the environment variables.');
  process.exit(1);
}

const bot = new TelegramBot(token, { polling: true });

console.log('Bot started...');

// Dynamically load plugins from the compiled 'dist' directory
const pluginsDir = path.join(__dirname, 'plugins');

fs.readdirSync(pluginsDir)
  .filter(file => file.endsWith('.js')) // Look for compiled JavaScript files
  .forEach(file => {
    try {
      const plugin = require(path.join(pluginsDir, file));
      if (plugin && typeof plugin.initialize === 'function') {
        plugin.initialize(bot);
        console.log(`Loaded plugin: ${plugin.name || file}`);
      }
    } catch (error) {
      console.error(`Failed to load plugin ${file}:`, error);
    }
  });

console.log('All plugins loaded.');

// Handle graceful shutdown
const stopBot = () => {
    console.log('Stopping bot...');
    bot.stopPolling().then(() => {
      console.log('Bot stopped.');
      process.exit(0);
    });
};

process.on('SIGINT', stopBot);
process.on('SIGTERM', stopBot);