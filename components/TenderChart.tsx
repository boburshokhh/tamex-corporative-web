import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function TenderChart() {
  const { theme } = useTheme();
  const { t } = useLanguage();
  
  // Получаем месяцы как массив
  const getMonths = () => {
    const months = t('chart.months');
    // Если это строка, разбиваем по запятым, иначе возвращаем как есть
    return typeof months === 'string' ? months.split(', ') : months;
  };
  
  // Цвета для светлой темы
  const lightTheme = {
    primary: '#1E3A8A', // Темно-синий из дизайн-системы
    secondary: '#EA580C', // Оранжевый из дизайн-системы (как на изображении)
    text: '#374151', // Графитовый для осей
    grid: 'rgba(156, 163, 175, 0.3)', // Более заметная сетка
    tooltipBg: 'rgba(0, 0, 0, 0.8)',
    tooltipText: '#ffffff',
    tooltipBorder: '#374151',
    background: '#ffffff', // Белый фон графика
    chartBg: '#f8fafc', // Очень светло-серый фон области графика
  };
  
  // Цвета для темной темы
  const darkTheme = {
    primary: '#60A5FA', // Светло-синий для темной темы
    secondary: '#FCD34D', // Светло-золотой для темной темы
    text: '#E5E7EB', // Светло-серый
    grid: 'rgba(156, 163, 175, 0.1)',
    tooltipBg: 'rgba(0, 0, 0, 0.9)',
    tooltipText: '#ffffff',
    tooltipBorder: '#6B7280',
    background: '#1F2937', // Темно-серый фон
    chartBg: '#111827', // Очень темный фон области графика
  };
  
  const colors = theme === 'light' ? lightTheme : darkTheme;
  
  const data = {
    labels: getMonths(),
    datasets: [
      {
        label: t('chart.successfulTenders'),
        data: [5, 8, 12, 15, 18, 20],
        borderColor: colors.primary,
        backgroundColor: theme === 'light' 
          ? 'rgba(30, 58, 138, 0.08)' 
          : 'rgba(96, 165, 250, 0.1)',
        borderWidth: 2,
        fill: true,
        tension: 0.4,
        pointRadius: 6,
        pointHoverRadius: 8,
        pointBackgroundColor: colors.primary,
        pointBorderColor: theme === 'light' ? '#ffffff' : '#1F2937',
        pointBorderWidth: 2,
      },
      {
        label: t('chart.supplyVolume'),
        data: [0.1, 0.2, 0.4, 0.6, 0.8, 1.0],
        borderColor: colors.secondary,
        backgroundColor: theme === 'light' 
          ? 'rgba(234, 88, 12, 0.05)' 
          : 'rgba(252, 211, 77, 0.05)',
        borderWidth: 2,
        fill: false,
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6,
        pointBackgroundColor: colors.secondary,
        pointBorderColor: theme === 'light' ? '#ffffff' : '#1F2937',
        pointBorderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: colors.tooltipBg,
        titleColor: colors.tooltipText,
        bodyColor: colors.tooltipText,
        borderColor: colors.tooltipBorder,
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: false,
        callbacks: {
          title: function(context: any) {
            return `${context[0].label}`;
          },
          label: function(context: any) {
            return `${context.parsed.y} ${t('chart.tendersCount')}`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: colors.text,
          font: {
            size: 12,
            weight: 500,
          },
        },
        border: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: colors.grid,
          drawBorder: false,
          lineWidth: 1,
        },
        ticks: {
          color: colors.text,
          font: {
            size: 12,
            weight: 500,
          },
          callback: function(value: any) {
            return value;
          },
        },
        border: {
          display: false,
        },
      },
    },
    elements: {
      point: {
        hoverBorderWidth: 3,
      },
    },
  };

  return (
    <div 
      className="w-full h-80 rounded-lg p-6"
      style={{ backgroundColor: colors.chartBg }}
    >
      <Line data={data} options={options} />
    </div>
  );
}
