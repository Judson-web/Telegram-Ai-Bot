/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import TelegramBot from 'node-telegram-bot-api';
import { GoogleGenAI } from '@google/genai';

export const name = 'crypto_price';

export const initialize = (bot: TelegramBot) => {
  bot.onText(/\/crypto (.+)/, async (msg, match) => {
    const chatId = msg.chat.id;
    const coin = match ? match[1] : '';

    if (!process.env.API_KEY) {
      bot.sendMessage(chatId, 'Error: The Google AI API key is not configured.');
      return;
    }

    bot.sendChatAction(chatId, 'typing');

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `Get the current price of the cryptocurrency "${coin}" in USD. Also provide its 24-hour percentage change. Format it nicely for a Telegram message.`;
      
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: { tools: [{ googleSearch: {} }] }
      });

      const priceInfo = response.text;
      bot.sendMessage(chatId, priceInfo, { parse_mode: 'Markdown' });

    } catch (error) {
      console.error('Crypto Price Error:', error);
      bot.sendMessage(chatId, `Sorry, an error occurred while fetching the price for ${coin}.`);
    }
  });

  bot.onText(/\/crypto$/, (msg) => {
    bot.sendMessage(msg.chat.id, 'Please provide a cryptocurrency name or symbol.\nExample: `/crypto bitcoin`');
  });
};
