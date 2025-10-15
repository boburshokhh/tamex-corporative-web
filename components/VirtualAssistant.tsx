import React, { useState, useEffect } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
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

export default function VirtualAssistant() {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Периодические сообщения для привлечения внимания
  useEffect(() => {
    if (!isOpen) {
      // Показываем сообщение сразу при входе
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 10000); // Показываем 10 секунд
      
      // Через 20 секунд показываем еще раз
      const timer1 = setTimeout(() => {
        setShowMessage(true);
        setTimeout(() => setShowMessage(false), 10000); // Показываем еще 10 секунд
      }, 20000);

      return () => clearTimeout(timer1);
    }
  }, [isOpen]);

  // Показываем сообщение при наведении на кнопку
  const handleMouseEnter = () => {
    if (!isOpen) {
      setShowMessage(true);
    }
  };

  const handleMouseLeave = () => {
    setTimeout(() => setShowMessage(false), 10000); // Скрываем через 10 секунд
  };

  // Скрываем сообщение при правом клике
  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowMessage(false);
  };

  // Скрываем сообщение при любом клике
  const handleClick = () => {
    setShowMessage(false);
  };

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
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_tamex';
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_contact';
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY';
      
      const templateParams = {
        from_name: formData.name,
        from_email: formData.contact,
        message: formData.message,
        to_email: 'info@tamexgroup.com',
        reply_to: formData.contact,
        subject: `${t('assistant.emailSubject')} ${formData.name}`,
        company: 'Tamex Group',
        date: new Date().toLocaleString('ru-RU')
      };

      await emailjs.send(serviceId, templateId, templateParams, publicKey);
      
      // Отправляем цель в Яндекс.Метрику
      reachGoal('virtual_assistant_form');
      
      setSubmitStatus('success');
      setFormData({ name: '', contact: '', message: '' });
      
      setTimeout(() => {
        setSubmitStatus('idle');
        setIsOpen(false);
      }, 3000);
    } catch (error) {
      console.error('Error sending email:', error);
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <div className="fixed bottom-5 right-5 z-50">
        {/* Всплывающее сообщение */}
        {showMessage && !isOpen && (
          <div className="absolute bottom-16 right-0 mb-2 animate-slideUp">
            <div 
              className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-lg shadow-xl border border-blue-200/50 dark:border-blue-500/30 p-4 max-w-[280px] w-[280px] cursor-pointer"
              onContextMenu={handleContextMenu}
              onClick={handleClick}
            >
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MessageCircle className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-1.5 leading-tight">
                    {t('assistant.messageTitle')}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed break-words">
                    {t('assistant.messageText')}
                  </p>
                </div>
              </div>
              {/* Стрелочка */}
              <div className="absolute bottom-[-6px] right-4 w-3 h-3 bg-white/95 dark:bg-gray-800/95 border-r border-b border-blue-200/50 dark:border-blue-500/30 transform rotate-45"></div>
            </div>
          </div>
        )}

        <button
          onClick={() => setIsOpen(!isOpen)}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className={`p-3.5 rounded-full shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-105 ${
            isOpen 
              ? 'bg-red-400/80 hover:bg-red-500/80' 
              : 'bg-blue-500/80 hover:bg-blue-600/80'
          }`}
          aria-label={isOpen ? t('contact.close') : t('assistant.open')}
        >
          {isOpen ? (
            <X className="w-5 h-5 text-white" />
          ) : (
            <MessageCircle className="w-5 h-5 text-white" />
          )}
        </button>
      </div>

      {/* Modal Form */}
      {isOpen && (
        <div className="fixed bottom-20 right-5 z-50 w-[85vw] max-w-[340px] animate-slideUp">
          {/* Glass Effect Container */}
          <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-xl shadow-xl border border-blue-200/50 dark:border-blue-500/30 overflow-hidden">
            {/* Minimalist Header */}
            <div className="bg-gradient-to-r from-blue-400/20 to-blue-500/20 dark:from-blue-500/20 dark:to-blue-600/20 p-3 backdrop-blur-sm border-b border-blue-200/30 dark:border-blue-500/30">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-gray-800 dark:text-gray-200">
                  {t('contact.formTitle')}
                </h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-blue-100/50 dark:hover:bg-blue-500/20 rounded-full transition-colors"
                  aria-label={t('contact.close')}
                >
                  <X className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                </button>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-3 space-y-2.5">
              {/* Name Field */}
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 rounded-lg bg-white/60 dark:bg-gray-700/60 backdrop-blur-sm border border-blue-200/50 dark:border-blue-500/30 text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-400/50 dark:focus:ring-blue-500/50 transition-all text-xs"
                placeholder={t('contact.namePlaceholder')}
              />

              {/* Contact Field */}
              <input
                type="text"
                name="contact"
                value={formData.contact}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 rounded-lg bg-white/60 dark:bg-gray-700/60 backdrop-blur-sm border border-blue-200/50 dark:border-blue-500/30 text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-400/50 dark:focus:ring-blue-500/50 transition-all text-xs"
                placeholder={t('assistant.contactPlaceholder')}
              />

              {/* Message Field */}
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                rows={3}
                className="w-full px-3 py-2 rounded-lg bg-white/60 dark:bg-gray-700/60 backdrop-blur-sm border border-blue-200/50 dark:border-blue-500/30 text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-400/50 dark:focus:ring-blue-500/50 transition-all resize-none text-xs"
                placeholder={t('contact.messagePlaceholder')}
              />

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-3 py-2 bg-blue-500/80 hover:bg-blue-600/80 disabled:bg-gray-400/60 backdrop-blur-sm text-white rounded-lg transition-all flex items-center justify-center space-x-2 text-xs font-medium"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>{t('contact.sending')}</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3 h-3" />
                    <span>{t('contact.send')}</span>
                  </>
                )}
              </button>

              {/* Status Messages */}
              {submitStatus === 'success' && (
                <div className="p-2 bg-green-100/80 dark:bg-green-900/40 backdrop-blur-sm border border-green-300/50 dark:border-green-600/30 rounded-lg text-green-700 dark:text-green-300 text-[10px] text-center">
                  ✓ {t('contact.successMessage')}
                </div>
              )}
              
              {submitStatus === 'error' && (
                <div className="p-2 bg-red-100/80 dark:bg-red-900/40 backdrop-blur-sm border border-red-300/50 dark:border-red-600/30 rounded-lg text-red-700 dark:text-red-300 text-[10px] text-center">
                  ✗ {t('contact.errorMessage')}
                </div>
              )}

              {/* Privacy Notice */}
              <p className="text-[10px] text-gray-500 dark:text-gray-400 text-center leading-tight">
                {t('contact.privacyNotice')}
              </p>
            </form>
          </div>
        </div>
      )}

      {/* Custom CSS for animation */}
      <style>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-slideUp {
          animation: slideUp 0.2s ease-out;
        }
      `}</style>
    </>
  );
}

