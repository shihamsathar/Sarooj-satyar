import pg from 'pg';
import type { Complaint, CommunityProject, Announcement, CommunityMember, EmergencyContact, CouncillorMessage, CommunityStats } from '../src/types.js';

const { Pool } = pg;

// Check for DATABASE_URL (provided by Render managed Postgres or local setup)
const databaseUrl = process.env.DATABASE_URL;

let pool: pg.Pool | null = null;
let isPostgresConnected = false;

if (databaseUrl && !databaseUrl.includes('placeholder')) {
  try {
    pool = new Pool({
      connectionString: databaseUrl,
      ssl: databaseUrl.includes('localhost') || databaseUrl.includes('127.0.0.1')
        ? false
        : { rejectUnauthorized: false }, // Render PostgreSQL uses SSL
      max: 10,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 5000,
    });

    pool.on('error', (err) => {
      console.error('Unexpected error on idle PostgreSQL client:', err);
    });

    console.log('🔗 PostgreSQL pool initialized with connection string.');
  } catch (err) {
    console.warn('⚠️ Failed to initialize PostgreSQL pool, using fallback memory storage:', err);
    pool = null;
  }
} else {
  console.log('ℹ️ No PostgreSQL DATABASE_URL detected. Running with high-performance in-memory persistence store.');
}

// Initial Seed Data for Sarooj Sattar Community Forum (Negombo)
const initialComplaints: Complaint[] = [
  {
    id: 'c1',
    refCode: 'NEG-2024-1082',
    title: 'Severe Drainage Clogging on St. Lazarus Road after heavy rains',
    description: 'The main concrete storm drain near junction 4 on St. Lazarus Road is blocked by debris, causing water stagnation and mosquito breeding. Road is partially flooded during evening showers.',
    category: 'Water Supply & Drainage',
    priority: 'high',
    status: 'in_progress',
    ward: 'Periyamulla',
    locationAddress: 'St. Lazarus Road, near House No. 48, Periyamulla, Negombo',
    citizenName: 'Mohamed Fazil',
    citizenPhone: '0773948210',
    citizenEmail: 'fazil.negombo@gmail.com',
    photoUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=800&q=80',
    assignedDepartment: 'Negombo Municipal Works & Drainage Dept',
    estimatedDays: 3,
    upvotes: 24,
    aiSummary: 'Clogged roadside stormwater drainage causing localized flooding and vector health risk.',
    aiSuggestedAction: 'Deploy municipal vacuum suction gully emptier and concrete cover inspection team.',
    councillorFeedback: 'Inspected on site yesterday with MC Works Engineer. Cleaning crew scheduled for Friday morning.',
    createdAt: new Date(Date.now() - 3 * 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 86400000).toISOString(),
  },
  {
    id: 'c2',
    refCode: 'NEG-2024-1079',
    title: 'Faulty Streetlights along Main Periyamulla Commercial Stretch',
    description: 'Four consecutive solar/LED streetlights have stopped functioning between Mosque Junction and the canal bridge, posing security risks for evening commuters.',
    category: 'Streetlights & CEB',
    priority: 'medium',
    status: 'resolved',
    ward: 'Periyamulla',
    locationAddress: 'Main Street, Periyamulla, Negombo (Between Mosque Junc & Canal Bridge)',
    citizenName: 'Anthony Fernando',
    citizenPhone: '0714889201',
    citizenEmail: 'a.fernando@yahoo.com',
    photoUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80',
    resolutionNote: 'All 4 LED luminaires replaced with energy-efficient 90W council fixtures. Testing completed.',
    resolutionPhotoUrl: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=800&q=80',
    assignedDepartment: 'Electrical Division, Negombo MC',
    estimatedDays: 2,
    upvotes: 41,
    aiSummary: 'Lighting failure on key thoroughfare affecting pedestrian & vehicular safety.',
    councillorFeedback: 'Resolved within 48 hours following priority ticket assignment.',
    createdAt: new Date(Date.now() - 7 * 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 5 * 86400000).toISOString(),
  },
  {
    id: 'c3',
    refCode: 'NEG-2024-1085',
    title: 'Urgent Pothole Repair & Asphalt Surfacing near Dalupotha School Lane',
    description: 'Deep potholes have formed following recent monsoon rains, creating severe hazard for school vans and three-wheelers transporting children.',
    category: 'Roads & Infrastructure',
    priority: 'high',
    status: 'under_review',
    ward: 'Dalupotha',
    locationAddress: 'School Lane, Dalupotha Ward 6, Negombo',
    citizenName: 'Chathurika Silva',
    citizenPhone: '0761234987',
    photoUrl: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=800&q=80',
    assignedDepartment: 'Provincial Road Development Authority / Negombo MC',
    estimatedDays: 5,
    upvotes: 38,
    aiSummary: 'Road surface degradation endangering school transport safety.',
    aiSuggestedAction: 'Temporary aggregate patch followed by permanent cold-mix bitumen layering.',
    councillorFeedback: 'Added to the October Emergency Road Maintenance Fund batch.',
    createdAt: new Date(Date.now() - 1 * 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 86400000).toISOString(),
  },
  {
    id: 'c4',
    refCode: 'NEG-2024-1068',
    title: 'Garbage Collection Frequency Request for Sea Street Fish Market Zone',
    description: 'Need additional evening waste collection rounds during weekend peak hours to prevent odor and pest buildup.',
    category: 'Sanitation & Waste',
    priority: 'medium',
    status: 'assigned',
    ward: 'Sea Street',
    locationAddress: 'Near Old Fish Market Roundabout, Sea Street, Negombo',
    citizenName: 'K. Perera',
    citizenPhone: '0758901234',
    assignedDepartment: 'Solid Waste Management Division',
    estimatedDays: 4,
    upvotes: 19,
    createdAt: new Date(Date.now() - 10 * 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 8 * 86400000).toISOString(),
  }
];

