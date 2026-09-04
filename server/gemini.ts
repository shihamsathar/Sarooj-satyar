import { GoogleGenAI } from '@google/genai';

// Initialize the Google GenAI SDK with server-only GEMINI_API_KEY
const apiKey = process.env.GEMINI_API_KEY;

let ai: GoogleGenAI | null = null;
if (apiKey && apiKey !== 'MY_GEMINI_API_KEY') {
  ai = new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

export async function analyzeCitizenComplaint(input: {
  title: string;
  description: string;
  ward?: string;
  locationAddress?: string;
}): Promise<{
  category: string;
  priority: 'emergency' | 'high' | 'medium' | 'low';
  estimatedDays: number;
  aiSummary: string;
  aiSuggestedAction: string;
  assignedDepartment: string;
  councillorInitialNote: string;
}> {
  if (!ai) {
    // Intelligent rule-based fallback if API key is not yet set
    const text = `${input.title} ${input.description}`.toLowerCase();
    let category = 'Other Municipal Services';
    let priority: 'emergency' | 'high' | 'medium' | 'low' = 'medium';
    let department = 'Negombo Municipal Grievance Cell';
    let days = 3;

    if (text.includes('flood') || text.includes('drain') || text.includes('gutter') || text.includes('sewer') || text.includes('water')) {
      category = 'Water Supply & Drainage';
      priority = text.includes('flood') || text.includes('overflow') ? 'high' : 'medium';
      department = 'Drainage & Stormwater Maintenance Division';
      days = 2;
    } else if (text.includes('light') || text.includes('lamp') || text.includes('dark') || text.includes('electric') || text.includes('wire')) {
      category = 'Streetlights & CEB';
      priority = text.includes('spark') || text.includes('live wire') ? 'emergency' : 'medium';
      department = 'Electrical & Street Lighting Engineering Unit';
      days = 2;
    } else if (text.includes('road') || text.includes('pothole') || text.includes('tar') || text.includes('asphalt') || text.includes('bridge') || text.includes('pavement')) {
      category = 'Roads & Infrastructure';
      priority = text.includes('severe') || text.includes('accident') ? 'high' : 'medium';
      department = 'Provincial & Municipal Roads Directorate';
      days = 4;
    } else if (text.includes('garbage') || text.includes('waste') || text.includes('smell') || text.includes('trash') || text.includes('clean')) {
      category = 'Sanitation & Waste';
      priority = 'medium';
      department = 'Solid Waste Management & Public Health Division';
      days = 2;
    } else if (text.includes('dengue') || text.includes('mosquito') || text.includes('fever') || text.includes('clinic')) {
      category = 'Public Health & Dengue';
      priority = 'high';
      department = 'Public Health Inspector (PHI) Unit, Negombo';
      days = 1;
    }

    return {
      category,
      priority,
      estimatedDays: days,
      aiSummary: `Citizen report regarding ${input.title.toLowerCase()} in ${input.ward || 'Negombo municipal ward'}.`,
      aiSuggestedAction: `Schedule field inspection by ${department} and prioritize remediation.`,
      assignedDepartment: department,
      councillorInitialNote: `Your grievance has been logged by Councillor Sarooj Sattar's office and assigned to ${department}.`,
    };
  }

  try {
    const prompt = `
You are the Chief Civic Engineer and AI Triage Specialist for Negombo Municipal Council and the Office of Municipal Councillor Sarooj Sattar (Sri Lanka).
Analyze this citizen grievance submission:
Title: "${input.title}"
Description: "${input.description}"
Ward/Area: "${input.ward || 'Negombo'}"
Address: "${input.locationAddress || 'Not specified'}"

Respond ONLY with a JSON object strictly following this structure:
{
  "category": "Roads & Infrastructure" | "Sanitation & Waste" | "Streetlights & CEB" | "Water Supply & Drainage" | "Public Health & Dengue" | "Community Welfare" | "Building & Encroachment" | "Other Municipal Services",
  "priority": "emergency" | "high" | "medium" | "low",
  "estimatedDays": number (between 1 and 14),
  "aiSummary": "A concise 1-sentence technical synthesis of the problem",
  "aiSuggestedAction": "Specific municipal operational action required (e.g., dispatch gully emptier, replace sodium bulb with 90W LED, cold-mix asphalt patch)",
  "assignedDepartment": "The exact municipal or statutory department responsible (e.g. Solid Waste Division, Electrical Unit, NWSDB Liaison, Public Health Inspector)",
  "councillorInitialNote": "A warm, respectful official response in the voice of Councillor Sarooj Sattar confirming action."
}
`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        temperature: 0.2,
      },
    });

    const parsed = JSON.parse(response.text?.trim() || '{}');
    return {
      category: parsed.category || 'Other Municipal Services',
      priority: parsed.priority || 'medium',
      estimatedDays: Number(parsed.estimatedDays) || 3,
      aiSummary: parsed.aiSummary || input.title,
      aiSuggestedAction: parsed.aiSuggestedAction || 'Dispatch municipal field inspection team.',
      assignedDepartment: parsed.assignedDepartment || 'Negombo MC Works Dept',
      councillorInitialNote: parsed.councillorInitialNote || 'Received with priority. We are coordinating with council engineers.',
    };
  } catch (error) {
    console.error('Gemini AI complaint triage error:', error);
    return {
      category: 'Other Municipal Services',
      priority: 'medium',
      estimatedDays: 3,
      aiSummary: input.title,
      aiSuggestedAction: 'Immediate field inspection and engineer verification.',
      assignedDepartment: 'Negombo Municipal Works Department',
      councillorInitialNote: 'Your complaint has been acknowledged by Councillor Sarooj Sattar and forwarded to council officers.',
    };
  }
}

