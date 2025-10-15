# 🏷️ SEO СТРАТЕГИЯ ДЛЯ ООО «TAMEX» - ЧАСТЬ 3: META-ТЕГИ И HTML

## 📄 1. ОПТИМИЗИРОВАННЫЕ META-ТЕГИ ДЛЯ КЛЮЧЕВЫХ СТРАНИЦ

### 1.1 ГЛАВНАЯ СТРАНИЦА

```html
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  
  <!-- Primary Meta Tags -->
  <title>Нефтегазовое оборудование из Китая | Поставщик ООО «Tamex» | Ташкент</title>
  <meta name="title" content="Нефтегазовое оборудование из Китая | Поставщик ООО «Tamex» | Ташкент">
  <meta name="description" content="ООО «Tamex» — официальный поставщик нефтегазового и промышленного оборудования из Китая в Узбекистане. Прямые контракты с заводами ⚡ Оперативные поставки ⚡ Техподдержка 24/7 ☎ +998-95-123-01-23">
  <meta name="keywords" content="нефтегазовое оборудование, промышленное оборудование Узбекистан, поставщик оборудования Ташкент, оборудование из Китая, фонтанная арматура, ПВО, буровое оборудование, насосы для нефтедобычи, компрессоры промышленные">
  <meta name="author" content="ООО «Tamex»">
  <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1">
  <meta name="googlebot" content="index, follow">
  
  <!-- Canonical URL -->
  <link rel="canonical" href="https://tamexgroup.com/">
  
  <!-- Hreflang для мультиязычности -->
  <link rel="alternate" hreflang="ru" href="https://tamexgroup.com/ru/">
  <link rel="alternate" hreflang="uz" href="https://tamexgroup.com/uz/">
  <link rel="alternate" hreflang="en" href="https://tamexgroup.com/en/">
  <link rel="alternate" hreflang="x-default" href="https://tamexgroup.com/">
  
  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://tamexgroup.com/">
  <meta property="og:title" content="Нефтегазовое оборудование из Китая | ООО «Tamex» Узбекистан">
  <meta property="og:description" content="Официальный поставщик нефтегазового и промышленного оборудования из Китая. Прямые контракты с заводами. Оперативные поставки для предприятий Узбекистана и СНГ.">
  <meta property="og:image" content="https://tamexgroup.com/images/og-image-main.jpg">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="ООО Tamex - нефтегазовое оборудование">
  <meta property="og:site_name" content="TAMEXGROUP">
  <meta property="og:locale" content="ru_RU">
  
  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:url" content="https://tamexgroup.com/">
  <meta name="twitter:title" content="Нефтегазовое оборудование из Китая | ООО «Tamex»">
  <meta name="twitter:description" content="Официальный поставщик нефтегазового оборудования из Китая в Узбекистане. Прямые контракты с заводами.">
  <meta name="twitter:image" content="https://tamexgroup.com/images/og-image-main.jpg">
  
  <!-- Geo Tags -->
  <meta name="geo.region" content="UZ">
  <meta name="geo.placename" content="Ташкент">
  <meta name="geo.position" content="41.2995;69.2401">
  <meta name="ICBM" content="41.2995, 69.2401">
  
  <!-- Additional Meta -->
  <meta name="language" content="Russian">
  <meta name="revisit-after" content="3 days">
  <meta name="distribution" content="global">
  <meta name="rating" content="general">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  
  <!-- Schema.org structured data -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "ООО «Tamex»",
    "alternateName": "TAMEXGROUP",
    "url": "https://tamexgroup.com/",
    "logo": {
      "@type": "ImageObject",
      "url": "https://tamexgroup.com/logo.png",
      "width": 250,
      "height": 60
    },
    "description": "Надежный поставщик нефтегазового и промышленного оборудования из Китая",
    "foundingDate": "2024-09-20",
    "address": [
      {
        "@type": "PostalAddress",
        "streetAddress": "ул. Абдуллы Каххара, д. 42а",
        "addressLocality": "Ташкент",
        "addressRegion": "Яккасарайский район",
        "postalCode": "100000",
        "addressCountry": "UZ"
      },
      {
        "@type": "PostalAddress",
        "streetAddress": "ул. Махмута Аширова, д. 19",
        "addressLocality": "Тараз",
        "addressRegion": "Жамбылская область",
        "postalCode": "080000",
        "addressCountry": "KZ"
      }
    ],
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "telephone": "+998-95-123-01-23",
        "contactType": "sales",
        "areaServed": ["UZ", "KZ"],
        "availableLanguage": ["Russian", "Uzbek", "English"]
      }
    ],
    "email": "info@tamexgroup.com",
    "sameAs": [
      "https://www.facebook.com/tamexgroup",
      "https://www.linkedin.com/company/tamexgroup",
      "https://t.me/tamexgroup"
    ],
    "areaServed": {
      "@type": "Place",
      "name": ["Узбекистан", "Казахстан", "СНГ"]
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Каталог нефтегазового оборудования",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Product",
            "name": "Фонтанная арматура",
            "description": "Фонтанная арматура для нефтяных и газовых скважин"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Product",
            "name": "ПВО оборудование",
            "description": "Противовыбросовое оборудование"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Product",
            "name": "Буровое оборудование",
            "description": "Буровые установки и инструмент"
          }
        }
      ]
    }
  }
  </script>

  <!-- BreadcrumbList Schema -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [{
      "@type": "ListItem",
      "position": 1,
      "name": "Главная",
      "item": "https://tamexgroup.com/"
    }]
  }
  </script>
</head>
```

