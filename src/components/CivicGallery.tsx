import React, { useState } from 'react';
import { 
  Sparkles, 
  MapPin, 
  Calendar, 
  Eye, 
  X, 
  CheckCircle2, 
  HeartHandshake, 
  ChevronRight,
  ExternalLink,
  Camera,
  Layers
} from 'lucide-react';

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Infrastructure' | 'Healthcare & Relief' | 'Youth & Sports' | 'Environment' | 'Community Meetings';
  location: string;
  date: string;
  gradient: string;
  border: string;
  caption: string;
  impact: string;
  councillorNote: string;
}

export const civicGalleryItems: GalleryItem[] = [
  {
    id: 'g1',
    title: 'Councillor Sarooj Sattar Direct Citizen Hearing in Ward 05',
    category: 'Community Meetings',
    location: 'Periyamulla Community Secretariat, St. Lazarus Road',
    date: 'August 2024',
    gradient: 'from-emerald-700 via-teal-800 to-[#134234]',
    border: 'border-emerald-300',
    caption: 'Councillor Sarooj Sattar listening to neighborhood elders and residents regarding drainage challenges and pension paperwork.',
    impact: 'Resolved 18 on-the-spot civic grievances and expedited municipal welfare cards.',
    councillorNote: 'Every resident’s voice must reach the council chambers without obstacle.',
  },
  {
    id: 'g2',
    title: 'St. Lazarus Road Asphalt Carpeting & Curb Construction',
    category: 'Infrastructure',
    location: 'St. Lazarus Road, Periyamulla Ward 5',
    date: 'July 2024',
    gradient: 'from-amber-600 via-orange-700 to-amber-900',
    border: 'border-amber-300',
    caption: 'Heavy road-paving machinery executing sub-base asphalt carpeting to eliminate deep monsoon ruts.',
    impact: 'Smooth, durable transit for 4,200+ households, three-wheelers, and school transport vans.',
    councillorNote: 'High engineering standards and proper side-curbing ensure this road lasts for decades.',
  },
  {
    id: 'g3',
    title: 'Free Vision & Cataract Screening Health Camp',
    category: 'Healthcare & Relief',
    location: 'Ward 05 Health Center, Periyamulla',
    date: 'June 2024',
    gradient: 'from-blue-600 via-indigo-700 to-blue-900',
    border: 'border-blue-300',
    caption: 'Certified ophthalmologists and municipal medical officers providing free eye tests and prescription spectacles.',
    impact: '320+ seniors examined, 185 custom reading glasses distributed at zero cost.',
    councillorNote: 'Healthcare is a fundamental human dignity that we must bring directly to our doorsteps.',
  },
  {
    id: 'g4',
    title: 'Solar LED Streetlight Network Installation',
    category: 'Infrastructure',
    location: 'Periyamulla Commercial Stretch & Canal Bridge',
    date: 'May 2024',
    gradient: 'from-amber-500 via-yellow-600 to-orange-700',
    border: 'border-amber-300',
    caption: 'Municipal technical crew mounting 90W high-lumen solar LED luminaires on concrete utility posts.',
    impact: 'Zero electricity cost for council; 100% nighttime visibility for women and evening commuters.',
    councillorNote: 'Well-lit streets build safe, vibrant, crime-free neighborhoods.',
  },
  {
    id: 'g5',
    title: 'Dutch Canal Desilting & Stormwater Clearance',
    category: 'Environment',
    location: 'Hamilton Canal & Periyamulla Outlet',
    date: 'April 2024',
    gradient: 'from-teal-600 via-cyan-700 to-teal-900',
    border: 'border-teal-300',
    caption: 'Excavator and municipal gully units clearing silt and water hyacinth before the southwestern monsoon.',
    impact: 'Prevented flash-flooding across 6 adjoining residential lanes in low-lying zones.',
    councillorNote: 'Proactive canal maintenance saves our families from devastating water damage.',
  },
  {
    id: 'g6',
    title: 'Youth Sports & Athletics Equipment Distribution',
    category: 'Youth & Sports',
    location: 'Negombo Municipal Community Playground',
    date: 'March 2024',
    gradient: 'from-purple-600 via-violet-700 to-purple-900',
    border: 'border-purple-300',
    caption: 'Handing over cricket kits, footballs, and track gear to Periyamulla youth sports clubs.',
    impact: 'Empowering 120+ local youth with healthy recreational activities and tournament support.',
    councillorNote: 'Our youth are the heartbeat of Negombo. We must invest in their talents.',
  },
];

