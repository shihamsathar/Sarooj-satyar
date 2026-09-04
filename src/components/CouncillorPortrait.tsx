import React, { useState, useRef, useEffect } from 'react';
import { Camera, Shield, Award, Sparkles } from 'lucide-react';
import { OFFICIAL_POSTERS, OfficialPoster } from '../data/posters.js';
import { CAMPAIGN_IMAGES } from '../assets/campaignMedia.js';

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
    return customImage || localStorage.getItem('sarooj_custom_hero_photo') || CAMPAIGN_IMAGES.portrait;
  });
  const [imgLoadError, setImgLoadError] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const activePoster = OFFICIAL_POSTERS.find((p) => p.id === activePosterId) || OFFICIAL_POSTERS[0];

  // Check server for stored or uploaded campaign photos
  useEffect(() => {
    if (!localImage || localImage === CAMPAIGN_IMAGES.portrait) {
      fetch('/api/photos/active')
        .then((res) => res.json())
        .then((data) => {
          if (data.success && data.photos) {
            const found = data.photos['active-portrait.jpg'] || 
              data.photos['active-background.jpg'] ||
              Object.values(data.photos)[0];
            if (found) {
              setLocalImage(found as string);
              setImgLoadError(false);
            }
          }
        })
        .catch(() => {});
    }
  }, [localImage]);

  // Sync if customImage prop changes
  useEffect(() => {
    if (customImage) {
      setLocalImage(customImage);
      setImgLoadError(false);
    }
  }, [customImage]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async () => {
        const result = reader.result as string;
        setLocalImage(result);
        setImgLoadError(false);
        localStorage.setItem('sarooj_custom_hero_photo', result);
        localStorage.setItem('dashboard_bg_photo', result);
        if (onImageChange) onImageChange(result);

        // Upload to server disk
        try {
          await fetch('/api/photos/upload', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              dataUrl: result,
              filename: file.name,
              slot: 'portrait',
            }),
          });
        } catch (err) {
          console.error('Server sync error:', err);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const displayImage = (!imgLoadError && localImage) || CAMPAIGN_IMAGES.portrait;

  return (
    <div className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-4 border-amber-400 bg-gradient-to-br from-[#134234] via-[#1B4D3E] to-[#0A2540] group">
      {/* Hidden file input for custom photo upload */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        accept="image/*"
        className="hidden"
      />

      {displayImage ? (
        /* Real Authentic Campaign Photograph of Councillor Sarooj Sattar */
        <div className="relative w-full h-full">
          <img
            src={displayImage}
            alt="Councillor Sarooj Sattar Official Campaign Portrait"
            referrerPolicy="no-referrer"
            onError={() => {
              if (displayImage !== localImage && localImage) {
                // Try localImage next
              } else {
                setImgLoadError(true);
              }
            }}
            className="w-full h-full object-cover object-top filter brightness-105 contrast-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/15 to-transparent pointer-events-none" />
        </div>
      ) : (
        /* Authentic Civic Framing with Direct 1-Click Campaign Photo Apply */
        <div className="relative w-full h-full flex flex-col justify-between p-6 sm:p-8 text-center text-white bg-gradient-to-br from-[#134234] via-[#1B4D3E] to-[#0A2540] border-2 border-amber-300">
          
          {/* Top Flourish */}
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400 text-stone-950 text-xs font-black shadow-md border border-amber-300">
              <Award className="w-3.5 h-3.5" />
              <span>Ward 05 • Periyamulla</span>
            </span>
            <span className="text-xs text-amber-300 font-bold uppercase tracking-wider">
              Official Portrait
            </span>
          </div>

          {/* Center Card: Councillor Title & Motto */}
          <div className="space-y-4 my-auto">
            <div className="w-24 h-24 mx-auto rounded-3xl bg-gradient-to-tr from-amber-400 via-amber-500 to-yellow-300 p-1 shadow-2xl flex items-center justify-center">
              <div className="w-full h-full rounded-[22px] bg-[#134234] flex flex-col items-center justify-center text-amber-300 p-2">
                <Shield className="w-10 h-10 text-amber-400 stroke-[2.5]" />
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-xs font-black text-amber-300 uppercase tracking-widest">
                Negombo Municipal Council
              </span>
              <h2 className="text-2xl sm:text-3xl font-heading font-black text-white tracking-tight leading-tight">
                SAROOJ SATTAR
              </h2>
              <p className="text-xs sm:text-sm font-bold text-emerald-200 font-tamil">
                பதவியால் அல்ல... பாசத்தால் இணைந்தவன்
              </p>
            </div>

            {/* Direct 1-Click Action to Select / Apply Councillor Photo */}
            <div className="pt-2">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-[#FFC72C] via-amber-500 to-orange-500 text-stone-950 font-black text-xs sm:text-sm shadow-xl hover:from-amber-400 hover:to-orange-400 transition-all flex items-center justify-center gap-2 cursor-pointer border border-amber-300 transform hover:scale-[1.02] active:scale-[0.98]"
              >
                <Camera className="w-4 h-4 text-stone-950" />
                <span>Select / Apply Councillor Photo</span>
              </button>
              <p className="text-[11px] text-stone-300 font-medium mt-1.5">
                Choose any of your 7 WhatsApp campaign photos
              </p>
            </div>
          </div>

          {/* Bottom Inscription */}
          <div className="pt-3 border-t border-emerald-700/60 text-xs text-amber-200/80 font-serif-quote italic">
            &ldquo;Until my last breath, I will stand with those in need...&rdquo;
          </div>
        </div>
      )}

      {/* Floating Colourful Civic Badge on Photo with Tamil Motto */}
      <div className="absolute bottom-3 left-3 right-3 bg-stone-950/90 backdrop-blur-md px-3.5 py-2.5 rounded-2xl border-2 border-amber-400 text-white flex items-center justify-between shadow-2xl pointer-events-auto">
        <div className="flex items-center gap-2 truncate">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse shadow-sm shadow-amber-400 shrink-0" />
          <div className="truncate text-left">
            <span className="text-xs font-black text-amber-300 block leading-tight truncate">Councillor Sarooj Sattar</span>
            <span className="text-[10px] text-stone-300 font-bold block truncate">{activePoster.motto}</span>
          </div>
        </div>
        <span className="text-[10px] bg-amber-400 text-stone-950 font-black px-2.5 py-1 rounded-full border border-amber-300 shrink-0 ml-1 shadow-sm">
          Ward 05 • Periyamulla
        </span>
      </div>
    </div>
  );
};
