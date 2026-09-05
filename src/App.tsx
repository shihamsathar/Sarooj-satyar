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

import type { Complaint, CommunityProject, Announcement } from './types.js';
import type { Language } from './utils/translations.js';

export default function App() {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [projects, setProjects] = useState<CommunityProject[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [language, setLanguage] = useState<Language>('en');

  // Active Modal State
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [trackerSearchCode, setTrackerSearchCode] = useState<string>('');

  // Fetch initial forum data from API / PostgreSQL
  const fetchData = async () => {
    try {
      const [cRes, pRes, aRes] = await Promise.all([
        fetch('/api/complaints'),
        fetch('/api/projects'),
        fetch('/api/announcements'),
      ]);

      const [cData, pData, aData] = await Promise.all([
        cRes.json(),
        pRes.json(),
        aRes.json(),
      ]);

      if (cData.success && cData.data) setComplaints(cData.data);
      if (pData.success && pData.data) setProjects(pData.data);
      if (aData.success && aData.data) setAnnouncements(aData.data);
    } catch (e) {
      console.warn('Backend loading using local cache / initial mock data:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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

  const ongoingProject = projects.find((p) => p.status === 'ongoing') || projects[0];

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-stone-900 selection:bg-amber-200 selection:text-stone-900 relative">
      
      {/* Clean Civic Ambient Background Layer */}
      <div className="fixed inset-0 pointer-events-none z-0 bg-gradient-to-b from-[#FFFDF9] via-[#FAF6EE] to-[#F7F2E7]" />
      
      {/* 1. Municipal Top Header & Navbar */}
      <Navbar
        onOpenModule={handleOpenModule}
        unreadCount={announcements.filter((a) => a.priority === 'high').length || 3}
        language={language}
        onLanguageChange={setLanguage}
      />

      {/* 2. Hero Section with verified portrait, tri-lingual switcher & voice audio */}
      <HeroSection
        language={language}
        onLanguageChange={setLanguage}
        onBuildCommunityClick={() => handleOpenModule('submit_complaint')}
        onExploreProjectsClick={() => handleOpenModule('community_projects')}
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
      />

      {/* 5. Quick Contact & Ongoing Project Section */}
      <QuickContactAndOngoingProject
        ongoingProject={ongoingProject}
        onViewAllProjects={() => handleOpenModule('community_projects')}
        onOpenContactForm={() => handleOpenModule('whatsapp')}
        language={language}
      />

      {/* 6. Stay Connected Newsletter Subscription */}
      <NewsletterSubscribe language={language} />

      {/* 7. Municipal Footer */}
      <Footer onOpenModule={handleOpenModule} language={language} />

      {/* 8. Floating AI Civic Assistant powered by Gemini */}
      <AiCivicChatbot onOpenModule={handleOpenModule} language={language} />

      {/* MODALS */}
      
      {/* Submit Grievance Modal */}
      <SubmitComplaintModal
        isOpen={activeModal === 'submit_complaint'}
        onClose={() => setActiveModal(null)}
        onComplaintCreated={handleComplaintCreated}
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
