import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { useInView } from '../hooks/useInView';

export default function About() {
  const { t } = useLanguage();
  const { ref, isInView } = useInView(0.3);

  return (
    <section id="about" className="relative py-20 bg-gray-50 dark:bg-gray-900 overflow-hidden">
      {/* Static Background */}
      <div className="absolute inset-0 opacity-10 dark:opacity-20">
        {/* Blueprint Grid */}
        <div className="absolute inset-0">
          <svg className="w-full h-full">
            <defs>
              <pattern id="blueprint-grid-about" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#06b6d4" strokeWidth="0.5"/>
                <path d="M 0 20 L 40 20 M 20 0 L 20 40" fill="none" stroke="#06b6d4" strokeWidth="0.3"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#blueprint-grid-about)" />
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
        <div ref={ref} className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Content */}
          <div className={`transition-all duration-500 ${
            isInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
          }`}>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">
              {t('about.title')}
            </h2>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 mb-6 sm:mb-8 leading-relaxed max-w-2xl">
              {t('about.description')}
            </p>
          </div>

          {/* Visual Element */}
          <div className={`relative transition-all duration-500 delay-100 ${
            isInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
          }`}>
            <div className="relative">
              {/* Industrial Photo */}
              <div className="relative">
                <img 
                  src="/photo/3-1.jpg"
                  alt={t('about.industrialPhotoAlt')}
                  className="w-full h-64 object-cover rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info Section */}
        <div className={`mt-12 sm:mt-16 grid sm:grid-cols-2 md:grid-cols-3 gap-6 transition-all duration-500 delay-200 ${
          isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          {/* B2B Focus */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <div className="text-blue-600 dark:text-blue-400 font-semibold mb-3 text-base">{t('about.b2bAudience')}</div>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {t('about.b2bAudienceDesc')}
            </p>
          </div>

          {/* Direct Partnerships */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <div className="text-blue-600 dark:text-blue-400 font-semibold mb-3 text-base">{t('about.directContracts')}</div>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {t('about.directContractsDesc')}
            </p>
          </div>

          {/* Expansion */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 sm:col-span-2 md:col-span-1">
            <div className="text-blue-600 dark:text-blue-400 font-semibold mb-3 text-base">{t('about.growthProspects')}</div>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {t('about.growthProspectsDesc')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
