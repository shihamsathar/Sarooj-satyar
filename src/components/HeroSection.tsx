import React, { useState } from 'react';
import { 
  ArrowRight, 
  ChevronRight, 
  Sparkles, 
  CheckCircle2, 
  HeartHandshake, 
  ShieldCheck, 
  Volume2, 
  VolumeX, 
  Play, 
  Pause,
  MapPin,
  Clock,
  Phone,
  MessageSquare,
  Sun,
  Flame,
  Layers,
  Heart
} from 'lucide-react';
import { RoundLogo } from './RoundLogo.js';
import { CouncillorPortrait } from './CouncillorPortrait.js';
import type { Language } from '../utils/translations.js';
import { translations } from '../utils/translations.js';
import { OFFICIAL_POSTERS, OfficialPoster } from '../data/posters.js';

interface HeroSectionProps {
  onBuildCommunityClick: () => void;
  onExploreProjectsClick: () => void;
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onOpenAudioModal?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onBuildCommunityClick,
  onExploreProjectsClick,
  language,
  onLanguageChange,
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [activePosterId, setActivePosterId] = useState<string>('poster_en_white');
  const t = translations[language];

  const activePoster = OFFICIAL_POSTERS.find((p) => p.id === activePosterId) || OFFICIAL_POSTERS[0];

  const handleToggleAudio = () => {
    setIsPlayingAudio(!isPlayingAudio);
  };

