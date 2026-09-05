import React from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  HardHat, 
  ChevronRight, 
  MessageCircle, 
  Clock, 
  Sparkles,
  ShieldCheck,
  Building2,
  Construction
} from 'lucide-react';
import type { CommunityProject } from '../types.js';
import type { Language } from '../utils/translations.js';
import { translations } from '../utils/translations.js';

interface QuickContactAndOngoingProjectProps {
  ongoingProject?: CommunityProject;
  onViewAllProjects: () => void;
  onOpenProjectDetail?: (project: CommunityProject) => void;
  onOpenContactForm: () => void;
  language: Language;
  projectPhotoUrl?: string;
}

export const QuickContactAndOngoingProject: React.FC<QuickContactAndOngoingProjectProps> = ({
  ongoingProject,
  onViewAllProjects,
  onOpenProjectDetail,
  onOpenContactForm,
  language,
  projectPhotoUrl,
}) => {
  const t = translations[language];

  const project = ongoingProject || {
    id: 'p1',
    title: t.ongoingProjectTitle,
    slug: 'road-development-periyamulla',
    description: t.ongoingProjectSubtitle,
    category: 'Roads & Bridges',
    ward: 'Periyamulla',
    progressPercentage: 65,
    status: 'ongoing' as const,
    budgetLKR: 18500000,
    spentLKR: 12025000,
    contractor: 'Western Provincial Road Development Authority & Negombo MC',
    startDate: '2024-03-15',
    expectedEndDate: '2024-11-30',
    impactMetric: 'Benefits 4,200+ households',
    highlights: ['First layer asphalt carpeting underway on Sector B (65%)']
  };

  return (
    <section className="py-10 bg-gradient-to-b from-[#F8F3EA] via-[#FDF9F2] to-white border-t-2 border-amber-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Left Card: Quick Contact */}
          <div className="bg-gradient-to-br from-white via-emerald-50/40 to-teal-50/70 rounded-3xl p-6 sm:p-7 border-2 border-emerald-200 shadow-md flex flex-col justify-between relative overflow-hidden group">
            
            {/* Top Header */}
            <div>
              <div className="flex items-center justify-between pb-4 border-b-2 border-emerald-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-700 to-teal-900 text-white flex items-center justify-center shadow-md">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-heading font-black text-[#134234] text-xl sm:text-2xl tracking-tight">
                      {t.quickContactTitle}
                    </h3>
                    <p className="text-xs text-stone-600 font-bold">
                      {t.quickContactSubtitle}
                    </p>
                  </div>
                </div>

                <span className="inline-flex items-center gap-1.5 text-xs font-black text-emerald-950 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300 shadow-2xs">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                  <span>{t.quickContactStatus}</span>
                </span>
              </div>

              {/* Main Content Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 mt-5 items-center">
                
                {/* Contact List */}
                <div className="sm:col-span-7 space-y-3.5 text-xs sm:text-sm text-stone-700">
                  
                  {/* WhatsApp Direct */}
                  <a
                    href="https://wa.me/94702475248?text=Hello%20Councillor%20Sarooj%20Sattar,%20I%20am%20a%20resident%20of%20Negombo."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 p-2 rounded-xl bg-white/80 border border-green-200 hover:bg-green-50 text-stone-900 hover:text-emerald-900 transition-all shadow-2xs group/item"
                  >
                    <div className="w-8 h-8 rounded-lg bg-green-500 text-white flex items-center justify-center shrink-0 shadow-xs">
                      <MessageCircle className="w-4 h-4" />
                    </div>
                    <span className="font-extrabold text-stone-950 group-hover/item:text-emerald-800">
                      0702475248
                    </span>
                    <span className="text-[10px] uppercase font-black text-green-950 bg-green-200 px-2 py-0.5 rounded-full ml-auto">
                      WhatsApp
                    </span>
                  </a>

                  {/* Hotlines */}
                  <div className="flex items-center gap-2.5 p-2 rounded-xl bg-white/80 border border-amber-200 text-stone-900 shadow-2xs">
                    <div className="w-8 h-8 rounded-lg bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-xs">
                      <Phone className="w-4 h-4" />
                    </div>
                    <span className="font-extrabold text-stone-900">
                      0702475248 / 0768787382
                    </span>
                  </div>

                  {/* Email */}
                  <a
                    href="mailto:saroojsattar@gmail.com"
                    className="flex items-center gap-2.5 p-2 rounded-xl bg-white/80 border border-blue-200 text-stone-900 hover:text-blue-900 hover:bg-blue-50 transition-all shadow-2xs truncate"
                  >
                    <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                      <Mail className="w-4 h-4" />
                    </div>
                    <span className="font-bold truncate">saroojsattar@gmail.com</span>
                  </a>

                  {/* Physical Address */}
                  <div className="flex items-start gap-2.5 p-2 rounded-xl bg-white/80 border border-rose-200 text-stone-900 shadow-2xs">
                    <div className="w-8 h-8 rounded-lg bg-rose-600 text-white flex items-center justify-center shrink-0 shadow-xs mt-0.5">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <span className="font-bold text-stone-800 leading-snug">
                      36 - St. Lasarus Road, Periyamulla, Negombo.
                    </span>
                  </div>

                </div>

                {/* Periyamulla Ward 05 Civic Card */}
                <div className="sm:col-span-5 h-48 sm:h-full min-h-[160px] rounded-2xl overflow-hidden shadow-md relative border-2 border-emerald-300 bg-gradient-to-br from-[#134234] via-[#1B4D3E] to-[#0A2540] p-4 text-white flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-amber-300 uppercase tracking-wider flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-amber-300" />
                      <span>Ward 05 • Periyamulla</span>
                    </span>
                    <Building2 className="w-4 h-4 text-emerald-300" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-amber-200 block mb-1">Negombo Municipal Council</span>
                    <p className="text-[11px] font-medium text-emerald-100/90 leading-tight">
                      {t.footerAboutDesc}
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* Bottom Direct Message Link */}
            <div className="mt-5 pt-3 border-t-2 border-emerald-100 flex items-center justify-between">
              <span className="text-xs text-stone-600 flex items-center gap-1.5 font-bold">
                <Clock className="w-4 h-4 text-emerald-700" />
                <span>{t.quickContactHoursValue}</span>
              </span>
              <button
                onClick={onOpenContactForm}
                className="text-xs font-black text-emerald-900 hover:text-emerald-950 bg-emerald-100 hover:bg-emerald-200 px-3 py-1.5 rounded-full border border-emerald-300 flex items-center gap-1 transition-all cursor-pointer"
              >
                <span>{t.quickContactDirectBtn}</span>
                <ChevronRight className="w-3.5 h-3.5 stroke-[3]" />
              </button>
            </div>

          </div>

          {/* Right Card: Ongoing Project */}
          <div className="bg-gradient-to-br from-white via-amber-50/50 to-orange-50/70 rounded-3xl p-6 sm:p-7 border-2 border-amber-200 shadow-md flex flex-col justify-between relative overflow-hidden group">
            
            <div>
              {/* Top Header */}
              <div className="flex items-center justify-between pb-4 border-b-2 border-amber-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-600 to-orange-700 text-white flex items-center justify-center shadow-md">
                    <HardHat className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-heading font-black text-stone-900 text-xl sm:text-2xl tracking-tight">
                      {t.ongoingProjectTitle}
                    </h3>
                    <p className="text-xs text-stone-600 font-bold">
                      {t.ongoingProjectBadge}
                    </p>
                  </div>
                </div>

                <span className="inline-flex items-center gap-1.5 text-xs font-black text-amber-950 bg-amber-200 px-3 py-1 rounded-full border border-amber-300 shadow-2xs">
                  <Sparkles className="w-3 h-3 text-amber-800" />
                  <span>Ward 05</span>
                </span>
              </div>

              {/* Project Card Content */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 mt-5 items-center">
                
                {/* Project Badge Card with vector civic scheme or Admin Uploaded Photo */}
                <div className="sm:col-span-5 h-44 rounded-2xl overflow-hidden shadow-md relative border-2 border-amber-400 bg-gradient-to-br from-[#1B4D3E] via-[#134234] to-stone-900 p-4 text-white flex flex-col justify-between">
                  {projectPhotoUrl && (
                    <img
                      src={projectPhotoUrl}
                      alt={project.title}
                      referrerPolicy="no-referrer"
                      className="absolute inset-0 w-full h-full object-cover z-0 group-hover:scale-105 transition-transform duration-500"
                    />
                  )}
                  {projectPhotoUrl && (
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-900/40 to-black/30 z-0" />
                  )}

                  <div className="flex items-center justify-between relative z-10">
                    <div className="inline-flex items-center gap-1 bg-black/60 backdrop-blur-xs text-amber-300 text-[10px] font-black px-2.5 py-1 rounded-full w-fit border border-amber-400/50 shadow-xs">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span>{t.ongoingProjectStatusOngoing}</span>
                    </div>
                    <Construction className="w-5 h-5 text-amber-400 drop-shadow-xs" />
                  </div>
                  <div className="relative z-10">
                    <span className="text-[11px] font-extrabold text-amber-300 block drop-shadow-sm">St. Lazarus Road</span>
                    <span className="text-sm font-black text-white leading-tight block drop-shadow-md">Asphalt & Stormwater Drains</span>
                  </div>
                </div>

                {/* Project Details */}
                <div className="sm:col-span-7 space-y-3">
                  <h4 className="font-heading font-black text-stone-900 text-base sm:text-lg leading-snug group-hover:text-amber-900 transition-colors">
                    {t.ongoingProjectTitle}
                  </h4>
                  
                  <p className="text-xs text-stone-700 line-clamp-2 leading-relaxed font-medium">
                    {t.ongoingProjectSubtitle}
                  </p>

                  {/* Progress Bar */}
                  <div className="space-y-1.5 pt-1">
                    <div className="flex items-center justify-between text-xs font-extrabold">
                      <span className="text-stone-700">{t.ongoingProjectProgress}</span>
                      <span className="text-amber-800 font-black">{project.progressPercentage}%</span>
                    </div>
                    <div className="w-full h-3 rounded-full bg-stone-200/80 overflow-hidden border border-amber-300">
                      <div 
                        className="h-full bg-gradient-to-r from-amber-400 via-amber-500 to-orange-600 rounded-full transition-all duration-1000"
                        style={{ width: `${project.progressPercentage}%` }}
                      />
                    </div>
                  </div>

                </div>

              </div>
            </div>

            {/* Bottom Link: View All Projects */}
            <div className="mt-5 pt-3 border-t-2 border-amber-100 flex items-center justify-between">
              <span className="text-xs text-stone-600 font-bold">
                {t.ongoingProjectBudget}
              </span>
              <button
                onClick={onViewAllProjects}
                className="text-xs font-black text-amber-950 bg-amber-200 hover:bg-amber-300 px-3 py-1.5 rounded-full border border-amber-400 flex items-center gap-1 transition-all cursor-pointer"
              >
                <span>{t.ongoingProjectViewAllBtn}</span>
                <ChevronRight className="w-3.5 h-3.5 stroke-[3]" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
