import React, { useState } from 'react';
import { 
  X, 
  Megaphone, 
  AlertCircle, 
  Calendar, 
  Tag, 
  Share2, 
  Download,
  BellRing,
  Sparkles
} from 'lucide-react';
import type { Announcement } from '../types.js';

interface AnnouncementsModalProps {
  isOpen: boolean;
  onClose: () => void;
  announcements: Announcement[];
}

export const AnnouncementsModal: React.FC<AnnouncementsModalProps> = ({
  isOpen,
  onClose,
  announcements,
}) => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  if (!isOpen) return null;

  const categories = ['all', 'Urgent Notice', 'Health & Sanitation', 'Municipal Council', 'Community Welfare'];

  const filtered = announcements.filter((a) => {
    if (selectedCategory !== 'all' && a.category !== selectedCategory) return false;
    return true;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden my-8 max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-900 via-purple-800 to-indigo-950 text-white p-6 sm:p-7 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-purple-700/80 border border-purple-400/40 text-purple-200 flex items-center justify-center shadow-md">
              <Megaphone className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-heading font-extrabold text-xl sm:text-2xl text-white tracking-tight">
                Official Announcements & Notices
              </h2>
              <p className="text-xs text-purple-200 font-medium">
                Public Gazettes, Townhall Schedules & Municipal Council Alerts
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-purple-200 hover:text-white hover:bg-purple-800/80 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Category Tabs */}
        <div className="p-4 bg-stone-50 border-b border-stone-200 flex flex-wrap gap-2 shrink-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold capitalize transition-all ${
                selectedCategory === cat
                  ? 'bg-purple-700 text-white shadow-xs'
                  : 'bg-white text-stone-700 hover:bg-stone-200 border border-stone-200'
              }`}
            >
              {cat === 'all' ? 'All Notices' : cat}
            </button>
          ))}
        </div>

        {/* Notices List */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-4">
          {filtered.map((a) => (
            <div
              key={a.id}
              className={`p-6 rounded-2xl border transition-all ${
                a.isUrgent
                  ? 'bg-amber-50/60 border-amber-300 shadow-xs'
                  : 'bg-white border-stone-200 hover:shadow-md'
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-purple-100 text-purple-800">
                    {a.category}
                  </span>
                  {a.isUrgent && (
                    <span className="text-[11px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md bg-red-600 text-white flex items-center gap-1 animate-pulse">
                      <AlertCircle className="w-3 h-3" />
                      <span>Urgent Action</span>
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1.5 text-xs text-stone-400 font-medium">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{new Date(a.date).toLocaleDateString(undefined, { dateStyle: 'long' })}</span>
                </div>
              </div>

              <h3 className="font-heading font-extrabold text-stone-900 text-lg sm:text-xl mb-2">
                {a.title}
              </h3>

              <p className="text-stone-700 text-xs sm:text-sm leading-relaxed mb-4">
                {a.content}
              </p>

              <div className="flex items-center justify-between pt-3 border-t border-stone-200/80 text-xs">
                <span className="text-stone-500 font-semibold">
                  Issued by: {a.author}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      if (navigator.share) {
                        navigator.share({ title: a.title, text: a.content });
                      } else {
                        navigator.clipboard.writeText(`${a.title}\n\n${a.content}`);
                        alert('Notice copied to clipboard!');
                      }
                    }}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold transition-colors"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>Share</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
