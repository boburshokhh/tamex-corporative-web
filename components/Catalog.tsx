import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';

export default function Catalog() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const products = [
    {
      image: '/photo/54584739_3.webp',
      title: 'Кожухотрубные теплообменники',
      description: 'Эффективные кожухотрубные теплообменники для различных технологических применений. Индивидуальное проектирование для охлаждения нефти, переработки газа и систем рекуперации тепла.'
    },
    {
      image: '/photo/55088715_3.webp',
      title: 'Центробежные насосы для нефтегазовой отрасли',
      description: 'Высокопроизводительные центробежные насосы для нефтегазовой отрасли. Многоступенчатые насосы с магнитным приводом, рассчитанные на жесткие условия эксплуатации и агрессивные среды.'
    },
    {
      image: '/photo/photo_2022-04-20_22-24-13.webp',
      title: 'Линия производства полиэтиленовых труб',
      description: 'Современные линии производства полиэтиленовых труб высокого и низкого давления. Автоматизированные системы контроля качества и производительности.'
    },
    {
      image: '/photo/photo_2022-04-20_22-35-58.webp',
      title: 'Пластинчатый теплообменник',
      description: 'Компактные пластинчатые теплообменники с высокой эффективностью теплопередачи. Легко разбираемые конструкции для удобного обслуживания и очистки.'
    },
    {
      image: '/photo/photo_2022-04-20_22-36-42.webp',
      title: 'Теплообменная секция аппарата воздушного охлаждения',
      description: 'Секции теплообмена для аппаратов воздушного охлаждения. Эффективное охлаждение технологических жидкостей в нефтегазовой и химической промышленности.'
    },
    {
      image: '/photo/photo_2022-04-20_22-42-51.webp',
      title: 'Индустриальный радиатор теплообменник',
      description: 'Промышленные радиаторные теплообменники для систем охлаждения. Надежные конструкции для работы в экстремальных условиях.'
    },
    {
      image: '/photo/photo_2022-04-20_22-47-14.webp',
      title: 'Компрессорный агрегат для СУГ',
      description: 'Промышленные компрессорные установки для переработки СУГ и природного газа. Поршневые и винтовые компрессоры с частотно-регулируемым приводом.'
    },
    {
      image: '/photo/photo_2022-04-20_22-54-54.webp',
      title: 'Фильтрующие элементы из нержавеющей стали',
      description: 'Фильтрующие элементы из нержавеющей стали и рукавные фильтры для высоких температур. Высокая эффективность фильтрации и долгий срок службы.'
    },
    {
      image: '/photo/photo_2022-04-20_23-05-04.webp',
      title: 'Установка нижнего слива 150-4',
      description: 'Установки нижнего слива и дренажные системы для промышленного применения. Надежные конструкции для эффективного удаления конденсата.'
    },
    {
      image: '/photo/photo_2022-04-20_23-07-18.webp',
      title: 'Биметаллические и термодинамические конденсатоотводчики',
      description: 'Современные конденсатоотводчики биметаллического и термодинамического типа. Автоматическое удаление конденсата с минимальными потерями пара.'
    },
    {
      image: '/photo/photo_2022-04-20_22-51-54.webp',
      title: 'Трубы из углеродистой и нержавеющей стали',
      description: 'Трубы премиального качества из углеродистой и нержавеющей стали различных типов соединений. Бесшовные и сварные трубы, соответствующие международным стандартам.'
    }
  ];

  const lightboxSlides = products.map(product => ({
    src: product.image,
    title: product.title,
    description: product.description
  }));

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  return (
    <section className="min-h-screen py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/')}
            className="group flex items-center gap-2 px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
          >
            <svg className="w-5 h-5 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="font-semibold">{t('catalog.backButton')}</span>
          </button>
        </div>

        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent mb-4 sm:mb-6 px-4">
            {t('catalog.title')}
          </h1>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto px-4">
            {t('catalog.subtitle')}
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {products.map((product, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-lg shadow-lg cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              onClick={() => openLightbox(index)}
            >
              {/* Image */}
              <div className="aspect-w-16 aspect-h-12 bg-gray-200 dark:bg-gray-800">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-48 sm:h-56 md:h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>

              {/* Overlay with info */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 text-white">
                  <h3 className="text-base sm:text-lg font-bold mb-2">{product.title}</h3>
                  <p className="text-xs sm:text-sm text-gray-200 line-clamp-2">{product.description}</p>
                  
                  {/* View icon */}
                  <div className="mt-3 sm:mt-4 flex items-center gap-2 text-blue-400">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    <span className="text-xs sm:text-sm font-semibold">{t('catalog.viewButton')}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={currentIndex}
        slides={lightboxSlides}
        carousel={{
          finite: true,
        }}
      />
    </section>
  );
}

