// src/pages/Dashboard.jsx (Updated for Mobile Responsiveness)

import React from 'react';
import { useApp } from '../context/AppContext';
import { Upload, Users, BookOpen, Clock } from 'lucide-react';

// A simple card component for personalized resource items (Terminal List Item Style)
const PersonalResourceCard = ({ resource }) => {
  return (
    // On mobile, reduce padding slightly and ensure flex behavior is space-between
    // The button shrinks slightly to fit.
    <div className="bg-[#1f2937] p-3 sm:p-4 rounded-sm border border-gray-700/50 hover:border-cyan-600/70 transition duration-150 flex items-center justify-between shadow-lg">
      <div className='font-mono overflow-hidden flex-grow mr-2'> {/* Added overflow-hidden */}
        {/* Course Code is primary on mobile to ensure it's visible */}
        <h4 className="font-semibold text-gray-50 truncate text-sm">{resource.courseCode} :: {resource.title}</h4>
        <p className="text-xs text-gray-400 mt-1 hidden sm:block">{resource.type} | Uploaded: {resource.uploadDate}</p>
        <p className="text-xs text-gray-400 mt-1 sm:hidden">{resource.type}</p>
      </div>
      <button 
        onClick={() => alert(`SIMULATING DOWNLOAD for: ${resource.title}`)}
        className="text-cyan-400 border border-cyan-600/50 px-2 py-1 rounded-sm text-xs transition hover:bg-cyan-900/40 tracking-wider flex-shrink-0"
      >
        VIEW
      </button>
    </div>
  );
};

// Reusable Stat Card Component (High-Contrast Data Block)
const StatCard = ({ Icon, title, value, colorClass, iconClass }) => (
    // Reduced padding on very small screens, ensure content doesn't wrap awkwardly
    <div className="p-4 sm:p-5 bg-[#1f2937] rounded-sm border border-gray-700/50 flex items-center shadow-lg">
        <div className={`p-2 sm:p-3 rounded-sm mr-2 sm:mr-4 ${iconClass} flex-shrink-0`}>
            <Icon size={20} className={colorClass} /> {/* Reduced icon size slightly on mobile */}
        </div>
        <div className='font-mono'>
            <p className="text-xs font-medium text-gray-500 uppercase truncate">{title}</p>
            <p className="text-xl sm:text-2xl font-bold text-gray-100">{value}</p>
        </div>
    </div>
);


export default function Dashboard() {
  const { user, resources } = useApp();

  const userUploads = resources.filter(res => res.uploaderId === user.id);
  const totalGroupsJoined = 2; 
  const totalResources = resources.length;

  return (
    <div className="pt-4 font-sans">
      <h2 className="text-2xl font-bold text-gray-100 mb-6 border-b border-gray-700/50 pb-2">
        <span className='text-cyan-400'>$</span> USER_DASHBOARD <span className="text-gray-400">| {user.username}</span>
      </h2>

      {/* --- Stats Section --- 
          CHANGE: grid-cols-2 for mobile, grid-cols-4 for medium screens and up. 
      */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <StatCard 
            Icon={Upload} 
            title="YOUR CONTRIBUTIONS" 
            value={userUploads.length} 
            colorClass="text-cyan-400"
            iconClass="bg-cyan-900/40"
        />
        <StatCard 
            Icon={BookOpen} 
            title="TOTAL SYSTEM LOAD" 
            value={totalResources} 
            colorClass="text-green-400"
            iconClass="bg-green-900/40"
        />
        <StatCard 
            Icon={Users} 
            title="GROUPS JOINED" 
            value={totalGroupsJoined} 
            colorClass="text-yellow-400"
            iconClass="bg-yellow-900/40"
        />
        <StatCard 
            Icon={Clock} 
            title="UPTIME STATUS" 
            value={"ACTIVE"} 
            colorClass="text-red-400"
            iconClass="bg-red-900/40"
        />
      </div>

      {/* --- Personal Uploads Section --- */}
      <div className="mt-8">
        <h3 className="text-lg font-bold border-b border-gray-700/50 pb-2 mb-4 flex items-center gap-2 text-gray-300">
            $ YOUR_UPLOAD_HISTORY
        </h3>
        
        {userUploads.length === 0 ? (
          <div className="text-center p-8 border-dashed border-2 border-gray-700/50 rounded-sm text-gray-500 font-mono">
            // NO RESOURCES FOUND. PLEASE INITIATE UPLOAD JOB.
          </div>
        ) : (
          /* CHANGE: grid-cols-1 for mobile, grid-cols-2 for medium screens and up */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4"> 
            {userUploads.map(res => (
              <PersonalResourceCard key={res.id} resource={res} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}