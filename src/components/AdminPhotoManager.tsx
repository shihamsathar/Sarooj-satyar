import React, { useState, useRef } from 'react';
import { 
  Upload, 
  Image as ImageIcon, 
  Trash2, 
  Eye, 
  CheckCircle2, 
  Sparkles, 
  Sliders, 
  Layers, 
  UserCheck, 
  Plus, 
  X, 
  AlertCircle,
  RefreshCw,
  FolderPlus,
  Compass,
  Building,
  HelpCircle
} from 'lucide-react';
import type { AppPhotoConfig, CustomGalleryItem } from '../types.js';

interface AdminPhotoManagerProps {
  photoConfig: AppPhotoConfig;
  onUpdateConfig: (newConfig: AppPhotoConfig) => Promise<void>;
}

const PRESET_BACKGROUNDS = [
  {
    name: 'Negombo Coastal Sunset & Lagoon',
    url: 'https://images.unsplash.com/photo-1588258524675-c6328325a666?auto=format&fit=crop&w=1600&q=80',
  },
  {
    name: 'Municipal Town Hall & Colonial Heritage',
    url: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1600&q=80',
  },
  {
    name: 'Sri Lankan Civic Architecture',
    url: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1600&q=80',
  },
  {
    name: 'Periyamulla Community Gathering',
    url: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1600&q=80',
  },
];

