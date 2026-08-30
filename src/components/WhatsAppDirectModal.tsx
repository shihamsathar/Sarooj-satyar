import React, { useState } from 'react';
import { 
  X, 
  PhoneCall, 
  Send, 
  Clock, 
  MapPin, 
  Sparkles, 
  CheckCircle2,
  Building2 
} from 'lucide-react';

interface WhatsAppDirectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WhatsAppDirectModal: React.FC<WhatsAppDirectModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [customMsg, setCustomMsg] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('Urgent Drainage / Road Issue');

  if (!isOpen) return null;

  const templates = [
    {
      title: 'Urgent Drainage / Road Issue',
      text: 'Hello Councillor Sarooj Sattar, I would like to report an urgent road/drainage issue in Ward 5, Negombo.',
    },
    {
      title: 'Request Meeting / Appointment',
      text: 'Dear Councillor Sarooj Sattar, I would like to request a brief meeting at your Periyamulla field office regarding a community matter.',
    },
    {
      title: 'Emergency Relief / Medical Need',
      text: 'Urgent: Councillor Sarooj Sattar, we require immediate civic/welfare assistance for a family in need in Negombo.',
    },
    {
      title: 'Feedback / Community Project Proposal',
      text: 'Hello Councillor Sarooj Sattar, I have a suggestion to improve public infrastructure in our neighborhood.',
    },
  ];

  const handleLaunchWhatsApp = () => {
    const textToSend = customMsg.trim() || templates.find(t => t.title === selectedTemplate)?.text || 'Hello Councillor Sarooj Sattar';
    const encoded = encodeURIComponent(textToSend);
    window.open(`https://wa.me/94702475248?text=${encoded}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden my-8">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-green-800 via-green-700 to-emerald-950 text-white p-6 sm:p-7 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-green-900/80 border border-green-400/40 text-white flex items-center justify-center shadow-md">
              <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24">
                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.007c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.861.173.086.275.072.376-.044.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.099.824zm-3.423-14.416c-6.627 0-12 5.373-12 12 0 2.159.57 4.187 1.564 5.946l-1.564 5.828 6.012-1.547c1.68.918 3.597 1.439 5.628 1.439 6.627 0 12-5.373 12-12 0-6.627-5.373-12-12-12z"/>
              </svg>
            </div>
            <div>
              <h2 className="font-heading font-extrabold text-xl sm:text-2xl text-white tracking-tight">
                Connect on WhatsApp
              </h2>
              <p className="text-xs text-green-200 font-medium">
                Direct Line: 0702475248 • Councillor Sarooj Sattar
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-green-200 hover:text-white hover:bg-green-800/80 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-5">
          
          {/* Official Councillor Verified Card */}
          <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-emerald-800 text-amber-300 font-serif-quote font-bold text-lg flex items-center justify-center shrink-0">
              SS
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-heading font-bold text-stone-900 text-sm">
                  Councillor Sarooj Sattar
                </span>
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              </div>
              <p className="text-xs text-stone-500">
                Negombo Municipal Council • Ward 05
              </p>
              <p className="text-[11px] text-emerald-800 font-semibold mt-0.5">
                Replies within hours for citizen inquiries & grievances
              </p>
            </div>
          </div>

          {/* Quick Pre-Set Messages */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider">
              Select Message Topic
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {templates.map((t) => (
                <button
                  key={t.title}
                  type="button"
                  onClick={() => {
                    setSelectedTemplate(t.title);
                    setCustomMsg(t.text);
                  }}
                  className={`p-3 text-left rounded-xl border text-xs font-semibold transition-all ${
                    selectedTemplate === t.title
                      ? 'bg-green-50 border-green-600 text-green-950 shadow-xs'
                      : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
                  }`}
                >
                  {t.title}
                </button>
              ))}
            </div>
          </div>

          {/* Message Text Area */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider">
              Message Preview
            </label>
            <textarea
              rows={3}
              value={customMsg || templates.find(t => t.title === selectedTemplate)?.text}
              onChange={(e) => setCustomMsg(e.target.value)}
              className="w-full p-3.5 rounded-xl border border-stone-300 bg-white text-xs text-stone-800 font-medium focus:ring-2 focus:ring-green-600 focus:outline-hidden"
            />
          </div>

          {/* Launch Button */}
          <button
            onClick={handleLaunchWhatsApp}
            className="w-full py-4 bg-gradient-to-r from-green-600 via-green-500 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-extrabold text-base rounded-2xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 active:scale-98"
          >
            <Send className="w-5 h-5" />
            <span>Open WhatsApp & Send Directly (0702475248)</span>
          </button>

          <p className="text-center text-[11px] text-stone-400 font-medium">
            Standard WhatsApp application will open on your phone or desktop.
          </p>

        </div>

      </div>
    </div>
  );
};
