// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon, Globe } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage, Language } from '../contexts/LanguageContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { reachGoal } from '../lib/analytics';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Определяем, нужно ли использовать темный текст (для страниц с белым фоном)
  const shouldUseDarkText = location.pathname === '/catalog' || isScrolled;

  // Handle click outside mobile menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMenuOpen && !(event.target as Element).closest('.mobile-menu-content') && !(event.target as Element).closest('[data-mobile-menu-button]')) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isMenuOpen]);

  const navItems = [
    { key: 'nav.about', href: '#about' },
    { key: 'nav.services', href: '#services' },
    { key: 'nav.catalog', href: '/catalog', isRoute: true },
    { key: 'nav.tenders', href: '#tenders' },
    { key: 'nav.contact', href: '#contact' },
  ];

  const languages: { code: Language; label: string }[] = [
    { code: 'en', label: 'EN' },
    { code: 'ru', label: 'RU' },
    { code: 'uz', label: 'UZ' },
  ];

  const handleNavClick = (href: string, isRoute: boolean = false) => {
    setIsMenuOpen(false);
    
    if (isRoute) {
      // Для роутов используем navigate
      navigate(href);
      // Отправляем цель в Яндекс.Метрику для каталога
      if (href === '/catalog') {
        reachGoal('catalog_view');
      }
    } else {
      // Если мы не на главной странице, сначала переходим на главную
      if (location.pathname !== '/') {
        navigate('/');
        // Даем время для загрузки главной страницы
        setTimeout(() => {
          const element = document.querySelector(href);
          element?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        const element = document.querySelector(href);
        element?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleLogoClick = () => {
    if (location.pathname !== '/') {
      navigate('/');
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
        isScrolled 
          ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-200/50 dark:border-gray-700/50 shadow-lg' 
          : 'bg-transparent'
      }`}
      onClick={(e) => {
        // Закрываем мобильное меню при клике вне его
        if (isMenuOpen && !e.currentTarget.querySelector('.mobile-menu-content')?.contains(e.target as Node)) {
          setIsMenuOpen(false);
        }
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-18 sm:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <button 
              onClick={handleLogoClick}
              className="flex items-center hover:opacity-80 transition-opacity duration-200 pt-1 sm:pt-2"
            >
              <svg 
                className="w-36 h-36 sm:w-40 sm:h-40 md:w-44 md:h-44 lg:w-48 lg:h-48" 
                viewBox="0 0 1000 1000" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id="logo-gradient" x1="367.81" y1="-435.06" x2="630.78" y2="-698.03" gradientUnits="userSpaceOnUse">
                    <stop offset="0" stopColor={
                      shouldUseDarkText 
                        ? (theme === 'dark' ? "#60A5FA" : "#254797")
                        : "#FFFFFF"
                    }/>
                    <stop offset="1" stopColor={
                      shouldUseDarkText 
                        ? (theme === 'dark' ? "#3B82F6" : "#2177c2")
                        : "#FFFFFF"
                    }/>
                  </linearGradient>
                </defs>
                <g transform="matrix(1, 0, 0, 1, 2226.737094, -1129.504289)">
                  <path fill="url(#logo-gradient)" d="M-1833.4,1607.76v-40.17h-16.38v-15.12h16.38v-21.74h17.8v21.74h23.79v15.12h-23.79v39.38c0,9.61,3.78,12.92,12.92,12.92,2.99,0,6.62-.47,10.55-.95v14.02c-5.67,1.1-11.34,1.73-16.22,1.73-14.81,0-25.04-6.77-25.04-26.94Z"/>
                  <path fill="url(#logo-gradient)" d="M-1783.94,1611.22c0-17.48,15.28-26.94,36.23-26.94,7.72,0,13.86.79,20.95,2.21v-4.41c0-10.71-6.46-18.27-18.59-18.27-10.08,0-17.01,4.73-17.17,13.07v.63h-17.64v-1.58c0-16.7,13.86-25.67,34.97-25.67,18.27,0,36.23,6.46,36.23,34.18v49.3h-16.22l-1.58-11.66h-1.58c-5.83,8.66-16.07,13.86-28.67,13.86-17.48,0-26.94-10.08-26.94-24.73ZM-1726.76,1598.93c-6.62-1.42-12.29-2.21-18.43-2.21-14.33,0-21.26,5.51-21.26,13.55,0,7.09,5.2,11.34,13.86,11.34,14.02,0,24.42-7.72,25.83-22.68Z"/>
                  <path fill="url(#logo-gradient)" d="M-1693.21,1633.75v-81.28h16.22l1.58,11.66h1.58c5.51-9.14,13.07-13.86,24.73-13.86,10.55,0,19.69,4.88,24.73,15.28h1.42c6.77-9.61,15.59-15.28,28.83-15.28,16.54,0,28.67,11.18,28.67,36.39v47.1h-17.8v-45.68c0-15.12-6.14-22.68-16.85-22.68-13.7,0-20.32,11.97-20.32,25.36v43h-17.8v-45.68c0-15.91-6.93-22.68-16.85-22.68-11.34,0-20.32,8.66-20.32,26.15v42.21h-17.8Z"/>
                  <path fill="url(#logo-gradient)" d="M-1552.86,1593.11c0-28.51,17.96-42.84,42.37-42.84s40.01,15.44,40.01,41.27c0,1.73-.16,4.57-.47,6.3h-64.11c1.26,15.75,11.34,24.42,24.42,24.42,8.03,0,15.59-3.62,19.22-10.24h17.64c-4.73,14.96-18.9,23.94-36.7,23.94-26.15,0-42.37-16.22-42.37-42.84ZM-1488.75,1585.39c-1.42-13.86-10.87-21.58-22.53-21.58s-21.42,7.56-23.31,21.58h45.84Z"/>
                  <path fill="url(#logo-gradient)" d="M-1470.47,1633.75l31.35-40.32-31.35-40.95h21.26l20,27.25h1.58l20-27.25h20.32l-31.19,40.17,31.19,41.11h-21.11l-20-27.41h-1.58l-20.16,27.41h-20.32Z"/>
                </g>
                <path fill="url(#logo-gradient)" d="M 356.567 459.046 C 356.567 420.176 324.947 388.556 286.077 388.556 C 250.157 388.556 220.417 415.576 216.127 450.356 L 234.137 450.356 C 238.287 425.436 260.007 406.386 286.077 406.386 C 300.597 406.386 313.757 412.296 323.297 421.826 C 332.837 431.366 338.747 444.536 338.747 459.046 C 338.747 485.036 319.817 506.686 295.027 510.956 L 295.027 528.976 C 310.887 526.956 325.127 519.646 335.897 508.866 C 348.667 496.096 356.567 478.476 356.567 459.046 L 356.567 459.046 Z M 320.917 459.046 C 320.917 439.836 305.287 424.206 286.077 424.206 C 269.857 424.206 256.207 435.326 252.337 450.356 L 271.447 450.356 C 274.417 445.376 279.867 442.026 286.077 442.026 C 290.777 442.026 295.027 443.936 298.107 447.016 C 301.187 450.096 303.097 454.356 303.097 459.046 C 303.097 465.146 299.867 470.506 295.027 473.516 L 295.027 492.716 C 309.927 488.756 320.917 475.166 320.917 459.046 L 320.917 459.046 Z M 280.047 511.376 C 271.057 510.356 262.747 507.046 255.717 502.066 L 242.987 514.796 C 240.617 512.966 238.367 510.986 236.257 508.876 C 234.147 506.766 232.167 504.516 230.337 502.146 L 243.067 489.416 C 238.127 482.446 234.847 474.226 233.787 465.336 L 270.257 465.336 C 270.257 465.336 280.047 465.336 280.047 465.336 L 280.047 474.976 C 280.047 474.976 280.047 493.376 280.047 493.376 L 280.047 511.376 L 280.047 511.376 Z"/>
              </svg>
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => handleNavClick(item.href, item.isRoute)}
                className={`relative font-medium py-2 px-3 group transition-all duration-300 ${
                  shouldUseDarkText 
                    ? 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400' 
                    : 'text-white hover:text-blue-200'
                }`}
              >
                {t(item.key)}
                {/* Animated underline */}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-blue-500 transition-all duration-300 group-hover:w-full"></span>
              </button>
            ))}
          </nav>

          {/* Desktop Controls */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                className={`flex items-center space-x-1 transition-all duration-300 ${
                  shouldUseDarkText 
                    ? 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400' 
                    : 'text-white hover:text-blue-200'
                }`}
              >
                <span className={`text-sm font-medium uppercase ${shouldUseDarkText ? 'text-gray-700 dark:text-gray-300' : 'text-white'}`}>
                  {language.toUpperCase()}
                </span>
                <svg className={`w-3 h-3 transition-transform duration-200 ${isLangMenuOpen ? 'rotate-180' : ''}`} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              
              {isLangMenuOpen && (
                <div className="absolute top-full right-0 mt-2 w-20 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg shadow-lg border border-blue-200/50 dark:border-blue-700/50 overflow-hidden">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code);
                        setIsLangMenuOpen(false);
                      }}
                      className={`w-full px-3 py-2 text-sm text-left hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors duration-200 ${
                        language === lang.code ? 'bg-blue-100 dark:bg-blue-800/40 text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      {lang.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Theme Toggle */}
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('Desktop theme toggle clicked, current theme:', theme);
                console.log('Desktop theme toggle: calling toggleTheme...');
                toggleTheme();
                console.log('Desktop theme toggle: toggleTheme called');
              }}
              className={`p-2 transition-all duration-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800/30 min-w-[40px] min-h-[40px] flex items-center justify-center ${
                shouldUseDarkText 
                  ? 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400' 
                  : 'text-white hover:text-blue-200'
              }`}
              aria-label={theme === 'light' ? 'Переключить на темную тему' : 'Переключить на светлую тему'}
            >
              {theme === 'light' ? (
                <Moon className={`w-5 h-5 ${shouldUseDarkText ? 'text-gray-700 dark:text-gray-300' : 'text-white'}`} />
              ) : (
                <Sun className={`w-5 h-5 ${shouldUseDarkText ? 'text-gray-700 dark:text-gray-300' : 'text-white'}`} />
              )}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            data-mobile-menu-button
            className={`md:hidden p-2 transition-all duration-300 ${
              shouldUseDarkText 
                ? 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400' 
                : 'text-white hover:text-blue-200'
            }`}
          >
            {isMenuOpen ? (
              <X className={`w-6 h-6 ${shouldUseDarkText ? 'text-gray-700 dark:text-gray-300' : 'text-white'}`} />
            ) : (
              <Menu className={`w-6 h-6 ${shouldUseDarkText ? 'text-gray-700 dark:text-gray-300' : 'text-white'}`} />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div 
            className={`mobile-menu-content md:hidden py-4 transition-all duration-300 backdrop-blur-xl bg-white/10 dark:bg-gray-900/20 border-t border-white/20 dark:border-gray-700/30 shadow-lg`}
            onClick={(e) => {
              // Предотвращаем закрытие меню при клике внутри него
              e.stopPropagation();
            }}
          >
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <button
                  key={item.key}
                  onClick={() => handleNavClick(item.href, item.isRoute)}
                  className={`relative text-left font-medium py-3 px-4 group transition-all duration-300 rounded-lg hover:bg-white/20 dark:hover:bg-gray-800/30 ${
                    shouldUseDarkText 
                      ? 'text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400' 
                      : 'text-white hover:text-blue-200'
                  }`}
                >
                  {t(item.key)}
                  {/* Animated underline for mobile */}
                  <span className="absolute bottom-1 left-4 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-blue-300 transition-all duration-300 group-hover:w-[calc(100%-2rem)]"></span>
                </button>
              ))}
            </nav>

            {/* Mobile Controls */}
            <div className={`flex items-center justify-center mt-6 pt-4 transition-all duration-300 border-t border-white/20 dark:border-gray-700/30 relative z-10`}>
              <div className="flex items-center space-x-2">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => setLanguage(lang.code)}
                    className={`px-3 py-2 text-sm font-medium transition-all duration-200 rounded-lg ${
                      language === lang.code
                        ? shouldUseDarkText 
                          ? 'bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400'
                          : 'bg-white/20 text-white'
                        : shouldUseDarkText
                          ? 'text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800/30'
                          : 'text-white/80 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {lang.label}
                  </button>
                ))}
                
                {/* Theme Toggle Button - рядом с языками */}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log('Mobile theme toggle clicked, current theme:', theme);
                    console.log('Mobile theme toggle: calling toggleTheme...');
                    toggleTheme();
                    console.log('Mobile theme toggle: toggleTheme called');
                    // Не закрываем меню при переключении темы
                  }}
                  className={`p-2 transition-all duration-300 rounded-lg hover:bg-white/20 dark:hover:bg-gray-800/30 min-w-[40px] min-h-[40px] flex items-center justify-center touch-manipulation relative z-20 ${
                    shouldUseDarkText 
                      ? 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400' 
                      : 'text-white hover:text-blue-200'
                  }`}
                  aria-label={theme === 'light' ? 'Переключить на темную тему' : 'Переключить на светлую тему'}
                >
                  {theme === 'light' ? (
                    <Moon className={`w-5 h-5 ${shouldUseDarkText ? 'text-gray-700 dark:text-gray-300' : 'text-white'}`} />
                  ) : (
                    <Sun className={`w-5 h-5 ${shouldUseDarkText ? 'text-gray-700 dark:text-gray-300' : 'text-white'}`} />
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}