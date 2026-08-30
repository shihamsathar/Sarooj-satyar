import React, { useState, useEffect } from 'react';
import { 
  X, 
  FolderKanban, 
  Search, 
  Filter, 
  ThumbsUp, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  Building2, 
  MapPin, 
  ArrowRight,
  MessageSquare,
  Sparkles,
  RefreshCw,
  Plus
} from 'lucide-react';
import type { Complaint } from '../types.js';

interface ComplaintTrackerModalProps {
  isOpen: boolean;
  onClose: () => void;
  complaints: Complaint[];
  onOpenSubmit: () => void;
  onUpvote: (id: string) => void;
  onUpdateStatus: (id: string, status: Complaint['status'], feedback?: string, resolutionNote?: string) => void;
  initialSearchCode?: string;
}

export const ComplaintTrackerModal: React.FC<ComplaintTrackerModalProps> = ({
  isOpen,
  onClose,
  complaints,
  onOpenSubmit,
  onUpvote,
  onUpdateStatus,
  initialSearchCode = '',
}) => {
  const [searchTerm, setSearchTerm] = useState(initialSearchCode);
  const [selectedWard, setSelectedWard] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);

  // Admin / Councillor resolution response state
  const [showResolveForm, setShowResolveForm] = useState(false);
  const [resolutionStatus, setResolutionStatus] = useState<Complaint['status']>('resolved');
  const [councillorFeedback, setCouncillorFeedback] = useState('');
  const [resolutionNote, setResolutionNote] = useState('');

  useEffect(() => {
    if (initialSearchCode) {
      setSearchTerm(initialSearchCode);
      const found = complaints.find((c) => c.refCode.toLowerCase() === initialSearchCode.toLowerCase());
      if (found) setSelectedComplaint(found);
    }
  }, [initialSearchCode, complaints]);

  if (!isOpen) return null;

  const filteredComplaints = complaints.filter((c) => {
    if (selectedWard !== 'all' && c.ward !== selectedWard) return false;
    if (selectedStatus !== 'all' && c.status !== selectedStatus) return false;
    if (searchTerm.trim()) {
      const s = searchTerm.toLowerCase();
      const match = c.refCode.toLowerCase().includes(s) ||
                    c.title.toLowerCase().includes(s) ||
                    c.description.toLowerCase().includes(s) ||
                    c.locationAddress.toLowerCase().includes(s) ||
                    c.citizenName.toLowerCase().includes(s);
      if (!match) return false;
    }
    return true;
  });

  const getStatusBadge = (status: Complaint['status']) => {
    switch (status) {
      case 'submitted':
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800">Submitted</span>;
      case 'under_review':
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-800">Under Review</span>;
      case 'assigned':
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800">Engineer Assigned</span>;
      case 'in_progress':
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-orange-100 text-orange-800">In Progress</span>;
      case 'resolved':
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> Resolved</span>;
      case 'rejected':
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-red-100 text-red-800">Not Feasible</span>;
      default:
        return null;
    }
  };

  const getPriorityBadge = (priority: Complaint['priority']) => {
    switch (priority) {
      case 'emergency':
        return <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-red-600 text-white animate-pulse">Emergency</span>;
      case 'high':
        return <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-orange-500 text-white">High Priority</span>;
      case 'medium':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-stone-200 text-stone-700">Medium</span>;
      case 'low':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-stone-100 text-stone-500">Low</span>;
      default:
        return null;
    }
  };

  const handleSaveResolution = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedComplaint) return;
    onUpdateStatus(selectedComplaint.id, resolutionStatus, councillorFeedback, resolutionNote);
    setShowResolveForm(false);
    // Update local selected
    setSelectedComplaint({
      ...selectedComplaint,
      status: resolutionStatus,
      councillorFeedback: councillorFeedback || selectedComplaint.councillorFeedback,
      resolutionNote: resolutionNote || selectedComplaint.resolutionNote,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden my-8 max-h-[90vh] flex flex-col">
        
        {/* Top Header */}
        <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-950 text-white p-6 sm:p-7 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-700/80 border border-blue-500/40 text-white flex items-center justify-center shadow-md">
              <FolderKanban className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-heading font-extrabold text-xl sm:text-2xl text-white tracking-tight">
                Public Grievance Tracker
              </h2>
              <p className="text-xs text-blue-200 font-medium">
                Transparent Real-Time Status of Reported Civic Issues in Negombo
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onOpenSubmit}
              className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold shadow-xs transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Report New Issue</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-full text-blue-200 hover:text-white hover:bg-blue-800/80 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="p-4 sm:p-5 bg-stone-50 border-b border-stone-200 shrink-0 space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
            
            {/* Search Input */}
            <div className="sm:col-span-6 relative">
              <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-stone-400" />
              <input
                type="text"
                placeholder="Search by Ticket ID (e.g. NEG-2024-1082), location, or keyword..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-300 bg-white text-xs sm:text-sm font-medium focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
              />
            </div>

            {/* Ward Filter */}
            <div className="sm:col-span-3">
              <select
                value={selectedWard}
                onChange={(e) => setSelectedWard(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-stone-300 bg-white text-xs sm:text-sm font-medium text-stone-800 focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
              >
                <option value="all">All Wards / Areas</option>
                <option value="Periyamulla">Periyamulla (Ward 5)</option>
                <option value="Dalupotha">Dalupotha (Ward 6)</option>
                <option value="Kochchikade">Kochchikade</option>
                <option value="Sea Street">Sea Street</option>
                <option value="Pitipana">Pitipana</option>
                <option value="Munnakkara">Munnakkara</option>
                <option value="Kurana">Kurana</option>
              </select>
            </div>

            {/* Status Filter */}
            <div className="sm:col-span-3">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-stone-300 bg-white text-xs sm:text-sm font-medium text-stone-800 focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
              >
                <option value="all">All Statuses</option>
                <option value="submitted">Submitted</option>
                <option value="under_review">Under Review</option>
                <option value="assigned">Assigned</option>
                <option value="in_progress">In Progress</option>
                <option value="resolved">Resolved</option>
              </select>
            </div>

          </div>

          <div className="flex items-center justify-between text-xs text-stone-500">
            <span>Showing <b>{filteredComplaints.length}</b> grievances</span>
            <span>Click any ticket to view detailed engineer timeline & councillor notes</span>
          </div>
        </div>

        {/* Main Split Content: List on Left, Detail on Right */}
        <div className="flex-1 overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          
          {/* Complaints List (Left Column) */}
          <div className="lg:col-span-5 border-r border-stone-200 overflow-y-auto p-4 space-y-3 bg-stone-50/50">
            {filteredComplaints.length === 0 ? (
              <div className="text-center py-12 text-stone-400 space-y-2">
                <FolderKanban className="w-10 h-10 mx-auto text-stone-300" />
                <p className="text-sm font-semibold">No complaints found matching criteria.</p>
                <button
                  onClick={() => { setSearchTerm(''); setSelectedWard('all'); setSelectedStatus('all'); }}
                  className="text-xs text-blue-700 font-bold hover:underline"
                >
                  Reset all filters
                </button>
              </div>
            ) : (
              filteredComplaints.map((c) => {
                const isSelected = selectedComplaint?.id === c.id;
                return (
                  <button
                    key={c.id}
                    onClick={() => setSelectedComplaint(c)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all duration-200 ${
                      isSelected
                        ? 'bg-white border-blue-600 shadow-md ring-2 ring-blue-500/20'
                        : 'bg-white border-stone-200 hover:border-stone-300 hover:shadow-xs'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-mono text-xs font-bold text-stone-500">
                        {c.refCode}
                      </span>
                      {getStatusBadge(c.status)}
                    </div>

                    <h4 className="font-heading font-bold text-stone-900 text-sm leading-snug line-clamp-2 mb-1">
                      {c.title}
                    </h4>

                    <div className="flex items-center gap-2 text-[11px] text-stone-500 mb-2">
                      <MapPin className="w-3 h-3 text-stone-400 shrink-0" />
                      <span className="truncate">{c.ward}</span>
                      <span>•</span>
                      <span>{new Date(c.createdAt).toLocaleDateString()}</span>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-stone-100">
                      {getPriorityBadge(c.priority)}
                      
                      <div className="flex items-center gap-1 text-xs font-bold text-stone-600">
                        <ThumbsUp className="w-3 h-3 text-blue-600" />
                        <span>{c.upvotes}</span>
                      </div>
                    </div>
                  </button>
                );
              })
            )}
          </div>

          {/* Complaint Details & Timeline (Right Column) */}
          <div className="lg:col-span-7 overflow-y-auto p-6 sm:p-8 bg-white">
            {selectedComplaint ? (
              <div className="space-y-6">
                
                {/* Header Info */}
                <div className="space-y-2 pb-4 border-b border-stone-200">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm font-extrabold text-blue-900 bg-blue-50 px-3 py-1 rounded-lg border border-blue-200">
                        {selectedComplaint.refCode}
                      </span>
                      {getPriorityBadge(selectedComplaint.priority)}
                    </div>
                    <div>{getStatusBadge(selectedComplaint.status)}</div>
                  </div>

                  <h3 className="font-heading font-extrabold text-stone-900 text-xl sm:text-2xl leading-tight">
                    {selectedComplaint.title}
                  </h3>

                  <div className="flex flex-wrap gap-y-1 gap-x-4 text-xs text-stone-600">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-stone-400" />
                      <b>{selectedComplaint.locationAddress}</b> ({selectedComplaint.ward})
                    </span>
                    <span className="flex items-center gap-1">
                      <Building2 className="w-3.5 h-3.5 text-stone-400" />
                      Dept: <b>{selectedComplaint.assignedDepartment || 'Negombo MC Works'}</b>
                    </span>
                  </div>
                </div>

                {/* Upvote & Citizen Action Bar */}
                <div className="flex items-center justify-between p-3.5 bg-stone-50 rounded-xl border border-stone-200">
                  <div className="text-xs text-stone-600">
                    Reported by: <b>{selectedComplaint.citizenName}</b> ({selectedComplaint.citizenPhone.replace(/(\d{3})\d{4}(\d{3})/, '$1-XXXX-$2')})
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onUpvote(selectedComplaint.id)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-800 text-xs font-bold border border-blue-200 transition-colors"
                    >
                      <ThumbsUp className="w-3.5 h-3.5" />
                      <span>Upvote ({selectedComplaint.upvotes})</span>
                    </button>

                    <button
                      onClick={() => setShowResolveForm(!showResolveForm)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition-colors"
                    >
                      <span>Councillor Action</span>
                    </button>
                  </div>
                </div>

                {/* Resolution Admin Form Toggle */}
                {showResolveForm && (
                  <form onSubmit={handleSaveResolution} className="p-4 bg-emerald-50 border border-emerald-300 rounded-2xl space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-emerald-950 uppercase tracking-wider">
                        Councillor Sarooj Sattar / Official Resolution Desk
                      </span>
                      <button type="button" onClick={() => setShowResolveForm(false)} className="text-stone-400 hover:text-stone-700">
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold text-stone-700 mb-1">Update Status</label>
                        <select
                          value={resolutionStatus}
                          onChange={(e) => setResolutionStatus(e.target.value as any)}
                          className="w-full px-3 py-2 rounded-lg bg-white border border-stone-300 text-xs font-semibold"
                        >
                          <option value="under_review">Under Review</option>
                          <option value="assigned">Engineer Assigned</option>
                          <option value="in_progress">In Progress / Field Work</option>
                          <option value="resolved">Resolved / Completed</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-stone-700 mb-1">Councillor Public Feedback</label>
                        <input
                          type="text"
                          placeholder="e.g. Inspected on site. Resolved by MC crew."
                          value={councillorFeedback}
                          onChange={(e) => setCouncillorFeedback(e.target.value)}
                          className="w-full px-3 py-2 rounded-lg bg-white border border-stone-300 text-xs"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-stone-700 mb-1">Technical Resolution Details</label>
                      <textarea
                        rows={2}
                        placeholder="Detailed notes of engineering work performed..."
                        value={resolutionNote}
                        onChange={(e) => setResolutionNote(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-white border border-stone-300 text-xs"
                      />
                    </div>

                    <button
                      type="submit"
                      className="px-4 py-2 bg-emerald-800 text-white rounded-lg text-xs font-bold hover:bg-emerald-900"
                    >
                      Save Status & Official Note
                    </button>
                  </form>
                )}

                {/* Description Body */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-stone-500 uppercase tracking-wider">
                    Grievance Description
                  </h4>
                  <p className="text-sm text-stone-800 leading-relaxed bg-stone-50 p-4 rounded-xl border border-stone-200">
                    {selectedComplaint.description}
                  </p>
                </div>

                {/* Evidence Photo if present */}
                {selectedComplaint.photoUrl && (
                  <div className="space-y-1.5">
                    <h4 className="text-xs font-bold text-stone-500 uppercase tracking-wider">
                      Photo Evidence
                    </h4>
                    <div className="h-48 rounded-xl overflow-hidden border border-stone-300">
                      <img
                        src={selectedComplaint.photoUrl}
                        alt="Evidence"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                )}

                {/* Official Councillor Response & Feedback Note */}
                {selectedComplaint.councillorFeedback && (
                  <div className="p-4 bg-amber-50/80 rounded-2xl border border-amber-200 space-y-1.5">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900">
                      <Sparkles className="w-4 h-4 text-amber-600" />
                      <span>Councillor Sarooj Sattar’s Official Response:</span>
                    </div>
                    <p className="text-xs sm:text-sm font-serif-quote italic text-stone-900 leading-relaxed">
                      &ldquo;{selectedComplaint.councillorFeedback}&rdquo;
                    </p>
                  </div>
                )}

                {/* AI Triage & Engineering Note */}
                {selectedComplaint.aiSummary && (
                  <div className="p-4 bg-blue-50/70 rounded-2xl border border-blue-200 space-y-1.5 text-xs text-blue-950">
                    <span className="font-bold flex items-center gap-1 text-blue-900">
                      <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                      <span>AI Triage Synthesis & Municipal Department:</span>
                    </span>
                    <p className="text-stone-700 font-medium">
                      {selectedComplaint.aiSummary}
                    </p>
                    {selectedComplaint.aiSuggestedAction && (
                      <p className="text-stone-600">
                        Recommended Action: <b>{selectedComplaint.aiSuggestedAction}</b>
                      </p>
                    )}
                  </div>
                )}

                {/* Visual Step-by-Step Progress Timeline */}
                <div className="space-y-3 pt-2">
                  <h4 className="text-xs font-bold text-stone-500 uppercase tracking-wider">
                    Municipal Resolution Timeline
                  </h4>

                  <div className="grid grid-cols-5 gap-2 text-center text-xs">
                    
                    {/* Stage 1 */}
                    <div className="space-y-1">
                      <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto text-xs font-bold shadow-xs">
                        ✓
                      </div>
                      <span className="block font-bold text-stone-900 text-[11px]">Submitted</span>
                      <span className="block text-[10px] text-stone-400">Day 1</span>
                    </div>

                    {/* Stage 2 */}
                    <div className="space-y-1">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center mx-auto text-xs font-bold ${
                        ['under_review', 'assigned', 'in_progress', 'resolved'].includes(selectedComplaint.status)
                          ? 'bg-emerald-600 text-white'
                          : 'bg-stone-200 text-stone-500'
                      }`}>
                        2
                      </div>
                      <span className="block font-bold text-stone-900 text-[11px]">Under Review</span>
                      <span className="block text-[10px] text-stone-400">Grievance Cell</span>
                    </div>

                    {/* Stage 3 */}
                    <div className="space-y-1">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center mx-auto text-xs font-bold ${
                        ['assigned', 'in_progress', 'resolved'].includes(selectedComplaint.status)
                          ? 'bg-emerald-600 text-white'
                          : 'bg-stone-200 text-stone-500'
                      }`}>
                        3
                      </div>
                      <span className="block font-bold text-stone-900 text-[11px]">Assigned</span>
                      <span className="block text-[10px] text-stone-400">MC Engineer</span>
                    </div>

                    {/* Stage 4 */}
                    <div className="space-y-1">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center mx-auto text-xs font-bold ${
                        ['in_progress', 'resolved'].includes(selectedComplaint.status)
                          ? 'bg-emerald-600 text-white'
                          : 'bg-stone-200 text-stone-500'
                      }`}>
                        4
                      </div>
                      <span className="block font-bold text-stone-900 text-[11px]">Field Work</span>
                      <span className="block text-[10px] text-stone-400">In Progress</span>
                    </div>

                    {/* Stage 5 */}
                    <div className="space-y-1">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center mx-auto text-xs font-bold ${
                        selectedComplaint.status === 'resolved'
                          ? 'bg-emerald-600 text-white'
                          : 'bg-stone-200 text-stone-500'
                      }`}>
                        {selectedComplaint.status === 'resolved' ? '✓' : '5'}
                      </div>
                      <span className="block font-bold text-stone-900 text-[11px]">Resolved</span>
                      <span className="block text-[10px] text-stone-400">Verified</span>
                    </div>

                  </div>
                </div>

              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-8 text-stone-400 space-y-3">
                <FolderKanban className="w-16 h-16 text-stone-300 stroke-1" />
                <h4 className="font-heading font-bold text-stone-700 text-lg">
                  Select a Grievance Ticket
                </h4>
                <p className="text-xs text-stone-500 max-w-sm">
                  Click any complaint on the left panel to inspect the engineering progress, timeline, and Councillor Sarooj Sattar&apos;s updates.
                </p>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
