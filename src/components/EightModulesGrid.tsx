import React from 'react';
import { 
  FileEdit, 
  FolderKanban, 
  HardHat, 
  Megaphone, 
  PhoneCall, 
  Users, 
  User, 
  ChevronRight,
  Sparkles
} from 'lucide-react';

interface EightModulesGridProps {
  onSelectModule: (moduleId: string) => void;
  complaintCount?: number;
  projectCount?: number;
  announcementCount?: number;
  memberCount?: number;
}

export const EightModulesGrid: React.FC<EightModulesGridProps> = ({
  onSelectModule,
  complaintCount = 24,
  projectCount = 4,
  announcementCount = 4,
  memberCount = 18,
}) => {
  const modules = [
    {
      id: 'submit_complaint',
      title: 'Submit Complaint',
      subtitle: 'Report Issues Directly to Ward 5',
      tag: 'AI Assisted',
      tagBg: 'bg-emerald-100 text-emerald-900 border-emerald-300',
      icon: FileEdit,
      gradient: 'from-emerald-600 to-teal-800',
      cardBg: 'bg-gradient-to-br from-emerald-50/90 via-white to-teal-50/50',
      border: 'border-emerald-200 hover:border-emerald-500',
      textColor: 'group-hover:text-emerald-900',
    },
    {
      id: 'my_complaints',
      title: 'My Complaints',
      subtitle: 'Track Your Civic Requests Live',
      tag: `${complaintCount} Active`,
      tagBg: 'bg-blue-100 text-blue-900 border-blue-300',
      icon: FolderKanban,
      gradient: 'from-blue-600 to-indigo-800',
      cardBg: 'bg-gradient-to-br from-blue-50/90 via-white to-indigo-50/50',
      border: 'border-blue-200 hover:border-blue-500',
      textColor: 'group-hover:text-blue-900',
    },
    {
      id: 'community_projects',
      title: 'Community Projects',
      subtitle: 'Ongoing, Finished & Future Works',
      tag: `${projectCount} Projects`,
      tagBg: 'bg-amber-100 text-amber-900 border-amber-300',
      icon: HardHat,
      gradient: 'from-amber-500 to-orange-700',
      cardBg: 'bg-gradient-to-br from-amber-50/90 via-white to-orange-50/50',
      border: 'border-amber-200 hover:border-amber-500',
      textColor: 'group-hover:text-amber-900',
    },
    {
      id: 'announcements',
      title: 'Announcements',
      subtitle: 'Municipal Bulletins & Ward News',
      tag: `${announcementCount} Notices`,
      tagBg: 'bg-purple-100 text-purple-900 border-purple-300',
      icon: Megaphone,
      gradient: 'from-purple-600 to-violet-800',
      cardBg: 'bg-gradient-to-br from-purple-50/90 via-white to-violet-50/50',
      border: 'border-purple-200 hover:border-purple-500',
      textColor: 'group-hover:text-purple-900',
    },
    {
      id: 'contact_sarooj',
      title: 'Contact Sarooj',
      subtitle: 'Instant WhatsApp Direct Chat',
      tag: '0702475248',
      tagBg: 'bg-green-100 text-green-900 border-green-300',
      icon: PhoneCall,
      gradient: 'from-green-600 to-emerald-800',
      cardBg: 'bg-gradient-to-br from-green-50/90 via-white to-emerald-50/50',
      border: 'border-green-300 hover:border-green-500',
      textColor: 'group-hover:text-green-900',
      isWhatsApp: true,
    },
    {
      id: 'emergency_contacts',
      title: 'Emergency Contacts',
      subtitle: 'Police, Fire, Hospital & Flood',
      tag: '24/7 Helplines',
      tagBg: 'bg-rose-100 text-rose-900 border-rose-300',
      icon: PhoneCall,
      gradient: 'from-rose-600 to-red-800',
      cardBg: 'bg-gradient-to-br from-rose-50/90 via-white to-red-50/50',
      border: 'border-rose-200 hover:border-rose-500',
      textColor: 'group-hover:text-rose-900',
    },
    {
      id: 'community_members',
      title: 'Community Members',
      subtitle: 'Registered Active Ward Volunteers',
      tag: `${memberCount}+ Volunteers`,
      tagBg: 'bg-cyan-100 text-cyan-900 border-cyan-300',
      icon: Users,
      gradient: 'from-teal-600 to-cyan-800',
      cardBg: 'bg-gradient-to-br from-cyan-50/90 via-white to-teal-50/50',
      border: 'border-cyan-200 hover:border-cyan-500',
      textColor: 'group-hover:text-cyan-900',
    },
    {
      id: 'my_profile',
      title: 'My Profile',
      subtitle: 'Citizen Preferences & Language',
      tag: 'Civic Portal',
      tagBg: 'bg-amber-100 text-amber-900 border-amber-300',
      icon: User,
      gradient: 'from-amber-600 to-yellow-700',
      cardBg: 'bg-gradient-to-br from-amber-50/90 via-white to-yellow-50/50',
      border: 'border-amber-300 hover:border-amber-500',
      textColor: 'group-hover:text-amber-900',
    },
  ];

  return (
    <section className="py-14 bg-gradient-to-b from-[#FBF7F0] via-white to-[#F8F3EA] relative overflow-hidden">
      {/* Colourful Ambient Glows */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-300/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-300/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Title Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-5 border-b-2 border-amber-200">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 border border-emerald-300 text-xs font-black text-emerald-900 uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Direct Citizen Services • Ward 05 Periyamulla</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-[#134234] tracking-tight">
              Community Service Portal
            </h2>
          </div>
          <p className="text-sm text-stone-700 mt-2 sm:mt-0 font-semibold max-w-md text-left sm:text-right">
            Click any service to report issues, track live municipal progress, or chat directly with Councillor Sarooj Sattar.
          </p>
        </div>

        {/* 8-Card Grid (Exact 4x2 on large screens, 2x4 on tablet, 1-col on mobile) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {modules.map((m) => {
            const Icon = m.icon;
            return (
              <button
                key={m.id}
                onClick={() => onSelectModule(m.id)}
                className={`group text-left relative flex flex-col justify-between p-6 rounded-3xl ${m.cardBg} border-2 ${m.border} shadow-sm hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1.5 focus:outline-hidden focus:ring-3 focus:ring-amber-400`}
              >
                {/* Top Row: Icon and Tag */}
                <div className="flex items-start justify-between w-full mb-4">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${m.gradient} text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300`}>
                    {m.isWhatsApp ? (
                      /* Custom WhatsApp SVG icon */
                      <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
                        <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.007c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.861.173.086.275.072.376-.044.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.099.824zm-3.423-14.416c-6.627 0-12 5.373-12 12 0 2.159.57 4.187 1.564 5.946l-1.564 5.828 6.012-1.547c1.68.918 3.597 1.439 5.628 1.439 6.627 0 12-5.373 12-12 0-6.627-5.373-12-12-12z"/>
                      </svg>
                    ) : (
                      <Icon className="w-7 h-7" />
                    )}
                  </div>

                  <span className={`text-[11px] font-black px-3 py-1 rounded-full border shadow-2xs ${m.tagBg}`}>
                    {m.tag}
                  </span>
                </div>

                {/* Card Main Info */}
                <div className="space-y-1.5 mt-2">
                  <h3 className={`font-heading font-black text-stone-900 text-xl tracking-tight ${m.textColor} transition-colors`}>
                    {m.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 font-semibold leading-snug">
                    {m.subtitle}
                  </p>
                </div>

                {/* Bottom Action Chevron */}
                <div className="pt-4 mt-4 border-t border-stone-200/80 flex items-center justify-between text-stone-500 group-hover:text-stone-950 transition-colors">
                  <span className="text-xs font-bold">Open Service</span>
                  <div className="w-7 h-7 rounded-full bg-white border border-stone-200 group-hover:bg-amber-400 group-hover:border-amber-400 group-hover:text-stone-950 flex items-center justify-center transition-all shadow-xs">
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

