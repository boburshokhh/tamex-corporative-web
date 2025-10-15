// Google Analytics 4
// ИНСТРУКЦИЯ: Замените G-XXXXXXXXXX на ваш реальный Measurement ID из Google Analytics
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
// ИНСТРУКЦИЯ: Замените 12345678 на ваш реальный счетчик из Яндекс.Метрики
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

// Дополнительные функции для отслеживания конверсий
export const trackFormSubmission = (formName: string) => {
  // Google Analytics
  event({
    action: 'form_submit',
    category: 'engagement',
    label: formName,
    value: 1
  });
  
  // Яндекс.Метрика
  reachGoal('form_submit');
};

export const trackPhoneClick = (phoneNumber: string) => {
  // Google Analytics
  event({
    action: 'phone_click',
    category: 'engagement',
    label: phoneNumber,
    value: 1
  });
  
  // Яндекс.Метрика
  reachGoal('phone_click');
};

export const trackCatalogView = (category: string) => {
  // Google Analytics
  event({
    action: 'catalog_view',
    category: 'engagement',
    label: category,
    value: 1
  });
  
  // Яндекс.Метрика
  reachGoal('catalog_view');
};

export const trackProductView = (productName: string) => {
  // Google Analytics
  event({
    action: 'product_view',
    category: 'engagement',
    label: productName,
    value: 1
  });
  
  // Яндекс.Метрика
  reachGoal('product_view');
};

// Типы для TypeScript
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    ym: (id: string, method: string, ...args: any[]) => void;
  }
}
