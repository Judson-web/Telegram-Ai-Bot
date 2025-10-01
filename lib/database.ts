/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import fs from 'fs/promises';
import path from 'path';
import { Chat } from '../models/Chat';

const dbPath = path.join(process.cwd(), 'db.json');

interface DatabaseSchema {
  [chatId: number]: Chat;
}

let database: DatabaseSchema = {};

const loadDatabase = async () => {
  try {
    const data = await fs.readFile(dbPath, 'utf-8');
    database = JSON.parse(data);
    console.log('Database loaded successfully.');
  } catch (error: any) {
    if (error.code === 'ENOENT') {
      // File doesn't exist, which is fine on the first run.
      console.log('No database file found, starting fresh.');
      database = {};
    } else {
      console.error('Error loading database:', error);
      database = {};
    }
  }
};

const saveDatabase = async () => {
  try {
    await fs.writeFile(dbPath, JSON.stringify(database, null, 2));
  } catch (error) {
    console.error('Error saving database:', error);
  }
};

// Load the database on startup
(async () => {
  await loadDatabase();
})();

export const getChat = async (chatId: number): Promise<Chat | undefined> => {
  return database[chatId];
};

export const updateChat = async (chatId: number, data: Partial<Chat>): Promise<Chat> => {
  if (!database[chatId]) {
    database[chatId] = { id: chatId };
  }
  database[chatId] = { ...database[chatId], ...data };
  await saveDatabase();
  return database[chatId];
};
