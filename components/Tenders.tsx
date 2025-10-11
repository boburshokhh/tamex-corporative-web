// @ts-nocheck
import React from 'react';
import { Trophy, DollarSign, Clock, Users } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import TenderChartCard from './TenderChartCard';

export default function Tenders() {
  const { t } = useLanguage();


  return (
    <section id="tenders" className="relative py-20 bg-gray-50 dark:bg-gray-900 overflow-hidden">
      {/* Technical Background Animation */}
      <div className="absolute inset-0 opacity-10 dark:opacity-20">
        {/* Blueprint Grid */}
        <div className="absolute inset-0">
          <svg className="w-full h-full">
            <defs>
              <pattern id="blueprint-grid-tenders" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#06b6d4" strokeWidth="0.5"/>
                <path d="M 0 20 L 40 20 M 20 0 L 20 40" fill="none" stroke="#06b6d4" strokeWidth="0.3"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#blueprint-grid-tenders)" />
          </svg>
        </div>

        {/* Technical Diagrams */}
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
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 px-4">
            {t('tenders.title')}
          </h2>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto px-4">
            {t('tenders.description')}
          </p>
        </div>

        {/* Chart Section */}
        <div>
          <TenderChartCard />
        </div>

        {/* Trusted Partners Section */}
        <div className="mt-12 sm:mt-16 md:mt-20">
          <div className="text-center mb-8 sm:mb-12">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 px-4">
              {t('tenders.trustedPartners')}
            </h3>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 max-w-2xl mx-auto px-4">
              {t('tenders.partnersDescription')}
            </p>
          </div>

          {/* Partners Logos Horizontal Scroll */}
          <div className="relative overflow-hidden px-2 sm:px-0">
            <div className="flex animate-scroll gap-8 items-center">
              {/* First set of logos */}
              {[
                { 
                  name: 'Apple', 
                  logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/200px-Apple_logo_black.svg.png',
                  description: 'Apple Inc.'
                },
                { 
                  name: 'Google', 
                  logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/200px-Google_2015_logo.svg.png',
                  description: 'Google LLC'
                },
                { 
                  name: 'Microsoft', 
                  logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/200px-Microsoft_logo.svg.png',
                  description: 'Microsoft Corporation'
                },
                { 
                  name: 'Amazon', 
                  logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/200px-Amazon_logo.svg.png',
                  description: 'Amazon.com Inc.'
                },
                { 
                  name: 'Tesla', 
                  logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Tesla_T_symbol.svg/200px-Tesla_T_symbol.svg.png',
                  description: 'Tesla Inc.'
                },
                { 
                  name: 'Meta', 
                  logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Meta_Platforms_Inc._logo.svg/200px-Meta_Platforms_Inc._logo.svg.png',
                  description: 'Meta Platforms'
                },
                { 
                  name: 'Netflix', 
                  logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/200px-Netflix_2015_logo.svg.png',
                  description: 'Netflix Inc.'
                },
                { 
                  name: 'Spotify', 
                  logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Spotify_logo_without_text.svg/200px-Spotify_logo_without_text.svg.png',
                  description: 'Spotify AB'
                },
                { 
                  name: 'Uber', 
                  logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Uber_logo_2018.png/200px-Uber_logo_2018.png',
                  description: 'Uber Technologies'
                },
                { 
                  name: 'Airbnb', 
                  logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Airbnb_Logo_B%C3%A9lo.svg/200px-Airbnb_Logo_B%C3%A9lo.svg.png',
                  description: 'Airbnb Inc.'
                },
                { 
                  name: 'Twitter', 
                  logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Logo_of_Twitter.svg/200px-Logo_of_Twitter.svg.png',
                  description: 'Twitter Inc.'
                },
                { 
                  name: 'LinkedIn', 
                  logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/200px-LinkedIn_logo_initials.png',
                  description: 'LinkedIn Corporation'
                }
              ].map((company, index) => (
                <div
                  key={`first-${company.name}`}
                  className="group cursor-pointer flex-shrink-0"
                >
                  <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg p-3 sm:p-4 shadow-lg hover:shadow-xl transition-all duration-300 w-24 sm:w-28 md:w-32">
                    {/* Real Company Logo */}
                    <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mx-auto flex items-center justify-center mb-2 sm:mb-3 group-hover:scale-110 transition-transform duration-300">
                      <img 
                        src={company.logo} 
                        alt={company.name}
                        className="w-full h-full object-contain"
                        onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                          // Fallback to text if image fails to load
                          e.currentTarget.style.display = 'none';
                          const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                          if (fallback) {
                            fallback.style.display = 'flex';
                          }
                        }}
                      />
                      <div className="w-full h-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white font-bold text-sm rounded-lg" style={{display: 'none'}}>
                        {company.name.substring(0, 2)}
                      </div>
                    </div>
                    
                    {/* Company Name */}
                    <div className="text-center">
                      <h4 className="text-xs font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                        {company.name}
                      </h4>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Duplicate set for seamless loop */}
              {[
                { 
                  name: 'Apple', 
                  logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/200px-Apple_logo_black.svg.png',
                  description: 'Apple Inc.'
                },
                { 
                  name: 'Google', 
                  logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/200px-Google_2015_logo.svg.png',
                  description: 'Google LLC'
                },
                { 
                  name: 'Microsoft', 
                  logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/200px-Microsoft_logo.svg.png',
                  description: 'Microsoft Corporation'
                },
                { 
                  name: 'Amazon', 
                  logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/200px-Amazon_logo.svg.png',
                  description: 'Amazon.com Inc.'
                },
                { 
                  name: 'Tesla', 
                  logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Tesla_T_symbol.svg/200px-Tesla_T_symbol.svg.png',
                  description: 'Tesla Inc.'
                },
                { 
                  name: 'Meta', 
                  logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Meta_Platforms_Inc._logo.svg/200px-Meta_Platforms_Inc._logo.svg.png',
                  description: 'Meta Platforms'
                },
                { 
                  name: 'Netflix', 
                  logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/200px-Netflix_2015_logo.svg.png',
                  description: 'Netflix Inc.'
                },
                { 
                  name: 'Spotify', 
                  logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Spotify_logo_without_text.svg/200px-Spotify_logo_without_text.svg.png',
                  description: 'Spotify AB'
                },
                { 
                  name: 'Uber', 
                  logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Uber_logo_2018.png/200px-Uber_logo_2018.png',
                  description: 'Uber Technologies'
                },
                { 
                  name: 'Airbnb', 
                  logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Airbnb_Logo_B%C3%A9lo.svg/200px-Airbnb_Logo_B%C3%A9lo.svg.png',
                  description: 'Airbnb Inc.'
                },
                { 
                  name: 'Twitter', 
                  logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Logo_of_Twitter.svg/200px-Logo_of_Twitter.svg.png',
                  description: 'Twitter Inc.'
                },
                { 
                  name: 'LinkedIn', 
                  logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/200px-LinkedIn_logo_initials.png',
                  description: 'LinkedIn Corporation'
                }
              ].map((company, index) => (
                <div
                  key={`second-${company.name}`}
                  className="group cursor-pointer flex-shrink-0"
                >
                  <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg p-3 sm:p-4 shadow-lg hover:shadow-xl transition-all duration-300 w-24 sm:w-28 md:w-32">
                    {/* Real Company Logo */}
                    <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mx-auto flex items-center justify-center mb-2 sm:mb-3 group-hover:scale-110 transition-transform duration-300">
                      <img 
                        src={company.logo} 
                        alt={company.name}
                        className="w-full h-full object-contain"
                        onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                          // Fallback to text if image fails to load
                          e.currentTarget.style.display = 'none';
                          const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                          if (fallback) {
                            fallback.style.display = 'flex';
                          }
                        }}
                      />
                      <div className="w-full h-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white font-bold text-sm rounded-lg" style={{display: 'none'}}>
                        {company.name.substring(0, 2)}
                      </div>
                    </div>
                    
                    {/* Company Name */}
                    <div className="text-center">
                      <h4 className="text-xs font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                        {company.name}
                      </h4>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Additional Info */}
          <div className="text-center mt-8 sm:mt-12 px-4">
            <div className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-white dark:bg-gray-800 rounded-full shadow-lg">
              <Users size={20} className="text-blue-600 dark:text-blue-400 mr-2" />
              <span className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">
                {t('tenders.morePartners')}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