### 1.2 СТРАНИЦА "КАТАЛОГ"

```html
<head>
  <!-- Primary Meta Tags -->
  <title>Каталог нефтегазового оборудования - более 500 позиций | ООО «Tamex»</title>
  <meta name="title" content="Каталог нефтегазового оборудования - более 500 позиций | ООО «Tamex»">
  <meta name="description" content="Полный каталог нефтегазового оборудования: фонтанная арматура, ПВО, насосы, компрессоры, трубы, КИПиА, буровое оборудование. ✓ Прямые поставки из Китая ✓ Гарантия ✓ Техподдержка ☎ +998-95-123-01-23">
  <meta name="keywords" content="каталог нефтегазового оборудования, купить нефтегазовое оборудование, фонтанная арматура купить, ПВО оборудование, буровое оборудование каталог, промышленные насосы Узбекистан">
  <meta name="robots" content="index, follow">
  
  <!-- Canonical URL -->
  <link rel="canonical" href="https://tamexgroup.com/katalog/">
  
  <!-- Open Graph -->
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://tamexgroup.com/katalog/">
  <meta property="og:title" content="Каталог нефтегазового оборудования | ООО «Tamex»">
  <meta property="og:description" content="Более 500 позиций нефтегазового оборудования от проверенных китайских производителей. Прямые поставки, гарантия качества.">
  <meta property="og:image" content="https://tamexgroup.com/images/catalog-preview.jpg">
  
  <!-- Schema.org Product Catalog -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Каталог нефтегазового оборудования",
    "description": "Полный каталог нефтегазового и промышленного оборудования от ООО «Tamex»",
    "url": "https://tamexgroup.com/katalog/",
    "mainEntity": {
      "@type": "ItemList",
      "name": "Категории оборудования",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "url": "https://tamexgroup.com/katalog/fontannaya-armatura/",
          "name": "Фонтанная арматура"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "url": "https://tamexgroup.com/katalog/pvo-oborudovanie/",
          "name": "ПВО оборудование"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "url": "https://tamexgroup.com/katalog/nasosy/",
          "name": "Насосы"
        },
        {
          "@type": "ListItem",
          "position": 4,
          "url": "https://tamexgroup.com/katalog/kompressory/",
          "name": "Компрессоры"
        }
      ]
    }
  }
  </script>

  <!-- Breadcrumb Schema -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Главная",
        "item": "https://tamexgroup.com/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Каталог",
        "item": "https://tamexgroup.com/katalog/"
      }
    ]
  }
  </script>
</head>
```

### 1.3 СТРАНИЦА КАТЕГОРИИ "ФОНТАННАЯ АРМАТУРА"

