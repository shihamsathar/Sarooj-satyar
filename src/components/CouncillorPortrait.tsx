import React from 'react';
import { Shield, Award, Sparkles, HeartHandshake, CheckCircle2, PhoneCall } from 'lucide-react';
import { OFFICIAL_POSTERS, OfficialPoster } from '../data/posters.js';
import { RoundLogo } from './RoundLogo.js';

interface CouncillorPortraitProps {
  activePosterId?: string;
  onPosterChange?: (posterId: string) => void;
  portraitPhotoUrl?: string;
  showPhoto?: boolean;
}

export const CouncillorPortrait: React.FC<CouncillorPortraitProps> = ({
  activePosterId = 'poster_ta_striped',
  portraitPhotoUrl,
  showPhoto = false,
}) => {
  const activePoster = OFFICIAL_POSTERS.find((p) => p.id === activePosterId) || OFFICIAL_POSTERS[0];
  const hasCustomPhoto = Boolean(showPhoto && portraitPhotoUrl);

  return (
    <div className="relative w-full aspect-[4/5] min-h-[410px] sm:min-h-[460px] rounded-3xl overflow-hidden shadow-2xl border-4 border-amber-400 bg-gradient-to-br from-[#134234] via-[#1B4D3E] to-[#0A2540] group select-none">
      
      {/* Background Image (If Custom Photo Provided by Admin) */}
      {hasCustomPhoto && (
        <div className="absolute inset-0 z-0">
          <img
            src={portraitPhotoUrl}
            alt="Councillor Sarooj Sattar"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
          />
          {/* Subtle civic gradient overlay to maintain text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-black/30" />
          <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/50 via-transparent to-stone-950/80" />
        </div>
      )}

      {/* Authentic Civic Dignitary Framing */}
      <div className="relative w-full h-full flex flex-col justify-between p-4 sm:p-7 text-center text-white z-10">
        
        {/* Top Flourish */}
        <div className="flex items-center justify-between z-10 gap-1.5">
          <span className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1 rounded-full bg-amber-400 text-stone-950 text-[11px] sm:text-xs font-black shadow-md border border-amber-300">
            <Award className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            <span>Ward 05 • Periyamulla</span>
          </span>
          <span className="text-[10px] sm:text-[11px] text-amber-300 font-bold uppercase tracking-wider bg-black/50 px-2 sm:px-2.5 py-1 rounded-full border border-amber-400/30 flex items-center gap-1 backdrop-blur-xs">
            <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-amber-400" />
            <span>Official Civic Desk</span>
          </span>
        </div>

        {/* Center Card: Official Seal & Councillor Title */}
        <div className="space-y-2.5 sm:space-y-4 my-auto z-10">
          {!hasCustomPhoto && (
            <div className="w-24 h-24 sm:w-32 sm:h-32 mx-auto rounded-3xl bg-gradient-to-tr from-amber-400 via-amber-300 to-yellow-200 p-1 sm:p-1.5 shadow-2xl flex items-center justify-center transform group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full rounded-[20px] sm:rounded-[22px] bg-gradient-to-tr from-[#134234] to-[#1B4D3E] flex items-center justify-center p-2 sm:p-2.5 border border-amber-400/50 shadow-inner">
                <RoundLogo size={68} showText={false} showFlourish={false} />
              </div>
            </div>
          )}

          {hasCustomPhoto && (
            <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto rounded-2xl bg-amber-400/90 p-1 shadow-xl backdrop-blur-xs flex items-center justify-center">
              <RoundLogo size={46} showText={false} showFlourish={false} />
            </div>
          )}

          <div className="space-y-1 sm:space-y-1.5">
            <span className="text-[10px] sm:text-[11px] font-black text-amber-300 uppercase tracking-widest block drop-shadow-md">
              Negombo Municipal Council
            </span>
            <h2 className="text-xl sm:text-3xl font-heading font-black text-white tracking-tight leading-tight drop-shadow-md">
              SAROOJ SATTAR
            </h2>
            <p className="text-xs sm:text-sm font-bold text-amber-200 font-tamil mt-0.5 sm:mt-1 drop-shadow-md">
              பதவியால் அல்ல... பாசத்தால் இணைந்தவன் நான்
            </p>
            <p className="text-[11px] sm:text-xs font-semibold text-emerald-200/90 drop-shadow-md">
              Together for a Better Tomorrow
            </p>
          </div>

          {/* Civic Values Pill Badges */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 pt-0.5 sm:pt-1">
            <span className="inline-flex items-center gap-1 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-[9px] sm:text-[10px] font-bold text-emerald-200 backdrop-blur-xs shadow-xs">
              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
              <span>Public Accountability</span>
            </span>
            <span className="inline-flex items-center gap-1 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-amber-950/80 border border-amber-500/40 text-[9px] sm:text-[10px] font-bold text-amber-200 backdrop-blur-xs shadow-xs">
              <HeartHandshake className="w-3 h-3 text-amber-400" />
              <span>Community First</span>
            </span>
          </div>
        </div>

        {/* Bottom Inscription */}
        <div className="pt-2 pb-12 sm:pb-14 border-t border-emerald-700/60 text-[10px] sm:text-[11px] text-amber-200/90 font-serif-quote italic z-10 drop-shadow-xs">
          &ldquo;Until my last breath, I will stand with those in need and serve with compassion.&rdquo;
        </div>
      </div>

      {/* Floating Colourful Civic Badge with Tamil Motto */}
      <div className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3 right-2 sm:right-3 bg-stone-950/90 backdrop-blur-md px-2.5 sm:px-3.5 py-1.5 sm:py-2.5 rounded-2xl border-2 border-amber-400 text-white flex items-center justify-between shadow-2xl pointer-events-auto z-20 gap-2">
        <div className="flex items-center gap-2 truncate min-w-0 flex-1">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse shadow-sm shadow-amber-400 shrink-0" />
          <div className="truncate text-left min-w-0">
            <span className="text-xs font-black text-amber-300 block leading-tight truncate">Councillor Sarooj Sattar</span>
            <span className="text-[10px] text-stone-300 font-bold block truncate">{activePoster.motto}</span>
          </div>
        </div>
        <span className="text-[9px] sm:text-[10px] bg-amber-400 text-stone-950 font-black px-2 sm:px-2.5 py-1 rounded-full border border-amber-300 shrink-0 shadow-sm whitespace-nowrap">
          <span className="hidden sm:inline">Ward 05 • </span>Periyamulla
        </span>
      </div>
    </div>
  );
};

