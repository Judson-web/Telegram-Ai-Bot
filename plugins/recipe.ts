/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import TelegramBot from 'node-telegram-bot-api';
import { GoogleGenAI } from '@google/genai';

export const name = 'recipe_finder';

export const initialize = (bot: TelegramBot) => {
  bot.onText(/\/recipe (.+)/, async (msg, match) => {
    const chatId = msg.chat.id;
    const dish = match ? match[1] : '';

    if (!process.env.API_KEY) {
      bot.sendMessage(chatId, 'Error: The Google AI API key is not configured.');
      return;
    }

    bot.sendChatAction(chatId, 'typing');

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `Find a simple recipe for "${dish}". Please format the response with a list of ingredients and then numbered step-by-step instructions. Use Markdown for formatting.`;
      
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: { tools: [{ googleSearch: {} }] }
      });

      const recipe = response.text;
      bot.sendMessage(chatId, `🍲 *Recipe for ${dish}*\n\n${recipe}`, { parse_mode: 'Markdown' });

    } catch (error) {
      console.error('Recipe Error:', error);
      bot.sendMessage(chatId, `Sorry, an error occurred while searching for a recipe for "${dish}".`);
    }
  });

  bot.onText(/\/recipe$/, (msg) => {
    bot.sendMessage(msg.chat.id, 'Please provide a dish name.\nExample: `/recipe chocolate chip cookies`');
  });
};
