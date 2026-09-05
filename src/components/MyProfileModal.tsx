import React, { useState, useEffect } from 'react';
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
  Edit2,
  LogOut,
  Smartphone,
  Lock,
  KeyRound
} from 'lucide-react';
import type { Complaint, AuthUser } from '../types.js';

interface MyProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  complaints: Complaint[];
  onSelectComplaint: (code: string) => void;
  currentUser: AuthUser | null;
  onLogout: () => void;
  onOpenLogin: () => void;
  onOpenAdminSecurity?: () => void;
}

export const MyProfileModal: React.FC<MyProfileModalProps> = ({
  isOpen,
  onClose,
  complaints,
  onSelectComplaint,
  currentUser,
  onLogout,
  onOpenLogin,
  onOpenAdminSecurity,
}) => {
  if (!isOpen) return null;

  const isCitizen = currentUser?.role === 'citizen';
  const isAdmin = currentUser?.role === 'admin';

  // Filter complaints belonging to this citizen (by phone) or all if admin
  const userComplaints = isCitizen
    ? complaints.filter((c) => c.citizenPhone === currentUser.phone)
    : complaints;

  const resolvedCount = userComplaints.filter((c) => c.status === 'resolved').length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-xs overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden my-8 max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className={`p-6 sm:p-7 flex items-center justify-between shrink-0 text-white ${
          isAdmin 
            ? 'bg-gradient-to-r from-emerald-950 via-stone-900 to-emerald-900'
            : 'bg-gradient-to-r from-emerald-900 via-emerald-800 to-teal-900'
        }`}>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-400 text-stone-950 flex items-center justify-center shadow-md font-bold">
              {isAdmin ? <ShieldCheck className="w-7 h-7" /> : <User className="w-6 h-6" />}
            </div>
            <div>
              <h2 className="font-heading font-extrabold text-xl sm:text-2xl text-white tracking-tight">
                {isAdmin ? 'Administrator Profile' : 'Citizen Account & Activity'}
              </h2>
              <p className="text-xs text-amber-200/90 font-medium">
                {isAdmin ? 'Negombo Municipal Council Administration' : 'Negombo Municipal Citizen Portal'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {currentUser && (
              <button
                onClick={onLogout}
                className="px-3 py-1.5 rounded-xl bg-red-900/80 hover:bg-red-800 text-red-100 text-xs font-bold flex items-center gap-1.5 border border-red-700 transition-colors"
                title="Log out"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Log Out</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-full text-stone-300 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">

          {/* If NOT logged in, prompt to log in */}
          {!currentUser ? (
            <div className="p-6 rounded-2xl bg-amber-50/80 border border-amber-200 text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-200 text-amber-900 mx-auto flex items-center justify-center">
                <Smartphone className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-stone-900 text-base">
                Sign in to view your Citizen Activity
              </h3>
              <p className="text-xs text-stone-600 max-w-md mx-auto leading-relaxed">
                Log in using your mobile phone number with instant SMS OTP verification to automatically view your reported issues, real-time resolution updates, and official council feedback.
              </p>
              <button
                onClick={() => {
                  onClose();
                  onOpenLogin();
                }}
                className="px-5 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs shadow-sm transition-transform hover:scale-105"
              >
                Log In with Mobile Phone OTP
              </button>
            </div>
          ) : (
            <>
              {/* Profile Card */}
              <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-xl font-extrabold shadow-sm ${
                    isAdmin ? 'bg-amber-400 text-stone-950' : 'bg-emerald-800 text-white'
                  }`}>
                    {currentUser.name.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-heading font-extrabold text-stone-900 text-lg">
                        {currentUser.name}
                      </h3>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                        isAdmin ? 'bg-stone-900 text-amber-300' : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        {currentUser.role}
                      </span>
                    </div>

                    {isCitizen && (
                      <>
                        <p className="text-xs text-stone-500 flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                          <span>{currentUser.ward}</span>
                        </p>
                        <p className="text-xs text-stone-600 font-mono flex items-center gap-1 mt-0.5">
                          <Phone className="w-3.5 h-3.5 text-stone-400" />
                          <span>{currentUser.phone}</span>
                        </p>
                      </>
                    )}

                    {isAdmin && (
                      <p className="text-xs text-emerald-800 font-bold mt-0.5">
                        {currentUser.title}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                    <span>{isAdmin ? 'Admin Credentials Verified' : 'OTP Verified Mobile'}</span>
                  </span>
                </div>
              </div>

              {/* Quick Stats Grid */}
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="p-4 rounded-xl bg-blue-50 border border-blue-200">
                  <span className="text-2xl font-black text-blue-900 block font-mono">
                    {userComplaints.length}
                  </span>
                  <span className="text-xs font-bold text-blue-800">
                    {isAdmin ? 'Total Council Grievances' : 'Grievances Lodged'}
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200">
                  <span className="text-2xl font-black text-emerald-900 block font-mono">
                    {resolvedCount}
                  </span>
                  <span className="text-xs font-bold text-emerald-800">Resolved by Council</span>
                </div>

                <div className="p-4 rounded-xl bg-amber-50 border border-amber-200">
                  <span className="text-2xl font-black text-amber-900 block font-mono">
                    {isAdmin ? 'Council Official' : 'Level 1 Active'}
                  </span>
                  <span className="text-xs font-bold text-amber-800">
                    {isAdmin ? 'Jurisdiction' : 'Civic Contributor'}
                  </span>
                </div>
              </div>

              {/* Admin Security & Password Change Action */}
              {isAdmin && onOpenAdminSecurity && (
                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-amber-400 text-stone-950 flex items-center justify-center font-bold shrink-0">
                      <KeyRound className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-stone-900">Administrator Security & Password</h4>
                      <p className="text-[11px] text-stone-600 mt-0.5">
                        You can update your master login password at any time.
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      onClose();
                      onOpenAdminSecurity();
                    }}
                    className="px-3.5 py-1.5 rounded-xl bg-stone-900 hover:bg-black text-amber-300 text-xs font-bold shadow-xs transition-colors flex items-center gap-1.5 self-end sm:self-auto shrink-0"
                  >
                    <KeyRound className="w-3.5 h-3.5" />
                    <span>Change Password</span>
                  </button>
                </div>
              )}

              {/* Grievances Log */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-stone-700 uppercase tracking-wider">
                    {isAdmin ? 'Recent Negombo Grievance Tickets' : 'My Reported Issues'}
                  </h4>
                  <span className="text-xs text-stone-400">Click any ticket to track</span>
                </div>

                {userComplaints.length === 0 ? (
                  <div className="p-6 text-center bg-stone-50 rounded-2xl border border-stone-200 text-xs text-stone-500">
                    No grievances recorded for this phone number yet.
                  </div>
                ) : (
                  <div className="space-y-2">
                    {userComplaints.slice(0, 5).map((c) => (
                      <button
                        key={c.id}
                        onClick={() => {
                          onClose();
                          onSelectComplaint(c.refCode);
                        }}
                        className="w-full text-left p-3.5 rounded-xl border border-stone-200 hover:border-emerald-500 hover:shadow-xs transition-all flex items-center justify-between bg-white group cursor-pointer"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs font-bold text-stone-900 bg-stone-100 px-2 py-0.5 rounded">
                              {c.refCode}
                            </span>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                              c.status === 'resolved'
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-amber-100 text-amber-800'
                            }`}>
                              {c.status.replace('_', ' ')}
                            </span>
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
                )}
              </div>
            </>
          )}

        </div>

      </div>
    </div>
  );
};
