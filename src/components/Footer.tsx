import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { RoundLogo } from './RoundLogo.js';
import type { Language } from '../utils/translations.js';
import { translations } from '../utils/translations.js';

interface FooterProps {
  onOpenModule: (moduleId: string) => void;
  language: Language;
}

export const Footer: React.FC<FooterProps> = ({ onOpenModule, language }) => {
  const t = translations[language];

  return (
    <footer className="bg-stone-950 text-stone-300 border-t border-stone-800">
      
      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Col 1: Brand & Municipal Mission */}
          <div className="md:col-span-5 space-y-4">
            
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full p-0.5 bg-gradient-to-tr from-amber-400 via-emerald-600 to-emerald-900 flex items-center justify-center shadow-xs">
                <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                  <RoundLogo size={42} />
                </div>
              </div>
              <div>
                <span className="font-heading font-extrabold text-white text-base tracking-tight block">
                  {t.councillorName}
                </span>
                <span className="text-[10px] font-semibold text-emerald-400 uppercase tracking-wider block">
                  {t.councillorTitle}
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-stone-400 leading-relaxed max-w-sm">
              {t.footerAboutDesc}
            </p>
          </div>

          {/* Col 2: Quick Links */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="font-heading font-bold text-white text-sm uppercase tracking-wider">
              {t.footerQuickLinks}
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <button
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="text-stone-400 hover:text-white transition-colors cursor-pointer"
                >
                  {t.navHome}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenModule('about')}
                  className="text-stone-400 hover:text-white transition-colors cursor-pointer"
                >
                  {t.navAbout}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenModule('projects')}
                  className="text-stone-400 hover:text-white transition-colors cursor-pointer"
                >
                  {t.navProjects}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenModule('gallery')}
                  className="text-stone-400 hover:text-white transition-colors cursor-pointer"
                >
                  {t.navGallery}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenModule('contact')}
                  className="text-stone-400 hover:text-white transition-colors cursor-pointer"
                >
                  {t.navContact}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Resources */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="font-heading font-bold text-white text-sm uppercase tracking-wider">
              {t.footerResources}
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <button
                  onClick={() => onOpenModule('help_center')}
                  className="text-stone-400 hover:text-white transition-colors cursor-pointer"
                >
                  {t.footerHelpCenter}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenModule('faqs')}
                  className="text-stone-400 hover:text-white transition-colors cursor-pointer"
                >
                  {t.footerFAQs}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenModule('privacy')}
                  className="text-stone-400 hover:text-white transition-colors cursor-pointer"
                >
                  {t.footerPrivacy}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenModule('terms')}
                  className="text-stone-400 hover:text-white transition-colors cursor-pointer"
                >
                  {t.footerTerms}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenModule('emergency')}
                  className="text-red-400 hover:text-red-300 font-semibold transition-colors cursor-pointer"
                >
                  {t.modules.emergencyContacts.title}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Follow Us & Social Icons */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-heading font-bold text-white text-sm uppercase tracking-wider">
              {t.footerFollowUs}
            </h4>
            
            {/* Social Icons Grid */}
            <div className="flex items-center gap-2.5">
              
              {/* Facebook */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center hover:scale-110 transition-transform shadow-xs"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>

              {/* WhatsApp */}
              <a
                href="https://wa.me/94702475248"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-9 h-9 rounded-full bg-green-500 text-white flex items-center justify-center hover:scale-110 transition-transform shadow-xs"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.007c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.861.173.086.275.072.376-.044.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.099.824zm-3.423-14.416c-6.627 0-12 5.373-12 12 0 2.159.57 4.187 1.564 5.946l-1.564 5.828 6.012-1.547c1.68.918 3.597 1.439 5.628 1.439 6.627 0 12-5.373 12-12 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>

              {/* YouTube */}
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="w-9 h-9 rounded-full bg-red-600 text-white flex items-center justify-center hover:scale-110 transition-transform shadow-xs"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-gradient-to-tr from-amber-500 via-pink-600 to-purple-600 text-white flex items-center justify-center hover:scale-110 transition-transform shadow-xs"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>

            </div>

            <p className="text-xs text-amber-400 font-serif-quote italic pt-1">
              {t.slogan}
            </p>
          </div>

        </div>

        {/* Bottom Copyright & Disclaimer */}
        <div className="mt-12 pt-6 border-t border-stone-900 flex flex-col sm:flex-row items-center justify-between gap-3 text-stone-400 text-xs">
          <p>© 2024 Sarooj Sattar Community Forum. All Rights Reserved.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Verified Municipal Citizen Platform</span>
            </span>
          </div>
        </div>

      </div>

    </footer>
  );
};
