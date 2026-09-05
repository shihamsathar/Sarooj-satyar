import React, { useState } from 'react';
import { 
  Sparkles, 
  MapPin, 
  Calendar, 
  Eye, 
  X, 
  CheckCircle2, 
  HeartHandshake, 
  ChevronRight,
  ExternalLink,
  Layers,
  Users,
  Construction,
  HeartPulse,
  SunMedium,
  Waves,
  Trophy,
  Award,
  FileText
} from 'lucide-react';
import type { Language } from '../utils/translations.js';
import { translations } from '../utils/translations.js';
import type { CustomGalleryItem } from '../types.js';

export interface GalleryItem {
  id: string;
  categoryKey: 'Infrastructure' | 'Healthcare' | 'Youth' | 'Environment' | 'Meetings';
  titleEn: string;
  titleSi: string;
  titleTa: string;
  locationEn: string;
  locationSi: string;
  locationTa: string;
  dateEn: string;
  dateSi: string;
  dateTa: string;
  gradient: string;
  border: string;
  captionEn: string;
  captionSi: string;
  captionTa: string;
  impactEn: string;
  impactSi: string;
  impactTa: string;
  councillorNoteEn: string;
  councillorNoteSi: string;
  councillorNoteTa: string;
  photoUrl?: string;
}

