/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import TelegramBot from 'node-telegram-bot-api';
import { GoogleGenAI } from '@google/genai';

export const name = 'wikipedia';

export const initialize = (bot: TelegramBot) => {
  bot.onText(/\/wiki (.+)/, async (msg, match) => {
    const chatId = msg.chat.id;
    const query = match ? match[1] : '';

    if (!process.env.API_KEY) {
      bot.sendMessage(chatId, 'Error: The Google AI API key is not configured.');
      return;
    }

    bot.sendChatAction(chatId, 'typing');

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `Summarize the Wikipedia article for "${query}" in about 3-4 paragraphs. Start with a clear topic sentence. If the article doesn't exist or is ambiguous, state that you couldn't find a definitive article.`;
      
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt
      });

      const summary = response.text;
      bot.sendMessage(chatId, summary, { parse_mode: 'Markdown' });

    } catch (error) {
      console.error('Wikipedia Error:', error);
      bot.sendMessage(chatId, `Sorry, an error occurred while searching Wikipedia for "${query}".`);
    }
  });

  bot.onText(/\/wiki$/, (msg) => {
    bot.sendMessage(msg.chat.id, 'Please provide a search query.\nExample: `/wiki Albert Einstein`');
  });
};
