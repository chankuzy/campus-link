// src/App.jsx (Updated for Mobile Responsiveness)

import React, { useState } from 'react';
import { useApp } from './context/AppContext';
import ResourceLibrary from './components/ResourceLibrary';
import Dashboard from './pages/Dashboard';
import UploadForm from './components/UploadForm'; 
import LandingAuthWrapper from './pages/LandingAuthWrapper'; 

// The main authenticated application layout
const AppLayout = () => {
  const { user, logout } = useApp();
  const [isUploading, setIsUploading] = useState(false);

  return (
    <div className="min-h-screen bg-[#111827] text-gray-100 font-mono">
      {/* --- Top Navigation (HTB Style) --- 
        Mobile Changes (sm:hidden vs sm:block):
        - The container now uses flex-col on mobile and switches to flex-row on medium screens (md:flex-row).
        - Button group gets full width on mobile.
      */}
      <nav className="bg-[#1f2937] border-b border-cyan-800/50 shadow-xl p-4 flex flex-col md:flex-row md:justify-between md:items-center sticky top-0 z-10">
        
        {/* Logo and Title Section */}
        <div className="flex justify-between items-center w-full md:w-auto mb-3 md:mb-0">
            <h1 className="text-xl font-bold tracking-widest text-cyan-400">
                CAMPUS-LINK<span className="text-gray-600 text-xs ml-2 hidden sm:inline">[KASU-MVP]</span>
            </h1>
            {/* Show username on mobile right next to the brand */}
            <span className="text-xs text-gray-500 md:hidden tracking-wider border border-gray-700 px-2 py-1 rounded-sm">
                USER: {user.username}
            </span>
        </div>

        {/* Action Buttons Section */}
        <div className="flex justify-between items-center space-x-2 md:space-x-4 w-full md:w-auto">
          
          {/* User Info (Desktop only) */}
          <span className="text-sm text-gray-500 hidden md:inline tracking-wider">USER: {user.username}</span>
          
          {/* UPLOAD Button (High visibility, flex-grow on mobile) */}
          <button 
            onClick={() => setIsUploading(true)} 
            className="bg-cyan-500 text-gray-900 px-3 md:px-4 py-2 flex-grow md:flex-none rounded-sm font-bold text-sm transition hover:bg-cyan-400 focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-[#111827]"
          >
            UPLOAD [+]
          </button>
          
          {/* Logout Button (Low-key, flex-grow on mobile) */}
          <button 
            onClick={logout} 
            className="text-red-500 border border-red-500 hover:bg-red-500 hover:text-white px-3 py-2 flex-grow md:flex-none rounded-sm text-xs transition"
          >
            LOGOUT
          </button>
        </div>
      </nav>
      
      {/* --- Main Content Area (Padding remains responsive) --- */}
      <div className="max-w-7xl mx-auto p-4 sm:p-6">
        <Dashboard /> 
        <h2 className="text-xl font-bold mt-10 mb-4 border-b border-cyan-800/80 pb-2 text-cyan-400 tracking-wide">
            $ RESOURCE_LIBRARY | FEED
        </h2>
        <ResourceLibrary />
      </div>

      {/* --- Modals --- */}
      {isUploading && <UploadForm onClose={() => setIsUploading(false)} />}
    </div>
  );
};


export default function App() {
  const { user, loading } = useApp();

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center text-xl text-gray-400 bg-[#111827]">
        // CONNECTING TO ACADEMIC DATA STREAM...
      </div>
    );
  }

  // --- Authentication Gate ---
  if (!user) {
    return <LandingAuthWrapper />; 
  }

  return <AppLayout />;
}