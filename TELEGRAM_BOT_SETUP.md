# Инструкция по настройке Telegram бота для формы контактов

Это руководство поможет вам настроить Telegram бота для получения уведомлений о новых заявках с сайта.

## 📋 Шаг 1: Создание Telegram бота

1. Откройте Telegram и найдите бота **@BotFather**
2. Отправьте команду `/newbot`
3. Укажите имя для вашего бота (например: `Tamex Contact Bot`)
4. Укажите username бота (должен заканчиваться на `bot`, например: `tamex_contact_bot`)
5. **Сохраните токен**, который выдаст BotFather (формат: `1234567890:ABCdefGHIjklMNOpqrsTUVwxyz`)

## 💬 Шаг 2: Получение Chat ID

У вас есть несколько вариантов получения Chat ID:

### Вариант 1: Личный чат (для тестирования)

1. Начните диалог с вашим ботом (найдите его по username)
2. Отправьте любое сообщение боту (например: `/start`)
3. Откройте бота **@userinfobot** или **@getmyid_bot**
4. Скопируйте ваш User ID (например: `123456789`)

### Вариант 2: Группа/канал (для продакшена)

1. Создайте группу в Telegram
2. Добавьте вашего бота в группу как администратора
3. Отправьте сообщение в группу
4. Откройте в браузере:
   ```
   https://api.telegram.org/bot<ВАШ_ТОКЕН>/getUpdates
   ```
   Замените `<ВАШ_ТОКЕН>` на токен из шага 1
5. Найдите в ответе поле `"chat":{"id":-1001234567890}` - это и есть Chat ID группы
6. **Важно**: ID группы всегда начинается с минуса (`-`)

## ⚙️ Шаг 3: Настройка переменных окружения

1. Скопируйте файл `.env.example` в `.env`:
   ```bash
   cp .env.example .env
   ```

2. Откройте `.env` и заполните значения:
   ```env
   TELEGRAM_BOT_TOKEN=ваш_токен_от_BotFather
   TELEGRAM_CHAT_ID=ваш_chat_id
   PORT=3001
   FRONTEND_URL=*
   ```

3. **ВАЖНО**: Никогда не коммитьте файл `.env` в git!

## 🚀 Шаг 4: Установка зависимостей и запуск

### Локальная разработка

```bash
# Установка зависимостей
npm install

# Запуск backend сервера
npm run server

# В другом терминале - запуск фронтенда
npm run dev
```

### На Ubuntu сервере

#### Установка Node.js (если еще не установлен)

```bash
# Установка Node.js через nvm (рекомендуется)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
source ~/.bashrc
nvm install 20
nvm use 20

# Или через apt
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
```

#### Настройка проекта на сервере

```bash
# Клонирование/загрузка проекта
cd /var/www/tamex-inc  # или ваш путь

# Установка зависимостей
npm install --production

# Создание .env файла
nano .env
# Вставьте ваши значения и сохраните (Ctrl+O, Enter, Ctrl+X)

# Проверка конфигурации
node server/index.js
```

#### Настройка как системного сервиса (systemd)

Создайте файл `/etc/systemd/system/tamex-api.service`:

```ini
[Unit]
Description=Tamex Contact API Server
After=network.target

[Service]
Type=simple
User=www-data
WorkingDirectory=/var/www/tamex-inc
Environment=NODE_ENV=production
ExecStart=/usr/bin/node server/index.js
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
```

Затем активируйте и запустите сервис:

```bash
sudo systemctl daemon-reload
sudo systemctl enable tamex-api
sudo systemctl start tamex-api
sudo systemctl status tamex-api
```

#### Настройка Nginx как reverse proxy (опционально)

Если вы используете Nginx, добавьте в конфигурацию:

```nginx
server {
    listen 80;
    server_name api.tamexgroup.com;  # или ваш домен

    location /api {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Перезагрузите Nginx:
```bash
sudo nginx -t
sudo systemctl reload nginx
```

## 🔧 Шаг 5: Настройка фронтенда

Если backend API работает на отдельном домене/порту, обновите переменную окружения:

Создайте файл `.env` в корне проекта (или `.env.production`):

```env
VITE_API_URL=https://api.tamexgroup.com/api/contact
```

Или если API на том же домене:
```env
VITE_API_URL=/api/contact
```

После изменения переменных окружения пересоберите фронтенд:
```bash
npm run build
```

## 🧪 Тестирование

1. Запустите backend сервер:
   ```bash
   npm run server
   ```

2. Проверьте health check:
   ```bash
   curl http://localhost:3001/api/health
   ```

3. Откройте сайт и отправьте тестовую форму

4. Проверьте Telegram - должно прийти сообщение с данными формы

## 📝 Формат сообщения в Telegram

При отправке формы в Telegram будет приходить сообщение в таком формате:

```
🔔 Новая заявка с сайта Tamex Group

👤 Имя: Иван Иванов
📧 Email: ivan@example.com
💬 Сообщение:
Здравствуйте, интересует оборудование...

📅 Дата отправки: 15.01.2024, 14:30
🌐 Источник: Сайт tamexgroup.com
```

## 🔒 Безопасность

1. **Никогда не публикуйте** `.env` файл в git
2. Используйте переменные окружения для всех чувствительных данных
3. Настройте firewall для ограничения доступа к API порту:
   ```bash
   sudo ufw allow 3001/tcp
   ```
4. Рекомендуется использовать HTTPS через Nginx для API

## 🐛 Устранение неполадок

### Бот не получает сообщения

1. Проверьте правильность токена:
   ```bash
   curl https://api.telegram.org/bot<ВАШ_ТОКЕН>/getMe
   ```

2. Проверьте правильность Chat ID:
   - Для личного чата: отправьте `/start` боту, затем проверьте через getUpdates
   - Для группы: убедитесь, что бот добавлен и имеет права администратора

3. Проверьте логи сервера:
   ```bash
   sudo journalctl -u tamex-api -f
   ```

### CORS ошибки

Убедитесь, что `FRONTEND_URL` в `.env` правильно настроен:
- `*` - разрешает все домены (для разработки)
- `https://tamexgroup.com` - только ваш домен (для продакшена)

### Порт уже занят

Измените порт в `.env`:
```env
PORT=3002
```

## 📞 Поддержка

Если возникли проблемы, проверьте:
- Логи сервера: `sudo journalctl -u tamex-api -n 50`
- Статус сервиса: `sudo systemctl status tamex-api`
- Конфигурацию: проверьте файл `.env`

