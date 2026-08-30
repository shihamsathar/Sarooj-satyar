import React from 'react';
import { 
  X, 
  PhoneCall, 
  ShieldAlert, 
  HeartPulse, 
  Flame, 
  Zap, 
  Droplets, 
  Building2, 
  Copy, 
  Check, 
  ExternalLink 
} from 'lucide-react';

interface EmergencyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EmergencyModal: React.FC<EmergencyModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [copiedNumber, setCopiedNumber] = React.useState<string | null>(null);

  if (!isOpen) return null;

  const contacts = [
    {
      name: 'Suwa Seriya National Ambulance',
      number: '1990',
      description: 'Free 24/7 emergency medical & pre-hospital ambulance response.',
      category: 'Medical',
      icon: HeartPulse,
      color: 'bg-red-600 text-white',
      badge: 'Toll Free • 24/7',
    },
    {
      name: 'Negombo Police Station & Emergency 119',
      number: '0312222222',
      displayNumber: '119 / 031-2222222',
      description: 'Negombo HQ Police Station on Sea Street for law & order.',
      category: 'Police & Security',
      icon: ShieldAlert,
      color: 'bg-blue-700 text-white',
      badge: '24/7 Police Desk',
    },
    {
      name: 'Negombo District General Hospital',
      number: '0312222261',
      displayNumber: '031-2222261',
      description: 'District General Hospital Colombo Road, Negombo.',
      category: 'Hospital & Casualty',
      icon: HeartPulse,
      color: 'bg-emerald-700 text-white',
      badge: 'Casualty Unit',
    },
    {
      name: 'Negombo Municipal Council Fire & Rescue',
      number: '0312222225',
      displayNumber: '031-2222225',
      description: 'Municipal Council Fire Brigade, Greens Road, Negombo.',
      category: 'Fire & Rescue',
      icon: Flame,
      color: 'bg-orange-600 text-white',
      badge: 'Emergency Response',
    },
    {
      name: 'Councillor Sarooj Sattar (Direct Emergency)',
      number: '0702475248',
      displayNumber: '0702475248 / 0768787382',
      description: 'Direct citizen assistance line for urgent relief & council intervention.',
      category: 'Civic Hotline',
      icon: PhoneCall,
      color: 'bg-amber-600 text-white',
      badge: 'Councillor Cell',
    },
    {
      name: 'Ceylon Electricity Board (CEB Hotline)',
      number: '1987',
      displayNumber: '1987 / 031-2222255',
      description: 'Power outages, fallen power lines, and electrical emergencies.',
      category: 'Electricity',
      icon: Zap,
      color: 'bg-yellow-600 text-white',
      badge: 'CEB Emergency',
    },
    {
      name: 'National Water Supply & Drainage Board',
      number: '1939',
      displayNumber: '1939 / 031-2222444',
      description: 'Water pipe bursts, sewage overflow, and urgent supply issues.',
      category: 'Water Board',
      icon: Droplets,
      color: 'bg-cyan-600 text-white',
      badge: 'NWSDB 24/7',
    },
    {
      name: 'Disaster Management Centre (DMC)',
      number: '117',
      displayNumber: '117',
      description: 'Flood alerts, sea surges, storm warnings and disaster relief.',
      category: 'Disaster Relief',
      icon: Building2,
      color: 'bg-stone-700 text-white',
      badge: 'National Hotline',
    },
  ];

  const handleCopy = (num: string) => {
    navigator.clipboard.writeText(num);
    setCopiedNumber(num);
    setTimeout(() => setCopiedNumber(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden my-8 max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-red-800 via-red-700 to-rose-950 text-white p-6 sm:p-7 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-red-900/80 border border-red-400/40 text-red-200 flex items-center justify-center shadow-md animate-pulse">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-heading font-extrabold text-xl sm:text-2xl text-white tracking-tight">
                Emergency Hotlines & Helplines
              </h2>
              <p className="text-xs text-red-200 font-medium">
                Immediate 24/7 Assistance Numbers for Negombo Citizens
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-red-200 hover:text-white hover:bg-red-800/80 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Directory Grid */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {contacts.map((c) => {
              const Icon = c.icon;
              return (
                <div
                  key={c.name}
                  className="p-5 rounded-2xl border border-stone-200 bg-white hover:border-red-300 hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className={`w-10 h-10 rounded-xl ${c.color} flex items-center justify-center shadow-xs`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-700">
                        {c.badge}
                      </span>
                    </div>

                    <h3 className="font-heading font-bold text-stone-900 text-base">
                      {c.name}
                    </h3>

                    <p className="text-xs text-stone-500 leading-relaxed font-normal">
                      {c.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between">
                    <a
                      href={`tel:${c.number}`}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-xs transition-colors"
                    >
                      <PhoneCall className="w-3.5 h-3.5" />
                      <span>Call {c.displayNumber || c.number}</span>
                    </a>

                    <button
                      onClick={() => handleCopy(c.displayNumber || c.number)}
                      className="p-2 rounded-lg text-stone-500 hover:text-stone-800 hover:bg-stone-100 transition-colors"
                      title="Copy Number"
                    >
                      {copiedNumber === (c.displayNumber || c.number) ? (
                        <Check className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};
