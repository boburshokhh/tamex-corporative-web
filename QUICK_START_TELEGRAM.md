# Быстрый старт: Интеграция с Telegram ботом

## 🚀 Быстрая настройка (5 минут)

### 1. Создайте Telegram бота

1. Откройте Telegram → найдите **@BotFather**
2. Отправьте `/newbot`
3. Введите имя и username бота
4. **Скопируйте токен** (формат: `1234567890:ABC...`)

### 2. Получите Chat ID

**Вариант А - Личный чат (для теста):**
- Начните диалог с вашим ботом
- Откройте **@userinfobot** → скопируйте ваш ID

**Вариант Б - Группа (для продакшена):**
- Создайте группу, добавьте бота
- Откройте: `https://api.telegram.org/bot<ВАШ_ТОКЕН>/getUpdates`
- Найдите `"chat":{"id":-100...}` → это ваш Chat ID

### 3. Настройте переменные окружения

Создайте файл `.env` в корне проекта:

```env
TELEGRAM_BOT_TOKEN=ваш_токен_от_BotFather
TELEGRAM_CHAT_ID=ваш_chat_id
PORT=3001
FRONTEND_URL=*
VITE_API_URL=/api/contact
```

### 4. Установите зависимости и запустите

```bash
# Установка зависимостей
npm install

# Запуск backend сервера (в одном терминале)
npm run server

# Запуск фронтенда (в другом терминале)
npm run dev
```

### 5. Проверьте работу

1. Откройте `http://localhost:5173` (или другой порт Vite)
2. Заполните и отправьте форму контактов
3. Проверьте Telegram - должно прийти сообщение! ✅

## 📦 Деплой на Ubuntu сервер

### 1. Подготовка сервера

```bash
# Установка Node.js
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Загрузите проект на сервер
cd /var/www/tamex-inc
```

### 2. Настройка

```bash
# Установка зависимостей
npm install --production

# Создайте .env файл
nano .env
# Вставьте ваши токены
```

### 3. Создание systemd сервиса

Создайте `/etc/systemd/system/tamex-api.service`:

```ini
[Unit]
Description=Tamex Contact API
After=network.target

[Service]
Type=simple
User=www-data
WorkingDirectory=/var/www/tamex-inc
Environment=NODE_ENV=production
ExecStart=/usr/bin/node server/index.js
Restart=always

[Install]
WantedBy=multi-user.target
```

Запустите сервис:

```bash
sudo systemctl daemon-reload
sudo systemctl enable tamex-api
sudo systemctl start tamex-api
sudo systemctl status tamex-api
```

### 4. Настройка Nginx (если используется)

Добавьте в конфигурацию Nginx:

```nginx
location /api {
    proxy_pass http://localhost:3001;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
}
```

## 🔍 Проверка работы

```bash
# Проверка API
curl http://localhost:3001/api/health

# Просмотр логов
sudo journalctl -u tamex-api -f
```

## 📝 Что происходит

1. Пользователь заполняет форму на сайте
2. Фронтенд отправляет POST запрос на `/api/contact`
3. Backend валидирует данные
4. Backend отправляет сообщение в Telegram через Bot API
5. Вы получаете уведомление в Telegram! 📱

## ⚠️ Важные замечания

- **Не коммитьте** `.env` файл в git
- Для продакшена используйте HTTPS
- Настройте firewall для порта API
- Рекомендуется использовать Nginx как reverse proxy

## 📚 Подробная документация

См. `TELEGRAM_BOT_SETUP.md` для детальной инструкции.

