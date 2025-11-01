# Исправление проблемы с переменными окружения

## Проблема
Переменные окружения не загружаются, хотя `.env` файл настроен.

## Решение

### 1. Проверьте токен в .env

Убедитесь, что токен **ПОЛНЫЙ** и не обрезан. Токены Telegram обычно имеют формат:
```
1234567890:ABCdefGHIjklMNOpqrsTUVwxyz1234567890
```

Ваш токен должен быть:
```
8279018350:AAEF0Qm6xF8NrJ6C9iSy-aHZjI_KMpXXXXXXXX
```
(где XXXX - остальные символы)

### 2. Убедитесь, что .env файл в правильном формате

Файл `.env` должен быть в **корне проекта** (там же где `package.json`):

```
tamex-inc/
├── .env              ← ЗДЕСЬ!
├── package.json
├── vite.config.ts
└── ...
```

### 3. Проверьте синтаксис .env

- **НЕТ пробелов** вокруг `=`
- **НЕТ кавычек** вокруг значений
- Каждая переменная на **отдельной строке**

Правильно:
```env
VITE_TELEGRAM_BOT_TOKEN=8279018350:AAEF0Qm6xF8NrJ6C9iSy-aHZjI_KMpXXXXXXXX
VITE_TELEGRAM_CHAT_ID=1880379269
```

Неправильно:
```env
VITE_TELEGRAM_BOT_TOKEN = 8279018350:AAEF0Qm6xF8NrJ6C9iSy-aHZjI_KMp  ← пробелы!
VITE_TELEGRAM_BOT_TOKEN="8279018350:AAEF0Qm6xF8NrJ6C9iSy-aHZjI_KMp"  ← кавычки!
```

### 4. ПЕРЕЗАПУСТИТЕ dev сервер

После изменения `.env` **ОБЯЗАТЕЛЬНО** перезапустите:

1. Остановите: `Ctrl+C` в терминале где запущен `npm run dev`
2. Запустите снова: `npm run dev`

### 5. Проверка в браузере

Откройте консоль браузера (F12) и выполните:

```javascript
console.log('Token:', import.meta.env.VITE_TELEGRAM_BOT_TOKEN);
console.log('Chat ID:', import.meta.env.VITE_TELEGRAM_CHAT_ID);
```

Если видите `undefined` - значит:
- Файл `.env` не найден
- Переменные названы неправильно (без `VITE_`)
- Dev сервер не перезапущен

## Минимальный .env файл

Создайте файл `.env` с таким содержимым:

```env
VITE_TELEGRAM_BOT_TOKEN=8279018350:AAEF0Qm6xF8NrJ6C9iSy-aHZjI_KMpПОЛНЫЙ_ТОКЕН_ЗДЕСЬ
VITE_TELEGRAM_CHAT_ID=1880379269
```

**ВАЖНО:** Замените `ПОЛНЫЙ_ТОКЕН_ЗДЕСЬ` на полный токен от BotFather!

