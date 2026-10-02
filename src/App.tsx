import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { MarqueeTicker } from './components/MarqueeTicker';
import { AboutSection } from './components/AboutSection';
import { ShowcaseCarousel } from './components/ShowcaseCarousel';
import { ProductsCatalog } from './components/ProductsCatalog';
import { LocationsSection } from './components/LocationsSection';
import { ContactSection } from './components/ContactSection';
import { LightboxModal } from './components/LightboxModal';
import { Footer } from './components/Footer';
import { ShowcaseItem, Product } from './types';
import { MessageCircle, Phone, ArrowUpRight, Sparkles } from 'lucide-react';

export default function App() {
  const [activeModalItem, setActiveModalItem] = useState<ShowcaseItem | Product | null>(null);

  // High-performance IntersectionObserver & MutationObserver for buttery-smooth scroll reveals
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.08,
        rootMargin: '0px 0px 80px 0px',
      }
    );

    const observeAll = () => {
      document.querySelectorAll('[data-reveal]:not(.reveal-visible)').forEach((el) => {
        observer.observe(el);
      });
    };

    observeAll();

    const mutationObserver = new MutationObserver(() => {
      observeAll();
    });

    mutationObserver.observe(document.body, { childList: true, subtree: true });

    // Fallback timer: ensure all elements become visible even if scrolling or device is constrained
    const safetyTimer = setTimeout(() => {
      document.querySelectorAll('[data-reveal]:not(.reveal-visible)').forEach((el) => {
        el.classList.add('reveal-visible');
      });
    }, 1500);

    return () => {
      clearTimeout(safetyTimer);
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#f5f7fc] text-[#0f172a] flex flex-col selection:bg-[#2563eb] selection:text-white font-sans antialiased">
      {/* Top Header Navigation */}
      <Header />

      {/* Main Content Sections */}
      <main className="grow">
        {/* Hero Section with Checkered Grid & Analog Clock */}
        <Hero
          onExploreClick={() => {
            const el = document.getElementById('catalogue');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
          onSelectProduct={(title) => {
            const el = document.getElementById('catalogue');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* High-Energy Typography Marquee Ticker */}
        <MarqueeTicker />

        {/* About Section: Vision & Minimalist Ergonomics */}
        <AboutSection />

        {/* 3D Perspective Fan Carousel (Reference Showcase Component) */}
        <ShowcaseCarousel onOpenLightbox={(item) => setActiveModalItem(item)} />

        {/* Products & Tech Accessories Catalogue */}
        <ProductsCatalog onSelectProduct={(prod) => setActiveModalItem(prod)} />

        {/* Store Locations Hub: Abeokuta & Computer Village */}
        <LocationsSection />

        {/* Direct Inquiries & Interactive Order Form */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Lightbox / Detail Modal */}
      <LightboxModal
        item={activeModalItem}
        onClose={() => setActiveModalItem(null)}
      />

      {/* Floating Sticky Quick Action: WhatsApp Button */}
      <div className="fixed bottom-5 right-4 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end gap-2">
        <a
          href="https://wa.me/2349063192326?text=Hello%20Swavy%20Gadget%2C%20I%20want%20to%20inquire%20about%20tech%20accessories%20and%20desk%20setups."
          target="_blank"
          rel="noopener noreferrer"
          className="group bg-[#25D366] hover:bg-black hover:text-white text-white border-2 border-black font-black text-xs uppercase tracking-wider py-3 px-4 sm:px-5 rounded-full shadow-2xl flex items-center gap-2.5 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
          aria-label="Chat on WhatsApp with Swavy Gadget"
        >
          <div className="relative">
            <MessageCircle size={18} className="fill-current text-white group-hover:text-[#25D366]" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-white animate-ping" />
          </div>
          <span className="hidden xs:inline-block font-mono">Chat on WhatsApp</span>
          <span className="xs:hidden font-mono">09063192326</span>
          <ArrowUpRight size={14} className="stroke-[3]" />
        </a>
      </div>
    </div>
  );
}
