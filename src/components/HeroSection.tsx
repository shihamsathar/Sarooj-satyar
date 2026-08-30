import React from 'react';
import { ArrowRight, Sparkles, CheckCircle2, HeartHandshake, ShieldCheck } from 'lucide-react';

interface HeroSectionProps {
  onBuildCommunityClick: () => void;
  onExploreProjectsClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onBuildCommunityClick,
  onExploreProjectsClick,
}) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-stone-100 via-amber-50/40 to-stone-50 border-b border-stone-200">
      {/* Background Decorative Graphic Elements */}
      <div className="absolute inset-0 opacity-15 pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-amber-300 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-emerald-300 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-16 lg:py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Heading & Call to Action */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 border border-emerald-300/60 text-emerald-900 text-xs sm:text-sm font-semibold shadow-xs">
              <Sparkles className="w-4 h-4 text-emerald-700 animate-pulse" />
              <span>Negombo Municipal Council • Ward 5 Civic Portal</span>
            </div>

            <div className="space-y-2">
              <span className="block text-stone-600 text-lg sm:text-xl font-medium tracking-tight">
                Welcome to
              </span>
              <h1 className="font-heading font-extrabold text-stone-950 text-3xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.1]">
                SAROOJ SATTAR
                <span className="block text-emerald-800 text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight mt-1">
                  COMMUNITY FORUM
                </span>
              </h1>
            </div>

            <p className="text-stone-700 text-base sm:text-lg lg:text-xl max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              A platform built to connect, listen and work together for a better, safer, and prosperous Negombo.
            </p>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button
                onClick={onBuildCommunityClick}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-7 py-4 rounded-full text-base sm:text-lg font-bold bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-600 hover:to-amber-500 text-stone-950 shadow-md hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 border border-amber-300 group"
              >
                <span>Let&apos;s Build Our Community</span>
                <span className="w-8 h-8 rounded-full bg-stone-900 text-white flex items-center justify-center group-hover:translate-x-1 transition-transform">
                  <ArrowRight className="w-4 h-4" />
                </span>
              </button>

              <button
                onClick={onExploreProjectsClick}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full text-sm sm:text-base font-semibold bg-white/90 hover:bg-stone-100 text-stone-800 border border-stone-300 shadow-xs hover:shadow-md transition-all duration-200"
              >
                <span>View Public Works & Projects</span>
              </button>
            </div>

            {/* Citizen Assurance Highlights */}
            <div className="pt-4 grid grid-cols-3 gap-2 sm:gap-4 border-t border-stone-200/80 text-left">
              <div className="flex items-center gap-2 text-stone-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="text-xs font-semibold">100% Trackable Grievances</span>
              </div>
              <div className="flex items-center gap-2 text-stone-700">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="text-xs font-semibold">Direct Council Access</span>
              </div>
              <div className="flex items-center gap-2 text-stone-700">
                <HeartHandshake className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="text-xs font-semibold">Transparent Budgeting</span>
              </div>
            </div>

          </div>

          {/* Right Column: Councillor Portrait & Inspirational Quote Card */}
          <div className="lg:col-span-5 relative">
            
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-stone-900 group">
              
              {/* Photo of Councillor and Civic Work */}
              <div className="relative aspect-[4/5] sm:aspect-[3/4] w-full overflow-hidden bg-stone-800">
                <img
                  src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1000&q=80"
                  alt="Councillor Sarooj Sattar meeting with residents of Negombo"
                  className="w-full h-full object-cover object-top opacity-95 group-hover:scale-105 transition-transform duration-700"
                />
                
                {/* Subtle Gradient Overlays for Readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-amber-950/30 via-transparent to-transparent" />
              </div>

              {/* Quote Block Floating in the Top-Right / Bottom */}
              <div className="absolute top-4 right-4 max-w-[280px] bg-white/95 backdrop-blur-md p-4 rounded-xl shadow-lg border border-amber-200/80 text-stone-900">
                <div className="font-serif-quote text-2xl text-amber-600 font-bold leading-none select-none">
                  “
                </div>
                <p className="font-serif-quote italic text-sm sm:text-base font-semibold text-stone-900 leading-snug">
                  Until my last breath, I will stand with those in need and serve the poor with compassion.
                </p>
                <div className="font-serif-quote text-2xl text-amber-600 font-bold leading-none text-right select-none -mt-1">
                  ”
                </div>
              </div>

              {/* Councillor Title Banner at Bottom */}
              <div className="absolute bottom-0 inset-x-0 p-5 bg-gradient-to-t from-black via-stone-950/90 to-transparent text-white space-y-1">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold font-serif-quote italic tracking-wide text-amber-300">
                      Sarooj Sattar
                    </h3>
                    <p className="text-xs sm:text-sm text-stone-300 font-medium">
                      Negombo Municipal Council Councillor
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="inline-block px-2.5 py-1 rounded bg-amber-500/20 border border-amber-400/40 text-amber-300 text-[11px] font-bold uppercase tracking-wider">
                      Ward 05
                    </span>
                  </div>
                </div>
              </div>

            </div>

            {/* Badge Indicator */}
            <div className="absolute -bottom-4 -left-4 bg-emerald-800 text-white px-4 py-2 rounded-xl shadow-xl border border-emerald-600 flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-xs font-bold tracking-wide">Live Citizen Desk Active</span>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
