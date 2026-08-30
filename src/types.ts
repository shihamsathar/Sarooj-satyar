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
