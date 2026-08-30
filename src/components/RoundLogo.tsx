import React from 'react';

interface RoundLogoProps {
  size?: number | string;
  className?: string;
  showText?: boolean;
  showFlourish?: boolean;
  theme?: 'light' | 'dark' | 'transparent';
}

export const RoundLogo: React.FC<RoundLogoProps> = ({
  size = 120,
  className = '',
  showText = false,
  showFlourish = false,
}) => {
  return (
    <div className={`inline-flex flex-col items-center select-none ${className}`}>
      {/* The Circular Emblem SVG */}
      <svg
        viewBox="0 0 300 300"
        style={{ width: typeof size === 'number' ? `${size}px` : size, height: typeof size === 'number' ? `${size}px` : size }}
        className="shrink-0 transition-transform duration-300 hover:scale-105"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="goldRimGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#DFC07A" />
            <stop offset="50%" stopColor="#B38B37" />
            <stop offset="100%" stopColor="#D4AF37" />
          </linearGradient>
          <linearGradient id="goldPeopleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#D9B45C" />
            <stop offset="100%" stopColor="#A87926" />
          </linearGradient>
          <linearGradient id="greenHandsGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1B4D3E" />
            <stop offset="100%" stopColor="#113628" />
          </linearGradient>
          <filter id="subtleShadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.12" />
          </filter>
        </defs>

        {/* White Background Disc */}
        <circle cx="150" cy="150" r="142" fill="#FFFFFF" />

        {/* Outer Fine Gold Circle */}
        <circle
          cx="150"
          cy="150"
          r="138"
          stroke="url(#goldRimGradient)"
          strokeWidth="3.5"
          fill="none"
        />

        {/* DOVE AT THE TOP */}
        <g id="flying-dove" filter="url(#subtleShadow)">
          {/* Olive Branch in Beak */}
          <path
            d="M178 88 C186 85 194 80 199 74 M188 84 C193 84 198 81 200 76 M184 86 C186 91 190 94 196 93 M179 88 C182 92 186 94 191 93"
            stroke="#1B4D3E"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          {/* Olive Leaves */}
          <path
            d="M198 74 C202 71 207 72 205 77 C203 80 199 79 198 74 Z"
            fill="#1B4D3E"
          />
          <path
            d="M192 93 C196 90 200 93 198 97 C195 99 192 97 192 93 Z"
            fill="#1B4D3E"
          />
          <path
            d="M185 93 C187 97 185 101 181 100 C178 98 180 94 185 93 Z"
            fill="#B38B37"
          />

          {/* Dove Body & Wings (White with crisp green & gold outline) */}
          {/* Left / Back Wing Feathers */}
          <path
            d="M112 70 C125 78 135 92 140 108 C132 100 122 88 112 70 Z"
            fill="#FFFFFF"
            stroke="#1B4D3E"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M122 60 C136 72 146 88 150 106 C142 95 133 80 122 60 Z"
            fill="#FFFFFF"
            stroke="#1B4D3E"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M136 50 C148 68 156 88 158 110 C151 96 144 78 136 50 Z"
            fill="#FFFFFF"
            stroke="#1B4D3E"
            strokeWidth="2"
            strokeLinejoin="round"
          />

          {/* Main Dove Body, Head & Front Wing */}
          <path
            d="M178 88 
               C174 84 167 80 160 80 
               C155 78 148 72 142 58
               C145 76 142 94 135 108
               C126 112 118 118 114 126
               C122 126 130 122 136 118
               C126 126 122 134 120 144
               C128 140 134 132 140 124
               C132 136 134 148 142 152
               C148 148 154 138 156 128
               C160 134 168 134 172 128
               C178 120 182 108 180 98
               C180 94 180 90 178 88 Z"
            fill="#FFFFFF"
            stroke="#1B4D3E"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          {/* Eye */}
          <circle cx="172" cy="85" r="2" fill="#1B4D3E" />
        </g>

        {/* THREE COMMUNITY FIGURES IN THE CENTER */}
        <g id="community-figures">
          {/* Left Person (Gold) */}
          <circle cx="106" cy="125" r="9" fill="url(#goldPeopleGrad)" />
          <path
            d="M100 137 C108 137 122 146 132 165 C122 160 110 152 100 137 Z"
            fill="url(#goldPeopleGrad)"
          />

          {/* Right Person (Gold) */}
          <circle cx="194" cy="125" r="9" fill="url(#goldPeopleGrad)" />
          <path
            d="M200 137 C192 137 178 146 168 165 C178 160 190 152 200 137 Z"
            fill="url(#goldPeopleGrad)"
          />

          {/* Center Person (Forest Green) - Triumphant Raised Arms */}
          <circle cx="150" cy="132" r="11" fill="url(#greenHandsGrad)" />
          <path
            d="M150 146 
               C136 142 120 134 116 130
               C122 142 134 160 145 178
               L155 178
               C166 160 178 142 184 130
               C180 134 164 142 150 146 Z"
            fill="url(#greenHandsGrad)"
          />
        </g>

        {/* TWO NURTURING HANDS CRADLING THE BASE */}
        <g id="cradling-hands">
          {/* Left Hand */}
          <path
            d="M80 128 
               C82 145 92 168 110 184
               C126 198 142 202 150 203
               C138 202 118 194 100 178
               C86 164 78 146 76 130
               C76 128 78 127 80 128 Z"
            fill="url(#greenHandsGrad)"
          />
          <path
            d="M78 130
               C84 154 100 178 124 192
               C136 198 148 202 150 202
               C132 201 110 191 92 172
               C76 154 70 134 78 130 Z"
            fill="url(#greenHandsGrad)"
          />
          {/* Main Left Palm & Fingers Curve */}
          <path
            d="M78 130 
               C86 165 110 195 150 203
               C112 195 86 165 78 130 Z"
            fill="#1B4D3E"
          />

          {/* Right Hand */}
          <path
            d="M220 128 
               C218 145 208 168 190 184
               C174 198 158 202 150 203
               C162 202 182 194 200 178
               C214 164 222 146 224 130
               C224 128 222 127 220 128 Z"
            fill="url(#greenHandsGrad)"
          />
          <path
            d="M222 130
               C216 154 200 178 176 192
               C164 198 152 202 150 202
               C168 201 190 191 208 172
               C224 154 230 134 222 130 Z"
            fill="url(#greenHandsGrad)"
          />
          {/* Main Right Palm & Fingers Curve */}
          <path
            d="M222 130 
               C214 165 190 195 150 203
               C188 195 214 165 222 130 Z"
            fill="#1B4D3E"
          />
        </g>
      </svg>

      {/* Optional Full Typography Lockup below the circle */}
      {showText && (
        <div className="mt-3 text-center space-y-1">
          {/* Sarooj Sattar Header */}
          <h2 className="font-brand-crest font-extrabold text-[#1B4D3E] text-lg sm:text-2xl tracking-[0.2em] uppercase leading-none">
            SAROOJ SATTAR
          </h2>

          {/* Flanked Community Forum */}
          <div className="flex items-center justify-center gap-2 pt-0.5">
            <span className="h-[1px] w-6 sm:w-10 bg-[#B38B37]/80" />
            <span className="font-brand-crest text-[#B38B37] text-[11px] sm:text-xs font-bold tracking-[0.25em] uppercase">
              COMMUNITY FORUM
            </span>
            <span className="h-[1px] w-6 sm:w-10 bg-[#B38B37]/80" />
          </div>

          {/* Slogan */}
          <p className="text-[9px] sm:text-[10px] text-[#1B4D3E] font-bold tracking-[0.18em] uppercase pt-0.5">
            • TOGETHER FOR A BETTER TOMORROW •
          </p>

          {/* Botanical 3-Leaf Flourish */}
          {showFlourish && (
            <div className="flex items-center justify-center gap-1.5 pt-1 text-[#1B4D3E]">
              <span className="h-[1px] w-8 bg-[#1B4D3E]/30" />
              <svg className="w-5 h-4 text-[#1B4D3E]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C10 6 6 9 2 10C6 11 10 14 12 18C14 14 18 11 22 10C18 9 14 6 12 2Z" />
              </svg>
              <span className="h-[1px] w-8 bg-[#1B4D3E]/30" />
            </div>
          )}
        </div>
      )}
    </div>
  );
};
