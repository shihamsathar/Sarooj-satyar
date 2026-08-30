import React from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  HardHat, 
  ChevronRight, 
  ExternalLink,
  MessageCircle,
  Clock,
  Sparkles
} from 'lucide-react';
import type { CommunityProject } from '../types.js';

interface QuickContactAndOngoingProjectProps {
  ongoingProject?: CommunityProject;
  onViewAllProjects: () => void;
  onOpenProjectDetail?: (project: CommunityProject) => void;
  onOpenContactForm: () => void;
}

export const QuickContactAndOngoingProject: React.FC<QuickContactAndOngoingProjectProps> = ({
  ongoingProject,
  onViewAllProjects,
  onOpenProjectDetail,
  onOpenContactForm,
}) => {
  const project = ongoingProject || {
    id: 'p1',
    title: 'Road Development Project in Periyamulla',
    slug: 'road-development-periyamulla',
    description: 'Comprehensive asphalt carpeting, concrete curbs, and stormwater drain construction along St. Lazarus Road.',
    category: 'Roads & Bridges',
    ward: 'Periyamulla',
    progressPercentage: 65,
    status: 'ongoing',
    budgetLKR: 18500000,
    spentLKR: 12025000,
    contractor: 'Western Provincial Road Development Authority & Negombo MC',
    startDate: '2024-03-15',
    expectedEndDate: '2024-11-30',
    imageUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=800&q=80',
    impactMetric: 'Benefits 4,200+ households',
    highlights: ['First layer asphalt carpeting underway on Sector B (65%)']
  };

  return (
    <section className="py-8 bg-stone-50 border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Left Card: Quick Contact */}
          <div className="bg-white rounded-2xl p-6 sm:p-7 border border-stone-200 shadow-xs flex flex-col justify-between relative overflow-hidden group">
            
            {/* Top Header */}
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-stone-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-emerald-800 text-white flex items-center justify-center shadow-xs">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-heading font-extrabold text-stone-900 text-lg sm:text-xl tracking-tight">
                      Quick Contact
                    </h3>
                    <p className="text-xs text-stone-500 font-medium">
                      Negombo Secretariat & Field Office
                    </p>
                  </div>
                </div>

                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  <span>Open for Citizens</span>
                </span>
              </div>

              {/* Main Content Grid: Details on Left, Negombo Landmark Photo on Right */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 mt-5 items-center">
                
                {/* Contact List */}
                <div className="sm:col-span-7 space-y-3.5 text-xs sm:text-sm text-stone-700">
                  
                  {/* WhatsApp Direct */}
                  <a
                    href="https://wa.me/94702475248?text=Hello%20Councillor%20Sarooj%20Sattar,%20I%20am%20a%20resident%20of%20Negombo."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-emerald-50 text-stone-800 hover:text-emerald-800 transition-colors group/item"
                  >
                    <div className="w-7 h-7 rounded-lg bg-green-100 text-green-700 flex items-center justify-center shrink-0">
                      <MessageCircle className="w-4 h-4" />
                    </div>
                    <span className="font-bold text-stone-900 group-hover/item:text-emerald-700">
                      0702475248
                    </span>
                    <span className="text-[10px] uppercase font-semibold text-emerald-700 bg-emerald-100 px-1.5 py-0.2 rounded ml-auto">
                      WhatsApp
                    </span>
                  </a>

                  {/* Hotlines */}
                  <div className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-stone-50 transition-colors">
                    <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                      <Phone className="w-4 h-4" />
                    </div>
                    <span className="font-semibold text-stone-800">
                      0702475248 / 0768787382
                    </span>
                  </div>

                  {/* Email */}
                  <a
                    href="mailto:saroojsattar@gmail.com"
                    className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-stone-50 text-stone-800 hover:text-emerald-800 transition-colors truncate"
                  >
                    <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                      <Mail className="w-4 h-4" />
                    </div>
                    <span className="font-medium truncate">saroojsattar@gmail.com</span>
                  </a>

                  {/* Physical Address */}
                  <div className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-stone-50 transition-colors">
                    <div className="w-7 h-7 rounded-lg bg-red-100 text-red-700 flex items-center justify-center shrink-0 mt-0.5">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <span className="font-medium text-stone-700 leading-snug">
                      36 - St. Lasarus Road, Periyamulla, Negombo.
                    </span>
                  </div>

                </div>

                {/* Negombo Coastal Lighthouse / Lagoon Image Card */}
                <div className="sm:col-span-5 h-44 sm:h-full rounded-xl overflow-hidden shadow-inner relative border border-stone-200 group/img">
                  <img
                    src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80"
                    alt="Negombo Coastline and Lagoon"
                    className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent flex items-end p-2.5">
                    <span className="text-[11px] font-bold text-white tracking-wide flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-amber-400" />
                      <span>Negombo, Western Province</span>
                    </span>
                  </div>
                </div>

              </div>
            </div>

            {/* Bottom Direct Message Link */}
            <div className="mt-5 pt-3 border-t border-stone-100 flex items-center justify-between">
              <span className="text-xs text-stone-500 flex items-center gap-1 font-medium">
                <Clock className="w-3.5 h-3.5" />
                <span>Visiting Hours: 8:00 AM - 7:00 PM</span>
              </span>
              <button
                onClick={onOpenContactForm}
                className="text-xs font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-1 group/btn"
              >
                <span>Send Direct Inquiry</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
              </button>
            </div>

          </div>

          {/* Right Card: Ongoing Project */}
          <div className="bg-white rounded-2xl p-6 sm:p-7 border border-stone-200 shadow-xs flex flex-col justify-between relative overflow-hidden group">
            
            <div>
              {/* Top Header */}
              <div className="flex items-center justify-between pb-4 border-b border-stone-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-amber-600 text-white flex items-center justify-center shadow-xs">
                    <HardHat className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-heading font-extrabold text-stone-900 text-lg sm:text-xl tracking-tight">
                      Ongoing Project
                    </h3>
                    <p className="text-xs text-stone-500 font-medium">
                      Municipal Public Works Tracking
                    </p>
                  </div>
                </div>

                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-900 bg-amber-100 px-2.5 py-1 rounded-full border border-amber-200">
                  <Sparkles className="w-3 h-3 text-amber-700" />
                  <span>Ward 05 Milestone</span>
                </span>
              </div>

              {/* Project Card Content: Construction Photo + Progress */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 mt-5 items-center">
                
                {/* Construction Photo */}
                <div className="sm:col-span-5 h-36 sm:h-38 rounded-xl overflow-hidden shadow-inner relative border border-stone-200 group/pimg">
                  <img
                    src={project.imageUrl || 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=600&q=80'}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover/pimg:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2 left-2 bg-stone-900/80 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded">
                    Active Site
                  </div>
                </div>

                {/* Project Details */}
                <div className="sm:col-span-7 space-y-2.5">
                  <h4 className="font-heading font-bold text-stone-900 text-base sm:text-lg leading-snug group-hover:text-amber-800 transition-colors">
                    {project.title}
                  </h4>
                  
                  <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed font-normal">
                    {project.description}
                  </p>

                  {/* Progress Bar */}
                  <div className="space-y-1.5 pt-1">
                    <div className="flex items-center justify-between text-xs font-bold">
                      <span className="text-stone-700">Execution Progress</span>
                      <span className="text-amber-700 font-extrabold">{project.progressPercentage}% Completed</span>
                    </div>
                    <div className="w-full h-2.5 rounded-full bg-stone-100 overflow-hidden border border-stone-200">
                      <div 
                        className="h-full bg-gradient-to-r from-amber-500 to-amber-600 rounded-full transition-all duration-1000"
                        style={{ width: `${project.progressPercentage}%` }}
                      />
                    </div>
                  </div>

                </div>

              </div>
            </div>

            {/* Bottom Link: View All Projects */}
            <div className="mt-5 pt-3 border-t border-stone-100 flex items-center justify-between">
              <span className="text-xs text-stone-500 font-medium">
                Contractor: {project.contractor.split('&')[0]}
              </span>
              <button
                onClick={onViewAllProjects}
                className="text-xs font-bold text-stone-900 hover:text-amber-700 flex items-center gap-1 group/pbtn"
              >
                <span>View All Projects</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover/pbtn:translate-x-0.5 transition-transform" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
