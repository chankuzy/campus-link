// src/components/ResourceLibrary.jsx (Updated for Mobile Responsiveness)
import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { FileText, Download, Code, Layers } from 'lucide-react';

export default function ResourceLibrary() {
  const { resources } = useApp();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("All");

  const filteredResources = resources.filter(res => {
    const matchesSearch = 
      res.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      res.courseCode.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "All" || res.type === filterType;
    return matchesSearch && matchesType;
  });

  return (
    // Adjust negative margin to prevent horizontal scrolling on mobile
    <div className="p-4 bg-[#111827] -mx-4 sm:-mx-6 rounded-sm">
      {/* --- Search and Filter Bar --- 
          CHANGE: flex-col for mobile, switches to md:flex-row on medium screens and up.
          Input/Select will stack vertically on mobile.
      */}
      <div className="flex flex-col md:flex-row gap-3 sm:gap-4 mb-6 p-4 bg-[#1f2937] rounded-sm border border-gray-700/50">
        <input 
          type="text" 
          placeholder="SEARCH | Filter by Course Code or Title..." 
          className="flex-1 border border-cyan-800/80 bg-gray-900 p-2 sm:p-3 rounded-sm text-gray-200 font-mono text-xs sm:text-sm placeholder-gray-500 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select 
          className="border border-cyan-800/80 bg-gray-900 p-2 sm:p-3 rounded-sm text-gray-200 font-mono text-xs sm:text-sm appearance-none focus:border-cyan-400 md:w-auto w-full" 
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="All">CATEGORY | ALL</option>
          <option value="Lecture Note">Lecture Notes</option>
          <option value="Past Question">Past Questions</option>
          <option value="Slide">Slides</option>
        </select>
      </div>

      {/* --- Resource Grid (File Card View) --- 
          CHANGE: grid-cols-1 for mobile, then scales up.
      */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredResources.map(res => (
          <div key={res.id} className="bg-[#1f2937] p-4 rounded-sm border border-gray-700/50 hover:border-cyan-500 transition shadow-lg">
            
            <div className="flex justify-between items-center border-b border-gray-700/50 pb-2 mb-3">
              <div className="flex items-center gap-2">
                <div className="bg-cyan-900/40 p-2 rounded-sm flex-shrink-0">
                  {res.type === 'Past Question' ? <Layers className="text-yellow-400" size={16} /> : <FileText className="text-cyan-400" size={16} />}
                </div>
                <div>
                  <h3 className="font-bold text-gray-100 font-mono tracking-wide text-sm">{res.courseCode}</h3>
                </div>
              </div>
              <span className="text-xs bg-gray-800 px-2 py-1 rounded text-gray-400 flex-shrink-0">{res.fileSize}</span>
            </div>
            
            <p className="mt-2 font-semibold text-gray-200 truncate text-sm">{res.title}</p>
            <p className="text-xs text-gray-500 mt-1">TYPE: {res.type}</p>
            <p className="text-xs text-gray-600 mt-0.5">UPLOADER: {res.uploaderName}</p>
            
            <button 
              onClick={() => {
                alert(`// INITIATING DOWNLOAD SEQUENCE FOR: ${res.title}`);
                window.open(res.dummyLink || '#', '_blank');
              }}
              className="mt-4 w-full flex items-center justify-center gap-2 border border-cyan-600 text-cyan-400 py-2 rounded-sm hover:bg-cyan-900/40 transition text-sm font-mono tracking-wider"
            >
              <Download size={16} /> DOWNLOAD_FILE
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}