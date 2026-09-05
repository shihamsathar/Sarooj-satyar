import React, { useState, useRef, useEffect } from 'react';
import { 
  X, 
  Send, 
  Sparkles, 
  Bot, 
  Loader2,
  Camera,
  Mic,
  Square,
  Play,
  Pause,
  Trash2,
  Image as ImageIcon,
  Check,
  Paperclip,
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
  image?: string;
  voiceNote?: {
    audioUrl: string;
    durationSec?: number;
  };
}

// Compact audio player inside chat messages
const AudioMessageBubble: React.FC<{ audioUrl: string; durationSec?: number; isUser?: boolean }> = ({
  audioUrl,
  durationSec,
  isUser,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch(console.error);
      setIsPlaying(true);
    }
  };

  return (
    <div
      className={`flex items-center gap-2 p-2 rounded-xl border text-xs ${
        isUser
          ? 'bg-emerald-900/70 border-emerald-600/50 text-white'
          : 'bg-stone-100 border-stone-200 text-stone-900'
      }`}
    >
      <audio
        ref={audioRef}
        src={audioUrl}
        onEnded={() => setIsPlaying(false)}
        onPause={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
        className="hidden"
      />
      <button
        type="button"
        onClick={togglePlay}
        className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform active:scale-90 cursor-pointer ${
          isUser
            ? 'bg-amber-400 hover:bg-amber-300 text-stone-950 shadow-xs'
            : 'bg-emerald-800 hover:bg-emerald-900 text-white shadow-xs'
        }`}
        title={isPlaying ? 'Pause voice note' : 'Play voice note'}
      >
        {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
      </button>

      <div className="flex-1 flex items-center justify-between gap-2 min-w-[120px]">
        {/* Animated wave bars */}
        <div className="flex items-center gap-0.5 h-3">
          <span className={`w-0.5 rounded-full transition-all duration-200 ${isPlaying ? 'h-3.5 bg-amber-400 animate-pulse' : 'h-1.5 bg-current opacity-40'}`} />
          <span className={`w-0.5 rounded-full transition-all duration-200 ${isPlaying ? 'h-4 bg-amber-300 animate-pulse delay-75' : 'h-2.5 bg-current opacity-40'}`} />
          <span className={`w-0.5 rounded-full transition-all duration-200 ${isPlaying ? 'h-2.5 bg-amber-400 animate-pulse delay-150' : 'h-1 bg-current opacity-40'}`} />
          <span className={`w-0.5 rounded-full transition-all duration-200 ${isPlaying ? 'h-4 bg-amber-300 animate-pulse delay-100' : 'h-3 bg-current opacity-40'}`} />
          <span className={`w-0.5 rounded-full transition-all duration-200 ${isPlaying ? 'h-3 bg-amber-400 animate-pulse delay-200' : 'h-1.5 bg-current opacity-40'}`} />
          <span className={`w-0.5 rounded-full transition-all duration-200 ${isPlaying ? 'h-2 bg-amber-300 animate-pulse delay-150' : 'h-2 bg-current opacity-40'}`} />
        </div>
        <span className="font-mono text-[10px] opacity-80 shrink-0">
          {durationSec ? `${Math.floor(durationSec / 60)}:${(durationSec % 60).toString().padStart(2, '0')}` : 'Voice Note'}
        </span>
      </div>
    </div>
  );
};

export const AiCivicChatbot: React.FC<AiCivicChatbotProps> = ({ language = 'en' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const currentLang: Language = (language === 'si' || language === 'ta') ? language : 'en';
  const t = translations[currentLang];

  const getInitialWelcome = (lang: Language = 'en') => {
    if (lang === 'ta') {
      return 'வணக்கம்! உறுப்பினர் சரூஜ் சத்தாரின் மக்கள் சேவை வழிகாட்டலுக்கு வரவேற்கிறோம். நீர்கொழும்பு மாநகர சபை சேவைகள், புகார்கள் குறித்து கேட்கலாம். உங்கள் குரல் பதிவு அல்லது புகைப்படங்களையும் இணைக்கலாம்!';
    }
    if (lang === 'si') {
      return 'ආයුබෝවන්! මන්ත්‍රී සරූජ් සත්තාර්ගේ ප්‍රජා සේවා සහයක වෙත සාදරයෙන් පිළිගනිමු. මීගමුව නගර සභා සේවාවන් හෝ ගැටලු විමසිය හැක. ඔබගේ හඬ පණිවිඩ හෝ ඡායාරූපද මෙහි එක් කළ හැක!';
    }
    return 'Ayubowan & Vanakkam! Welcome to Councillor Sarooj Sattar’s Civic Helpdesk. Ask about municipal services, report issues, or record a voice note and attach pictures of local concerns in Negombo!';
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

  // Attachments state
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedAudio, setSelectedAudio] = useState<{ dataUrl: string; durationSec: number } | null>(null);

  // Voice recording state
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const recordTimerRef = useRef<number | null>(null);
  const recordingSecondsRef = useRef<number>(0);
  const streamRef = useRef<MediaStream | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputImageRef = useRef<HTMLInputElement>(null);
  const fileInputAudioRef = useRef<HTMLInputElement>(null);

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
  }, [messages, isOpen, selectedImage, selectedAudio]);

  // Clean up recording on unmount
  useEffect(() => {
    return () => {
      if (recordTimerRef.current) clearInterval(recordTimerRef.current);
      if (streamRef.current) streamRef.current.getTracks().forEach((track) => track.stop());
    };
  }, []);

  // Voice recording handlers
  const startRecording = async () => {
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Media devices not supported');
      }
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      
      const mimeType = MediaRecorder.isTypeSupported('audio/webm')
        ? 'audio/webm'
        : (MediaRecorder.isTypeSupported('audio/mp4') ? 'audio/mp4' : '');

      const mediaRecorder = mimeType ? new MediaRecorder(stream, { mimeType }) : new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: mediaRecorder.mimeType || 'audio/webm' });
        const reader = new FileReader();
        reader.onloadend = () => {
          setSelectedAudio({
            dataUrl: reader.result as string,
            durationSec: recordingSecondsRef.current || 1,
          });
        };
        reader.readAsDataURL(audioBlob);

        if (streamRef.current) {
          streamRef.current.getTracks().forEach((track) => track.stop());
          streamRef.current = null;
        }
      };

      mediaRecorder.start(200);
      setIsRecording(true);
      setRecordingSeconds(0);
      recordingSecondsRef.current = 0;

      recordTimerRef.current = window.setInterval(() => {
        setRecordingSeconds((prev) => {
          const next = prev + 1;
          recordingSecondsRef.current = next;
          return next;
        });
      }, 1000);
    } catch (err) {
      console.error('Microphone access failed:', err);
      fileInputAudioRef.current?.click();
    }
  };

  const stopRecording = () => {
    if (recordTimerRef.current) {
      clearInterval(recordTimerRef.current);
      recordTimerRef.current = null;
    }
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
    setIsRecording(false);
  };

  const cancelRecording = () => {
    if (recordTimerRef.current) {
      clearInterval(recordTimerRef.current);
      recordTimerRef.current = null;
    }
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.onstop = null;
      if (mediaRecorderRef.current.state !== 'inactive') {
        mediaRecorderRef.current.stop();
      }
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    audioChunksRef.current = [];
    setIsRecording(false);
    setRecordingSeconds(0);
  };

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      const rawData = reader.result as string;
      const img = new Image();
      img.onload = () => {
        const maxDim = 1200;
        let width = img.width;
        let height = img.height;
        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          setSelectedImage(canvas.toDataURL('image/jpeg', 0.85));
        } else {
          setSelectedImage(rawData);
        }
      };
      img.onerror = () => setSelectedImage(rawData);
      img.src = rawData;
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const handleAudioFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setSelectedAudio({
        dataUrl: reader.result as string,
        durationSec: 5,
      });
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || input;
    const hasMedia = Boolean(selectedImage || selectedAudio);
    if ((!query.trim() && !hasMedia) || loading) return;

    const userVoiceNote = selectedAudio ? { audioUrl: selectedAudio.dataUrl, durationSec: selectedAudio.durationSec } : undefined;
    const userImage = selectedImage || undefined;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: query.trim() || (userVoiceNote ? (currentLang === 'ta' ? '🎙️ [குரல் பதிவு அனுப்பப்பட்டது]' : currentLang === 'si' ? '🎙️ [හඬ පණිවිඩය යවන ලදී]' : '🎙️ [Voice note submitted]') : ''),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      image: userImage,
      voiceNote: userVoiceNote,
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    const sentImage = selectedImage;
    const sentAudio = selectedAudio?.dataUrl;
    setSelectedImage(null);
    setSelectedAudio(null);
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
          message: query.trim(),
          query: query.trim(),
          image: sentImage,
          audio: sentAudio,
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
          ? 'உங்கள் செய்தி பெறப்பட்டது. உறுப்பினர் சரூஜ் சத்தாரின் அலுவலகத்தை வாட்ஸ்அப் (0702475248) அல்லது தொலைபேசி (0702475248 / 0768787382) ஊடாக நேரடியாக தொடர்பு கொள்ளலாம்.'
          : (language === 'si'
            ? 'ඔබගේ පණිවිඩය සටහන් විය. මන්ත්‍රී සරූජ් සත්තාර්ගේ කාර්යාලය වට්ස්ඇප් (0702475248) හෝ දුරකථන (0702475248 / 0768787382) මගින් සෘජුවම සම්බන්ධ කරගත හැක.'
            : 'Your message has been received. Councillor Sarooj Sattar’s office is available directly on WhatsApp at 0702475248 or by phone at 0702475248 / 0768787382. You can also submit an official grievance using the "Submit Complaint" button.'),
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
    <div className={`fixed z-40 transition-all ${
      isOpen 
        ? 'inset-x-3 bottom-20 sm:bottom-6 sm:right-6 sm:left-auto sm:w-[410px]' 
        : 'bottom-20 sm:bottom-6 right-3 sm:right-6'
    }`}>
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center gap-2.5 px-3.5 sm:px-4 py-3 sm:py-3.5 bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-900 hover:from-emerald-900 hover:to-teal-950 text-white rounded-full shadow-2xl hover:shadow-emerald-900/30 transition-all duration-300 transform hover:scale-105 active:scale-95 border-2 border-emerald-500/40 cursor-pointer min-h-[44px]"
          aria-label="Open Civic AI Assistant"
        >
          <div className="relative">
            <Bot className="w-5 h-5 sm:w-6 sm:h-6 text-amber-300" />
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
        <div className="w-full sm:w-[410px] max-h-[calc(100dvh-5.5rem)] sm:max-h-[82vh] h-[520px] bg-white rounded-3xl shadow-2xl border border-stone-300 overflow-hidden flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-300">
          
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
                  <span>Negombo MC Knowledge Base • Voice & Photo Enabled</span>
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
                  className={`max-w-[85%] rounded-2xl p-3 text-xs leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-emerald-800 text-white rounded-br-xs'
                      : 'bg-white text-stone-800 border border-stone-200 shadow-xs rounded-bl-xs'
                  }`}
                >
                  {/* Attachment in message */}
                  {m.image && (
                    <div className="mb-2 p-2 rounded-xl bg-black/10 flex items-center gap-2 text-[11px] font-semibold">
                      <Paperclip className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                      <span>Citizen attachment submitted</span>
                    </div>
                  )}

                  {/* Voice Note in message */}
                  {m.voiceNote && (
                    <div className="mb-2">
                      <AudioMessageBubble
                        audioUrl={m.voiceNote.audioUrl}
                        durationSec={m.voiceNote.durationSec}
                        isUser={m.sender === 'user'}
                      />
                    </div>
                  )}

                  {/* Text */}
                  {m.text && <p className="whitespace-pre-wrap">{m.text}</p>}

                  <span
                    className={`block text-[9px] mt-1.5 text-right ${
                      m.sender === 'user' ? 'text-emerald-200' : 'text-stone-400'
                    }`}
                  >
                    {m.timestamp}
                  </span>
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex gap-2 items-center text-xs text-stone-500 bg-white p-2.5 rounded-xl border border-stone-200 max-w-[70%] shadow-xs">
                <Loader2 className="w-3.5 h-3.5 animate-spin text-emerald-700" />
                <span>{language === 'ta' ? 'பதிலை தயாரித்து வருகிறோம்...' : (language === 'si' ? 'තොරතුරු පරීක්ෂා කරමින් පවතී...' : 'Checking municipal records & files...')}</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompt Chips */}
          <div className="px-3 py-1.5 bg-white border-t border-stone-100 flex gap-1.5 overflow-x-auto text-[11px] whitespace-nowrap no-scrollbar">
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

          {/* Pending Attachments Preview Bar */}
          {(selectedImage || selectedAudio) && (
            <div className="px-3 py-2 bg-emerald-50/80 border-t border-emerald-100 flex items-center gap-2">
              {selectedImage && (
                <div className="relative inline-flex items-center gap-1.5 bg-white px-2.5 py-1.5 rounded-lg border border-emerald-300 shadow-xs text-xs text-emerald-900">
                  <Paperclip className="w-3.5 h-3.5 text-emerald-700" />
                  <span className="text-[11px] font-medium truncate max-w-[100px]">
                    {currentLang === 'ta' ? 'இணைப்பு' : currentLang === 'si' ? 'ගොනුව' : 'Attachment'}
                  </span>
                  <button
                    type="button"
                    onClick={() => setSelectedImage(null)}
                    className="ml-1 text-stone-400 hover:text-red-500 cursor-pointer"
                    title="Remove attachment"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              {selectedAudio && (
                <div className="relative inline-flex items-center gap-1.5 bg-white px-2 py-1 rounded-lg border border-emerald-300 shadow-xs text-xs text-emerald-900">
                  <Mic className="w-3.5 h-3.5 text-emerald-700" />
                  <span className="text-[11px] font-medium">
                    {currentLang === 'ta' ? 'குரல் பதிவு' : currentLang === 'si' ? 'හඬ පණිවිඩය' : 'Voice Note'} ({selectedAudio.durationSec}s)
                  </span>
                  <button
                    type="button"
                    onClick={() => setSelectedAudio(null)}
                    className="ml-1 text-stone-400 hover:text-red-500 cursor-pointer"
                    title="Remove voice note"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Hidden File Inputs */}
          <input
            type="file"
            ref={fileInputImageRef}
            onChange={handleImageFileChange}
            accept="image/*"
            className="hidden"
          />
          <input
            type="file"
            ref={fileInputAudioRef}
            onChange={handleAudioFileChange}
            accept="audio/*"
            className="hidden"
          />

          {/* Input Bar or Active Recording Bar */}
          {isRecording ? (
            <div className="p-3 bg-red-50/90 border-t border-red-200 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-600 animate-ping" />
                <span className="text-xs font-bold text-red-900">
                  {currentLang === 'ta' ? 'குரல் பதிவாகிறது...' : currentLang === 'si' ? 'හඬ පටිගත වේ...' : 'Recording Voice Note...'}
                </span>
                <span className="font-mono text-xs text-red-700 font-bold bg-white px-2 py-0.5 rounded-md border border-red-200">
                  {Math.floor(recordingSeconds / 60)}:{(recordingSeconds % 60).toString().padStart(2, '0')}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={cancelRecording}
                  className="p-2 rounded-xl bg-white hover:bg-stone-100 text-stone-600 border border-stone-200 transition-colors cursor-pointer"
                  title="Cancel recording"
                >
                  <Trash2 className="w-4 h-4 text-red-600" />
                </button>
                <button
                  type="button"
                  onClick={stopRecording}
                  className="px-3 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                  title="Done recording"
                >
                  <Square className="w-3.5 h-3.5 fill-current" />
                  <span>{currentLang === 'ta' ? 'முடிக்க' : currentLang === 'si' ? 'අවසන්' : 'Done'}</span>
                </button>
              </div>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="p-3 bg-white border-t border-stone-200 flex items-center gap-1.5"
            >
              {/* Add Picture Button */}
              <button
                type="button"
                onClick={() => fileInputImageRef.current?.click()}
                className="p-2 rounded-xl bg-stone-100 hover:bg-emerald-100 text-emerald-800 border border-stone-200 transition-colors cursor-pointer"
                title={currentLang === 'ta' ? 'புகைப்படம் இணைக்க' : currentLang === 'si' ? 'ඡායාරූපයක් එක් කරන්න' : 'Attach Picture / Photo'}
              >
                <Camera className="w-4 h-4" />
              </button>

              {/* Record Voice Note Button */}
              <button
                type="button"
                onClick={startRecording}
                className="p-2 rounded-xl bg-stone-100 hover:bg-amber-100 text-amber-800 border border-stone-200 transition-colors cursor-pointer"
                title={currentLang === 'ta' ? 'குரல் பதிவு செய்ய' : currentLang === 'si' ? 'හඬ පණිවිඩයක් පටිගත කරන්න' : 'Record Voice Note'}
              >
                <Mic className="w-4 h-4" />
              </button>

              {/* Message Input */}
              <input
                type="text"
                placeholder={
                  language === 'ta'
                    ? 'கேள்வியை உள்ளிடவும்...'
                    : language === 'si'
                    ? 'ඔබගේ පැනය මෙහි සටහන් කරන්න...'
                    : 'Ask Councillor, or send photo / voice...'
                }
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 px-3 py-2 rounded-xl bg-stone-100 border border-stone-200 text-xs font-medium focus:bg-white focus:ring-2 focus:ring-emerald-600 focus:outline-hidden text-stone-900"
              />

              {/* Send Button */}
              <button
                type="submit"
                disabled={(!input.trim() && !selectedImage && !selectedAudio) || loading}
                className="p-2 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white transition-colors disabled:opacity-40 cursor-pointer shadow-xs"
                title="Send"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          )}

        </div>
      )}
    </div>
  );
};
