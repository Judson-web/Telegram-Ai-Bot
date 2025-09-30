# Telegram AI Bot

A modular and extensible Telegram bot built with Node.js and TypeScript, designed for easy deployment on Heroku.

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/Judson-web/Telegram-Ai-Bot)

## Features

- **Modular Plugin System**: Easily add new features by creating new plugin files.
- **Welcome Messages**: Automatically greet new members with a customizable message.
- **Fun Commands**: Includes commands like `/echo`, `/quote`, and `/alive`.
- **Deployment Ready**: Fully configured for one-click deployment to Heroku.

## Deployment to Heroku

You can deploy this bot to Heroku in two ways:

### Option A: One-Click Deploy

1.  Click the "Deploy to Heroku" button at the top of this README.
2.  Give your app a unique name.
3.  Fill in the required environment variables:
    *   `BOT_TOKEN`: Your bot token from Telegram's @BotFather.
    *   `OWNER_ID`: Your personal Telegram user ID.
4.  Click "Deploy app". Heroku will build and start your bot automatically.

### Option B: Manual Deployment

1.  **Fork this repository** to your own GitHub account.
2.  **Create a new app on Heroku**: Go to your Heroku dashboard and create a new application.
3.  **Connect your GitHub repository**: In the "Deploy" tab of your Heroku app, connect to your forked GitHub repository.
4.  **Configure Environment Variables**: In the "Settings" tab, click "Reveal Config Vars" and add the following:
    *   `BOT_TOKEN`: Your bot token.
    *   `OWNER_ID`: Your Telegram user ID.
5.  **Enable Automatic Deploys (Optional)**: In the "Deploy" tab, you can enable automatic deploys from the `main` branch.
6.  **Deploy Manually**: Click "Deploy Branch" to build and start your bot.
