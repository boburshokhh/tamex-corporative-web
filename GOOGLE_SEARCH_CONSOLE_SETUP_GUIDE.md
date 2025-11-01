# 🎯 Пошаговый план настройки SEO через Google Search Console для Tamex Group

## 📊 ПРОБЛЕМА

При поиске **"tamexgroup"** в Google ссылка переадресовывается на `https://tamexgroup.com/ru/`, а этот роут **НЕ СУЩЕСТВУЕТ** в приложении. Текущая структура:
- ✅ `/` - главная страница
- ✅ `/catalog` - каталог  
- ❌ `/ru/`, `/uz/`, `/en/` - НЕ СУЩЕСТВУЮТ

## 🔍 ТЕКУЩАЯ АРХИТЕКТУРА

Приложение использует **клиентскую мультиязычность** через React Context (`LanguageContext`), а не отдельные URL-роуты. Язык меняется динамически без изменения URL.

## ✅ ПОШАГОВЫЙ ПЛАН РЕШЕНИЯ

### ЧАСТЬ 1: НАСТРОЙКА МУЛЬТИЯЗЫЧНЫХ РОУТОВ

#### Шаг 1: Добавить мультиязычные роуты в App.tsx

**Файл:** `App.tsx`

Нужно добавить поддержку роутов `/ru/`, `/uz/`, `/en/`:

```tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Добавить компонент-обертку для мультиязычных страниц
function LanguageWrapper({ children }: { children: React.ReactNode }) {
  const { setLanguage } = useLanguage();
  const location = useLocation();
  
  useEffect(() => {
    // Определяем язык из URL
    const path = location.pathname;
    if (path.startsWith('/ru')) {
      setLanguage('ru');
    } else if (path.startsWith('/uz')) {
      setLanguage('uz');
    } else if (path.startsWith('/en')) {
      setLanguage('en');
    }
  }, [location]);
  
  return <>{children}</>;
}

// Обновить роуты
<Routes>
  <Route path="/" element={<HomePage />} />
  <Route path="/ru" element={<LanguageWrapper><HomePage /></LanguageWrapper>} />
  <Route path="/uz" element={<LanguageWrapper><HomePage /></LanguageWrapper>} />
  <Route path="/en" element={<LanguageWrapper><HomePage /></LanguageWrapper>} />
  <Route path="/catalog" element={<Catalog />} />
  <Route path="/ru/catalog" element={<LanguageWrapper><Catalog /></LanguageWrapper>} />
  <Route path="/uz/catalog" element={<LanguageWrapper><Catalog /></LanguageWrapper>} />
  <Route path="/en/catalog" element={<LanguageWrapper><Catalog /></LanguageWrapper>} />
</Routes>
```

#### Шаг 2: Добавить редиректы в netlify.toml

**Файл:** `netlify.toml`

```toml
[[redirects]]
  from = "/ru/"
  to = "/ru"
  status = 301

[[redirects]]
  from = "/uz/"
  to = "/uz"
  status = 301

[[redirects]]
  from = "/en/"
  to = "/en"
  status = 301
```

#### Шаг 3: Обновить robots.txt

**Файл:** `public/robots.txt`

```txt
# Разрешить индексацию мультиязычных версий
Allow: /ru
Allow: /uz
Allow: /en
Allow: /ru/catalog
Allow: /uz/catalog
Allow: /en/catalog

# Canonical URLs для SEO
User-agent: *
Allow: /
Allow: /ru
Allow: /uz
Allow: /en
```

---

### ЧАСТЬ 2: НАСТРОЙКА GOOGLE SEARCH CONSOLE

#### Шаг 1: Подготовка аккаунта

1. **Войдите в Google Search Console**
   - Откройте: https://search.google.com/search-console
   - Используйте корпоративный Google-аккаунт

2. **Выберите тип ресурса**
   - Нажмите "Добавить ресурс"
   - Выберите **"Префикс URL"**
   - Введите: `https://tamexgroup.com`

#### Шаг 2: Проверка права владения

**Метод 1: HTML-тег (рекомендуется)**

Google предоставит тег для вставки:

```html
<meta name="google-site-verification" content="ВАШ_КОД_VERIFICATION" />
```

