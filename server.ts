import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';
import {
  initializeDatabase,
  getComplaints,
  getComplaintByRef,
  createComplaint,
  upvoteComplaint,
  updateComplaintStatus,
  getProjects,
  getAnnouncements,
  createAnnouncement,
  getMembers,
  addMember,
  getEmergencyContacts,
  addSubscriber,
  createCouncillorMessage,
  getCouncillorMessages,
  getStats,
  getDbConnectionStatus,
} from './server/db.js';
import { analyzeCitizenComplaint, askCivicHelpline } from './server/gemini.js';
import { requestOtp, verifyOtp, loginAdmin, changeAdminPassword, getAllCitizens } from './server/auth.js';

const app = express();
const PORT = 3000;

// Body Parsers
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Ensure upload directories exist and serve them statically
const rootUploads = path.join(process.cwd(), 'uploads');
const pubUploads = path.join(process.cwd(), 'public', 'uploads');
if (!fs.existsSync(rootUploads)) fs.mkdirSync(rootUploads, { recursive: true });
if (!fs.existsSync(pubUploads)) fs.mkdirSync(pubUploads, { recursive: true });
app.use('/uploads', express.static(rootUploads));
app.use('/uploads', express.static(pubUploads));

// CORS & Logging Middleware
app.use((req, res, next) => {
  res.setHeader('X-Powered-By', 'Sarooj-Sattar-Community-Forum');
  next();
});

// Initialize database (PostgreSQL if DATABASE_URL is active, or high-performance memory store)
initializeDatabase().then((res) => {
  console.log(`🚀 Database status: ${res.message}`);
});

// ==========================================
// API ROUTES (MOUNTED FIRST)
// ==========================================

// Health check endpoint
app.get('/api/health', (req, res) => {
  const dbStatus = getDbConnectionStatus();
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'Sarooj Sattar Community Forum API',
    database: dbStatus,
  });
});

// Database & Render Blueprint Inspection
app.get('/api/db/status', (req, res) => {
  res.json(getDbConnectionStatus());
});

// ==========================================
// AUTHENTICATION ROUTES (ADMIN & PEOPLE)
// ==========================================

// 1. Admin Login: Username + Password
app.post('/api/auth/admin/login', (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        error: 'Please enter both Admin username and password.',
      });
    }

    const authResult = loginAdmin(username, password);
    res.json(authResult);
  } catch (err: any) {
    res.status(401).json({ success: false, error: err.message });
  }
});

// 1b. Admin Change Password
app.post('/api/auth/admin/change-password', (req, res) => {
  try {
    const { username, currentPassword, newPassword } = req.body;
    if (!username || !currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        error: 'Admin username, current password, and new password are all required.',
      });
    }

    const result = changeAdminPassword(username, currentPassword, newPassword);
    res.json(result);
  } catch (err: any) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// 2. People (Citizens) Step 1: Request Mobile OTP
