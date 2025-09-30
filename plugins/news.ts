/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import TelegramBot from 'node-telegram-bot-api';
import { GoogleGenAI } from '@google/genai';

export const name = 'news';

export const initialize = (bot: TelegramBot) => {
  bot.onText(/\/news/, async (msg) => {
    const chatId = msg.chat.id;

    if (!process.env.API_KEY) {
      bot.sendMessage(chatId, 'Error: The Google AI API key is not configured.');
      return;
    }

    bot.sendChatAction(chatId, 'typing');

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `Get the top 3 latest world news headlines. For each headline, provide a one-sentence summary and a source link if available.`;
      
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: { tools: [{ googleSearch: {} }] }
      });

      const news = response.text;
      bot.sendMessage(chatId, `📰 *Latest World News*\n\n${news}`, { parse_mode: 'Markdown', disable_web_page_preview: true });

    } catch (error) {
      console.error('News Error:', error);
      bot.sendMessage(chatId, 'Sorry, an error occurred while fetching the latest news.');
    }
  });
};
