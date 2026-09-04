import React, { useState } from 'react';
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
  Quote,
  Camera,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { RoundLogo } from './RoundLogo.js';
import { CAMPAIGN_IMAGES } from '../assets/campaignMedia.js';

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
  const [activeTab, setActiveTab] = useState<'bio' | 'gallery' | 'priorities'>('bio');

  if (!isOpen) return null;

  const leadershipMoments = [
    {
      title: 'Listening to Ward 5 Residents on St. Lazarus Road',
      date: 'Field Inspection 2024',
      badgeColor: 'from-amber-600 to-orange-700',
      image: CAMPAIGN_IMAGES.portrait,
      description: 'Councillor Sarooj Sattar conducting regular weekly grassroots hearings to address resident concerns directly.',
    },
    {
      title: 'Municipal Public Works & Stormwater Drain Review',
      date: 'Engineering Site Visit',
      badgeColor: 'from-emerald-700 to-teal-900',
      image: CAMPAIGN_IMAGES.roadProject,
      description: 'Supervising asphalt carpeting and concrete drainage culvert construction to ensure high quality and zero waste.',
    },
    {
      title: 'Free Community Health & Medical Care Drive',
      date: 'Periyamulla Health Clinic',
      badgeColor: 'from-rose-600 to-red-800',
      image: CAMPAIGN_IMAGES.medicalCamp,
      description: 'Organizing free vision checkups, medicine distribution, and pediatric health screening for underprivileged families.',
    },
    {
      title: 'Negombo Dutch Canal & Coastal Cleanliness Initiative',
      date: 'Environmental Campaign',
      badgeColor: 'from-blue-600 to-cyan-800',
      image: CAMPAIGN_IMAGES.ecoCleanup,
      description: 'Mobilizing community volunteers and municipal sanitation units to desilt waterways and safeguard the ecosystem.',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden my-8 max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-stone-900 text-white p-6 sm:p-7 flex items-center justify-between shrink-0 border-b border-emerald-800">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full p-0.5 bg-gradient-to-tr from-amber-400 via-emerald-600 to-emerald-900 flex items-center justify-center shadow-lg">
              <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                <RoundLogo size={52} />
              </div>
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

        {/* Tab Navigation */}
        <div className="bg-stone-100 px-6 py-2 border-b border-stone-200 flex gap-2">
          <button
            onClick={() => setActiveTab('bio')}
            className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'bio'
                ? 'bg-white text-emerald-900 shadow-xs border border-stone-300'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Vision & Leadership
          </button>
          <button
            onClick={() => setActiveTab('gallery')}
            className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'gallery'
                ? 'bg-white text-emerald-900 shadow-xs border border-stone-300'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Camera className="w-3.5 h-3.5" />
            <span>Civic Photo Album</span>
          </button>
          <button
            onClick={() => setActiveTab('priorities')}
            className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'priorities'
                ? 'bg-white text-emerald-900 shadow-xs border border-stone-300'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Secretariat & Contact
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

          {activeTab === 'bio' && (
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
                    <div className="flex items-center gap-2 p-2.5 rounded-xl bg-stone-50 border border-stone-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Drainage & Flood Mitigation</span>
                    </div>
                    <div className="flex items-center gap-2 p-2.5 rounded-xl bg-stone-50 border border-stone-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Free Healthcare & Eye Camps</span>
                    </div>
                    <div className="flex items-center gap-2 p-2.5 rounded-xl bg-stone-50 border border-stone-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Youth Employment & Sports</span>
                    </div>
                    <div className="flex items-center gap-2 p-2.5 rounded-xl bg-stone-50 border border-stone-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Solar Street Lighting</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Secretariat Office Details with Official Photo */}
              <div className="md:col-span-5 bg-gradient-to-br from-stone-50 via-emerald-50/30 to-amber-50/40 rounded-2xl p-5 border-2 border-amber-200 space-y-4 shadow-sm">
                
                {/* Councillor Portrait Micro Card */}
                <div className="flex items-center gap-3.5 pb-3 border-b border-stone-200">
                  <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-amber-400 shadow-md shrink-0">
                    <img
                      src={CAMPAIGN_IMAGES.portrait}
                      alt="Councillor Sarooj Sattar"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] font-black text-amber-800 uppercase tracking-widest block">
                      Negombo Municipal Council
                    </span>
                    <h4 className="font-heading font-black text-stone-950 text-base leading-tight">
                      Sarooj Sattar
                    </h4>
                    <span className="text-[11px] font-bold text-emerald-800 block mt-0.5">
                      Ward 05 • Periyamulla
                    </span>
                  </div>
                </div>

                <div className="space-y-2.5 text-xs text-stone-700 font-medium">
                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                    <span>36 - St. Lasarus Road, Periyamulla, Negombo.</span>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <Phone className="w-4 h-4 text-emerald-700 shrink-0" />
                    <span className="font-black text-stone-900">0702475248 / 0768787382</span>
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
                    className="w-full py-3 bg-gradient-to-r from-emerald-800 to-teal-900 hover:from-emerald-900 hover:to-teal-950 text-white rounded-xl text-xs font-black shadow-md transition-all cursor-pointer border border-emerald-700"
                  >
                    Send Direct WhatsApp Message (0702475248)
                  </button>
                </div>
              </div>

            </div>
          )}

          {activeTab === 'gallery' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-heading font-bold text-stone-900 text-lg">
                  Photographic Records of Civic Engagement
                </h3>
                <span className="text-xs text-stone-500 font-medium">Ward 05 Field Archives</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {leadershipMoments.map((m, i) => (
                  <div key={i} className="bg-stone-50 rounded-2xl overflow-hidden border-2 border-stone-200 group hover:border-amber-400 hover:shadow-xl transition-all">
                    <div className="aspect-[16/9] relative overflow-hidden text-white flex flex-col justify-between p-4 group/photo">
                      <img
                        src={m.image}
                        alt={m.title}
                        referrerPolicy="no-referrer"
                        className="absolute inset-0 w-full h-full object-cover object-center filter brightness-95 group-hover/photo:scale-105 transition-transform duration-500"
                      />
                      <div className={`absolute inset-0 bg-gradient-to-tr ${m.badgeColor} opacity-50 mix-blend-multiply pointer-events-none`} />
                      <div className="absolute inset-0 bg-gradient-to-t from-stone-950/95 via-stone-950/30 to-black/30 pointer-events-none" />

                      <div className="relative z-10 flex items-center justify-between">
                        <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-xs text-amber-300 inline-block border border-amber-400/40 shadow-xs">
                          {m.date}
                        </span>
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 drop-shadow-xs" />
                      </div>

                      <div className="relative z-10">
                        <h4 className="font-heading font-black text-white text-base leading-snug drop-shadow-md">
                          {m.title}
                        </h4>
                      </div>
                    </div>
                    <div className="p-4 space-y-1.5 bg-white">
                      <p className="text-xs text-stone-700 leading-relaxed font-medium">
                        {m.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'priorities' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-2">
                  <ShieldCheck className="w-6 h-6 text-emerald-700" />
                  <h4 className="font-bold text-emerald-950 text-sm">Zero Corruption Policy</h4>
                  <p className="text-xs text-emerald-900">
                    All council funds, contractor bids, and material distributions are published publicly on this portal.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 space-y-2">
                  <Award className="w-6 h-6 text-amber-700" />
                  <h4 className="font-bold text-amber-950 text-sm">48-Hour Rapid Redress</h4>
                  <p className="text-xs text-amber-900">
                    Every grievance submitted through the portal is reviewed and inspected on site within two working days.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 space-y-2">
                  <HeartHandshake className="w-6 h-6 text-blue-700" />
                  <h4 className="font-bold text-blue-950 text-sm">Community Welfare Fund</h4>
                  <p className="text-xs text-blue-900">
                    Emergency medical, educational, and funeral aid provided for vulnerable families in Negombo.
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-stone-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h4 className="font-heading font-bold text-base text-amber-300">Need a Personal Meeting?</h4>
                  <p className="text-xs text-stone-300 mt-0.5">
                    Visit the Secretariat on St. Lazarus Road, Monday to Saturday (8:00 AM - 7:00 PM).
                  </p>
                </div>
                <button
                  onClick={() => {
                    onClose();
                    onOpenContact();
                  }}
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shrink-0 shadow-md"
                >
                  Schedule Appointment
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
