import React from 'react';
import { Play, TrendingUp, Users, ExternalLink } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function TenderCards() {
  const { t } = useLanguage();
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-full">
      {/* Business Lectures Card */}
      <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-xl p-6 border border-amber-200/50 dark:border-amber-700/50 hover:shadow-lg transition-all duration-300 flex flex-col justify-between">
        <div className="flex items-center justify-between mb-4">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md">
            <Play className="w-5 h-5 text-black ml-0.5" />
          </div>
          <div className="flex -space-x-2">
            <div className="w-8 h-8 rounded-full bg-red-400 border-2 border-white"></div>
            <div className="w-8 h-8 rounded-full bg-blue-300 border-2 border-white"></div>
            <div className="w-8 h-8 rounded-full bg-green-300 border-2 border-white"></div>
          </div>
        </div>
        
        <div className="space-y-1">
          <div className="text-gray-600 dark:text-gray-300 text-sm font-medium">
            {t('tenderCards.successfulTenders')}
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            50+
          </div>
        </div>
      </div>

      {/* Business Metrics Card */}
      <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl p-6 border border-blue-200/50 dark:border-blue-700/50 hover:shadow-lg transition-all duration-300 flex flex-col justify-between">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            </div>
            <span className="text-white text-sm font-medium bg-purple-600 px-2 py-1 rounded-md">
              {t('tenderCards.volume')}
            </span>
          </div>
          <div className="w-8 h-8 bg-white rounded flex items-center justify-center shadow-md">
            <ExternalLink className="w-4 h-4 text-gray-600" />
          </div>
        </div>
        
        <div className="space-y-1">
          <div className="text-gray-900 dark:text-white text-sm font-medium">
            {t('tenderCards.onTimeDelivery')}
          </div>
          <div className="text-gray-900 dark:text-white text-sm font-medium">
            {t('tenderCards.obligations')}
          </div>
        </div>
      </div>
    </div>
  );
}