export const AdminPhotoManager: React.FC<AdminPhotoManagerProps> = ({
  photoConfig,
  onUpdateConfig,
}) => {
  const [config, setConfig] = useState<AppPhotoConfig>(photoConfig);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState<string | null>(null);
  const [activeSubTab, setActiveSubTab] = useState<'background' | 'portrait' | 'gallery' | 'project'>('background');

  // File input refs for click triggers
  const bgFileInputRef = useRef<HTMLInputElement>(null);
  const portraitFileInputRef = useRef<HTMLInputElement>(null);
  const galleryFileInputRef = useRef<HTMLInputElement>(null);
  const projectFileInputRef = useRef<HTMLInputElement>(null);

  // Drag states
  const [isDraggingBg, setIsDraggingBg] = useState(false);
  const [isDraggingPortrait, setIsDraggingPortrait] = useState(false);
  const [isDraggingProject, setIsDraggingProject] = useState(false);
  const [isDraggingGallery, setIsDraggingGallery] = useState(false);

  // New gallery photo state
  const [newGalleryPhoto, setNewGalleryPhoto] = useState<Partial<CustomGalleryItem>>({
    title: '',
    titleTa: '',
    titleSi: '',
    category: 'Meetings',
    location: 'Periyamulla Ward 05',
    date: 'September 2026',
    photoUrl: '',
    caption: '',
    impact: '',
  });

  // Convert File to Base64 and upload or set URL
  const handleFileProcess = async (file: File, slot: 'background' | 'portrait' | 'project' | 'gallery') => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file (JPEG, PNG, WebP).');
      return;
    }

    // Read as Data URL
    const reader = new FileReader();
    reader.onload = async (e) => {
      const dataUrl = e.target?.result as string;
      if (!dataUrl) return;

      try {
        // Try uploading to server
        const res = await fetch('/api/photos/upload', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ dataUrl, filename: file.name, slot }),
        });
        const data = await res.json();
        const finalUrl = (data.success && data.url) ? data.url : dataUrl;

        if (slot === 'background') {
          setConfig((prev) => ({
            ...prev,
            background: { ...prev.background, url: finalUrl, enabled: true },
          }));
        } else if (slot === 'portrait') {
          setConfig((prev) => ({
            ...prev,
            portrait: { ...prev.portrait, url: finalUrl, enabled: true },
          }));
        } else if (slot === 'project') {
          setConfig((prev) => ({
            ...prev,
            ongoingProject: { ...prev.ongoingProject, url: finalUrl },
          }));
        } else if (slot === 'gallery') {
          setNewGalleryPhoto((prev) => ({ ...prev, photoUrl: finalUrl }));
        }
      } catch (err) {
        // Fallback to dataUrl directly
        if (slot === 'background') {
          setConfig((prev) => ({
            ...prev,
            background: { ...prev.background, url: dataUrl, enabled: true },
          }));
        } else if (slot === 'portrait') {
          setConfig((prev) => ({
            ...prev,
            portrait: { ...prev.portrait, url: dataUrl, enabled: true },
          }));
        } else if (slot === 'project') {
          setConfig((prev) => ({
            ...prev,
            ongoingProject: { ...prev.ongoingProject, url: dataUrl },
          }));
        } else if (slot === 'gallery') {
          setNewGalleryPhoto((prev) => ({ ...prev, photoUrl: dataUrl }));
        }
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSaveAll = async () => {
    setSaving(true);
    setSaveSuccess(null);
    try {
      await onUpdateConfig(config);
      setSaveSuccess('Photo slots and background configuration saved and published live!');
      setTimeout(() => setSaveSuccess(null), 4000);
    } catch (err: any) {
      alert('Failed to save photo configuration: ' + (err.message || err));
    } finally {
      setSaving(false);
    }
  };

  const handleAddGalleryItem = () => {
    if (!newGalleryPhoto.title || !newGalleryPhoto.photoUrl) {
      alert('Please provide both a Title and a Photo for the new civic gallery entry.');
      return;
    }

    const newItem: CustomGalleryItem = {
      id: 'gallery_' + Date.now(),
      title: newGalleryPhoto.title || 'Community Field Work',
      titleTa: newGalleryPhoto.titleTa || newGalleryPhoto.title || '',
      titleSi: newGalleryPhoto.titleSi || newGalleryPhoto.title || '',
      category: newGalleryPhoto.category as any || 'Meetings',
      location: newGalleryPhoto.location || 'Periyamulla Ward 05',
      date: newGalleryPhoto.date || 'September 2026',
      photoUrl: newGalleryPhoto.photoUrl || '',
      caption: newGalleryPhoto.caption || 'Field inspection conducted by Councillor Sarooj Sattar with neighborhood citizens.',
      impact: newGalleryPhoto.impact || 'Immediate action initiated by the Negombo Municipal Council.',
    };

    setConfig((prev) => ({
      ...prev,
      customGalleryItems: [newItem, ...(prev.customGalleryItems || [])],
    }));

    // Reset form
    setNewGalleryPhoto({
      title: '',
      titleTa: '',
      titleSi: '',
      category: 'Meetings',
      location: 'Periyamulla Ward 05',
      date: 'September 2026',
      photoUrl: '',
      caption: '',
      impact: '',
    });
  };

  const handleRemoveGalleryItem = (id: string) => {
    setConfig((prev) => ({
      ...prev,
      customGalleryItems: prev.customGalleryItems.filter((i) => i.id !== id),
    }));
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner Explaining Admin Exclusivity */}
      <div className="p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 via-amber-400/5 to-emerald-500/10 border-2 border-amber-400/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3.5">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-400 text-stone-950 flex items-center justify-center shrink-0 shadow-sm font-bold">
            <Sparkles className="w-5 h-5 text-stone-950" />
          </div>
          <div>
            <h3 className="font-heading font-black text-stone-900 text-sm sm:text-base">
              Admin Media & Photo Slots Manager
            </h3>
            <p className="text-xs text-stone-600 mt-0.5">
              Upload authentic photos for the <strong>App Background</strong>, <strong>Councillor Portrait</strong>, <strong>Ongoing Projects</strong>, and <strong>Civic Gallery</strong>.
              <span className="block text-emerald-800 font-bold mt-1">
                🔒 Public notice: Photo upload buttons are strictly restricted to this Admin Dashboard. Regular citizens will view the photos online without any edit controls.
              </span>
            </p>
          </div>
        </div>

        <button
          onClick={handleSaveAll}
          disabled={saving}
          className="w-full sm:w-auto justify-center px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-800 to-teal-900 hover:from-emerald-900 hover:to-teal-950 text-white font-black text-xs shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer shrink-0 disabled:opacity-50 min-h-[44px]"
        >
          {saving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4 text-amber-300" />}
          <span>{saving ? 'Publishing...' : 'Save & Publish Live'}</span>
        </button>
      </div>

      {saveSuccess && (
        <div className="p-3.5 rounded-xl bg-emerald-100 border border-emerald-400 text-emerald-900 text-xs font-bold flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
          <span>{saveSuccess}</span>
        </div>
      )}

      {/* Sub-tab Navigation */}
      <div className="flex items-center gap-1.5 sm:gap-2 border-b border-stone-200 pb-2 overflow-x-auto no-scrollbar text-xs font-bold touch-pan-x px-0.5">
        <button
          onClick={() => setActiveSubTab('background')}
          className={`px-3 sm:px-3.5 py-2 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer shrink-0 min-h-[40px] ${
            activeSubTab === 'background'
              ? 'bg-amber-400 text-stone-950 shadow-xs border border-amber-300'
              : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>App Background Photo ({config.background.enabled && config.background.url ? 'Active' : 'Default'})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('portrait')}
          className={`px-3 sm:px-3.5 py-2 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer shrink-0 min-h-[40px] ${
            activeSubTab === 'portrait'
              ? 'bg-amber-400 text-stone-950 shadow-xs border border-amber-300'
              : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
          }`}
        >
          <UserCheck className="w-4 h-4" />
          <span>Councillor Portrait ({config.portrait.enabled && config.portrait.url ? 'Custom' : 'Vector Emblem'})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('gallery')}
          className={`px-3 sm:px-3.5 py-2 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer shrink-0 min-h-[40px] ${
            activeSubTab === 'gallery'
              ? 'bg-amber-400 text-stone-950 shadow-xs border border-amber-300'
              : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
          }`}
        >
          <FolderPlus className="w-4 h-4" />
          <span>Civic Gallery Slots ({config.customGalleryItems?.length || 0} Custom)</span>
        </button>

        <button
          onClick={() => setActiveSubTab('project')}
          className={`px-3 sm:px-3.5 py-2 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer shrink-0 min-h-[40px] ${
            activeSubTab === 'project'
              ? 'bg-amber-400 text-stone-950 shadow-xs border border-amber-300'
              : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
          }`}
        >
          <Building className="w-4 h-4" />
          <span>Ongoing Project Slot</span>
        </button>
      </div>

      {/* ==================================================================== */}
      {/* 1. APP BACKGROUND PHOTO SLOT                                         */}
      {/* ==================================================================== */}
      {activeSubTab === 'background' && (
        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h4 className="font-heading font-extrabold text-stone-900 text-sm flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-amber-600" />
                <span>App Background Photo Slot</span>
              </h4>
              <p className="text-xs text-stone-500 mt-0.5">
                Set a custom background image for the app. The image will be softly layered with opacity controls to keep text 100% legible.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={config.background.enabled}
                  onChange={(e) =>
                    setConfig((prev) => ({
                      ...prev,
                      background: { ...prev.background, enabled: e.target.checked },
                    }))
                  }
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-stone-200 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-700"></div>
                <span className="ml-2 text-xs font-bold text-stone-700">
                  {config.background.enabled ? 'Enabled' : 'Disabled'}
                </span>
              </label>
            </div>
          </div>

          {/* Upload Dropzone (Supports both drag & drop and click selection) */}
          <input
            ref={bgFileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                handleFileProcess(e.target.files[0], 'background');
              }
            }}
          />

          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsDraggingBg(true);
            }}
            onDragLeave={() => setIsDraggingBg(false)}
            onDrop={(e) => {
              e.preventDefault();
              setIsDraggingBg(false);
              if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                handleFileProcess(e.dataTransfer.files[0], 'background');
              }
            }}
            onClick={() => bgFileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all ${
              isDraggingBg
                ? 'border-amber-500 bg-amber-50/70 scale-[1.01]'
                : 'border-stone-300 hover:border-amber-400 bg-stone-50 hover:bg-amber-50/30'
            }`}
          >
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center mx-auto mb-2 shadow-xs">
              <Upload className="w-6 h-6" />
            </div>
            <p className="text-xs font-bold text-stone-800">
              Drag & Drop your Background Image here, or click to browse
            </p>
            <p className="text-[11px] text-stone-500 mt-1">
              Supports JPEG, PNG, WebP (high resolution recommended, e.g. 1920×1080)
            </p>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                bgFileInputRef.current?.click();
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 text-xs font-black shadow-xs transition-all cursor-pointer mt-3"
            >
              <Upload className="w-4 h-4" />
              <span>+ Select Background Photo</span>
            </button>
          </div>

          {/* Or Paste Direct Image URL */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-stone-700 block">
              Or Paste Direct Background Image URL:
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="https://example.com/negombo-backdrop.jpg"
                value={config.background.url}
                onChange={(e) =>
                  setConfig((prev) => ({
                    ...prev,
                    background: { ...prev.background, url: e.target.value, enabled: true },
                  }))
                }
                className="flex-1 px-3.5 py-2 rounded-xl border border-stone-300 text-xs font-mono focus:ring-2 focus:ring-amber-400 focus:outline-hidden"
              />
              {config.background.url && (
                <button
                  type="button"
                  onClick={() =>
                    setConfig((prev) => ({
                      ...prev,
                      background: { ...prev.background, url: '', enabled: false },
                    }))
                  }
                  className="px-3 py-2 rounded-xl bg-red-100 text-red-700 hover:bg-red-200 text-xs font-bold transition-colors cursor-pointer"
                  title="Clear background photo"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Preset Negombo Backdrops */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-stone-700 block">
              Or Choose from Curated Negombo / Civic Presets:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {PRESET_BACKGROUNDS.map((p, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() =>
                    setConfig((prev) => ({
                      ...prev,
                      background: { ...prev.background, url: p.url, enabled: true },
                    }))
                  }
                  className={`p-2 rounded-xl border text-left text-xs font-semibold transition-all group overflow-hidden cursor-pointer ${
                    config.background.url === p.url
                      ? 'border-amber-500 bg-amber-50 ring-2 ring-amber-400'
                      : 'border-stone-200 hover:border-stone-400 bg-stone-50'
                  }`}
                >
                  <div className="h-14 w-full rounded-lg overflow-hidden bg-stone-200 mb-1.5 relative">
                    <img
                      src={p.url}
                      alt={p.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <span className="line-clamp-1 text-[11px] text-stone-800">{p.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Styling Controls: Opacity, Blur, Overlay Style, Scope */}
          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            {/* Opacity Slider */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-bold text-stone-700">
                <span>Backdrop Opacity</span>
                <span className="font-mono text-emerald-800">{Math.round(config.background.opacity * 100)}%</span>
              </div>
              <input
                type="range"
                min="0.05"
                max="0.85"
                step="0.05"
                value={config.background.opacity}
                onChange={(e) =>
                  setConfig((prev) => ({
                    ...prev,
                    background: { ...prev.background, opacity: parseFloat(e.target.value) },
                  }))
                }
                className="w-full accent-amber-500"
              />
              <span className="text-[10px] text-stone-500 block">
                Lower opacity keeps text crisp & high-contrast.
              </span>
            </div>

            {/* Scope (Hero or Entire App) */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-stone-700 block">
                Application Scope
              </label>
              <select
                value={config.background.scope}
                onChange={(e) =>
                  setConfig((prev) => ({
                    ...prev,
                    background: { ...prev.background, scope: e.target.value as any },
                  }))
                }
                className="w-full px-3 py-2 rounded-xl border border-stone-300 bg-white text-xs font-semibold focus:ring-2 focus:ring-amber-400 focus:outline-hidden"
              >
                <option value="hero">Hero Section Backdrop Only</option>
                <option value="entire_app">Entire App (Full-Page Canvas)</option>
              </select>
            </div>

            {/* Overlay Tone */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-stone-700 block">
                Atmospheric Gradient Blend
              </label>
              <select
                value={config.background.overlayStyle}
                onChange={(e) =>
                  setConfig((prev) => ({
                    ...prev,
                    background: { ...prev.background, overlayStyle: e.target.value as any },
                  }))
                }
                className="w-full px-3 py-2 rounded-xl border border-stone-300 bg-white text-xs font-semibold focus:ring-2 focus:ring-amber-400 focus:outline-hidden"
              >
                <option value="warm">Warm Amber Sunburst (Default)</option>
                <option value="emerald">Negombo Municipal Emerald</option>
                <option value="subtle">Subtle Off-White Civic</option>
                <option value="dark">Deep Dignitary Twilight</option>
              </select>
            </div>

          </div>

          {/* Background Live Preview Box */}
          {config.background.url && (
            <div className="space-y-1.5">
              <span className="text-xs font-bold text-stone-700 flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5 text-emerald-800" />
                <span>Background Preview:</span>
              </span>
              <div className="h-32 w-full rounded-2xl overflow-hidden border-2 border-stone-300 relative">
                <img
                  src={config.background.url}
                  alt="Background preview"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                  style={{ opacity: config.background.opacity }}
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 text-white text-xs font-bold p-2 text-center backdrop-blur-[1px]">
                  <span>Preview with {Math.round(config.background.opacity * 100)}% Opacity &amp; {config.background.overlayStyle} Blend</span>
                </div>
              </div>
            </div>
          )}

        </div>
      )}

      {/* ==================================================================== */}
      {/* 2. COUNCILLOR PORTRAIT PHOTO SLOT                                    */}
      {/* ==================================================================== */}
      {activeSubTab === 'portrait' && (
        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h4 className="font-heading font-extrabold text-stone-900 text-sm flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-emerald-700" />
                <span>Councillor Portrait Photo Slot</span>
              </h4>
              <p className="text-xs text-stone-500 mt-0.5">
                Add the official photograph of Councillor Sarooj Sattar. When enabled, this photo replaces or appears within the central dignitary card with golden borders and municipal seal.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={config.portrait.enabled}
                  onChange={(e) =>
                    setConfig((prev) => ({
                      ...prev,
                      portrait: { ...prev.portrait, enabled: e.target.checked },
                    }))
                  }
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-stone-200 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-700"></div>
                <span className="ml-2 text-xs font-bold text-stone-700">
                  {config.portrait.enabled ? 'Active Photo' : 'Vector Seal Mode'}
                </span>
              </label>
            </div>
          </div>

          <input
            ref={portraitFileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                handleFileProcess(e.target.files[0], 'portrait');
              }
            }}
          />

          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsDraggingPortrait(true);
            }}
            onDragLeave={() => setIsDraggingPortrait(false)}
            onDrop={(e) => {
              e.preventDefault();
              setIsDraggingPortrait(false);
              if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                handleFileProcess(e.dataTransfer.files[0], 'portrait');
              }
            }}
            onClick={() => portraitFileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all ${
              isDraggingPortrait
                ? 'border-emerald-500 bg-emerald-50/70 scale-[1.01]'
                : 'border-stone-300 hover:border-emerald-500 bg-stone-50 hover:bg-emerald-50/30'
            }`}
          >
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto mb-2 shadow-xs">
              <Upload className="w-6 h-6" />
            </div>
            <p className="text-xs font-bold text-stone-800">
              Drag &amp; Drop Councillor Sarooj Sattar portrait photo here, or click to browse
            </p>
            <p className="text-[11px] text-stone-500 mt-1">
              Supports portrait orientation photos (e.g. 800×1000 or square)
            </p>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                portraitFileInputRef.current?.click();
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-black shadow-xs transition-all cursor-pointer mt-3"
            >
              <Upload className="w-4 h-4 text-amber-300" />
              <span>+ Select Councillor Portrait Photo</span>
            </button>
          </div>

          {/* Or Paste Direct URL */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-stone-700 block">
              Or Enter Portrait Photo URL:
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="https://example.com/councillor-sarooj-portrait.jpg"
                value={config.portrait.url}
                onChange={(e) =>
                  setConfig((prev) => ({
                    ...prev,
                    portrait: { ...prev.portrait, url: e.target.value, enabled: true },
                  }))
                }
                className="flex-1 px-3.5 py-2 rounded-xl border border-stone-300 text-xs font-mono focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
              />
              {config.portrait.url && (
                <button
                  type="button"
                  onClick={() =>
                    setConfig((prev) => ({
                      ...prev,
                      portrait: { ...prev.portrait, url: '', enabled: false },
                    }))
                  }
                  className="px-3 py-2 rounded-xl bg-red-100 text-red-700 hover:bg-red-200 text-xs font-bold transition-colors cursor-pointer"
                  title="Remove portrait photo"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Portrait Preview */}
          {config.portrait.url && (
            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 flex items-center gap-4">
              <div className="w-20 h-24 rounded-xl overflow-hidden border-2 border-amber-400 shadow-md bg-stone-200 shrink-0">
                <img
                  src={config.portrait.url}
                  alt="Councillor Portrait"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-1 text-xs">
                <div className="font-bold text-stone-900">Active Councillor Portrait Slot</div>
                <div className="text-emerald-700 font-semibold">
                  Status: {config.portrait.enabled ? 'Displayed on Public Hero' : 'Disabled (Hidden)'}
                </div>
                <p className="text-[11px] text-stone-500">
                  Framed with official golden borders and municipal seal for authentic presentation.
                </p>
              </div>
            </div>
          )}

        </div>
      )}

      {/* ==================================================================== */}
      {/* 3. CIVIC GALLERY PHOTO SLOTS                                         */}
      {/* ==================================================================== */}
      {activeSubTab === 'gallery' && (
        <div className="space-y-5">
          
          {/* Add New Civic Photo Card Form */}
          <div className="bg-white p-5 rounded-2xl border-2 border-amber-400 shadow-md space-y-4">
            <h4 className="font-heading font-extrabold text-stone-900 text-sm flex items-center gap-2">
              <Plus className="w-4 h-4 text-amber-600" />
              <span>Add New Community Field Photo to Civic Gallery</span>
            </h4>

            {/* Photo Upload for Gallery */}
            <input
              ref={galleryFileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  handleFileProcess(e.target.files[0], 'gallery');
                }
              }}
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              {/* Photo selector / dropzone */}
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDraggingGallery(true);
                }}
                onDragLeave={() => setIsDraggingGallery(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setIsDraggingGallery(false);
                  if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                    handleFileProcess(e.dataTransfer.files[0], 'gallery');
                  }
                }}
                onClick={() => galleryFileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-xl p-4 text-center cursor-pointer transition-all flex flex-col items-center justify-center ${
                  newGalleryPhoto.photoUrl
                    ? 'border-emerald-500 bg-emerald-50/50'
                    : isDraggingGallery
                    ? 'border-amber-500 bg-amber-50'
                    : 'border-stone-300 hover:border-amber-400 bg-stone-50'
                }`}
              >
                {newGalleryPhoto.photoUrl ? (
                  <div className="relative w-full h-28 rounded-lg overflow-hidden border border-emerald-400">
                    <img
                      src={newGalleryPhoto.photoUrl}
                      alt="Uploaded preview"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 text-white flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity text-[10px] font-bold">
                      Click to change photo
                    </div>
                  </div>
                ) : (
                  <>
                    <Upload className="w-6 h-6 text-amber-600 mb-1" />
                    <span className="text-xs font-bold text-stone-800">Upload Photo</span>
                    <span className="text-[10px] text-stone-500">Drag file or click</span>
                  </>
                )}
              </div>

              {/* Photo details inputs */}
              <div className="md:col-span-2 space-y-3">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-bold text-stone-700 block mb-1">
                      Event / Photo Title (English) *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Ward 05 Drainage Inspection"
                      value={newGalleryPhoto.title}
                      onChange={(e) => setNewGalleryPhoto({ ...newGalleryPhoto, title: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-xl border border-stone-300 text-xs font-semibold focus:ring-2 focus:ring-amber-400 focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-stone-700 block mb-1">
                      Category *
                    </label>
                    <select
                      value={newGalleryPhoto.category}
                      onChange={(e) => setNewGalleryPhoto({ ...newGalleryPhoto, category: e.target.value as any })}
                      className="w-full px-3 py-1.5 rounded-xl border border-stone-300 bg-white text-xs font-semibold focus:ring-2 focus:ring-amber-400 focus:outline-hidden"
                    >
                      <option value="Meetings">Citizen Hearings &amp; Meetings</option>
                      <option value="Infrastructure">Roads &amp; Infrastructure</option>
                      <option value="Healthcare">Healthcare &amp; Sanitation</option>
                      <option value="Environment">Drainage &amp; Environment</option>
                      <option value="Youth">Youth &amp; Sports</option>
                      <option value="Community">Community Welfare</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-bold text-stone-700 block mb-1">
                      Location / Ward
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. St. Lazarus Road, Periyamulla"
                      value={newGalleryPhoto.location}
                      onChange={(e) => setNewGalleryPhoto({ ...newGalleryPhoto, location: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-xl border border-stone-300 text-xs font-semibold focus:ring-2 focus:ring-amber-400 focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-stone-700 block mb-1">
                      Date / Month
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. September 2026"
                      value={newGalleryPhoto.date}
                      onChange={(e) => setNewGalleryPhoto({ ...newGalleryPhoto, date: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-xl border border-stone-300 text-xs font-semibold focus:ring-2 focus:ring-amber-400 focus:outline-hidden"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-stone-700 block mb-1">
                    Description / What Happened
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Councillor Sarooj Sattar inspected the culvert widening work directly with local residents."
                    value={newGalleryPhoto.caption}
                    onChange={(e) => setNewGalleryPhoto({ ...newGalleryPhoto, caption: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-xl border border-stone-300 text-xs font-medium focus:ring-2 focus:ring-amber-400 focus:outline-hidden"
                  />
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 sm:gap-3 pt-1">
                  <input
                    type="text"
                    placeholder="Or paste Direct Image URL..."
                    value={newGalleryPhoto.photoUrl}
                    onChange={(e) => setNewGalleryPhoto({ ...newGalleryPhoto, photoUrl: e.target.value })}
                    className="flex-1 px-3 py-2 sm:py-1.5 rounded-xl border border-stone-200 text-xs font-mono focus:outline-hidden"
                  />

                  <button
                    type="button"
                    onClick={handleAddGalleryItem}
                    className="w-full sm:w-auto justify-center px-4 py-2.5 sm:py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 text-xs font-black shadow-xs transition-all flex items-center gap-1.5 cursor-pointer shrink-0 min-h-[42px] sm:min-h-auto"
                  >
                    <Plus className="w-3.5 h-3.5 stroke-[3]" />
                    <span>Add to Gallery</span>
                  </button>
                </div>

              </div>

            </div>
          </div>

          {/* List of Custom Gallery Photos Added */}
          <div className="space-y-3">
            <h4 className="font-heading font-extrabold text-stone-900 text-sm flex items-center justify-between">
              <span>Added Gallery Photos ({config.customGalleryItems?.length || 0})</span>
              <span className="text-[11px] text-stone-500 font-normal">Displayed live in Civic Gallery for all visitors</span>
            </h4>

            {(!config.customGalleryItems || config.customGalleryItems.length === 0) ? (
              <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200 text-center text-xs text-stone-500">
                No custom photos added yet. The standard civic milestone cards are displayed. Upload photos above to show Councillor Sarooj Sattar’s latest work!
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {config.customGalleryItems.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-2xs group flex flex-col justify-between"
                  >
                    <div className="h-32 w-full bg-stone-100 relative overflow-hidden">
                      <img
                        src={item.photoUrl}
                        alt={item.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                      <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-black/60 text-white text-[10px] font-bold">
                        {item.category}
                      </span>
                    </div>

                    <div className="p-3 space-y-1.5 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="text-xs font-bold text-stone-900 line-clamp-1">{item.title}</div>
                        <div className="text-[11px] text-stone-500">{item.location} • {item.date}</div>
                        <p className="text-[11px] text-stone-600 line-clamp-2 mt-1">{item.caption}</p>
                      </div>

                      <div className="pt-2 flex justify-end border-t border-stone-100">
                        <button
                          type="button"
                          onClick={() => handleRemoveGalleryItem(item.id)}
                          className="text-red-600 hover:text-red-800 text-[11px] font-bold flex items-center gap-1 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      )}

      {/* ==================================================================== */}
      {/* 4. ONGOING PROJECT PHOTO SLOT                                        */}
      {/* ==================================================================== */}
      {activeSubTab === 'project' && (
        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h4 className="font-heading font-extrabold text-stone-900 text-sm flex items-center gap-2">
                <Building className="w-4 h-4 text-amber-600" />
                <span>Ongoing Municipal Project Photo Slot</span>
              </h4>
              <p className="text-xs text-stone-500 mt-0.5">
                Upload a verified on-site photograph for the ongoing municipal work featured on the homepage (e.g., St. Lazarus Road / Periyamulla Drainage upgrade).
              </p>
            </div>
          </div>

          <input
            ref={projectFileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                handleFileProcess(e.target.files[0], 'project');
              }
            }}
          />

          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsDraggingProject(true);
            }}
            onDragLeave={() => setIsDraggingProject(false)}
            onDrop={(e) => {
              e.preventDefault();
              setIsDraggingProject(false);
              if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                handleFileProcess(e.dataTransfer.files[0], 'project');
              }
            }}
            onClick={() => projectFileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all ${
              isDraggingProject
                ? 'border-amber-500 bg-amber-50/70 scale-[1.01]'
                : 'border-stone-300 hover:border-amber-500 bg-stone-50 hover:bg-amber-50/30'
            }`}
          >
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center mx-auto mb-2 shadow-xs">
              <Upload className="w-6 h-6" />
            </div>
            <p className="text-xs font-bold text-stone-800">
              Drag &amp; Drop project site photo here, or click to browse
            </p>
            <p className="text-[11px] text-stone-500 mt-1">
              Supports landscape photos (e.g. 1200×800)
            </p>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                projectFileInputRef.current?.click();
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 text-xs font-black shadow-xs transition-all cursor-pointer mt-3"
            >
              <Upload className="w-4 h-4" />
              <span>+ Select Project Photo</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-stone-700 block mb-1">
                Project Title:
              </label>
              <input
                type="text"
                placeholder="e.g. Periyamulla St. Lazarus Road Asphalt Carpeting"
                value={config.ongoingProject.title || ''}
                onChange={(e) =>
                  setConfig((prev) => ({
                    ...prev,
                    ongoingProject: { ...prev.ongoingProject, title: e.target.value },
                  }))
                }
                className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs font-semibold focus:ring-2 focus:ring-amber-400 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-stone-700 block mb-1">
                Photo Caption / Update:
              </label>
              <input
                type="text"
                placeholder="e.g. Excavation and sub-base grading completed."
                value={config.ongoingProject.caption || ''}
                onChange={(e) =>
                  setConfig((prev) => ({
                    ...prev,
                    ongoingProject: { ...prev.ongoingProject, caption: e.target.value },
                  }))
                }
                className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs font-semibold focus:ring-2 focus:ring-amber-400 focus:outline-hidden"
              />
            </div>
          </div>

          {/* Direct URL input */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-stone-700 block">
              Or Paste Project Image URL:
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="https://example.com/project-site.jpg"
                value={config.ongoingProject.url}
                onChange={(e) =>
                  setConfig((prev) => ({
                    ...prev,
                    ongoingProject: { ...prev.ongoingProject, url: e.target.value },
                  }))
                }
                className="flex-1 px-3.5 py-2 rounded-xl border border-stone-300 text-xs font-mono focus:ring-2 focus:ring-amber-400 focus:outline-hidden"
              />
              {config.ongoingProject.url && (
                <button
                  type="button"
                  onClick={() =>
                    setConfig((prev) => ({
                      ...prev,
                      ongoingProject: { ...prev.ongoingProject, url: '' },
                    }))
                  }
                  className="px-3 py-2 rounded-xl bg-red-100 text-red-700 hover:bg-red-200 text-xs font-bold transition-colors cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {config.ongoingProject.url && (
            <div className="h-40 w-full rounded-2xl overflow-hidden border border-stone-300 relative bg-stone-100">
              <img
                src={config.ongoingProject.url}
                alt="Project preview"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-2 left-2 right-2 bg-black/70 text-white px-3 py-1.5 rounded-xl text-xs backdrop-blur-xs flex items-center justify-between">
                <span className="font-bold">{config.ongoingProject.title || 'Ongoing Municipal Project'}</span>
                <span className="text-[10px] text-amber-300 font-mono">Live On Public Site</span>
              </div>
            </div>
          )}

        </div>
      )}

      {/* Save Button Bar at Bottom */}
      <div className="pt-3 border-t border-stone-200 flex items-center justify-between">
        <div className="text-xs text-stone-500">
          Click <strong>Save &amp; Publish Live</strong> to make changes visible to everyone online.
        </div>

        <button
          onClick={handleSaveAll}
          disabled={saving}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-800 to-teal-900 hover:from-emerald-900 hover:to-teal-950 text-white font-black text-xs shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
        >
          {saving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4 text-amber-300" />}
          <span>{saving ? 'Publishing Updates...' : 'Save & Publish Live'}</span>
        </button>
      </div>

    </div>
  );
};