app.post('/api/auth/otp/send', (req, res) => {
  try {
    const { phone } = req.body;
    if (!phone) {
      return res.status(400).json({
        success: false,
        error: 'Please enter a valid mobile number.',
      });
    }

    const result = requestOtp(phone);
    res.json(result);
  } catch (err: any) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// 3. People (Citizens) Step 2: Verify Mobile OTP & Log In
app.post('/api/auth/otp/verify', (req, res) => {
  try {
    const { phone, otp, name, ward } = req.body;
    if (!phone || !otp) {
      return res.status(400).json({
        success: false,
        error: 'Both mobile number and 6-digit OTP code are required.',
      });
    }

    const result = verifyOtp(phone, otp, name, ward);
    res.json(result);
  } catch (err: any) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// 4. Admin View: List of all citizens who logged in
app.get('/api/auth/citizens', (req, res) => {
  try {
    const citizens = getAllCitizens();
    res.json({ success: true, count: citizens.length, data: citizens });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.get('/api/render-blueprint', (req, res) => {
  try {
    const yamlPath = path.join(process.cwd(), 'render.yaml');
    if (fs.existsSync(yamlPath)) {
      const content = fs.readFileSync(yamlPath, 'utf8');
      res.json({ success: true, yaml: content });
    } else {
      res.status(404).json({ success: false, error: 'render.yaml not found' });
    }
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Community Stats
app.get('/api/stats', async (req, res) => {
  try {
    const stats = await getStats();
    res.json({ success: true, data: stats });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// =========================================================================
// Photo Management & Persistent Slot Configuration (Admin Controlled)
// =========================================================================
const PHOTO_CONFIG_FILE = path.join(process.cwd(), 'app_photo_slots.json');

const defaultPhotoConfig = {
  background: {
    url: '',
    enabled: false,
    opacity: 0.25,
    blur: 0,
    overlayStyle: 'warm',
    scope: 'hero',
  },
  portrait: {
    url: '',
    enabled: false,
    caption: 'Official Portrait of Councillor Sarooj Sattar',
  },
  ongoingProject: {
    url: '',
    caption: 'St. Lazarus Road Drainage & Sub-base Asphalt Carpeting',
    title: 'Periyamulla Flood Mitigation Project',
  },
  customGalleryItems: [],
};

function getSavedPhotoConfig() {
  try {
    if (fs.existsSync(PHOTO_CONFIG_FILE)) {
      const raw = fs.readFileSync(PHOTO_CONFIG_FILE, 'utf8');
      return { ...defaultPhotoConfig, ...JSON.parse(raw) };
    }
  } catch (e) {
    console.error('Failed to read app_photo_slots.json:', e);
  }
  return defaultPhotoConfig;
}

function savePhotoConfig(cfg: any) {
  try {
    fs.writeFileSync(PHOTO_CONFIG_FILE, JSON.stringify(cfg, null, 2), 'utf8');
    return true;
  } catch (e) {
    console.error('Failed to write app_photo_slots.json:', e);
    return false;
  }
}

// 1. Get current active photo slots configuration (Public for all visitors)
app.get('/api/photos/config', (req, res) => {
  try {
    const config = getSavedPhotoConfig();
    res.json({ success: true, data: config });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 2. Save active photo slots configuration (Admin only)
app.post('/api/photos/config', (req, res) => {
  try {
    const current = getSavedPhotoConfig();
    const updated = {
      ...current,
      ...req.body,
      background: { ...current.background, ...(req.body.background || {}) },
      portrait: { ...current.portrait, ...(req.body.portrait || {}) },
      ongoingProject: { ...current.ongoingProject, ...(req.body.ongoingProject || {}) },
      customGalleryItems: req.body.customGalleryItems !== undefined ? req.body.customGalleryItems : current.customGalleryItems,
    };
    savePhotoConfig(updated);
    res.json({ success: true, data: updated, message: 'Photo slots configuration saved successfully!' });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 3. Upload photo endpoint (Handles base64 dataUrl -> file, or direct URL)
app.post('/api/photos/upload', (req, res) => {
  try {
    const { dataUrl, filename, slot } = req.body;
    if (!dataUrl) {
      return res.status(400).json({ success: false, error: 'No image data provided' });
    }

    // Check if it's already a web URL
    if (dataUrl.startsWith('http://') || dataUrl.startsWith('https://')) {
      return res.json({ success: true, url: dataUrl, slot });
    }

    const matches = dataUrl.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    if (!matches || matches.length !== 3) {
      // If it's already a relative path or direct url
      if (dataUrl.startsWith('/')) {
        return res.json({ success: true, url: dataUrl, slot });
      }
      return res.status(400).json({ success: false, error: 'Invalid image data format' });
    }

    const buffer = Buffer.from(matches[2], 'base64');
    const safeFilename = slot === 'background' 
      ? `active-background-${Date.now()}.jpg` 
      : (slot === 'portrait' 
        ? `active-portrait-${Date.now()}.jpg` 
        : (slot === 'project' 
          ? `active-project-${Date.now()}.jpg` 
          : (filename ? path.basename(filename).replace(/[^a-zA-Z0-9.-]/g, '_') : `photo-${Date.now()}.jpg`)));

    // Write to both root uploads and public uploads
    const targets = [
      path.join(process.cwd(), 'uploads', safeFilename),
      path.join(process.cwd(), 'public', 'uploads', safeFilename)
    ];

    for (const target of targets) {
      try {
        const dir = path.dirname(target);
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
        fs.writeFileSync(target, buffer);
      } catch (e) {
        // ignore secondary target failure
      }
    }

    const publicUrl = `/uploads/${safeFilename}`;
    res.json({ success: true, url: publicUrl, slot });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.delete('/api/photos/:slot', (req, res) => {
  try {
    const { slot } = req.params;
    const current = getSavedPhotoConfig();
    if (slot === 'background') {
      current.background = { ...defaultPhotoConfig.background };
    } else if (slot === 'portrait') {
      current.portrait = { ...defaultPhotoConfig.portrait };
    } else if (slot === 'project') {
      current.ongoingProject = { ...defaultPhotoConfig.ongoingProject };
    }
    savePhotoConfig(current);
    res.json({ success: true, removed: slot, data: current });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Photo Management & Upload Endpoints for Authentic Councillor Campaign Photos
app.get('/api/photos/active', (req, res) => {
  try {
    const publicDir = path.join(process.cwd(), 'public');
    const uploadsDir = path.join(process.cwd(), 'uploads');
    const pubUploadsDir = path.join(publicDir, 'uploads');
    const imagesDir = path.join(publicDir, 'images');

    const detected: Record<string, string> = {};

    [uploadsDir, pubUploadsDir].forEach((dir) => {
      if (fs.existsSync(dir)) {
        const files = fs.readdirSync(dir);
        for (const f of files) {
          if (f.endsWith('.jpeg') || f.endsWith('.jpg') || f.endsWith('.png') || f.endsWith('.webp')) {
            detected[f] = `/uploads/${encodeURIComponent(f)}`;
          }
        }
      }
    });

    if (fs.existsSync(publicDir)) {
      const files = fs.readdirSync(publicDir);
      for (const f of files) {
        if (f.endsWith('.jpeg') || f.endsWith('.jpg') || f.endsWith('.png') || f.endsWith('.webp')) {
          detected[f] = `/${encodeURIComponent(f)}`;
        }
      }
    }

    if (fs.existsSync(imagesDir)) {
      const files = fs.readdirSync(imagesDir);
      for (const f of files) {
        detected[f] = `/images/${encodeURIComponent(f)}`;
      }
    }

    res.json({ success: true, photos: detected, config: getSavedPhotoConfig() });
  } catch (err: any) {
    res.json({ success: false, error: err.message, photos: {} });
  }
});

// Complaints: List & Filter
app.get('/api/complaints', async (req, res) => {
  try {
    const { ward, status, category, search } = req.query;
    const complaints = await getComplaints({
      ward: ward as string,
      status: status as string,
      category: category as string,
      search: search as string,
    });
    res.json({ success: true, count: complaints.length, data: complaints });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Complaints: Get single by Ref code or ID
app.get('/api/complaints/ref/:refCode', async (req, res) => {
  try {
    const complaint = await getComplaintByRef(req.params.refCode);
    if (!complaint) {
      return res.status(404).json({ success: false, error: 'Complaint ticket not found' });
    }
    res.json({ success: true, data: complaint });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Complaints: Submit new complaint with AI auto-triage
app.post('/api/complaints', async (req, res) => {
  try {
    const {
      title,
      description,
      ward,
      locationAddress,
      citizenName,
      citizenPhone,
      citizenEmail,
      photoUrl,
      category: userCategory,
      priority: userPriority,
    } = req.body;

    if (!title || !description || !ward || !citizenName || !citizenPhone) {
      return res.status(400).json({
        success: false,
        error: 'Please provide Title, Description, Ward, Citizen Name, and Phone Number.',
      });
    }

    // Run AI Triage to enrich metadata
    const aiAnalysis = await analyzeCitizenComplaint({
      title,
      description,
      ward,
      locationAddress,
    });

    const finalCategory = userCategory && userCategory !== 'Auto-Detect' ? userCategory : aiAnalysis.category;
    const finalPriority = userPriority && userPriority !== 'auto' ? userPriority : aiAnalysis.priority;

    const created = await createComplaint({
      title,
      description,
      ward,
      locationAddress: locationAddress || `${ward}, Negombo`,
      citizenName,
      citizenPhone,
      citizenEmail: citizenEmail || undefined,
      photoUrl: photoUrl || undefined,
      category: finalCategory as any,
      priority: finalPriority as any,
      assignedDepartment: aiAnalysis.assignedDepartment,
      estimatedDays: aiAnalysis.estimatedDays,
      aiSummary: aiAnalysis.aiSummary,
      aiSuggestedAction: aiAnalysis.aiSuggestedAction,
      councillorFeedback: aiAnalysis.councillorInitialNote,
    });

    res.status(201).json({
      success: true,
      message: `Complaint submitted successfully. Reference ticket: ${created.refCode}`,
      data: created,
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Complaints: Upvote
app.post('/api/complaints/:id/upvote', async (req, res) => {
  try {
    const upvotes = await upvoteComplaint(req.params.id);
    res.json({ success: true, upvotes });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Complaints: Update Status (Councillor / Admin action)
app.patch('/api/complaints/:id/status', async (req, res) => {
  try {
    const { status, feedback, resolutionNote } = req.body;
    const updated = await updateComplaintStatus(req.params.id, {
      status,
      feedback,
      resolutionNote,
    });
    if (!updated) {
      return res.status(404).json({ success: false, error: 'Complaint not found' });
    }
    res.json({ success: true, data: updated });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Projects: List
app.get('/api/projects', async (req, res) => {
  try {
    const projects = await getProjects();
    res.json({ success: true, data: projects });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Announcements: List
app.get('/api/announcements', async (req, res) => {
  try {
    const announcements = await getAnnouncements();
    res.json({ success: true, data: announcements });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Announcements: Create (Admin action)
app.post('/api/announcements', async (req, res) => {
  try {
    const { title, category, content, priority, author, tags, actionLink, actionText } = req.body;
    if (!title || !content) {
      return res.status(400).json({ success: false, error: 'Title and content are required for announcement.' });
    }
    const created = await createAnnouncement({
      title,
      category: category || 'Municipal Council',
      content,
      priority: priority || 'normal',
      author: author || 'Negombo MC Administration',
      tags: tags || ['Notice'],
      actionLink,
      actionText,
    });
    res.status(201).json({ success: true, data: created });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Members: List
app.get('/api/members', async (req, res) => {
  try {
    const members = await getMembers();
    res.json({ success: true, data: members });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Members: Join Volunteer Force
app.post('/api/members/join', async (req, res) => {
  try {
    const { name, role, ward, phone, email, specialization } = req.body;
    if (!name || !phone || !ward) {
      return res.status(400).json({ success: false, error: 'Name, Phone, and Ward are required.' });
    }

    const newMember = await addMember({
      name,
      role: (role as any) || 'Community Volunteer',
      ward,
      phone,
      email: email || undefined,
      avatarUrl: `https://images.unsplash.com/photo-${1534528741775 + Math.floor(Math.random() * 1000)}?auto=format&fit=crop&w=400&q=80`,
      specialization: specialization || 'Civic Support & Neighborhood Outreach',
    });

    res.status(201).json({
      success: true,
      message: 'Welcome to Sarooj Sattar Community Action Force! Your volunteer profile is active.',
      data: newMember,
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Emergency Contacts
app.get('/api/emergency-contacts', async (req, res) => {
  try {
    const contacts = await getEmergencyContacts();
    res.json({ success: true, data: contacts });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Newsletter Subscription
app.post('/api/subscribe', async (req, res) => {
  try {
    const { name, email } = req.body;
    if (!name || !email) {
      return res.status(400).json({ success: false, error: 'Name and email are required' });
    }
    const result = await addSubscriber(name, email);
    res.json(result);
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Councillor Direct Message: List (Admin view)
app.get('/api/messages', async (req, res) => {
  try {
    const messages = await getCouncillorMessages();
    res.json({ success: true, count: messages.length, data: messages });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Councillor Direct Message
app.post('/api/messages', async (req, res) => {
  try {
    const { senderName, senderPhone, senderEmail, subject, message, ward, channel } = req.body;
    if (!senderName || !senderPhone || !message) {
      return res.status(400).json({ success: false, error: 'Sender name, phone, and message are required.' });
    }

    const created = await createCouncillorMessage({
      senderName,
      senderPhone,
      senderEmail: senderEmail || undefined,
      subject: subject || 'Citizen Inquiry / Message to Sarooj Sattar',
      message,
      ward: ward || undefined,
      channel: channel || 'web_portal',
    });

    res.status(201).json({
      success: true,
      message: 'Message forwarded directly to Councillor Sarooj Sattar’s private secretariat.',
      data: created,
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// AI Civic Assistant Chat
app.post('/api/ai/chat', async (req, res) => {
  try {
    const { query, message, history, conversationHistory, image, audio, language } = req.body;
    const textQuery = query || message || '';
    if (!textQuery && !image && !audio) {
      return res.status(400).json({ success: false, error: 'A query, voice note, or picture is required.' });
    }
    const reply = await askCivicHelpline({
      query: textQuery,
      chatHistory: conversationHistory || history || [],
      image,
      audio,
      language,
    });
    res.json({ success: true, reply });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// AI Auto-Triage Preview
app.post('/api/ai/triage', async (req, res) => {
  try {
    const { title, description, ward, locationAddress } = req.body;
    if (!title || !description) {
      return res.status(400).json({ success: false, error: 'Title and description required for triage.' });
    }
    const analysis = await analyzeCitizenComplaint({ title, description, ward, locationAddress });
    res.json({ success: true, data: analysis });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ==========================================
// VITE MIDDLEWARE & STATIC SERVING
// ==========================================

async function setupFrontend() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🏛️ Sarooj Sattar Community Forum Server running on http://0.0.0.0:${PORT}`);
  });
}

setupFrontend();