```html
<head>
  <!-- Primary Meta Tags -->
  <title>Фонтанная арматура купить в Узбекистане | Цены, характеристики | Tamex</title>
  <meta name="description" content="Продажа фонтанной арматуры в Узбекистане и Казахстане. ✓ Прямые поставки от производителей ✓ Сертифицированное оборудование ✓ Техническая документация ✓ Гарантия. Звоните: +998-95-123-01-23">
  <meta name="keywords" content="фонтанная арматура купить, фонтанная арматура Узбекистан, фонтанная арматура цена, оборудование для нефтяных скважин, wellhead equipment">
  <meta name="robots" content="index, follow">
  
  <link rel="canonical" href="https://tamexgroup.com/katalog/fontannaya-armatura/">
  
  <!-- Open Graph -->
  <meta property="og:type" content="product.group">
  <meta property="og:url" content="https://tamexgroup.com/katalog/fontannaya-armatura/">
  <meta property="og:title" content="Фонтанная арматура для нефтяных скважин | ООО «Tamex»">
  <meta property="og:description" content="Широкий выбор фонтанной арматуры от ведущих китайских производителей. Качество, сертификация, гарантия.">
  <meta property="og:image" content="https://tamexgroup.com/images/fontannaya-armatura-category.jpg">
  
  <!-- Schema.org -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "ProductCollection",
    "name": "Фонтанная арматура",
    "description": "Фонтанная арматура для нефтяных и газовых скважин различных диаметров и рабочих давлений",
    "url": "https://tamexgroup.com/katalog/fontannaya-armatura/",
    "brand": {
      "@type": "Brand",
      "name": "Различные производители"
    },
    "offers": {
      "@type": "AggregateOffer",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock",
      "url": "https://tamexgroup.com/katalog/fontannaya-armatura/",
      "seller": {
        "@type": "Organization",
        "name": "ООО «Tamex»"
      }
    }
  }
  </script>

  <!-- Breadcrumb -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Главная",
        "item": "https://tamexgroup.com/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Каталог",
        "item": "https://tamexgroup.com/katalog/"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Фонтанная арматура",
        "item": "https://tamexgroup.com/katalog/fontannaya-armatura/"
      }
    ]
  }
  </script>
</head>
```

### 1.4 СТРАНИЦА ТОВАРА

```html
<head>
  <!-- Primary Meta Tags -->
  <title>Фонтанная арматура FA-65-210 купить | Цена, характеристики | Tamex</title>
  <meta name="description" content="Фонтанная арматура FA-65-210 для нефтяных скважин. Давление 21 МПа (210 атм), диаметр 65 мм. ✓ В наличии ✓ Сертификаты ✓ Техдокументация ✓ Доставка по Узбекистану. Цена: по запросу ☎ +998-95-123-01-23">
  <meta name="keywords" content="фонтанная арматура FA-65-210, купить фонтанную арматуру 65мм, оборудование для скважин 210 атм">
  <meta name="robots" content="index, follow">
  
  <link rel="canonical" href="https://tamexgroup.com/katalog/fontannaya-armatura/fa-65-210/">
  
  <!-- Open Graph -->
  <meta property="og:type" content="product">
  <meta property="og:url" content="https://tamexgroup.com/katalog/fontannaya-armatura/fa-65-210/">
  <meta property="og:title" content="Фонтанная арматура FA-65-210 | ООО «Tamex»">
  <meta property="og:description" content="Фонтанная арматура FA-65-210 для нефтяных скважин. Давление 21 МПа, диаметр 65 мм. В наличии.">
  <meta property="og:image" content="https://tamexgroup.com/images/products/fa-65-210-main.jpg">
  <meta property="product:price:amount" content="По запросу">
  <meta property="product:price:currency" content="USD">
  
  <!-- Schema.org Product -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Фонтанная арматура FA-65-210",
    "image": [
      "https://tamexgroup.com/images/products/fa-65-210-main.jpg",
      "https://tamexgroup.com/images/products/fa-65-210-side.jpg"
    ],
    "description": "Фонтанная арматура FA-65-210 предназначена для управления и контроля потока нефти и газа в скважинах. Рабочее давление 21 МПа (210 атм), диаметр прохода 65 мм.",
    "sku": "FA-65-210",
    "mpn": "FA-65-210",
    "brand": {
      "@type": "Brand",
      "name": "Китайский производитель"
    },
    "offers": {
      "@type": "Offer",
      "url": "https://tamexgroup.com/katalog/fontannaya-armatura/fa-65-210/",
      "priceCurrency": "USD",
      "price": "0",
      "priceValidUntil": "2025-12-31",
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": "ООО «Tamex»"
      },
      "itemCondition": "https://schema.org/NewCondition",
      "shippingDetails": {
        "@type": "OfferShippingDetails",
        "shippingDestination": {
          "@type": "DefinedRegion",
          "addressCountry": ["UZ", "KZ"]
        }
      }
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "12"
    },
    "additionalProperty": [
      {
        "@type": "PropertyValue",
        "name": "Рабочее давление",
        "value": "21 МПа (210 атм)"
      },
      {
        "@type": "PropertyValue",
        "name": "Диаметр прохода",
        "value": "65 мм"
      },
      {
        "@type": "PropertyValue",
        "name": "Материал",
        "value": "Легированная сталь"
      },
      {
        "@type": "PropertyValue",
        "name": "Температурный диапазон",
        "value": "-20°C до +120°C"
      }
    ]
  }
  </script>

  <!-- Breadcrumb -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Главная",
        "item": "https://tamexgroup.com/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Каталог",
        "item": "https://tamexgroup.com/katalog/"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Фонтанная арматура",
        "item": "https://tamexgroup.com/katalog/fontannaya-armatura/"
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": "FA-65-210",
        "item": "https://tamexgroup.com/katalog/fontannaya-armatura/fa-65-210/"
      }
    ]
  }
  </script>
</head>
```

