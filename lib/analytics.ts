// Google Analytics 4
export const GA_TRACKING_ID = 'G-XXXXXXXXXX'; // Замените на ваш ID

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
    });
  }
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label, value }: {
  action: string;
  category: string;
  label?: string;
  value?: number;
}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Яндекс.Метрика
export const YANDEX_METRIKA_ID = '12345678'; // Замените на ваш ID

// Функция для отправки целей в Яндекс.Метрику
export const reachGoal = (goalName: string) => {
  if (typeof window !== 'undefined' && window.ym) {
    window.ym(YANDEX_METRIKA_ID, 'reachGoal', goalName);
  }
};

// Функция для отправки параметров визита
export const setUserParams = (params: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.ym) {
    window.ym(YANDEX_METRIKA_ID, 'userParams', params);
  }
};

// Типы для TypeScript
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    ym: (id: string, method: string, ...args: any[]) => void;
  }
}
