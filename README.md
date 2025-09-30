# Telegram AI Bot for Replit

A modular and extensible Telegram bot built with Node.js and TypeScript, configured for easy deployment on Replit.

## Features

- **Modular Plugin System**: Easily add new features by creating new plugin files.
- **Welcome Messages**: Automatically greet new members with a customizable message (via a simple file-based DB).
- **Fun Commands**: Includes commands like `/start`, `/alive`, `/echo`, and `/quote`.
- **Replit Ready**: Fully configured to run in a Replit environment.

---

## Getting Started: Prerequisites

Before deploying, you will need:

1.  **A Telegram Bot Token**: This is a unique key you get from Telegram to control your bot.
2.  **Your Telegram User ID**: This is needed for owner-only commands.
3.  **A GitHub Repository**: Your bot's code should be in a GitHub repository.

### 1. How to get a Telegram Bot Token

- Open your Telegram app and search for a bot called **`@BotFather`**.
- Start a chat with `@BotFather` and send the `/newbot` command.
- Follow the on-screen instructions to choose a name and username for your bot.
- Once finished, `@BotFather` will give you a **token**.
- **Copy this token and save it somewhere safe. Do not share it publicly.**

### 2. How to get your Telegram User ID

- In your Telegram app, search for a bot called **`@userinfobot`**.
- Start a chat with `@userinfobot`, and it will immediately reply with your User ID.

---

## Detailed Deployment Guide for Replit

Follow these steps to get your bot running on Replit.

### Step 1: Import Your Repository into Replit

1.  Log in to your [Replit](https://replit.com/) account.
2.  Click the **`+ Create Repl`** button in the top left corner.
3.  In the creation dialog, click the **`Import from GitHub`** button on the top right.
4.  Paste the URL of your GitHub repository into the field.
5.  Click **`Import from GitHub`** to create the Repl.

Replit will now clone your repository and set up the environment.

### Step 2: Configure Secrets (Environment Variables)

Your bot token is a secret and should never be written directly in your code. Replit's Secrets feature is the perfect place to store it.

1.  Once your Repl is created, look for the **`Secrets`** tab (it has a padlock icon 🔒) in the left sidebar under "Tools".
2.  Add the following key-value pairs one by one:

| Key         | Value                                                 |
|-------------|-------------------------------------------------------|
| `BOT_TOKEN` | The token you got from `@BotFather`.                  |
| `OWNER_ID`  | Your personal Telegram User ID.                       |
| `PREFIX`    | (Optional) A single character for commands, e.g., `.` |

### Step 3: Run the Bot

1.  Simply click the big green **`Run`** button at the top of the screen.
2.  Replit will automatically:
    *   **Install dependencies**: Runs `npm install`.
    *   **Build the code**: Runs `npm run build` to compile TypeScript to JavaScript.
    *   **Start the bot**: Runs `npm start` to launch your bot.
3.  You will see output in the **`Console`** window, including "Bot started..." and a list of all the loaded plugins.

### Step 4: Keeping the Bot Online (24/7)

By default, a Replit Repl will go to sleep after a period of inactivity. To keep your bot running 24/7, you need to deploy it.

1.  Click the **`Deploy`** button at the top right of your Repl's workspace.
2.  Choose the **"Reserved VM"** type for a background worker.
3.  Follow the on-screen prompts to configure and launch your deployment.

For more information, see the official Replit documentation on [Deploying your projects](https://docs.replit.com/hosting/deployments/about-deployments).

Your bot is now fully deployed and running on Replit!

---

**Note**: The bot uses a simple file-based database (`db.json`). This file will be created automatically in your Replit's file system the first time you use a feature that requires it, like `/setwelcome`.
