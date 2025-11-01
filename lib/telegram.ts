/**
 * Утилита для отправки сообщений в Telegram напрямую с фронтенда
 * 
 * ВАЖНО: Токен бота будет виден в коде клиента!
 * Для продакшена рекомендуется использовать backend.
 */

// Типы для переменных окружения
declare global {
  interface ImportMetaEnv {
    readonly VITE_TELEGRAM_BOT_TOKEN: string;
    readonly VITE_TELEGRAM_CHAT_ID: string;
  }

  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
}

interface TelegramResponse {
  ok: boolean;
  result?: any;
  description?: string;
}

/**
 * Форматирование сообщения для Telegram
 */
function formatMessage(formData: { name: string; contact: string; message: string }): string {
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
function escapeHtml(text: string): string {
  if (!text) return '';
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

/**
 * Отправка сообщения в Telegram
 */
export async function sendTelegramMessage(
  formData: { name: string; contact: string; message: string }
): Promise<void> {
  // Получаем токен и chat ID из переменных окружения
  const botToken = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
  const chatId = import.meta.env.VITE_TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    throw new Error('Не настроены переменные окружения VITE_TELEGRAM_BOT_TOKEN и VITE_TELEGRAM_CHAT_ID');
  }

  // Форматируем сообщение
  const message = formatMessage(formData);

  // URL Telegram Bot API
  const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'HTML'
      }),
    });

    const data: TelegramResponse = await response.json();

    if (!data.ok) {
      throw new Error(data.description || 'Ошибка при отправке сообщения в Telegram');
    }
  } catch (error) {
    console.error('Ошибка отправки в Telegram:', error);
    throw error;
  }
}

/**
 * Валидация данных формы
 */
export function validateFormData(formData: { name: string; contact: string; message: string }): void {
  if (!formData.name || !formData.contact || !formData.message) {
    throw new Error('Необходимо заполнить все поля');
  }

  // Проверка формата email (если это email)
  if (formData.contact.includes('@')) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.contact)) {
      throw new Error('Некорректный формат email');
    }
  }
}