interface CivicGalleryProps {
  onOpenSubmitModal: () => void;
  onOpenContactModal: () => void;
}

export const CivicGallery: React.FC<CivicGalleryProps> = ({
  onOpenSubmitModal,
  onOpenContactModal,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryItem | null>(null);

  const categories = ['All', 'Infrastructure', 'Healthcare & Relief', 'Youth & Sports', 'Environment', 'Community Meetings'];

  const filteredItems = activeCategory === 'All'
    ? civicGalleryItems
    : civicGalleryItems.filter(item => item.category === activeCategory);

  return (
    <section className="py-14 sm:py-18 bg-gradient-to-b from-[#F8F3EA] via-white to-[#FDFBF7] border-t-2 border-amber-300 relative overflow-hidden">
      
      {/* Colourful Ambient Glows */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-amber-400/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-emerald-400/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-5 border-b-2 border-amber-200 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 border border-emerald-300 text-xs font-black text-emerald-950 uppercase tracking-wider mb-2">
              <Camera className="w-4 h-4 text-emerald-800" />
              <span>Ground Realities & Community Action • Ward 05</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-[#134234] tracking-tight">
              Civic Progress & Ground Inspections
            </h2>
            <p className="text-sm text-stone-700 mt-1 font-semibold max-w-2xl">
              Authentic documentation of municipal engineering, health camps, and neighborhood hearings led by Councillor Sarooj Sattar.
            </p>
          </div>

          {/* Category Filter Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-black whitespace-nowrap transition-all ${
                  activeCategory === cat
                    ? 'bg-gradient-to-r from-emerald-800 to-teal-950 text-amber-300 shadow-md border border-emerald-700'
                    : 'bg-white text-stone-800 hover:bg-amber-100 border border-stone-300 shadow-2xs'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Photo Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedPhoto(item)}
              className="group cursor-pointer bg-white rounded-3xl overflow-hidden border-2 border-stone-200 hover:border-amber-400 shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col justify-between"
            >
              {/* Vibrant Illustrated / Gradient Scene Card */}
              <div className={`relative aspect-[16/10] overflow-hidden bg-gradient-to-br ${item.gradient} p-5 text-white flex flex-col justify-between`}>
                
                {/* Top Row: Category Badge */}
                <div className="flex items-center justify-between">
                  <span className="inline-block px-3 py-1 rounded-full bg-black/40 backdrop-blur-md text-amber-200 text-xs font-black border border-white/20">
                    {item.category}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Eye className="w-4 h-4 text-white" />
                  </div>
                </div>

                {/* Card Title on Banner */}
                <div>
                  <span className="text-[11px] font-bold text-amber-200/90 uppercase tracking-wider block">
                    {item.location.split(',')[0]}
                  </span>
                  <h3 className="font-heading font-black text-white text-lg leading-snug drop-shadow-sm">
                    {item.title}
                  </h3>
                </div>

                {/* View Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <span className="text-white text-xs font-black flex items-center gap-1.5 bg-amber-500 text-stone-950 px-3 py-1.5 rounded-xl shadow-lg">
                    <Eye className="w-3.5 h-3.5" />
                    <span>Open Detailed Log</span>
                  </span>
                </div>
              </div>

              {/* Card Details */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs text-stone-600 font-bold">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-red-600 shrink-0" />
                      <span className="truncate">{item.location.split(',')[0]}</span>
                    </span>
                    <span className="flex items-center gap-1 text-stone-500">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{item.date}</span>
                    </span>
                  </div>

                  <p className="text-xs text-stone-700 line-clamp-2 leading-relaxed font-semibold">
                    {item.caption}
                  </p>
                </div>

                {/* Impact Metric Highlight */}
                <div className="pt-3 border-t border-stone-200 flex items-center justify-between text-xs">
                  <span className="font-black text-emerald-900 flex items-center gap-1.5 text-xs bg-emerald-50 px-2 py-1 rounded-md border border-emerald-200">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span className="truncate">{item.impact}</span>
                  </span>
                  <ChevronRight className="w-4 h-4 text-stone-400 group-hover:translate-x-1 group-hover:text-stone-900 transition-all shrink-0 ml-1" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Callout Banner */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#134234] via-emerald-800 to-teal-950 text-white shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 border-2 border-amber-400">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-black border border-amber-400/40">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Ward 05 Direct Municipal Action</span>
            </div>
            <h3 className="text-xl sm:text-3xl font-black tracking-tight">
              Have a Road, Drain, or Civic Issue in Your Lane?
            </h3>
            <p className="text-xs sm:text-sm text-emerald-100 max-w-xl font-medium">
              Report it directly to our dashboard. Councillor Sarooj Sattar and the municipal engineering crew inspect reported sites within 48 hours.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0 w-full md:w-auto">
            <button
              onClick={onOpenSubmitModal}
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-300 hover:to-orange-400 text-stone-950 text-xs sm:text-sm font-black shadow-lg hover:shadow-xl transition-all text-center border border-amber-200"
            >
              + Report New Civic Issue
            </button>
            <button
              onClick={onOpenContactModal}
              className="px-6 py-3.5 rounded-2xl bg-emerald-900/90 hover:bg-emerald-800 text-white border-2 border-emerald-400 text-xs sm:text-sm font-black shadow-md transition-all text-center"
            >
              WhatsApp Councillor Desk
            </button>
          </div>
        </div>

      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border-2 border-amber-300 overflow-hidden my-8 max-h-[92vh] flex flex-col">
            
            {/* Modal Header Banner */}
            <div className={`relative aspect-[16/9] w-full bg-gradient-to-br ${selectedPhoto.gradient} p-6 sm:p-8 text-white overflow-hidden shrink-0 flex flex-col justify-between`}>
              <div className="flex items-center justify-between">
                <span className="bg-black/50 backdrop-blur-md text-amber-300 text-xs font-black px-3 py-1 rounded-full border border-white/20">
                  {selectedPhoto.category}
                </span>
                <button
                  onClick={() => setSelectedPhoto(null)}
                  className="p-2 rounded-full bg-black/60 text-white hover:bg-black transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div>
                <span className="text-xs font-black text-amber-200 uppercase tracking-wider block mb-1">
                  {selectedPhoto.location}
                </span>
                <h3 className="font-heading font-black text-2xl sm:text-3xl leading-tight">
                  {selectedPhoto.title}
                </h3>
              </div>
            </div>

            {/* Modal Body Details */}
            <div className="p-6 sm:p-8 space-y-4 overflow-y-auto">
              <div className="flex items-center gap-3 text-xs text-stone-600 font-bold mb-1">
                <span className="flex items-center gap-1 text-red-600">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{selectedPhoto.location}</span>
                </span>
                <span>•</span>
                <span>{selectedPhoto.date}</span>
              </div>

              <p className="text-sm text-stone-800 leading-relaxed font-semibold">
                {selectedPhoto.caption}
              </p>

              {/* Impact Banner */}
              <div className="p-4 rounded-2xl bg-emerald-50 border-2 border-emerald-200 space-y-1">
                <span className="text-xs font-black text-emerald-950 uppercase tracking-wider block">
                  Measured Community Impact
                </span>
                <p className="text-xs sm:text-sm text-emerald-950 font-bold">
                  {selectedPhoto.impact}
                </p>
              </div>

              {/* Councillor's Quote */}
              <div className="p-4 rounded-2xl bg-amber-50 border-2 border-amber-200">
                <span className="text-[11px] font-black text-amber-950 uppercase tracking-wider block mb-0.5">
                  Councillor Sarooj Sattar&apos;s Field Note
                </span>
                <p className="font-serif-quote italic text-xs sm:text-sm text-stone-950 font-bold">
                  &ldquo;{selectedPhoto.councillorNote}&rdquo;
                </p>
              </div>

              <div className="pt-2 flex items-center justify-between border-t border-stone-200">
                <span className="text-xs text-stone-600 font-bold">
                  Verified by Negombo Municipal Council
                </span>
                <button
                  onClick={() => setSelectedPhoto(null)}
                  className="px-5 py-2.5 rounded-xl bg-stone-950 hover:bg-stone-800 text-white text-xs font-black shadow-md"
                >
                  Close Inspection
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

    </section>
  );
};
