import React, { useState } from 'react';
import { 
  X, 
  User, 
  MapPin, 
  Phone, 
  Mail, 
  Award, 
  CheckCircle2, 
  FolderKanban, 
  Bell, 
  ShieldCheck,
  Edit2
} from 'lucide-react';
import type { Complaint } from '../types.js';

interface MyProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  complaints: Complaint[];
  onSelectComplaint: (code: string) => void;
}

export const MyProfileModal: React.FC<MyProfileModalProps> = ({
  isOpen,
  onClose,
  complaints,
  onSelectComplaint,
}) => {
  const [name, setName] = useState('Resident Citizen');
  const [ward, setWard] = useState('Periyamulla (Ward 5)');
  const [phone, setPhone] = useState('0771234567');
  const [isEditing, setIsEditing] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden my-8 max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700 text-stone-950 p-6 sm:p-7 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-stone-900 text-amber-300 flex items-center justify-center shadow-md">
              <User className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-heading font-extrabold text-xl sm:text-2xl text-stone-950 tracking-tight">
                Citizen Profile & Activity
              </h2>
              <p className="text-xs text-stone-800 font-medium">
                Negombo Municipal Council Resident Portal
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-stone-900 hover:bg-amber-400/80 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
          
          {/* Profile Card */}
          <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-14 h-14 rounded-2xl bg-emerald-800 text-white flex items-center justify-center text-xl font-extrabold shadow-sm">
                {name.charAt(0)}
              </div>
              <div>
                <h3 className="font-heading font-extrabold text-stone-900 text-lg">
                  {name}
                </h3>
                <p className="text-xs text-stone-500 flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{ward}</span>
                </p>
                <p className="text-xs text-stone-500 flex items-center gap-1 mt-0.5">
                  <Phone className="w-3.5 h-3.5 text-stone-400" />
                  <span>{phone}</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-full bg-emerald-100 text-emerald-800">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Verified Resident</span>
              </span>
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="p-4 rounded-xl bg-blue-50 border border-blue-200">
              <span className="text-2xl font-black text-blue-900 block font-mono">
                {complaints.length}
              </span>
              <span className="text-xs font-bold text-blue-800">Grievances Lodged</span>
            </div>

            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200">
              <span className="text-2xl font-black text-emerald-900 block font-mono">
                {complaints.filter(c => c.status === 'resolved').length}
              </span>
              <span className="text-xs font-bold text-emerald-800">Resolved by Council</span>
            </div>

            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200">
              <span className="text-2xl font-black text-amber-900 block font-mono">
                Level 1
              </span>
              <span className="text-xs font-bold text-amber-800">Civic Contributor</span>
            </div>
          </div>

          {/* Recent Grievances Log */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-stone-700 uppercase tracking-wider">
                My Recent Reports
              </h4>
              <span className="text-xs text-stone-400">Click to track</span>
            </div>

            <div className="space-y-2">
              {complaints.slice(0, 3).map((c) => (
                <button
                  key={c.id}
                  onClick={() => {
                    onClose();
                    onSelectComplaint(c.refCode);
                  }}
                  className="w-full text-left p-3.5 rounded-xl border border-stone-200 hover:border-emerald-500 hover:shadow-xs transition-all flex items-center justify-between bg-white group"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-stone-500">{c.refCode}</span>
                      <span className="text-[10px] font-bold px-2 py-0.2 rounded bg-stone-100 uppercase">{c.status}</span>
                    </div>
                    <p className="text-xs font-bold text-stone-800 group-hover:text-emerald-800 mt-1 line-clamp-1">
                      {c.title}
                    </p>
                  </div>

                  <span className="text-xs font-bold text-emerald-700 group-hover:underline">
                    Track &gt;
                  </span>
                </button>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
