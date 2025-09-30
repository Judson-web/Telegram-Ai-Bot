/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import fs from 'fs';
import path from 'path';
import { Chat } from '../models/Chat';

const dbPath = path.join(process.cwd(), 'db.json');

interface DatabaseSchema {
  [chatId: number]: Chat;
}

let database: DatabaseSchema = {};

const loadDatabase = () => {
  try {
    if (fs.existsSync(dbPath)) {
      const data = fs.readFileSync(dbPath, 'utf-8');
      database = JSON.parse(data);
    }
  } catch (error) {
    console.error('Error loading database:', error);
    database = {};
  }
};

const saveDatabase = () => {
  try {
    fs.writeFileSync(dbPath, JSON.stringify(database, null, 2));
  } catch (error) {
    console.error('Error saving database:', error);
  }
};

// Load the database on startup
loadDatabase();

export const getChat = async (chatId: number): Promise<Chat | undefined> => {
  return database[chatId];
};

export const updateChat = async (chatId: number, data: Partial<Chat>): Promise<Chat> => {
  if (!database[chatId]) {
    database[chatId] = { id: chatId };
  }
  database[chatId] = { ...database[chatId], ...data };
  saveDatabase();
  return database[chatId];
};
