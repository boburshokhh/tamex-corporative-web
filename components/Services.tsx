import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';


export default function Services() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleCatalogClick = () => {
    navigate('/catalog');
  };

  // Все товары
  const allProducts = [
    {
      image: '/photos/Вибросита.png',
      titleKey: 'products.vibratingScreens'
    },
    {
      image: '/photos/Шламовые баки.jpg',
      titleKey: 'products.mudTanks'
    },
    {
      image: '/photos/Блок манифольдов.jpg',
      titleKey: 'products.manifoldBlocks'
    },
    {
      image: '/photos/Буровые насосы.png',
      titleKey: 'products.drillingPumps'
    },
    {
      image: '/photos/Буровые долото.webp',
      titleKey: 'products.drillBits'
    },
    {
      image: '/photos/бурильные трубы.jpg',
      titleKey: 'products.drillPipes'
    },
    {
      image: '/photos/Дроссельно-глушильная система.png',
      titleKey: 'products.chokeKillSystem'
    },
    {
      image: '/photos/Устьевое оборудование.png',
      titleKey: 'products.wellheadEquipment'
    },
    {
      image: '/photos/Гидравлическая станция управления ПВО.jpg',
      titleKey: 'products.hydraulicControlStation'
    },
    {
      image: '/photos/ПРЕВЕНТОРНЫЙ БЛОК.jpg',
      titleKey: 'products.preventerBlock'
    },
    {
      image: '/photos/Противовыбросовое оборудование.jfif',
      titleKey: 'products.blowoutPrevention'
    },
    {
      image: '/photos/Электродвигатели переменного тока.jpg',
      titleKey: 'products.acMotors'
    },
    {
      image: '/photos/Дизель-генераторы.jpg',
      titleKey: 'products.dieselGenerators'
    },
    {
      image: '/photos/Центрифуга.jpg',
      titleKey: 'products.centrifuge'
    },
    {
      image: '/photos/Дегазатор.png',
      titleKey: 'products.degasser'
    },
    {
      image: '/photos/Предлагаемая продукция.jpg',
      titleKey: 'products.industrialEquipment'
    },
    {
      image: '/photos/img29.jpg',
      titleKey: 'products.industrialEquipment'
    },
    {
      image: '/photos/91.jpg',
      titleKey: 'products.industrialEquipment'
    },
    {
      image: '/photos/бурильные трубы.jpg',
      titleKey: 'products.drillPipes'
    }
  ];

  // Показываем только первые 6 товаров
  const displayedServices = allProducts.slice(0, 6);

  return (
    <section id="services" className="relative py-20 bg-gray-50 dark:bg-gray-900 overflow-hidden">
      {/* Static Background */}
      <div className="absolute inset-0 opacity-10 dark:opacity-20">
        {/* Blueprint Grid */}
        <div className="absolute inset-0">
          <svg className="w-full h-full">
            <defs>
              <pattern id="blueprint-grid-services" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#06b6d4" strokeWidth="0.5"/>
                <path d="M 0 20 L 40 20 M 20 0 L 20 40" fill="none" stroke="#06b6d4" strokeWidth="0.3"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#blueprint-grid-services)" />
          </svg>
        </div>

        {/* Static Technical Diagrams */}
        <svg className="absolute inset-0 w-full h-full opacity-30 dark:opacity-40">
          {/* Equipment Blocks */}
          {[...Array(6)].map((_, i) => (
            <g key={i}>
              <rect
                x={`${15 + i * 14}%`}
                y={`${20 + (i % 2) * 40}%`}
                width="80"
                height="60"
                fill="none"
                stroke="#22d3ee"
                strokeWidth="2"
                rx="8"
              />
              {/* Connection points */}
              <circle
                cx={`${15 + i * 14}%`}
                cy={`${35 + (i % 2) * 40}%`}
                r="4"
                fill="#06b6d4"
              />
            </g>
          ))}

          {/* Data Flow Lines */}
          {[...Array(8)].map((_, i) => (
            <path
              key={i}
              d={`M${100 + i * 150},${150 + (i % 3) * 100} L${200 + i * 150},${150 + (i % 3) * 100} L${200 + i * 150},${200 + (i % 3) * 100}`}
              stroke="#0891b2"
              strokeWidth="2"
              fill="none"
              strokeDasharray="5,5"
            />
          ))}
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent mb-4 sm:mb-6 px-4">
            {t('services.title')}
          </h2>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto px-4">
            {t('services.description')}
          </p>
        </div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-8 sm:mb-12">
          {displayedServices.map((service, index) => (
            <div
              key={index}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="group relative overflow-hidden rounded-lg"
              style={{ minHeight: '250px' }}
            >
              {/* Card Container */}
              <div className="relative h-full cursor-pointer rounded-lg overflow-hidden">
                
                {/* Image */}
                <img
                  src={service.image}
                  alt={t(service.titleKey)}
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                />

                {/* Dark Overlay - only visible on hover */}
                <div className={`absolute inset-0 bg-black ${
                  hoveredIndex === index ? 'opacity-80' : 'opacity-0'
                }`}></div>

                {/* Content Container */}
                <div className="absolute inset-0 p-4 sm:p-6 md:p-8 flex flex-col justify-between z-10">
                  
                  {/* Top Accent Line */}
                  <div className={`h-1 bg-white/50 transition-all duration-300 ${
                    hoveredIndex === index ? 'w-16 sm:w-20' : 'w-0'
                  }`}></div>

                  {/* Bottom Content */}
                  <div>
                    {/* Title */}
                    <h3 className={`text-white font-bold mb-2 sm:mb-3 transition-all duration-300 ${
                      hoveredIndex === index ? 'text-base sm:text-lg md:text-xl' : 'text-lg sm:text-xl md:text-2xl'
                    }`}>
                      {t(service.titleKey)}
                    </h3>

                    {/* Description - Appears on hover */}
                    <div className={`overflow-hidden transition-all duration-300 ${
                      hoveredIndex === index ? 'max-h-0 opacity-0' : 'max-h-0 opacity-0'
                    }`}>
                    </div>

                    {/* Bottom Line Indicator */}
                    <div className={`h-1 bg-white ${
                      hoveredIndex === index ? 'w-full opacity-80' : 'w-16 opacity-40'
                    }`}></div>
                  </div>
                </div>

                {/* Subtle Border on Hover */}
                <div className={`absolute inset-0 border-2 border-white/30 ${
                  hoveredIndex === index ? 'opacity-100' : 'opacity-0'
                }`}></div>
              </div>
            </div>
          ))}
        </div>

        {/* Кнопка Каталог товаров */}
        <div className="flex justify-center mt-6 sm:mt-8 px-4">
          <button
            onClick={handleCatalogClick}
            className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-300 shadow-lg hover:shadow-xl"
          >
            <span className="flex items-center justify-center gap-2 sm:gap-3 text-sm sm:text-base">
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
{t('services.catalogButton')}
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </button>
        </div>

      </div>
    </section>
  );
}