const initialProjects: CommunityProject[] = [
  {
    id: 'p1',
    title: 'Road Development Project in Periyamulla',
    slug: 'road-development-periyamulla',
    description: 'Comprehensive asphalt carpeting, concrete curbs, side-drain construction, and pedestrian walkway paving covering 2.4 km along St. Lazarus Road and connecting neighborhood arteries.',
    category: 'Roads & Bridges',
    ward: 'Periyamulla',
    progressPercentage: 65,
    status: 'ongoing',
    budgetLKR: 18500000,
    spentLKR: 12025000,
    contractor: 'Western Provincial Road Development & Negombo MC Engineering Unit',
    startDate: '2024-03-15',
    expectedEndDate: '2024-11-30',
    imageUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=1200&q=80',
    beforeImageUrl: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=800&q=80',
    impactMetric: 'Benefits 4,200+ households, eliminates monsoon waterlogging, smooth transit for public buses.',
    highlights: [
      'Sub-base gravel compaction completed (100%)',
      'Underground stormwater concrete pipes installed (80%)',
      'First layer asphalt carpeting underway on Sector B (65%)',
      'Solar-powered LED streetlights planned for final phase'
    ]
  },
  {
    id: 'p2',
    title: 'Periyamulla Community Health & Welfare Center Modernization',
    slug: 'health-center-modernization',
    description: 'Upgrading the primary citizen dispensary with modern maternal-child healthcare rooms, free pharmacy dispensary, elderly checkup lounge, and digital appointment counter.',
    category: 'Community Centers',
    ward: 'Periyamulla',
    progressPercentage: 90,
    status: 'ongoing',
    budgetLKR: 9200000,
    spentLKR: 8280000,
    contractor: 'Negombo Municipal Health Works Consortium',
    startDate: '2024-01-10',
    expectedEndDate: '2024-09-30',
    imageUrl: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1200&q=80',
    impactMetric: 'Over 850 monthly elderly & maternal patient consultations provided 100% free.',
    highlights: [
      'Interior air conditioning and medical cabinets installed',
      'Solar backup inverter system commissioned',
      'Handicap accessible ramp and emergency triage bay completed'
    ]
  },
  {
    id: 'p3',
    title: 'Negombo Lagoon Canal Cleaning & Flood Barrier Restoration',
    slug: 'canal-flood-barrier',
    description: 'Desilting 4.8 km of connecting tidal canals, clearing water hyacinth vegetation, and reinforcing stone embankment walls to prevent monsoon tidal surge flooding in low-lying residential wards.',
    category: 'Sanitation & Drainage',
    ward: 'Munnakkara & Pitipana',
    progressPercentage: 100,
    status: 'completed',
    budgetLKR: 14000000,
    spentLKR: 13800000,
    contractor: 'Sri Lanka Land Development Corp & Municipal Council',
    startDate: '2023-08-01',
    expectedEndDate: '2024-02-28',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    impactMetric: 'Zero flood incidents reported across 1,800 low-lying residences during recent monsoon.',
    highlights: [
      '12,000 tons of silt and aquatic weed removed',
      'Dual tidal one-way flap gates installed',
      'Community eco-guardians committee formed to monitor illegal dumping'
    ]
  },
  {
    id: 'p4',
    title: 'Solar Smart Street Lighting Initiative - Ward 8 & 9',
    slug: 'solar-smart-lighting',
    description: 'Installation of 180 high-efficiency, dusk-to-dawn standalone solar streetlights with auto-dimming motion sensors across poorly lit neighborhood alleys and school zones.',
    category: 'Lighting & Energy',
    ward: 'Dalupotha & Kochchikade',
    progressPercentage: 35,
    status: 'ongoing',
    budgetLKR: 6500000,
    spentLKR: 2275000,
    contractor: 'SunPower Lanka Tech (Pvt) Ltd',
    startDate: '2024-06-01',
    expectedEndDate: '2024-12-15',
    imageUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1200&q=80',
    impactMetric: 'Saves 38,000 kWh annually for the Municipal Council, enhances night safety for women & youth.',
    highlights: [
      '65 poles mounted and solar panels wired',
      'Battery storage units tested with 48-hour rainy day backup guarantee'
    ]
  }
];

