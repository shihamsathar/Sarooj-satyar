// Authentication Store and Handlers for Admin and People (Citizens)
import crypto from 'crypto';
import fs from 'fs';
import path from 'path';

export interface AdminAccount {
  id: string;
  username: string;
  passwordHash: string; // or plain check for simplicity
  name: string;
  title: string;
  email: string;
}

export interface CitizenAccount {
  id: string;
  phone: string;
  name: string;
  ward: string;
  createdAt: string;
  lastLoginAt: string;
}

export interface OtpRecord {
  phone: string;
  otp: string;
  createdAt: number;
  expiresAt: number;
  attempts: number;
}

const CREDENTIALS_FILE = path.join(process.cwd(), 'admin_credentials.json');

// Default initial admin accounts
const defaultAdminAccounts: AdminAccount[] = [
  {
    id: 'admin_1',
    username: 'admin',
    passwordHash: 'admin123',
    name: 'Sarooj Sattar',
    title: 'Councillor & Community Administrator',
    email: 'sarooj.sattar@negombo.mc.gov.lk',
  },
  {
    id: 'admin_2',
    username: 'sarooj',
    passwordHash: 'sarooj2026',
    name: 'Sarooj Sattar',
    title: 'Negombo Municipal Councillor',
    email: 'councillor@saroojnegombo.lk',
  }
];

// In-memory admin accounts initialized from file if present, else defaults
let adminAccounts: AdminAccount[] = [...defaultAdminAccounts];

try {
  if (fs.existsSync(CREDENTIALS_FILE)) {
    const raw = fs.readFileSync(CREDENTIALS_FILE, 'utf8');
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      adminAccounts = parsed;
      console.log(`🔐 Loaded ${adminAccounts.length} admin accounts from persistent storage.`);
    }
  } else {
    fs.writeFileSync(CREDENTIALS_FILE, JSON.stringify(defaultAdminAccounts, null, 2), 'utf8');
  }
} catch (e) {
  console.warn('Could not read admin_credentials.json, using defaults:', e);
}

function saveAdminAccounts() {
  try {
    fs.writeFileSync(CREDENTIALS_FILE, JSON.stringify(adminAccounts, null, 2), 'utf8');
  } catch (e) {
    console.error('Failed to save admin credentials to disk:', e);
  }
}

// Citizen database records indexed by normalized phone
const citizenAccounts = new Map<string, CitizenAccount>([
  ['0773948210', {
    id: 'cit_1',
    phone: '0773948210',
    name: 'Mohamed Fazil',
    ward: 'Periyamulla',
    createdAt: new Date(Date.now() - 30 * 86400000).toISOString(),
    lastLoginAt: new Date().toISOString(),
  }],
  ['0714889201', {
    id: 'cit_2',
    phone: '0714889201',
    name: 'Anthony Fernando',
    ward: 'Periyamulla',
    createdAt: new Date(Date.now() - 45 * 86400000).toISOString(),
    lastLoginAt: new Date().toISOString(),
  }],
  ['0761234987', {
    id: 'cit_3',
    phone: '0761234987',
    name: 'Chathurika Silva',
    ward: 'Dalupotha',
    createdAt: new Date(Date.now() - 20 * 86400000).toISOString(),
    lastLoginAt: new Date().toISOString(),
  }]
]);

// Active OTPs: phone -> OtpRecord
const activeOtps = new Map<string, OtpRecord>();

// Helper to normalize phone numbers (e.g. "+94 77 123 4567" -> "0771234567")
export function normalizePhone(raw: string): string {
  const digits = raw.replace(/\D/g, '');
  if (digits.startsWith('94') && digits.length === 11) {
    return '0' + digits.substring(2);
  }
  return digits;
}

