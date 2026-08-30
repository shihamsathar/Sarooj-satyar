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
      subtitle: 'Report Issues to Us',
      tag: 'AI Assisted',
      icon: FileEdit,
      iconBg: 'bg-emerald-600',
      hoverBorder: 'hover:border-emerald-500',
      hoverBg: 'group-hover:bg-emerald-50',
    },
    {
      id: 'my_complaints',
      title: 'My Complaints',
      subtitle: 'Track Your Requests',
      tag: `${complaintCount} Active`,
      icon: FolderKanban,
      iconBg: 'bg-blue-600',
      hoverBorder: 'hover:border-blue-500',
      hoverBg: 'group-hover:bg-blue-50',
    },
    {
      id: 'community_projects',
      title: 'Community Projects',
      subtitle: 'Ongoing, Finished & Future Projects',
      tag: `${projectCount} Projects`,
      icon: HardHat,
      iconBg: 'bg-amber-600',
      hoverBorder: 'hover:border-amber-500',
      hoverBg: 'group-hover:bg-amber-50',
    },
    {
      id: 'announcements',
      title: 'Announcements',
      subtitle: 'Latest News & Updates',
      tag: `${announcementCount} Notices`,
      icon: Megaphone,
      iconBg: 'bg-purple-600',
      hoverBorder: 'hover:border-purple-500',
      hoverBg: 'group-hover:bg-purple-50',
    },
    {
      id: 'contact_sarooj',
      title: 'Contact Sarooj',
      subtitle: 'Chat on WhatsApp',
      tag: '0702475248',
      icon: PhoneCall,
      iconBg: 'bg-green-600',
      hoverBorder: 'hover:border-green-500',
      hoverBg: 'group-hover:bg-green-50',
      isWhatsApp: true,
    },
    {
      id: 'emergency_contacts',
      title: 'Emergency Contacts',
      subtitle: 'Important Numbers',
      tag: '24/7 Helplines',
      icon: PhoneCall,
      iconBg: 'bg-red-600',
      hoverBorder: 'hover:border-red-500',
      hoverBg: 'group-hover:bg-red-50',
    },
    {
      id: 'community_members',
      title: 'Community Members',
      subtitle: 'Our Active Members',
      tag: `${memberCount}+ Volunteers`,
      icon: Users,
      iconBg: 'bg-teal-600',
      hoverBorder: 'hover:border-teal-500',
      hoverBg: 'group-hover:bg-teal-50',
    },
    {
      id: 'my_profile',
      title: 'My Profile',
      subtitle: 'View & Edit Your Profile',
      tag: 'Citizen Portal',
      icon: User,
      iconBg: 'bg-amber-500',
      hoverBorder: 'hover:border-amber-400',
      hoverBg: 'group-hover:bg-amber-50',
    },
  ];

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Title Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-stone-200">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Direct Citizen Services</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
              Community Service Portal
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-stone-500 mt-2 sm:mt-0 font-medium">
            Click any service to report, track progress, or connect directly.
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
                className={`group text-left relative flex flex-col justify-between p-6 rounded-2xl bg-white border border-stone-200/90 shadow-xs hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${m.hoverBorder} focus:outline-hidden focus:ring-2 focus:ring-emerald-500`}
              >
                {/* Top Row: Icon and Tag */}
                <div className="flex items-start justify-between w-full mb-4">
                  <div className={`w-14 h-14 rounded-2xl ${m.iconBg} text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300`}>
                    {m.isWhatsApp ? (
                      /* Custom WhatsApp SVG icon */
                      <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
                        <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.007c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.861.173.086.275.072.376-.044.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.099.824zm-3.423-14.416c-6.627 0-12 5.373-12 12 0 2.159.57 4.187 1.564 5.946l-1.564 5.828 6.012-1.547c1.68.918 3.597 1.439 5.628 1.439 6.627 0 12-5.373 12-12 0-6.627-5.373-12-12-12z"/>
                      </svg>
                    ) : (
                      <Icon className="w-7 h-7" />
                    )}
                  </div>

                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-stone-100 text-stone-700 group-hover:bg-stone-200 transition-colors">
                    {m.tag}
                  </span>
                </div>

                {/* Card Main Info */}
                <div className="space-y-1 mt-2">
                  <h3 className="font-heading font-extrabold text-stone-900 text-lg sm:text-xl tracking-tight group-hover:text-emerald-800 transition-colors">
                    {m.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-500 font-medium leading-snug">
                    {m.subtitle}
                  </p>
                </div>

                {/* Bottom Action Chevron */}
                <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between text-stone-400 group-hover:text-stone-900 transition-colors">
                  <span className="text-xs font-semibold group-hover:text-emerald-700">Open Module</span>
                  <div className="w-6 h-6 rounded-full bg-stone-100 group-hover:bg-emerald-600 group-hover:text-white flex items-center justify-center transition-colors">
                    <ChevronRight className="w-3.5 h-3.5" />
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
