import React, { useState } from 'react';
import { 
  X, 
  HardHat, 
  CheckCircle2, 
  Clock, 
  Building2, 
  MapPin, 
  Coins, 
  Calendar, 
  Sparkles,
  Search,
  SlidersHorizontal
} from 'lucide-react';
import type { CommunityProject } from '../types.js';

interface ProjectsModalProps {
  isOpen: boolean;
  onClose: () => void;
  projects: CommunityProject[];
}

export const ProjectsModal: React.FC<ProjectsModalProps> = ({
  isOpen,
  onClose,
  projects,
}) => {
  const [filterStatus, setFilterStatus] = useState<'all' | 'ongoing' | 'completed' | 'planning'>('all');
  const [selectedWard, setSelectedWard] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  const filteredProjects = projects.filter((p) => {
    if (filterStatus !== 'all' && p.status !== filterStatus) return false;
    if (selectedWard !== 'all' && !p.ward.toLowerCase().includes(selectedWard.toLowerCase())) return false;
    if (searchTerm.trim()) {
      const s = searchTerm.toLowerCase();
      const match = p.title.toLowerCase().includes(s) ||
                    p.description.toLowerCase().includes(s) ||
                    p.ward.toLowerCase().includes(s) ||
                    p.category.toLowerCase().includes(s);
      if (!match) return false;
    }
    return true;
  });

  const formatLKR = (amount: number) => {
    return new Intl.NumberFormat('en-LK', {
      style: 'currency',
      currency: 'LKR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden my-8 max-h-[90vh] flex flex-col">
        
        {/* Modal Top Header */}
        <div className="bg-gradient-to-r from-amber-700 via-amber-600 to-amber-800 text-white p-6 sm:p-7 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-800/80 border border-amber-400/40 text-amber-200 flex items-center justify-center shadow-md">
              <HardHat className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-heading font-extrabold text-xl sm:text-2xl text-white tracking-tight">
                Community Infrastructure Projects
              </h2>
              <p className="text-xs text-amber-100 font-medium">
                Public Works, Roads, Sanitation & Solar Development in Negombo
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-amber-100 hover:text-white hover:bg-amber-800/80 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Filters Bar */}
        <div className="p-4 sm:p-5 bg-stone-50 border-b border-stone-200 shrink-0 space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
            
            {/* Status Pills */}
            <div className="sm:col-span-6 flex flex-wrap items-center gap-1.5">
              {(['all', 'ongoing', 'completed', 'planning'] as const).map((status) => (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold capitalize transition-all ${
                    filterStatus === status
                      ? 'bg-amber-600 text-white shadow-xs'
                      : 'bg-white text-stone-700 hover:bg-stone-200 border border-stone-200'
                  }`}
                >
                  {status === 'all' ? 'All Projects' : status}
                </button>
              ))}
            </div>

            {/* Ward Selector */}
            <div className="sm:col-span-3">
              <select
                value={selectedWard}
                onChange={(e) => setSelectedWard(e.target.value)}
                className="w-full px-3 py-1.5 rounded-xl border border-stone-300 bg-white text-xs font-medium text-stone-800 focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
              >
                <option value="all">All Wards</option>
                <option value="Periyamulla">Periyamulla</option>
                <option value="Dalupotha">Dalupotha</option>
                <option value="Munnakkara">Munnakkara</option>
                <option value="Kochchikade">Kochchikade</option>
              </select>
            </div>

            {/* Search */}
            <div className="sm:col-span-3 relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-stone-400" />
              <input
                type="text"
                placeholder="Search project..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 rounded-xl border border-stone-300 bg-white text-xs font-medium focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
              />
            </div>

          </div>
        </div>

        {/* Projects Cards List */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
          {filteredProjects.length === 0 ? (
            <div className="text-center py-12 text-stone-400">
              <HardHat className="w-12 h-12 mx-auto text-stone-300 mb-2" />
              <p className="font-semibold text-sm">No projects matching your selection.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredProjects.map((p) => (
                <div
                  key={p.id}
                  className="bg-white rounded-2xl border border-stone-200 shadow-xs hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between group"
                >
                  <div>
                    {/* Project Image Banner */}
                    <div className="relative h-48 w-full overflow-hidden bg-stone-900">
                      <img
                        src={p.imageUrl}
                        alt={p.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3 bg-stone-950/80 backdrop-blur-xs text-white text-[11px] font-bold px-2.5 py-1 rounded-lg">
                        {p.category}
                      </div>

                      <div className="absolute top-3 right-3">
                        <span className={`text-[11px] font-black uppercase px-2.5 py-1 rounded-lg ${
                          p.status === 'completed'
                            ? 'bg-emerald-600 text-white'
                            : 'bg-amber-500 text-stone-950'
                        }`}>
                          {p.status}
                        </span>
                      </div>

                      <div className="absolute bottom-2 left-3 text-white text-xs font-semibold flex items-center gap-1 drop-shadow-md">
                        <MapPin className="w-3.5 h-3.5 text-amber-400" />
                        <span>{p.ward}</span>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-5 space-y-3">
                      <h3 className="font-heading font-extrabold text-stone-900 text-lg leading-snug group-hover:text-amber-800 transition-colors">
                        {p.title}
                      </h3>

                      <p className="text-xs text-stone-600 leading-relaxed">
                        {p.description}
                      </p>

                      {/* Progress Bar */}
                      <div className="space-y-1 pt-1">
                        <div className="flex items-center justify-between text-xs font-bold">
                          <span className="text-stone-700">Completion</span>
                          <span className="text-amber-700 font-extrabold">{p.progressPercentage}%</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-stone-100 overflow-hidden border border-stone-200">
                          <div
                            className="h-full bg-gradient-to-r from-amber-500 to-amber-600 rounded-full"
                            style={{ width: `${p.progressPercentage}%` }}
                          />
                        </div>
                      </div>

                      {/* Key Highlights */}
                      {p.highlights && p.highlights.length > 0 && (
                        <div className="p-3 bg-stone-50 rounded-xl space-y-1.5 border border-stone-100 text-xs">
                          <span className="font-bold text-stone-700 block text-[11px] uppercase tracking-wider">
                            Key Milestones:
                          </span>
                          <ul className="space-y-1">
                            {p.highlights.map((h, i) => (
                              <li key={i} className="flex items-center gap-1.5 text-stone-600">
                                <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                                <span className="truncate">{h}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Financial & Contractor Details */}
                  <div className="p-5 pt-3 border-t border-stone-100 bg-stone-50/60 flex flex-wrap items-center justify-between gap-2 text-xs">
                    <div>
                      <span className="text-stone-400 block text-[10px]">Total Fund Allocation</span>
                      <span className="font-mono font-bold text-stone-900">{formatLKR(p.budgetLKR)}</span>
                    </div>

                    <div className="text-right">
                      <span className="text-stone-400 block text-[10px]">Timeline</span>
                      <span className="font-semibold text-stone-700">{p.startDate} → {p.expectedEndDate}</span>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
