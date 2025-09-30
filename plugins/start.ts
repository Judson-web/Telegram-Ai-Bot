/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import TelegramBot from 'node-telegram-bot-api';

export const name = 'start';

export const initialize = (bot: TelegramBot) => {
  bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    const firstName = msg.from?.first_name || 'there';
    bot.sendMessage(chatId, `👋 Hello, ${firstName}!\n\nI am your bot, ready to assist. Send /alive to see if I'm running.`);
  });
};