### 1.5 БЛОГ - СТАТЬЯ

```html
<head>
  <!-- Primary Meta Tags -->
  <title>Как выбрать компрессор для буровой установки: руководство 2025 | Блог Tamex</title>
  <meta name="description" content="Подробное руководство по выбору компрессора для буровой установки. Рассматриваем типы компрессоров, технические характеристики, производительность и стоимость. Советы от экспертов ООО «Tamex».">
  <meta name="keywords" content="как выбрать компрессор, компрессор для буровой, выбор бурового оборудования, промышленные компрессоры">
  <meta name="robots" content="index, follow">
  <meta name="article:published_time" content="2025-01-15T10:00:00+05:00">
  <meta name="article:modified_time" content="2025-01-15T10:00:00+05:00">
  <meta name="article:author" content="Эксперты ООО «Tamex»">
  
  <link rel="canonical" href="https://tamexgroup.com/blog/kak-vybrat-kompressor-dlya-burovoj/">
  
  <!-- Open Graph -->
  <meta property="og:type" content="article">
  <meta property="og:url" content="https://tamexgroup.com/blog/kak-vybrat-kompressor-dlya-burovoj/">
  <meta property="og:title" content="Как выбрать компрессор для буровой установки | Блог Tamex">
  <meta property="og:description" content="Экспертное руководство по выбору компрессора для буровой установки. Все, что нужно знать перед покупкой.">
  <meta property="og:image" content="https://tamexgroup.com/images/blog/kompressor-burovaya.jpg">
  <meta property="article:published_time" content="2025-01-15T10:00:00+05:00">
  <meta property="article:author" content="ООО «Tamex»">
  <meta property="article:section" content="Обзоры оборудования">
  
  <!-- Schema.org Article -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Как выбрать компрессор для буровой установки: полное руководство 2025",
    "alternativeHeadline": "Критерии выбора компрессора для буровых работ",
    "image": "https://tamexgroup.com/images/blog/kompressor-burovaya.jpg",
    "author": {
      "@type": "Organization",
      "name": "ООО «Tamex»",
      "url": "https://tamexgroup.com/"
    },
    "publisher": {
      "@type": "Organization",
      "name": "ООО «Tamex»",
      "logo": {
        "@type": "ImageObject",
        "url": "https://tamexgroup.com/logo.png"
      }
    },
    "datePublished": "2025-01-15T10:00:00+05:00",
    "dateModified": "2025-01-15T10:00:00+05:00",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://tamexgroup.com/blog/kak-vybrat-kompressor-dlya-burovoj/"
    },
    "articleBody": "Полный текст статьи...",
    "keywords": ["компрессор", "буровая установка", "выбор оборудования", "промышленные компрессоры"]
  }
  </script>

  <!-- FAQ Schema (если есть FAQ в статье) -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Какой тип компрессора лучше для буровой установки?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Для буровых установок чаще всего используются винтовые или поршневые компрессоры высокого давления. Выбор зависит от требуемой производительности и глубины бурения."
        }
      }
    ]
  }
  </script>
</head>
```

