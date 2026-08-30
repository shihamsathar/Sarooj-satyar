import React from 'react';
import { 
  X, 
  Award, 
  HeartHandshake, 
  MapPin, 
  Phone, 
  Mail, 
  Building2, 
  CheckCircle2, 
  Sparkles,
  Quote
} from 'lucide-react';

interface AboutSaroojModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenContact: () => void;
}

export const AboutSaroojModal: React.FC<AboutSaroojModalProps> = ({
  isOpen,
  onClose,
  onOpenContact,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden my-8 max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-stone-900 text-white p-6 sm:p-8 flex items-center justify-between shrink-0 border-b border-emerald-800">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-emerald-800 border border-emerald-600/40 text-amber-300 font-serif-quote font-black text-2xl flex items-center justify-center shadow-lg">
              SS
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px] font-bold uppercase tracking-wider mb-1">
                Ward 05 • Periyamulla, Negombo
              </div>
              <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-white tracking-tight">
                Councillor Sarooj Sattar
              </h2>
              <p className="text-xs sm:text-sm text-emerald-200 font-medium">
                Negombo Municipal Council • Public Servant & Community Advocate
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-emerald-300 hover:text-white hover:bg-emerald-800 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 text-stone-800">
          
          {/* Quote Block */}
          <div className="p-6 bg-gradient-to-r from-amber-50 via-amber-100/50 to-stone-50 rounded-2xl border border-amber-200 shadow-xs relative">
            <Quote className="w-8 h-8 text-amber-500/30 absolute top-4 right-4" />
            <p className="font-serif-quote italic text-lg sm:text-xl text-stone-900 font-semibold leading-relaxed">
              &ldquo;Until my last breath, I will stand with those in need and serve the poor with compassion.&rdquo;
            </p>
            <p className="text-xs font-bold text-amber-900 uppercase tracking-wider mt-2">
              — Councillor Sarooj Sattar, Negombo Municipal Council
            </p>
          </div>

          {/* Biography & Mission */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            
            <div className="md:col-span-7 space-y-4 text-sm leading-relaxed text-stone-700">
              <h3 className="font-heading font-bold text-stone-950 text-xl">
                Dedicated Grassroots Leadership in Negombo
              </h3>
              
              <p>
                Councillor <b>Sarooj Sattar</b> represents the vibrant citizens of Ward 05 (Periyamulla) and the broader Negombo municipality. With decades of hands-on community engagement, Sarooj has championed transparent municipal governance, flood prevention infrastructure, and direct civic grievance redressal.
              </p>

              <p>
                The <b>Sarooj Sattar Community Forum</b> was founded to bridge the gap between residents and municipal authorities, ensuring that every road defect, drainage block, sanitation need, or welfare emergency receives prompt action without bureaucratic delays.
              </p>

              <div className="pt-2 space-y-2">
                <h4 className="font-heading font-bold text-stone-900 text-sm uppercase tracking-wider">
                  Core Civic Pillars
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-medium">
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-stone-50 border border-stone-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Drainage & Flood Mitigation</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-stone-50 border border-stone-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Free Healthcare & Eye Camps</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-stone-50 border border-stone-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Youth Employment & Sports</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-stone-50 border border-stone-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Solar Street Lighting</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Secretariat Office Details */}
            <div className="md:col-span-5 bg-stone-50 rounded-2xl p-6 border border-stone-200 space-y-4">
              <h4 className="font-heading font-extrabold text-stone-900 text-base flex items-center gap-2">
                <Building2 className="w-4 h-4 text-emerald-800" />
                <span>Field Office & Secretariat</span>
              </h4>

              <div className="space-y-3 text-xs text-stone-700">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                  <span>36 - St. Lasarus Road, Periyamulla, Negombo.</span>
                </div>

                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span className="font-bold text-stone-900">0702475248 / 0768787382</span>
                </div>

                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>saroojsattar@gmail.com</span>
                </div>
              </div>

              <div className="pt-2 border-t border-stone-200">
                <button
                  onClick={() => {
                    onClose();
                    onOpenContact();
                  }}
                  className="w-full py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-bold shadow-xs transition-colors"
                >
                  Send Direct WhatsApp / Message
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