export const civicGalleryItems: GalleryItem[] = [
  {
    id: 'g1',
    categoryKey: 'Meetings',
    titleEn: 'Councillor Sarooj Sattar Direct Citizen Hearing in Ward 05',
    titleSi: 'මන්ත්‍රී සරූජ් සත්තාර්ගේ කොට්ඨාශ 05 සෘජු මහජන හමුව',
    titleTa: 'வட்டாரம் 05 இல் உறுப்பினர் சரூஜ் சத்தாரின் நேரடி மக்கள் சந்திப்பு',
    locationEn: 'Periyamulla Community Secretariat, St. Lazarus Road',
    locationSi: 'පෙරියමුල්ල ප්‍රජා ලේකම් කාර්යාලය, ශාන්ත ලාසරස් පාර',
    locationTa: 'பெரியமுல்லை சமூக செயலகம், புனித லாசரஸ் வீதி',
    dateEn: 'August 2024',
    dateSi: '2024 අගෝස්තු',
    dateTa: 'ஆகஸ்ட் 2024',
    gradient: 'from-emerald-700 via-teal-800 to-[#134234]',
    border: 'border-emerald-300',
    captionEn: 'Councillor Sarooj Sattar listening to neighborhood elders and residents regarding drainage challenges and pension paperwork.',
    captionSi: 'කානු පද්ධති හා විශ්‍රාම වැටුප් ලිපි ලේඛන පිළිබඳව වැඩිහිටියන්ගේ ගැටලුවලට සවන් දීම.',
    captionTa: 'வடிகால் பிரச்சனை மற்றும் ஓய்வூதிய ஆவணங்கள் தொடர்பாக பெரியோர்களிடம் குறைகளைக் கேட்டறிதல்.',
    impactEn: 'Resolved 18 on-the-spot civic grievances and expedited municipal welfare cards.',
    impactSi: 'ක්ෂණික පැමිණිලි 18ක් විසඳා සුභසාධන කාඩ්පත් කඩිනම් කිරීම.',
    impactTa: '18 உடனடி குறைகளுக்கு தீர்வு காணப்பட்டு நலன்புரி அட்டைகள் வழங்கப்பட்டன.',
    councillorNoteEn: 'Every resident’s voice must reach the council chambers without obstacle.',
    councillorNoteSi: 'සෑම පුරවැසියෙකුගේම හඬ නගර සභාවට කිසිදු බාධාවකින් තොරව ළඟා විය යුතුය.',
    councillorNoteTa: 'ஒவ்வொரு குடிமகனின் குரலும் தடையின்றி மாநகர சபையை அடைய வேண்டும்.',
  },
  {
    id: 'g2',
    categoryKey: 'Infrastructure',
    titleEn: 'St. Lazarus Road Asphalt Carpeting & Curb Construction',
    titleSi: 'ශාන්ත ලාසරස් පාරේ තාර ඇතිරීම සහ කානු ඉදිකිරීම්',
    titleTa: 'புனித லாசரஸ் வீதி தார் இடுதல் மற்றும் வடிகால் புனரமைப்பு',
    locationEn: 'St. Lazarus Road, Periyamulla Ward 5',
    locationSi: 'ශාන්ත ලාසරස් පාර, පෙරියමුල්ල කොට්ඨාශය 5',
    locationTa: 'புனித லாசரஸ் வீதி, பெரியமுல்லை வட்டாரம் 5',
    dateEn: 'July 2024',
    dateSi: '2024 ජූලි',
    dateTa: 'ஜூலை 2024',
    gradient: 'from-amber-600 via-orange-700 to-amber-900',
    border: 'border-amber-300',
    captionEn: 'Heavy road-paving machinery executing sub-base asphalt carpeting to eliminate deep monsoon ruts.',
    captionSi: 'වැසි කාලයේ මාර්ග අබලන් වීම වැළැක්වීමට උසස් තත්ත්වයේ තාර ඇතිරීම.',
    captionTa: 'மழைக்கால பள்ளங்களை அகற்றி தரமான தார் இடும் பணிகள் முன்னெடுப்பு.',
    impactEn: 'Smooth, durable transit for 4,200+ households, three-wheelers, and school transport vans.',
    impactSi: 'පවුල් 4,200කට අධික පිරිසකට සහ පාසල් ප්‍රවාහන සේවා සඳහා පහසු ගමනාගමනය.',
    impactTa: '4,200க்கும் மேற்பட்ட குடும்பங்கள் மற்றும் முச்சக்கர வண்டிகளுக்கு பாதுகாப்பான போக்குவரத்து.',
    councillorNoteEn: 'High engineering standards and proper side-curbing ensure this road lasts for decades.',
    councillorNoteSi: 'උසස් ප්‍රමිතියෙන් යුතු ඉදිකිරීම් මගින් මෙම මාර්ගය දිගුකල් පවතිනු ඇත.',
    councillorNoteTa: 'உயர்தர பொறியியல் வடிவமைப்பு இந்த வீதியை நீண்ட காலம் பாதுகாக்கும்.',
  },
  {
    id: 'g3',
    categoryKey: 'Healthcare',
    titleEn: 'Free Vision & Cataract Screening Health Camp',
    titleSi: 'නොමිලේ අක්ෂි සායනය සහ ඇස් කණ්ණාඩි බෙදාදීම',
    titleTa: 'இலவச கண் பரிசோதனை மற்றும் மூக்குக்கண்ணாடி வழங்கும் முகாம்',
    locationEn: 'Ward 05 Health Center, Periyamulla',
    locationSi: 'කොට්ඨාශ 05 සෞඛ්‍ය මධ්‍යස්ථානය, පෙරියමුල්ල',
    locationTa: 'வட்டாரம் 05 சுகாதார நிலையம், பெரியமுல்லை',
    dateEn: 'June 2024',
    dateSi: '2024 ජූනි',
    dateTa: 'ஜூன் 2024',
    gradient: 'from-blue-600 via-indigo-700 to-blue-900',
    border: 'border-blue-300',
    captionEn: 'Certified ophthalmologists and municipal medical officers providing free eye tests and prescription spectacles.',
    captionSi: 'සුදුසුකම්ලත් වෛද්‍යවරුන් මගින් නොමිලේ ඇස් පරීක්ෂාව සහ කණ්ණාඩි බෙදාදීම.',
    captionTa: 'சிறப்பு கண் மருத்துவர்கள் மூலம் இலவச பரிசோதனை மற்றும் மூக்குக்கண்ணாடிகள் வழங்கப்பட்டன.',
    impactEn: '320+ seniors examined, 185 custom reading glasses distributed at zero cost.',
    impactSi: 'වැඩිහිටියන් 320ක් පරීක්ෂා කර නොමිලේ කණ්ණාඩි 185ක් ලබාදෙන ලදී.',
    impactTa: '320 முதியவர்கள் பரிசோதிக்கப்பட்டு 185 கண்ணாடிகள் இலவசமாக வழங்கப்பட்டன.',
    councillorNoteEn: 'Healthcare is a fundamental human dignity that we must bring directly to our doorsteps.',
    councillorNoteSi: 'සෞඛ්‍ය සම්පන්න ජීවිතයක් ගත කිරීම සෑම පුරවැසියෙකුගේම මූලික අයිතිවාසිකමකි.',
    councillorNoteTa: 'சுகாதாரம் என்பது மக்களின் அடிப்படை உரிமை, அதை வீட்டு வாசலுக்கு கொண்டு சேர்க்க வேண்டும்.',
  },
  {
    id: 'g4',
    categoryKey: 'Infrastructure',
    titleEn: 'Solar LED Streetlight Network Installation',
    titleSi: 'සූර්ය බලශක්ති වීදි ලාම්පු පද්ධති සවි කිරීම',
    titleTa: 'சூரிய சக்தி தெருவிளக்குகள் அமைக்கும் பணி',
    locationEn: 'Periyamulla Commercial Stretch & Canal Bridge',
    locationSi: 'පෙරියමුල්ල ප්‍රධාන මාර්ගය සහ ඇල පාලම',
    locationTa: 'பெரியமுல்லை வர்த்தக வீதி மற்றும் கால்வாய் பாலம்',
    dateEn: 'May 2024',
    dateSi: '2024 මැයි',
    dateTa: 'மே 2024',
    gradient: 'from-amber-500 via-yellow-600 to-orange-700',
    border: 'border-amber-300',
    captionEn: 'Municipal technical crew mounting 90W high-lumen solar LED luminaires on concrete utility posts.',
    captionSi: 'රාත්‍රී කාලයේ ආරක්ෂාව තහවුරු කරමින් සූර්ය බලශක්ති වීදි ලාම්පු සවි කිරීම.',
    captionTa: 'இரவு நேர பாதுகாப்பை உறுதி செய்யும் 90W சூரிய ஒளி தெருவிளக்குகள் நிறுவல்.',
    impactEn: 'Zero electricity cost for council; 100% nighttime visibility for women and evening commuters.',
    impactSi: 'නගර සභාවට විදුලි බිලක් නොමැති අතර කාන්තාවන්ගේ රාත්‍රී ආරක්ෂාව තහවුරු විය.',
    impactTa: 'மாநகர சபைக்கு மின்சார செலவின்றி பெண்கள் மற்றும் பொதுமக்களுக்கு இரவு நேர பாதுகாப்பு.',
    councillorNoteEn: 'Well-lit streets build safe, vibrant, crime-free neighborhoods.',
    councillorNoteSi: 'ආලෝකමත් වීදි මගින් අපරාධවලින් තොර සුරක්ෂිත ප්‍රදේශයක් ගොඩනැගේ.',
    councillorNoteTa: 'ஒளிரும் வீதிகள் பாதுகாப்பான மற்றும் குற்றமற்ற சூழலை உருவாக்கும்.',
  },
  {
    id: 'g5',
    categoryKey: 'Environment',
    titleEn: 'Dutch Canal Desilting & Stormwater Clearance',
    titleSi: 'ලන්දේසි ඇල සුද්ධ පවිත්‍ර කිරීම හා ජල ගැලීම් පාලනය',
    titleTa: 'ஒல்லாந்தர் கால்வாய் தூர்வாருதல் மற்றும் வெள்ளத்தடுப்பு',
    locationEn: 'Hamilton Canal & Periyamulla Outlet',
    locationSi: 'හැමිල්ටන් ඇල සහ පෙරියමුල්ල බැස්ම',
    locationTa: 'ஹமில்டன் கால்வாய் மற்றும் பெரியமுல்லை வழித்தடம்',
    dateEn: 'April 2024',
    dateSi: '2024 අප්‍රේල්',
    dateTa: 'ஏப்ரல் 2024',
    gradient: 'from-teal-600 via-cyan-700 to-teal-900',
    border: 'border-teal-300',
    captionEn: 'Excavator and municipal gully units clearing silt and water hyacinth before the southwestern monsoon.',
    captionSi: 'මෝසම් වැසි කාලයට පෙර ඇල මාර්ගවල රොන්මඩ හා ජපන් ජබර ඉවත් කිරීම.',
    captionTa: 'பருவமழைக்கு முன்னதாக கால்வாய்களை தூர்வாரி ஆகாயத்தாமரைகளை அகற்றுதல்.',
    impactEn: 'Prevented flash-flooding across 6 adjoining residential lanes in low-lying zones.',
    impactSi: 'පහත් බිම් ප්‍රදේශවල මාර්ග 6ක ජල ගැලීම් සම්පූර්ණයෙන්ම පාලනය විය.',
    impactTa: 'தாழ்வான பகுதிகளில் உள்ள 6 குடியிருப்பு வீதிகளில் திடீர் வெள்ளம் தடுக்கப்பட்டது.',
    councillorNoteEn: 'Proactive canal maintenance saves our families from devastating water damage.',
    councillorNoteSi: 'කල්තියා පිරිසිදු කිරීම මගින් ජනතාවගේ දේපළ ආරක්ෂා කරගත හැක.',
    councillorNoteTa: 'முன்கூட்டியே வடிகால்களை சீரமைப்பது குடும்பங்களின் உடைமைகளை வெள்ளத்திலிருந்து பாதுகாக்கும்.',
  },
  {
    id: 'g6',
    categoryKey: 'Youth',
    titleEn: 'Youth Sports & Athletics Equipment Distribution',
    titleSi: 'යෞවන ක්‍රීඩා උපකරණ බෙදාදීමේ වැඩසටහන',
    titleTa: 'இளைஞர் விளையாட்டு உபகரணங்கள் வழங்கும் திட்டம்',
    locationEn: 'Negombo Municipal Community Playground',
    locationSi: 'මීගමුව නාගරික ප්‍රජා ක්‍රීඩාංගණය',
    locationTa: 'நீர்கொழும்பு மாநகர சபை விளையாட்டு மைதானம்',
    dateEn: 'March 2024',
    dateSi: '2024 මාර්තු',
    dateTa: 'மார்ச் 2024',
    gradient: 'from-purple-600 via-violet-700 to-purple-900',
    border: 'border-purple-300',
    captionEn: 'Handing over cricket kits, footballs, and track gear to Periyamulla youth sports clubs.',
    captionSi: 'පෙරියමුල්ල තරුණ ක්‍රීඩා සමාජ වෙත ක්‍රිකට් සහ පාපන්දු උපකරණ පරිත්‍යාග කිරීම.',
    captionTa: 'பெரியமுல்லை இளைஞர் விளையாட்டு கழகங்களுக்கு கிரிக்கெட் மற்றும் உதைபந்தாட்ட உபகரணங்கள் வழங்கல்.',
    impactEn: 'Empowering 120+ local youth with healthy recreational activities and tournament support.',
    impactSi: 'ප්‍රදේශයේ තරුණයින් 120කට අධික පිරිසකට ක්‍රීඩා සඳහා පහසුකම් සලසා දීම.',
    impactTa: '120க்கும் மேற்பட்ட இளைஞர்களுக்கு ஆரோக்கியமான விளையாட்டு வழிகாட்டல்.',
    councillorNoteEn: 'Our youth are the heartbeat of Negombo. We must invest in their talents.',
    councillorNoteSi: 'අපගේ තරුණ පරපුර මීගමුවේ හදවතයි. ඔවුන්ගේ දක්ෂතාවලට අප අතහිත දිය යුතුය.',
    councillorNoteTa: 'இளைஞர்களே நீர்கொழும்பின் உயிர்நாடி. அவர்களின் திறமைகளை நாம் வளர்த்தெடுக்க வேண்டும்.',
  },
];

