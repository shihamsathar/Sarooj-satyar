import React, { useState } from 'react';
import { 
  X, 
  FileEdit, 
  Sparkles, 
  Upload, 
  MapPin, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  Loader2, 
  ArrowRight,
  ShieldCheck,
  Building2,
  Phone
} from 'lucide-react';
import confetti from 'canvas-confetti';
import type { Complaint } from '../types.js';

interface SubmitComplaintModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplaintCreated: (complaint: Complaint) => void;
  onViewTracker: (refCode: string) => void;
}

const NEGOMBO_WARDS = [
  'Periyamulla (Ward 5)',
  'Dalupotha (Ward 6)',
  'Kochchikade North',
  'Kochchikade South',
  'Sea Street',
  'Pitipana North',
  'Pitipana South',
  'Munnakkara',
  'Daluwakotuwa',
  'Bolawalana',
  'Kurana',
  'Katuwapitiya',
  'Ettukala',
  'Mahahunupitiya',
  'Welihena',
  'Negombo Town & Fort',
];

const COMPLAINT_CATEGORIES = [
  'Auto-Detect with AI',
  'Roads & Infrastructure',
  'Sanitation & Waste',
  'Streetlights & CEB',
  'Water Supply & Drainage',
  'Public Health & Dengue',
  'Community Welfare',
  'Building & Encroachment',
  'Other Municipal Services',
];

