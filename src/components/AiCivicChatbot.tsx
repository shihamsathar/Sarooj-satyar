import React, { useState, useRef, useEffect } from 'react';
import { 
  X, 
  Send, 
  Sparkles, 
  Bot, 
  Loader2, 
} from 'lucide-react';
import type { Language } from '../utils/translations.js';
import { translations } from '../utils/translations.js';

interface AiCivicChatbotProps {
  onOpenModule?: (moduleId: string) => void;
  language?: Language;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

export const AiCivicChatbot: React.FC<AiCivicChatbotProps> = ({ language = 'en' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const currentLang: Language = (language === 'si' || language === 'ta') ? language : 'en';
  const t = translations[currentLang];

  const getInitialWelcome = (lang: Language = 'en') => {
    if (lang === 'ta') {
      return 'வணக்கம்! உறுப்பினர் சரூஜ் சத்தாரின் மக்கள் சேவை வழிகாட்டலுக்கு வரவேற்கிறோம். நீர்கொழும்பு மாநகர சபை சேவைகள் அல்லது உங்கள் குறைகளை பதிவு செய்ய நான் எவ்வாறு உதவ முடியும்?';
    }
    if (lang === 'si') {
      return 'ආයුබෝවන්! මන්ත්‍රී සරූජ් සත්තාර්ගේ ප්‍රජා සේවා සහයක වෙත සාදරයෙන් පිළිගනිමු. මීගමුව නගර සභා සේවාවන් හෝ ගැටලු වාර්තා කිරීම සම්බන්ධයෙන් මට ඔබට කෙසේ උපකාර කළ හැකිද?';
    }
    return 'Ayubowan & Vanakkam! Welcome to Councillor Sarooj Sattar’s Civic Helpdesk. How can I assist you with municipal services, reporting an issue, or public works in Negombo today?';
  };

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: getInitialWelcome(currentLang),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Update initial message when language changes if no user messages sent yet
  useEffect(() => {
    if (messages.length === 1 && messages[0].id === 'welcome') {
      setMessages([
        {
          id: 'welcome',
          sender: 'assistant',
          text: getInitialWelcome(currentLang),
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }
  }, [currentLang]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setLoading(true);

    try {
      // Build conversation history for server-side Gemini
      const conversationHistory = messages.slice(-6).map((m) => ({
        role: m.sender === 'user' ? 'user' : 'model',
        text: m.text,
      }));

      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          conversationHistory,
          language,
        }),
      });

      const data = await res.json();
      if (data.success && data.reply) {
        const botMsg: ChatMessage = {
          id: (Date.now() + 1).toString(),
          sender: 'assistant',
          text: data.reply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages((prev) => [...prev, botMsg]);
      } else {
        throw new Error(data.error || 'No response');
      }
    } catch (e) {
      const fallbackMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: language === 'ta'
          ? 'உறுப்பினர் சரூஜ் சத்தாரின் அலுவலகத்தை வாட்ஸ்அப் (0702475248) அல்லது தொலைபேசி (0702475248 / 0768787382) ஊடாக நேரடியாக தொடர்பு கொள்ளலாம்.'
          : (language === 'si'
            ? 'මන්ත්‍රී සරූජ් සත්තාර්ගේ කාර්යාලය වට්ස්ඇප් (0702475248) හෝ දුරකථන (0702475248 / 0768787382) මගින් සෘජුවම සම්බන්ධ කරගත හැක.'
            : 'Councillor Sarooj Sattar’s office is available directly on WhatsApp at 0702475248 or by phone at 0702475248 / 0768787382. You can also submit an official grievance using the "Submit Complaint" button.'),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setLoading(false);
    }
  };

  const quickPrompts = language === 'ta' ? [
    'பெரியமுல்லையில் வடிகால் அடைப்பை எவ்வாறு அறிவிப்பது?',
    'உறுப்பினர் சரூஜை சந்திக்கும் நேரம் என்ன?',
    'நீர்கொழும்பு மாநகர சபை பொறியியல் பிரிவு எங்குள்ளது?',
    'அவசர தொலைபேசி இலக்கங்கள்',
  ] : (language === 'si' ? [
    'පෙරියමුල්ලේ කානු අවහිරයක් වාර්තා කරන්නේ කෙසේද?',
    'මන්ත්‍රී සරූජ් හමුවිය හැකි වේලාවන් මොනවාද?',
    'මීගමුව නගර සභා ඉංජිනේරු අංශය පිහිටා ඇත්තේ කොහේද?',
    'හදිසි ඇමතුම් අංක',
  ] : [
    'How do I report a blocked drain in Periyamulla?',
    'What are the visiting hours for Councillor Sarooj?',
    'Where is the Negombo MC engineering unit located?',
    'Emergency phone numbers in Negombo',
  ]);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center gap-2.5 px-4 py-3.5 bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-900 hover:from-emerald-900 hover:to-teal-950 text-white rounded-full shadow-2xl hover:shadow-emerald-900/30 transition-all duration-300 transform hover:scale-105 active:scale-95 border-2 border-emerald-500/40 cursor-pointer"
          aria-label="Open Civic AI Assistant"
        >
          <div className="relative">
            <Bot className="w-6 h-6 text-amber-300" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
          </div>
          <div className="text-left hidden sm:block">
            <span className="block text-xs font-bold leading-tight">
              {language === 'ta' ? 'உறுப்பினரின் AI உதவி' : (language === 'si' ? 'මන්ත්‍රී AI උපදේශක' : "Ask Councillor's Desk")}
            </span>
            <span className="block text-[10px] text-emerald-200 font-medium">
              {language === 'ta' ? 'நேரடி மக்கள் வழிகாட்டல்' : (language === 'si' ? 'සෘජු මහජන සේවය' : 'AI Civic Counselor')}
            </span>
          </div>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="w-[92vw] sm:w-96 h-[520px] bg-white rounded-3xl shadow-2xl border border-stone-300 overflow-hidden flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-300">
          
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-teal-900 text-white p-4 flex items-center justify-between shadow-xs">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-700/80 border border-emerald-500/40 text-amber-300 flex items-center justify-center shadow-xs">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-sm text-white flex items-center gap-1.5">
                  <span>{language === 'ta' ? 'உறுப்பினரின் AI உதவி' : (language === 'si' ? 'මන්ත්‍රී AI උපදේශක' : "Councillor's Civic AI")}</span>
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                </h3>
                <span className="text-[10px] text-emerald-200 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Negombo MC Knowledge Base</span>
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-full text-emerald-200 hover:text-white hover:bg-emerald-800/80 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-stone-50">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-2.5 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.sender === 'assistant' && (
                  <div className="w-7 h-7 rounded-lg bg-emerald-800 text-amber-300 flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">
                    SS
                  </div>
                )}

