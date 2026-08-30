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
  getMembers,
  addMember,
  getEmergencyContacts,
  addSubscriber,
  createCouncillorMessage,
  getStats,
  getDbConnectionStatus,
} from './server/db.js';
import { analyzeCitizenComplaint, askCivicHelpline } from './server/gemini.js';

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

// Body Parsers
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

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
    const { query, history } = req.body;
    if (!query) {
      return res.status(400).json({ success: false, error: 'Query is required.' });
    }
    const reply = await askCivicHelpline(query, history || []);
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
