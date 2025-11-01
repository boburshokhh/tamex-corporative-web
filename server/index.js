import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import https from 'https';

// Загружаем переменные окружения
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || '*', // Разрешаем запросы с фронтенда
  credentials: true
}));
app.use(express.json());

// Валидация наличия необходимых переменных окружения
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
  console.error('⚠️  ОШИБКА: Необходимо настроить переменные окружения:');
  console.error('   TELEGRAM_BOT_TOKEN - токен вашего Telegram бота');
  console.error('   TELEGRAM_CHAT_ID - ID чата для получения сообщений');
  process.exit(1);
}

/**
 * Функция отправки сообщения в Telegram
 */
async function sendTelegramMessage(text) {
  const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
  
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({
      chat_id: TELEGRAM_CHAT_ID,
      text: text,
      parse_mode: 'HTML'
    });

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data)
      }
    };

    const req = https.request(url, options, (res) => {
      let responseData = '';

      res.on('data', (chunk) => {
        responseData += chunk;
      });

      res.on('end', () => {
        if (res.statusCode === 200) {
          try {
            const result = JSON.parse(responseData);
            if (result.ok) {
              resolve(result);
            } else {
              reject(new Error(`Telegram API error: ${result.description}`));
            }
          } catch (e) {
            reject(new Error(`Failed to parse response: ${e.message}`));
          }
        } else {
          reject(new Error(`HTTP error: ${res.statusCode}`));
        }
      });
    });

      req.on('error', (error) => {
        reject(error);
      });

      req.write(data);
      req.end();
    });
  });
}

/**
 * Форматирование сообщения для Telegram
 */
function formatMessage(formData) {
  const date = new Date().toLocaleString('ru-RU', {
    timeZone: 'Asia/Tashkent',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return `
🔔 <b>Новая заявка с сайта Tamex Group</b>

👤 <b>Имя:</b> ${escapeHtml(formData.name)}
📧 <b>Email:</b> ${escapeHtml(formData.contact)}
💬 <b>Сообщение:</b>
${escapeHtml(formData.message)}

📅 <b>Дата отправки:</b> ${date}
🌐 <b>Источник:</b> Сайт tamexgroup.com
  `.trim();
}

/**
 * Экранирование HTML для безопасности
 */
function escapeHtml(text) {
  if (!text) return '';
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

/**
 * Роут для обработки формы контактов
 */
app.post('/api/contact', async (req, res) => {
  try {
    const { name, contact, message } = req.body;

    // Валидация данных
    if (!name || !contact || !message) {
      return res.status(400).json({
        success: false,
        error: 'Необходимо заполнить все поля'
      });
    }

    // Проверка формата email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(contact)) {
      return res.status(400).json({
        success: false,
        error: 'Некорректный формат email'
      });
    }

    // Форматируем и отправляем сообщение в Telegram
    const telegramMessage = formatMessage({ name, contact, message });
    await sendTelegramMessage(telegramMessage);

    console.log(`✅ Успешно отправлена заявка от: ${name} (${contact})`);

    res.json({
      success: true,
      message: 'Сообщение успешно отправлено'
    });

  } catch (error) {
    console.error('❌ Ошибка при обработке заявки:', error);
    
    res.status(500).json({
      success: false,
      error: 'Ошибка при отправке сообщения. Пожалуйста, попробуйте позже.'
    });
  }
});

/**
 * Роут для проверки здоровья сервера
 */
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'Tamex Contact API'
  });
});

/**
 * Обработка ошибок для неизвестных роутов
 */
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint не найден'
  });
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`🚀 Сервер запущен на порту ${PORT}`);
  console.log(`📡 API endpoint: http://localhost:${PORT}/api/contact`);
  console.log(`💚 Health check: http://localhost:${PORT}/api/health`);
  
  if (TELEGRAM_BOT_TOKEN && TELEGRAM_CHAT_ID) {
    console.log(`✅ Telegram бот настроен`);
  }
});

