export type Language = 'en' | 'si' | 'ta';

export interface ModuleTranslation {
  id: string;
  title: string;
  subtitle: string;
  tag: string;
  category: string;
}

export interface Translations {
  // Navigation & Header
  navHotline: string;
  navNegomboMc: string;
  navPortalTagline: string;
  navHome: string;
  navServices: string;
  navProjects: string;
  navAnnouncements: string;
  navEmergency: string;
  navAbout: string;
  navContact: string;
  navSubmitGrievance: string;
  navCitizenPortal: string;
  navRenderConfig: string;

  // Hero Section
  portalTitle: string;
  wardInfo: string;
  welcomeTo: string;
  councillorName: string;
  communityForum: string;
  heroSubtitle: string;
  buildCommunityBtn: string;
  viewProjectsBtn: string;
  directLine: string;
  openWhatsApp: string;
  voiceNoteTitle: string;
  voiceNoteStatus: string;
  voiceNotePlaying: string;
  voiceNoteQuote: string;
  hotlineTitle: string;
  hotlineLive: string;
  hotlineDesc: string;
  campaignPostersLabel: string;
  backgroundBtn: string;
  backgroundModalTitle: string;
  uploadBackgroundPhoto: string;
  backgroundVisibility: string;
  resetDefaultPoster: string;
  
  // 8 Service Modules Grid
  serviceDashboardBadge: string;
  serviceDashboardTitle: string;
  serviceDashboardSubtitle: string;
  searchServicesPlaceholder: string;
  metricResolutionRate: string;
  metricResolutionLabel: string;
  metricResponseTime: string;
  metricResponseLabel: string;
  metricCoverage: string;
  metricCoverageLabel: string;
  metricHelpline: string;
  metricHelplineLabel: string;
  filterAll: string;
  filterGrievance: string;
  filterDevelopment: string;
  filterNews: string;
  filterContact: string;
  filterEmergency: string;
  filterCommunity: string;
  openServiceBtn: string;
  activeComplaintsTag: string;
  projectsTag: string;
  noticesTag: string;
  volunteersTag: string;
  helpline247Tag: string;
  aiAssistedTag: string;
  civicPortalTag: string;

  // Modules List
  modules: {
    submitComplaint: { title: string; subtitle: string };
    myComplaints: { title: string; subtitle: string };
    communityProjects: { title: string; subtitle: string };
    announcements: { title: string; subtitle: string };
    contactSarooj: { title: string; subtitle: string };
    emergencyContacts: { title: string; subtitle: string };
    communityMembers: { title: string; subtitle: string };
    myProfile: { title: string; subtitle: string };
  };

  // Civic Gallery
  civicGalleryBadge: string;
  civicGalleryTitle: string;
  civicGallerySubtitle: string;
  galleryFilterAll: string;
  galleryFilterInfrastructure: string;
  galleryFilterHealth: string;
  galleryFilterYouth: string;
  galleryFilterMeetings: string;
  galleryFilterEnvironment: string;
  galleryImpactLabel: string;
  galleryCouncillorNoteLabel: string;
  galleryLocationLabel: string;
  galleryDateLabel: string;
  galleryViewPhotoBtn: string;
  gallerySubmitPromptTitle: string;
  gallerySubmitPromptDesc: string;
  gallerySubmitActionBtn: string;

  // Quick Contact & Ongoing Project
  quickContactTitle: string;
  quickContactSubtitle: string;
  quickContactStatus: string;
  quickContactLocation: string;
  quickContactAddress: string;
  quickContactPhoneLabel: string;
  quickContactEmailLabel: string;
  quickContactHoursLabel: string;
  quickContactHoursValue: string;
  quickContactDirectBtn: string;
  quickContactFieldOffice: string;

  ongoingProjectBadge: string;
  ongoingProjectTitle: string;
  ongoingProjectSubtitle: string;
  ongoingProjectProgress: string;
  ongoingProjectBudget: string;
  ongoingProjectContractor: string;
  ongoingProjectTarget: string;
  ongoingProjectViewAllBtn: string;
  ongoingProjectStatusOngoing: string;
  ongoingProjectStatusCompleted: string;
  ongoingProjectStatusPlanning: string;

  // Stay Connected / Newsletter
  stayConnectedTitle: string;
  stayConnectedSubtitle: string;
  subscribeNamePlaceholder: string;
  subscribeEmailPlaceholder: string;
  subscribeBtn: string;
  subscribeSubscribing: string;
  subscribeSuccessTitle: string;
  subscribeSuccessDesc: string;

  // Footer
  footerAboutTitle: string;
  footerAboutDesc: string;
  footerQuickLinksTitle: string;
  footerServicesTitle: string;
  footerContactTitle: string;
  footerSecretariatAddress: string;
  footerCopyright: string;
  footerCivicDuty: string;

  // Submit Complaint Modal
  modalSubmitTitle: string;
  modalSubmitSubtitle: string;
  formComplaintTitle: string;
  formComplaintTitlePlaceholder: string;
  formCategory: string;
  formWard: string;
  formLocationAddress: string;
  formLocationPlaceholder: string;
  formDescription: string;
  formDescriptionPlaceholder: string;
  formAiAutoAnalyzeBtn: string;
  formAiAnalyzing: string;
  formAiAnalysisTitle: string;
  formUrgencyUrgent: string;
  formUrgencyHigh: string;
  formUrgencyMedium: string;
  formUrgencyLow: string;
  formCitizenName: string;
  formCitizenPhone: string;
  formCitizenEmail: string;
  formPhotoUpload: string;
  formPhotoUploadHelper: string;
  formSubmitBtn: string;
  formSubmitting: string;
  formSuccessTitle: string;
  formSuccessRefCode: string;
  formSuccessDesc: string;
  formViewTrackerBtn: string;
  formCloseBtn: string;

  // Complaint Tracker Modal
  modalTrackerTitle: string;
  modalTrackerSubtitle: string;
  trackerSearchPlaceholder: string;
  trackerFilterAll: string;
  trackerFilterSubmitted: string;
  trackerFilterUnderReview: string;
  trackerFilterAssigned: string;
  trackerFilterInProgress: string;
  trackerFilterResolved: string;
  trackerStatusSubmitted: string;
  trackerStatusUnderReview: string;
  trackerStatusAssigned: string;
  trackerStatusInProgress: string;
  trackerStatusResolved: string;
  trackerUpvoteBtn: string;
  trackerCouncillorFeedback: string;
  trackerResolutionNotes: string;
  trackerSubmitNewBtn: string;
  trackerNoComplaintsFound: string;

  // Projects Modal
  modalProjectsTitle: string;
  modalProjectsSubtitle: string;
  projectsFilterAll: string;
  projectsFilterOngoing: string;
  projectsFilterPlanning: string;
  projectsFilterCompleted: string;
  projectBudgetLabel: string;
  projectProgressLabel: string;
  projectContractorLabel: string;
  projectTimelineLabel: string;

  // Announcements Modal
  modalAnnouncementsTitle: string;
  modalAnnouncementsSubtitle: string;
  announcementPriorityUrgent: string;
  announcementPriorityHigh: string;
  announcementPriorityNormal: string;
  announcementReadMore: string;

  // Emergency Contacts Modal
  modalEmergencyTitle: string;
  modalEmergencySubtitle: string;
  emergencyCallNow: string;
  emergency24HourService: string;

  // Volunteer Modal
  modalVolunteerTitle: string;
  modalVolunteerSubtitle: string;
  volunteerNameLabel: string;
  volunteerPhoneLabel: string;
  volunteerSkillsLabel: string;
  volunteerSubmitBtn: string;
  volunteerSuccessMsg: string;

  // WhatsApp Modal
  modalWhatsAppTitle: string;
  modalWhatsAppSubtitle: string;
  whatsAppDirectNumber: string;
  whatsAppTemplateTitle: string;
  whatsAppTemplateRoad: string;
  whatsAppTemplateWater: string;
  whatsAppTemplateGrievance: string;
  whatsAppTemplateInquiry: string;
  whatsAppLaunchBtn: string;

  // Profile Modal
  modalProfileTitle: string;
  modalProfileSubtitle: string;
  profileLanguageLabel: string;
  profileSavedGrievances: string;

  // About Sarooj Modal
  modalAboutTitle: string;
  modalAboutSubtitle: string;
  aboutVisionHeading: string;
  aboutVisionDesc: string;
  aboutWardRecordHeading: string;
  aboutWardRecordDesc: string;

  // AI Chatbot
  chatbotTitle: string;
  chatbotSubtitle: string;
  chatbotGreeting: string;
  chatbotPlaceholder: string;
  chatbotSendBtn: string;
  chatbotSuggestPothole: string;
  chatbotSuggestProjects: string;
  chatbotSuggestEmergency: string;
  chatbotSuggestHotline: string;
}

