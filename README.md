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
3.  **A GitHub Repository**: Your bot's code should be in a GitHub repository. You can either fork this repository or push your own code.

### 1. How to get a Telegram Bot Token

- Open your Telegram app and search for a bot called **`@BotFather`**.
- Start a chat with `@BotFather` and send the `/newbot` command.
- Follow the on-screen instructions to choose a name and username for your bot.
- Once finished, `@BotFather` will give you a **token**. It will look something like `123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11`.
- **Copy this token and save it somewhere safe. Do not share it publicly.**

### 2. How to get your Telegram User ID

- In your Telegram app, search for a bot called **`@userinfobot`**.
- Start a chat with `@userinfobot`, and it will immediately reply with your User ID.

---

## Detailed Deployment Guide for Replit

Follow these steps to get your bot running on Replit.

### Step 1: Import Your Repository into Replit

1.  Log in to your [Replit](https://replit.com/) account.
2.  Click the **`+ Create Repl`** button, usually found in the top left corner.
3.  In the creation dialog, click the **`Import from GitHub`** button on the top right.
4.  Paste the URL of your GitHub repository into the field.
5.  Replit will automatically detect the language as `Node.js`. Click **`Import from GitHub`** to create the Repl.

Replit will now clone your repository and set up the environment.

### Step 2: Configure Secrets (Environment Variables)

Your bot token is a secret and should never be written directly in your code. Replit's Secrets feature is the perfect place to store it.

1.  Once your Repl is created, look for the **`Tools`** section in the left sidebar.
2.  Click on **`Secrets`** (it has a padlock icon).
3.  You will see a form to add new secrets. Add the following key-value pairs one by one:

| Key         | Value                                                 |
|-------------|-------------------------------------------------------|
| `BOT_TOKEN` | The token you got from `@BotFather`.                  |
| `OWNER_ID`  | Your personal Telegram User ID.                       |
| `PREFIX`    | (Optional) A single character for commands, e.g., `.` |

Your secrets are now securely stored and will be accessible to your bot.

### Step 3: Run the Bot

1.  Simply click the big green **`Run`** button at the top of the screen.
2.  When you click "Run", Replit automatically performs the following actions defined in your `package.json` file:
    *   **Installs dependencies**: It runs `npm install` to download all the libraries your bot needs.
    *   **Builds the code**: It runs `npm run build`, which compiles your TypeScript (`.ts`) files into JavaScript (`.js`) files in a `dist` folder.
    *   **Starts the bot**: It runs `npm start`, which uses `pm2` to launch your compiled bot from `dist/index.js`.
3.  You will see output in the **`Console`** window. If everything is successful, you'll see "Bot started..." and a list of all the plugins that were loaded.

### Step 4: Keeping the Bot Online

By default, a Replit Repl will go to sleep after a period of inactivity. To keep your bot running 24/7, you have two main options:

1.  **Replit Core Membership**: Subscribing to Replit Core provides you with "Always On" functionality for your Repls, ensuring they never sleep.
2.  **Deployments**: You can deploy your bot as a "Reserved VM" on Replit. This is a more robust deployment option designed for production applications that need to be always available. You can access this from the `Deployments` tab in your Repl.

Your bot is now fully deployed and running on Replit!

---

**Note**: The bot uses a simple file-based database (`db.json`). This file will be created automatically in your Replit's file system the first time you use a feature that requires it, like `/setwelcome`.