**Вставьте в `index.html`:**
```html
<head>
  <!-- Другие meta теги -->
  <meta name="google-site-verification" content="ВАШ_КОД_VERIFICATION" />
</head>
```

**Метод 2: DNS-запись**
- Добавьте TXT-запись в настройки DNS домена
- Google предоставит инструкции

#### Шаг 3: Отправка Sitemap

1. **В Search Console:**
   - Перейдите в **"Sitemaps"** в меню
   - Нажмите "Отправить новую карту сайта"
   - Введите: `https://tamexgroup.com/sitemap.xml`

2. **Отправьте все карты:**
   - `https://tamexgroup.com/sitemap.xml` (основная)
   - `https://tamexgroup.com/sitemap-main.xml`
   - `https://tamexgroup.com/sitemap-products.xml`
   - `https://tamexgroup.com/sitemap-blog.xml` (если есть)
   - `https://tamexgroup.com/sitemap-images.xml`

#### Шаг 4: Настройка параметров

**В разделе "Настройки":**

1. **Предпочтительный домен**
   - Выберите `https://tamexgroup.com` (без www)
   - Нажмите "Сохранить"

2. **Параметры URL**
   - В разделе "Параметры" добавьте:
     - `lang` - навигация (если планируется)

#### Шаг 5: Исправление проблемы с /ru/

**Вариант A: Редирект в Search Console (быстрое решение)**

1. **В Search Console:**
   - Перейдите в **"Удаление URL"** → **"Новая заявка"**
   - Выберите **"Временно скрыть и запретить отображение в поиске"**
   - Введите: `https://tamexgroup.com/ru/`
   - Подтвердите

2. **Установите временный редирект в netlify.toml:**
```toml
[[redirects]]
  from = "/ru/"
  to = "/"
  status = 301
  force = true
```

**Вариант B: Полная реализация мультиязычности (правильное решение)**

Следуйте Части 1 этого руководства.

---

### ЧАСТЬ 3: НАСТРОЙКА ИНДЕКСАЦИИ И КАНОНИЗАЦИИ

#### Шаг 1: Добавить hreflang разметку

**Файл:** `components/SEO.tsx` (обновить):

```tsx
export default function SEO({ 
  title, 
  description, 
  keywords,
  currentPath = window.location.pathname 
}: SEOProps) {
  const { language } = useLanguage();
  
  // Получаем базовый путь без языка
  const basePath = currentPath.replace(/^\/(ru|uz|en)/, '') || '/';
  
  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        
        {/* Canonical URL */}
        <link rel="canonical" href={`https://tamexgroup.com${basePath}`} />
        
        {/* Hreflang для мультиязычности */}
        <link rel="alternate" hreflang="ru" href={`https://tamexgroup.com/ru${basePath}`} />
        <link rel="alternate" hreflang="uz" href={`https://tamexgroup.com/uz${basePath}`} />
        <link rel="alternate" hreflang="en" href={`https://tamexgroup.com/en${basePath}`} />
        <link rel="alternate" hreflang="x-default" href={`https://tamexgroup.com${basePath}`} />
        
        {/* Open Graph */}
        <meta property="og:url" content={`https://tamexgroup.com${currentPath}`} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
      </Helmet>
    </>
  );
}
```

#### Шаг 2: Обновить sitemap для мультиязычности

**Файл:** `public/sitemap-main.xml`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  
  <!-- Главная страница -->
  <url>
    <loc>https://tamexgroup.com/</loc>
    <lastmod>2025-01-15</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
    <xhtml:link rel="alternate" hreflang="ru" href="https://tamexgroup.com/ru" />
    <xhtml:link rel="alternate" hreflang="uz" href="https://tamexgroup.com/uz" />
    <xhtml:link rel="alternate" hreflang="en" href="https://tamexgroup.com/en" />
    <xhtml:link rel="alternate" hreflang="x-default" href="https://tamexgroup.com/" />
  </url>
  
  <!-- Каталог -->
  <url>
    <loc>https://tamexgroup.com/catalog</loc>
    <lastmod>2025-01-15</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
    <xhtml:link rel="alternate" hreflang="ru" href="https://tamexgroup.com/ru/catalog" />
    <xhtml:link rel="alternate" hreflang="uz" href="https://tamexgroup.com/uz/catalog" />
    <xhtml:link rel="alternate" hreflang="en" href="https://tamexgroup.com/en/catalog" />
    <xhtml:link rel="alternate" hreflang="x-default" href="https://tamexgroup.com/catalog" />
  </url>
  
</urlset>
```

