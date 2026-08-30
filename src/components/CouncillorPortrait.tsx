import React, { useState, useRef } from 'react';
import { Camera, Image as ImageIcon, Sparkles, Upload, RefreshCw, Layers, Check, Heart } from 'lucide-react';
import { OFFICIAL_POSTERS, OfficialPoster } from '../data/posters.js';

interface CouncillorPortraitProps {
  customImage?: string | null;
  activePosterId?: string;
  onPosterChange?: (posterId: string) => void;
  onImageChange?: (imageUri: string | null) => void;
}

export const CouncillorPortrait: React.FC<CouncillorPortraitProps> = ({
  customImage,
  activePosterId = 'poster_ta_striped',
  onPosterChange,
  onImageChange,
}) => {
  const [localImage, setLocalImage] = useState<string | null>(() => {
    return customImage || localStorage.getItem('sarooj_custom_hero_photo') || localStorage.getItem('dashboard_bg_photo');
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
        localStorage.setItem('dashboard_bg_photo', result);
        if (onImageChange) onImageChange(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleReset = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLocalImage(null);
    localStorage.removeItem('sarooj_custom_hero_photo');
    localStorage.removeItem('dashboard_bg_photo');
    if (onImageChange) onImageChange(null);
  };

  return (
    <div className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-4 border-amber-400 bg-gradient-to-br from-[#FF9800] via-[#E65100] to-[#0A2540] group">
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
        /* Authentic Artistic Composition Matching The Uploaded Official Campaign Poster */
        <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
          
          {/* Dynamic Golden Sunlight & Sunrise Sky Gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#FFA726] via-[#FB8C00] to-[#0A2218]" />
          
          {/* Sunburst Rays Flare in Top-Left */}
          <div className="absolute -top-10 -left-10 w-72 h-72 rounded-full bg-[radial-gradient(circle,#FFF3E0_0%,#FFE082_35%,#FFB74D_65%,transparent_80%)] opacity-85 blur-md" />
          <div className="absolute inset-0 opacity-40 mix-blend-overlay bg-[radial-gradient(circle_at_20%_20%,#FFFFFF_0%,transparent_60%)]" />

          {/* SVG Composition of Councillor Sarooj Sattar & Morning Village Community */}
          <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 400 500">
            <defs>
              <linearGradient id="stripedShirtGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="50%" stopColor="#F8FAFC" />
                <stop offset="100%" stopColor="#E2E8F0" />
              </linearGradient>
              <linearGradient id="whiteShirtGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="70%" stopColor="#F5F5F4" />
                <stop offset="100%" stopColor="#E7E5E4" />
              </linearGradient>
              <linearGradient id="skinTone" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#DEAB82" />
                <stop offset="50%" stopColor="#C88E62" />
                <stop offset="100%" stopColor="#A2673D" />
              </linearGradient>
              <linearGradient id="skyGoldenGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFF9C4" stopOpacity="0.9" />
                <stop offset="50%" stopColor="#FFE082" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#FFA726" stopOpacity="0.4" />
              </linearGradient>
            </defs>

            {/* Glowing Golden Horizon Sun */}
            <circle cx="80" cy="100" r="140" fill="url(#skyGoldenGlow)" />
            <circle cx="80" cy="100" r="60" fill="#FFFFFF" opacity="0.6" />

            {/* Background Village Street with Children & Elders (Negombo Ward 5) */}
            <g opacity="0.55" fill="#422006">
              {/* Rooflines & Lane Perspective */}
              <path d="M0 370 L160 330 L240 330 L400 370 L400 500 L0 500 Z" fill="#2E1B0D" opacity="0.6" />
              
              {/* Left Side: Smiling Young Boys and Children */}
              <circle cx="50" cy="330" r="15" fill="#8D5B2F" />
              <path d="M35 360 C35 345, 65 345, 65 360 L70 420 L30 420 Z" fill="#995E35" />
              
              <circle cx="85" cy="315" r="18" fill="#A0683B" />
              <path d="M65 350 C65 330, 105 330, 105 350 L110 430 L60 430 Z" fill="#B2744B" />

              <circle cx="120" cy="325" r="16" fill="#78421A" />
              <path d="M100 355 C100 340, 140 340, 140 355 L145 425 L95 425 Z" fill="#8D5B2F" />

              {/* Little girl with ponytail */}
              <circle cx="150" cy="345" r="12" fill="#995E35" />
              <path d="M135 370 C135 355, 165 355, 165 370 L168 420 L132 420 Z" fill="#B2744B" />

              {/* Right Side: Elders in traditional sarong and shirts */}
              <circle cx="340" cy="310" r="22" fill="#78421A" />
              <path d="M310 350 C310 325, 370 325, 370 350 L380 430 L300 430 Z" fill="#6E3A15" />
            </g>

            {/* Foreground Councillor Sarooj Sattar Portrait */}
            <g>
              {/* Base Shadow */}
              <ellipse cx="220" cy="485" rx="190" ry="60" fill="#0A2218" opacity="0.7" />

              {isStriped ? (
                /* Blue-and-White Vertical Striped Shirt with Crossed Arms, Luxury Watch & Signet Ring */
                <g>
                  {/* Shirt Torso */}
                  <path
                    d="M80 500 C95 380, 145 345, 190 340 L205 375 L220 400 L235 375 L250 340 C295 345, 345 380, 360 500 Z"
                    fill="url(#stripedShirtGrad)"
                    stroke="#0F172A"
                    strokeWidth="1.5"
                  />
                  
                  {/* Crisp Navy-Blue Vertical Stripes on Shirt */}
                  <path
                    d="M95 500 L105 400 L120 400 L110 500 Z M130 500 L140 380 L155 380 L145 500 Z M170 500 L178 360 L193 360 L185 500 Z M245 500 L252 360 L267 360 L260 500 Z M285 500 L290 380 L305 380 L300 500 Z M320 500 L325 400 L340 400 L335 500 Z"
                    fill="#1E3A8A"
                    opacity="0.88"
                  />

                  {/* Open Collar & Buttons */}
                  <polygon points="190,340 220,395 205,370 180,350" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.5" />
                  <polygon points="250,340 220,395 235,370 260,350" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1.5" />
                  <circle cx="220" cy="420" r="3" fill="#FFFFFF" stroke="#64748B" strokeWidth="1" />
                  <circle cx="220" cy="445" r="3" fill="#FFFFFF" stroke="#64748B" strokeWidth="1" />

                  {/* Crossed Arms and Hands */}
                  <path d="M100 460 C130 430, 310 430, 340 460 L330 500 L110 500 Z" fill="#C88E62" stroke="#9A5D32" strokeWidth="1.5" />
                  
                  {/* Luxury Chronograph Watch on Left Wrist */}
                  <rect x="235" y="445" width="26" height="18" rx="5" fill="#0F172A" stroke="#475569" strokeWidth="1.5" />
                  <circle cx="248" cy="454" r="8" fill="#F1F5F9" stroke="#0F172A" strokeWidth="2" />
                  <circle cx="248" cy="454" r="2.5" fill="#0F172A" />
                  {/* Watch Hands */}
                  <line x1="248" y1="454" x2="248" y2="449" stroke="#0F172A" strokeWidth="1.5" strokeLinecap="round" />
                  <line x1="248" y1="454" x2="253" y2="454" stroke="#EF4444" strokeWidth="1" strokeLinecap="round" />
                  {/* Crown Pushers */}
                  <rect x="261" y="452" width="2" height="4" fill="#94A3B8" />

                  {/* Gold Signet Ring on Right Hand Finger */}
                  <ellipse cx="185" cy="470" rx="4.5" ry="3.5" fill="#F59E0B" stroke="#B45309" strokeWidth="1.5" />
                  <ellipse cx="185" cy="470" rx="2" ry="1.5" fill="#FDE68A" />
                </g>
              ) : (
                /* Crisp White Shirt (Alternate Poster) */
                <g>
                  <path
                    d="M80 500 C90 380, 140 345, 190 340 L205 375 L220 400 L235 375 L250 340 C290 345, 340 380, 350 500 Z"
                    fill="url(#whiteShirtGrad)"
                    stroke="#D6D3D1"
                    strokeWidth="2"
                  />
                  <polygon points="190,340 220,400 205,375 180,355" fill="#FFFFFF" stroke="#E7E5E4" />
                  <polygon points="250,340 220,400 235,375 260,355" fill="#F5F5F4" stroke="#E7E5E4" />
                  <line x1="220" y1="400" x2="220" y2="500" stroke="#E7E5E4" strokeWidth="3" />
                  <circle cx="220" cy="430" r="3.5" fill="#E2E8F0" stroke="#94A3B8" />
                  <circle cx="220" cy="460" r="3.5" fill="#E2E8F0" stroke="#94A3B8" />
                </g>
              )}

              {/* Neck with Warm Golden Shading */}
              <path d="M198 315 L198 360 C210 370, 230 370, 242 360 L242 315 Z" fill="#B2744B" />

              {/* Head & Face Contour */}
              <path
                d="M168 225 C168 150, 185 125, 220 125 C255 125, 272 150, 272 225 C272 285, 255 325, 220 325 C185 325, 168 285, 168 225 Z"
                fill="url(#skinTone)"
              />

              {/* Haircut with Side Fade */}
              <path
                d="M166 205 C164 140, 180 115, 220 115 C260 115, 276 140, 274 205 C268 145, 252 128, 220 128 C188 128, 172 145, 166 205 Z"
                fill="#1C1917"
              />
              <path d="M166 185 L170 230 L176 228 L172 185 Z" fill="#292524" opacity="0.9" />
              <path d="M274 185 L270 230 L264 228 L268 185 Z" fill="#292524" opacity="0.9" />

              {/* Eyebrows */}
              <path d="M185 190 Q198 185 208 192" stroke="#1C1917" strokeWidth="4.5" strokeLinecap="round" fill="none" />
              <path d="M232 192 Q242 185 255 190" stroke="#1C1917" strokeWidth="4.5" strokeLinecap="round" fill="none" />

              {/* Eyes & Warm Focus */}
              <ellipse cx="197" cy="202" rx="6.5" ry="4" fill="#292524" />
              <ellipse cx="243" cy="202" rx="6.5" ry="4" fill="#292524" />
              <circle cx="198" cy="201" r="1.8" fill="#FFFFFF" />
              <circle cx="244" cy="201" r="1.8" fill="#FFFFFF" />

              {/* Nose Contour */}
              <path d="M218 200 L216 235 L224 235 Z" fill="#A56338" />

              {/* Confident, Warm Smile */}
              <path d="M202 260 Q220 268 238 260" stroke="#78350F" strokeWidth="3" strokeLinecap="round" fill="none" />
              <path d="M206 261 Q220 265 234 261" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.8" />

              {/* Defined Jawline & Stubble */}
              <path d="M195 290 Q220 300 245 290" stroke="#8C4E26" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.5" />
            </g>

            {/* Golden Sunlight Rim Highlight */}
            <path
              d="M168 170 C166 140, 185 120, 220 120 C255 120, 274 140, 272 170"
              stroke="#FDE68A"
              strokeWidth="4.5"
              fill="none"
              opacity="0.9"
            />
          </svg>
        </div>
      )}

      {/* Floating Colourful Civic Badge on Photo with Tamil Motto */}
      <div className="absolute bottom-3 left-3 right-3 bg-stone-950/90 backdrop-blur-md px-3.5 py-2.5 rounded-2xl border-2 border-amber-400 text-white flex items-center justify-between shadow-2xl">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse shadow-sm shadow-amber-400 shrink-0" />
          <div className="truncate">
            <span className="text-xs font-black text-amber-300 block leading-tight truncate">Councillor Sarooj Sattar</span>
            <span className="text-[10px] text-stone-300 font-bold block truncate">{activePoster.motto}</span>
          </div>
        </div>
        <span className="text-[10px] bg-amber-400 text-stone-950 font-black px-2.5 py-1 rounded-full border border-amber-300 shrink-0 ml-1 shadow-sm">
          Ward 05 • Periyamulla
        </span>
      </div>

      {/* Top Action Toolbar: Upload Custom Photo + Poster Mode Selector */}
      <div className="absolute top-3 right-3 z-30 flex items-center gap-2">
        
        {/* Photo Mode Switcher Menu */}
        <button
          onClick={() => setShowPosterSelector(!showPosterSelector)}
          className="bg-stone-900/90 hover:bg-emerald-900 text-white px-2.5 py-1.5 rounded-xl border border-amber-300 shadow-lg backdrop-blur-xs transition-all flex items-center gap-1.5 text-xs font-black"
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
          className="cursor-pointer bg-stone-900/90 hover:bg-emerald-800 text-white p-2 rounded-xl border border-amber-300 shadow-lg backdrop-blur-xs transition-all flex items-center gap-1 text-xs font-bold"
          title="Upload your photo directly"
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
