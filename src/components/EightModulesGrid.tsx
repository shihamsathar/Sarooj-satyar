import React, { useState } from 'react';
import { 
  FileEdit, 
  FolderKanban, 
  HardHat, 
  Megaphone, 
  PhoneCall, 
  Users, 
  User, 
  ChevronRight,
  Sparkles,
  Search,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Award
} from 'lucide-react';
import type { Language } from '../utils/translations.js';
import { translations } from '../utils/translations.js';

interface EightModulesGridProps {
  onSelectModule: (moduleId: string) => void;
  complaintCount?: number;
  projectCount?: number;
  announcementCount?: number;
  memberCount?: number;
  language: Language;
}

export const EightModulesGrid: React.FC<EightModulesGridProps> = ({
  onSelectModule,
  complaintCount = 24,
  projectCount = 4,
  announcementCount = 4,
  memberCount = 18,
  language,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');
  const t = translations[language];

  const modules = [
    {
      id: 'submit_complaint',
      title: t.modules.submitComplaint.title,
      subtitle: t.modules.submitComplaint.subtitle,
      tag: t.aiAssistedTag,
      tagBg: 'bg-emerald-100 text-emerald-950 border-emerald-400',
      category: 'Grievance',
      categoryKey: 'filterGrievance',
      icon: FileEdit,
      gradient: 'from-emerald-600 to-teal-800',
      cardBg: 'bg-gradient-to-br from-emerald-50/95 via-white to-teal-50/70',
      border: 'border-emerald-300 hover:border-emerald-600',
      textColor: 'group-hover:text-emerald-950',
    },
    {
      id: 'my_complaints',
      title: t.modules.myComplaints.title,
      subtitle: t.modules.myComplaints.subtitle,
      tag: `${complaintCount} ${t.activeComplaintsTag}`,
      tagBg: 'bg-blue-100 text-blue-950 border-blue-400',
      category: 'Grievance',
      categoryKey: 'filterGrievance',
      icon: FolderKanban,
      gradient: 'from-blue-600 to-indigo-800',
      cardBg: 'bg-gradient-to-br from-blue-50/95 via-white to-indigo-50/70',
      border: 'border-blue-300 hover:border-blue-600',
      textColor: 'group-hover:text-blue-950',
    },
    {
      id: 'community_projects',
      title: t.modules.communityProjects.title,
      subtitle: t.modules.communityProjects.subtitle,
      tag: `${projectCount} ${t.projectsTag}`,
      tagBg: 'bg-amber-100 text-amber-950 border-amber-400',
      category: 'Development',
      categoryKey: 'filterDevelopment',
      icon: HardHat,
      gradient: 'from-amber-500 to-orange-700',
      cardBg: 'bg-gradient-to-br from-amber-50/95 via-white to-orange-50/70',
      border: 'border-amber-300 hover:border-amber-600',
      textColor: 'group-hover:text-amber-950',
    },
    {
      id: 'announcements',
      title: t.modules.announcements.title,
      subtitle: t.modules.announcements.subtitle,
      tag: `${announcementCount} ${t.noticesTag}`,
      tagBg: 'bg-purple-100 text-purple-950 border-purple-400',
      category: 'News',
      categoryKey: 'filterNews',
      icon: Megaphone,
      gradient: 'from-purple-600 to-violet-800',
      cardBg: 'bg-gradient-to-br from-purple-50/95 via-white to-violet-50/70',
      border: 'border-purple-300 hover:border-purple-600',
      textColor: 'group-hover:text-purple-950',
    },
    {
      id: 'contact_sarooj',
      title: t.modules.contactSarooj.title,
      subtitle: t.modules.contactSarooj.subtitle,
      tag: '0702475248',
      tagBg: 'bg-green-100 text-green-950 border-green-400',
      category: 'Contact',
      categoryKey: 'filterContact',
      icon: PhoneCall,
      gradient: 'from-green-600 to-emerald-800',
      cardBg: 'bg-gradient-to-br from-green-50/95 via-white to-emerald-50/70',
      border: 'border-green-400 hover:border-green-600',
      textColor: 'group-hover:text-green-950',
      isWhatsApp: true,
    },
    {
      id: 'emergency_contacts',
      title: t.modules.emergencyContacts.title,
      subtitle: t.modules.emergencyContacts.subtitle,
      tag: t.helpline247Tag,
      tagBg: 'bg-rose-100 text-rose-950 border-rose-400',
      category: 'Emergency',
      categoryKey: 'filterEmergency',
      icon: PhoneCall,
      gradient: 'from-rose-600 to-red-800',
      cardBg: 'bg-gradient-to-br from-rose-50/95 via-white to-red-50/70',
      border: 'border-rose-300 hover:border-rose-600',
      textColor: 'group-hover:text-rose-950',
    },
    {
      id: 'community_members',
      title: t.modules.communityMembers.title,
      subtitle: t.modules.communityMembers.subtitle,
      tag: `${memberCount}${t.volunteersTag}`,
      tagBg: 'bg-cyan-100 text-cyan-950 border-cyan-400',
      category: 'Community',
      categoryKey: 'filterCommunity',
      icon: Users,
      gradient: 'from-teal-600 to-cyan-800',
      cardBg: 'bg-gradient-to-br from-cyan-50/95 via-white to-teal-50/70',
      border: 'border-cyan-300 hover:border-cyan-600',
      textColor: 'group-hover:text-cyan-950',
    },
    {
      id: 'my_profile',
      title: t.modules.myProfile.title,
      subtitle: t.modules.myProfile.subtitle,
      tag: t.civicPortalTag,
      tagBg: 'bg-amber-100 text-amber-950 border-amber-400',
      category: 'Portal',
      categoryKey: 'filterCommunity',
      icon: User,
      gradient: 'from-amber-600 to-yellow-700',
      cardBg: 'bg-gradient-to-br from-amber-50/95 via-white to-yellow-50/70',
      border: 'border-amber-400 hover:border-amber-600',
      textColor: 'group-hover:text-amber-950',
    },
  ];

  const filterTabs = [
    { key: 'All', label: t.filterAll },
    { key: 'Grievance', label: t.filterGrievance },
    { key: 'Development', label: t.filterDevelopment },
    { key: 'News', label: t.filterNews },
    { key: 'Contact', label: t.filterContact },
    { key: 'Emergency', label: t.filterEmergency },
  ];

  const filteredModules = modules.filter((m) => {
    const matchesSearch = 
      m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.subtitle.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === 'All' || m.category === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <section className="py-14 sm:py-18 bg-gradient-to-b from-[#FDFBF7] via-white to-[#F8F3EA] relative overflow-hidden">
      
      {/* Colourful Ambient Glows */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-400/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-400/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 space-y-8">
        
        {/* Top Key Metrics Banner */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-emerald-950 via-teal-950 to-emerald-900 border-2 border-amber-400 shadow-xl text-white">
          <div className="flex items-center gap-3 p-2 sm:border-r border-emerald-800/80">
            <div className="w-10 h-10 rounded-2xl bg-amber-400/20 border border-amber-400 flex items-center justify-center text-amber-300 shrink-0">
              <CheckCircle2 className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-black font-mono text-amber-300">{t.metricResolutionRate}</div>
              <div className="text-[11px] text-emerald-200 font-bold">{t.metricResolutionLabel}</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-2 sm:border-r border-emerald-800/80">
            <div className="w-10 h-10 rounded-2xl bg-emerald-400/20 border border-emerald-400 flex items-center justify-center text-emerald-300 shrink-0">
              <Clock className="w-5 h-5 text-emerald-300" />
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-black font-mono text-emerald-300">{t.metricResponseTime}</div>
              <div className="text-[11px] text-emerald-200 font-bold">{t.metricResponseLabel}</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-2 sm:border-r border-emerald-800/80">
            <div className="w-10 h-10 rounded-2xl bg-teal-400/20 border border-teal-400 flex items-center justify-center text-teal-300 shrink-0">
              <ShieldCheck className="w-5 h-5 text-teal-300" />
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-black font-mono text-teal-300">{t.metricCoverage}</div>
              <div className="text-[11px] text-emerald-200 font-bold">{t.metricCoverageLabel}</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-2">
            <div className="w-10 h-10 rounded-2xl bg-orange-400/20 border border-orange-400 flex items-center justify-center text-orange-300 shrink-0">
              <Award className="w-5 h-5 text-orange-300" />
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-black font-mono text-orange-300">{t.metricHelpline}</div>
              <div className="text-[11px] text-emerald-200 font-bold">{t.metricHelplineLabel}</div>
            </div>
          </div>
        </div>

        {/* Section Title Header & Search Filter */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b-2 border-amber-300">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 border-2 border-emerald-300 text-xs font-black text-emerald-950 uppercase tracking-wider mb-2 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>{t.serviceDashboardBadge}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-[#134234] tracking-tight">
              {t.serviceDashboardTitle}
            </h2>
            <p className="text-sm text-stone-700 mt-1 font-semibold max-w-xl">
              {t.serviceDashboardSubtitle}
            </p>
          </div>

          {/* Quick Search Bar */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-stone-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.searchServicesPlaceholder}
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white border-2 border-amber-300 focus:border-emerald-600 focus:ring-2 focus:ring-amber-200 text-xs font-bold text-stone-900 shadow-sm transition-all"
            />
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          {filterTabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setSelectedFilter(tab.key)}
              className={`px-4 py-1.5 rounded-full text-xs font-black transition-all whitespace-nowrap ${
                selectedFilter === tab.key
                  ? 'bg-gradient-to-r from-emerald-800 to-teal-950 text-amber-300 shadow-md border border-emerald-700'
                  : 'bg-white text-stone-700 hover:bg-amber-100 border border-stone-300 shadow-2xs'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* 8-Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {filteredModules.map((m) => {
            const Icon = m.icon;
            return (
              <button
                key={m.id}
                onClick={() => onSelectModule(m.id)}
                className={`group text-left relative flex flex-col justify-between p-6 rounded-3xl ${m.cardBg} border-2 ${m.border} shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 focus:outline-hidden focus:ring-3 focus:ring-amber-400 cursor-pointer`}
              >
                {/* Top Row: Icon and Tag */}
                <div className="flex items-start justify-between w-full mb-4">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${m.gradient} text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    {m.isWhatsApp ? (
                      /* Custom WhatsApp SVG icon */
                      <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
                        <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.007c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.861.173.086.275.072.376-.044.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.099.824zm-3.423-14.416c-6.627 0-12 5.373-12 12 0 2.159.57 4.187 1.564 5.946l-1.564 5.828 6.012-1.547c1.68.918 3.597 1.439 5.628 1.439 6.627 0 12-5.373 12-12 0-6.627-5.373-12-12-12z"/>
                      </svg>
                    ) : (
                      <Icon className="w-7 h-7" />
                    )}
                  </div>

                  <span className={`text-[11px] font-black px-3 py-1 rounded-full border-2 shadow-sm ${m.tagBg}`}>
                    {m.tag}
                  </span>
                </div>

                {/* Card Main Info */}
                <div className="space-y-1.5 mt-2">
                  <h3 className={`font-heading font-black text-stone-950 text-xl tracking-tight ${m.textColor} transition-colors`}>
                    {m.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-700 font-semibold leading-snug">
                    {m.subtitle}
                  </p>
                </div>

                {/* Bottom Action Chevron */}
                <div className="pt-4 mt-4 border-t-2 border-stone-200 flex items-center justify-between text-stone-600 group-hover:text-stone-950 transition-colors">
                  <span className="text-xs font-black">{t.openServiceBtn}</span>
                  <div className="w-8 h-8 rounded-full bg-white border-2 border-amber-300 group-hover:bg-amber-400 group-hover:border-amber-500 group-hover:text-stone-950 flex items-center justify-center transition-all shadow-sm">
                    <ChevronRight className="w-4 h-4 stroke-[3]" />
                  </div>
                </div>
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
};
