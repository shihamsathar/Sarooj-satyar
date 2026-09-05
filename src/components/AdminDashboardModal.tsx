import React, { useState, useEffect } from 'react';
import { 
  X, 
  ShieldCheck, 
  LogOut, 
  FolderKanban, 
  Megaphone, 
  Mail, 
  Users, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Search, 
  Plus, 
  ExternalLink,
  MessageSquare,
  Phone,
  Filter,
  Check,
  Building2,
  RefreshCw,
  Send,
  KeyRound,
  Lock,
  Eye,
  EyeOff,
  ShieldAlert,
  Image as ImageIcon
} from 'lucide-react';
import type { Complaint, AdminUser, Announcement, CouncillorMessage, AppPhotoConfig } from '../types.js';
import { AdminPhotoManager } from './AdminPhotoManager.js';

interface AdminDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  adminUser: AdminUser;
  onLogout: () => void;
  complaints: Complaint[];
  onUpdateComplaintStatus: (id: string, status: Complaint['status'], feedback?: string, resolutionNote?: string) => Promise<void>;
  onAnnouncementCreated: (newAnn: Announcement) => void;
  initialTab?: 'grievances' | 'announcements' | 'messages' | 'citizens' | 'security' | 'photos';
  photoConfig: AppPhotoConfig;
  onUpdatePhotoConfig: (newConfig: AppPhotoConfig) => Promise<void>;
}