// Generate a random 6-digit OTP
export function generateOtp(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export function requestOtp(rawPhone: string): { success: boolean; phone: string; otp: string; expiresInSeconds: number; message: string } {
  const phone = normalizePhone(rawPhone);
  if (!phone || phone.length < 9) {
    throw new Error('Please enter a valid mobile number (at least 9-10 digits).');
  }

  // Generate 6-digit OTP
  const otp = generateOtp();
  const now = Date.now();
  const expiresInSeconds = 300; // 5 minutes

  activeOtps.set(phone, {
    phone,
    otp,
    createdAt: now,
    expiresAt: now + expiresInSeconds * 1000,
    attempts: 0,
  });

  console.log(`📱 [SMS OTP DISPATCH] Phone: ${phone} -> OTP: [${otp}] (Valid for 5 mins)`);

  return {
    success: true,
    phone,
    otp, // Returned so the frontend simulation can display SMS prompt to test immediately
    expiresInSeconds,
    message: `Verification OTP dispatched to mobile number ${phone}.`,
  };
}

export function verifyOtp(
  rawPhone: string, 
  userOtp: string, 
  optionalName?: string, 
  optionalWard?: string
): { success: boolean; token: string; user: { id: string; role: 'citizen'; phone: string; name: string; ward: string; loginTime: string } } {
  const phone = normalizePhone(rawPhone);
  const record = activeOtps.get(phone);

  if (!record) {
    throw new Error('No active OTP request found for this mobile number. Please request a new OTP.');
  }

  if (Date.now() > record.expiresAt) {
    activeOtps.delete(phone);
    throw new Error('OTP has expired. Please request a new verification code.');
  }

  if (record.attempts >= 5) {
    activeOtps.delete(phone);
    throw new Error('Too many invalid attempts. Please request a new OTP.');
  }

  const cleanEnteredOtp = (userOtp || '').trim().replace(/\s/g, '');

  if (record.otp !== cleanEnteredOtp && cleanEnteredOtp !== '123456') { // Allowing 123456 as universal test code if needed
    record.attempts += 1;
    throw new Error(`Invalid OTP code. Please check and try again (${5 - record.attempts} attempts remaining).`);
  }

  // Valid OTP! Clear it
  activeOtps.delete(phone);

  // Retrieve or create citizen profile
  let citizen = citizenAccounts.get(phone);
  if (!citizen) {
    citizen = {
      id: `cit_${Date.now()}`,
      phone,
      name: optionalName?.trim() || `Citizen ${phone.slice(-4)}`,
      ward: optionalWard?.trim() || 'Periyamulla',
      createdAt: new Date().toISOString(),
      lastLoginAt: new Date().toISOString(),
    };
    citizenAccounts.set(phone, citizen);
  } else {
    citizen.lastLoginAt = new Date().toISOString();
    if (optionalName && optionalName.trim()) citizen.name = optionalName.trim();
    if (optionalWard && optionalWard.trim()) citizen.ward = optionalWard.trim();
  }

  const token = `token_cit_${phone}_${Date.now()}`;

  return {
    success: true,
    token,
    user: {
      id: citizen.id,
      role: 'citizen',
      phone: citizen.phone,
      name: citizen.name,
      ward: citizen.ward,
      loginTime: citizen.lastLoginAt,
    },
  };
}

export function loginAdmin(username: string, password: string): { 
  success: boolean; 
  token: string; 
  user: { id: string; role: 'admin'; username: string; name: string; title: string; email: string; loginTime: string } 
} {
  const cleanUsername = (username || '').trim().toLowerCase();
  const cleanPassword = (password || '').trim();

  const account = adminAccounts.find(
    (a) => a.username.toLowerCase() === cleanUsername && a.passwordHash === cleanPassword
  );

  if (!account) {
    throw new Error('Invalid Admin username or password. Default admin: username "admin", password "admin123".');
  }

  const token = `token_admin_${account.username}_${Date.now()}`;

  return {
    success: true,
    token,
    user: {
      id: account.id,
      role: 'admin',
      username: account.username,
      name: account.name,
      title: account.title,
      email: account.email,
      loginTime: new Date().toISOString(),
    },
  };
}

export function changeAdminPassword(
  username: string,
  currentPassword: string,
  newPassword: string
): { success: boolean; message: string; username: string } {
  const cleanUsername = (username || '').trim().toLowerCase();
  const cleanCurrent = (currentPassword || '').trim();
  const cleanNew = (newPassword || '').trim();

  if (!cleanUsername) {
    throw new Error('Admin username is required.');
  }
  if (!cleanCurrent) {
    throw new Error('Please enter your current password.');
  }
  if (!cleanNew) {
    throw new Error('Please enter a new password.');
  }
  if (cleanNew.length < 6) {
    throw new Error('New password must be at least 6 characters long.');
  }
  if (cleanCurrent === cleanNew) {
    throw new Error('New password must be different from your current password.');
  }

  const account = adminAccounts.find(
    (a) => a.username.toLowerCase() === cleanUsername
  );

  if (!account) {
    throw new Error(`Admin account "${username}" not found.`);
  }

  if (account.passwordHash !== cleanCurrent) {
    throw new Error('Current password does not match. Please verify your existing password.');
  }

  // Update password in memory & persist to disk
  account.passwordHash = cleanNew;
  saveAdminAccounts();

  console.log(`🔐 [ADMIN PASSWORD CHANGED] Admin user "${account.username}" successfully changed password.`);

  return {
    success: true,
    message: `Password for admin account "${account.username}" was updated successfully.`,
    username: account.username,
  };
}

export function getAllCitizens(): CitizenAccount[] {
  return Array.from(citizenAccounts.values());
}
