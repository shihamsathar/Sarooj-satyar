import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  ShieldCheck, 
  Phone, 
  Lock, 
  User, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  Eye, 
  EyeOff, 
  RefreshCw,
  Smartphone,
  KeyRound,
  Building2
} from 'lucide-react';
import type { AuthUser, AdminUser, CitizenUser } from '../types.js';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: AuthUser) => void;
  initialTab?: 'citizen' | 'admin';
  loggedOutNotice?: string | null;
  onClearNotice?: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  initialTab = 'citizen',
  loggedOutNotice,
  onClearNotice,
}) => {
  const [activeTab, setActiveTab] = useState<'citizen' | 'admin'>(initialTab);

  // Admin Login State
  const [adminUsername, setAdminUsername] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [adminLoading, setAdminLoading] = useState(false);
  const [adminError, setAdminError] = useState<string | null>(null);

  // Citizen (People) Mobile OTP State
  const [phone, setPhone] = useState('');
  const [citizenName, setCitizenName] = useState('');
  const [citizenWard, setCitizenWard] = useState('Periyamulla (Ward 5)');
  const [otpStep, setOtpStep] = useState<'phone' | 'otp'>('phone');
  const [otpCode, setOtpCode] = useState(['', '', '', '', '', '']);
  const [simulatedIncomingOtp, setSimulatedIncomingOtp] = useState<string | null>(null);
  const [otpLoading, setOtpLoading] = useState(false);
  const [otpError, setOtpError] = useState<string | null>(null);
  const [resendTimer, setResendTimer] = useState(0);

  // OTP inputs ref
  const otpInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab, isOpen]);

  // Resend Countdown Timer
  useEffect(() => {
    let interval: any = null;
    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [resendTimer]);

  if (!isOpen) return null;

  // Handle Admin Login Submission
  const handleAdminSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAdminError(null);
    setAdminLoading(true);

    try {
      const res = await fetch('/api/auth/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: adminUsername,
          password: adminPassword,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to authenticate Admin credentials.');
      }

      const adminUser: AdminUser = {
        ...data.user,
        token: data.token,
      };

      onLoginSuccess(adminUser);
      onClose();
    } catch (err: any) {
      setAdminError(err.message || 'Login failed. Please verify credentials.');
    } finally {
      setAdminLoading(false);
    }
  };

  // People Step 1: Send OTP to Mobile
  const handleSendOtp = async (targetPhone?: string) => {
    const rawPhone = targetPhone || phone;
    if (!rawPhone || rawPhone.trim().length < 8) {
      setOtpError('Please enter a valid mobile number (e.g. 077 123 4567).');
      return;
    }

    setOtpError(null);
    setOtpLoading(true);

    try {
      const res = await fetch('/api/auth/otp/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: rawPhone }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to dispatch verification OTP.');
      }

      setSimulatedIncomingOtp(data.otp);
      setOtpStep('otp');
      setResendTimer(30);
      setOtpCode(['', '', '', '', '', '']);

      // Focus first OTP field
      setTimeout(() => {
        otpInputRefs.current[0]?.focus();
      }, 150);
    } catch (err: any) {
      setOtpError(err.message || 'Error sending OTP.');
    } finally {
      setOtpLoading(false);
    }
  };

  // Handle individual OTP digit change
  const handleOtpDigitChange = (index: number, val: string) => {
    const cleaned = val.replace(/\D/g, '');
    if (!cleaned) {
      const copy = [...otpCode];
      copy[index] = '';
      setOtpCode(copy);
      return;
    }

    // Single digit or pasted string
    if (cleaned.length === 1) {
      const copy = [...otpCode];
      copy[index] = cleaned;
      setOtpCode(copy);
      if (index < 5) {
        otpInputRefs.current[index + 1]?.focus();
      }
    } else if (cleaned.length >= 6) {
      // Pasted full OTP
      const digits = cleaned.slice(0, 6).split('');
      setOtpCode(digits);
      otpInputRefs.current[5]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otpCode[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    }
  };

  // People Step 2: Verify OTP
  const handleVerifyOtp = async (codeToVerify?: string) => {
    const finalCode = codeToVerify || otpCode.join('');
    if (finalCode.length < 6) {
      setOtpError('Please enter all 6 digits of the verification code.');
      return;
    }

    setOtpError(null);
    setOtpLoading(true);

    try {
      const res = await fetch('/api/auth/otp/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone,
          otp: finalCode,
          name: citizenName.trim() || undefined,
          ward: citizenWard.trim() || undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Invalid or expired OTP code.');
      }

      const citizenUser: CitizenUser = {
        ...data.user,
        token: data.token,
      };

      onLoginSuccess(citizenUser);
      onClose();
    } catch (err: any) {
      setOtpError(err.message || 'Failed to verify OTP.');
    } finally {
      setOtpLoading(false);
    }
  };

  // Quick 1-click Auto-fill OTP
  const handleAutoFillSimulatedOtp = () => {
    if (!simulatedIncomingOtp) return;
    const digits = simulatedIncomingOtp.split('');
    setOtpCode(digits);
    handleVerifyOtp(simulatedIncomingOtp);
  };

  // Quick Demo Fill for Admin
  const handleQuickFillAdmin = () => {
    setAdminUsername('admin');
    setAdminPassword('admin123');
    setAdminError(null);
  };

  // Quick Demo Fill for Citizen
  const handleQuickFillCitizen = (testPhone: string, testName: string, ward: string) => {
    setPhone(testPhone);
    setCitizenName(testName);
    setCitizenWard(ward);
    setOtpError(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/65 backdrop-blur-xs overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden my-8 transition-all">
        
        {/* Header with Title and Tabs */}
        <div className="bg-gradient-to-r from-emerald-900 via-emerald-950 to-stone-900 text-white p-6 sm:p-7 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full text-stone-300 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3 mb-4">
            <div className="w-11 h-11 rounded-2xl bg-amber-400 text-stone-950 flex items-center justify-center font-bold shadow-md">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-heading font-extrabold text-xl sm:text-2xl text-white tracking-tight">
                Community Portal Access
              </h2>
              <p className="text-xs text-amber-200/90 font-medium">
                Negombo Municipal Council • Sarooj Sattar Forum
              </p>
            </div>
          </div>

          {/* Tab Selector */}
          <div className="grid grid-cols-2 p-1 bg-white/10 backdrop-blur-md rounded-2xl border border-white/15">
            <button
              onClick={() => {
                setActiveTab('citizen');
                setOtpError(null);
                setAdminError(null);
              }}
              className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all ${
                activeTab === 'citizen'
                  ? 'bg-amber-400 text-stone-950 shadow-md scale-[1.02]'
                  : 'text-stone-200 hover:text-white hover:bg-white/5'
              }`}
            >
              <Smartphone className="w-4 h-4" />
              <span>People (Mobile OTP)</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('admin');
                setOtpError(null);
                setAdminError(null);
              }}
              className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all ${
                activeTab === 'admin'
                  ? 'bg-amber-400 text-stone-950 shadow-md scale-[1.02]'
                  : 'text-stone-200 hover:text-white hover:bg-white/5'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Admin Login</span>
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-7 space-y-5 sm:space-y-6 max-h-[80vh] overflow-y-auto">

          {/* Logged Out Return Banner */}
          {loggedOutNotice && (
            <div className="p-3.5 rounded-2xl bg-amber-50 border-2 border-amber-300/90 text-amber-950 text-xs flex items-center justify-between gap-3 animate-fadeIn shadow-xs">
              <div className="flex items-center gap-2.5">
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse shrink-0" />
                <p className="font-bold leading-snug">
                  {loggedOutNotice}
                </p>
              </div>
              {onClearNotice && (
                <button
                  onClick={onClearNotice}
                  className="text-stone-400 hover:text-stone-700 p-1 rounded-md"
                  aria-label="Dismiss notice"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 1: PEOPLE / CITIZEN LOGIN (MOBILE NUMBER + OTP)        */}
          {/* ========================================================= */}
          {activeTab === 'citizen' && (
            <div className="space-y-5">
              
              {otpStep === 'phone' ? (
                // Step 1: Input Mobile Number
                <div className="space-y-4">
                  <div className="p-3.5 bg-emerald-50/80 rounded-2xl border border-emerald-200/80 text-emerald-950 text-xs flex items-start gap-2.5">
                    <Sparkles className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold">Fast & Passwordless Citizen Sign-in</p>
                      <p className="text-stone-600 mt-0.5 leading-relaxed">
                        Enter your Sri Lankan mobile number to receive a 6-digit OTP instantly. No password required!
                      </p>
                    </div>
                  </div>

                  {otpError && (
                    <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{otpError}</span>
                    </div>
                  )}

                  {/* Phone Input */}
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1.5 uppercase tracking-wider">
                      Mobile Phone Number <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                        <Phone className="w-4 h-4 text-emerald-700" />
                      </div>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="e.g. 077 394 8210 or 071 488 9201"
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-stone-50 border border-stone-300 focus:bg-white focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 text-sm font-medium text-stone-900 placeholder:text-stone-400 transition-all"
                        autoFocus
                      />
                    </div>
                  </div>

                  {/* Optional Name & Ward */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <div>
                      <label className="block text-xs font-semibold text-stone-600 mb-1">
                        Your Name (Optional)
                      </label>
                      <input
                        type="text"
                        value={citizenName}
                        onChange={(e) => setCitizenName(e.target.value)}
                        placeholder="e.g. Mohamed Fazil"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-800 focus:bg-white focus:border-emerald-600 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-stone-600 mb-1">
                        Ward / Neighborhood
                      </label>
                      <select
                        value={citizenWard}
                        onChange={(e) => setCitizenWard(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-800 focus:bg-white focus:border-emerald-600 transition-all"
                      >
                        <option value="Periyamulla (Ward 5)">Periyamulla (Ward 5)</option>
                        <option value="Dalupotha (Ward 6)">Dalupotha (Ward 6)</option>
                        <option value="Katuwapitiya (Ward 9)">Katuwapitiya (Ward 9)</option>
                        <option value="Kurana (Ward 14)">Kurana (Ward 14)</option>
                        <option value="Negombo Town Central">Negombo Town Central</option>
                        <option value="Other Ward">Other Ward</option>
                      </select>
                    </div>
                  </div>

                  {/* Quick Test Numbers Helper */}
                  <div className="pt-2">
                    <p className="text-[11px] font-bold text-stone-500 uppercase tracking-wider mb-2">
                      Quick Demo Citizen Numbers:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => handleQuickFillCitizen('0773948210', 'Mohamed Fazil', 'Periyamulla (Ward 5)')}
                        className="text-xs px-2.5 py-1.5 rounded-lg bg-stone-100 hover:bg-emerald-100 text-stone-700 hover:text-emerald-900 border border-stone-200 transition-colors text-left"
                      >
                        👤 <span className="font-semibold">0773948210</span> (Mohamed Fazil)
                      </button>
                      <button
                        type="button"
                        onClick={() => handleQuickFillCitizen('0714889201', 'Anthony Fernando', 'Periyamulla (Ward 5)')}
                        className="text-xs px-2.5 py-1.5 rounded-lg bg-stone-100 hover:bg-emerald-100 text-stone-700 hover:text-emerald-900 border border-stone-200 transition-colors text-left"
                      >
                        👤 <span className="font-semibold">0714889201</span> (Anthony F.)
                      </button>
                    </div>
                  </div>

                  {/* Send OTP CTA */}
                  <button
                    type="button"
                    onClick={() => handleSendOtp()}
                    disabled={otpLoading || !phone}
                    className="w-full py-3.5 px-4 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-sm shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 mt-2"
                  >
                    {otpLoading ? (
                      <RefreshCw className="w-4 h-4 animate-spin" />
                    ) : (
                      <>
                        <span>Get Verification OTP</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              ) : (
                // Step 2: Input 6-Digit OTP Code
                <div className="space-y-4 animate-fadeIn">
                  
                  {/* Phone confirmation pill */}
                  <div className="flex items-center justify-between p-3 rounded-xl bg-stone-100 border border-stone-200 text-xs">
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-emerald-700" />
                      <span className="text-stone-600">Sent code to:</span>
                      <strong className="text-stone-900 font-mono text-sm">{phone}</strong>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setOtpStep('phone');
                        setOtpError(null);
                      }}
                      className="text-emerald-800 hover:text-emerald-950 font-bold underline text-[11px]"
                    >
                      Change Number
                    </button>
                  </div>

                  {/* SIMULATED SMS PROMPT BANNER */}
                  {simulatedIncomingOtp && (
                    <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-50 to-amber-100/90 border border-amber-300 text-amber-950 shadow-xs relative overflow-hidden animate-bounce-short">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-2.5">
                          <div className="w-8 h-8 rounded-xl bg-amber-400 text-stone-950 flex items-center justify-center shrink-0 font-black shadow-xs">
                            💬
                          </div>
                          <div>
                            <div className="text-[10px] font-extrabold uppercase tracking-wider text-amber-800">
                              Incoming SMS Dispatch Preview
                            </div>
                            <p className="text-xs text-stone-800 mt-0.5">
                              Your Sarooj Sattar Forum OTP code is{' '}
                              <span className="font-mono font-black text-emerald-900 text-base px-1.5 py-0.5 bg-white rounded-md border border-amber-300">
                                {simulatedIncomingOtp}
                              </span>
                            </p>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={handleAutoFillSimulatedOtp}
                          className="px-3 py-1.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold shadow-xs shrink-0 transition-all hover:scale-105"
                        >
                          Auto-Fill OTP
                        </button>
                      </div>
                    </div>
                  )}

                  {otpError && (
                    <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{otpError}</span>
                    </div>
                  )}

                  {/* 6 Digit Input Boxes */}
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-2 text-center uppercase tracking-wider">
                      Enter 6-Digit Verification Code
                    </label>
                    <div className="flex items-center justify-center gap-1.5 sm:gap-3 max-w-full">
                      {otpCode.map((digit, idx) => (
                        <input
                          key={idx}
                          ref={(el) => { otpInputRefs.current[idx] = el; }}
                          type="text"
                          inputMode="numeric"
                          maxLength={1}
                          value={digit}
                          onChange={(e) => handleOtpDigitChange(idx, e.target.value)}
                          onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                          className="w-9 h-12 sm:w-12 sm:h-14 text-center text-lg sm:text-2xl font-black font-mono rounded-xl bg-stone-50 border-2 border-stone-300 focus:bg-white focus:border-emerald-600 focus:ring-2 focus:ring-emerald-200 outline-hidden transition-all shadow-xs"
                        />
                      ))}
                    </div>
                  </div>

                  {/* Verify Button */}
                  <button
                    type="button"
                    onClick={() => handleVerifyOtp()}
                    disabled={otpLoading || otpCode.join('').length < 6}
                    className="w-full py-3.5 px-4 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-sm shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                  >
                    {otpLoading ? (
                      <RefreshCw className="w-4 h-4 animate-spin" />
                    ) : (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Verify OTP & Log In</span>
                      </>
                    )}
                  </button>

                  {/* Resend OTP Timer */}
                  <div className="text-center pt-2 text-xs text-stone-500">
                    {resendTimer > 0 ? (
                      <span>Resend new OTP in <strong className="text-stone-800">{resendTimer}s</strong></span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleSendOtp()}
                        className="text-emerald-800 hover:text-emerald-950 font-bold underline"
                      >
                        Resend OTP Code
                      </button>
                    )}
                  </div>

                </div>
              )}

            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 2: ADMIN LOGIN (USERNAME & PASSWORD)                   */}
          {/* ========================================================= */}
          {activeTab === 'admin' && (
            <form onSubmit={handleAdminSubmit} className="space-y-4">
              <div className="p-3.5 bg-amber-50 rounded-2xl border border-amber-200 text-stone-900 text-xs flex items-start gap-2.5">
                <KeyRound className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-amber-950">Municipal Council Staff & Councillor Access</p>
                  <p className="text-stone-600 mt-0.5 leading-relaxed">
                    Administrators can update grievance statuses, review citizen messages, publish public announcements, and monitor forum metrics.
                  </p>
                </div>
              </div>

              {adminError && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{adminError}</span>
                </div>
              )}

              {/* Username Field */}
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1.5 uppercase tracking-wider">
                  Admin Username <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                    <User className="w-4 h-4 text-stone-600" />
                  </div>
                  <input
                    type="text"
                    required
                    value={adminUsername}
                    onChange={(e) => setAdminUsername(e.target.value)}
                    placeholder="e.g. admin or sarooj"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-stone-50 border border-stone-300 focus:bg-white focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 text-sm font-medium text-stone-900 placeholder:text-stone-400 transition-all"
                    autoFocus
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1.5 uppercase tracking-wider">
                  Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                    <Lock className="w-4 h-4 text-stone-600" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    placeholder="Enter admin password"
                    className="w-full pl-10 pr-11 py-3 rounded-xl bg-stone-50 border border-stone-300 focus:bg-white focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 text-sm font-medium text-stone-900 placeholder:text-stone-400 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-stone-400 hover:text-stone-700 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Demo Admin Fill Badge */}
              <div className="pt-1 flex items-center justify-between text-xs">
                <button
                  type="button"
                  onClick={handleQuickFillAdmin}
                  className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-lg bg-stone-100 hover:bg-amber-100 text-stone-700 hover:text-stone-900 border border-stone-200 transition-colors"
                >
                  <span>⚡ 1-Click Fill Demo Admin:</span>
                  <span className="font-bold font-mono text-emerald-900">admin / admin123</span>
                </button>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={adminLoading || !adminUsername || !adminPassword}
                className="w-full py-3.5 px-4 rounded-xl bg-stone-900 hover:bg-black text-amber-300 hover:text-amber-200 font-bold text-sm shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 mt-4"
              >
                {adminLoading ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4 text-amber-400" />
                    <span>Log In to Admin Console</span>
                  </>
                )}
              </button>
            </form>
          )}

        </div>

        {/* Modal Footer Info */}
        <div className="p-4 bg-stone-50 border-t border-stone-200 text-center text-stone-500 text-[11px]">
          Official civic grievance & administrative system for Negombo Municipal Council
        </div>

      </div>
    </div>
  );
};
