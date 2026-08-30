import { LucideIcon } from 'lucide-react';

export interface OfficialPoster {
  id: string;
  name: string;
  shortLabel: string;
  language: 'en' | 'ta' | 'si' | 'dual';
  shirtType: 'white' | 'striped';
  badgeColor: string;
  themeGradient: string;
  quoteTitle?: string;
  quoteSinhala?: string[];
  quoteTamil?: string[];
  quoteEnglish?: string[];
  signature: string;
  title: string;
  subtitle: string;
  motto: string;
  description: string;
}

export const OFFICIAL_POSTERS: OfficialPoster[] = [
  {
    id: 'poster_en_white',
    name: 'English Community Banner (White Shirt)',
    shortLabel: 'English • White Shirt',
    language: 'en',
    shirtType: 'white',
    badgeColor: 'bg-amber-100 text-amber-950 border-amber-300',
    themeGradient: 'from-[#FFA726] via-[#FB8C00] to-[#1B4D3E]',
    quoteEnglish: [
      'Until my',
      'last breath,',
      'I will stand with those in need and serve the poor with',
      'compassion.',
    ],
    signature: 'Sarooj Sattar',
    title: 'Negombo Municipal Council',
    subtitle: 'Councillor • Ward 05 Periyamulla',
    motto: 'Together for a Better Tomorrow',
    description: 'Councillor Sarooj Sattar standing with community members and elders in warm sunset golden hour lighting.',
  },
  {
    id: 'poster_ta_striped',
    name: 'Tamil Village Morning (Striped Shirt)',
    shortLabel: 'தமிழ் • Striped Shirt',
    language: 'ta',
    shirtType: 'striped',
    badgeColor: 'bg-blue-100 text-blue-950 border-blue-300',
    themeGradient: 'from-[#FFB300] via-[#E65100] to-[#0D47A1]',
    quoteTamil: [
      'பதவியால் அல்ல...',
      'பாசத்தால்',
      'என் மக்களோடு',
      'இணைந்தவன் நான்.',
    ],
    signature: 'Sarooj Sattar',
    title: 'Negombo Municipal Council',
    subtitle: 'Councillor • Ward 05 Periyamulla',
    motto: 'பாசத்தால் இணைந்த மக்கள் சேவகன்',
    description: 'Councillor Sarooj Sattar in navy-and-white vertical striped shirt, arms crossed, with local village street and smiling children in sunrise lighting.',
  },
  {
    id: 'poster_ta_duty',
    name: 'Tamil Duty & Faith (White Shirt)',
    shortLabel: 'தமிழ் • சேவை பொறுப்பு',
    language: 'ta',
    shirtType: 'white',
    badgeColor: 'bg-emerald-100 text-emerald-950 border-emerald-300',
    themeGradient: 'from-[#FF9800] via-[#F57C00] to-[#1B4D3E]',
    quoteTamil: [
      'சேவை செய்வது',
      'என் பெருமை அல்ல —',
      'அது என் பொறுப்பு.',
      'அல்லாஹ்வின் உதவியோடு,',
      'என்றும் என் மக்களுக்காக...',
      'இன்ஷா அல்லாஹ்.',
    ],
    signature: 'Sarooj Sattar',
    title: 'Negombo Municipal Council',
    subtitle: 'Councillor • Ward 05 Periyamulla',
    motto: 'சேவை செய்வது என் பொறுப்பு',
    description: 'Councillor Sarooj Sattar with golden quote box in Tamil expressing devotion and service to the people of Negombo.',
  },
  {
    id: 'poster_si_poem',
    name: 'Sinhala Poetic Reflection (White Shirt)',
    shortLabel: 'සිංහල • මිනිසා සුවඳයි',
    language: 'si',
    shirtType: 'white',
    badgeColor: 'bg-amber-100 text-amber-950 border-amber-300',
    themeGradient: 'from-[#FFB74D] via-[#F57C00] to-[#2E7D32]',
    quoteSinhala: [
      'මිනිසා සුවඳයි මලසේ,',
      'නුවනින් එළියයි හිරුසේ,',
      'පරවී වැටිලා ඒ හිරු මල',
      'මේ දෙරණේ...',
    ],
    signature: 'Sarooj Sattar',
    title: 'Negombo Municipal Council',
    subtitle: 'Councillor • Ward 05 Periyamulla',
    motto: 'මිනිසා සුවඳයි මලසේ',
    description: 'Councillor Sarooj Sattar with the beloved Sinhala poem framed in gold filigree.',
  },
  {
    id: 'poster_ta_promise',
    name: 'Tamil Promise & Duty (White Shirt)',
    shortLabel: 'தமிழ் • கடமை & சேவை',
    language: 'ta',
    shirtType: 'white',
    badgeColor: 'bg-purple-100 text-purple-950 border-purple-300',
    themeGradient: 'from-[#FF9800] via-[#E65100] to-[#311B92]',
    quoteEnglish: [
      'Until my last breath,',
      'I will stand with those in need and serve the poor with compassion.',
    ],
    quoteTamil: [
      'மக்களோடு இருப்பது',
      'என் வாக்குறுதி அல்ல —',
      'அது என் கடமை.',
      'சேவை செய்வது',
      'என் பெருமை அல்ல —',
      'அது என் பொறுப்பு.',
      'அல்லாஹ்வின் உதவியோடு,',
      'என்றும் என் மக்களுக்காக...',
    ],
    signature: 'Sarooj Sattar',
    title: 'Negombo Municipal Council',
    subtitle: 'Councillor • Ward 05 Periyamulla',
    motto: 'மக்களோடு இருப்பது என் கடமை',
    description: 'Comprehensive civic poster combining English compassion quote and Tamil duty inscription.',
  },
];