export const translations: Record<Language, Translations> = {
  // ==========================================
  // ENGLISH
  // ==========================================
  en: {
    // Nav
    navHotline: 'Hotline: 0702475248',
    navNegomboMc: 'Negombo MC • Ward 05',
    navPortalTagline: 'Official Grievance & Citizen Empowerment Portal • Periyamulla & Negombo Municipal Council',
    navHome: 'Home',
    navServices: 'Services',
    navProjects: 'Projects',
    navAnnouncements: 'Announcements',
    navEmergency: 'Emergency',
    navAbout: 'About Sarooj',
    navContact: 'Contact',
    navSubmitGrievance: 'Submit Grievance',
    navCitizenPortal: 'Citizen Portal',
    navRenderConfig: 'render.yaml',

    // Hero
    portalTitle: 'Official Grievance & Citizen Empowerment Portal',
    wardInfo: 'Negombo Municipal Council • Ward 05 Periyamulla',
    welcomeTo: 'Welcome to',
    councillorName: 'SAROOJ SATTAR',
    communityForum: 'COMMUNITY FORUM',
    heroSubtitle: 'A platform built to connect, listen and work together for a better, safer, and prosperous Negombo.',
    buildCommunityBtn: "Let's Build Our Community",
    viewProjectsBtn: 'View Public Works & Projects',
    directLine: 'Direct Line: 0702475248',
    openWhatsApp: 'Chat on WhatsApp',
    voiceNoteTitle: "Councillor's Voice Note",
    voiceNoteStatus: 'AUDIO',
    voiceNotePlaying: 'PLAYING',
    voiceNoteQuote: '"My door is always open for the people of Negombo..."',
    hotlineTitle: 'Citizen Hotline',
    hotlineLive: '24/7 LIVE',
    hotlineDesc: 'Direct municipal line to Councillor Sarooj Sattar’s Periyamulla Secretariat.',
    campaignPostersLabel: 'Campaign Posters:',
    backgroundBtn: 'Background',
    backgroundModalTitle: 'Background Photo',
    uploadBackgroundPhoto: 'Upload Background Photo',
    backgroundVisibility: 'Background Visibility:',
    resetDefaultPoster: 'Reset to Default Poster',

    // 8 Service Modules Grid
    serviceDashboardBadge: 'Direct Citizen Services • Ward 05 Periyamulla',
    serviceDashboardTitle: 'Community Service Dashboard',
    serviceDashboardSubtitle: 'Select any municipal department below to submit requests, track field engineers live, or contact Councillor Sarooj Sattar directly.',
    searchServicesPlaceholder: 'Search services or topics...',
    metricResolutionRate: '94.8%',
    metricResolutionLabel: 'Grievance Resolution',
    metricResponseTime: '< 48 Hrs',
    metricResponseLabel: 'Inspection Response',
    metricCoverage: '100%',
    metricCoverageLabel: 'Ward 05 Coverage',
    metricHelpline: '24/7',
    metricHelplineLabel: 'Citizen Helpline',
    filterAll: 'All',
    filterGrievance: 'Grievance',
    filterDevelopment: 'Development',
    filterNews: 'News',
    filterContact: 'Contact',
    filterEmergency: 'Emergency',
    filterCommunity: 'Community',
    openServiceBtn: 'Open Service',
    activeComplaintsTag: 'Active',
    projectsTag: 'Projects',
    noticesTag: 'Notices',
    volunteersTag: '+ Volunteers',
    helpline247Tag: '24/7 Helplines',
    aiAssistedTag: 'AI Assisted',
    civicPortalTag: 'Civic Portal',

    modules: {
      submitComplaint: {
        title: 'Submit Complaint',
        subtitle: 'Report Issues Directly to Ward 5',
      },
      myComplaints: {
        title: 'My Complaints',
        subtitle: 'Track Your Civic Requests Live',
      },
      communityProjects: {
        title: 'Community Projects',
        subtitle: 'Ongoing, Finished & Future Works',
      },
      announcements: {
        title: 'Announcements',
        subtitle: 'Municipal Bulletins & Ward News',
      },
      contactSarooj: {
        title: 'Contact Sarooj',
        subtitle: 'Instant WhatsApp Direct Chat',
      },
      emergencyContacts: {
        title: 'Emergency Contacts',
        subtitle: 'Police, Fire, Hospital & Flood',
      },
      communityMembers: {
        title: 'Community Members',
        subtitle: 'Registered Active Ward Volunteers',
      },
      myProfile: {
        title: 'My Profile',
        subtitle: 'Citizen Preferences & Language',
      },
    },

    // Civic Gallery
    civicGalleryBadge: 'Photographic Evidence • Ground Realities',
    civicGalleryTitle: 'Civic Action & Public Works',
    civicGallerySubtitle: 'Photographic documentation of municipal works, welfare camps, and citizen progress across Ward 05 Periyamulla.',
    galleryFilterAll: 'All Works',
    galleryFilterInfrastructure: 'Infrastructure',
    galleryFilterHealth: 'Healthcare & Relief',
    galleryFilterYouth: 'Youth & Sports',
    galleryFilterMeetings: 'Citizen Meetings',
    galleryFilterEnvironment: 'Environment',
    galleryImpactLabel: 'Community Impact:',
    galleryCouncillorNoteLabel: 'Councillor’s Note:',
    galleryLocationLabel: 'Location:',
    galleryDateLabel: 'Completed:',
    galleryViewPhotoBtn: 'Inspect Civic Details',
    gallerySubmitPromptTitle: 'Have an issue in your street?',
    gallerySubmitPromptDesc: 'Upload photos of broken roads, overflowing drains, or non-functioning streetlights for immediate municipal action.',
    gallerySubmitActionBtn: 'Report an Issue Now',

    // Quick Contact & Ongoing Project
    quickContactTitle: 'Quick Contact',
    quickContactSubtitle: 'Negombo Secretariat & Field Office',
    quickContactStatus: 'Open for Citizens',
    quickContactLocation: 'Location',
    quickContactAddress: 'Negombo Municipal Council Secretariat, St. Lazarus Road, Periyamulla, Negombo',
    quickContactPhoneLabel: 'Direct Line',
    quickContactEmailLabel: 'Official Email',
    quickContactHoursLabel: 'Citizen Hours',
    quickContactHoursValue: 'Monday – Saturday: 8:00 AM – 6:30 PM (24/7 WhatsApp Hotline)',
    quickContactDirectBtn: 'Open Direct Message',
    quickContactFieldOffice: 'Field office visits welcome every morning.',

    ongoingProjectBadge: 'Active Municipal Work',
    ongoingProjectTitle: 'Road Development Project in Periyamulla',
    ongoingProjectSubtitle: 'Comprehensive asphalt carpeting, concrete curbs, and stormwater drain construction along St. Lazarus Road.',
    ongoingProjectProgress: 'Progress Completed',
    ongoingProjectBudget: 'Allocated Municipal Budget: LKR 18.5 Million',
    ongoingProjectContractor: 'Contractor: Western Provincial RDA & Negombo MC',
    ongoingProjectTarget: 'Target Completion: November 2024 (4,200+ Beneficiaries)',
    ongoingProjectViewAllBtn: 'View All Municipal Projects',
    ongoingProjectStatusOngoing: 'Under Construction (65%)',
    ongoingProjectStatusCompleted: 'Successfully Completed',
    ongoingProjectStatusPlanning: 'Engineering Planning Phase',

    // Stay Connected
    stayConnectedTitle: 'Stay Connected With Your Ward',
    stayConnectedSubtitle: 'Receive real-time municipal updates, emergency advisories, and development reports directly via SMS & Email.',
    subscribeNamePlaceholder: 'Enter your full name...',
    subscribeEmailPlaceholder: 'Enter your email address...',
    subscribeBtn: 'Subscribe to Ward Updates',
    subscribeSubscribing: 'Subscribing...',
    subscribeSuccessTitle: 'Thank You for Subscribing!',
    subscribeSuccessDesc: 'You have been registered for Ward 05 municipal updates.',

    // Footer
    footerAboutTitle: 'SAROOJ SATTAR',
    footerAboutDesc: 'Empowering the residents of Periyamulla and Negombo with transparency, direct grievance redressal, and dedicated public infrastructure works.',
    footerQuickLinksTitle: 'Quick Navigation',
    footerServicesTitle: 'Citizen Services',
    footerContactTitle: 'Municipal Office',
    footerSecretariatAddress: 'Periyamulla Secretariat, St. Lazarus Road, Negombo, Sri Lanka',
    footerCopyright: '© 2024 Negombo Municipal Council • Ward 05 Periyamulla. Built for Citizen Welfare.',
    footerCivicDuty: 'Service is not my pride — it is my sacred responsibility.',

    // Modals
    modalSubmitTitle: 'Submit Citizen Grievance',
    modalSubmitSubtitle: 'Report public issues directly to Councillor Sarooj Sattar’s office with AI-powered urgency detection.',
    formComplaintTitle: 'Grievance Title',
    formComplaintTitlePlaceholder: 'e.g., Broken water pipe causing road flooding on 3rd Lane',
    formCategory: 'Municipal Department / Category',
    formWard: 'Ward / Area in Negombo',
    formLocationAddress: 'Exact Street Address or Landmark',
    formLocationPlaceholder: 'e.g., Near St. Anthony’s Junction, House #42',
    formDescription: 'Detailed Description of the Issue',
    formDescriptionPlaceholder: 'Describe the problem clearly. How long has this occurred? How many houses are impacted?',
    formAiAutoAnalyzeBtn: 'AI Auto-Detect Category & Urgency',
    formAiAnalyzing: 'Analyzing Grievance with Gemini AI...',
    formAiAnalysisTitle: 'Gemini AI Triage Assessment',
    formUrgencyUrgent: 'Critical Emergency (24h SLA)',
    formUrgencyHigh: 'High Priority (48h SLA)',
    formUrgencyMedium: 'Medium Priority (3-5 Days)',
    formUrgencyLow: 'Standard Maintenance',
    formCitizenName: 'Your Full Name',
    formCitizenPhone: 'Phone Number (WhatsApp Recommended)',
    formCitizenEmail: 'Email Address (Optional)',
    formPhotoUpload: 'Attach Site Photo / Evidence',
    formPhotoUploadHelper: 'Upload photo of broken road, street light, or drain (Optional)',
    formSubmitBtn: 'Submit Complaint Directly',
    formSubmitting: 'Registering Grievance...',
    formSuccessTitle: 'Complaint Successfully Registered!',
    formSuccessRefCode: 'Reference Tracking Code:',
    formSuccessDesc: 'Your complaint has been submitted to Ward 05 Secretariat. You will receive SMS & WhatsApp status updates.',
    formViewTrackerBtn: 'Track Grievance Status',
    formCloseBtn: 'Close Window',

    modalTrackerTitle: 'Citizen Grievance Tracker',
    modalTrackerSubtitle: 'Search and monitor public works, field engineer assignments, and resolution notes.',
    trackerSearchPlaceholder: 'Search by Reference Code (e.g., CMP-001) or street name...',
    trackerFilterAll: 'All Statuses',
    trackerFilterSubmitted: 'Submitted',
    trackerFilterUnderReview: 'Under Review',
    trackerFilterAssigned: 'Assigned',
    trackerFilterInProgress: 'In Progress',
    trackerFilterResolved: 'Resolved',
    trackerStatusSubmitted: 'Submitted',
    trackerStatusUnderReview: 'Under Review',
    trackerStatusAssigned: 'Assigned to Inspector',
    trackerStatusInProgress: 'Field Work Ongoing',
    trackerStatusResolved: 'Resolved & Verified',
    trackerUpvoteBtn: 'Upvote Issue',
    trackerCouncillorFeedback: 'Councillor Sarooj’s Feedback',
    trackerResolutionNotes: 'Field Engineer Work Report',
    trackerSubmitNewBtn: 'Submit New Complaint',
    trackerNoComplaintsFound: 'No complaints matched your search criteria.',

    modalProjectsTitle: 'Ward 05 Development Projects',
    modalProjectsSubtitle: 'Comprehensive record of capital public works, road carpeting, and community centers.',
    projectsFilterAll: 'All Projects',
    projectsFilterOngoing: 'Ongoing (In Progress)',
    projectsFilterPlanning: 'In Planning & Tendering',
    projectsFilterCompleted: 'Completed Works',
    projectBudgetLabel: 'Budget:',
    projectProgressLabel: 'Completion:',
    projectContractorLabel: 'Assigned Authority:',
    projectTimelineLabel: 'Target Completion:',

    modalAnnouncementsTitle: 'Municipal Notices & Bulletins',
    modalAnnouncementsSubtitle: 'Official statements, flood advisories, water maintenance notices, and ward meetings.',
    announcementPriorityUrgent: 'CRITICAL ADVISORY',
    announcementPriorityHigh: 'IMPORTANT NOTICE',
    announcementPriorityNormal: 'WARD BULLETIN',
    announcementReadMore: 'Read Full Municipal Order',

    modalEmergencyTitle: '24/7 Negombo Emergency Directory',
    modalEmergencySubtitle: 'Instant direct dial for medical, flood relief, police, and municipal rescue teams.',
    emergencyCallNow: 'Call Immediately',
    emergency24HourService: '24-Hour Emergency Dispatch',

    modalVolunteerTitle: 'Join Ward 05 Youth & Community Volunteers',
    modalVolunteerSubtitle: 'Partner with Councillor Sarooj Sattar to conduct welfare camps and neighborhood clean-ups.',
    volunteerNameLabel: 'Your Full Name',
    volunteerPhoneLabel: 'Contact Phone Number',
    volunteerSkillsLabel: 'Area of Interest / Skills',
    volunteerSubmitBtn: 'Register as Volunteer',
    volunteerSuccessMsg: 'Thank you! The secretariat team will contact you shortly.',

    modalWhatsAppTitle: 'Direct WhatsApp Line with Sarooj Sattar',
    modalWhatsAppSubtitle: 'Direct citizen contact line: 0702475248. Choose a quick message template below.',
    whatsAppDirectNumber: 'Hotline: +94 70 247 5248',
    whatsAppTemplateTitle: 'Select a Quick Message Template:',
    whatsAppTemplateRoad: 'Salam / Vanakkam Councillor Sarooj, I want to report a broken road issue in Ward 5...',
    whatsAppTemplateWater: 'Salam / Vanakkam Councillor Sarooj, we are facing water supply / drainage issues...',
    whatsAppTemplateGrievance: 'Salam / Vanakkam Councillor Sarooj, I would like to schedule a citizen meeting regarding...',
    whatsAppTemplateInquiry: 'Salam / Vanakkam Councillor Sarooj, I want to inquire about ongoing municipal projects...',
    whatsAppLaunchBtn: 'Open WhatsApp Chat Now',

    modalProfileTitle: 'Citizen Profile & Settings',
    modalProfileSubtitle: 'Manage your preferred language, notification preferences, and saved grievance reference codes.',
    profileLanguageLabel: 'Interface Language Preference',
    profileSavedGrievances: 'Your Active Grievances',

    modalAboutTitle: 'About Councillor Sarooj Sattar',
    modalAboutSubtitle: 'Elected Member of Negombo Municipal Council representing Ward 05 Periyamulla.',
    aboutVisionHeading: 'Dedication to Public Service',
    aboutVisionDesc: 'Driven by the core conviction that public leadership is rooted in love, humility, and accessibility rather than authority.',
    aboutWardRecordHeading: 'Periyamulla Development Blueprint',
    aboutWardRecordDesc: 'Championing modernized flood drainage channels, asphalt road carpeting, street lighting networks, and free healthcare camps across Ward 5.',

    chatbotTitle: 'Ward 5 AI Civic Assistant',
    chatbotSubtitle: 'Powered by Gemini AI • 24/7 Municipal Guidance',
    chatbotGreeting: 'Hello! I am Councillor Sarooj Sattar’s AI Civic Assistant. How can I assist you with Negombo Ward 05 municipal services today?',
    chatbotPlaceholder: 'Ask a question or report an issue in Tamil, Sinhala, or English...',
    chatbotSendBtn: 'Send',
    chatbotSuggestPothole: 'How do I report a broken road or pothole?',
    chatbotSuggestProjects: 'What are the ongoing projects in Ward 5?',
    chatbotSuggestEmergency: 'Show me emergency hospital & flood numbers',
    chatbotSuggestHotline: 'How can I contact Councillor Sarooj directly?',
  },

  // ==========================================
  // SINHALA (සිංහල)
  // ==========================================
  si: {
    // Nav
    navHotline: 'ක්ෂණික ඇමතුම්: 0702475248',
    navNegomboMc: 'මීගමුව ම.න.ස. • කොට්ඨාශ 05',
    navPortalTagline: 'මහජන පැමිණිලි සහ පුරවැසි සවිබල ගැන්වීමේ නිල ද්වාරය • පෙරියමුල්ල සහ මීගමුව මහ නගර සභාව',
    navHome: 'මුල් පිටුව',
    navServices: 'සේවාවන්',
    navProjects: 'ව්‍යාපෘති',
    navAnnouncements: 'නිවේදන',
    navEmergency: 'හදිසි සේවා',
    navAbout: 'සරූජ් ගැන',
    navContact: 'සම්බන්ධ වන්න',
    navSubmitGrievance: 'පැමිණිල්ලක් යොමු කරන්න',
    navCitizenPortal: 'පුරවැසි ද්වාරය',
    navRenderConfig: 'render.yaml',

    // Hero
    portalTitle: 'මහජන පැමිණිලි සහ පුරවැසි සවිබල ගැන්වීමේ නිල ද්වාරය',
    wardInfo: 'මීගමුව මහ නගර සභාව • කොට්ඨාශ 05 පෙරියමුල්ල',
    welcomeTo: 'සාදරයෙන් පිළිගනිමු',
    councillorName: 'සරූජ් සත්තාර්',
    communityForum: 'ප්‍රජා සංසදය',
    heroSubtitle: 'වඩාත් සුරක්ෂිත, සෞභාග්‍යමත් මීගමුවක් උදෙසා එකට එක්වී කටයුතු කිරීමට ගොඩනැගූ පුරවැසි වේදිකාව.',
    buildCommunityBtn: 'අපේ ප්‍රජාව ගොඩනඟමු',
    viewProjectsBtn: 'සංවර්ධන ව්‍යාපෘති නරඹන්න',
    directLine: 'සෘජු දුරකථන අංකය: 0702475248',
    openWhatsApp: 'වට්ස්ඇප් මගින් සම්බන්ධ වන්න',
    voiceNoteTitle: 'මන්ත්‍රීතුමාගේ හඬ පණිවිඩය',
    voiceNoteStatus: 'හඬ පටය',
    voiceNotePlaying: 'ධාවනය වේ',
    voiceNoteQuote: '"මීගමුවේ ජනතාව වෙනුවෙන් මගේ දොර සැමවිටම විවෘතයි..."',
    hotlineTitle: 'පුරවැසි ක්ෂණික ඇමතුම්',
    hotlineLive: '24/7 සක්‍රියයි',
    hotlineDesc: 'නගර සභා මන්ත්‍රී සරූජ් සත්තාර් මහතාගේ පෙරියමුල්ල කාර්යාලයේ සෘජු දුරකථන සේවාව.',
    campaignPostersLabel: 'ප්‍රචාරක පෝස්ටර්:',
    backgroundBtn: 'පසුබිම',
    backgroundModalTitle: 'පසුබිම් ඡායාරූපය',
    uploadBackgroundPhoto: 'පසුබිම් ඡායාරූපය උඩුගත කරන්න',
    backgroundVisibility: 'පසුබිම් දීප්තිය:',
    resetDefaultPoster: 'මුල් පෝස්ටරය යොදන්න',

    // 8 Service Modules Grid
    serviceDashboardBadge: 'සෘජු පුරවැසි සේවා • කොට්ඨාශ 05 පෙරියමුල්ල',
    serviceDashboardTitle: 'ප්‍රජා සේවා පාලක පුවරුව',
    serviceDashboardSubtitle: 'පැමිණිලි ඉදිරිපත් කිරීමට, නගර සභා ඉංජිනේරුවන්ගේ ප්‍රගතිය පරීක්ෂා කිරීමට හෝ මන්ත්‍රීතුමා සෘජුව සම්බන්ධ කර ගැනීමට පහත සේවාවක් තෝරන්න.',
    searchServicesPlaceholder: 'සේවාවන් හෝ මාතෘකා සොයන්න...',
    metricResolutionRate: '94.8%',
    metricResolutionLabel: 'පැමිණිලි විසඳීමේ ප්‍රතිශතය',
    metricResponseTime: 'පැය 48ට අඩු',
    metricResponseLabel: 'ක්ෂේත්‍ර පරීක්ෂණ කාලය',
    metricCoverage: '100%',
    metricCoverageLabel: 'කොට්ඨාශ 05 ආවරණය',
    metricHelpline: '24/7',
    metricHelplineLabel: 'පුරවැසි ක්ෂණික සේවාව',
    filterAll: 'සියල්ල',
    filterGrievance: 'පැමිණිලි',
    filterDevelopment: 'සංවර්ධන',
    filterNews: 'නිවේදන',
    filterContact: 'සම්බන්ධතා',
    filterEmergency: 'හදිසි සේවා',
    filterCommunity: 'ප්‍රජාව',
    openServiceBtn: 'සේවාව විවෘත කරන්න',
    activeComplaintsTag: 'සක්‍රිය',
    projectsTag: 'ව්‍යාපෘති',
    noticesTag: 'නිවේදන',
    volunteersTag: '+ ස්වේච්ඡා සාමාජිකයින්',
    helpline247Tag: '24/7 හදිසි ඇමතුම්',
    aiAssistedTag: 'AI සහායක',
    civicPortalTag: 'පුරවැසි ද්වාරය',

    modules: {
      submitComplaint: {
        title: 'පැමිණිල්ලක් යොමු කරන්න',
        subtitle: 'කොට්ඨාශ 5 වෙත ගැටළු සෘජුව දන්වන්න',
      },
      myComplaints: {
        title: 'මගේ පැමිණිලි',
        subtitle: 'පැමිණිලිවල ප්‍රගතිය සජීවීව පරීක්ෂා කරන්න',
      },
      communityProjects: {
        title: 'ප්‍රජා ව්‍යාපෘති',
        subtitle: 'ක්‍රියාත්මක, නිමවූ සහ ඉදිරි සංවර්ධන කටයුතු',
      },
      announcements: {
        title: 'නිල නිවේදන',
        subtitle: 'මහ නගර සභා සහ කොට්ඨාශ පුවත්',
      },
      contactSarooj: {
        title: 'සරූජ් අමතන්න',
        subtitle: 'ක්ෂණික වට්ස්ඇප් සෘජු සංවාදය',
      },
      emergencyContacts: {
        title: 'හදිසි දුරකථන අංක',
        subtitle: 'පොලිසිය, ගිනි නිවන, රෝහල් සහ ගංවතුර සහන',
      },
      communityMembers: {
        title: 'ස්වේච්ඡා සාමාජිකයින්',
        subtitle: 'ලියාපදිංචි ප්‍රජා සේවා සාමාජිකයින්',
      },
      myProfile: {
        title: 'මගේ ගිණුම',
        subtitle: 'පුරවැසි තොරතුරු සහ භාෂා සැකසුම්',
      },
    },

    // Civic Gallery
    civicGalleryBadge: 'ඡායාරූප සාක්ෂි • ක්ෂේත්‍ර ප්‍රගතිය',
    civicGalleryTitle: 'ක්‍රියාකාරී ප්‍රජා මෙහෙවර සහ සංවර්ධනය',
    civicGallerySubtitle: 'කොට්ඨාශ 05 පෙරියමුල්ල පුරා සිදුකරන ලද නාගරික සංවර්ධන කටයුතු, නොමිලේ සෞඛ්‍ය සායන සහ ජනතා සේවා වැඩසටහන්.',
    galleryFilterAll: 'සියලු කටයුතු',
    galleryFilterInfrastructure: 'යටිතල පහසුකම්',
    galleryFilterHealth: 'සෞඛ්‍ය සහ සුභසාධන',
    galleryFilterYouth: 'යෞවන සහ ක්‍රීඩා',
    galleryFilterMeetings: 'මහජන හමුවීම්',
    galleryFilterEnvironment: 'පරිසරය',
    galleryImpactLabel: 'ප්‍රජා ප්‍රතිලාභය:',
    galleryCouncillorNoteLabel: 'මන්ත්‍රීතුමාගේ සටහන:',
    galleryLocationLabel: 'ස්ථානය:',
    galleryDateLabel: 'දිනය:',
    galleryViewPhotoBtn: 'විස්තර පරීක්ෂා කරන්න',
    gallerySubmitPromptTitle: 'ඔබේ ප්‍රදේශයේ ගැටලුවක් තිබේද?',
    gallerySubmitPromptDesc: 'අබලන් මාර්ග, අවහිර වූ කානු හෝ විදුලි පහන් පිළිබඳ ඡායාරූප අප වෙත එවන්න.',
    gallerySubmitActionBtn: 'දැන්ම ගැටලුවක් වාර්තා කරන්න',

    // Quick Contact & Ongoing Project
    quickContactTitle: 'ක්ෂණික සම්බන්ධතාව',
    quickContactSubtitle: 'මීගමුව කාර්යාලය සහ ක්ෂේත්‍ර සේවා මධ්‍යස්ථානය',
    quickContactStatus: 'මහජනතාව සඳහා විවෘතයි',
    quickContactLocation: 'ලිපිනය',
    quickContactAddress: 'මීගමුව මහ නගර සභා කාර්යාලය, ශාන්ත ලාසරස් පාර, පෙරියමුල්ල, මීගමුව',
    quickContactPhoneLabel: 'සෘජු දුරකථනය',
    quickContactEmailLabel: 'නිල ඊමේල් ලිපිනය',
    quickContactHoursLabel: 'සේවා වේලාවන්',
    quickContactHoursValue: 'සඳුදා – සෙනසුරාදා: පෙ.ව. 8:00 – ප.ව. 6:30 (24/7 වට්ස්ඇප් සේවාව)',
    quickContactDirectBtn: 'සෘජු පණිවිඩයක් යවන්න',
    quickContactFieldOffice: 'සෑම උදෑසනකම මහජන හමුවීම් සඳහා විවෘතයි.',

    ongoingProjectBadge: 'ක්‍රියාත්මක නාගරික ව්‍යාපෘතිය',
    ongoingProjectTitle: 'පෙරියමුල්ල මාර්ග සංවර්ධන ව්‍යාපෘතිය',
    ongoingProjectSubtitle: 'ශාන්ත ලාසරස් පාරේ තාර ඇතිරීම, කොන්ක්‍රීට් කාණු පද්ධතිය සහ වැසි ජල බැසයාමේ පද්ධති ඉදිකිරීම.',
    ongoingProjectProgress: 'සම්පූර්ණ කළ ප්‍රගතිය',
    ongoingProjectBudget: 'වෙන්කළ ප්‍රතිපාදන: රු. මිලියන 18.5',
    ongoingProjectContractor: 'කොන්ත්‍රාත්කරු: බස්නාහිර පළාත් මාර්ග සංවර්ධන අධිකාරිය සහ මීගමුව ම.න.ස.',
    ongoingProjectTarget: 'අපේක්ෂිත අවසන් දිනය: 2024 නොවැම්බර් (පවුල් 4,200+ සඳහා සෙත සැලසේ)',
    ongoingProjectViewAllBtn: 'සියලු ව්‍යාපෘති නරඹන්න',
    ongoingProjectStatusOngoing: 'ඉදිකිරීම් සිදුවෙමින් පවතී (65%)',
    ongoingProjectStatusCompleted: 'සාර්ථකව නිම කරන ලදී',
    ongoingProjectStatusPlanning: 'ඉංජිනේරු සැලසුම් අදියරේ',

    // Stay Connected
    stayConnectedTitle: 'ඔබේ කොට්ඨාශය සමඟ සම්බන්ධ වන්න',
    stayConnectedSubtitle: 'නගර සභා යාවත්කාලීන කිරීම්, හදිසි නිවේදන සහ සංවර්ධන වාර්තා සෘජුවම ලබා ගන්න.',
    subscribeNamePlaceholder: 'ඔබගේ සම්පූර්ණ නම ඇතුළත් කරන්න...',
    subscribeEmailPlaceholder: 'ඔබගේ ඊමේල් ලිපිනය ඇතුළත් කරන්න...',
    subscribeBtn: 'ලියාපදිංචි වන්න',
    subscribeSubscribing: 'ලියාපදිංචි වෙමින්...',
    subscribeSuccessTitle: 'ලියාපදිංචිය සාර්ථකයි!',
    subscribeSuccessDesc: 'ඔබ කොට්ඨාශ 05 නිල පණිවිඩ සේවාවට සාර්ථකව ඇතුළත් විය.',

    // Footer
    footerAboutTitle: 'සරූජ් සත්තාර්',
    footerAboutDesc: 'පෙරියමුල්ල සහ මීගමුව පුරවැසියන් වෙනුවෙන් විනිවිදභාවය, කඩිනම් පැමිණිලි විසඳුම් සහ කැපවූ සංවර්ධන සේවාව.',
    footerQuickLinksTitle: 'ප්‍රධාන පිටු',
    footerServicesTitle: 'පුරවැසි සේවාවන්',
    footerContactTitle: 'කාර්යාලය',
    footerSecretariatAddress: 'පෙරියමුල්ල ලේකම් කාර්යාලය, ශාන්ත ලාසරස් පාර, මීගමුව, ශ්‍රී ලංකාව',
    footerCopyright: '© 2024 මීගමුව මහ නගර සභාව • කොට්ඨාශ 05 පෙරියමුල්ල. මහජන සුභසිද්ධිය උදෙසායි.',
    footerCivicDuty: 'සේවය කිරීම මගේ ආඩම්බරය නොවේ — එය මගේ පූජනීය වගකීමයි.',

    // Modals
    modalSubmitTitle: 'පුරවැසි පැමිණිල්ලක් යොමු කරන්න',
    modalSubmitSubtitle: 'AI තාක්ෂණික සහාය ඇතිව ඔබේ ගැටලුව සෘජුවම මන්ත්‍රී සරූජ් සත්තාර් මහතාගේ කාර්යාලය වෙත යොමු කරන්න.',
    formComplaintTitle: 'පැමිණිල්ලේ මාතෘකාව',
    formComplaintTitlePlaceholder: 'උදා: 3 වන පටුමගේ ජල නළය කැඩී මාර්ගය ජලයෙන් යටවීම',
    formCategory: 'අදාළ අංශය / වර්ගීකරණය',
    formWard: 'කොට්ඨාශය / ප්‍රදේශය',
    formLocationAddress: 'නිශ්චිත ලිපිනය හෝ සළකුණ',
    formLocationPlaceholder: 'උදා: ශාන්ත අන්තෝනි හන්දිය අසල, නිවස අංක 42',
    formDescription: 'ගැටලුව පිළිබඳ සවිස්තරාත්මක විස්තරය',
    formDescriptionPlaceholder: 'ගැටලුව පැහැදිලිව විස්තර කරන්න. කොපමණ කාලයක සිට පවතීද? පවුල් කීයකට බලපෑම් සිදුවේද?',
    formAiAutoAnalyzeBtn: 'AI මගින් වර්ගීකරණය සහ ප්‍රමුඛතාවය හඳුනාගන්න',
    formAiAnalyzing: 'Gemini AI මගින් පරීක්ෂා කරමින්...',
    formAiAnalysisTitle: 'Gemini AI පරීක්ෂණ නිගමනය',
    formUrgencyUrgent: 'හදිසි අවදානම් (පැය 24 සේවා කාලය)',
    formUrgencyHigh: 'ඉහළ ප්‍රමුඛතාවය (පැය 48 සේවා කාලය)',
    formUrgencyMedium: 'මධ්‍යම ප්‍රමුඛතාවය (දින 3-5)',
    formUrgencyLow: 'සාමාන්‍ය නඩත්තු',
    formCitizenName: 'ඔබගේ සම්පූර්ණ නම',
    formCitizenPhone: 'දුරකථන අංකය (WhatsApp තිබේ නම් වඩාත් සුදුසුයි)',
    formCitizenEmail: 'ඊමේල් ලිපිනය (අත්‍යවශ්‍ය නොවේ)',
    formPhotoUpload: 'අදාළ ස්ථානයේ ඡායාරූපය අමුණන්න',
    formPhotoUploadHelper: 'අබලන් මාර්ගය, විදුලි පහන හෝ කානුවේ ඡායාරූපයක් උඩුගත කරන්න (අවශ්‍ය නම්)',
    formSubmitBtn: 'පැමිණිල්ල සෘජුව යොමු කරන්න',
    formSubmitting: 'පැමිණිල්ල ලියාපදිංචි වෙමින්...',
    formSuccessTitle: 'පැමිණිල්ල සාර්ථකව ලියාපදිංචි විය!',
    formSuccessRefCode: 'පැමිණිලි අංකය (Reference Code):',
    formSuccessDesc: 'ඔබගේ පැමිණිල්ල කොට්ඨාශ 05 කාර්යාලය වෙත ලැබී ඇත. කෙටි පණිවිඩ (SMS) සහ WhatsApp මගින් යාවත්කාලීන තොරතුරු ලැබෙනු ඇත.',
    formViewTrackerBtn: 'පැමිණිල්ලේ ප්‍රගතිය පරීක්ෂා කරන්න',
    formCloseBtn: 'වසන්න',

    modalTrackerTitle: 'පුරවැසි පැමිණිලි පරීක්ෂක',
    modalTrackerSubtitle: 'පැමිණිලි ප්‍රගතිය, පත්කළ ඉංජිනේරුවන් සහ විසඳුම් වාර්තා පරීක්ෂා කරන්න.',
    trackerSearchPlaceholder: 'පැමිණිලි අංකය (උදා: CMP-001) හෝ මාර්ගයේ නම ඇතුළත් කරන්න...',
    trackerFilterAll: 'සියලු තත්වයන්',
    trackerFilterSubmitted: 'යොමු කළ',
    trackerFilterUnderReview: 'සලකා බලමින්',
    trackerFilterAssigned: 'ඉංජිනේරු පැවරුම්',
    trackerFilterInProgress: 'වැඩ කෙරෙමින් පවතී',
    trackerFilterResolved: 'විසඳන ලද',
    trackerStatusSubmitted: 'පැමිණිල්ල ලැබී ඇත',
    trackerStatusUnderReview: 'පරීක්ෂා කරමින් පවතී',
    trackerStatusAssigned: 'පරීක්ෂක වෙත පවරා ඇත',
    trackerStatusInProgress: 'ක්ෂේත්‍රයේ වැඩ සිදුවේ',
    trackerStatusResolved: 'සම්පූර්ණයෙන්ම විසඳන ලදී',
    trackerUpvoteBtn: 'සහයෝගය දක්වන්න',
    trackerCouncillorFeedback: 'මන්ත්‍රී සරූජ් සත්තාර්ගේ ප්‍රතිචාරය',
    trackerResolutionNotes: 'ක්ෂේත්‍ර ඉංජිනේරු වාර්තාව',
    trackerSubmitNewBtn: 'නව පැමිණිල්ලක් යොමු කරන්න',
    trackerNoComplaintsFound: 'සෙවුමට ගැළපෙන පැමිණිලි හමු නොවීය.',

    modalProjectsTitle: 'කොට්ඨාශ 05 සංවර්ධන ව්‍යාපෘති',
    modalProjectsSubtitle: 'මහජන සංවර්ධන කටයුතු, මාර්ග තාර දැමීම සහ ප්‍රජා මධ්‍යස්ථාන පිළිබඳ සවිස්තරාත්මක තොරතුරු.',
    projectsFilterAll: 'සියලු ව්‍යාපෘති',
    projectsFilterOngoing: 'ක්‍රියාත්මක වෙමින් පවතින',
    projectsFilterPlanning: 'සැලසුම් අදියරේ',
    projectsFilterCompleted: 'නිම කරන ලද',
    projectBudgetLabel: 'ප්‍රතිපාදන:',
    projectProgressLabel: 'ප්‍රගතිය:',
    projectContractorLabel: 'වගකිවයුතු ආයතනය:',
    projectTimelineLabel: 'ඉලක්කගත දිනය:',

    modalAnnouncementsTitle: 'නාගරික නිවේදන සහ පුවත්',
    modalAnnouncementsSubtitle: 'නිල නිවේදන, ගංවතුර අනතුරු ඇඟවීම්, ජල සැපයුම් නඩත්තු සහ මහජන හමුවීම්.',
    announcementPriorityUrgent: 'හදිසි අනතුරු ඇඟවීම',
    announcementPriorityHigh: 'වැදගත් නිවේදනය',
    announcementPriorityNormal: 'සාමාන්‍ය පුවත',
    announcementReadMore: 'සම්පූර්ණ නිවේදනය කියවන්න',

    modalEmergencyTitle: '24/7 මීගමුව හදිසි දුරකථන අංක',
    modalEmergencySubtitle: 'වෛද්‍ය, ගංවතුර සහන, පොලිසිය සහ ගිනි නිවන සේවා සඳහා සෘජු ඇමතුම් ලබා ගන්න.',
    emergencyCallNow: 'වහාම අමතන්න',
    emergency24HourService: 'පැය 24 පුරා ක්‍රියාත්මක හදිසි සේවාව',

    modalVolunteerTitle: 'කොට්ඨාශ 05 ප්‍රජා ස්වේච්ඡා බලකාය හා එක්වන්න',
    modalVolunteerSubtitle: 'සුභසාධන සහ ප්‍රජා සත්කාරක කටයුතු සඳහා මන්ත්‍රී සරූජ් සත්තාර් සමඟ අත්වැල් බැඳගන්න.',
    volunteerNameLabel: 'ඔබගේ සම්පූර්ණ නම',
    volunteerPhoneLabel: 'දුරකථන අංකය',
    volunteerSkillsLabel: 'කැමති ක්ෂේත්‍රය / දක්ෂතා',
    volunteerSubmitBtn: 'ලියාපදිංචි වන්න',
    volunteerSuccessMsg: 'ස්තූතියි! කාර්යාල කණ්ඩායම ඉක්මනින් ඔබව සම්බන්ධ කර ගනු ඇත.',

    modalWhatsAppTitle: 'සරූජ් සත්තාර් සමඟ සෘජු වට්ස්ඇප් සංවාදය',
    modalWhatsAppSubtitle: 'සෘජු පුරවැසි දුරකථන අංකය: 0702475248. පහතින් පණිවිඩ ආකෘතියක් තෝරන්න.',
    whatsAppDirectNumber: 'ක්ෂණික ඇමතුම්: +94 70 247 5248',
    whatsAppTemplateTitle: 'ක්ෂණික පණිවිඩ ආකෘතියක් තෝරන්න:',
    whatsAppTemplateRoad: 'ගරු මන්ත්‍රී සරූජ් මැතිතුමනි, කොට්ඨාශ 5 හි අබලන් මාර්ගයක් පිළිබඳව දැනුම් දීමට කැමැත්තෙමි...',
    whatsAppTemplateWater: 'ගරු මන්ත්‍රී සරූජ් මැතිතුමනි, අප ප්‍රදේශයේ ජල සැපයුම / කාණු පද්ධතියේ ගැටලුවක් පවතී...',
    whatsAppTemplateGrievance: 'ගරු මන්ත්‍රී සරූජ් මැතිතුමනි, මාහට ඔබතුමා හමුවී සාකච්ඡා කිරීමට අවශ්‍යව ඇත...',
    whatsAppTemplateInquiry: 'ගරු මන්ත්‍රී සරූජ් මැතිතුමනි, ප්‍රදේශයේ ක්‍රියාත්මක සංවර්ධන ව්‍යාපෘති පිළිබඳව දැනගැනීමට කැමැත්තෙමි...',
    whatsAppLaunchBtn: 'වට්ස්ඇප් (WhatsApp) මගින් සම්බන්ධ වන්න',

    modalProfileTitle: 'පුරවැසි ගිණුම සහ සැකසුම්',
    modalProfileSubtitle: 'භාෂා මනාපයන් සහ ඔබ යොමුකළ පැමිණිලි ලැයිස්තුව කළමනාකරණය කරන්න.',
    profileLanguageLabel: 'භාෂා තේරීම (Interface Language)',
    profileSavedGrievances: 'ඔබේ ක්‍රියාකාරී පැමිණිලි',

    modalAboutTitle: 'නගර සභා මන්ත්‍රී සරූජ් සත්තාර් පිළිබඳව',
    modalAboutSubtitle: 'මීගමුව මහ නගර සභාවේ කොට්ඨාශ 05 පෙරියමුල්ල නියෝජනය කරන ජනතා නියෝජිත.',
    aboutVisionHeading: 'ජනතා සේවයට කැපවීම',
    aboutVisionDesc: 'නායකත්වය යනු බලය නොව, ආදරය, නිහතමානීකම සහ ජනතාවට සමීපව සේවය කිරීම බව විශ්වාස කරයි.',
    aboutWardRecordHeading: 'පෙරියමුල්ල සංවර්ධන දැක්ම',
    aboutWardRecordDesc: 'නවීන වැසි ජල කාණු පද්ධති, තාර දැමූ මාර්ග, වීදි ලාම්පු සහ නොමිලේ සෞඛ්‍ය සායන කොට්ඨාශය පුරා ක්‍රියාත්මක කිරීම.',

    chatbotTitle: 'කොට්ඨාශ 5 AI පුරවැසි සහායක',
    chatbotSubtitle: 'Gemini AI බලගැන්වීමෙන් • 24/7 නාගරික උපදෙස්',
    chatbotGreeting: 'ආයුබෝවන්! මම මන්ත්‍රී සරූජ් සත්තාර්ගේ AI පුරවැසි සහායකයා වෙමි. මීගමුව කොට්ඨාශ 05 නාගරික සේවාවන් පිළිබඳව ඔබට උදව් කරන්නේ කෙසේද?',
    chatbotPlaceholder: 'සිංහල, දෙමළ හෝ ඉංග්‍රීසි භාෂාවෙන් ඔබේ ප්‍රශ්නය යොමු කරන්න...',
    chatbotSendBtn: 'යවන්න',
    chatbotSuggestPothole: 'අබලන් මාර්ගයක් හෝ වලක් පිළිබඳව පැමිණිලි කරන්නේ කෙසේද?',
    chatbotSuggestProjects: 'කොට්ඨාශ 5 හි දැනට සිදුවන සංවර්ධන ව්‍යාපෘති මොනවාද?',
    chatbotSuggestEmergency: 'හදිසි රෝහල් සහ ආපදා අංක පෙන්වන්න',
    chatbotSuggestHotline: 'මන්ත්‍රී සරූජ් සෘජුව සම්බන්ධ කර ගන්නේ කෙසේද?',
  },

  // ==========================================
  // TAMIL (தமிழ்)
  // ==========================================
  ta: {
    // Nav
    navHotline: 'அவசர அழைப்பு: 0702475248',
    navNegomboMc: 'நீர்கொழும்பு மாநகர சபை • வட்டாரம் 05',
    navPortalTagline: 'அதிகாரப்பூர்வ மக்கள் குறைதீர்க்கும் மற்றும் குடிமக்கள் தளம் • பெரியமுல்லை & நீர்கொழும்பு மாநகர சபை',
    navHome: 'முகப்பு',
    navServices: 'சேவைகள்',
    navProjects: 'திட்டங்கள்',
    navAnnouncements: 'அறிவிப்புகள்',
    navEmergency: 'அவசர சேவைகள்',
    navAbout: 'சரூஜ் பற்றி',
    navContact: 'தொடர்புகொள்ள',
    navSubmitGrievance: 'புகார் சமர்ப்பிக்க',
    navCitizenPortal: 'குடிமக்கள் தளம்',
    navRenderConfig: 'render.yaml',

    // Hero
    portalTitle: 'அதிகாரப்பூர்வ மக்கள் குறைதீர்க்கும் மற்றும் குடிமக்கள் தளம்',
    wardInfo: 'நீர்கொழும்பு மாநகர சபை • வட்டாரம் 05 பெரியமுல்லை',
    welcomeTo: 'நல்வரவு',
    councillorName: 'சரூஜ் சத்தார்',
    communityForum: 'சமூக மன்றம்',
    heroSubtitle: 'சிறந்த, பாதுகாப்பான மற்றும் வளமான நீர்கொழும்புக்காக ஒன்றிணைந்து செயலாற்றும் மக்கள் தளம்.',
    buildCommunityBtn: 'நமது சமூகத்தை கட்டியெழுப்புவோம்',
    viewProjectsBtn: 'மக்கள் பணிகளைப் பார்க்கவும்',
    directLine: 'நேரடித் தொலைபேசி: 0702475248',
    openWhatsApp: 'வாட்ஸ்அப்பில் தொடர்புகொள்ள',
    voiceNoteTitle: 'மாநகர சபை உறுப்பினரின் குரல் பதிவு',
    voiceNoteStatus: 'ஆடியோ',
    voiceNotePlaying: 'ஒலிக்கிறது',
    voiceNoteQuote: '"நீர்கொழும்பு மக்களுக்காக எனது கதவு எப்போதும் திறந்திருக்கும்..."',
    hotlineTitle: 'குடிமக்கள் அவசர உதவி',
    hotlineLive: '24/7 நேரடி சேவை',
    hotlineDesc: 'மாநகர சபை உறுப்பினர் சரூஜ் சத்தாரின் பெரியமுல்லை செயலக நேரடி தொலைபேசி சேவை.',
    campaignPostersLabel: 'அதிகாரப்பூர்வ சுவரொட்டிகள்:',
    backgroundBtn: 'பின்னணி',
    backgroundModalTitle: 'பின்னணிப் புகைப்படம்',
    uploadBackgroundPhoto: 'பின்னணிப் படத்தை பதிவேற்றுக',
    backgroundVisibility: 'பின்னணித் தெளிவு:',
    resetDefaultPoster: 'இயல்புநிலைக்கு மாற்றுக',

    // 8 Service Modules Grid
    serviceDashboardBadge: 'நேரடி மக்கள் சேவைகள் • வட்டாரம் 05 பெரியமுல்லை',
    serviceDashboardTitle: 'சமூக சேவை கட்டுப்பாட்டுப் பலகை',
    serviceDashboardSubtitle: 'புகாரளிக்க, கள பொறியாளர்களின் பணிகளை நேரடியாக கண்காணிக்க அல்லது உறுப்பினர் சரூஜ் சத்தாரை நேரடியாக தொடர்பு கொள்ள கீழே உள்ள சேவையைத் தேர்ந்தெடுக்கவும்.',
    searchServicesPlaceholder: 'சேவைகள் அல்லது தலைப்புகளைத் தேடுங்கள்...',
    metricResolutionRate: '94.8%',
    metricResolutionLabel: 'குறைதீர்ப்பு தீர்வு வீதம்',
    metricResponseTime: '< 48 மணி',
    metricResponseLabel: 'கள ஆய்வு பதில் நேரம்',
    metricCoverage: '100%',
    metricCoverageLabel: 'வட்டாரம் 05 முழு கவரேஜ்',
    metricHelpline: '24/7',
    metricHelplineLabel: 'மக்கள் உதவி சேவை',
    filterAll: 'அனைத்தும்',
    filterGrievance: 'குறைகள்',
    filterDevelopment: 'அபிவிருத்தி',
    filterNews: 'செய்திகள்',
    filterContact: 'தொடர்பு',
    filterEmergency: 'அவசரம்',
    filterCommunity: 'சமூகம்',
    openServiceBtn: 'சேவையைத் திறக்க',
    activeComplaintsTag: 'செயலில்',
    projectsTag: 'திட்டங்கள்',
    noticesTag: 'அறிவிப்புகள்',
    volunteersTag: '+ தொண்டர்கள்',
    helpline247Tag: '24/7 அவசர உதவி',
    aiAssistedTag: 'AI உதவி',
    civicPortalTag: 'குடிமக்கள் தளம்',

    modules: {
      submitComplaint: {
        title: 'புகார் சமர்ப்பிக்க',
        subtitle: 'வட்டாரம் 05 பிரச்சனைகளை நேரடியாகத் தெரிவிக்க',
      },
      myComplaints: {
        title: 'என் புகார்கள்',
        subtitle: 'உங்கள் கோரிக்கைகளின் முன்னேற்றத்தை அறிய',
      },
      communityProjects: {
        title: 'சமூகத் திட்டங்கள்',
        subtitle: 'நடைபெறும், முடிந்த மற்றும் எதிர்கால பணிகள்',
      },
      announcements: {
        title: 'அறிவிப்புகள்',
        subtitle: 'மாநகர சபை மற்றும் வட்டார செய்திகள்',
      },
      contactSarooj: {
        title: 'சரூஜைத் தொடர்புகொள்ள',
        subtitle: 'நேரடி வாட்ஸ்அப் கலந்துரையாடல்',
      },
      emergencyContacts: {
        title: 'அவசர தொடர்புகள்',
        subtitle: 'பொலிஸ், தீயணைப்பு, வைத்தியசாலை, வெள்ள நிவாரணம்',
      },
      communityMembers: {
        title: 'சமூக உறுப்பினர்கள்',
        subtitle: 'பதிவுசெய்த செயலில் உள்ள தொண்டர்கள்',
      },
      myProfile: {
        title: 'என் சுயவிவரம்',
        subtitle: 'குடிமக்கள் விருப்பங்கள் மற்றும் மொழி',
      },
    },

    // Civic Gallery
    civicGalleryBadge: 'புகைப்பட சான்றுகள் • கள யதார்த்தம்',
    civicGalleryTitle: 'களப்பணிகள் மற்றும் மக்கள் சேவை',
    civicGallerySubtitle: 'வட்டாரம் 05 பெரியமுல்லை முழுவதும் மேற்கொள்ளப்பட்ட உட்கட்டமைப்பு, இலவச மருத்துவ முகாம்கள் மற்றும் மக்கள் நலத்திட்டங்களின் புகைப்பட ஆவணங்கள்.',
    galleryFilterAll: 'அனைத்து பணிகள்',
    galleryFilterInfrastructure: 'உட்கட்டமைப்பு',
    galleryFilterHealth: 'சுகாதாரம் & நிவாரணம்',
    galleryFilterYouth: 'இளைஞர் & விளையாட்டு',
    galleryFilterMeetings: 'மக்கள் சந்திப்புகள்',
    galleryFilterEnvironment: 'சுற்றுச்சூழல்',
    galleryImpactLabel: 'சமூகப் பலன்:',
    galleryCouncillorNoteLabel: 'உறுப்பினரின் குறிப்பு:',
    galleryLocationLabel: 'இடம்:',
    galleryDateLabel: 'தேதி:',
    galleryViewPhotoBtn: 'விவரங்களைப் பார்க்க',
    gallerySubmitPromptTitle: 'உங்கள் வீதியில் ஏதேனும் பிரச்சனையா?',
    gallerySubmitPromptDesc: 'உடைந்த வீதிகள், அடைபட்ட வடிகால்கள் அல்லது எரியாத தெருவிளக்குகள் பற்றிய புகைப்படங்களை அனுப்பி உடனடி தீர்வு பெறுங்கள்.',
    gallerySubmitActionBtn: 'இப்போதே புகாரளிக்கவும்',

    // Quick Contact & Ongoing Project
    quickContactTitle: 'விரைவு தொடர்பு',
    quickContactSubtitle: 'நீர்கொழும்பு செயலகம் மற்றும் கள அலுவலகம்',
    quickContactStatus: 'மக்களுக்காக திறந்துள்ளது',
    quickContactLocation: 'முகவரி',
    quickContactAddress: 'நீர்கொழும்பு மாநகர சபை செயலகம், புனித லாசரஸ் வீதி, பெரியமுல்லை, நீர்கொழும்பு',
    quickContactPhoneLabel: 'நேரடி தொலைபேசி',
    quickContactEmailLabel: 'அதிகாரப்பூர்வ மின்னஞ்சல்',
    quickContactHoursLabel: 'சேவை நேரம்',
    quickContactHoursValue: 'திங்கள் – சனி: காலை 8:00 – மாலை 6:30 (24/7 வாட்ஸ்அப் உதவி)',
    quickContactDirectBtn: 'நேரடி செய்தி அனுப்ப',
    quickContactFieldOffice: 'தினமும் காலையில் மக்கள் சந்திப்புகளுக்கு திறந்திருக்கும்.',

    ongoingProjectBadge: 'நடைபெறும் மாநகர பணி',
    ongoingProjectTitle: 'பெரியமுல்லை வீதி அபிவிருத்தி திட்டம்',
    ongoingProjectSubtitle: 'புனித லாசரஸ் வீதியில் தார் இடுதல், கான்கிரீட் வடிகால்கள் மற்றும் மழைநீர் வடிகால் கட்டமைப்பு பணிகள்.',
    ongoingProjectProgress: 'நிறைவடைந்த முன்னேற்றம்',
    ongoingProjectBudget: 'ஒதுக்கப்பட்ட நிதி: ரூ. 18.5 மில்லியன்',
    ongoingProjectContractor: 'ஒப்பந்ததாரர்: மேல் மாகாண வீதி அபிவிருத்தி அதிகாரசபை & நீர்கொழும்பு மா.ச.',
    ongoingProjectTarget: 'எதிர்பார்க்கப்படும் நிறைவு: நவம்பர் 2024 (4,200+ குடும்பங்கள் பயனடைகின்றன)',
    ongoingProjectViewAllBtn: 'அனைத்து திட்டங்களையும் பார்க்க',
    ongoingProjectStatusOngoing: 'பணிகள் நடைபெறுகின்றன (65%)',
    ongoingProjectStatusCompleted: 'வெற்றிகரமாக நிறைவடைந்தது',
    ongoingProjectStatusPlanning: 'திட்டமிடல் கட்டத்தில்',

    // Stay Connected
    stayConnectedTitle: 'உங்கள் வட்டாரத்துடன் இணைந்திருங்கள்',
    stayConnectedSubtitle: 'மாநகர சபை அறிவிப்புகள், அவசர எச்சரிக்கைகள் மற்றும் அபிவிருத்தி அறிக்கைகளை நேரடியாகப் பெறுங்கள்.',
    subscribeNamePlaceholder: 'உங்கள் முழுப் பெயரை உள்ளிடவும்...',
    subscribeEmailPlaceholder: 'உங்கள் மின்னஞ்சல் முகவரியை உள்ளிடவும்...',
    subscribeBtn: 'பதிவு செய்யுங்கள்',
    subscribeSubscribing: 'பதிவாகிறது...',
    subscribeSuccessTitle: 'பதிவு செய்ததற்கு நன்றி!',
    subscribeSuccessDesc: 'வட்டாரம் 05 அதிகாரப்பூர்வ செய்திகளுக்கு நீங்கள் பதிவு செய்யப்பட்டுள்ளீர்கள்.',

    // Footer
    footerAboutTitle: 'சரூஜ் சத்தார்',
    footerAboutDesc: 'பெரியமுல்லை மற்றும் நீர்கொழும்பு மக்களுக்கு வெளிப்படைத்தன்மை, நேரடி குறைதீர்ப்பு மற்றும் அர்ப்பணிப்புள்ள பொதுச்சேவை வழங்குதல்.',
    footerQuickLinksTitle: 'முக்கிய பக்கங்கள்',
    footerServicesTitle: 'குடிமக்கள் சேவைகள்',
    footerContactTitle: 'அலுவலகம்',
    footerSecretariatAddress: 'பெரியமுல்லை செயலகம், புனித லாசரஸ் வீதி, நீர்கொழும்பு, இலங்கை',
    footerCopyright: '© 2024 நீர்கொழும்பு மாநகர சபை • வட்டாரம் 05 பெரியமுல்லை. மக்கள் நலனுக்காக அர்ப்பணிக்கப்பட்டது.',
    footerCivicDuty: 'சேவை செய்வது என் பெருமை அல்ல — அது என் புனிதமான பொறுப்பு.',

    // Modals
    modalSubmitTitle: 'குடிமக்கள் புகார் சமர்ப்பிக்க',
    modalSubmitSubtitle: 'செயற்கை நுண்ணறிவு (AI) உதவியுடன் உறுப்பினர் சரூஜ் சத்தாரின் அலுவலகத்திற்கு நேரடியாகப் புகாரளியுங்கள்.',
    formComplaintTitle: 'புகாரின் தலைப்பு',
    formComplaintTitlePlaceholder: 'எ.கா., 3ஆம் ஒழுங்கையில் உடைந்த குடிநீர் குழாயால் வீதியில் வெள்ளப்பெருக்கு',
    formCategory: 'துறை / வகைப்பாடு',
    formWard: 'வட்டாரம் / பகுதி',
    formLocationAddress: 'சரியான முகவரி அல்லது அடையாளம்',
    formLocationPlaceholder: 'எ.கா., புனித அந்தோனியார் சந்தி அருகில், இலக்கம் 42',
    formDescription: 'பிரச்சனை பற்றிய விரிவான விளக்கம்',
    formDescriptionPlaceholder: 'பிரச்சனையை தெளிவாக விளக்குங்கள். எவ்வளவு காலமாக உள்ளது? எத்தனை வீடுகள் பாதிக்கப்பட்டுள்ளன?',
    formAiAutoAnalyzeBtn: 'AI மூலம் வகை மற்றும் அவசரத்தை கண்டறிக',
    formAiAnalyzing: 'Gemini AI ஆய்வு செய்கிறது...',
    formAiAnalysisTitle: 'Gemini AI ஆய்வு முடிவு',
    formUrgencyUrgent: 'மிக அவசர நிலை (24 மணி நேர தீர்வு)',
    formUrgencyHigh: 'உயர் முன்னுரிமை (48 மணி நேர தீர்வு)',
    formUrgencyMedium: 'நடுத்தர முன்னுரிமை (3-5 நாட்கள்)',
    formUrgencyLow: 'வழக்கமான பராமரிப்பு',
    formCitizenName: 'உங்கள் முழுப் பெயர்',
    formCitizenPhone: 'தொலைபேசி எண் (WhatsApp விரும்பத்தக்கது)',
    formCitizenEmail: 'மின்னஞ்சல் முகவரி (விரும்பினால்)',
    formPhotoUpload: 'புகைப்பட ஆதாரம் இணைக்கவும்',
    formPhotoUploadHelper: 'உடைந்த வீதி, தெருவிளக்கு அல்லது வடிகால் புகைப்படம் (விரும்பினால்)',
    formSubmitBtn: 'புகாரை நேரடியாக சமர்ப்பிக்க',
    formSubmitting: 'புகார் பதிவாகிறது...',
    formSuccessTitle: 'புகார் வெற்றிகரமாகப் பதிவு செய்யப்பட்டது!',
    formSuccessRefCode: 'புகார் கண்காணிப்பு இலக்கம் (Reference Code):',
    formSuccessDesc: 'உங்கள் புகார் வட்டாரம் 05 செயலகத்திற்கு கிடைத்துள்ளது. SMS மற்றும் WhatsApp மூலம் நிலவரம் தெரிவிக்கப்படும்.',
    formViewTrackerBtn: 'புகாரின் நிலையை கண்காணிக்க',
    formCloseBtn: 'மூடுக',

    modalTrackerTitle: 'மக்கள் புகார் கண்காணிப்பு',
    modalTrackerSubtitle: 'புகாரின் நிலை, ஒதுக்கப்பட்ட பொறியாளர் மற்றும் தீர்வு அறிக்கைகளை கண்காணிக்கவும்.',
    trackerSearchPlaceholder: 'புகார் இலக்கம் (எ.கா., CMP-001) அல்லது வீதியின் பெயரை உள்ளிடவும்...',
    trackerFilterAll: 'அனைத்து நிலைகளும்',
    trackerFilterSubmitted: 'சமர்ப்பிக்கப்பட்டது',
    trackerFilterUnderReview: 'பரிசீலனையில்',
    trackerFilterAssigned: 'பொறியாளர் நியமனம்',
    trackerFilterInProgress: 'பணிகள் நடக்கிறது',
    trackerFilterResolved: 'தீர்க்கப்பட்டது',
    trackerStatusSubmitted: 'புகார் பெறப்பட்டது',
    trackerStatusUnderReview: 'ஆய்வு செய்யப்படுகிறது',
    trackerStatusAssigned: 'ஆய்வாளருக்கு ஒதுக்கப்பட்டது',
    trackerStatusInProgress: 'களப்பணி நடைபெறுகிறது',
    trackerStatusResolved: 'முழுமையாக தீர்க்கப்பட்டது',
    trackerUpvoteBtn: 'ஆதரவளிக்கவும்',
    trackerCouncillorFeedback: 'உறுப்பினர் சரூஜ் சத்தாரின் பதில்',
    trackerResolutionNotes: 'கள பொறியாளர் அறிக்கை',
    trackerSubmitNewBtn: 'புதிய புகார் அளிக்க',
    trackerNoComplaintsFound: 'தேடலுக்குரிய புகார்கள் எதுவும் காணப்படவில்லை.',

    modalProjectsTitle: 'வட்டாரம் 05 அபிவிருத்தி திட்டங்கள்',
    modalProjectsSubtitle: 'பொது உட்கட்டமைப்பு பணிகள், தார் வீதிகள் மற்றும் சமூக நிலையங்கள் பற்றிய முழுமையான விபரம்.',
    projectsFilterAll: 'அனைத்து திட்டங்கள்',
    projectsFilterOngoing: 'நடைபெறும் பணிகள்',
    projectsFilterPlanning: 'திட்டமிடல் கட்டத்தில்',
    projectsFilterCompleted: 'நிறைவடைந்த பணிகள்',
    projectBudgetLabel: 'நிதி ஒதுக்கீடு:',
    projectProgressLabel: 'முன்னேற்றம்:',
    projectContractorLabel: 'பொறுப்பான அதிகாரம்:',
    projectTimelineLabel: 'இலக்கு தேதி:',

    modalAnnouncementsTitle: 'மாநகர சபை அறிவிப்புகள் மற்றும் சுற்றறிக்கைகள்',
    modalAnnouncementsSubtitle: 'அதிகாரப்பூர்வ அறிவிப்புகள், வெள்ள எச்சரிக்கைகள், நீர் விநியோக பராமரிப்பு மற்றும் மக்கள் கூட்டங்கள்.',
    announcementPriorityUrgent: 'மிக முக்கிய அவசர எச்சரிக்கை',
    announcementPriorityHigh: 'முக்கிய அறிவிப்பு',
    announcementPriorityNormal: 'வட்டார சுற்றறிக்கை',
    announcementReadMore: 'முழு அறிவிப்பை படிக்க',

    modalEmergencyTitle: '24/7 நீர்கொழும்பு அவசர உதவி எண்கள்',
    modalEmergencySubtitle: 'மருத்துவம், வெள்ள நிவாரணம், பொலிஸ் மற்றும் தீயணைப்பு படைகளுக்கான நேரடி அழைப்புகள்.',
    emergencyCallNow: 'உடனடியாக அழைக்க',
    emergency24HourService: '24 மணி நேர அவசர சேவை மையம்',

    modalVolunteerTitle: 'வட்டாரம் 05 இளைஞர் & சமூக தொண்டர் படையில் இணையுங்கள்',
    modalVolunteerSubtitle: 'நலன்புரி திட்டங்கள் மற்றும் பொதுப்பணிகளுக்காக உறுப்பினர் சரூஜ் சத்தாருடன் கைகோருங்கள்.',
    volunteerNameLabel: 'உங்கள் முழுப் பெயர்',
    volunteerPhoneLabel: 'தொலைபேசி எண்',
    volunteerSkillsLabel: 'ஆர்வம் உள்ள துறை / திறமைகள்',
    volunteerSubmitBtn: 'தொண்டராகப் பதிவு செய்க',
    volunteerSuccessMsg: 'நன்றி! செயலகக் குழு உங்களை விரைவில் தொடர்பு கொள்ளும்.',

    modalWhatsAppTitle: 'சரூஜ் சத்தாருடன் நேரடி வாட்ஸ்அப் இணைப்பு',
    modalWhatsAppSubtitle: 'நேரடி மக்கள் தொடர்பு எண்: 0702475248. கீழேயுள்ள மாதிரி செய்திகளில் ஒன்றைத் தேர்ந்தெடுக்கவும்.',
    whatsAppDirectNumber: 'அவசர எண்: +94 70 247 5248',
    whatsAppTemplateTitle: 'ஒரு மாதிரி செய்தியைத் தேர்ந்தெடுக்கவும்:',
    whatsAppTemplateRoad: 'ஸலாம் / வணக்கம் உறுப்பினர் சரூஜ் அவர்களே, வட்டாரம் 5 இல் உள்ள உடைந்த வீதி பற்றி தெரிவிக்க விரும்புகிறேன்...',
    whatsAppTemplateWater: 'ஸலாம் / வணக்கம் உறுப்பினர் சரூஜ் அவர்களே, எங்கள் பகுதியில் குடிநீர் / வடிகால் பிரச்சனை உள்ளது...',
    whatsAppTemplateGrievance: 'ஸலாம் / வணக்கம் உறுப்பினர் சரூஜ் அவர்களே, உங்களை நேரில் சந்தித்து பேச விரும்புகிறேன்...',
    whatsAppTemplateInquiry: 'ஸலாம் / வணக்கம் உறுப்பினர் சரூஜ் அவர்களே, நடைபெற்று வரும் அபிவிருத்தி திட்டங்கள் பற்றி அறிய விரும்புகிறேன்...',
    whatsAppLaunchBtn: 'வாட்ஸ்அப் (WhatsApp) திறக்க',

    modalProfileTitle: 'குடிமக்கள் சுயவிவரம் மற்றும் அமைப்புகள்',
    modalProfileSubtitle: 'மொழி விருப்பங்கள் மற்றும் நீங்கள் சமர்ப்பித்த புகார்களை நிர்வகிக்கவும்.',
    profileLanguageLabel: 'தளத்தின் மொழித் தேர்வு (Interface Language)',
    profileSavedGrievances: 'உங்கள் தற்போதைய புகார்கள்',

    modalAboutTitle: 'மாநகர சபை உறுப்பினர் சரூஜ் சத்தார் பற்றி',
    modalAboutSubtitle: 'நீர்கொழும்பு மாநகர சபையில் வட்டாரம் 05 பெரியமுல்லையைப் பிரதிநிதித்துவப்படுத்தும் மக்கள் பிரதிநிதி.',
    aboutVisionHeading: 'மக்கள் சேவைக்கான அர்ப்பணிப்பு',
    aboutVisionDesc: 'தலைமைத்துவம் என்பது அதிகாரத்தால் அல்ல, மாறாக அன்பு, பணிவு மற்றும் மக்களுடன் இணைந்திருப்பதன் மூலமே நிலைபெறுகிறது என்பதை ஆழமாக நம்புகிறார்.',
    aboutWardRecordHeading: 'பெரியமுல்லை அபிவிருத்தி திட்ட வரைவு',
    aboutWardRecordDesc: 'நவீன மழைநீர் வடிகால்கள், தார் வீதிகள், தெருவிளக்குகள் மற்றும் இலவச மருத்துவ முகாம்களை வட்டாரம் முழுவதும் முன்னெடுத்தல்.',

    chatbotTitle: 'வட்டாரம் 5 AI மக்கள் உதவியாளர்',
    chatbotSubtitle: 'Gemini AI தொழில்நுட்பம் • 24/7 மாநகர வழிகாட்டுதல்',
    chatbotGreeting: 'வணக்கம் / அஸ்ஸலாமு அலைக்கும்! நான் உறுப்பினர் சரூஜ் சத்தாரின் AI மக்கள் உதவியாளர். நீர்கொழும்பு வட்டாரம் 05 சேவைகள் தொடர்பாக நான் உங்களுக்கு எவ்வாறு உதவ முடியும்?',
    chatbotPlaceholder: 'தமிழ், சிங்களம் அல்லது ஆங்கிலத்தில் உங்கள் கேள்வியைக் கேளுங்கள்...',
    chatbotSendBtn: 'அனுப்புக',
    chatbotSuggestPothole: 'உடைந்த வீதி அல்லது பள்ளம் பற்றி எவ்வாறு புகாரளிப்பது?',
    chatbotSuggestProjects: 'வட்டாரம் 5 இல் தற்போது நடைபெறும் திட்டங்கள் எவை?',
    chatbotSuggestEmergency: 'அவசர வைத்தியசாலை மற்றும் வெள்ள நிவாரண எண்களைக் காட்டு',
    chatbotSuggestHotline: 'உறுப்பினர் சரூஜை எவ்வாறு நேரடியாகத் தொடர்புகொள்வது?',
  },
};
