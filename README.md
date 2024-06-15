# Todo App Telegram Bot

A Telegram bot for managing tasks efficiently. Built with Nest.js and Telegraf.

## Features

- Create, view, complete, edit, and delete tasks via Telegram chat.

## Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/todo-app-telegram-bot.git
   cd todo-app-telegram-bot

   ```

2. Install dependencies:

   ```bash
   npm install

   ```

3. Configure PostgreSQL in `.env`:

   ```plaintext
   POSTGRES_HOST=127.0.0.1
   POSTGRES_PORT=5432
   POSTGRES_USER=postgres
   POSTGRES_PASSWORD=yourpassword
   POSTGRES_DATABASE=todo-app-tg-bot
   TELEGRAM_TOKEN=telegram-token

   ```

4. Run migrations:

   ```bash
   npm run typeorm:migration:run

   ```

5. Start the bot:
   ```bash
   npm run start
   ```

## Usage

Start the bot with /start command.
Use action buttons to manage tasks.

## Contributing

Feel free to contribute by opening issues or pull requests.