  const handlePosterSelect = (posterId: string) => {
    setActivePosterId(posterId);
    const poster = OFFICIAL_POSTERS.find((p) => p.id === posterId);
    if (poster) {
      if (poster.language === 'ta') onLanguageChange('ta');
      else if (poster.language === 'si') onLanguageChange('si');
      else if (poster.language === 'en') onLanguageChange('en');
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#FFF5E5] via-[#FDEBD0] to-[#F7DFC1] border-b-4 border-amber-400">
      
      {/* Colourful Ambient Glows & Sunburst Layers directly inspired by Councillor Sarooj Sattar Posters */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-amber-400/35 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-10 right-10 w-96 h-96 bg-emerald-500/25 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 w-[600px] h-64 bg-orange-500/25 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -right-20 w-80 h-80 bg-teal-400/20 rounded-full blur-3xl pointer-events-none" />

      {/* Top Center Hanging Arched Logo Badge matching Reference */}
      <div className="relative flex justify-center -mt-1 z-30 pointer-events-auto">
        <div className="bg-white/95 backdrop-blur-md px-6 sm:px-10 pt-2.5 pb-3.5 rounded-b-3xl shadow-xl border-x-2 border-b-2 border-amber-300 flex flex-col items-center text-center">
          <RoundLogo
            size={74}
            showText={true}
            showFlourish={true}
          />
        </div>
      </div>

      {/* Top Utility Row: Poster Selector, Tri-Lingual Language Switcher & Ward Status */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-3 pb-1 flex flex-wrap items-center justify-between gap-3 relative z-20">
        
        {/* Ward Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-emerald-900 to-teal-950 text-amber-300 text-xs font-black shadow-md border border-emerald-700/60">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
          <span>{t.wardInfo}</span>
        </div>

        {/* 5 Official Attached Photos Quick-Switcher Buttons */}
        <div className="hidden md:flex items-center gap-1.5 bg-white/90 backdrop-blur-xs p-1 rounded-full border-2 border-amber-300 shadow-sm">
          <span className="text-[10px] font-black text-stone-700 uppercase tracking-wider pl-2 pr-1 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-600" />
            <span>Campaign Photos:</span>
          </span>
          {OFFICIAL_POSTERS.map((p) => (
            <button
              key={p.id}
              onClick={() => handlePosterSelect(p.id)}
              className={`px-2.5 py-1 rounded-full text-xs font-black transition-all ${
                activePosterId === p.id
                  ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-xs'
                  : 'text-stone-700 hover:bg-amber-100 hover:text-stone-900'
              }`}
            >
              {p.shortLabel}
            </button>
          ))}
        </div>

        {/* Tri-Lingual Language Switcher */}
        <div className="flex items-center bg-white/95 rounded-full p-1 border-2 border-amber-300 shadow-sm text-xs font-bold">
          <button
            onClick={() => onLanguageChange('en')}
            className={`px-3.5 py-1.5 rounded-full transition-all ${
              language === 'en'
                ? 'bg-gradient-to-r from-emerald-800 to-emerald-950 text-white shadow-sm font-black'
                : 'text-stone-700 hover:text-stone-950'
            }`}
          >
            English
          </button>
          <button
            onClick={() => onLanguageChange('si')}
            className={`px-3.5 py-1.5 rounded-full transition-all ${
              language === 'si'
                ? 'bg-gradient-to-r from-emerald-800 to-emerald-950 text-white shadow-sm font-black font-sinhala'
                : 'text-stone-700 hover:text-stone-950 font-sinhala'
            }`}
          >
            සිංහල
          </button>
          <button
            onClick={() => onLanguageChange('ta')}
            className={`px-3.5 py-1.5 rounded-full transition-all ${
              language === 'ta'
                ? 'bg-gradient-to-r from-emerald-800 to-emerald-950 text-white shadow-sm font-black font-tamil'
                : 'text-stone-700 hover:text-stone-950 font-tamil'
            }`}
          >
            தமிழ்
          </button>
        </div>
      </div>

      {/* MAIN HERO DASHBOARD WITH COUNCILLOR PHOTO & AUTHENTIC TYPOGRAPHY */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-4 pb-12 sm:pb-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          
          {/* LEFT COLUMN: Welcome Typography & Golden Pill Action Button */}
          <div className="lg:col-span-4 space-y-5 text-center lg:text-left order-2 lg:order-1">
            <div className="space-y-1">
              <span className="inline-block text-stone-900 text-xl sm:text-2xl font-black tracking-tight bg-amber-300/80 px-2.5 py-0.5 rounded-lg border border-amber-400">
                {t.welcomeTo}
              </span>
              <h1 className="font-heading font-black text-[#134234] text-3xl sm:text-5xl lg:text-[46px] tracking-tight leading-[1.08] drop-shadow-2xs">
                SAROOJ SATTAR
                <span className="block text-[#1B4D3E] text-2xl sm:text-4xl lg:text-[38px] font-black tracking-tight mt-1">
                  COMMUNITY FORUM
                </span>
              </h1>
            </div>

            <p className="text-stone-900 text-base sm:text-lg font-bold leading-relaxed max-w-md mx-auto lg:mx-0">
              {t.heroSubtitle}
            </p>

            {/* The Golden Action Button matching reference mockup */}
            <div className="pt-2">
              <button
                onClick={onBuildCommunityClick}
                className="w-full sm:w-auto inline-flex items-center justify-between gap-5 px-8 py-4 rounded-full text-base sm:text-lg font-black text-stone-950 bg-gradient-to-r from-[#FFC72C] via-[#E8A51D] to-[#D48806] hover:from-[#FFD24C] hover:to-[#E8A51D] shadow-xl hover:shadow-2xl transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 border-2 border-amber-300 group"
              >
                <span>{t.buildCommunityBtn}</span>
                <span className="w-8 h-8 rounded-full bg-white text-stone-950 flex items-center justify-center shadow-md group-hover:translate-x-1 transition-transform shrink-0">
                  <ChevronRight className="w-5 h-5 text-stone-950 stroke-[3]" />
                </span>
              </button>
            </div>

            {/* Interactive Audio Voice Greeting Player */}
            <div className="p-3.5 rounded-2xl bg-white/95 border-2 border-amber-300 shadow-md flex items-center justify-between gap-3 max-w-sm mx-auto lg:mx-0">
              <div className="flex items-center gap-3">
                <button
                  onClick={handleToggleAudio}
                  className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all ${
                    isPlayingAudio
                      ? 'bg-amber-500 text-stone-950 shadow-inner'
                      : 'bg-gradient-to-tr from-[#1B4D3E] to-emerald-700 text-white hover:bg-emerald-950 shadow-md'
                  }`}
                  aria-label="Play Councillor Voice Message"
                >
                  {isPlayingAudio ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                </button>
                <div className="text-left">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-stone-900">Councillor&apos;s Voice Note</span>
                    <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-900">
                      {isPlayingAudio ? 'PLAYING' : 'AUDIO'}
                    </span>
                  </div>
                  <p className="text-[11px] text-stone-700 font-bold">
                    &ldquo;My door is always open for Negombo...&rdquo;
                  </p>
                </div>
              </div>

              {/* Animated Audio Equalizer Bars */}
              <div className="flex items-center gap-1 h-5 px-1">
                <span className={`w-1 bg-amber-500 rounded-full transition-all duration-300 ${isPlayingAudio ? 'h-4 animate-pulse' : 'h-1.5'}`} />
                <span className={`w-1 bg-[#1B4D3E] rounded-full transition-all duration-200 ${isPlayingAudio ? 'h-5 animate-bounce' : 'h-2.5'}`} />
                <span className={`w-1 bg-amber-600 rounded-full transition-all duration-400 ${isPlayingAudio ? 'h-3 animate-pulse' : 'h-1'}`} />
                <span className={`w-1 bg-emerald-600 rounded-full transition-all duration-250 ${isPlayingAudio ? 'h-4 animate-bounce' : 'h-2'}`} />
              </div>
            </div>

          </div>

          {/* CENTER COLUMN: The Authentic Councillor Photographic Portrait & Community Scene */}
          <div className="lg:col-span-5 relative order-1 lg:order-2 flex justify-center">
            <div className="w-full max-w-[440px]">
              <CouncillorPortrait
                activePosterId={activePosterId}
                onPosterChange={handlePosterSelect}
              />
            </div>
          </div>

          {/* RIGHT COLUMN: Dynamic Campaign Quote Card matching Selected Photo Poster */}
          <div className="lg:col-span-3 space-y-5 text-left order-3">
            
            {/* Quote Card */}
            <div className="p-5 sm:p-6 rounded-3xl bg-white/95 backdrop-blur-md border-2 border-amber-300 shadow-xl space-y-4 relative overflow-hidden">
              
              {/* Decorative Poster Tag */}
              <div className="flex items-center justify-between pb-2 border-b border-amber-200">
                <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${activePoster.badgeColor}`}>
                  {activePoster.name}
                </span>
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              </div>

              {/* Poster 4: Striped Shirt Tamil Style ("பதவியால் அல்ல... பாசத்தால்") */}
              {activePoster.id === 'poster_ta_striped' && (
                <div className="space-y-3 font-tamil">
                  <div className="text-stone-800 text-lg font-bold">
                    பதவியால் அல்ல...
                  </div>
                  <div className="text-3xl sm:text-4xl font-black text-rose-900 leading-tight">
                    பாசத்தால்
                  </div>
                  <div className="text-lg sm:text-xl font-extrabold text-stone-900 leading-snug">
                    என் மக்களோடு இணைந்தவன் நான்.
                  </div>
                  <div className="flex justify-center pt-2">
                    <div className="w-10 h-10 rounded-full bg-rose-100 border-2 border-rose-300 flex items-center justify-center text-rose-700 shadow-xs">
                      <Heart className="w-5 h-5 fill-rose-600 text-rose-600" />
                    </div>
                  </div>
                </div>
              )}

              {/* Poster 1 & 2: English White Shirt Style ("Until my last breath...") */}
              {activePoster.id === 'poster_en_white' && (
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="font-serif-quote font-black text-3xl sm:text-4xl text-[#1B4D3E] leading-none">
                      “
                    </span>
                    <span className="h-[2px] flex-1 bg-gradient-to-r from-amber-400 to-emerald-700" />
                  </div>
                  <div className="space-y-1 text-stone-800">
                    <div className="text-sm sm:text-base font-medium text-stone-700">
                      Until my
                    </div>
                    <div className="font-serif-quote italic text-2xl sm:text-3xl font-extrabold text-[#134234] leading-tight">
                      last breath,
                    </div>
                    <div className="text-sm sm:text-base font-medium text-stone-700 leading-snug pt-1">
                      I will stand with those in need and serve the poor with
                    </div>
                    <div className="font-serif-quote italic text-2xl sm:text-3xl font-extrabold text-[#134234] leading-tight">
                      compassion.
                    </div>
                  </div>
                  <div className="flex items-center gap-3 justify-end pt-1">
                    <span className="h-[2px] flex-1 bg-gradient-to-l from-amber-400 to-emerald-700" />
                    <span className="font-serif-quote font-black text-3xl sm:text-4xl text-[#1B4D3E] leading-none">
                      ”
                    </span>
                  </div>
                </div>
              )}

              {/* Poster 3: Tamil Faith & Duty ("சேவை செய்வது என் பெருமை அல்ல") */}
              {activePoster.id === 'poster_ta_duty' && (
                <div className="space-y-3 font-tamil">
                  <div className="flex items-center gap-3">
                    <span className="font-serif-quote font-black text-3xl sm:text-4xl text-amber-800 leading-none">
                      “
                    </span>
                    <span className="h-[2px] flex-1 bg-gradient-to-r from-amber-400 to-emerald-700" />
                  </div>
                  <div className="space-y-1 text-stone-900 text-sm sm:text-base leading-relaxed">
                    <p className="font-bold text-stone-800">சேவை செய்வது</p>
                    <p className="font-black text-lg sm:text-xl text-[#134234]">என் பெருமை அல்ல — அது என் பொறுப்பு.</p>
                    <div className="pt-2 text-stone-700 font-medium">
                      அல்லாஹ்வின் உதவியோடு, என்றும் என் மக்களுக்காக...
                    </div>
                    <p className="font-black text-amber-900 pt-1">இன்ஷா அல்லாஹ்.</p>
                  </div>
                  <div className="flex items-center gap-3 justify-end pt-1">
                    <span className="h-[2px] flex-1 bg-gradient-to-l from-amber-400 to-emerald-700" />
                    <span className="font-serif-quote font-black text-3xl sm:text-4xl text-amber-800 leading-none">
                      ”
                    </span>
                  </div>
                </div>
              )}

              {/* Poster 4: Sinhala Poetic Reflection ("මිනිසා සුවඳයි මලසේ") */}
              {activePoster.id === 'poster_si_poem' && (
                <div className="space-y-3 font-sinhala">
                  <div className="flex items-center gap-3">
                    <span className="font-serif-quote font-black text-3xl sm:text-4xl text-emerald-800 leading-none">
                      “
                    </span>
                    <span className="h-[2px] flex-1 bg-gradient-to-r from-amber-400 to-emerald-700" />
                  </div>
                  <div className="space-y-2 text-stone-900 text-sm sm:text-base leading-loose font-bold">
                    <p className="text-[#134234] text-lg font-black">මිනිසා සුවඳයි මලසේ,</p>
                    <p className="text-amber-900 text-lg font-black">නුවනින් එළියයි හිරුසේ,</p>
                    <p className="text-stone-800 font-bold">පරවී වැටිලා ඒ හිරු මල</p>
                    <p className="text-stone-900 font-black">මේ දෙරණේ...</p>
                  </div>
                  <div className="flex items-center gap-3 justify-end pt-1">
                    <span className="h-[2px] flex-1 bg-gradient-to-l from-amber-400 to-emerald-700" />
                    <span className="font-serif-quote font-black text-3xl sm:text-4xl text-emerald-800 leading-none">
                      ”
                    </span>
                  </div>
                </div>
              )}

              {/* Poster 5: Tamil Promise & Duty */}
              {activePoster.id === 'poster_ta_promise' && (
                <div className="space-y-3 font-tamil">
                  <div className="text-xs text-stone-600 italic font-sans">
                    &ldquo;Until my last breath, I will stand with those in need...&rdquo;
                  </div>
                  <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200 space-y-1 text-xs sm:text-sm">
                    <p className="font-black text-[#134234]">மக்களோடு இருப்பது என் வாக்குறுதி அல்ல — அது என் கடமை.</p>
                    <p className="font-bold text-amber-950">சேவை செய்வது என் பெருமை அல்ல — அது என் பொறுப்பு.</p>
                    <p className="text-stone-700 pt-1">அல்லாஹ்வின் உதவியோடு, என்றும் என் மக்களுக்காக...</p>
                  </div>
                </div>
              )}

              {/* Signature & Municipal Title Block matching reference */}
              <div className="pt-3 border-t-2 border-amber-200 text-right space-y-0.5">
                <div className="font-signature text-3xl sm:text-4xl text-stone-950 font-bold select-none leading-none">
                  Sarooj Sattar
                </div>
                <div className="text-xs font-bold text-stone-800 pt-1">
                  Negombo Municipal Council
                </div>
                <div className="text-xs font-black text-[#1B4D3E] uppercase tracking-wider">
                  Councillor • Ward 05
                </div>
              </div>

            </div>

            {/* Quick Contact Hotline Mini-Card */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950 via-emerald-900 to-teal-950 text-white shadow-xl border-2 border-amber-400/60 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-amber-300 font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-amber-400" />
                  <span>Citizen Hotline</span>
                </span>
                <span className="px-2 py-0.5 rounded bg-amber-400 text-[10px] font-mono font-bold text-stone-950">
                  24/7 LIVE
                </span>
              </div>
              <p className="text-xl font-mono font-black text-amber-300 tracking-wider">
                0702475248
              </p>
              <p className="text-[11px] text-emerald-200 leading-tight">
                Direct municipal line to Councillor Sarooj Sattar’s Periyamulla Secretariat.
              </p>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