## 📱 2. ПРИМЕР ПОЛНОГО HTML ГЛАВНОЙ СТРАНИЦЫ (ФРАГМЕНТ)

```html
<!DOCTYPE html>
<html lang="ru">
<head>
  <!-- META-теги из примера 1.1 -->
</head>
<body>
  <!-- Header с навигацией -->
  <header>
    <nav>
      <a href="/" title="Главная страница ООО Tamex">Главная</a>
      <a href="/katalog/" title="Каталог нефтегазового оборудования">Каталог</a>
      <a href="/uslugi/" title="Услуги компании Tamex">Услуги</a>
      <a href="/o-kompanii/" title="О компании Tamex">О компании</a>
      <a href="/blog/" title="Блог о нефтегазовом оборудовании">Блог</a>
      <a href="/kontakty/" title="Контакты офисов в Ташкенте и Таразе">Контакты</a>
    </nav>
  </header>

  <!-- Hero Section -->
  <section class="hero">
    <h1>Надежные поставки нефтегазового и промышленного оборудования из Китая</h1>
    <h2>Прямые контракты с заводами-производителями для предприятий Узбекистана и Казахстана</h2>
    <p>ООО «Tamex» — официальный поставщик с 2024 года. Оперативные поставки, техническая поддержка, гарантия качества.</p>
    <a href="/katalog/" title="Перейти в каталог оборудования">Каталог оборудования</a>
    <a href="#contact" title="Запросить коммерческое предложение">Запросить КП</a>
  </section>

  <!-- Advantages Section -->
  <section class="advantages">
    <h2>Почему выбирают ООО «Tamex»</h2>
    <article>
      <h3>Прямые поставки от заводов</h3>
      <p>Работаем напрямую с китайскими производителями нефтегазового оборудования без посредников</p>
    </article>
    <article>
      <h3>Гибкая логистика</h3>
      <p>Оперативная доставка оборудования в Узбекистан и Казахстан собственной логистической службой</p>
    </article>
    <article>
      <h3>Опыт с крупными предприятиями</h3>
      <p>Поставляем оборудование для Узбекнефтегаз, AGMK, Uzbekistan GTL и других лидеров отрасли</p>
    </article>
    <article>
      <h3>Техническая поддержка 24/7</h3>
      <p>Сервисное обслуживание и техническая поддержка на протяжении всего срока эксплуатации</p>
    </article>
  </section>

  <!-- Catalog Preview -->
  <section class="catalog-preview">
    <h2>Каталог нефтегазового оборудования</h2>
    <p>Полный ассортимент промышленного оборудования для нефтегазовой отрасли</p>
    
    <article>
      <h3><a href="/katalog/fontannaya-armatura/" title="Фонтанная арматура для скважин">Фонтанная арматура</a></h3>
      <img src="/images/fontannaya-armatura.jpg" alt="Фонтанная арматура для нефтяных скважин" width="300" height="200" loading="lazy">
      <p>Фонтанная арматура различных диаметров и рабочих давлений для нефтяных и газовых скважин</p>
      <a href="/katalog/fontannaya-armatura/" title="Перейти в раздел Фонтанная арматура">Подробнее →</a>
    </article>

    <article>
      <h3><a href="/katalog/pvo-oborudovanie/" title="ПВО оборудование купить">ПВО оборудование</a></h3>
      <img src="/images/pvo-oborudovanie.jpg" alt="Противовыбросовое оборудование ПВО" width="300" height="200" loading="lazy">
      <p>Противовыбросовое оборудование для безопасности буровых работ. Сертифицировано по API</p>
      <a href="/katalog/pvo-oborudovanie/" title="Перейти в раздел ПВО оборудование">Подробнее →</a>
    </article>

    <article>
      <h3><a href="/katalog/nasosy/" title="Насосы промышленные купить">Промышленные насосы</a></h3>
      <img src="/images/nasosy.jpg" alt="Промышленные насосы для нефтедобычи" width="300" height="200" loading="lazy">
      <p>Центробежные, погружные, винтовые насосы для нефтегазовой промышленности</p>
      <a href="/katalog/nasosy/" title="Перейти в раздел Насосы">Подробнее →</a>
    </article>
  </section>

  <!-- Contact Form -->
  <section id="contact" class="contact-section">
    <h2>Запросить коммерческое предложение</h2>
    <p>Оставьте заявку, и наш специалист свяжется с вами в течение 30 минут</p>
    <form action="/send-request/" method="POST">
      <label for="name">ФИО *</label>
      <input type="text" id="name" name="name" required aria-required="true">
      
      <label for="company">Компания *</label>
      <input type="text" id="company" name="company" required aria-required="true">
      
      <label for="phone">Телефон *</label>
      <input type="tel" id="phone" name="phone" required aria-required="true">
      
      <label for="email">Email *</label>
      <input type="email" id="email" name="email" required aria-required="true">
      
      <label for="message">Комментарий</label>
      <textarea id="message" name="message" rows="4"></textarea>
      
      <button type="submit">Отправить запрос</button>
    </form>
  </section>

  <!-- Footer -->
  <footer>
    <div class="footer-content">
      <div>
        <h3>ООО «Tamex»</h3>
        <p>Поставщик нефтегазового оборудования из Китая</p>
        <p>Основана: 20 сентября 2024 года</p>
      </div>
      <div>
        <h4>Каталог</h4>
        <ul>
          <li><a href="/katalog/fontannaya-armatura/" title="Фонтанная арматура">Фонтанная арматура</a></li>
          <li><a href="/katalog/pvo-oborudovanie/" title="ПВО оборудование">ПВО оборудование</a></li>
          <li><a href="/katalog/nasosy/" title="Насосы">Насосы</a></li>
          <li><a href="/katalog/kompressory/" title="Компрессоры">Компрессоры</a></li>
        </ul>
      </div>
      <div>
        <h4>Компания</h4>
        <ul>
          <li><a href="/o-kompanii/" title="О компании">О компании</a></li>
          <li><a href="/uslugi/" title="Услуги">Услуги</a></li>
          <li><a href="/proyekty/" title="Проекты">Проекты</a></li>
          <li><a href="/blog/" title="Блог">Блог</a></li>
        </ul>
      </div>
      <div>
        <h4>Контакты</h4>
        <p>Ташкент: <a href="tel:+998951230123">+998-95-123-01-23</a></p>
        <p>Email: <a href="mailto:info@tamexgroup.com">info@tamexgroup.com</a></p>
        <p>ул. Абдуллы Каххара, д. 42а</p>
      </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; 2024-2025 ООО «Tamex». Все права защищены.</p>
      <a href="/sitemap.xml" title="Карта сайта">Карта сайта</a>
      <a href="/privacy-policy/" title="Политика конфиденциальности">Политика конфиденциальности</a>
    </div>
  </footer>
</body>
</html>
```

