import React, { useState } from 'react';
import { Mail, CheckCircle2, Loader2, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import type { Language } from '../utils/translations.js';
import { translations } from '../utils/translations.js';

interface NewsletterSubscribeProps {
  language?: Language;
}

export const NewsletterSubscribe: React.FC<NewsletterSubscribeProps> = ({ language = 'en' }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const t = translations[language];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      setError(language === 'ta' ? 'தயவுசெய்து உங்கள் பெயர் மற்றும் மின்னஞ்சலை உள்ளிடவும்.' : (language === 'si' ? 'කරුණාකර ඔබගේ නම සහ ඊමේල් ලිපිනය ඇතුළත් කරන්න.' : 'Please provide both your name and email address.'));
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email }),
      });
      const data = await res.json();
      if (data.success) {
        setSubscribed(true);
        try {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.8 },
          });
        } catch (_) {}
      } else {
        setError(data.error || 'Failed to subscribe. Please try again.');
      }
    } catch (err: any) {
      setError('Connection error. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-10 bg-gradient-to-r from-emerald-950 via-emerald-900 to-teal-950 text-white border-y border-emerald-800 relative overflow-hidden">
      
      {/* Subtle background glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-700/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          
          {/* Left Column: Heading & Mail Icon */}
          <div className="lg:col-span-5 flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white text-emerald-950 flex items-center justify-center shadow-lg shrink-0">
              <Mail className="w-7 h-7" />
            </div>
            <div>
              <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-white tracking-tight leading-tight">
                {t.stayConnectedTitle}
              </h3>
              <p className="text-emerald-200 text-xs sm:text-sm font-normal mt-1 leading-snug">
                {t.stayConnectedSubtitle}
              </p>
            </div>
          </div>

          {/* Right Column: Form Inputs & Subscribe Button */}
          <div className="lg:col-span-7">
            {subscribed ? (
              <div className="bg-emerald-800/80 border border-emerald-600 rounded-xl p-4 flex items-center gap-3 text-emerald-100">
                <CheckCircle2 className="w-6 h-6 text-amber-400 shrink-0" />
                <div>
                  <p className="font-bold text-sm text-white">{t.subscribeSuccessTitle} {name}!</p>
                  <p className="text-xs text-emerald-200">
                    {t.subscribeSuccessDesc}
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-2">
                <div className="flex flex-col sm:flex-row items-stretch gap-2.5">
                  
                  {/* Name Input */}
                  <input
                    type="text"
                    required
                    placeholder={t.subscribeNamePlaceholder}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full sm:w-5/12 px-4 py-3 rounded-xl bg-white text-stone-900 placeholder:text-stone-400 text-sm font-medium focus:outline-hidden focus:ring-2 focus:ring-amber-400 border border-emerald-700/50 shadow-inner"
                  />

                  {/* Email Input */}
                  <input
                    type="email"
                    required
                    placeholder={t.subscribeEmailPlaceholder}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full sm:w-5/12 px-4 py-3 rounded-xl bg-white text-stone-900 placeholder:text-stone-400 text-sm font-medium focus:outline-hidden focus:ring-2 focus:ring-amber-400 border border-emerald-700/50 shadow-inner"
                  />

                  {/* Subscribe CTA Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full sm:w-auto sm:px-7 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-600 hover:to-amber-500 text-stone-950 text-sm font-extrabold shadow-md hover:shadow-lg transition-all active:scale-95 disabled:opacity-70 flex items-center justify-center gap-1.5 shrink-0 cursor-pointer"
                  >
                    {loading ? (
                      <Loader2 className="w-4 h-4 animate-spin text-stone-900" />
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 text-stone-900" />
                        <span>{t.subscribeBtn}</span>
                      </>
                    )}
                  </button>

                </div>

                {error && (
                  <p className="text-red-300 text-xs font-semibold">{error}</p>
                )}
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