                <div
                  className={`max-w-[80%] rounded-2xl p-3 text-xs leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-emerald-800 text-white rounded-br-xs'
                      : 'bg-white text-stone-800 border border-stone-200 shadow-xs rounded-bl-xs'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{m.text}</p>
                  <span
                    className={`block text-[9px] mt-1 text-right ${
                      m.sender === 'user' ? 'text-emerald-200' : 'text-stone-400'
                    }`}
                  >
                    {m.timestamp}
                  </span>
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex gap-2 items-center text-xs text-stone-500 bg-white p-2.5 rounded-xl border border-stone-200 max-w-[70%]">
                <Loader2 className="w-3.5 h-3.5 animate-spin text-emerald-700" />
                <span>{language === 'ta' ? 'பதிலை தயாரித்து வருகிறோம்...' : (language === 'si' ? 'තොරතුරු පරීක්ෂා කරමින් පවතී...' : 'Checking municipal records...')}</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompt Chips */}
          <div className="px-3 py-2 bg-white border-t border-stone-100 flex gap-1.5 overflow-x-auto text-[11px] whitespace-nowrap no-scrollbar">
            {quickPrompts.map((q) => (
              <button
                key={q}
                onClick={() => handleSend(q)}
                className="px-2.5 py-1 rounded-full bg-stone-100 hover:bg-emerald-100 hover:text-emerald-900 text-stone-600 transition-colors shrink-0 cursor-pointer"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-white border-t border-stone-200 flex items-center gap-2"
          >
            <input
              type="text"
              placeholder={language === 'ta' ? 'கேள்வியை உள்ளிடவும்...' : (language === 'si' ? 'ඔබගේ පැනය මෙහි සටහන් කරන්න...' : 'Ask about council matters or services...')}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 px-3.5 py-2.5 rounded-xl bg-stone-100 border border-stone-200 text-xs font-medium focus:bg-white focus:ring-2 focus:ring-emerald-600 focus:outline-hidden text-stone-900"
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="p-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white transition-colors disabled:opacity-50 cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}
    </div>
  );
};
