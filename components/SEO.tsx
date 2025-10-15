import { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
}

export default function SEO({
  title = "ООО «Tamex» - Поставщик нефтегазового оборудования | Ташкент, Узбекистан",
  description = "ООО «Tamex» - надежный поставщик нефтегазового и промышленного оборудования. Прямые контракты с заводами-производителями. Оперативные поставки для предприятий Узбекистана и Казахстана.",
  keywords = "нефтегазовое оборудование, промышленное оборудование, поставщик оборудования, Узбекистан, Ташкент, Казахстан, Тараз, фонтанная арматура, ПВО, насосы, компрессоры, трубы, фитинги, КИПиА, буровое оборудование",
  image = "https://tamex-corporate-website.netlify.app/photo/3-1.jpg",
  url = "https://tamex-corporate-website.netlify.app/",
  type = "website"
}: SEOProps) {
  useEffect(() => {
    // Обновляем title
    document.title = title;

    // Обновляем meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    }

    // Обновляем meta keywords
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', keywords);
    }

    // Обновляем Open Graph теги
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', title);
    }

    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute('content', description);
    }

    const ogImage = document.querySelector('meta[property="og:image"]');
    if (ogImage) {
      ogImage.setAttribute('content', image);
    }

    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) {
      ogUrl.setAttribute('content', url);
    }

    const ogType = document.querySelector('meta[property="og:type"]');
    if (ogType) {
      ogType.setAttribute('content', type);
    }

    // Обновляем Twitter теги
    const twitterTitle = document.querySelector('meta[property="twitter:title"]');
    if (twitterTitle) {
      twitterTitle.setAttribute('content', title);
    }

    const twitterDescription = document.querySelector('meta[property="twitter:description"]');
    if (twitterDescription) {
      twitterDescription.setAttribute('content', description);
    }

    const twitterImage = document.querySelector('meta[property="twitter:image"]');
    if (twitterImage) {
      twitterImage.setAttribute('content', image);
    }

    // Обновляем canonical URL
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', url);
    }
  }, [title, description, keywords, image, url, type]);

  return null;
}
