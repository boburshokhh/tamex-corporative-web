// @ts-nocheck
import React from 'react';
import { Phone, Mail, MapPin, ChevronRight, Clock, Home } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  const handleNavClick = (href: string, isRoute: boolean = false) => {
    if (isRoute) {
      // Для роутов используем navigate
      window.location.href = href;
    } else {
      // Для якорных ссылок используем scrollIntoView
      const element = document.querySelector(href);
      element?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const usefulLinks = [
    { key: 'nav.about', href: '#about' },
    { key: 'nav.catalog', href: '/catalog', isRoute: true },
    { key: 'nav.contact', href: '#contact' },
  ];

  return (
    <footer className="bg-gray-800 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full">
          <defs>
            <pattern id="footer-pattern" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M30,0 Q45,15 30,30 Q15,15 30,0" fill="#4a5568" opacity="0.3"/>
              <path d="M0,30 Q15,45 30,30 Q15,15 0,30" fill="#4a5568" opacity="0.2"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#footer-pattern)" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Content - 3 Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 lg:gap-12">
          
          {/* Column 1: Useful Links */}
          <div>
            <h3 className="text-lg font-bold text-white mb-3 relative">
              {t('footer.usefulLinks')}
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-red-500"></div>
            </h3>
            <ul className="space-y-2">
              {usefulLinks.map((link) => (
                <li key={link.key} className="flex items-center space-x-2 group">
                  <ChevronRight className="w-4 h-4 text-white flex-shrink-0 group-hover:text-red-400 transition-colors" />
                  <button
                    onClick={() => handleNavClick(link.href, link.isRoute)}
                    className="text-gray-300 text-sm hover:text-white transition-colors text-left hover:underline"
                  >
                    {t(link.key)}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Contact Information */}
          <div>
            <h3 className="text-lg font-bold text-white mb-3 relative">
              {t('footer.contactInfo')}
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-red-500"></div>
            </h3>
            <div className="space-y-3">
              {/* Address */}
              <div className="flex items-start space-x-3">
                <Home className="w-4 h-4 text-white mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-gray-300 text-sm">
                    {t('contact.tashkentAddress')}
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-white flex-shrink-0" />
                <a href="mailto:info@tamexgroup.com" className="text-gray-300 text-sm hover:text-white transition-colors">
                  info@tamexgroup.com
                </a>
              </div>

              {/* Phone */}
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-white flex-shrink-0" />
                <a href="tel:+998951230123" className="text-gray-300 text-sm hover:text-white transition-colors">
                  +998 95 123 01 23
                </a>
              </div>

              {/* Working Hours */}
              <div className="flex items-center space-x-3">
                <Clock className="w-4 h-4 text-white flex-shrink-0" />
                <div className="text-gray-300 text-sm">
                  {t('contact.workingTime')}
                </div>
              </div>
            </div>
          </div>

          {/* Column 3: Company Information */}
          <div>
            <h3 className="text-lg font-bold text-white mb-3 relative">
              {t('footer.companyInfo')}
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-red-500"></div>
            </h3>
            <div className="space-y-3">
              <div className="text-white font-semibold text-sm">
                {t('footer.companyName')}
              </div>
              <div className="space-y-2">
                <div className="text-gray-300 text-sm">
                  {t('footer.inn')}
                </div>
                <div className="text-gray-300 text-sm">
                  {t('footer.mfo')}
                </div>
                <div className="text-gray-300 text-sm">
                  {t('footer.oked')}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-600 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <div className="text-gray-400 text-sm text-center md:text-left">
              {t('footer.copyright')}
            </div>
            
            {/* Legal Link */}
            <div className="text-gray-400 text-sm">
              <a href="#" className="hover:text-white transition-colors">
                {t('footer.privacyPolicy')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
