// src/pages/LandingAuthWrapper.jsx (Updated for Mobile Responsiveness)
import AuthModal from '../components/AuthModal';
import { BookOpen, Users, Upload, Code } from 'lucide-react';

export default function LandingAuthWrapper() {
  return (
    // P-4 is already responsive padding
    <div className="min-h-screen bg-[#111827] text-gray-100 flex flex-col justify-center items-center p-4 font-mono">
      
      {/* --- Header Section (Terminal Welcome) --- */}
      <header className="text-center mb-8 sm:mb-10 w-full max-w-xl">
        {/* Adjusted text size slightly for smaller screens */}
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-widest text-cyan-400 mb-2">
          CAMPUS-LINK <span className='text-red-500'>|</span> INIT
        </h1>
        {/* Reduced size and padding on mobile */}
        <p className="text-sm sm:text-lg text-gray-500 max-w-2xl mx-auto font-mono px-2">
          // ACADEMIC HUB ONLINE: CONNECTING KNOWLEDGE.
        </p>
      </header>
      
      {/* --- Feature Highlights (Data Blocks) --- 
          CHANGE: grid-cols-1 for mobile, grid-cols-3 for medium screens and up.
      */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto mb-8 sm:mb-10 w-full px-2 sm:px-0">
        <FeatureCard 
          Icon={BookOpen} 
          title="CATALOG ACCESS" 
          description="Instant read access to notes and past questions from all departments."
        />
        <FeatureCard 
          Icon={Users} 
          title="USER ENGAGEMENT" 
          description="Simulated groups and collaborative study environments."
        />
        <FeatureCard 
          Icon={Upload} 
          title="DATA INJECTION" 
          description="Contribute your verified materials to the central repository."
        />
      </div>

      {/* --- Authentication Modal --- */}
      {/* The AuthModal itself has a max-width and centering, making it responsive */}
      <AuthModal />
      
      <footer className="mt-8 text-xs text-gray-700 font-mono text-center">
        // SYSTEM_STATUS: MVP_VITE_V2.0 | LOCAL_STORAGE_PERSISTENCE
      </footer>
    </div>
  );
}

// Reusable Feature Card (HTB Block Style)
const FeatureCard = ({ Icon, title, description }) => (
    // Reduced padding and font size slightly on mobile (p-4)
    <div className="p-4 sm:p-5 bg-[#1f2937] rounded-sm border border-cyan-800/80 hover:border-cyan-500 transition duration-200 text-center shadow-xl">
        <div className="flex justify-center mb-2 sm:mb-3">
            <Icon size={24} className="text-green-400" /> {/* Reduced icon size */}
        </div>
        <h3 className="text-sm sm:text-base font-semibold text-gray-50 uppercase mb-2 tracking-wider">{title}</h3>
        <p className="text-xs sm:text-sm text-gray-400">{description}</p>
    </div>
);