import React from 'react';
import { ArrowRight, Award, CheckCircle } from 'lucide-react';
import { useInView } from '../hooks/useInView';
import { useLanguage } from '../contexts/LanguageContext';

export default function Hero() {
  const { ref, isInView } = useInView(0.3);
  const { t } = useLanguage();

  const handleAbout = () => {
    const element = document.querySelector('#about');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleContact = () => {
    const element = document.querySelector('#contact');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section 
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: 'url(/fon_web/image.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Dark Overlay для лучшей читаемости текста */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-black/60 to-black/50"></div>
      
      {/* Дополнительный градиентный оверлей */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-slate-900/30 to-blue-900/20"></div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 md:py-28">
        <div className="text-center flex flex-col items-center justify-start pt-16 sm:pt-20">
          {/* Trust Badge */}
          <div className={`inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-4 transition-all duration-700 delay-50 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <Award className="w-4 h-4 text-yellow-400" />
            <span className="text-sm font-medium text-white/90">{t('hero.badge')}</span>
          </div>

          {/* Main Title with Gradient */}
          <h1 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 px-2 leading-tight transition-all duration-700 delay-100 drop-shadow-2xl ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <span className="text-white">{t('hero.title.main')} </span>
            <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent">
              {t('hero.title.highlight')}
            </span>
            <br />
            <span className="text-white">{t('hero.title.end')}</span>
          </h1>

          {/* Subtitle with Benefits */}
          <p className={`text-lg sm:text-xl md:text-2xl text-white/90 mb-6 sm:mb-8 max-w-4xl mx-auto px-4 leading-relaxed transition-all duration-700 delay-200 drop-shadow-lg ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            {t('hero.subtitle.text')}
          </p>

          {/* CTA Buttons */}
          <div className={`flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center px-4 mb-6 transition-all duration-700 delay-400 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            {/* Primary Button */}
            <button
              onClick={handleContact}
              className="group w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl shadow-lg flex items-center justify-center space-x-2 text-sm sm:text-base"
            >
              <span>{t('hero.cta.primary')}</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </button>

            {/* Secondary Button */}
            <button
              onClick={handleAbout}
              className="group w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl shadow-lg flex items-center justify-center space-x-2 text-sm sm:text-base"
            >
              <span>{t('hero.cta.secondary')}</span>
              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator - Hidden on mobile */}
      <div className="hidden sm:block absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center" aria-label={t('hero.scrollIndicator')}>
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}