export interface CivicChatMedia {
  data: string; // base64 or dataUrl
  mimeType?: string;
}

export interface CivicChatInput {
  query?: string;
  chatHistory?: Array<{ role: 'user' | 'model'; text: string }>;
  image?: CivicChatMedia | string;
  audio?: CivicChatMedia | string;
  language?: string;
}

function extractMedia(media: CivicChatMedia | string | undefined, defaultMime: string) {
  if (!media) return null;
  if (typeof media === 'string') {
    if (media.startsWith('data:')) {
      const match = media.match(/^data:([^;]+);base64,(.+)$/);
      if (match) {
        return { mimeType: match[1], data: match[2] };
      }
    }
    const clean = media.includes('base64,') ? media.split('base64,')[1] : media;
    return { mimeType: defaultMime, data: clean };
  }
  const clean = media.data.includes('base64,') ? media.data.split('base64,')[1] : media.data;
  return { mimeType: media.mimeType || defaultMime, data: clean };
}

export async function askCivicHelpline(
  inputOrQuery: string | CivicChatInput,
  chatHistoryFallback: Array<{ role: 'user' | 'model'; text: string }> = []
): Promise<string> {
  const isInputObj = typeof inputOrQuery === 'object' && inputOrQuery !== null;
  const query = (isInputObj ? inputOrQuery.query : inputOrQuery) || '';
  const chatHistory = (isInputObj && inputOrQuery.chatHistory ? inputOrQuery.chatHistory : chatHistoryFallback) || [];
  const image = isInputObj ? inputOrQuery.image : undefined;
  const audio = isInputObj ? inputOrQuery.audio : undefined;
  const language = (isInputObj ? inputOrQuery.language : 'en') || 'en';

  const parsedImage = extractMedia(image, 'image/jpeg');
  const parsedAudio = extractMedia(audio, 'audio/webm');

  if (!ai) {
    if (parsedAudio && parsedImage) {
      if (language === 'ta') {
        return '🎙️ உங்கள் குரல் பதிவும் 📷 புகைப்படமும் பெறப்பட்டுள்ளது. பெரியமுல்லை மற்றும் நீர்கொழும்பு மாநகர சபை பணிக் குழுவுடன் இணைந்து உறுப்பினர் சரூஜ் சத்தார் இதனை உடனடியாக பரிசீலிப்பார். அவசர உதவிக்கு: 0702475248.';
      }
      if (language === 'si') {
        return '🎙️ ඔබගේ හඬ පණිවිඩය සහ 📷 ඡායාරූපය සාර්ථකව ලැබිණි. මීගමුව නගර සභා කාර්යාලය හා ක්ෂේත්‍ර ඉංජිනේරුවන් සමඟ එක්ව මන්ත්‍රී සරූජ් සත්තාර් මේ පිළිබඳව ක්ෂණික පියවර ගනු ඇත. හදිසි ඇමතුම්: 0702475248.';
      }
      return '🎙️ Your voice note and 📷 photo have been logged at Councillor Sarooj Sattar’s Civic Desk. Our community response team is reviewing both attachments to assist with the Negombo municipal complaint. Emergency hotline: 0702475248.';
    }

    if (parsedAudio) {
      if (language === 'ta') {
        return '🎙️ உங்கள் குரல் பதிவு பெறப்பட்டு பதிவு செய்யப்பட்டுள்ளது. உறுப்பினர் சரூஜ் சத்தாரின் மக்கள் உதவி மையம் இதனை பரிசீலித்து உரிய நடவடிக்கை எடுக்கும். நேரடி தொடர்புக்கு: 0702475248.';
      }
      if (language === 'si') {
        return '🎙️ ඔබගේ හඬ පණිවිඩය සාර්ථකව සටහන් විය. මන්ත්‍රී සරූජ් සත්තාර්ගේ මහජන සේවා කාර්යාලය විසින් අදාළ නගර සභා නිලධාරීන් දැනුවත් කරනු ඇත. හදිසි ඇමතුම්: 0702475248.';
      }
      return '🎙️ Your voice note has been received and logged by Councillor Sarooj Sattar’s Civic Desk. Our secretariat is reviewing your audio message for municipal follow-up in Negombo. You may also call 0702475248 directly.';
    }

    if (parsedImage) {
      if (language === 'ta') {
        return '📷 களப் புகைப்படம் பெறப்பட்டுள்ளது! நீர்கொழும்பு மாநகர சபை பொறியியல் மற்றும் தூய்மைப் பிரிவுக்கு இது அனுப்பி வைக்கப்படும். அவசர தொடர்புக்கு: 0702475248.';
      }
      if (language === 'si') {
        return '📷 ඔබ එවන ලද ක්ෂේත්‍ර ඡායාරූපය අප සටහන් කරගත්තෙමු. මීගමුව නගර සභා අංශ වෙත මෙය යොමු කර විමර්ශනය කෙරේ. හදිසි ඇමතුම්: 0702475248.';
      }
      return '📷 Thank you for providing on-site photographic evidence. Councillor Sarooj Sattar’s office has logged this visual record for the Negombo Municipal inspection team. For urgent action, contact 0702475248.';
    }

    return `Hello! This is the automated civic helpline for Councillor Sarooj Sattar's Office in Negombo.
For immediate emergency assistance, please call Councillor Sarooj Sattar directly on 0702475248 or 0768787382.
You can also report streetlights, drainage, or road issues directly using our "Submit Complaint" form above to receive an instant tracking ID.`;
  }

  try {
    const systemInstruction = `
You are the official AI Civic Counselor and Municipal Helpline Assistant for the **Sarooj Sattar Community Forum** in Negombo Municipal Council, Sri Lanka.
Councillor Sarooj Sattar's motto is: "Until my last breath, I will stand with those in need and serve the poor with compassion."

Key facts about Negombo & Councillor's Office:
- Office Address: 36 - St. Lazarus Road, Periyamulla, Negombo.
- Hotline: 0702475248 / 0768787382
- Email: saroojsattar@gmail.com
- Key Wards: Periyamulla, Dalupotha, Kochchikade, Sea Street, Pitipana, Munnakkara, Daluwakotuwa, Bolawalana, Kurana, Katuwapitiya, Ettukala, Mahahunupitiya.
- Emergency numbers: Police 119/031-2222222, Ambulance 1990, Hospital 031-2222261, Fire 031-2222224, Electricity 1987, Water Board 1939.
- You provide clear, helpful, courteous information regarding garbage schedules, road complaints, streetlight repairs, municipal taxes, welfare funds, and direct appointments with Councillor Sarooj Sattar.
- If the resident attached a voice note (audio), transcribe and understand their spoken request (in English, Tamil, or Sinhala) and respond warmly in the same language or appropriate municipal English.
- If the resident attached a picture / photo, inspect the visual evidence (e.g. road damage, blocked drains, uncollected garbage, streetlight faults, municipal documents) and provide an immediate assessment and guidance.
- Tone: Highly respectful, empathetic, civic-minded, and actionable. Keep responses concise and well-formatted.
`;

    const userParts: any[] = [];

    if (parsedImage) {
      userParts.push({
        inlineData: {
          mimeType: parsedImage.mimeType,
          data: parsedImage.data,
        },
      });
    }

    if (parsedAudio) {
      userParts.push({
        inlineData: {
          mimeType: parsedAudio.mimeType,
          data: parsedAudio.data,
        },
      });
    }

    const defaultPrompt = parsedAudio && parsedImage
      ? 'Please listen to my voice note and inspect the attached picture. Provide helpful civic guidance from Councillor Sarooj Sattar’s desk.'
      : parsedAudio
      ? 'Please listen to my recorded voice note and provide civic advice or municipal complaint follow-up from Councillor Sarooj Sattar’s office.'
      : parsedImage
      ? 'Please examine the attached picture showing an issue in Negombo and provide helpful municipal guidance and next steps.'
      : query;

    userParts.push({ text: query || defaultPrompt });

    const contents = [
      ...chatHistory.map((m) => ({
        role: m.role === 'model' ? 'model' : 'user',
        parts: [{ text: m.text }],
      })),
      { role: 'user', parts: userParts },
    ];

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: contents as any,
      config: {
        systemInstruction,
        temperature: 0.4,
      },
    });

    return response.text?.trim() || 'Councillor Sarooj Sattar and our community volunteers are ready to assist you. Please contact 0702475248.';
  } catch (error) {
    console.error('Civic helpline error:', error);
    return 'Thank you for reaching out. Please contact Councillor Sarooj Sattar on 0702475248 or visit our office at 36 St. Lazarus Road, Periyamulla.';
  }
}
