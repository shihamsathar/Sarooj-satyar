import React, { useState, useRef } from 'react';
import { Camera, Image as ImageIcon, Sparkles, Upload, RefreshCw, Layers, Check } from 'lucide-react';
import { OFFICIAL_POSTERS, OfficialPoster } from '../data/posters.js';

interface CouncillorPortraitProps {
  customImage?: string | null;
  activePosterId?: string;
  onPosterChange?: (posterId: string) => void;
  onImageChange?: (imageUri: string | null) => void;
}

export const CouncillorPortrait: React.FC<CouncillorPortraitProps> = ({
  customImage,
  activePosterId = 'poster_en_white',
  onPosterChange,
  onImageChange,
}) => {
  const [localImage, setLocalImage] = useState<string | null>(() => {
    return customImage || localStorage.getItem('sarooj_custom_hero_photo');
  });
  const [showPosterSelector, setShowPosterSelector] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const activePoster = OFFICIAL_POSTERS.find((p) => p.id === activePosterId) || OFFICIAL_POSTERS[0];
  const isStriped = activePoster.shirtType === 'striped';

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        setLocalImage(result);
        localStorage.setItem('sarooj_custom_hero_photo', result);
        if (onImageChange) onImageChange(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleReset = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLocalImage(null);
    localStorage.removeItem('sarooj_custom_hero_photo');
    if (onImageChange) onImageChange(null);
  };

  return (
    <div className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-4 border-white/95 bg-gradient-to-br from-amber-500 via-orange-600 to-emerald-950 group">
      {/* Hidden file input for custom photo upload */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        accept="image/*"
        className="hidden"
      />

      {localImage ? (
        /* User-Provided Authentic Photo */
        <div className="relative w-full h-full">
          <img
            src={localImage}
            alt="Councillor Sarooj Sattar"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent pointer-events-none" />
        </div>
      ) : (
        /* Authentic Artistic Composition Matching The Attached Official Campaign Posters */
        <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
          {/* Dynamic Golden Sunlight & Sunset Sky Gradient */}
          <div className={`absolute inset-0 bg-gradient-to-b ${isStriped ? 'from-[#FFA000] via-[#FF8F00] to-[#0D3B66]' : 'from-[#FFA726] via-[#FB8C00] to-[#1B4D3E]'}`} />
          
          {/* Sunburst Rays */}
          <div className="absolute inset-0 opacity-40 mix-blend-overlay bg-[radial-gradient(circle_at_70%_20%,#FFE082_0%,transparent_65%)]" />
          
          {/* Community Gathering Scene in Warm Sunlight (Negombo Ward 5) */}
          <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 400 500">
            <defs>
              <linearGradient id="skyGlow" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FFE082" stopOpacity="0.9" />
                <stop offset="40%" stopColor="#FFA726" stopOpacity="0.7" />
                <stop offset="80%" stopColor="#1B4D3E" stopOpacity="0.95" />
              </linearGradient>
              <linearGradient id="whiteShirtGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="70%" stopColor="#F5F5F4" />
                <stop offset="100%" stopColor="#E7E5E4" />
              </linearGradient>
              <linearGradient id="stripedShirtGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#F8FAFC" />
                <stop offset="100%" stopColor="#E2E8F0" />
              </linearGradient>
              <linearGradient id="skinTone" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#D49B74" />
                <stop offset="50%" stopColor="#C08457" />
                <stop offset="100%" stopColor="#9C5D35" />
              </linearGradient>
              <pattern id="stripes" width="24" height="24" patternUnits="userSpaceOnUse">
                <rect width="12" height="24" fill="#FFFFFF" />
                <rect x="12" width="12" height="24" fill="#1E3A8A" opacity="0.85" />
              </pattern>
            </defs>

            {/* Glowing Golden Horizon Sun */}
            <circle cx={isStriped ? "320" : "280"} cy="170" r="120" fill="#FFF3E0" opacity="0.4" />
            <circle cx={isStriped ? "320" : "280"} cy="170" r="80" fill="#FFE082" opacity="0.5" />

            {isStriped ? (
              /* Morning Village Scene with Children & Families (Photo 4) */
              <g opacity="0.5" fill="#4A2810">
                {/* Village Street Horizon & Coconut Trees */}
                <path d="M0 380 Q200 360 400 380 L400 500 L0 500 Z" fill="#2E1B0D" opacity="0.6" />
                {/* Smiling children in background */}
                <circle cx="80" cy="340" r="16" fill="#8D5B2F" />
                <path d="M60 375 C60 355, 100 355, 100 375 L105 440 L55 440 Z" fill="#995E35" />
                
                <circle cx="115" cy="330" r="18" fill="#A0683B" />
                <path d="M95 365 C95 345, 135 345, 135 365 L140 440 L90 440 Z" fill="#B2744B" />
                
                <circle cx="45" cy="355" r="14" fill="#78421A" />
                <path d="M30 385 C30 370, 60 370, 60 385 L65 440 L25 440 Z" fill="#6E3A15" />

                {/* Right side elders */}
                <circle cx="340" cy="320" r="22" fill="#78421A" />
                <path d="M310 360 C310 335, 370 335, 370 360 L380 440 L300 440 Z" fill="#6E3A15" />
              </g>
            ) : (
              /* Community Gathering Scene (Photos 1, 2, 3, 5) */
              <g opacity="0.45" fill="#5D3A1A">
                {/* Elder on Right */}
                <circle cx="340" cy="310" r="24" />
                <path d="M310 360 C310 330, 370 330, 370 360 L380 430 L300 430 Z" />
                {/* Young Man in Center-Right */}
                <circle cx="295" cy="220" r="26" fill="#8D5B2F" />
                <path d="M265 270 C265 240, 325 240, 325 270 L340 370 L250 370 Z" fill="#A0683B" />
                {/* Left Side Citizens */}
                <circle cx="110" cy="340" r="22" />
                <path d="M85 390 C85 360, 135 360, 135 390 L145 450 L75 450 Z" />
                <circle cx="70" cy="360" r="18" />
                <path d="M50 405 C50 380, 90 380, 90 405 L95 460 L45 460 Z" />
              </g>
            )}

            {/* Foreground Councillor Sarooj Sattar Portrait Silhouette & Features */}
            <g>
              {/* Base Shadow */}
              <ellipse cx="200" cy="485" rx="190" ry="60" fill="#0A2218" opacity="0.6" />

              {isStriped ? (
                /* Blue-and-White Vertical Striped Shirt with Crossed Arms (Photo 4) */
                <g>
                  <path
                    d="M60 500 C75 390, 125 360, 170 355 L185 385 L200 410 L215 385 L230 355 C275 360, 325 390, 340 500 Z"
                    fill="url(#stripedShirtGrad)"
                    stroke="#1E3A8A"
                    strokeWidth="2"
                  />
                  {/* Vertical Stripes pattern on shirt */}
                  <path
                    d="M75 500 L85 410 L100 410 L90 500 Z M110 500 L120 395 L135 395 L125 500 Z M150 500 L158 375 L173 375 L165 500 Z M235 500 L242 375 L257 375 L250 500 Z M275 500 L280 395 L295 395 L290 500 Z M310 500 L315 410 L330 410 L325 500 Z"
                    fill="#1E3A8A"
                    opacity="0.85"
                  />
                  {/* Crossed Arms & Watch */}
                  <path d="M90 470 C120 440, 280 440, 310 470 L300 500 L100 500 Z" fill="#D49B74" />
                  {/* Stainless Steel Watch on Left Wrist */}
                  <rect x="220" y="455" width="22" height="14" rx="4" fill="#0F172A" />
                  <circle cx="231" cy="462" r="7" fill="#E2E8F0" stroke="#0F172A" strokeWidth="2" />
                  <circle cx="231" cy="462" r="2" fill="#0F172A" />
                  {/* Signet Ring on Finger */}
                  <ellipse cx="175" cy="475" rx="3.5" ry="2.5" fill="#F59E0B" stroke="#B45309" strokeWidth="1" />
                </g>
              ) : (
                /* Crisp White Open-Collar Shirt (Photos 1, 2, 3, 5) */
                <g>
                  <path
                    d="M70 500 C80 390, 130 360, 170 355 L185 385 L200 410 L215 385 L230 355 C270 360, 320 390, 330 500 Z"
                    fill="url(#whiteShirtGrad)"
                    stroke="#D6D3D1"
                    strokeWidth="2"
                  />
                  <polygon points="170,355 200,410 185,385 160,365" fill="#FFFFFF" stroke="#E7E5E4" />
                  <polygon points="230,355 200,410 215,385 240,365" fill="#F5F5F4" stroke="#E7E5E4" />
                  <line x1="200" y1="410" x2="200" y2="500" stroke="#E7E5E4" strokeWidth="3" />
                  <circle cx="200" cy="435" r="3.5" fill="#E2E8F0" stroke="#94A3B8" />
                  <circle cx="200" cy="465" r="3.5" fill="#E2E8F0" stroke="#94A3B8" />
                  <circle cx="200" cy="495" r="3.5" fill="#E2E8F0" stroke="#94A3B8" />
                </g>
              )}

              {/* Neck with Warm Golden Shading */}
              <path d="M180 330 L180 375 C190 385, 210 385, 220 375 L220 330 Z" fill="#B2744B" />

              {/* Head & Face */}
              <path
                d="M148 245 C148 175, 165 145, 200 145 C235 145, 252 175, 252 245 C252 305, 235 340, 200 340 C165 340, 148 305, 148 245 Z"
                fill="url(#skinTone)"
              />

              {/* Short Hair & Sideburns */}
              <path
                d="M146 225 C144 165, 160 135, 200 135 C240 135, 256 165, 254 225 C248 170, 232 150, 200 150 C168 150, 152 170, 146 225 Z"
                fill="#1C1917"
              />
              <path d="M146 205 L150 250 L156 248 L152 205 Z" fill="#292524" />
              <path d="M254 205 L250 250 L244 248 L248 205 Z" fill="#292524" />

              {/* Eyebrows */}
              <path d="M165 210 Q178 205 188 212" stroke="#1C1917" strokeWidth="4.5" strokeLinecap="round" fill="none" />
              <path d="M212 212 Q222 205 235 210" stroke="#1C1917" strokeWidth="4.5" strokeLinecap="round" fill="none" />

              {/* Eyes & Warm Focus */}
              <ellipse cx="177" cy="222" rx="6" ry="3.5" fill="#292524" />
              <ellipse cx="223" cy="222" rx="6" ry="3.5" fill="#292524" />
              <circle cx="178" cy="221" r="1.5" fill="#FFFFFF" />
              <circle cx="224" cy="221" r="1.5" fill="#FFFFFF" />

              {/* Nose */}
              <path d="M198 220 L196 250 L204 250 Z" fill="#A56338" />

              {/* Mouth & Expression */}
              <path d="M184 275 Q200 282 216 275" stroke="#78350F" strokeWidth="3" strokeLinecap="round" fill="none" />

              {/* Stubble / Defined Jaw */}
              <path d="M175 305 Q200 315 225 305" stroke="#8C4E26" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.6" />
            </g>

            {/* Golden Sunlight Rim Highlight */}
            <path
              d="M148 190 C146 160, 165 140, 200 140 C235 140, 254 160, 252 190"
              stroke="#FDE68A"
              strokeWidth="4"
              fill="none"
              opacity="0.85"
            />
          </svg>
        </div>
      )}

      {/* Floating Colourful Civic Badge on Photo */}
      <div className="absolute bottom-3 left-3 right-3 bg-stone-950/85 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-amber-400/50 text-white flex items-center justify-between shadow-xl">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-sm shadow-emerald-400" />
          <div>
            <span className="text-xs font-black text-amber-300 block leading-tight">Councillor Sarooj Sattar</span>
            <span className="text-[10px] text-stone-300 block">{activePoster.motto}</span>
          </div>
        </div>
        <span className="text-[10px] bg-emerald-800 text-emerald-200 font-black px-2.5 py-1 rounded-full border border-emerald-500/50 shrink-0">
          Ward 05 • Negombo
        </span>
      </div>

      {/* Top Action Toolbar: Upload Custom Photo + Poster Mode Selector */}
      <div className="absolute top-3 right-3 z-30 flex items-center gap-2">
        
        {/* Photo Mode Switcher Menu */}
        <button
          onClick={() => setShowPosterSelector(!showPosterSelector)}
          className="bg-stone-900/90 hover:bg-emerald-900 text-white px-2.5 py-1.5 rounded-xl border border-amber-300/80 shadow-lg backdrop-blur-xs transition-all flex items-center gap-1.5 text-xs font-black"
          title="Switch Official Campaign Poster Theme"
        >
          <Layers className="w-3.5 h-3.5 text-amber-300" />
          <span className="hidden sm:inline text-amber-200">
            {activePoster.shortLabel}
          </span>
        </button>

        {/* Upload Custom Photo Button */}
        <div 
          onClick={() => fileInputRef.current?.click()}
          className="cursor-pointer bg-stone-900/90 hover:bg-emerald-800 text-white p-2 rounded-xl border border-amber-300/80 shadow-lg backdrop-blur-xs transition-all flex items-center gap-1 text-xs font-bold"
          title="Upload your local photo directly"
        >
          <Camera className="w-4 h-4 text-amber-300" />
          {localImage && (
            <button
              onClick={handleReset}
              className="ml-1 p-0.5 hover:text-red-400"
              title="Reset to default graphic"
            >
              <RefreshCw className="w-3 h-3" />
            </button>
          )}
        </div>

      </div>

      {/* Dropdown Poster Selector Modal / Overlay */}
      {showPosterSelector && (
        <div className="absolute inset-x-3 top-14 z-40 bg-stone-950/95 backdrop-blur-md rounded-2xl border-2 border-amber-400 p-3 shadow-2xl space-y-2 max-h-[75%] overflow-y-auto">
          <div className="flex items-center justify-between pb-1.5 border-b border-stone-800">
            <span className="text-xs font-black text-amber-300 uppercase tracking-wider">
              Select Official Campaign Poster
            </span>
            <button
              onClick={() => setShowPosterSelector(false)}
              className="text-stone-400 hover:text-white text-xs font-bold"
            >
              ✕
            </button>
          </div>

          <div className="space-y-1.5">
            {OFFICIAL_POSTERS.map((poster) => (
              <button
                key={poster.id}
                onClick={() => {
                  if (onPosterChange) onPosterChange(poster.id);
                  setShowPosterSelector(false);
                }}
                className={`w-full text-left p-2 rounded-xl transition-all flex items-center justify-between text-xs ${
                  activePosterId === poster.id
                    ? 'bg-amber-400 text-stone-950 font-black'
                    : 'bg-stone-900 hover:bg-stone-800 text-stone-200 font-bold'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${poster.shirtType === 'striped' ? 'bg-blue-400' : 'bg-amber-400'}`} />
                  <div>
                    <div className="font-bold">{poster.name}</div>
                    <div className={`text-[10px] ${activePosterId === poster.id ? 'text-stone-900' : 'text-stone-400'}`}>
                      {poster.motto}
                    </div>
                  </div>
                </div>
                {activePosterId === poster.id && <Check className="w-4 h-4" />}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
