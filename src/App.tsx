import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar.js';
import { HeroSection } from './components/HeroSection.js';
import { EightModulesGrid } from './components/EightModulesGrid.js';
import { CivicGallery } from './components/CivicGallery.js';
import { QuickContactAndOngoingProject } from './components/QuickContactAndOngoingProject.js';
import { NewsletterSubscribe } from './components/NewsletterSubscribe.js';
import { Footer } from './components/Footer.js';

// Modals
import { SubmitComplaintModal } from './components/SubmitComplaintModal.js';
import { ComplaintTrackerModal } from './components/ComplaintTrackerModal.js';
import { ProjectsModal } from './components/ProjectsModal.js';
import { AnnouncementsModal } from './components/AnnouncementsModal.js';
import { EmergencyModal } from './components/EmergencyModal.js';
import { VolunteerModal } from './components/VolunteerModal.js';
import { WhatsAppDirectModal } from './components/WhatsAppDirectModal.js';
import { MyProfileModal } from './components/MyProfileModal.js';
import { RenderDeploymentModal } from './components/RenderDeploymentModal.js';
import { AboutSaroojModal } from './components/AboutSaroojModal.js';
import { AiCivicChatbot } from './components/AiCivicChatbot.js';
import { AuthModal } from './components/AuthModal.js';
import { AdminDashboardModal } from './components/AdminDashboardModal.js';

import { 
  Home, 
  Search, 
  Plus, 
  AlertTriangle, 
  ShieldCheck, 
  User,
  MessageSquare
} from 'lucide-react';
import type { Complaint, CommunityProject, Announcement, AuthUser, AdminUser, AppPhotoConfig } from './types.js';
import type { Language } from './utils/translations.js';