const initialAnnouncements: Announcement[] = [
  {
    id: 'a1',
    title: 'Free Medical Camp & Eye Checkup by Councillor Sarooj Sattar',
    category: 'Community Welfare',
    content: 'Councillor Sarooj Sattar cordially invites all Periyamulla and surrounding ward residents to our comprehensive Free Community Health Camp. Free blood sugar testing, cardiac screening, eye examinations, and 300 free reading glasses will be distributed.',
    date: '2024-09-08',
    priority: 'high',
    author: 'Office of Sarooj Sattar, Councillor',
    tags: ['Health Camp', 'Periyamulla', 'Free Glasses', 'Elderly Care'],
    actionLink: '#contact',
    actionText: 'Register for Camp'
  },
  {
    id: 'a2',
    title: 'Scheduled Water Supply Interruption for Pipeline Maintenance',
    category: 'Urgent Notice',
    content: 'National Water Supply and Drainage Board (NWSDB) informs residents that water pressure will be low on Thursday from 9:00 AM to 5:00 PM due to mainline valve upgrading along Negombo-Colombo Road. Please store sufficient water.',
    date: '2024-09-04',
    priority: 'high',
    author: 'Negombo Municipal Council & NWSDB',
    tags: ['Water Board', 'Service Notice', 'Maintenance']
  },
  {
    id: 'a3',
    title: 'Negombo Dengue Prevention Campaign & Free Yard Fogging',
    category: 'Health & Sanitation',
    content: 'Public Health Inspectors (PHI) alongside our Community Volunteer Force will conduct door-to-door premises inspections and abate mosquito breeding spots across Dalupotha and Periyamulla wards. Please clear roof gutters and discarded receptacles.',
    date: '2024-08-28',
    priority: 'normal',
    author: 'Municipal Health Department',
    tags: ['Dengue Control', 'PHI', 'Sanitation']
  },
  {
    id: 'a4',
    title: 'Ward 5 Citizens Open Townhall Meeting with Councillor',
    category: 'Events & Townhalls',
    content: 'Direct dialogue session on the 2025 Municipal Budget Allocations, local youth sports facilities, and micro-business support grants. All residents welcome to voice questions directly.',
    date: '2024-09-15',
    priority: 'normal',
    author: 'Sarooj Sattar Forum Secretariat',
    tags: ['Townhall', 'Citizen Dialogue', 'Budget 2025']
  }
];

const initialMembers: CommunityMember[] = [
  {
    id: 'm1',
    name: 'Sarooj Sattar',
    role: 'Ward Leader',
    ward: 'Negombo Municipal Council',
    phone: '0702475248',
    email: 'saroojsattar@gmail.com',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    joinedDate: '2018-02-15',
    contributionsCount: 1420,
    badge: 'Municipal Councillor',
    specialization: 'Civic Governance, Infrastructure & Social Welfare'
  },
  {
    id: 'm2',
    name: 'Rizwan Mohamed',
    role: 'Ward Leader',
    ward: 'Periyamulla Central',
    phone: '0778129034',
    email: 'rizwan.periyamulla@gmail.com',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    joinedDate: '2020-04-10',
    contributionsCount: 285,
    badge: 'Senior Ward Coordinator',
    specialization: 'Emergency Response & Youth Mobilization'
  },
  {
    id: 'm3',
    name: 'Shirani Fernando',
    role: 'Advisory Committee',
    ward: 'Dalupotha West',
    phone: '0714902188',
    email: 'shirani.f@gmail.com',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    joinedDate: '2021-01-18',
    contributionsCount: 194,
    badge: 'Women & Welfare Lead',
    specialization: 'Community Health & Maternal Support'
  },
  {
    id: 'm4',
    name: 'Dilshan Pradeep',
    role: 'Youth Wing Member',
    ward: 'Kochchikade South',
    phone: '0765543219',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    joinedDate: '2022-06-20',
    contributionsCount: 112,
    badge: 'Tech & Field Inspector',
    specialization: 'Digital Grievance Tracking & Verification'
  },
  {
    id: 'm5',
    name: 'Farhan Ahamed',
    role: 'Community Volunteer',
    ward: 'Periyamulla East',
    phone: '0754432190',
    avatarUrl: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=400&q=80',
    joinedDate: '2023-03-12',
    contributionsCount: 88,
    badge: 'Active Volunteer',
    specialization: 'Disaster Relief & Food Distribution'
  }
];

const initialEmergencyContacts: EmergencyContact[] = [
  {
    id: 'e1',
    organization: 'Negombo Police HQ & Emergency Dispatch',
    category: 'Police',
    hotline: '119 / 031-2222222',
    directPhone: '031-2222223',
    address: 'Police Station Road, Negombo',
    operationalHours: '24/7 Service',
    notes: 'Immediate patrol dispatch for accidents, disputes & neighborhood safety.',
    iconName: 'ShieldAlert'
  },
  {
    id: 'e2',
    organization: '1990 Suwa Seriya Free National Ambulance Service',
    category: 'Healthcare',
    hotline: '1990',
    directPhone: '1990',
    address: 'Negombo Regional Ambulance Base',
    operationalHours: '24/7 Nationwide Immediate Response',
    notes: 'Equipped with EMTs, defibrillators, oxygen & trauma support.',
    iconName: 'Ambulance'
  },
  {
    id: 'e3',
    organization: 'Negombo District General Hospital Emergency Unit',
    category: 'Healthcare',
    hotline: '031-2222261',
    directPhone: '031-2222262',
    address: 'Hospital Road, Negombo',
    operationalHours: '24/7 Trauma, ICU & OPD',
    notes: 'Government General Hospital with fully equipped emergency surgery.',
    iconName: 'Hospital'
  },
  {
    id: 'e4',
    organization: 'Negombo Municipal Council Fire & Rescue Brigade',
    category: 'Fire & Rescue',
    hotline: '031-2222224',
    directPhone: '031-2222225',
    address: 'Fire Station, Greens Road, Negombo',
    operationalHours: '24/7 Emergency Response',
    notes: 'Fire extinguishing, building collapse rescue, and flood water rescues.',
    iconName: 'Flame'
  },
  {
    id: 'e5',
    organization: 'CEB Electricity Breakdown & Power Emergency',
    category: 'Utilities',
    hotline: '1987',
    directPhone: '031-2234581',
    address: 'CEB Area Engineer Office, Negombo',
    operationalHours: '24/7 Hotline',
    notes: 'Transformer sparks, fallen high-voltage cables & power outages.',
    iconName: 'Zap'
  },
  {
    id: 'e6',
    organization: 'National Water Supply & Drainage Board (NWSDB) Helpline',
    category: 'Utilities',
    hotline: '1939',
    directPhone: '031-2222890',
    address: 'NWSDB Regional Center, Negombo',
    operationalHours: '24/7 Customer Care',
    notes: 'Main pipeline bursts, contamination reports & low pressure.',
    iconName: 'Droplet'
  },
  {
    id: 'e7',
    organization: 'Disaster Management Centre (DMC) Early Warning',
    category: 'Disaster Management',
    hotline: '117',
    directPhone: '011-2136136',
    address: 'Gampaha District DMC Coordination Cell',
    operationalHours: '24/7 Monsoon & Tsunami Warning',
    notes: 'Lagoon flooding alerts, severe weather warnings & emergency shelters.',
    iconName: 'AlertTriangle'
  },
  {
    id: 'e8',
    organization: 'Councillor Sarooj Sattar Direct Community Assistance Office',
    category: 'Municipal',
    hotline: '0702475248',
    directPhone: '0768787382',
    address: '36 - St. Lazarus Road, Periyamulla, Negombo',
    operationalHours: '8:00 AM - 7:00 PM (Daily)',
    notes: 'Direct citizen welfare, urgent Municipal Council interventions & public grievances.',
    iconName: 'PhoneCall'
  }
];