---

### ЧАСТЬ 4: МОНИТОРИНГ И ОПТИМИЗАЦИЯ

#### Шаг 1: Проверка индексации

1. **Используйте инструмент "Проверка URL":**
   - В Search Console введите `https://tamexgroup.com`
   - Проверьте статус индексации
   - Убедитесь, что нет ошибок

2. **Проверьте покрытие:**
   - Перейдите в **"Покрытие"**
   - Устраните ошибки (404, дубликаты и т.д.)

#### Шаг 2: Мониторинг производительности

1. **Проверьте "Производительность":**
   - Отслеживайте позиции по ключевым запросам:
     - "tamexgroup"
     - "нефтегазовое оборудование ташкент"
     - "поставщик оборудования узбекистан"

2. **Анализируйте CTR:**
   - Оптимизируйте title и description для улучшения кликабельности

#### Шаг 3: Регулярное обновление

- **Еженедельно:** Проверяйте новые ошибки индексации
- **Ежемесячно:** Обновляйте sitemap.xml
- **Ежеквартально:** Анализируйте производительность и оптимизируйте контент

---

### ЧАСТЬ 5: ВАЖНЫЕ НАСТРОЙКИ NETLIFY

**Файл:** `netlify.toml`

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/ru/*"
  to = "/ru/:splat"
  status = 301

[[redirects]]
  from = "/uz/*"
  to = "/uz/:splat"
  status = 301

[[redirects]]
  from = "/en/*"
  to = "/en/:splat"
  status = 301

# Редирект домена с www на без www
[[redirects]]
  from = "https://www.tamexgroup.com/*"
  to = "https://tamexgroup.com/:splat"
  status = 301
  force = true

# SPA fallback
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

---

## 🚨 ВАЖНЫЕ ЗАМЕЧАНИЯ

### ⚠️ ВАРИАНТ 1: БЫСТРОЕ РЕШЕНИЕ (для немедленного исправления)

Если нужно срочно исправить проблему с `/ru/`:

1. **Добавьте редирект:**
```toml
# netlify.toml
[[redirects]]
  from = "/ru/*"
  to = "/"
  status = 301
```

2. **В Search Console:**
   - Запросите удаление `https://tamexgroup.com/ru/`
   - Дождитесь переиндексации (1-2 недели)

### ✅ ВАРИАНТ 2: ПОЛНОЕ РЕШЕНИЕ (рекомендуется)

Реализуйте мультиязычные роуты согласно Части 1.

---

## 📞 НЕОБХОДИМЫЕ ДЕЙСТВИЯ

1. ✅ Проверить DNS и SSL
2. ✅ Проверить права доступа к Search Console
3. ✅ Реализовать мультиязычные роуты
4. ✅ Настроить редиректы в Netlify
5. ✅ Обновить sitemap.xml
6. ✅ Добавить hreflang разметку
7. ✅ Запросить переиндексацию в Search Console

---

## 📈 ОЖИДАЕМЫЕ РЕЗУЛЬТАТЫ

После реализации:

✅ Поиск "tamexgroup" покажет главную страницу
✅ Мультиязычные версии будут доступны по /ru, /uz, /en
✅ Google правильно индексирует все языковые версии
✅ Улучшение CTR и позиций в поисковой выдаче

---

## ⏱️ СРОКИ

- **Настройка Search Console:** 1 день
- **Реализация мультиязычных роутов:** 2-3 дня
- **Переиндексация Google:** 1-4 недели
- **Появление результатов:** 4-6 недель

---

## 📚 ДОПОЛНИТЕЛЬНЫЕ РЕСУРСЫ

- [Google Search Console Help](https://support.google.com/webmasters)
- [International SEO](https://developers.google.com/search/docs/advanced/crawling/localized-versions)
- [Sitemap Protocol](https://www.sitemaps.org/protocol.html)

