// @ts-nocheck
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Mission from './components/Mission';
import Services from './components/Services';
import Contact from './components/Contact';
import Footer from './components/Footer';
import VirtualAssistant from './components/VirtualAssistant';
import Catalog from './components/Catalog';
import SEO from './components/SEO';

// Home Page Component
function HomePage() {
  return (
    <>
      <SEO 
        title="ООО «Tamex» - Поставщик нефтегазового оборудования из Китая | Ташкент, Узбекистан"
        description="ООО «Tamex» - надежный поставщик нефтегазового и промышленного оборудования из Китая. Прямые контракты с заводами-производителями. Оперативные поставки для предприятий Узбекистана и Казахстана."
        keywords="нефтегазовое оборудование, промышленное оборудование, поставщик оборудования, Китай, Узбекистан, Ташкент, Казахстан, Тараз, фонтанная арматура, ПВО, насосы, компрессоры, трубы, фитинги, КИПиА, буровое оборудование"
      />
      <Hero />
      <About />
      <Services />
      <Contact />
    </>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <Router>
          <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
            <Header />
            <main>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/catalog" element={
                  <>
                    <SEO 
                      title="Каталог нефтегазового оборудования | ООО «Tamex»"
                      description="Полный каталог нефтегазового и промышленного оборудования от ООО «Tamex». Фонтанная арматура, ПВО, насосы, компрессоры, трубы, фитинги, КИПиА, буровое оборудование из Китая."
                      keywords="каталог оборудования, нефтегазовое оборудование, промышленное оборудование, фонтанная арматура, ПВО, насосы, компрессоры, трубы, фитинги, КИПиА, буровое оборудование"
                    />
                    <Catalog />
                  </>
                } />
              </Routes>
            </main>
            <Footer />
            <VirtualAssistant />
          </div>
        </Router>
      </ThemeProvider>
    </LanguageProvider>
  );
}
