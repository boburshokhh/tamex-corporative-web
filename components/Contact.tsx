import React, { useState } from 'react';
import { Phone, Mail, Send, MapPin } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import emailjs from '@emailjs/browser';
import { reachGoal } from '../lib/analytics';

// Типы для переменных окружения
declare global {
  interface ImportMetaEnv {
    readonly VITE_EMAILJS_SERVICE_ID: string;
    readonly VITE_EMAILJS_TEMPLATE_ID: string;
    readonly VITE_EMAILJS_PUBLIC_KEY: string;
  }

  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
}

export default function Contact() {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // EmailJS конфигурация - используем переменные окружения или значения по умолчанию
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_tamex';
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_contact';
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY';
      
      // Подготовка данных для отправки
      const templateParams = {
        from_name: formData.name,
        from_email: formData.contact,
        message: formData.message,
        to_email: 'info@tamexgroup.com',
        reply_to: formData.contact,
        subject: `Сообщение с сайта Tamex Group от ${formData.name}`,
        company: 'Tamex Group',
        date: new Date().toLocaleString('ru-RU')
      };

      // Отправка email через EmailJS
      await emailjs.send(serviceId, templateId, templateParams, publicKey);
      
      // Отправляем цель в Яндекс.Метрику
      reachGoal('contact_form_sent');
      
      setSubmitStatus('success');
      setFormData({ name: '', contact: '', message: '' });
      
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } catch (error) {
      console.error('Ошибка отправки email:', error);
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative py-20 bg-gray-50 dark:bg-gray-900 overflow-hidden">
      {/* Technical Background Animation - Same as Tenders */}
      <div className="absolute inset-0 opacity-10 dark:opacity-20">
        {/* Blueprint Grid */}
        <div className="absolute inset-0">
          <svg className="w-full h-full">
            <defs>
              <pattern id="blueprint-grid-contact" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#06b6d4" strokeWidth="0.5"/>
                <path d="M 0 20 L 40 20 M 20 0 L 20 40" fill="none" stroke="#06b6d4" strokeWidth="0.3"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#blueprint-grid-contact)" />
          </svg>
        </div>

        {/* Technical Diagrams */}
        <svg className="absolute inset-0 w-full h-full opacity-30 dark:opacity-40">
          {/* Communication Nodes */}
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
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 px-4">
            {t('contact.title')}
          </h2>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 mb-6 sm:mb-8">
            {t('contact.subtitle')}
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 mb-12">
          {/* Contact Form - Left Side - УВЕЛИЧЕННЫЕ ШРИФТЫ */}
          <div id="contact-form" className="bg-white dark:bg-gray-800 rounded-xl p-5 sm:p-6 shadow-2xl flex flex-col">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {t('contact.formTitle')}
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-3 flex-1 flex flex-col">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-sm sm:text-base font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t('contact.name')} *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-base"
                  placeholder={t('contact.namePlaceholder')}
                />
              </div>

              {/* Email/Phone Field */}
              <div>
                <label htmlFor="contact" className="block text-sm sm:text-base font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  id="contact"
                  name="contact"
                  value={formData.contact}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-base"
                  placeholder="your@email.com"
                />
              </div>

              {/* Message Field */}
              <div className="flex-1 flex flex-col">
                <label htmlFor="message" className="block text-sm sm:text-base font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t('contact.message')} *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={3}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none text-base flex-1"
                  placeholder={t('contact.messagePlaceholder')}
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-4 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-500 text-white rounded-lg font-semibold transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg flex items-center justify-center space-x-2 text-base"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>{t('contact.sending')}</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>{t('contact.send')}</span>
                  </>
                )}
              </button>

              {/* Status Messages */}
              {submitStatus === 'success' && (
                <div className="p-3 bg-green-100 dark:bg-green-900/30 border border-green-400 dark:border-green-600 rounded-lg text-green-700 dark:text-green-300 text-sm">
                  ✓ {t('contact.successMessage')}
                </div>
              )}
              
              {submitStatus === 'error' && (
                <div className="p-3 bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-600 rounded-lg text-red-700 dark:text-red-300 text-sm">
                  ✗ {t('contact.errorMessage')}
                </div>
              )}

              <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                * {t('contact.privacyNotice')}
              </p>
            </form>
          </div>

          {/* Contact Information - Right Side - ГОРИЗОНТАЛЬНАЯ СТРУКТУРА */}
          <div className="bg-white/20 dark:bg-gray-800/30 backdrop-blur-xl border border-white/30 dark:border-gray-600/40 rounded-xl p-4 sm:p-5 shadow-2xl flex flex-col relative overflow-hidden">
            {/* Стеклянный градиентный оверлей */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-blue-500/5 dark:from-gray-700/20 dark:via-transparent dark:to-blue-500/10 pointer-events-none"></div>
            
            {/* Contact Details - ВЕРТИКАЛЬНАЯ СТРУКТУРА */}
            <div className="space-y-3 mb-3 relative">
              {/* Phones */}
              <div className="p-2 bg-white/10 dark:bg-gray-900/30 rounded-lg border border-white/20 dark:border-gray-600/40 backdrop-blur-sm">
                <div className="flex items-center space-x-2 mb-1.5">
                  <Phone className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <h4 className="text-base font-semibold text-gray-800 dark:text-white">{t('contact.phones')}</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {/* <a 
                    href="tel:+998951230123" 
                    onClick={() => reachGoal('phone_click')}
                    className="px-3 py-2 rounded text-gray-800 dark:text-gray-200 text-base transition-colors hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    +998 95 123 01 23
                  </a> */}
                  <a 
                    href="tel:+998771230123" 
                    onClick={() => reachGoal('phone_click')}
                    className="px-3 py-2 rounded text-gray-800 dark:text-gray-200 text-base transition-colors hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    +998 77 123 01 23
                  </a>
                </div>
              </div>

              {/* Emails */}
              <div className="p-2 bg-white/10 dark:bg-gray-900/30 rounded-lg border border-white/20 dark:border-gray-600/40 backdrop-blur-sm">
                <div className="flex items-center space-x-2 mb-1.5">
                  <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <h4 className="text-base font-semibold text-gray-800 dark:text-white">{t('contact.email')}</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  <a 
                    href="mailto:info@tamexgroup.com" 
                    className="px-3 py-2 rounded text-gray-800 dark:text-gray-200 text-base transition-colors hover:text-blue-600 dark:hover:text-blue-400 break-all"
                  >
                    info@tamexgroup.com
                  </a>
                  {/* <a 
                    href="mailto:mail@tamexgroup.com" 
                    className="px-3 py-2 rounded text-gray-800 dark:text-gray-200 text-base transition-colors hover:text-blue-600 dark:hover:text-blue-400 break-all"
                  >
                    mail@tamexgroup.com
                  </a> */}
                </div>
              </div>

              {/* Addresses */}
              <div className="p-2 bg-white/10 dark:bg-gray-900/30 rounded-lg border border-white/20 dark:border-gray-600/40 backdrop-blur-sm">
                <div className="flex items-center space-x-2 mb-1.5">
                  <MapPin className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <h4 className="text-base font-semibold text-gray-800 dark:text-white">{t('contact.offices')}</h4>
                </div>
                <div className="space-y-2">
                  {/* Головной офис - Узбекистан */}
                  <div className="px-2 py-1.5  rounded backdrop-blur-sm">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-6 rounded-sm overflow-hidden flex-shrink-0 mt-0.5">
                        <img 
                          src="/flags/uz.png" 
                          alt="Флаг Узбекистана"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-semibold text-blue-600 dark:text-blue-400 mb-0.5">{t('contact.headOffice')}</div>
                        <div className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                          Республика Узбекистан, г. Ташкент, Яккасарайский район, ул. Абдуллы Каххара, д. 42а
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Представительство - Казахстан */}
                  <div className="px-2 py-1.5 rounded backdrop-blur-sm">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-6 rounded-sm overflow-hidden flex-shrink-0 mt-0.5">
                        <img 
                          src="/flags/kz.png" 
                          alt="Флаг Казахстана"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-semibold text-blue-600 dark:text-blue-400 mb-0.5">{t('contact.representativeOffice')}</div>
                        <div className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                          Республика Казахстан, Жамбылская область, г. Тараз, ул. Махмута Аширова, д. 19
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Maps Section - Two Separate Maps */}
        <div className="mt-8 sm:mt-12">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-6 sm:mb-8 text-center">
            {t('contact.mapTitle')}
          </h3>
          
          {/* Two Maps Grid */}
          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8">
            {/* Tashkent Office Map */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-6 rounded-sm overflow-hidden flex-shrink-0">
                  <img 
                    src="/flags/uz.png" 
                    alt="Флаг Узбекистана"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                  {t('contact.headOffice')} - Ташкент
                </h4>
              </div>
              <div className="h-[300px] sm:h-[350px] bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden shadow-xl">
                <iframe
                  src="https://yandex.ru/map-widget/v1/?ll=69.261680%2C41.278482&z=16&l=map&pt=69.261680%2C41.278482%2Cpm2rdm&source=constructor"
                  className="w-full h-full border-0"
                  title="Tamex Group Head Office - Tashkent, Uzbekistan"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Республика Узбекистан, г. Ташкент, Яккасарайский район, ул. Абдуллы Каххара, д. 42а
                </p>
              </div>
            </div>

            {/* Taraz Office Map */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-6 rounded-sm overflow-hidden flex-shrink-0">
                  <img 
                    src="/flags/kz.png" 
                    alt="Флаг Казахстана"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                  {t('contact.representativeOffice')} - Тараз
                </h4>
              </div>
              <div className="h-[300px] sm:h-[350px] bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden shadow-xl">
                <iframe
                  src="https://yandex.ru/map-widget/v1/?ll=71.370000%2C42.900000&z=16&l=map&pt=71.370000%2C42.900000%2Cpm2rdm&source=constructor"
                  className="w-full h-full border-0"
                  title="Tamex Group Representative Office - Taraz, Kazakhstan"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Республика Казахстан, Жамбылская область, г. Тараз, ул. Махмута Аширова, д. 19
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