export const SubmitComplaintModal: React.FC<SubmitComplaintModalProps> = ({
  isOpen,
  onClose,
  onComplaintCreated,
  onViewTracker,
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [ward, setWard] = useState('Periyamulla (Ward 5)');
  const [locationAddress, setLocationAddress] = useState('');
  const [category, setCategory] = useState('Auto-Detect with AI');
  const [priority, setPriority] = useState<'auto' | 'emergency' | 'high' | 'medium' | 'low'>('auto');
  
  // Citizen Contact
  const [citizenName, setCitizenName] = useState('');
  const [citizenPhone, setCitizenPhone] = useState('');
  const [citizenEmail, setCitizenEmail] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');

  // AI Triage State
  const [isTriaging, setIsTriaging] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState<any>(null);

  // Submission State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedComplaint, setSubmittedComplaint] = useState<Complaint | null>(null);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  // Run instant AI assessment on complaint
  const handleAiTriage = async () => {
    if (!title.trim() || !description.trim()) {
      setError('Please enter a brief title and description first so AI can analyze the problem.');
      return;
    }
    setIsTriaging(true);
    setError(null);

    try {
      const res = await fetch('/api/ai/triage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          description,
          ward,
          locationAddress,
        }),
      });
      const data = await res.json();
      if (data.success && data.data) {
        setAiAnalysis(data.data);
        if (data.data.category) setCategory(data.data.category);
        if (data.data.priority) setPriority(data.data.priority);
      }
    } catch (err) {
      console.error('AI Triage failed:', err);
    } finally {
      setIsTriaging(false);
    }
  };

  // Submit Complaint to Server & PostgreSQL
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim() || !citizenName.trim() || !citizenPhone.trim()) {
      setError('Please fill in all required fields (Title, Description, Name, and Phone Number).');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const res = await fetch('/api/complaints', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          description,
          ward: ward.replace(/ \(Ward \d+\)/, ''),
          locationAddress: locationAddress || `${ward}, Negombo`,
          citizenName,
          citizenPhone,
          citizenEmail: citizenEmail || undefined,
          photoUrl: photoUrl || undefined,
          category: category !== 'Auto-Detect with AI' ? category : undefined,
          priority: priority !== 'auto' ? priority : undefined,
        }),
      });

      const data = await res.json();
      if (data.success && data.data) {
        setSubmittedComplaint(data.data);
        onComplaintCreated(data.data);
        try {
          confetti({
            particleCount: 100,
            spread: 80,
            origin: { y: 0.6 },
          });
        } catch (_) {}
      } else {
        setError(data.error || 'Failed to submit grievance. Please try again.');
      }
    } catch (err: any) {
      setError('Server connection error. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setLocationAddress('');
    setCategory('Auto-Detect with AI');
    setPriority('auto');
    setPhotoUrl('');
    setAiAnalysis(null);
    setSubmittedComplaint(null);
    setError(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden my-8">
        
        {/* Modal Top Header */}
        <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-teal-900 text-white p-6 sm:p-7 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-700/80 border border-emerald-500/40 text-amber-300 flex items-center justify-center shadow-md">
              <FileEdit className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-heading font-extrabold text-xl sm:text-2xl text-white tracking-tight">
                Submit Public Grievance
              </h2>
              <p className="text-xs text-emerald-200 font-medium">
                Direct Report to Councillor Sarooj Sattar & Negombo MC Engineering Unit
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-emerald-200 hover:text-white hover:bg-emerald-800/80 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 max-h-[75vh] overflow-y-auto space-y-6">
          
          {submittedComplaint ? (
            /* Success View */
            <div className="text-center py-6 space-y-5">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-2">
                <h3 className="font-heading font-extrabold text-2xl text-stone-900">
                  Grievance Lodged Successfully!
                </h3>
                <p className="text-sm text-stone-600 max-w-md mx-auto">
                  Your report has been assigned to the municipal dispatch desk. Councillor Sarooj Sattar and council engineers have been notified.
                </p>
              </div>

              {/* Reference Code Card */}
              <div className="bg-stone-100 border border-stone-300 rounded-2xl p-5 max-w-md mx-auto text-left space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">Tracking Code</span>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                    Status: Submitted
                  </span>
                </div>
                <div className="text-2xl font-mono font-extrabold text-emerald-800 tracking-wider">
                  {submittedComplaint.refCode}
                </div>
                <p className="text-xs text-stone-500">
                  Assigned Dept: <span className="font-semibold text-stone-800">{submittedComplaint.assignedDepartment}</span>
                </p>
                {submittedComplaint.councillorFeedback && (
                  <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 font-serif-quote italic">
                    &ldquo;{submittedComplaint.councillorFeedback}&rdquo;
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => {
                    onClose();
                    onViewTracker(submittedComplaint.refCode);
                  }}
                  className="w-full sm:w-auto px-6 py-3 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <span>Track in Live Status Portal</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={resetForm}
                  className="w-full sm:w-auto px-6 py-3 bg-stone-200 hover:bg-stone-300 text-stone-800 rounded-xl font-semibold text-sm transition-colors"
                >
                  Submit Another Issue
                </button>
              </div>
            </div>
          ) : (
            /* Submission Form */
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs font-semibold flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 shrink-0 text-red-500" />
                  <span>{error}</span>
                </div>
              )}

              {/* Issue Title */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider">
                  Issue Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Blocked drainage on St. Lazarus Road / Broken streetlight"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-stone-300 bg-stone-50 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-600 text-sm font-medium transition-all"
                />
              </div>

              {/* Ward & Location Address */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider">
                    Municipal Ward / Area <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={ward}
                    onChange={(e) => setWard(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-stone-300 bg-stone-50 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-600 text-sm font-semibold text-stone-800"
                  >
                    {NEGOMBO_WARDS.map((w) => (
                      <option key={w} value={w}>
                        {w}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider">
                    Exact Street Address / Landmark
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 absolute left-3.5 top-3.5 text-stone-400" />
                    <input
                      type="text"
                      placeholder="e.g. Near House No. 42 / Mosque Junc"
                      value={locationAddress}
                      onChange={(e) => setLocationAddress(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-stone-300 bg-stone-50 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-600 text-sm font-medium"
                    />
                  </div>
                </div>
              </div>

              {/* Issue Description */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider">
                    Detailed Description <span className="text-red-500">*</span>
                  </label>
                  <button
                    type="button"
                    onClick={handleAiTriage}
                    disabled={isTriaging || !title || !description}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 hover:bg-emerald-200 text-emerald-900 text-xs font-bold transition-colors disabled:opacity-50"
                  >
                    {isTriaging ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin text-emerald-700" />
                    ) : (
                      <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                    )}
                    <span>{isTriaging ? 'Analyzing...' : 'Auto-Classify with AI'}</span>
                  </button>
                </div>
                <textarea
                  required
                  rows={4}
                  placeholder="Explain the problem in detail (Sinhala, Tamil, or English). How long has it persisted? How is it affecting the community?"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-stone-300 bg-stone-50 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-600 text-sm font-medium"
                />
              </div>

              {/* AI Triage Card if analyzed */}
              {aiAnalysis && (
                <div className="p-4 bg-emerald-50/90 border border-emerald-300 rounded-2xl space-y-2 text-xs text-emerald-950">
                  <div className="flex items-center justify-between">
                    <span className="font-bold flex items-center gap-1.5 text-emerald-900">
                      <Sparkles className="w-4 h-4 text-amber-600" />
                      <span>AI Triage & Department Mapping:</span>
                    </span>
                    <span className="font-extrabold uppercase px-2 py-0.5 rounded bg-emerald-200 text-emerald-900">
                      {aiAnalysis.priority} Priority
                    </span>
                  </div>
                  <p className="font-semibold text-stone-800">
                    {aiAnalysis.aiSummary}
                  </p>
                  <div className="pt-1 flex flex-wrap gap-3 text-stone-600">
                    <span>🏢 Assigned: <b>{aiAnalysis.assignedDepartment}</b></span>
                    <span>⏱️ Est. Turnaround: <b>{aiAnalysis.estimatedDays} days</b></span>
                  </div>
                </div>
              )}

              {/* Category & Urgency */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-stone-300 bg-stone-50 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-600 text-sm font-medium text-stone-800"
                  >
                    {COMPLAINT_CATEGORIES.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider">
                    Urgency Priority
                  </label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value as any)}
                    className="w-full px-4 py-3 rounded-xl border border-stone-300 bg-stone-50 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-600 text-sm font-medium text-stone-800"
                  >
                    <option value="auto">Auto-Detect by AI</option>
                    <option value="emergency">Emergency / Hazardous (Live wire, open sewer)</option>
                    <option value="high">High (Flooding, heavy pothole)</option>
                    <option value="medium">Medium (Streetlight, garbage delay)</option>
                    <option value="low">Low (General municipal query)</option>
                  </select>
                </div>
              </div>

              {/* Photo Evidence URL or Upload simulation */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider">
                  Photo Evidence URL (Optional)
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    placeholder="https://... (or select sample below)"
                    value={photoUrl}
                    onChange={(e) => setPhotoUrl(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-300 bg-stone-50 text-xs font-medium focus:bg-white focus:ring-2 focus:ring-emerald-600"
                  />
                  <button
                    type="button"
                    onClick={() => setPhotoUrl('https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=800&q=80')}
                    className="px-3 py-2 bg-stone-200 hover:bg-stone-300 rounded-xl text-xs font-bold text-stone-700 shrink-0"
                  >
                    Use Sample Photo
                  </button>
                </div>
                {photoUrl && (
                  <div className="mt-2 h-28 w-full rounded-xl overflow-hidden border border-stone-300 relative">
                    <img src={photoUrl} alt="Evidence Preview" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => setPhotoUrl('')}
                      className="absolute top-2 right-2 p-1 rounded-full bg-black/60 text-white hover:bg-black"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>

              {/* Citizen Contact Details */}
              <div className="p-4 bg-stone-100/80 rounded-2xl border border-stone-200 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-stone-800 uppercase tracking-wider">
                  <ShieldCheck className="w-4 h-4 text-emerald-700" />
                  <span>Citizen Contact Details (For SMS/Call Updates)</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-stone-600 mb-1">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Mohamed Fazil / Anthony Silva"
                      value={citizenName}
                      onChange={(e) => setCitizenName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 bg-white text-xs font-semibold"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-stone-600 mb-1">
                      Mobile Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 0771234567"
                      value={citizenPhone}
                      onChange={(e) => setCitizenPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 bg-white text-xs font-semibold"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-stone-600 mb-1">
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    placeholder="e.g. citizen@gmail.com"
                    value={citizenEmail}
                    onChange={(e) => setCitizenEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 bg-white text-xs font-medium"
                  />
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-900 hover:from-emerald-900 hover:to-teal-950 text-white font-extrabold text-base shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 active:scale-98 disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Submitting to Negombo MC & PostgreSQL...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-5 h-5 text-amber-300" />
                      <span>Submit Grievance to Councillor Sarooj Sattar</span>
                    </>
                  )}
                </button>
              </div>

            </form>
          )}

        </div>

      </div>
    </div>
  );
};