export default function App() {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [projects, setProjects] = useState<CommunityProject[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [photoConfig, setPhotoConfig] = useState<AppPhotoConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [language, setLanguage] = useState<Language>('en');

  // Authentication State with local persistence
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(() => {
    try {
      const saved = localStorage.getItem('sarooj_community_auth_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [authModalInitialTab, setAuthModalInitialTab] = useState<'citizen' | 'admin'>('citizen');
  const [loggedOutNotice, setLoggedOutNotice] = useState<string | null>(null);
  const [adminInitialTab, setAdminInitialTab] = useState<'grievances' | 'announcements' | 'messages' | 'citizens' | 'security'>('grievances');

  // Active Modal State
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [trackerSearchCode, setTrackerSearchCode] = useState<string>('');

  // Sync with URL hashes for #login and #admin_login
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash === '#login' || hash === '#auth') {
        setAuthModalInitialTab('citizen');
        setActiveModal('auth_modal');
      } else if (hash === '#admin_login' || hash === '#admin') {
        setAuthModalInitialTab('admin');
        setActiveModal('auth_modal');
      } else if (hash === '#change_password' || hash === '#admin_security') {
        setAdminInitialTab('security');
        setActiveModal('admin_dashboard');
      }
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  // Fetch initial forum data & photo config from API / persistent storage
  const fetchData = async () => {
    try {
      const [cRes, pRes, aRes, photoRes] = await Promise.all([
        fetch('/api/complaints'),
        fetch('/api/projects'),
        fetch('/api/announcements'),
        fetch('/api/photos/config').catch(() => null),
      ]);

      const [cData, pData, aData] = await Promise.all([
        cRes.json(),
        pRes.json(),
        aRes.json(),
      ]);

      if (cData.success && cData.data) setComplaints(cData.data);
      if (pData.success && pData.data) setProjects(pData.data);
      if (aData.success && aData.data) setAnnouncements(aData.data);

      if (photoRes && photoRes.ok) {
        const photoData = await photoRes.json();
        if (photoData.success && photoData.data) {
          setPhotoConfig(photoData.data);
        }
      }
    } catch (e) {
      console.warn('Backend loading using local cache / initial mock data:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOpenLogin = (initialTab: 'citizen' | 'admin' = 'citizen') => {
    setAuthModalInitialTab(initialTab);
    setActiveModal('auth_modal');
  };

  const handleLoginSuccess = (user: AuthUser) => {
    setCurrentUser(user);
    setLoggedOutNotice(null);
    try {
      localStorage.setItem('sarooj_community_auth_user', JSON.stringify(user));
    } catch (e) {
      console.error('Failed to save session to localStorage:', e);
    }

    // Clean auth hashes from URL bar
    if (window.location.hash === '#login' || window.location.hash === '#admin_login' || window.location.hash === '#auth') {
      window.history.replaceState(null, '', window.location.pathname);
    }
    
    // If admin logged in, open the Admin Console immediately
    if (user.role === 'admin') {
      setActiveModal('admin_dashboard');
    } else {
      setActiveModal(null);
    }
  };

  const handleLogout = () => {
    const wasAdmin = currentUser?.role === 'admin';
    setCurrentUser(null);
    try {
      localStorage.removeItem('sarooj_community_auth_user');
    } catch (e) {
      console.error(e);
    }

    const targetTab: 'citizen' | 'admin' = wasAdmin ? 'admin' : 'citizen';
    setAuthModalInitialTab(targetTab);
    setLoggedOutNotice(
      wasAdmin
        ? 'Admin session ended. You have been returned to the Login Page.'
        : 'You have been logged out. You have been returned to the Login Page.'
    );
    // Explicitly return to the Login Page (Auth modal)
    setActiveModal('auth_modal');
    window.location.hash = targetTab === 'admin' ? '#admin_login' : '#login';
  };

  const handleOpenModule = (moduleId: string) => {
    switch (moduleId) {
      case 'submit_complaint':
        setActiveModal('submit_complaint');
        break;
      case 'my_complaints':
      case 'tracker':
        setActiveModal('my_complaints');
        break;
      case 'community_projects':
      case 'projects':
        setActiveModal('community_projects');
        break;
      case 'announcements':
      case 'notices':
        setActiveModal('announcements');
        break;
      case 'contact_sarooj':
      case 'whatsapp':
      case 'contact':
        setActiveModal('whatsapp');
        break;
      case 'emergency_contacts':
      case 'emergency':
        setActiveModal('emergency');
        break;
      case 'community_members':
      case 'volunteer':
        setActiveModal('volunteer');
        break;
      case 'my_profile':
        setActiveModal('my_profile');
        break;
      case 'render_blueprint':
        setActiveModal('render_blueprint');
        break;
      case 'about':
        setActiveModal('about');
        break;
      case 'auth':
      case 'login':
        handleOpenLogin('citizen');
        break;
      case 'admin_login':
        handleOpenLogin('admin');
        break;
      case 'admin_dashboard':
        if (currentUser?.role === 'admin') {
          setActiveModal('admin_dashboard');
        } else {
          handleOpenLogin('admin');
        }
        break;
      default:
        setActiveModal(moduleId);
        break;
    }
  };

  const handleComplaintCreated = (newComplaint: Complaint) => {
    setComplaints((prev) => [newComplaint, ...prev]);
  };

  const handleUpvoteComplaint = async (id: string) => {
    try {
      const res = await fetch(`/api/complaints/${id}/upvote`, { method: 'POST' });
      const data = await res.json();
      if (data.success && data.data) {
        setComplaints((prev) =>
          prev.map((c) => (c.id === id ? data.data : c))
        );
      }
    } catch (e) {
      console.error('Failed to upvote:', e);
    }
  };

  const handleUpdateStatus = async (
    id: string,
    status: Complaint['status'],
    councillorFeedback?: string,
    resolutionNote?: string
  ) => {
    try {
      const res = await fetch(`/api/complaints/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, councillorFeedback, resolutionNote }),
      });
      const data = await res.json();
      if (data.success && data.data) {
        setComplaints((prev) =>
          prev.map((c) => (c.id === id ? data.data : c))
        );
      }
    } catch (e) {
      console.error('Failed to update status:', e);
    }
  };

  const handleUpdatePhotoConfig = async (newConfig: AppPhotoConfig) => {
    try {
      const res = await fetch('/api/photos/config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newConfig),
      });
      const data = await res.json();
      if (data.success && data.data) {
        setPhotoConfig(data.data);
      } else {
        setPhotoConfig(newConfig);
      }
    } catch (e) {
      console.error('Failed to update photo config on server:', e);
      setPhotoConfig(newConfig);
    }
  };

  const ongoingProject = projects.find((p) => p.status === 'ongoing') || projects[0];

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-stone-900 selection:bg-amber-200 selection:text-stone-900 relative pb-16 sm:pb-0">
      
      {/* Clean Civic Ambient Background Layer */}
      <div className="fixed inset-0 pointer-events-none z-0 bg-gradient-to-b from-[#FFFDF9] via-[#FAF6EE] to-[#F7F2E7]" />
      
      {/* Dynamic App-Wide Background Photo (If Admin Enabled with 'entire_app' scope) */}
      {photoConfig?.background?.enabled && photoConfig?.background?.url && photoConfig?.background?.scope === 'entire_app' && (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          <img
            src={photoConfig.background.url}
            alt="Municipal Portal Background"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
            style={{
              opacity: photoConfig.background.opacity ?? 0.18,
              filter: photoConfig.background.blur ? `blur(${photoConfig.background.blur}px)` : undefined,
            }}
          />
          {photoConfig.background.overlayStyle === 'emerald' && (
            <div className="absolute inset-0 bg-emerald-950/20" />
          )}
          {photoConfig.background.overlayStyle === 'dark' && (
            <div className="absolute inset-0 bg-stone-950/30" />
          )}
          {photoConfig.background.overlayStyle === 'warm' && (
            <div className="absolute inset-0 bg-amber-900/10" />
          )}
        </div>
      )}

      {/* 1. Municipal Top Header & Navbar */}
      <Navbar
        onOpenModule={handleOpenModule}
        unreadCount={announcements.filter((a) => a.priority === 'high').length || 3}
        language={language}
        onLanguageChange={setLanguage}
        currentUser={currentUser}
        onOpenLogin={handleOpenLogin}
        onOpenAdminDashboard={(tab) => {
          setAdminInitialTab(tab || 'grievances');
          setActiveModal('admin_dashboard');
        }}
        onLogout={handleLogout}
      />

      {/* 2. Hero Section with verified portrait, tri-lingual switcher & voice audio */}
      <HeroSection
        language={language}
        onLanguageChange={setLanguage}
        onBuildCommunityClick={() => handleOpenModule('submit_complaint')}
        onExploreProjectsClick={() => handleOpenModule('community_projects')}
        photoConfig={photoConfig || undefined}
      />

      {/* 3. 8-Card Interactive Service Grid matching reference mockup */}
      <EightModulesGrid
        onSelectModule={handleOpenModule}
        complaintCount={complaints.length}
        projectCount={projects.length}
        announcementCount={announcements.length}
        memberCount={18}
        language={language}
      />

      {/* 4. Civic Photo Gallery & Ground Reality Documentation */}
      <CivicGallery
        onOpenSubmitModal={() => handleOpenModule('submit_complaint')}
        onOpenContactModal={() => handleOpenModule('whatsapp')}
        language={language}
        customGalleryItems={photoConfig?.customGalleryItems}
      />

      {/* 5. Quick Contact & Ongoing Project Section */}
      <QuickContactAndOngoingProject
        ongoingProject={ongoingProject}
        onViewAllProjects={() => handleOpenModule('community_projects')}
        onOpenContactForm={() => handleOpenModule('whatsapp')}
        language={language}
        projectPhotoUrl={photoConfig?.ongoingProject?.url}
      />

      {/* 6. Stay Connected Newsletter Subscription */}
      <NewsletterSubscribe language={language} />

      {/* 7. Municipal Footer */}
      <Footer onOpenModule={handleOpenModule} language={language} />

      {/* 8. Floating AI Civic Assistant powered by Gemini */}
      <AiCivicChatbot onOpenModule={handleOpenModule} language={language} />

      {/* 9. Mobile Bottom Quick Action Navigation Bar (Smartphones only) */}
      <nav className="sm:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-stone-200 px-3 py-1.5 shadow-[0_-4px_16px_rgba(0,0,0,0.08)] flex items-center justify-around select-none">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex flex-col items-center justify-center py-1 px-2 text-stone-600 active:text-emerald-800 transition-colors cursor-pointer"
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px] font-bold mt-0.5">Home</span>
        </button>

        <button
          onClick={() => handleOpenModule('my_complaints')}
          className="flex flex-col items-center justify-center py-1 px-2 text-stone-600 active:text-emerald-800 transition-colors cursor-pointer"
        >
          <Search className="w-5 h-5" />
          <span className="text-[10px] font-bold mt-0.5">Track</span>
        </button>

        {/* Center Golden Quick Submit Button */}
        <button
          onClick={() => handleOpenModule('submit_complaint')}
          className="flex flex-col items-center justify-center -mt-5 p-3 rounded-full bg-gradient-to-tr from-amber-500 via-amber-400 to-yellow-300 text-stone-950 font-black shadow-xl border-2 border-amber-300 active:scale-90 transition-transform cursor-pointer"
          aria-label="Submit Grievance"
        >
          <Plus className="w-5 h-5 stroke-[3]" />
          <span className="sr-only">Submit</span>
        </button>

        <button
          onClick={() => handleOpenModule('emergency_contacts')}
          className="flex flex-col items-center justify-center py-1 px-2 text-red-600 active:text-red-800 transition-colors cursor-pointer"
        >
          <AlertTriangle className="w-5 h-5" />
          <span className="text-[10px] font-bold mt-0.5">Emergency</span>
        </button>

        <button
          onClick={() => {
            if (!currentUser) {
              handleOpenLogin('citizen');
            } else if (currentUser.role === 'admin') {
              setAdminInitialTab('grievances');
              setActiveModal('admin_dashboard');
            } else {
              handleOpenModule('profile');
            }
          }}
          className="flex flex-col items-center justify-center py-1 px-2 text-stone-600 active:text-emerald-800 transition-colors cursor-pointer"
        >
          {currentUser?.role === 'admin' ? (
            <>
              <ShieldCheck className="w-5 h-5 text-amber-600" />
              <span className="text-[10px] font-bold mt-0.5 text-stone-900">Admin</span>
            </>
          ) : currentUser ? (
            <>
              <User className="w-5 h-5 text-emerald-700" />
              <span className="text-[10px] font-bold mt-0.5 text-emerald-800 truncate max-w-[48px]">{currentUser.name.split(' ')[0]}</span>
            </>
          ) : (
            <>
              <User className="w-5 h-5" />
              <span className="text-[10px] font-bold mt-0.5">Sign In</span>
            </>
          )}
        </button>
      </nav>

      {/* ============================================================ */}
      {/* AUTHENTICATION MODAL (People Mobile OTP + Admin Login)       */}
      {/* ============================================================ */}
      <AuthModal
        isOpen={activeModal === 'auth_modal'}
        onClose={() => {
          setActiveModal(null);
          setLoggedOutNotice(null);
          if (window.location.hash === '#login' || window.location.hash === '#admin_login' || window.location.hash === '#auth') {
            window.history.replaceState(null, '', window.location.pathname);
          }
        }}
        onLoginSuccess={handleLoginSuccess}
        initialTab={authModalInitialTab}
        loggedOutNotice={loggedOutNotice}
        onClearNotice={() => setLoggedOutNotice(null)}
      />

      {/* ============================================================ */}
      {/* ADMIN CONTROL CONSOLE (Councillor Sarooj Sattar)             */}
      {/* ============================================================ */}
      {currentUser?.role === 'admin' && (
        <AdminDashboardModal
          isOpen={activeModal === 'admin_dashboard'}
          onClose={() => setActiveModal(null)}
          adminUser={currentUser as AdminUser}
          onLogout={handleLogout}
          complaints={complaints}
          onUpdateComplaintStatus={handleUpdateStatus}
          onAnnouncementCreated={(newAnn) => setAnnouncements((prev) => [newAnn, ...prev])}
          initialTab={adminInitialTab}
          photoConfig={photoConfig || undefined}
          onUpdatePhotoConfig={handleUpdatePhotoConfig}
        />
      )}

      {/* ============================================================ */}
      {/* CIVIC ACTION MODALS                                          */}
      {/* ============================================================ */}
      
      {/* Submit Grievance Modal */}
      <SubmitComplaintModal
        isOpen={activeModal === 'submit_complaint'}
        onClose={() => setActiveModal(null)}
        onComplaintCreated={handleComplaintCreated}
        currentUser={currentUser}
        onViewTracker={(code) => {
          setTrackerSearchCode(code);
          setActiveModal('my_complaints');
        }}
      />

      {/* Public Grievance Tracker Modal */}
      <ComplaintTrackerModal
        isOpen={activeModal === 'my_complaints'}
        onClose={() => setActiveModal(null)}
        complaints={complaints}
        currentUser={currentUser}
        onOpenLogin={() => handleOpenLogin('citizen')}
        onOpenSubmit={() => setActiveModal('submit_complaint')}
        onUpvote={handleUpvoteComplaint}
        onUpdateStatus={handleUpdateStatus}
        initialSearchCode={trackerSearchCode}
      />

      {/* Community Projects Modal */}
      <ProjectsModal
        isOpen={activeModal === 'community_projects'}
        onClose={() => setActiveModal(null)}
        projects={projects}
      />

      {/* Official Announcements Modal */}
      <AnnouncementsModal
        isOpen={activeModal === 'announcements'}
        onClose={() => setActiveModal(null)}
        announcements={announcements}
      />

      {/* Emergency Directory Modal */}
      <EmergencyModal
        isOpen={activeModal === 'emergency'}
        onClose={() => setActiveModal(null)}
      />

      {/* Volunteer Network & Members Modal */}
      <VolunteerModal
        isOpen={activeModal === 'volunteer'}
        onClose={() => setActiveModal(null)}
      />

      {/* WhatsApp Direct Line Modal */}
      <WhatsAppDirectModal
        isOpen={activeModal === 'whatsapp'}
        onClose={() => setActiveModal(null)}
      />

      {/* Citizen Profile Modal */}
      <MyProfileModal
        isOpen={activeModal === 'my_profile'}
        onClose={() => setActiveModal(null)}
        complaints={complaints}
        currentUser={currentUser}
        onLogout={handleLogout}
        onOpenLogin={() => handleOpenLogin('citizen')}
        onOpenAdminSecurity={() => {
          setAdminInitialTab('security');
          setActiveModal('admin_dashboard');
        }}
        onSelectComplaint={(code) => {
          setTrackerSearchCode(code);
          setActiveModal('my_complaints');
        }}
      />

      {/* Render.yaml Infrastructure Modal */}
      <RenderDeploymentModal
        isOpen={activeModal === 'render_blueprint'}
        onClose={() => setActiveModal(null)}
      />

      {/* About Sarooj Modal */}
      <AboutSaroojModal
        isOpen={activeModal === 'about'}
        onClose={() => setActiveModal(null)}
        onOpenContact={() => setActiveModal('whatsapp')}
      />

    </div>
  );
}