// In-Memory Fallback State (automatically kept in sync)
const memoryStore = {
  complaints: [...initialComplaints],
  projects: [...initialProjects],
  announcements: [...initialAnnouncements],
  members: [...initialMembers],
  emergencyContacts: [...initialEmergencyContacts],
  subscribers: [
    { id: 's1', email: 'resident.negombo@gmail.com', name: 'Nalinda Perera', subscribedAt: new Date().toISOString() },
    { id: 's2', email: 'citizen.voice@yahoo.com', name: 'Ayesha Rameez', subscribedAt: new Date().toISOString() }
  ],
  messages: [] as CouncillorMessage[]
};

// Initialize PostgreSQL Tables if pool is active
export async function initializeDatabase(): Promise<{ isPostgres: boolean; message: string }> {
  if (!pool) {
    return {
      isPostgres: false,
      message: 'Running with high-performance in-memory store. (PostgreSQL active when DATABASE_URL is set in Render Blueprint).'
    };
  }

  try {
    const client = await pool.connect();
    try {
      console.log('📦 Connected to PostgreSQL. Initializing schemas & tables...');

      // Create Complaints Table
      await client.query(`
        CREATE TABLE IF NOT EXISTS complaints (
          id VARCHAR(64) PRIMARY KEY,
          ref_code VARCHAR(64) UNIQUE NOT NULL,
          title VARCHAR(255) NOT NULL,
          description TEXT NOT NULL,
          category VARCHAR(100) NOT NULL,
          priority VARCHAR(30) NOT NULL,
          status VARCHAR(30) NOT NULL,
          ward VARCHAR(100) NOT NULL,
          location_address TEXT NOT NULL,
          citizen_name VARCHAR(150) NOT NULL,
          citizen_phone VARCHAR(50) NOT NULL,
          citizen_email VARCHAR(150),
          photo_url TEXT,
          resolution_note TEXT,
          resolution_photo_url TEXT,
          assigned_department VARCHAR(150),
          estimated_days INT DEFAULT 3,
          upvotes INT DEFAULT 0,
          ai_summary TEXT,
          ai_suggested_action TEXT,
          councillor_feedback TEXT,
          created_at TIMESTAMPTZ DEFAULT NOW(),
          updated_at TIMESTAMPTZ DEFAULT NOW()
        );
      `);

      // Create Projects Table
      await client.query(`
        CREATE TABLE IF NOT EXISTS projects (
          id VARCHAR(64) PRIMARY KEY,
          title VARCHAR(255) NOT NULL,
          slug VARCHAR(255) UNIQUE NOT NULL,
          description TEXT NOT NULL,
          category VARCHAR(100) NOT NULL,
          ward VARCHAR(100) NOT NULL,
          progress_percentage INT NOT NULL DEFAULT 0,
          status VARCHAR(30) NOT NULL DEFAULT 'ongoing',
          budget_lkr BIGINT NOT NULL DEFAULT 0,
          spent_lkr BIGINT NOT NULL DEFAULT 0,
          contractor VARCHAR(255),
          start_date VARCHAR(50),
          expected_end_date VARCHAR(50),
          image_url TEXT,
          before_image_url TEXT,
          after_image_url TEXT,
          impact_metric TEXT,
          highlights JSONB DEFAULT '[]'::jsonb,
          created_at TIMESTAMPTZ DEFAULT NOW()
        );
      `);

      // Create Announcements Table
      await client.query(`
        CREATE TABLE IF NOT EXISTS announcements (
          id VARCHAR(64) PRIMARY KEY,
          title VARCHAR(255) NOT NULL,
          category VARCHAR(100) NOT NULL,
          content TEXT NOT NULL,
          date VARCHAR(50) NOT NULL,
          priority VARCHAR(30) NOT NULL DEFAULT 'normal',
          author VARCHAR(150) NOT NULL,
          tags JSONB DEFAULT '[]'::jsonb,
          action_link TEXT,
          action_text VARCHAR(100),
          created_at TIMESTAMPTZ DEFAULT NOW()
        );
      `);

      // Create Members Table
      await client.query(`
        CREATE TABLE IF NOT EXISTS members (
          id VARCHAR(64) PRIMARY KEY,
          name VARCHAR(150) NOT NULL,
          role VARCHAR(100) NOT NULL,
          ward VARCHAR(100) NOT NULL,
          phone VARCHAR(50) NOT NULL,
          email VARCHAR(150),
          avatar_url TEXT,
          joined_date VARCHAR(50),
          contributions_count INT DEFAULT 0,
          badge VARCHAR(100),
          specialization TEXT,
          created_at TIMESTAMPTZ DEFAULT NOW()
        );
      `);

      // Create Emergency Contacts Table
      await client.query(`
        CREATE TABLE IF NOT EXISTS emergency_contacts (
          id VARCHAR(64) PRIMARY KEY,
          organization VARCHAR(255) NOT NULL,
          category VARCHAR(100) NOT NULL,
          hotline VARCHAR(100) NOT NULL,
          direct_phone VARCHAR(100),
          address TEXT,
          operational_hours VARCHAR(100),
          notes TEXT,
          icon_name VARCHAR(50),
          created_at TIMESTAMPTZ DEFAULT NOW()
        );
      `);

      // Create Subscribers Table
      await client.query(`
        CREATE TABLE IF NOT EXISTS subscribers (
          id VARCHAR(64) PRIMARY KEY,
          name VARCHAR(150) NOT NULL,
          email VARCHAR(150) UNIQUE NOT NULL,
          subscribed_at TIMESTAMPTZ DEFAULT NOW()
        );
      `);

      // Create Messages Table
      await client.query(`
        CREATE TABLE IF NOT EXISTS councillor_messages (
          id VARCHAR(64) PRIMARY KEY,
          sender_name VARCHAR(150) NOT NULL,
          sender_phone VARCHAR(50) NOT NULL,
          sender_email VARCHAR(150),
          subject VARCHAR(255) NOT NULL,
          message TEXT NOT NULL,
          ward VARCHAR(100),
          channel VARCHAR(50) DEFAULT 'web_portal',
          created_at TIMESTAMPTZ DEFAULT NOW()
        );
      `);

      // Seed if tables are empty
      const { rows: countRows } = await client.query('SELECT count(*) FROM complaints');
      if (parseInt(countRows[0].count, 10) === 0) {
        console.log('🌱 Seeding PostgreSQL database with Sarooj Sattar Community Forum records...');
        
        for (const c of initialComplaints) {
          await client.query(`
            INSERT INTO complaints (
              id, ref_code, title, description, category, priority, status, ward,
              location_address, citizen_name, citizen_phone, citizen_email, photo_url,
              assigned_department, estimated_days, upvotes, ai_summary, ai_suggested_action,
              councillor_feedback, created_at, updated_at
            ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21)
          `, [
            c.id, c.refCode, c.title, c.description, c.category, c.priority, c.status, c.ward,
            c.locationAddress, c.citizenName, c.citizenPhone, c.citizenEmail || null, c.photoUrl || null,
            c.assignedDepartment || null, c.estimatedDays || 3, c.upvotes, c.aiSummary || null, c.aiSuggestedAction || null,
            c.councillorFeedback || null, c.createdAt, c.updatedAt
          ]);
        }

        for (const p of initialProjects) {
          await client.query(`
            INSERT INTO projects (
              id, title, slug, description, category, ward, progress_percentage, status,
              budget_lkr, spent_lkr, contractor, start_date, expected_end_date, image_url,
              before_image_url, after_image_url, impact_metric, highlights
            ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18)
          `, [
            p.id, p.title, p.slug, p.description, p.category, p.ward, p.progressPercentage, p.status,
            p.budgetLKR, p.spentLKR, p.contractor, p.startDate, p.expectedEndDate, p.imageUrl,
            p.beforeImageUrl || null, p.afterImageUrl || null, p.impactMetric, JSON.stringify(p.highlights)
          ]);
        }

        for (const a of initialAnnouncements) {
          await client.query(`
            INSERT INTO announcements (id, title, category, content, date, priority, author, tags, action_link, action_text)
            VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
          `, [a.id, a.title, a.category, a.content, a.date, a.priority, a.author, JSON.stringify(a.tags), a.actionLink || null, a.actionText || null]);
        }

        for (const m of initialMembers) {
          await client.query(`
            INSERT INTO members (id, name, role, ward, phone, email, avatar_url, joined_date, contributions_count, badge, specialization)
            VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
          `, [m.id, m.name, m.role, m.ward, m.phone, m.email || null, m.avatarUrl, m.joinedDate, m.contributionsCount, m.badge, m.specialization || null]);
        }

        for (const e of initialEmergencyContacts) {
          await client.query(`
            INSERT INTO emergency_contacts (id, organization, category, hotline, direct_phone, address, operational_hours, notes, icon_name)
            VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
          `, [e.id, e.organization, e.category, e.hotline, e.directPhone, e.address, e.operationalHours, e.notes, e.iconName]);
        }
        console.log('✅ PostgreSQL database populated successfully.');
      }

      isPostgresConnected = true;
      return { isPostgres: true, message: 'Managed PostgreSQL database connected and operational.' };
    } finally {
      client.release();
    }
  } catch (err: any) {
    console.error('❌ PostgreSQL initialization error, fallback activated:', err.message);
    isPostgresConnected = false;
    return { isPostgres: false, message: `PostgreSQL connection error: ${err.message}` };
  }
}

