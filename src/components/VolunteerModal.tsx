import React, { useState } from 'react';
import { 
  X, 
  Users, 
  Heart, 
  Sparkles, 
  Award, 
  CheckCircle2, 
  UserPlus, 
  MapPin, 
  Phone, 
  Mail,
  Loader2 
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface VolunteerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VolunteerModal: React.FC<VolunteerModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'roster' | 'join'>('roster');
  
  // Volunteer Join Form
  const [name, setName] = useState('');
  const [ward, setWard] = useState('Periyamulla (Ward 5)');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [interest, setInterest] = useState('Flood Relief & Drainage Taskforce');
  const [loading, setLoading] = useState(false);
  const [joinedSuccess, setJoinedSuccess] = useState(false);

  if (!isOpen) return null;

  const leaders = [
    {
      name: 'Mohamed Rameez',
      role: 'Ward 5 Community Coordinator',
      ward: 'Periyamulla',
      badge: 'Senior Organizer',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      projects: 'Drainage clearing & Youth Sports',
    },
    {
      name: 'Sanduni Fernando',
      role: 'Women & Elder Care Lead',
      ward: 'Dalupotha',
      badge: 'Welfare Champion',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
      projects: 'Medical Camps & Nutrition programs',
    },
    {
      name: 'Kavinda Perera',
      role: 'Youth Infrastructure Action Force',
      ward: 'Kochchikade',
      badge: 'Public Works Volunteer',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
      projects: 'Streetlight restoration & Road safety',
    },
    {
      name: 'Fatima Nusrath',
      role: 'Sanitation & Green Negombo Lead',
      ward: 'Sea Street',
      badge: 'Eco Ambassador',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      projects: 'Beach Cleanups & Lagoon Preservation',
    },
  ];

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setJoinedSuccess(true);
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.7 },
        });
      } catch (_) {}
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden my-8 max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-800 via-teal-700 to-emerald-950 text-white p-6 sm:p-7 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-teal-900/80 border border-teal-400/40 text-amber-300 flex items-center justify-center shadow-md">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-heading font-extrabold text-xl sm:text-2xl text-white tracking-tight">
                Community Members & Volunteers
              </h2>
              <p className="text-xs text-teal-200 font-medium">
                Active Ward Organizers & Civic Action Taskforce
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-teal-200 hover:text-white hover:bg-teal-800/80 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="p-4 bg-stone-50 border-b border-stone-200 flex items-center gap-2 shrink-0">
          <button
            onClick={() => setActiveTab('roster')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'roster'
                ? 'bg-teal-700 text-white shadow-xs'
                : 'bg-white text-stone-700 hover:bg-stone-200 border border-stone-200'
            }`}
          >
            Ward Leaders & Active Roster
          </button>
          <button
            onClick={() => setActiveTab('join')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'join'
                ? 'bg-teal-700 text-white shadow-xs'
                : 'bg-white text-stone-700 hover:bg-stone-200 border border-stone-200'
            }`}
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>Join Action Force</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8">
          {activeTab === 'roster' ? (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-heading font-extrabold text-stone-900 text-lg">
                    Ward Representatives & Committee Organizers
                  </h3>
                  <p className="text-xs text-stone-500">
                    Dedicated citizens leading grassroots relief and development works across Negombo.
                  </p>
                </div>

                <button
                  onClick={() => setActiveTab('join')}
                  className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-stone-950 rounded-xl text-xs font-bold shadow-xs transition-colors"
                >
                  + Volunteer With Us
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {leaders.map((l) => (
                  <div
                    key={l.name}
                    className="p-5 rounded-2xl border border-stone-200 bg-white hover:border-teal-300 hover:shadow-md transition-all flex items-start gap-4"
                  >
                    <img
                      src={l.avatar}
                      alt={l.name}
                      className="w-14 h-14 rounded-2xl object-cover border-2 border-teal-600/30 shrink-0"
                    />

                    <div className="space-y-1 flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-heading font-bold text-stone-900 text-base">
                          {l.name}
                        </h4>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-teal-100 text-teal-800">
                          {l.badge}
                        </span>
                      </div>

                      <p className="text-xs font-semibold text-teal-700">
                        {l.role} ({l.ward})
                      </p>

                      <p className="text-[11px] text-stone-500">
                        Focus: {l.projects}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="max-w-xl mx-auto space-y-5">
              {joinedSuccess ? (
                <div className="text-center py-8 space-y-4 bg-teal-50 rounded-2xl p-6 border border-teal-200">
                  <div className="w-14 h-14 bg-teal-600 text-white rounded-full flex items-center justify-center mx-auto shadow-md">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-heading font-extrabold text-2xl text-stone-900">
                    Welcome to the Sarooj Sattar Action Force!
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto">
                    Thank you, <b>{name}</b>. Our Ward Coordinator will contact you via WhatsApp to induct you into the volunteer corps.
                  </p>
                  <button
                    onClick={() => { setJoinedSuccess(false); setActiveTab('roster'); }}
                    className="px-6 py-2.5 bg-teal-800 text-white rounded-xl text-xs font-bold hover:bg-teal-900"
                  >
                    View Community Roster
                  </button>
                </div>
              ) : (
                <form onSubmit={handleJoin} className="space-y-4">
                  <div>
                    <h3 className="font-heading font-extrabold text-stone-900 text-xl">
                      Volunteer Registration
                    </h3>
                    <p className="text-xs text-stone-500">
                      Join Councillor Sarooj Sattar&apos;s youth and community volunteer taskforce.
                    </p>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider">
                      Your Full Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Mohamed Fazil"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-300 bg-stone-50 text-xs font-semibold focus:bg-white focus:ring-2 focus:ring-teal-600"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider">
                        Your Ward
                      </label>
                      <select
                        value={ward}
                        onChange={(e) => setWard(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-stone-300 bg-stone-50 text-xs font-semibold"
                      >
                        <option value="Periyamulla (Ward 5)">Periyamulla (Ward 5)</option>
                        <option value="Dalupotha (Ward 6)">Dalupotha (Ward 6)</option>
                        <option value="Kochchikade">Kochchikade</option>
                        <option value="Sea Street">Sea Street</option>
                        <option value="Munnakkara">Munnakkara</option>
                        <option value="Pitipana">Pitipana</option>
                        <option value="Kurana">Kurana</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider">
                        WhatsApp Number
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="077xxxxxxx"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-stone-300 bg-stone-50 text-xs font-semibold focus:bg-white"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider">
                      Area of Interest
                    </label>
                    <select
                      value={interest}
                      onChange={(e) => setInterest(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-300 bg-stone-50 text-xs font-semibold"
                    >
                      <option value="Flood Relief & Drainage Taskforce">Flood Relief & Drainage Taskforce</option>
                      <option value="Community Medical Camps & Elder Care">Community Medical Camps & Elder Care</option>
                      <option value="Youth Sports, IT & Career Guidance">Youth Sports, IT & Career Guidance</option>
                      <option value="Clean Negombo Beach & Green Drives">Clean Negombo Beach & Green Drives</option>
                      <option value="Grievance Field Verification">Grievance Field Verification</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 bg-gradient-to-r from-teal-800 to-teal-900 text-white rounded-xl text-sm font-extrabold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
                  >
                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4 text-amber-300" />}
                    <span>Register as Community Volunteer</span>
                  </button>
                </form>
              )}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