export const AdminDashboardModal: React.FC<AdminDashboardModalProps> = ({
  isOpen,
  onClose,
  adminUser,
  onLogout,
  complaints,
  onUpdateComplaintStatus,
  onAnnouncementCreated,
  initialTab = 'grievances',
  photoConfig,
  onUpdatePhotoConfig,
}) => {
  const [activeTab, setActiveTab] = useState<'grievances' | 'announcements' | 'messages' | 'citizens' | 'security' | 'photos'>(initialTab);

  // Sync tab if initialTab changes
  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab, isOpen]);

  // Grievances Tab State
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedComplaintId, setSelectedComplaintId] = useState<string | null>(null);
  const [editingStatus, setEditingStatus] = useState<Complaint['status']>('in_progress');
  const [councillorFeedbackInput, setCouncillorFeedbackInput] = useState('');
  const [resolutionNoteInput, setResolutionNoteInput] = useState('');
  const [actionLoading, setActionLoading] = useState(false);
  const [actionSuccessMessage, setActionSuccessMessage] = useState<string | null>(null);

  // New Announcement Form State
  const [annTitle, setAnnTitle] = useState('');
  const [annCategory, setAnnCategory] = useState<Announcement['category']>('Municipal Council');
  const [annContent, setAnnContent] = useState('');
  const [annPriority, setAnnPriority] = useState<'normal' | 'high'>('normal');
  const [annTags, setAnnTags] = useState('Negombo, Public Notice');
  const [annActionLink, setAnnActionLink] = useState('');
  const [annActionText, setAnnActionText] = useState('');
  const [annLoading, setAnnLoading] = useState(false);
  const [annSuccess, setAnnSuccess] = useState<string | null>(null);

  // Messages State
  const [messages, setMessages] = useState<CouncillorMessage[]>([]);
  const [loadingMessages, setLoadingMessages] = useState(false);

  // Registered Citizens State
  const [citizens, setCitizens] = useState<any[]>([]);
  const [loadingCitizens, setLoadingCitizens] = useState(false);

  // Fetch direct messages when tab opened
  const fetchMessages = async () => {
    setLoadingMessages(true);
    try {
      const res = await fetch('/api/messages');
      const data = await res.json();
      if (data.success) setMessages(data.data || []);
    } catch (e) {
      console.error('Failed to fetch messages:', e);
    } finally {
      setLoadingMessages(false);
    }
  };

  // Fetch registered citizens when tab opened
  const fetchCitizens = async () => {
    setLoadingCitizens(true);
    try {
      const res = await fetch('/api/auth/citizens');
      const data = await res.json();
      if (data.success) setCitizens(data.data || []);
    } catch (e) {
      console.error('Failed to fetch citizens:', e);
    } finally {
      setLoadingCitizens(false);
    }
  };

  // Password Change State
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [passLoading, setPassLoading] = useState(false);
  const [passError, setPassError] = useState<string | null>(null);
  const [passSuccess, setPassSuccess] = useState<string | null>(null);

  // Handle Admin Change Password Submission
  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPassError(null);
    setPassSuccess(null);

    const cleanCurrent = currentPassword.trim();
    const cleanNew = newPassword.trim();
    const cleanConfirm = confirmPassword.trim();

    if (!cleanCurrent) {
      setPassError('Please enter your existing password.');
      return;
    }
    if (!cleanNew) {
      setPassError('Please enter a new password.');
      return;
    }
    if (cleanNew.length < 6) {
      setPassError('New password must be at least 6 characters long.');
      return;
    }
    if (cleanNew !== cleanConfirm) {
      setPassError('New password and confirmation password do not match.');
      return;
    }
    if (cleanCurrent === cleanNew) {
      setPassError('New password must be different from your current password.');
      return;
    }

    setPassLoading(true);
    try {
      const res = await fetch('/api/auth/admin/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: adminUser.username,
          currentPassword: cleanCurrent,
          newPassword: cleanNew,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to update administrator password.');
      }

      setPassSuccess(data.message || 'Password successfully updated! Your new credentials are now active.');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err: any) {
      setPassError(err.message || 'Failed to update password.');
    } finally {
      setPassLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      if (activeTab === 'messages') fetchMessages();
      if (activeTab === 'citizens') fetchCitizens();
    }
  }, [isOpen, activeTab]);

  if (!isOpen) return null;

  // Selected complaint details
  const activeComplaint = complaints.find((c) => c.id === selectedComplaintId);

  // Handle status update
  const handleApplyStatusChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedComplaintId) return;

    setActionLoading(true);
    setActionSuccessMessage(null);
    try {
      await onUpdateComplaintStatus(
        selectedComplaintId,
        editingStatus,
        councillorFeedbackInput.trim() || undefined,
        resolutionNoteInput.trim() || undefined
      );
      setActionSuccessMessage('Complaint ticket status successfully updated!');
      setTimeout(() => {
        setActionSuccessMessage(null);
        setSelectedComplaintId(null);
      }, 1500);
    } catch (e) {
      console.error(e);
    } finally {
      setActionLoading(false);
    }
  };

  // Handle Create Announcement
  const handleCreateAnnouncement = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!annTitle || !annContent) return;

    setAnnLoading(true);
    setAnnSuccess(null);
    try {
      const res = await fetch('/api/announcements', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: annTitle,
          category: annCategory,
          content: annContent,
          priority: annPriority,
          author: `Councillor ${adminUser.name}`,
          tags: annTags.split(',').map((t) => t.trim()).filter(Boolean),
          actionLink: annActionLink || undefined,
          actionText: annActionText || undefined,
        }),
      });
      const data = await res.json();
      if (data.success && data.data) {
        onAnnouncementCreated(data.data);
        setAnnSuccess('Official announcement published to public forum successfully!');
        setAnnTitle('');
        setAnnContent('');
        setAnnActionLink('');
        setAnnActionText('');
      }
    } catch (e) {
      console.error(e);
    } finally {
      setAnnLoading(false);
    }
  };

  // Filter complaints
  const filteredComplaints = complaints.filter((c) => {
    const matchesStatus = statusFilter === 'all' || c.status === statusFilter;
    const matchesSearch = 
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.refCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.citizenName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.citizenPhone.includes(searchQuery) ||
      c.ward.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  // Metrics
  const total = complaints.length;
  const underReview = complaints.filter((c) => c.status === 'under_review').length;
  const inProgress = complaints.filter((c) => c.status === 'in_progress').length;
  const resolved = complaints.filter((c) => c.status === 'resolved').length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-stone-950/70 backdrop-blur-xs overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden my-auto max-h-[96dvh] sm:max-h-[92vh] flex flex-col">
        
        {/* Top Header Banner */}
        <div className="bg-gradient-to-r from-emerald-950 via-stone-900 to-emerald-900 text-white p-3.5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 border-b border-emerald-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-amber-400 text-stone-950 flex items-center justify-center shadow-md font-bold shrink-0">
              <ShieldCheck className="w-6 h-6 sm:w-7 sm:h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-heading font-extrabold text-base sm:text-xl text-white tracking-tight">
                  Admin Control Console
                </h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-400 text-stone-950">
                  Municipal Admin
                </span>
              </div>
              <p className="text-xs text-amber-200/90 font-medium mt-0.5">
                Logged in as: <strong className="text-white">{adminUser.name}</strong> ({adminUser.title})
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2.5 flex-wrap">
            {/* Direct Add Photos & Background Quick-Action Button */}
            <button
              onClick={() => setActiveTab('photos')}
              className={`inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-2 rounded-xl text-xs font-black transition-all cursor-pointer shadow-md min-h-[38px] ${
                activeTab === 'photos'
                  ? 'bg-amber-400 text-stone-950 ring-2 ring-amber-300'
                  : 'bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 text-stone-950 hover:scale-105 active:scale-95'
              }`}
              title="Add Background Photos & Manage Photo Slots"
            >
              <ImageIcon className="w-4 h-4 text-stone-950" />
              <span>+ Add Photos</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('security');
                setPassError(null);
                setPassSuccess(null);
              }}
              className={`inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-2 rounded-xl text-xs font-bold border transition-all min-h-[38px] ${
                activeTab === 'security'
                  ? 'bg-amber-400 text-stone-950 border-amber-300 shadow-sm'
                  : 'bg-white/10 hover:bg-white/20 text-amber-200 border-white/20'
              }`}
              title="Change Admin Password"
            >
              <KeyRound className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Change Password</span>
            </button>

            <button
              onClick={onLogout}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-red-900/80 hover:bg-red-800 text-red-100 text-xs font-bold border border-red-700 transition-colors min-h-[38px]"
              title="Log out of Admin session"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log Out</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 sm:p-2 rounded-full text-stone-400 hover:text-white hover:bg-white/10 transition-colors ml-auto sm:ml-0"
              aria-label="Close"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>
        </div>

        {/* Quick KPI Stat Bar */}
        <div className="bg-stone-50 border-b border-stone-200 px-3 sm:px-6 py-2.5 sm:py-3 grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 text-center shrink-0">
          <div className="bg-white p-2 sm:p-2.5 rounded-xl border border-stone-200 shadow-2xs">
            <span className="text-stone-500 text-[10px] sm:text-[11px] block font-medium">Total Grievances</span>
            <span className="text-lg sm:text-xl font-black text-stone-900 font-mono">{total}</span>
          </div>
          <div className="bg-white p-2 sm:p-2.5 rounded-xl border border-amber-200 shadow-2xs">
            <span className="text-amber-700 text-[10px] sm:text-[11px] block font-medium">Under Review</span>
            <span className="text-lg sm:text-xl font-black text-amber-900 font-mono">{underReview}</span>
          </div>
          <div className="bg-white p-2 sm:p-2.5 rounded-xl border border-blue-200 shadow-2xs">
            <span className="text-blue-700 text-[10px] sm:text-[11px] block font-medium">In Progress</span>
            <span className="text-lg sm:text-xl font-black text-blue-900 font-mono">{inProgress}</span>
          </div>
          <div className="bg-white p-2 sm:p-2.5 rounded-xl border border-emerald-200 shadow-2xs">
            <span className="text-emerald-700 text-[10px] sm:text-[11px] block font-medium">Resolved</span>
            <span className="text-lg sm:text-xl font-black text-emerald-900 font-mono">{resolved}</span>
          </div>
        </div>

        {/* Tabs Bar */}
        <div className="flex border-b border-stone-200 bg-stone-100/70 px-3 sm:px-6 overflow-x-auto no-scrollbar text-xs sm:text-sm font-bold shrink-0">
          <button
            onClick={() => setActiveTab('grievances')}
            className={`py-3 px-4 border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'grievances'
                ? 'border-emerald-800 text-emerald-900 bg-white shadow-2xs'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <FolderKanban className="w-4 h-4 text-emerald-700" />
            <span>Manage Grievances ({complaints.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('announcements')}
            className={`py-3 px-4 border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'announcements'
                ? 'border-emerald-800 text-emerald-900 bg-white shadow-2xs'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <Megaphone className="w-4 h-4 text-amber-600" />
            <span>Publish Announcement</span>
          </button>

          <button
            onClick={() => setActiveTab('messages')}
            className={`py-3 px-4 border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'messages'
                ? 'border-emerald-800 text-emerald-900 bg-white shadow-2xs'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <Mail className="w-4 h-4 text-blue-600" />
            <span>Citizen Inquiries</span>
          </button>

          <button
            onClick={() => setActiveTab('citizens')}
            className={`py-3 px-4 border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'citizens'
                ? 'border-emerald-800 text-emerald-900 bg-white shadow-2xs'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <Users className="w-4 h-4 text-purple-600" />
            <span>Registered Citizens (OTP Logins)</span>
          </button>

          <button
            onClick={() => setActiveTab('photos')}
            className={`py-3 px-4 border-b-2 transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'photos'
                ? 'border-amber-500 text-amber-950 bg-amber-50/90 shadow-2xs font-black'
                : 'border-transparent text-stone-700 hover:text-stone-950 font-bold'
            }`}
          >
            <ImageIcon className="w-4 h-4 text-amber-600" />
            <span>+ Add Photos &amp; Background</span>
            <span className="px-1.5 py-0.5 rounded-full text-[9px] bg-amber-400 text-stone-950 font-black">
              Visual Slots
            </span>
          </button>

          <button
            onClick={() => {
              setActiveTab('security');
              setPassError(null);
              setPassSuccess(null);
            }}
            className={`py-3 px-4 border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'security'
                ? 'border-emerald-800 text-emerald-900 bg-white shadow-2xs'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <KeyRound className="w-4 h-4 text-amber-600" />
            <span>Security & Password</span>
          </button>
        </div>

        {/* Tab Body */}
        <div className="flex-1 overflow-y-auto p-3.5 sm:p-6 space-y-4 sm:space-y-6">

          {/* ========================================================= */}
          {/* TAB 1: MANAGE GRIEVANCES                                  */}
          {/* ========================================================= */}
          {activeTab === 'grievances' && (
            <div className="space-y-4">
              
              {/* Search & Status Filters */}
              <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
                <div className="relative w-full sm:w-80">
                  <Search className="w-4 h-4 absolute left-3.5 top-3 text-stone-400" />
                  <input
                    type="text"
                    placeholder="Search by ticket, phone, ward..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-3.5 py-2 text-xs rounded-xl bg-stone-50 border border-stone-300 focus:bg-white focus:border-emerald-600"
                  />
                </div>

                <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto text-xs">
                  {['all', 'submitted', 'under_review', 'in_progress', 'resolved'].map((st) => (
                    <button
                      key={st}
                      onClick={() => setStatusFilter(st)}
                      className={`px-3 py-1.5 rounded-lg capitalize font-semibold transition-colors ${
                        statusFilter === st
                          ? 'bg-emerald-800 text-white shadow-2xs'
                          : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                      }`}
                    >
                      {st.replace('_', ' ')}
                    </button>
                  ))}
                </div>
              </div>

              {/* Status Update Modal / Drawer if a complaint is selected */}
              {selectedComplaintId && activeComplaint && (
                <div className="p-5 rounded-2xl bg-amber-50/70 border-2 border-amber-300 space-y-4 animate-fadeIn">
                  <div className="flex items-center justify-between border-b border-amber-200 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-xs bg-stone-900 text-amber-300 px-2.5 py-0.5 rounded-md">
                        {activeComplaint.refCode}
                      </span>
                      <h4 className="font-heading font-bold text-stone-900 text-sm truncate max-w-md">
                        {activeComplaint.title}
                      </h4>
                    </div>
                    <button
                      onClick={() => setSelectedComplaintId(null)}
                      className="p-1 rounded-full text-stone-500 hover:text-stone-900 hover:bg-stone-200"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {actionSuccessMessage && (
                    <div className="p-3 rounded-xl bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs font-bold flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>{actionSuccessMessage}</span>
                    </div>
                  )}

                  <form onSubmit={handleApplyStatusChange} className="space-y-3 text-xs">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block font-bold text-stone-700 mb-1">
                          Update Ticket Status
                        </label>
                        <select
                          value={editingStatus}
                          onChange={(e) => setEditingStatus(e.target.value as any)}
                          className="w-full px-3 py-2 rounded-xl bg-white border border-stone-300 font-bold text-stone-900"
                        >
                          <option value="under_review">Under Review (Inspecting on site)</option>
                          <option value="assigned">Assigned to Municipal Division</option>
                          <option value="in_progress">In Progress (Work crew active)</option>
                          <option value="resolved">Resolved (Complete & closed)</option>
                          <option value="rejected">Rejected (Out of MC jurisdiction)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block font-bold text-stone-700 mb-1">
                          Citizen Info
                        </label>
                        <div className="p-2 rounded-xl bg-white border border-stone-200 text-stone-700 text-xs">
                          👤 <strong>{activeComplaint.citizenName}</strong> • 📞 <strong>{activeComplaint.citizenPhone}</strong> • 📍 {activeComplaint.ward}
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block font-bold text-stone-700 mb-1">
                        Councillor Sarooj Sattar Official Feedback / Note to Citizen
                      </label>
                      <input
                        type="text"
                        value={councillorFeedbackInput}
                        onChange={(e) => setCouncillorFeedbackInput(e.target.value)}
                        placeholder="e.g. Inspected with MC Works Engineer. Crew assigned for Friday morning."
                        className="w-full px-3 py-2 rounded-xl bg-white border border-stone-300 text-stone-800 font-medium"
                      />
                    </div>

                    {editingStatus === 'resolved' && (
                      <div>
                        <label className="block font-bold text-emerald-800 mb-1">
                          Official Resolution Summary Note
                        </label>
                        <input
                          type="text"
                          value={resolutionNoteInput}
                          onChange={(e) => setResolutionNoteInput(e.target.value)}
                          placeholder="e.g. Drainage cleared, culvert lid replaced, works completed."
                          className="w-full px-3 py-2 rounded-xl bg-white border border-emerald-400 text-stone-800 font-medium"
                        />
                      </div>
                    )}

                    <div className="flex justify-end gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => setSelectedComplaintId(null)}
                        className="px-4 py-2 rounded-xl bg-stone-200 hover:bg-stone-300 text-stone-800 font-bold"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={actionLoading}
                        className="px-5 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold shadow-xs flex items-center gap-1.5"
                      >
                        {actionLoading ? (
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Save & Broadcast Status</span>
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Complaints List Table */}
              <div className="space-y-2.5">
                {filteredComplaints.length === 0 ? (
                  <div className="p-8 text-center bg-stone-50 rounded-2xl border border-stone-200 text-stone-500 text-xs">
                    No grievance tickets found matching current criteria.
                  </div>
                ) : (
                  filteredComplaints.map((c) => (
                    <div
                      key={c.id}
                      className="p-4 rounded-2xl bg-stone-50/90 border border-stone-200 hover:border-stone-400 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-mono text-xs font-bold text-stone-900 bg-amber-200 px-2 py-0.5 rounded">
                            {c.refCode}
                          </span>
                          <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-stone-200 text-stone-800">
                            {c.ward}
                          </span>
                          <span className={`text-[11px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                            c.status === 'resolved'
                              ? 'bg-emerald-100 text-emerald-800'
                              : c.status === 'in_progress'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}>
                            {c.status.replace('_', ' ')}
                          </span>
                        </div>

                        <h4 className="font-heading font-bold text-stone-900 text-sm">
                          {c.title}
                        </h4>

                        <div className="text-xs text-stone-500 flex flex-wrap items-center gap-3">
                          <span>Citizen: <strong className="text-stone-800">{c.citizenName}</strong></span>
                          <span>•</span>
                          <span>Mobile: <strong className="text-stone-800">{c.citizenPhone}</strong></span>
                          <span>•</span>
                          <span>Priority: <strong className="capitalize text-stone-800">{c.priority}</strong></span>
                        </div>

                        {c.councillorFeedback && (
                          <div className="text-xs p-2 rounded-lg bg-emerald-50 text-emerald-900 border border-emerald-200">
                            💬 <strong>Councillor Note:</strong> {c.councillorFeedback}
                          </div>
                        )}
                      </div>

                      <div className="shrink-0 flex items-center gap-2">
                        <button
                          onClick={() => {
                            setSelectedComplaintId(c.id);
                            setEditingStatus(c.status);
                            setCouncillorFeedbackInput(c.councillorFeedback || '');
                            setResolutionNoteInput(c.resolutionNote || '');
                          }}
                          className="px-3.5 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold shadow-xs transition-colors"
                        >
                          Update Status
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 2: PUBLISH ANNOUNCEMENT                               */}
          {/* ========================================================= */}
          {activeTab === 'announcements' && (
            <div className="max-w-2xl mx-auto space-y-4">
              <div className="p-4 bg-purple-50 rounded-2xl border border-purple-200 text-xs text-purple-950 flex items-start gap-2.5">
                <Megaphone className="w-5 h-5 text-purple-700 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold">Official Public Announcement Broadcast</p>
                  <p className="text-stone-600 mt-0.5">
                    Broadcast municipal council decisions, flood alerts, waste collection schedules, or town hall invitations directly to the Negombo Community Portal.
                  </p>
                </div>
              </div>

              {annSuccess && (
                <div className="p-3.5 rounded-xl bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>{annSuccess}</span>
                </div>
              )}

              <form onSubmit={handleCreateAnnouncement} className="space-y-3.5 text-xs">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">
                    Announcement Headline <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Pre-Monsoon Canal De-Silting in Periyamulla Starting Monday"
                    value={annTitle}
                    onChange={(e) => setAnnTitle(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border border-stone-300 focus:bg-white text-xs font-semibold"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-stone-700 mb-1">Category</label>
                    <select
                      value={annCategory}
                      onChange={(e) => setAnnCategory(e.target.value as any)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border border-stone-300 font-medium"
                    >
                      <option value="Urgent Notice">Urgent Notice</option>
                      <option value="Municipal Council">Municipal Council</option>
                      <option value="Community Welfare">Community Welfare</option>
                      <option value="Health & Sanitation">Health & Sanitation</option>
                      <option value="Events & Townhalls">Events & Townhalls</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-stone-700 mb-1">Priority</label>
                    <select
                      value={annPriority}
                      onChange={(e) => setAnnPriority(e.target.value as any)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border border-stone-300 font-medium"
                    >
                      <option value="normal">Normal Priority</option>
                      <option value="high">High (Urgent Banner Alert)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">
                    Announcement Details <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Describe municipal instructions, operational dates, areas affected, and emergency guidelines..."
                    value={annContent}
                    onChange={(e) => setAnnContent(e.target.value)}
                    className="w-full p-3 rounded-xl bg-stone-50 border border-stone-300 focus:bg-white text-xs leading-relaxed"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-stone-700 mb-1">Action Link (Optional)</label>
                    <input
                      type="text"
                      placeholder="e.g. #submit_complaint or https://..."
                      value={annActionLink}
                      onChange={(e) => setAnnActionLink(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-300 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-stone-700 mb-1">Action Button Text (Optional)</label>
                    <input
                      type="text"
                      placeholder="e.g. View Schedule or Report Issue"
                      value={annActionText}
                      onChange={(e) => setAnnActionText(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-300 text-xs"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={annLoading}
                  className="w-full py-3 px-4 rounded-xl bg-purple-900 hover:bg-purple-950 text-white font-bold text-xs shadow-md flex items-center justify-center gap-2"
                >
                  {annLoading ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Broadcast Announcement</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 3: CITIZEN INQUIRIES & DIRECT MESSAGES                 */}
          {/* ========================================================= */}
          {activeTab === 'messages' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-heading font-bold text-sm text-stone-900">
                  Citizen Letters & Direct Messages to Secretariat
                </h3>
                <button
                  onClick={fetchMessages}
                  className="p-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-xs flex items-center gap-1"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Refresh</span>
                </button>
              </div>

              {loadingMessages ? (
                <div className="p-8 text-center text-xs text-stone-500">
                  <RefreshCw className="w-5 h-5 animate-spin mx-auto mb-2 text-stone-400" />
                  Loading direct citizen messages...
                </div>
              ) : messages.length === 0 ? (
                <div className="p-8 text-center bg-stone-50 rounded-2xl border border-stone-200 text-xs text-stone-500">
                  No citizen inquiries received yet.
                </div>
              ) : (
                <div className="space-y-2.5">
                  {messages.map((m) => (
                    <div
                      key={m.id}
                      className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md">
                            Via {m.channel.replace('_', ' ')}
                          </span>
                          <h4 className="font-heading font-bold text-sm text-stone-900 mt-1">
                            {m.subject}
                          </h4>
                          <div className="text-xs text-stone-500 flex items-center gap-2 mt-0.5">
                            <span>From: <strong>{m.senderName}</strong></span>
                            <span>•</span>
                            <span>Phone: <strong>{m.senderPhone}</strong></span>
                            {m.ward && <span>• Ward: <strong>{m.ward}</strong></span>}
                          </div>
                        </div>

                        <a
                          href={`tel:${m.senderPhone}`}
                          className="px-3 py-1.5 rounded-xl bg-emerald-100 hover:bg-emerald-200 text-emerald-950 font-bold text-xs flex items-center gap-1"
                        >
                          <Phone className="w-3.5 h-3.5" />
                          <span>Call Back</span>
                        </a>
                      </div>

                      <p className="text-xs text-stone-700 bg-white p-3 rounded-xl border border-stone-200 leading-relaxed">
                        {m.message}
                      </p>

                      <div className="text-[10px] text-stone-400 text-right">
                        Received: {new Date(m.createdAt).toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 4: REGISTERED CITIZENS (PEOPLE OTP LOGINS)            */}
          {/* ========================================================= */}
          {activeTab === 'citizens' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-heading font-bold text-sm text-stone-900">
                  Citizens Authenticated via Mobile Phone OTP
                </h3>
                <button
                  onClick={fetchCitizens}
                  className="p-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-xs flex items-center gap-1"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Refresh</span>
                </button>
              </div>

              {loadingCitizens ? (
                <div className="p-8 text-center text-xs text-stone-500">
                  <RefreshCw className="w-5 h-5 animate-spin mx-auto mb-2 text-stone-400" />
                  Loading citizen roster...
                </div>
              ) : citizens.length === 0 ? (
                <div className="p-8 text-center bg-stone-50 rounded-2xl border border-stone-200 text-xs text-stone-500">
                  No citizen OTP sessions logged yet.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border border-stone-200 rounded-2xl overflow-hidden">
                    <thead className="bg-stone-100 text-stone-700 uppercase tracking-wider font-bold">
                      <tr>
                        <th className="p-3">Citizen Name</th>
                        <th className="p-3">Mobile Phone</th>
                        <th className="p-3">Ward</th>
                        <th className="p-3">Last Active Session</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-200 bg-white">
                      {citizens.map((cit) => (
                        <tr key={cit.id || cit.phone} className="hover:bg-stone-50">
                          <td className="p-3 font-bold text-stone-900">{cit.name}</td>
                          <td className="p-3 font-mono font-semibold text-emerald-800">{cit.phone}</td>
                          <td className="p-3 text-stone-600">{cit.ward}</td>
                          <td className="p-3 text-stone-500">
                            {cit.lastLoginAt ? new Date(cit.lastLoginAt).toLocaleString() : 'Active'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 5: SECURITY & CHANGE PASSWORD                         */}
          {/* ========================================================= */}
          {activeTab === 'security' && (
            <div className="space-y-6 max-w-2xl mx-auto py-2">
              
              {/* Profile Context Card */}
              <div className="p-5 rounded-2xl bg-gradient-to-r from-stone-900 to-emerald-950 text-white border border-stone-800 shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-amber-400 text-stone-950 flex items-center justify-center font-black text-lg shadow-sm">
                    <KeyRound className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-heading font-bold text-white text-base">
                        {adminUser.name}
                      </h3>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-400 text-stone-950">
                        Admin Account
                      </span>
                    </div>
                    <p className="text-xs text-amber-200/90 font-mono mt-0.5">
                      Username: <strong className="text-white">{adminUser.username}</strong>
                    </p>
                    <p className="text-xs text-stone-300 font-medium">
                      {adminUser.email}
                    </p>
                  </div>
                </div>

                <div className="text-xs font-bold px-3 py-1.5 rounded-full bg-emerald-900/90 border border-emerald-500/50 text-emerald-200 flex items-center gap-1.5 self-start sm:self-auto">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Verified Administrator</span>
                </div>
              </div>

              {/* Password Change Form Container */}
              <div className="bg-white rounded-3xl border border-stone-200 shadow-sm p-6 sm:p-7">
                <div className="flex items-start justify-between gap-3 border-b border-stone-100 pb-4 mb-5">
                  <div>
                    <h3 className="text-lg font-heading font-bold text-stone-900 flex items-center gap-2">
                      <Lock className="w-5 h-5 text-emerald-700" />
                      <span>Change Administrator Password</span>
                    </h3>
                    <p className="text-xs text-stone-500 mt-1">
                      You can change your admin password anytime. The new password will take effect immediately for future logins.
                    </p>
                  </div>
                </div>

                {/* Error Banner */}
                {passError && (
                  <div className="mb-5 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-start gap-2.5 animate-fadeIn">
                    <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                    <div className="flex-1 font-medium">{passError}</div>
                  </div>
                )}

                {/* Success Banner */}
                {passSuccess && (
                  <div className="mb-5 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs animate-fadeIn space-y-3">
                    <div className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <div className="font-bold text-emerald-950 text-sm">Password Changed Successfully!</div>
                        <p className="text-emerald-800 mt-0.5">{passSuccess}</p>
                      </div>
                    </div>
                    
                    <div className="pt-2 border-t border-emerald-200 flex flex-wrap items-center gap-2">
                      <button
                        type="button"
                        onClick={onLogout}
                        className="px-3.5 py-1.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold shadow-xs transition-colors flex items-center gap-1.5"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Log Out & Test New Password Now</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setPassSuccess(null)}
                        className="px-3 py-1.5 rounded-xl bg-white hover:bg-emerald-100 text-emerald-900 text-xs font-semibold border border-emerald-300 transition-colors"
                      >
                        Keep Working
                      </button>
                    </div>
                  </div>
                )}

                <form onSubmit={handleChangePassword} className="space-y-4">
                  {/* Current Password */}
                  <div>
                    <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                      Current Password <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type={showCurrentPass ? 'text' : 'password'}
                        value={currentPassword}
                        onChange={(e) => {
                          setCurrentPassword(e.target.value);
                          setPassError(null);
                        }}
                        placeholder="Enter your existing password (e.g. admin123)"
                        className="w-full px-3.5 py-2.5 pr-10 rounded-xl border border-stone-300 text-sm focus:ring-2 focus:ring-emerald-700 focus:outline-hidden font-mono"
                        required
                        disabled={passLoading}
                      />
                      <button
                        type="button"
                        onClick={() => setShowCurrentPass(!showCurrentPass)}
                        className="absolute right-3 top-2.5 text-stone-400 hover:text-stone-600 p-0.5"
                        tabIndex={-1}
                        aria-label="Toggle password visibility"
                      >
                        {showCurrentPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    <p className="text-[11px] text-stone-500 mt-1">
                      Default sample password is <code className="px-1 py-0.5 bg-stone-100 rounded text-stone-800 font-bold">admin123</code>.
                    </p>
                  </div>

                  {/* New Password */}
                  <div>
                    <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                      New Password <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type={showNewPass ? 'text' : 'password'}
                        value={newPassword}
                        onChange={(e) => {
                          setNewPassword(e.target.value);
                          setPassError(null);
                        }}
                        placeholder="Enter your new password (minimum 6 characters)"
                        className="w-full px-3.5 py-2.5 pr-10 rounded-xl border border-stone-300 text-sm focus:ring-2 focus:ring-emerald-700 focus:outline-hidden font-mono"
                        required
                        minLength={6}
                        disabled={passLoading}
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPass(!showNewPass)}
                        className="absolute right-3 top-2.5 text-stone-400 hover:text-stone-600 p-0.5"
                        tabIndex={-1}
                        aria-label="Toggle password visibility"
                      >
                        {showNewPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>

                    {/* Dynamic Password Strength Feedback */}
                    <div className="mt-2 flex items-center gap-3 text-[11px]">
                      <span className={`inline-flex items-center gap-1 ${
                        newPassword.length >= 6 ? 'text-emerald-700 font-bold' : 'text-stone-400'
                      }`}>
                        <Check className={`w-3 h-3 ${newPassword.length >= 6 ? 'text-emerald-600' : 'text-stone-300'}`} />
                        <span>6+ chars</span>
                      </span>
                      <span className={`inline-flex items-center gap-1 ${
                        /[A-Za-z]/.test(newPassword) ? 'text-emerald-700 font-bold' : 'text-stone-400'
                      }`}>
                        <Check className={`w-3 h-3 ${/[A-Za-z]/.test(newPassword) ? 'text-emerald-600' : 'text-stone-300'}`} />
                        <span>Letters</span>
                      </span>
                      <span className={`inline-flex items-center gap-1 ${
                        /[0-9]/.test(newPassword) ? 'text-emerald-700 font-bold' : 'text-stone-400'
                      }`}>
                        <Check className={`w-3 h-3 ${/[0-9]/.test(newPassword) ? 'text-emerald-600' : 'text-stone-300'}`} />
                        <span>Numbers</span>
                      </span>
                    </div>
                  </div>

                  {/* Confirm New Password */}
                  <div>
                    <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                      Confirm New Password <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type={showConfirmPass ? 'text' : 'password'}
                        value={confirmPassword}
                        onChange={(e) => {
                          setConfirmPassword(e.target.value);
                          setPassError(null);
                        }}
                        placeholder="Re-enter your new password to confirm"
                        className="w-full px-3.5 py-2.5 pr-10 rounded-xl border border-stone-300 text-sm focus:ring-2 focus:ring-emerald-700 focus:outline-hidden font-mono"
                        required
                        disabled={passLoading}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPass(!showConfirmPass)}
                        className="absolute right-3 top-2.5 text-stone-400 hover:text-stone-600 p-0.5"
                        tabIndex={-1}
                        aria-label="Toggle password visibility"
                      >
                        {showConfirmPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    {confirmPassword && (
                      <p className={`text-[11px] mt-1 font-semibold flex items-center gap-1 ${
                        confirmPassword === newPassword ? 'text-emerald-700' : 'text-amber-700'
                      }`}>
                        {confirmPassword === newPassword ? (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Passwords match</span>
                          </>
                        ) : (
                          <>
                            <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                            <span>Passwords do not match yet</span>
                          </>
                        )}
                      </p>
                    )}
                  </div>

                  {/* Form Submission Buttons */}
                  <div className="pt-3 flex items-center gap-3">
                    <button
                      type="submit"
                      disabled={passLoading || !currentPassword || !newPassword || !confirmPassword}
                      className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 disabled:opacity-50 text-white text-xs sm:text-sm font-bold shadow-md transition-all cursor-pointer disabled:cursor-not-allowed"
                    >
                      {passLoading ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin" />
                          <span>Updating Password...</span>
                        </>
                      ) : (
                        <>
                          <Lock className="w-4 h-4" />
                          <span>Save & Update Password</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setCurrentPassword('');
                        setNewPassword('');
                        setConfirmPassword('');
                        setPassError(null);
                        setPassSuccess(null);
                      }}
                      className="px-4 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs sm:text-sm font-semibold transition-colors"
                    >
                      Clear
                    </button>
                  </div>
                </form>
              </div>

              {/* Security Policy Information Note */}
              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 text-stone-600 text-xs space-y-2">
                <div className="font-bold text-stone-800 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-700" />
                  <span>Municipal Portal Credential Policy</span>
                </div>
                <ul className="list-disc pl-5 space-y-1 text-[11px] text-stone-500">
                  <li>Changes to your password take effect immediately across all active admin terminals.</li>
                  <li>Updated credentials are encrypted and stored in persistent server storage.</li>
                  <li>Ensure your password contains a mix of letters and numbers for community portal security.</li>
                </ul>
              </div>

            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 6: PHOTO SLOTS & APP BACKGROUND (ADMIN ONLY)          */}
          {/* ========================================================= */}
          {activeTab === 'photos' && (
            <AdminPhotoManager
              photoConfig={photoConfig}
              onUpdateConfig={onUpdatePhotoConfig}
            />
          )}

        </div>

      </div>
    </div>
  );
};