// Database Access Methods with seamless fallback

export async function getComplaints(filters?: { ward?: string; status?: string; category?: string; search?: string }): Promise<Complaint[]> {
  if (isPostgresConnected && pool) {
    try {
      let query = 'SELECT * FROM complaints WHERE 1=1';
      const values: any[] = [];
      let paramIndex = 1;

      if (filters?.ward && filters.ward !== 'all') {
        query += ` AND ward = $${paramIndex++}`;
        values.push(filters.ward);
      }
      if (filters?.status && filters.status !== 'all') {
        query += ` AND status = $${paramIndex++}`;
        values.push(filters.status);
      }
      if (filters?.category && filters.category !== 'all') {
        query += ` AND category = $${paramIndex++}`;
        values.push(filters.category);
      }
      if (filters?.search) {
        query += ` AND (title ILIKE $${paramIndex} OR description ILIKE $${paramIndex} OR ref_code ILIKE $${paramIndex})`;
        values.push(`%${filters.search}%`);
        paramIndex++;
      }

      query += ' ORDER BY created_at DESC';

      const { rows } = await pool.query(query, values);
      return rows.map((r) => ({
        id: r.id,
        refCode: r.ref_code,
        title: r.title,
        description: r.description,
        category: r.category,
        priority: r.priority,
        status: r.status,
        ward: r.ward,
        locationAddress: r.location_address,
        citizenName: r.citizen_name,
        citizenPhone: r.citizen_phone,
        citizenEmail: r.citizen_email || undefined,
        photoUrl: r.photo_url || undefined,
        resolutionNote: r.resolution_note || undefined,
        resolutionPhotoUrl: r.resolution_photo_url || undefined,
        assignedDepartment: r.assigned_department || undefined,
        estimatedDays: r.estimated_days,
        upvotes: r.upvotes,
        aiSummary: r.ai_summary || undefined,
        aiSuggestedAction: r.ai_suggested_action || undefined,
        councillorFeedback: r.councillor_feedback || undefined,
        createdAt: r.created_at?.toISOString ? r.created_at.toISOString() : r.created_at,
        updatedAt: r.updated_at?.toISOString ? r.updated_at.toISOString() : r.updated_at,
      }));
    } catch (e) {
      console.warn('PostgreSQL getComplaints query failed, using memory store:', e);
    }
  }

  // Memory fallback
  return memoryStore.complaints
    .filter((c) => {
      if (filters?.ward && filters.ward !== 'all' && c.ward !== filters.ward) return false;
      if (filters?.status && filters.status !== 'all' && c.status !== filters.status) return false;
      if (filters?.category && filters.category !== 'all' && c.category !== filters.category) return false;
      if (filters?.search) {
        const s = filters.search.toLowerCase();
        const matches = c.title.toLowerCase().includes(s) || c.description.toLowerCase().includes(s) || c.refCode.toLowerCase().includes(s);
        if (!matches) return false;
      }
      return true;
    })
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export async function getComplaintByRef(refCode: string): Promise<Complaint | null> {
  if (isPostgresConnected && pool) {
    try {
      const { rows } = await pool.query('SELECT * FROM complaints WHERE ref_code = $1 OR id = $1', [refCode]);
      if (rows.length > 0) {
        const r = rows[0];
        return {
          id: r.id,
          refCode: r.ref_code,
          title: r.title,
          description: r.description,
          category: r.category,
          priority: r.priority,
          status: r.status,
          ward: r.ward,
          locationAddress: r.location_address,
          citizenName: r.citizen_name,
          citizenPhone: r.citizen_phone,
          citizenEmail: r.citizen_email || undefined,
          photoUrl: r.photo_url || undefined,
          resolutionNote: r.resolution_note || undefined,
          resolutionPhotoUrl: r.resolution_photo_url || undefined,
          assignedDepartment: r.assigned_department || undefined,
          estimatedDays: r.estimated_days,
          upvotes: r.upvotes,
          aiSummary: r.ai_summary || undefined,
          aiSuggestedAction: r.ai_suggested_action || undefined,
          councillorFeedback: r.councillor_feedback || undefined,
          createdAt: r.created_at?.toISOString ? r.created_at.toISOString() : r.created_at,
          updatedAt: r.updated_at?.toISOString ? r.updated_at.toISOString() : r.updated_at,
        };
      }
    } catch (e) {
      console.warn('PostgreSQL getComplaintByRef failed:', e);
    }
  }

  const found = memoryStore.complaints.find((c) => c.refCode.toLowerCase() === refCode.toLowerCase() || c.id === refCode);
  return found || null;
}

export async function createComplaint(complaintData: Omit<Complaint, 'id' | 'refCode' | 'status' | 'upvotes' | 'createdAt' | 'updatedAt'>): Promise<Complaint> {
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  const refCode = `NEG-${new Date().getFullYear()}-${randomSuffix}`;
  const id = `c_${Date.now()}`;
  const now = new Date().toISOString();

  const newComplaint: Complaint = {
    ...complaintData,
    id,
    refCode,
    status: 'submitted',
    upvotes: 1,
    createdAt: now,
    updatedAt: now,
  };

  if (isPostgresConnected && pool) {
    try {
      await pool.query(`
        INSERT INTO complaints (
          id, ref_code, title, description, category, priority, status, ward,
          location_address, citizen_name, citizen_phone, citizen_email, photo_url,
          assigned_department, estimated_days, upvotes, ai_summary, ai_suggested_action,
          councillor_feedback, created_at, updated_at
        ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21)
      `, [
        newComplaint.id, newComplaint.refCode, newComplaint.title, newComplaint.description,
        newComplaint.category, newComplaint.priority, newComplaint.status, newComplaint.ward,
        newComplaint.locationAddress, newComplaint.citizenName, newComplaint.citizenPhone,
        newComplaint.citizenEmail || null, newComplaint.photoUrl || null,
        newComplaint.assignedDepartment || 'Negombo MC Grievance Desk',
        newComplaint.estimatedDays || 3, newComplaint.upvotes,
        newComplaint.aiSummary || null, newComplaint.aiSuggestedAction || null,
        newComplaint.councillorFeedback || null, newComplaint.createdAt, newComplaint.updatedAt
      ]);
    } catch (e) {
      console.warn('PostgreSQL insert complaint failed, saved in memory:', e);
    }
  }

  memoryStore.complaints.unshift(newComplaint);
  return newComplaint;
}

export async function upvoteComplaint(id: string): Promise<number> {
  if (isPostgresConnected && pool) {
    try {
      const { rows } = await pool.query(`
        UPDATE complaints SET upvotes = upvotes + 1, updated_at = NOW() WHERE id = $1 RETURNING upvotes
      `, [id]);
      if (rows.length > 0) return rows[0].upvotes;
    } catch (e) {
      console.warn('PostgreSQL upvote failed:', e);
    }
  }

  const found = memoryStore.complaints.find((c) => c.id === id || c.refCode === id);
  if (found) {
    found.upvotes += 1;
    found.updatedAt = new Date().toISOString();
    return found.upvotes;
  }
  return 0;
}

export async function updateComplaintStatus(id: string, update: { status: Complaint['status']; feedback?: string; resolutionNote?: string }): Promise<Complaint | null> {
  const now = new Date().toISOString();
  if (isPostgresConnected && pool) {
    try {
      await pool.query(`
        UPDATE complaints 
        SET status = $1, 
            councillor_feedback = COALESCE($2, councillor_feedback),
            resolution_note = COALESCE($3, resolution_note),
            updated_at = NOW()
        WHERE id = $4 OR ref_code = $4
      `, [update.status, update.feedback || null, update.resolutionNote || null, id]);
    } catch (e) {
      console.warn('PostgreSQL update status failed:', e);
    }
  }

  const found = memoryStore.complaints.find((c) => c.id === id || c.refCode === id);
  if (found) {
    found.status = update.status;
    if (update.feedback) found.councillorFeedback = update.feedback;
    if (update.resolutionNote) found.resolutionNote = update.resolutionNote;
    found.updatedAt = now;
    return found;
  }
  return null;
}

export async function getProjects(): Promise<CommunityProject[]> {
  if (isPostgresConnected && pool) {
    try {
      const { rows } = await pool.query('SELECT * FROM projects ORDER BY progress_percentage DESC');
      return rows.map((r) => ({
        id: r.id,
        title: r.title,
        slug: r.slug,
        description: r.description,
        category: r.category,
        ward: r.ward,
        progressPercentage: r.progress_percentage,
        status: r.status,
        budgetLKR: Number(r.budget_lkr),
        spentLKR: Number(r.spent_lkr),
        contractor: r.contractor,
        startDate: r.start_date,
        expectedEndDate: r.expected_end_date,
        imageUrl: r.image_url,
        beforeImageUrl: r.before_image_url || undefined,
        afterImageUrl: r.after_image_url || undefined,
        impactMetric: r.impact_metric,
        highlights: Array.isArray(r.highlights) ? r.highlights : JSON.parse(r.highlights || '[]'),
      }));
    } catch (e) {
      console.warn('PostgreSQL getProjects failed:', e);
    }
  }
  return memoryStore.projects;
}

export async function getAnnouncements(): Promise<Announcement[]> {
  if (isPostgresConnected && pool) {
    try {
      const { rows } = await pool.query('SELECT * FROM announcements ORDER BY date DESC');
      return rows.map((r) => ({
        id: r.id,
        title: r.title,
        category: r.category,
        content: r.content,
        date: r.date,
        priority: r.priority,
        author: r.author,
        tags: Array.isArray(r.tags) ? r.tags : JSON.parse(r.tags || '[]'),
        actionLink: r.action_link || undefined,
        actionText: r.action_text || undefined,
      }));
    } catch (e) {
      console.warn('PostgreSQL getAnnouncements failed:', e);
    }
  }
  return memoryStore.announcements;
}

export async function createAnnouncement(announcement: Omit<Announcement, 'id' | 'date'>): Promise<Announcement> {
  const newAnn: Announcement = {
    ...announcement,
    id: `a_${Date.now()}`,
    date: new Date().toISOString().split('T')[0],
  };
  if (isPostgresConnected && pool) {
    try {
      await pool.query(`
        INSERT INTO announcements (id, title, category, content, date, priority, author, tags, action_link, action_text)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      `, [newAnn.id, newAnn.title, newAnn.category, newAnn.content, newAnn.date, newAnn.priority, newAnn.author, JSON.stringify(newAnn.tags || []), newAnn.actionLink || null, newAnn.actionText || null]);
    } catch (e) {
      console.warn('PostgreSQL createAnnouncement failed:', e);
    }
  }
  memoryStore.announcements.unshift(newAnn);
  return newAnn;
}

export async function getMembers(): Promise<CommunityMember[]> {
  if (isPostgresConnected && pool) {
    try {
      const { rows } = await pool.query('SELECT * FROM members ORDER BY contributions_count DESC');
      return rows.map((r) => ({
        id: r.id,
        name: r.name,
        role: r.role,
        ward: r.ward,
        phone: r.phone,
        email: r.email || undefined,
        avatarUrl: r.avatar_url,
        joinedDate: r.joined_date,
        contributionsCount: r.contributions_count,
        badge: r.badge,
        specialization: r.specialization || undefined,
      }));
    } catch (e) {
      console.warn('PostgreSQL getMembers failed:', e);
    }
  }
  return memoryStore.members;
}

export async function addMember(member: Omit<CommunityMember, 'id' | 'joinedDate' | 'contributionsCount' | 'badge'>): Promise<CommunityMember> {
  const newMember: CommunityMember = {
    ...member,
    id: `m_${Date.now()}`,
    joinedDate: new Date().toISOString().split('T')[0],
    contributionsCount: 1,
    badge: 'Civic Volunteer'
  };

  if (isPostgresConnected && pool) {
    try {
      await pool.query(`
        INSERT INTO members (id, name, role, ward, phone, email, avatar_url, joined_date, contributions_count, badge, specialization)
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
      `, [newMember.id, newMember.name, newMember.role, newMember.ward, newMember.phone, newMember.email || null, newMember.avatarUrl, newMember.joinedDate, newMember.contributionsCount, newMember.badge, newMember.specialization || null]);
    } catch (e) {
      console.warn('PostgreSQL insert member failed:', e);
    }
  }

  memoryStore.members.push(newMember);
  return newMember;
}

export async function getEmergencyContacts(): Promise<EmergencyContact[]> {
  if (isPostgresConnected && pool) {
    try {
      const { rows } = await pool.query('SELECT * FROM emergency_contacts');
      return rows.map((r) => ({
        id: r.id,
        organization: r.organization,
        category: r.category,
        hotline: r.hotline,
        directPhone: r.direct_phone,
        address: r.address,
        operationalHours: r.operational_hours,
        notes: r.notes,
        iconName: r.icon_name,
      }));
    } catch (e) {
      console.warn('PostgreSQL getEmergencyContacts failed:', e);
    }
  }
  return memoryStore.emergencyContacts;
}

export async function addSubscriber(name: string, email: string): Promise<{ success: boolean; message: string }> {
  const id = `s_${Date.now()}`;
  if (isPostgresConnected && pool) {
    try {
      await pool.query(`
        INSERT INTO subscribers (id, name, email) VALUES ($1, $2, $3)
        ON CONFLICT (email) DO NOTHING
      `, [id, name, email]);
      return { success: true, message: 'Subscribed successfully to Sarooj Sattar Community updates!' };
    } catch (e: any) {
      console.warn('PostgreSQL insert subscriber failed:', e.message);
    }
  }

  const existing = memoryStore.subscribers.find((s) => s.email.toLowerCase() === email.toLowerCase());
  if (!existing) {
    memoryStore.subscribers.push({ id, name, email, subscribedAt: new Date().toISOString() });
  }
  return { success: true, message: 'Subscribed successfully to Sarooj Sattar Community updates!' };
}

export async function createCouncillorMessage(msg: Omit<CouncillorMessage, 'id' | 'createdAt'>): Promise<CouncillorMessage> {
  const newMsg: CouncillorMessage = {
    ...msg,
    id: `msg_${Date.now()}`,
    createdAt: new Date().toISOString(),
  };

  if (isPostgresConnected && pool) {
    try {
      await pool.query(`
        INSERT INTO councillor_messages (id, sender_name, sender_phone, sender_email, subject, message, ward, channel)
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
      `, [newMsg.id, newMsg.senderName, newMsg.senderPhone, newMsg.senderEmail || null, newMsg.subject, newMsg.message, newMsg.ward || null, newMsg.channel]);
    } catch (e) {
      console.warn('PostgreSQL insert message failed:', e);
    }
  }

  memoryStore.messages.unshift(newMsg);
  return newMsg;
}

export async function getCouncillorMessages(): Promise<CouncillorMessage[]> {
  if (isPostgresConnected && pool) {
    try {
      const { rows } = await pool.query('SELECT * FROM councillor_messages ORDER BY created_at DESC');
      return rows.map((r: any) => ({
        id: r.id,
        senderName: r.sender_name,
        senderPhone: r.sender_phone,
        senderEmail: r.sender_email || undefined,
        subject: r.subject,
        message: r.message,
        ward: r.ward || undefined,
        channel: r.channel,
        createdAt: r.created_at,
      }));
    } catch (e) {
      console.warn('PostgreSQL getCouncillorMessages failed:', e);
    }
  }
  return memoryStore.messages;
}

export async function getStats(): Promise<CommunityStats> {
  const complaints = await getComplaints();
  const projects = await getProjects();
  const members = await getMembers();

  const totalComplaints = complaints.length;
  const resolvedComplaints = complaints.filter((c) => c.status === 'resolved').length;
  const activeProjects = projects.filter((p) => p.status === 'ongoing').length;
  const communityVolunteers = members.length;
  const resolutionRatePercent = totalComplaints > 0 ? Math.round((resolvedComplaints / totalComplaints) * 100) : 100;
  
  const fundsDisbursedLKR = projects.reduce((acc, p) => acc + p.spentLKR, 0);

  return {
    totalComplaints,
    resolvedComplaints,
    activeProjects,
    communityVolunteers,
    citizensServed: 12450 + totalComplaints * 3,
    resolutionRatePercent,
    fundsDisbursedLKR,
  };
}

export function getDbConnectionStatus() {
  return {
    connected: isPostgresConnected,
    engine: isPostgresConnected ? 'Managed PostgreSQL (Render / Cloud)' : 'High-Performance Local Memory Fallback',
    databaseUrlConfigured: Boolean(databaseUrl && !databaseUrl.includes('placeholder')),
    blueprint: 'render.yaml',
    poolActive: pool !== null
  };
}