## 🎯 3. ПРАВИЛА ОПТИМИЗАЦИИ ALT-ТЕГОВ ДЛЯ ИЗОБРАЖЕНИЙ

### 3.1 Примеры правильных alt-тегов:

✅ **ПРАВИЛЬНО:**
```html
<img src="/images/fontannaya-armatura-fa-65-210.jpg" 
     alt="Фонтанная арматура FA-65-210 с рабочим давлением 21 МПа для нефтяных скважин" 
     width="600" height="400" loading="lazy">

<img src="/images/nasos-neftyanoj-cnp-100.jpg" 
     alt="Центробежный нефтяной насос CNP-100 производительность 100 м3/ч" 
     width="600" height="400" loading="lazy">

<img src="/images/kompressor-vintovoj-5000.jpg" 
     alt="Винтовой компрессор высокого давления для буровой установки" 
     width="600" height="400" loading="lazy">
```

❌ **НЕПРАВИЛЬНО:**
```html
<img src="/images/product1.jpg" alt="Продукт 1">
<img src="/images/img_0001.jpg" alt="">
<img src="/images/equipment.jpg" alt="оборудование">
```

### 3.2 Структура alt-тега:
1. **Название продукта/объекта**
2. **Ключевая характеристика**
3. **Применение/назначение**

---

**Следующая часть:** ЧАСТЬ 4 - Контент-план для блога

