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
      model: 'gemini-3.7-flash',
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

export async function askCivicHelpline(query: string, chatHistory: Array<{ role: 'user' | 'model'; text: string }> = []): Promise<string> {
  if (!ai) {
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
- Tone: Highly respectful, empathetic, civic-minded, and actionable. Keep responses concise and well-formatted.
`;

    const contents = [
      ...chatHistory.map((m) => ({
        role: m.role === 'model' ? 'model' : 'user',
        parts: [{ text: m.text }],
      })),
      { role: 'user', parts: [{ text: query }] },
    ];

    const response = await ai.models.generateContent({
      model: 'gemini-3.7-flash',
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
