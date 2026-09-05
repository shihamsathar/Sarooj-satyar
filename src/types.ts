export type ComplaintStatus = 
  | 'submitted' 
  | 'under_review' 
  | 'assigned' 
  | 'in_progress' 
  | 'resolved' 
  | 'rejected';

export type ComplaintCategory = 
  | 'Roads & Infrastructure'
  | 'Sanitation & Waste'
  | 'Streetlights & CEB'
  | 'Water Supply & Drainage'
  | 'Public Health & Dengue'
  | 'Community Welfare'
  | 'Building & Encroachment'
  | 'Other Municipal Services';

export type ComplaintPriority = 'emergency' | 'high' | 'medium' | 'low';

export interface Complaint {
  id: string;
  refCode: string;
  title: string;
  description: string;
  category: ComplaintCategory;
  priority: ComplaintPriority;
  status: ComplaintStatus;
  ward: string;
  locationAddress: string;
  citizenName: string;
  citizenPhone: string;
  citizenEmail?: string;
  photoUrl?: string;
  resolutionNote?: string;
  resolutionPhotoUrl?: string;
  assignedDepartment?: string;
  estimatedDays?: number;
  upvotes: number;
  aiSummary?: string;
  aiSuggestedAction?: string;
  councillorFeedback?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CommunityProject {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  ward: string;
  progressPercentage: number;
  status: 'planning' | 'ongoing' | 'completed';
  budgetLKR: number;
  spentLKR: number;
  contractor: string;
  startDate: string;
  expectedEndDate: string;
  imageUrl: string;
  beforeImageUrl?: string;
  afterImageUrl?: string;
  impactMetric: string;
  highlights: string[];
}

export interface Announcement {
  id: string;
  title: string;
  category: 'Urgent Notice' | 'Municipal Council' | 'Community Welfare' | 'Health & Sanitation' | 'Events & Townhalls';
  content: string;
  date: string;
  priority: 'high' | 'normal';
  author: string;
  tags: string[];
  actionLink?: string;
  actionText?: string;
}

export interface CommunityMember {
  id: string;
  name: string;
  role: 'Ward Leader' | 'Community Volunteer' | 'Youth Wing Member' | 'Advisory Committee' | 'Civic Inspector';
  ward: string;
  phone: string;
  email?: string;
  avatarUrl: string;
  joinedDate: string;
  contributionsCount: number;
  badge: string;
  specialization?: string;
}

export interface EmergencyContact {
  id: string;
  organization: string;
  category: 'Police' | 'Healthcare' | 'Fire & Rescue' | 'Utilities' | 'Disaster Management' | 'Municipal';
  hotline: string;
  directPhone: string;
  address: string;
  operationalHours: string;
  notes: string;
  iconName: string;
}

export interface CouncillorMessage {
  id: string;
  senderName: string;
  senderPhone: string;
  senderEmail?: string;
  subject: string;
  message: string;
  ward?: string;
  channel: 'whatsapp' | 'web_portal' | 'office_visit';
  createdAt: string;
}

export interface CommunityStats {
  totalComplaints: number;
  resolvedComplaints: number;
  activeProjects: number;
  communityVolunteers: number;
  citizensServed: number;
  resolutionRatePercent: number;
  fundsDisbursedLKR: number;
}

export type UserRole = 'admin' | 'citizen';

export interface AdminUser {
  id: string;
  role: 'admin';
  username: string;
  name: string;
  title: string;
  email?: string;
  token: string;
  loginTime: string;
}

export interface CitizenUser {
  id: string;
  role: 'citizen';
  phone: string;
  name: string;
  ward: string;
  token: string;
  loginTime: string;
}

export type AuthUser = AdminUser | CitizenUser;

export interface CustomGalleryItem {
  id: string;
  title: string;
  titleTa?: string;
  titleSi?: string;
  category: 'Meetings' | 'Infrastructure' | 'Healthcare' | 'Environment' | 'Youth' | 'Community';
  location: string;
  locationTa?: string;
  locationSi?: string;
  date: string;
  photoUrl: string;
  caption: string;
  captionTa?: string;
  captionSi?: string;
  impact?: string;
  councillorNote?: string;
}

export interface AppPhotoConfig {
  background: {
    url: string;
    enabled: boolean;
    opacity: number; // 0.05 to 0.90
    blur: number; // 0 to 12px
    overlayStyle: 'warm' | 'emerald' | 'subtle' | 'dark';
    scope: 'hero' | 'entire_app';
  };
  portrait: {
    url: string;
    enabled: boolean;
    caption?: string;
  };
  ongoingProject: {
    url: string;
    caption?: string;
    title?: string;
  };
  customGalleryItems: CustomGalleryItem[];
}


