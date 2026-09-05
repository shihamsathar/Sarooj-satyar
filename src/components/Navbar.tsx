import React, { useState } from 'react';
import { 
  Phone, 
  MessageSquare, 
  Menu, 
  X, 
  Bell,
  Globe,
  User,
  ShieldCheck,
  Smartphone,
  LogOut,
  ChevronDown,
  KeyRound,
  ImagePlus
} from 'lucide-react';
import { RoundLogo } from './RoundLogo.js';
import type { Language } from '../utils/translations.js';
import { translations } from '../utils/translations.js';
import type { AuthUser } from '../types.js';

interface NavbarProps {
  onOpenModule: (moduleName: string) => void;
  unreadCount?: number;
  language: Language;
  onLanguageChange: (lang: Language) => void;
  currentUser: AuthUser | null;
  onOpenLogin: (initialTab?: 'citizen' | 'admin') => void;
  onOpenAdminDashboard: (tab?: 'grievances' | 'announcements' | 'messages' | 'citizens' | 'security' | 'photos') => void;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  onOpenModule, 
  unreadCount = 3,
  language,
  onLanguageChange,
  currentUser,
  onOpenLogin,
  onOpenAdminDashboard,
  onLogout,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const t = translations[language];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200 shadow-xs">
      {/* Top Municipal Ticker Banner */}
      <div className="bg-emerald-950 text-emerald-100 text-xs py-1.5 px-4 sm:px-6 border-b border-emerald-900">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-400 text-stone-950 uppercase tracking-wider shadow-xs">
              {t.navNegomboMc}
            </span>
            <span className="hidden sm:inline font-medium text-emerald-100">
              {t.navPortalTagline}
            </span>
            <span className="sm:hidden font-medium truncate">
              {t.navNegomboMc}
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs font-semibold">
            <a
              href="tel:0702475248"
              className="flex items-center gap-1.5 text-amber-300 hover:text-amber-200 transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>{t.navHotline}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between">
        
