import React, { useState } from 'react';
import { 
  Phone, 
  MessageSquare, 
  AlertCircle, 
  Database, 
  Menu, 
  X, 
  ShieldAlert, 
  Award,
  Sparkles
} from 'lucide-react';

interface NavbarProps {
  onOpenModule: (moduleName: string) => void;
  unreadCount?: number;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenModule, unreadCount = 3 }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200 shadow-xs">
      {/* Top Municipal Emergency Ticker Banner */}
      <div className="bg-emerald-900 text-emerald-100 text-xs py-1.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-500 text-stone-900 uppercase tracking-wider">
              Negombo MC
            </span>
            <span className="hidden sm:inline font-medium">
              Official Grievance & Citizen Empowerment Portal • Ward 05 Periyamulla & Negombo Municipal Council
            </span>
            <span className="sm:hidden font-medium truncate">
              Negombo Citizen Portal • Ward 5
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs font-semibold">
            <a
              href="tel:0702475248"
              className="flex items-center gap-1.5 hover:text-amber-400 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>Direct Line: 0702475248</span>
            </a>
            <button
              onClick={() => onOpenModule('render_blueprint')}
              className="hidden md:flex items-center gap-1 text-emerald-200 hover:text-white bg-emerald-800/80 px-2 py-0.5 rounded border border-emerald-700 hover:border-emerald-500 transition-colors"
              title="View render.yaml & PostgreSQL Configuration"
            >
              <Database className="w-3 h-3 text-cyan-300" />
              <span>render.yaml (Postgres)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        {/* Brand Logo with Dove & Leaf Crest */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-3 text-left group"
        >
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-800 via-emerald-700 to-teal-900 flex items-center justify-center shadow-md border border-emerald-600/30 group-hover:scale-105 transition-transform">
            <svg
              className="w-7 h-7 text-amber-300 drop-shadow-xs"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              {/* Peace Dove with Olive Branch icon */}
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1 1.05.82 1.87 2.65 1.87 1.96 0 2.4-.98 2.4-1.59 0-.83-.44-1.61-2.67-2.14-2.48-.6-3.74-1.47-3.74-3.23 0-1.54 1.18-2.82 2.67-3.18V4.5h2.67v1.94c1.47.33 2.63 1.34 2.8 2.96h-1.96c-.16-.83-.82-1.48-2.17-1.48-1.51 0-2.15.75-2.15 1.45 0 .76.54 1.3 2.63 1.84 2.6.66 3.78 1.49 3.78 3.32 0 1.63-1.19 2.92-2.89 3.25z" fill="none" />
              <path d="M19.07 4.93C17.22 3.08 14.73 2 12 2 6.48 2 2 6.48 2 12c0 2.73 1.08 5.22 2.93 7.07l1.41-1.41C4.89 16.21 4 14.21 4 12c0-4.41 3.59-8 8-8 2.21 0 4.21.89 5.66 2.34l1.41-1.41zM20 12c0 2.21-.89 4.21-2.34 5.66l1.41 1.41C20.92 17.22 22 14.73 22 12c0-2.73-1.08-5.22-2.93-7.07l-1.41 1.41C19.11 7.79 20 9.79 20 12z"/>
              <circle cx="12" cy="12" r="3" fill="#FBBF24" />
            </svg>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-heading font-extrabold text-stone-900 text-lg sm:text-xl tracking-tight leading-none group-hover:text-emerald-800 transition-colors">
                SAROOJ SATTAR
              </span>
            </div>
            <div className="text-[11px] font-semibold tracking-wider uppercase text-emerald-800 flex items-center gap-1 mt-0.5">
              <span>COMMUNITY FORUM</span>
              <span className="text-stone-400">•</span>
              <span className="text-stone-500 font-medium normal-case text-[10px]">Negombo MC</span>
            </div>
            <div className="text-[9px] text-stone-400 font-serif italic tracking-wide">
              Together for a better tomorrow.
            </div>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-stone-700">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="hover:text-emerald-700 transition-colors font-semibold text-emerald-800"
          >
            Home
          </button>
          <button
            onClick={() => onOpenModule('about')}
            className="hover:text-emerald-700 transition-colors"
          >
            About Us
          </button>
          <button
            onClick={() => onOpenModule('projects')}
            className="hover:text-emerald-700 transition-colors"
          >
            Projects
          </button>
          <button
            onClick={() => onOpenModule('announcements')}
            className="hover:text-emerald-700 transition-colors flex items-center gap-1"
          >
            <span>Notices</span>
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping"></span>
          </button>
          <button
            onClick={() => onOpenModule('emergency')}
            className="hover:text-red-700 transition-colors text-red-700 font-semibold flex items-center gap-1"
          >
            <ShieldAlert className="w-4 h-4" />
            <span>Emergency</span>
          </button>
          <button
            onClick={() => onOpenModule('whatsapp')}
            className="hover:text-emerald-700 transition-colors flex items-center gap-1 text-emerald-700"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Contact Us</span>
          </button>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => onOpenModule('volunteer')}
            className="relative inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-bold bg-gradient-to-r from-emerald-800 to-teal-900 hover:from-emerald-900 hover:to-teal-950 text-white shadow-md hover:shadow-lg transition-all active:scale-95 border border-emerald-600/30"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Get Involved</span>
            {unreadCount > 0 && (
              <span className="inline-flex items-center justify-center w-5 h-5 text-[10px] font-black text-white bg-red-500 rounded-full shadow-xs -mr-1">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-stone-700 hover:bg-stone-100 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-stone-200 px-4 pt-2 pb-6 space-y-3 shadow-xl">
          <div className="grid grid-cols-2 gap-2 pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-3 py-2 text-left rounded-lg font-medium text-stone-700 hover:bg-emerald-50 hover:text-emerald-800 text-sm"
            >
              🏠 Home
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenModule('about');
              }}
              className="px-3 py-2 text-left rounded-lg font-medium text-stone-700 hover:bg-emerald-50 hover:text-emerald-800 text-sm"
            >
              🏛️ About Sarooj
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenModule('projects');
              }}
              className="px-3 py-2 text-left rounded-lg font-medium text-stone-700 hover:bg-emerald-50 hover:text-emerald-800 text-sm"
            >
              🏗️ Projects
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenModule('announcements');
              }}
              className="px-3 py-2 text-left rounded-lg font-medium text-stone-700 hover:bg-emerald-50 hover:text-emerald-800 text-sm"
            >
              📢 Notices
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenModule('emergency');
              }}
              className="px-3 py-2 text-left rounded-lg font-semibold text-red-700 bg-red-50 hover:bg-red-100 text-sm"
            >
              🚨 Emergency
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenModule('whatsapp');
              }}
              className="px-3 py-2 text-left rounded-lg font-medium text-emerald-800 bg-emerald-50 hover:bg-emerald-100 text-sm"
            >
              💬 WhatsApp
            </button>
          </div>

          <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenModule('render_blueprint');
              }}
              className="flex items-center gap-1.5 text-xs text-stone-600 bg-stone-100 px-3 py-2 rounded-lg"
            >
              <Database className="w-3.5 h-3.5 text-teal-600" />
              <span>render.yaml (Postgres)</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenModule('submit_complaint');
              }}
              className="px-4 py-2 bg-emerald-700 text-white rounded-lg text-xs font-bold shadow-xs"
            >
              + Submit Issue
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