const categoryIcons = {
  Meetings: Users,
  Infrastructure: Construction,
  Healthcare: HeartPulse,
  Environment: Waves,
  Youth: Trophy,
};

interface CivicGalleryProps {
  onOpenSubmitModal: () => void;
  onOpenContactModal: () => void;
  language: Language;
  customGalleryItems?: CustomGalleryItem[];
}

export const CivicGallery: React.FC<CivicGalleryProps> = ({
  onOpenSubmitModal,
  onOpenContactModal,
  language,
  customGalleryItems = [],
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryItem | null>(null);

  const t = translations[language];

  const categories = [
    { key: 'All', label: language === 'si' ? 'සියල්ල' : language === 'ta' ? 'அனைத்தும்' : 'All Milestones' },
    { key: 'Meetings', label: language === 'si' ? 'මහජන හමු' : language === 'ta' ? 'மக்கள் சந்திப்பு' : 'Citizen Hearings' },
    { key: 'Infrastructure', label: language === 'si' ? 'යටිතල පහසුකම්' : language === 'ta' ? 'கட்டமைப்பு' : 'Infrastructure' },
    { key: 'Healthcare', label: language === 'si' ? 'සෞඛ්‍ය සේවා' : language === 'ta' ? 'சுகாதாரம்' : 'Healthcare' },
    { key: 'Environment', label: language === 'si' ? 'පරිසරය' : language === 'ta' ? 'சுற்றாடல்' : 'Environment' },
    { key: 'Youth', label: language === 'si' ? 'තරුණ ක්‍රීඩා' : language === 'ta' ? 'இளைஞர்' : 'Youth & Sports' },
  ];

  // Merge custom admin-uploaded photos at top of gallery
  const mergedItems: GalleryItem[] = [
    ...customGalleryItems.map((ci) => ({
      id: ci.id,
      categoryKey: (ci.category === 'Community' ? 'Meetings' : ci.category) as any,
      titleEn: ci.title,
      titleSi: ci.titleSi || ci.title,
      titleTa: ci.titleTa || ci.title,
      locationEn: ci.location,
      locationSi: ci.locationSi || ci.location,
      locationTa: ci.locationTa || ci.location,
      dateEn: ci.date,
      dateSi: ci.date,
      dateTa: ci.date,
      gradient: 'from-amber-700 via-stone-800 to-emerald-950',
      border: 'border-amber-400',
      captionEn: ci.caption,
      captionSi: ci.captionSi || ci.caption,
      captionTa: ci.captionTa || ci.caption,
      impactEn: ci.impact || 'Community ground action directly verified by Councillor Sarooj Sattar.',
      impactSi: ci.impact || 'මන්ත්‍රී සරූජ් සත්තාර් විසින් තහවුරු කරන ලද මහජන ක්‍රියාමාර්ගයකි.',
      impactTa: ci.impact || 'உறுப்பினர் சரூஜ் சத்தாரால் நேரடியாக உறுதிப்படுத்தப்பட்ட கள நடவடிக்கை.',
      councillorNoteEn: ci.councillorNote || 'Direct accountability on the ground for our Negombo citizens.',
      councillorNoteSi: 'අපගේ මීගමුව ජනතාව වෙනුවෙන් සෘජු වගවීම.',
      councillorNoteTa: 'எங்கள் நீர்கொழும்பு மக்களுக்கான நேரடிப் பொறுப்புக்கூறல்.',
      photoUrl: ci.photoUrl,
    })),
    ...civicGalleryItems,
  ];

  const filteredItems = activeCategory === 'All'
    ? mergedItems
    : mergedItems.filter((i) => i.categoryKey === activeCategory);

  const getTitle = (item: GalleryItem) => {
    if (language === 'si') return item.titleSi;
    if (language === 'ta') return item.titleTa;
    return item.titleEn;
  };

  const getLocation = (item: GalleryItem) => {
    if (language === 'si') return item.locationSi;
    if (language === 'ta') return item.locationTa;
    return item.locationEn;
  };

  const getDate = (item: GalleryItem) => {
    if (language === 'si') return item.dateSi;
    if (language === 'ta') return item.dateTa;
    return item.dateEn;
  };

  const getCaption = (item: GalleryItem) => {
    if (language === 'si') return item.captionSi;
    if (language === 'ta') return item.captionTa;
    return item.captionEn;
  };

  const getImpact = (item: GalleryItem) => {
    if (language === 'si') return item.impactSi;
    if (language === 'ta') return item.impactTa;
    return item.impactEn;
  };

  const getCouncillorNote = (item: GalleryItem) => {
    if (language === 'si') return item.councillorNoteSi;
    if (language === 'ta') return item.councillorNoteTa;
    return item.councillorNoteEn;
  };

  return (
    <section className="py-14 sm:py-18 bg-white border-t-2 border-amber-200 relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 space-y-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 border-2 border-amber-300 text-xs font-black text-amber-950 uppercase tracking-wider shadow-2xs">
            <Award className="w-3.5 h-3.5 text-amber-700" />
            <span>{t.civicGalleryBadge}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-[#134234] tracking-tight">
            {t.civicGalleryTitle}
          </h2>
          <p className="text-sm sm:text-base text-stone-700 font-semibold leading-relaxed">
            {t.civicGallerySubtitle}
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex items-center justify-start md:justify-center gap-2 overflow-x-auto pb-2 px-2 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`px-4 py-1.5 rounded-full text-xs font-black transition-all whitespace-nowrap cursor-pointer ${
                activeCategory === cat.key
                  ? 'bg-gradient-to-r from-[#1B4D3E] to-emerald-900 text-amber-300 shadow-md border border-emerald-700'
                  : 'bg-stone-100 text-stone-700 hover:bg-amber-100 hover:text-stone-950 border border-stone-300'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Visual Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => {
            const title = getTitle(item);
            const location = getLocation(item);
            const date = getDate(item);
            const caption = getCaption(item);
            const impact = getImpact(item);
            const CategoryIcon = categoryIcons[item.categoryKey] || Award;

            return (
              <div
                key={item.id}
                onClick={() => setSelectedPhoto(item)}
                className={`group rounded-3xl bg-white border-2 ${item.border} shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col justify-between cursor-pointer transform hover:-translate-y-1.5`}
              >
                {/* Visual Header Banner with Vector Civic Gradient or Admin Photo */}
                <div className={`h-52 w-full relative overflow-hidden text-white bg-gradient-to-br ${item.gradient} p-5 flex flex-col justify-between`}>
                  {item.photoUrl && (
                    <img
                      src={item.photoUrl}
                      alt={title}
                      referrerPolicy="no-referrer"
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 z-0"
                    />
                  )}
                  {item.photoUrl && (
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-black/30 z-0" />
                  )}

                  {/* Decorative Elements */}
                  <div className="absolute -right-8 -bottom-8 w-32 h-32 rounded-full bg-white/10 blur-xl pointer-events-none" />
                  
                  <div className="flex items-center justify-between relative z-10">
                    <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-md border border-amber-400/50 text-amber-300 shadow-sm">
                      {date}
                    </span>
                    <div className="w-10 h-10 rounded-2xl bg-black/40 backdrop-blur-md flex items-center justify-center text-amber-300 shadow-sm border border-white/20">
                      <CategoryIcon className="w-5 h-5" />
                    </div>
                  </div>

                  <div className="space-y-1.5 relative z-10">
                    <h3 className="font-heading font-black text-white text-lg sm:text-xl leading-snug drop-shadow-md group-hover:text-amber-200 transition-colors">
                      {title}
                    </h3>
                    <div className="flex items-center gap-1.5 text-emerald-100 text-xs font-semibold drop-shadow-md">
                      <MapPin className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                      <span className="truncate">{location}</span>
                    </div>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                  <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-medium">
                    {caption}
                  </p>

                  <div className="pt-3 border-t border-stone-200 space-y-2">
                    <div className="flex items-start gap-2 text-xs font-bold text-[#134234] bg-emerald-50 p-2.5 rounded-xl border border-emerald-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                      <span>{impact}</span>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedPhoto(item);
                      }}
                      className="w-full mt-1 py-2 px-3 rounded-xl bg-stone-100 group-hover:bg-amber-400 text-stone-800 group-hover:text-stone-950 font-black text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>View Field Report</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Citizen Report Prompt Card */}
        <div className="p-4 sm:p-8 rounded-3xl bg-gradient-to-r from-emerald-950 via-teal-950 to-emerald-900 text-white border-2 border-amber-400 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6">
          <div className="space-y-1.5 sm:space-y-2 text-center md:text-left">
            <h3 className="font-heading font-black text-xl sm:text-3xl text-amber-300 tracking-tight">
              {t.gallerySubmitPromptTitle}
            </h3>
            <p className="text-xs sm:text-sm text-emerald-100 max-w-xl font-medium leading-relaxed">
              {t.gallerySubmitPromptDesc}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 shrink-0 w-full sm:w-auto">
            <button
              onClick={onOpenSubmitModal}
              className="w-full sm:w-auto px-5 sm:px-6 py-3 sm:py-3.5 rounded-full bg-gradient-to-r from-[#FFC72C] via-amber-500 to-orange-600 text-stone-950 font-black text-xs sm:text-sm shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-0.5 cursor-pointer border border-amber-300 text-center"
            >
              {t.gallerySubmitActionBtn}
            </button>
            <button
              onClick={onOpenContactModal}
              className="w-full sm:w-auto px-4 sm:px-5 py-3 sm:py-3.5 rounded-full bg-emerald-900/80 hover:bg-emerald-900 text-emerald-200 hover:text-white font-bold text-xs sm:text-sm border border-emerald-600 transition-colors cursor-pointer text-center"
            >
              {t.openWhatsApp}
            </button>
          </div>
        </div>

      </div>

      {/* DETAIL MODAL FOR SELECTED CIVIC WORK */}
      {selectedPhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 bg-stone-950/80 backdrop-blur-sm animate-in fade-in duration-200 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border-2 border-amber-400 animate-in zoom-in-95 duration-200 my-auto max-h-[94dvh] flex flex-col">
            
            {/* Modal Header Banner with Vector Civic Gradient or Admin Photo */}
            <div className={`h-48 sm:h-56 w-full relative shrink-0 overflow-hidden text-white bg-gradient-to-br ${selectedPhoto.gradient} p-4 sm:p-6 flex flex-col justify-between`}>
              {selectedPhoto.photoUrl && (
                <img
                  src={selectedPhoto.photoUrl}
                  alt={getTitle(selectedPhoto)}
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full object-cover z-0"
                />
              )}
              {selectedPhoto.photoUrl && (
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/50 to-black/40 z-0" />
              )}

              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/60 text-white hover:bg-black/80 flex items-center justify-center transition-colors z-20 border border-white/30 cursor-pointer backdrop-blur-xs"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2 relative z-10">
                <span className="text-[10px] font-black uppercase tracking-wider px-2.5 sm:px-3 py-1 rounded-full bg-black/60 backdrop-blur-xs text-amber-300 inline-block border border-amber-400/50 shadow-sm">
                  {getDate(selectedPhoto)} • {getLocation(selectedPhoto)}
                </span>
              </div>

              <div className="relative z-10 space-y-1">
                <h3 className="font-heading font-black text-lg sm:text-2xl text-white leading-tight drop-shadow-md">
                  {getTitle(selectedPhoto)}
                </h3>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-4 sm:p-6 space-y-3 sm:space-y-4 overflow-y-auto flex-1">
              <div className="space-y-1">
                <span className="text-xs font-black text-stone-500 uppercase tracking-wider">
                  {t.serviceDashboardTitle}
                </span>
                <p className="text-xs sm:text-sm text-stone-800 leading-relaxed font-medium">
                  {getCaption(selectedPhoto)}
                </p>
              </div>

              <div className="p-3 sm:p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-1">
                <span className="text-xs font-black text-emerald-950 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>{t.galleryImpactLabel}</span>
                </span>
                <p className="text-xs text-emerald-900 font-semibold">
                  {getImpact(selectedPhoto)}
                </p>
              </div>

              <div className="p-3 sm:p-3.5 rounded-2xl bg-amber-50 border border-amber-200 space-y-1">
                <span className="text-xs font-black text-amber-950 flex items-center gap-1.5">
                  <HeartHandshake className="w-4 h-4 text-amber-700" />
                  <span>{t.galleryCouncillorNoteLabel}</span>
                </span>
                <p className="text-xs text-stone-800 italic font-medium">
                  &ldquo;{getCouncillorNote(selectedPhoto)}&rdquo;
                </p>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  onClick={() => setSelectedPhoto(null)}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-stone-900 text-white text-xs font-black hover:bg-stone-800 transition-colors cursor-pointer"
                >
                  {t.formCloseBtn}
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