        {/* Left: Mobile Menu Toggle / Brand Link */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-stone-700 hover:text-stone-950 hover:bg-stone-100 transition-colors lg:hidden"
            aria-label="Open Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Brand Logo & Typography with Round Emblem */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-3 text-left group"
          >
            <div className="w-11 h-11 rounded-full p-0.5 bg-gradient-to-tr from-amber-400 via-emerald-700 to-emerald-900 shadow-sm group-hover:scale-105 transition-transform flex items-center justify-center">
              <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                <RoundLogo size={40} />
              </div>
            </div>

            <div>
              <div className="font-heading font-extrabold text-[#1B4D3E] text-base sm:text-lg tracking-wider leading-none group-hover:text-emerald-950 transition-colors">
                {t.councillorName}
              </div>
              <div className="text-[10px] font-bold tracking-widest uppercase text-[#B38B37] flex items-center gap-1 mt-0.5">
                <span>{t.communityForum}</span>
                <span className="text-stone-400">•</span>
                <span className="text-stone-500 font-medium normal-case text-[9px]">{t.navNegomboMc}</span>
              </div>
            </div>
          </button>
        </div>

        {/* Center Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-stone-700">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="hover:text-emerald-800 transition-colors font-bold text-emerald-900"
          >
            {t.navHome}
          </button>
          <button
            onClick={() => onOpenModule('about')}
            className="hover:text-emerald-800 transition-colors"
          >
            {t.navAbout}
          </button>
          <button
            onClick={() => onOpenModule('community_projects')}
            className="hover:text-emerald-800 transition-colors"
          >
            {t.navProjects}
          </button>
          <button
            onClick={() => onOpenModule('announcements')}
            className="hover:text-emerald-800 transition-colors flex items-center gap-1.5"
          >
            <span>{t.navAnnouncements}</span>
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
          </button>
          <button
            onClick={() => onOpenModule('emergency_contacts')}
            className="hover:text-red-700 transition-colors text-red-700 font-semibold"
          >
            {t.navEmergency}
          </button>
        </nav>

        {/* Right Controls: Language Selector + Quick Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Tri-Lingual Language Quick Switcher in Header */}
          <div className="flex items-center bg-stone-100 rounded-full p-0.5 border border-stone-300 text-xs font-bold shadow-2xs">
            <button
              onClick={() => onLanguageChange('en')}
              className={`px-2.5 py-1 rounded-full transition-all ${
                language === 'en'
                  ? 'bg-emerald-900 text-amber-300 shadow-xs font-black'
                  : 'text-stone-700 hover:text-stone-950'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => onLanguageChange('si')}
              className={`px-2.5 py-1 rounded-full transition-all font-sinhala ${
                language === 'si'
                  ? 'bg-emerald-900 text-amber-300 shadow-xs font-black'
                  : 'text-stone-700 hover:text-stone-950'
              }`}
            >
              සිං
            </button>
            <button
              onClick={() => onLanguageChange('ta')}
              className={`px-2.5 py-1 rounded-full transition-all font-tamil ${
                language === 'ta'
                  ? 'bg-emerald-900 text-amber-300 shadow-xs font-black'
                  : 'text-stone-700 hover:text-stone-950'
              }`}
            >
              தமிழ்
            </button>
          </div>

          {/* Notification Bell */}
          <button
            onClick={() => onOpenModule('announcements')}
            className="relative p-2 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors"
            aria-label="View Announcements & Notifications"
          >
            <Bell className="w-5 h-5 text-stone-800" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-600 rounded-full ring-2 ring-white animate-pulse" />
            )}
          </button>

          {/* Quick Submit Complaint CTA */}
          <button
            onClick={() => onOpenModule('submit_complaint')}
            className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-emerald-800 hover:bg-emerald-900 text-white text-xs sm:text-sm font-bold shadow-xs transition-all hover:shadow-md"
          >
            <span>{t.navSubmitGrievance}</span>
          </button>

          {/* USER AUTH CONTROLS */}
          {!currentUser ? (
            // LOGGED OUT: Show Login button opening AuthModal
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => onOpenLogin('citizen')}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-amber-400 hover:bg-amber-300 text-stone-950 text-xs font-black shadow-xs transition-all hover:scale-105"
                title="Sign in with Mobile OTP or Admin credentials"
              >
                <Smartphone className="w-3.5 h-3.5 text-stone-950" />
                <span>Log In</span>
              </button>
            </div>
          ) : currentUser.role === 'admin' ? (
            // LOGGED IN AS ADMIN: Show Admin Quick Add Photos + Admin Console badge & control
            <div className="flex items-center gap-1.5 sm:gap-2">
              <button
                onClick={() => onOpenAdminDashboard('photos')}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 text-stone-950 text-xs font-black shadow-xs border border-amber-300 transition-all hover:scale-105 cursor-pointer"
                title="Add Background Photos & Manage Photo Slots"
              >
                <ImagePlus className="w-3.5 h-3.5 text-stone-950" />
                <span>+ Add Photos</span>
              </button>

              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-stone-900 hover:bg-black text-amber-300 text-xs font-bold shadow-xs border border-amber-400/60 transition-all"
                >
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                  <span className="hidden sm:inline">Admin Console</span>
                  <span className="sm:hidden">Admin</span>
                  <ChevronDown className="w-3 h-3 text-stone-400" />
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-stone-200 py-2 z-50 text-xs animate-fadeIn">
                    <div className="px-3.5 py-2 border-b border-stone-100 bg-stone-50">
                      <div className="font-bold text-stone-900">{currentUser.name}</div>
                      <div className="text-[10px] text-emerald-800 font-semibold">{currentUser.title}</div>
                    </div>
                    
                    {/* Direct Add Photos in Dropdown */}
                    <button
                      onClick={() => {
                        onOpenAdminDashboard('photos');
                        setUserDropdownOpen(false);
                      }}
                      className="w-full text-left px-3.5 py-2.5 text-stone-900 bg-amber-50/60 hover:bg-amber-100/80 font-black flex items-center gap-2 text-amber-950 border-b border-amber-100/60 cursor-pointer"
                    >
                      <ImagePlus className="w-4 h-4 text-amber-600" />
                      <span>+ Add Photos & Background</span>
                    </button>

                    <button
                      onClick={() => {
                        onOpenAdminDashboard();
                        setUserDropdownOpen(false);
                      }}
                      className="w-full text-left px-3.5 py-2 text-stone-800 hover:bg-stone-100 font-bold flex items-center gap-2 cursor-pointer"
                    >
                      <ShieldCheck className="w-4 h-4 text-emerald-700" />
                      <span>Open Admin Console</span>
                    </button>
                    <button
                      onClick={() => {
                        onOpenAdminDashboard('security');
                        setUserDropdownOpen(false);
                      }}
                      className="w-full text-left px-3.5 py-2 text-stone-700 hover:bg-stone-100 font-medium flex items-center gap-2 cursor-pointer"
                    >
                      <KeyRound className="w-4 h-4 text-amber-600" />
                      <span>Change Password</span>
                    </button>
                    <button
                      onClick={() => {
                        onOpenModule('my_complaints');
                        setUserDropdownOpen(false);
                      }}
                      className="w-full text-left px-3.5 py-2 text-stone-700 hover:bg-stone-100 flex items-center gap-2 cursor-pointer"
                    >
                      <Phone className="w-4 h-4 text-stone-500" />
                      <span>View All Complaints</span>
                    </button>
                    <div className="border-t border-stone-100 my-1"></div>
                    <button
                      onClick={() => {
                        onLogout();
                        setUserDropdownOpen(false);
                      }}
                      className="w-full text-left px-3.5 py-2 text-red-600 hover:bg-red-50 font-bold flex items-center gap-2 cursor-pointer"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Log Out</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            // LOGGED IN AS CITIZEN (PEOPLE): Show Citizen profile badge
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-100 hover:bg-emerald-200 text-emerald-950 text-xs font-bold border border-emerald-300 transition-colors"
              >
                <div className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                <span className="font-mono text-xs">{currentUser.phone}</span>
                <ChevronDown className="w-3 h-3 text-emerald-800" />
              </button>

              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-stone-200 py-2 z-50 text-xs animate-fadeIn">
                  <div className="px-3.5 py-2 border-b border-stone-100 bg-stone-50">
                    <div className="font-bold text-stone-900">{currentUser.name}</div>
                    <div className="text-[10px] text-stone-500">{currentUser.ward}</div>
                    <div className="text-[10px] font-mono text-emerald-800 font-bold mt-0.5">
                      Verified: {currentUser.phone}
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      onOpenModule('my_complaints');
                      setUserDropdownOpen(false);
                    }}
                    className="w-full text-left px-3.5 py-2.5 text-stone-800 hover:bg-stone-100 font-bold flex items-center gap-2"
                  >
                    <span>📋 My Grievance Tickets</span>
                  </button>
                  <button
                    onClick={() => {
                      onOpenModule('my_profile');
                      setUserDropdownOpen(false);
                    }}
                    className="w-full text-left px-3.5 py-2 text-stone-700 hover:bg-stone-100 flex items-center gap-2"
                  >
                    <User className="w-4 h-4 text-stone-500" />
                    <span>Citizen Profile & Activity</span>
                  </button>
                  <button
                    onClick={() => {
                      onOpenModule('submit_complaint');
                      setUserDropdownOpen(false);
                    }}
                    className="w-full text-left px-3.5 py-2 text-stone-700 hover:bg-stone-100 flex items-center gap-2"
                  >
                    <span>✍️ Submit New Grievance</span>
                  </button>
                  <div className="border-t border-stone-100 my-1"></div>
                  <button
                    onClick={() => {
                      onLogout();
                      setUserDropdownOpen(false);
                    }}
                    className="w-full text-left px-3.5 py-2 text-red-600 hover:bg-red-50 font-bold flex items-center gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Log Out</span>
                  </button>
                </div>
              )}
            </div>
          )}

          {/* WhatsApp Direct Line */}
          <button
            onClick={() => onOpenModule('contact_sarooj')}
            className="hidden md:inline-flex items-center gap-1.5 px-3 py-2 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-950 text-xs font-bold border border-emerald-300 transition-colors"
          >
            <MessageSquare className="w-4 h-4 text-emerald-700" />
            <span>{t.openWhatsApp}</span>
          </button>
        </div>

      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-stone-200 bg-white px-4 py-4 space-y-3 shadow-lg">
          
          {/* Mobile Auth Banner */}
          <div className="p-3 rounded-2xl bg-stone-100 border border-stone-200 flex items-center justify-between gap-3">
            {!currentUser ? (
              <div className="flex items-center justify-between w-full">
                <div>
                  <div className="text-xs font-bold text-stone-900">Sign in to Citizen Portal</div>
                  <div className="text-[10px] text-stone-500">Track complaints & get SMS alerts</div>
                </div>
                <div className="flex gap-1.5">
                  <button
                    onClick={() => {
                      onOpenLogin('citizen');
                      setMobileMenuOpen(false);
                    }}
                    className="px-3 py-1.5 rounded-xl bg-amber-400 text-stone-950 font-bold text-xs shadow-xs"
                  >
                    People OTP
                  </button>
                  <button
                    onClick={() => {
                      onOpenLogin('admin');
                      setMobileMenuOpen(false);
                    }}
                    className="px-2.5 py-1.5 rounded-xl bg-stone-900 text-amber-300 font-bold text-xs"
                  >
                    Admin
                  </button>
                </div>
              </div>
            ) : currentUser.role === 'admin' ? (
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-amber-600" />
                  <div>
                    <div className="text-xs font-bold text-stone-900">{currentUser.name} (Admin)</div>
                    <div className="text-[10px] text-stone-500">{currentUser.title}</div>
                  </div>
                </div>
                <div className="flex gap-1.5">
                  <button
                    onClick={() => {
                      onOpenAdminDashboard('security');
                      setMobileMenuOpen(false);
                    }}
                    className="px-2.5 py-1 rounded-lg bg-amber-400 text-stone-950 text-xs font-bold flex items-center gap-1"
                    title="Change Admin Password"
                  >
                    <KeyRound className="w-3 h-3" />
                    <span>Pass</span>
                  </button>
                  <button
                    onClick={() => {
                      onOpenAdminDashboard();
                      setMobileMenuOpen(false);
                    }}
                    className="px-2.5 py-1 rounded-lg bg-stone-900 text-amber-300 text-xs font-bold"
                  >
                    Console
                  </button>
                  <button
                    onClick={() => {
                      onLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="p-1 text-red-600 font-bold text-xs"
                    title="Log Out"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between w-full">
                <div>
                  <div className="text-xs font-bold text-stone-900">{currentUser.name}</div>
                  <div className="text-[10px] text-emerald-800 font-mono font-bold">📱 {currentUser.phone}</div>
                </div>
                <button
                  onClick={() => {
                    onLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="px-2.5 py-1 rounded-lg bg-red-100 text-red-800 text-xs font-bold flex items-center gap-1"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Exit</span>
                </button>
              </div>
            )}
          </div>
          <div className="grid grid-cols-2 gap-2 text-sm font-medium">
            <button
              onClick={() => {
                onOpenModule('submit_complaint');
                setMobileMenuOpen(false);
              }}
              className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-950 font-bold text-left"
            >
              + {t.modules.submitComplaint.title}
            </button>
            <button
              onClick={() => {
                onOpenModule('my_complaints');
                setMobileMenuOpen(false);
              }}
              className="p-3 rounded-xl bg-stone-100 text-stone-900 font-bold text-left"
            >
              {t.modules.myComplaints.title}
            </button>
            <button
              onClick={() => {
                onOpenModule('community_projects');
                setMobileMenuOpen(false);
              }}
              className="p-3 rounded-xl bg-stone-100 text-stone-900 font-bold text-left"
            >
              {t.modules.communityProjects.title}
            </button>
            <button
              onClick={() => {
                onOpenModule('announcements');
                setMobileMenuOpen(false);
              }}
              className="p-3 rounded-xl bg-stone-100 text-stone-900 font-bold text-left"
            >
              {t.modules.announcements.title} ({unreadCount})
            </button>
            <button
              onClick={() => {
                onOpenModule('about');
                setMobileMenuOpen(false);
              }}
              className="p-3 rounded-xl bg-stone-100 text-stone-900 font-bold text-left"
            >
              {t.navAbout}
            </button>
            <button
              onClick={() => {
                onOpenModule('emergency_contacts');
                setMobileMenuOpen(false);
              }}
              className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-900 font-bold text-left"
            >
              {t.modules.emergencyContacts.title}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
