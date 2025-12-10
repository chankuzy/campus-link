// src/components/UploadForm.jsx (Updated for Mobile Responsiveness)
import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, FileText, Code, Layers, UploadCloud } from 'lucide-react';

// Options for the Category select input
const CATEGORIES = [
  'Lecture Note',
  'Past Question',
  'Slide'
];

// Helper component for dark mode inputs (Updated for smaller sizing)
const AuthInput = ({ Icon, ...props }) => (
    <div className="relative">
        <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cyan-400" size={18} /> {/* Reduced icon size */}
        <input
            type="text"
            // py-2 vs py-3 for smaller height, text-xs vs text-sm for smaller font
            className="w-full pl-10 pr-4 py-2 sm:py-3 border border-cyan-800/80 bg-gray-900 rounded-sm focus:ring-1 focus:ring-cyan-400 focus:border-cyan-400 placeholder-gray-500 text-gray-300 transition duration-150 font-mono text-xs sm:text-sm"
            required
            {...props}
        />
    </div>
);


export default function UploadForm({ onClose }) {
  const { uploadResource } = useApp();
  const [form, setForm] = useState({ 
    title: '', 
    courseCode: '', 
    type: CATEGORIES[0],
    file: null 
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setForm({...form, file: file, title: file ? file.name.split('.')[0] : ''});
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    uploadResource({
        title: form.title,
        courseCode: form.courseCode.toUpperCase(),
        type: form.type,
        fileSize: form.file ? (form.file.size / 1024 / 1024).toFixed(1) + " MB" : "1.2 MB" 
    }); 
    
    console.log(`// UPLOAD SUCCESS: ${form.title} injected into repository.`);
    alert("// UPLOAD SUCCESS: Resource injected into repository.");
    onClose();
  };
  
  const getIcon = (type) => {
    switch (type) {
      case 'Past Question': return Layers;
      case 'Slide': return Code;
      default: return FileText;
    }
  };
  const TypeIcon = getIcon(form.type);

  return (
    // Modal Overlay - p-4 is good, ensures space around modal
    <div className="fixed inset-0 bg-[#000000]/80 flex justify-center items-center p-4 z-50 font-mono">
      {/* Modal Content - reduced max-width and padding for mobile */}
      <div className="bg-[#1f2937] p-4 sm:p-6 rounded-sm w-full max-w-sm sm:max-w-lg border border-cyan-800/80 shadow-2xl">
        
        {/* Modal Header (Reduced text size) */}
        <div className="flex justify-between items-center border-b border-gray-700/50 pb-3 mb-4">
            <h2 className="text-lg sm:text-xl font-bold tracking-wider text-cyan-400">
                $ DATA_INJECTION_INTERFACE
            </h2>
            <button 
                type="button" 
                onClick={onClose} 
                className="text-gray-500 hover:text-red-500 transition"
                title="Close"
            >
                <X size={18} /> {/* Reduced icon size */}
            </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4"> {/* Reduced vertical spacing */}
          
          {/* File Input (Reduced padding and icon size) */}
          <div className="border border-dashed border-cyan-600/50 p-4 sm:p-6 rounded-sm text-center cursor-pointer hover:bg-cyan-900/10 transition duration-150">
            <label className="block cursor-pointer">
                <input 
                    type="file" 
                    className="hidden" 
                    required 
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx" 
                />
                <UploadCloud size={30} className="text-cyan-400 mx-auto mb-2" /> {/* Reduced icon size */}
                <p className="text-gray-400 text-xs sm:text-sm">
                    {form.file ? `FILE SELECTED: ${form.file.name}` : "DRAG & DROP or CLICK TO SELECT DOCUMENT"}
                </p>
                <p className='text-xs text-gray-600 mt-1'>Max Size 5MB (Simulated)</p>
            </label>
          </div>

          {/* Course Code Input (Uses responsive AuthInput) */}
          <AuthInput 
            value={form.courseCode}
            onChange={e => setForm({...form, courseCode: e.target.value})}
            placeholder="COURSE CODE (e.g., CSC201)" 
            Icon={Code}
            maxLength={6}
          />
          
          {/* Title Input (Uses responsive AuthInput) */}
          <AuthInput 
            value={form.title}
            onChange={e => setForm({...form, title: e.target.value})}
            placeholder="DOCUMENT TITLE (e.g., Week 1 Algorithms)" 
            Icon={FileText}
          />

          {/* Category Select (Reduced height and font size) */}
          <div className="relative">
            <TypeIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cyan-400" size={18} /> {/* Reduced icon size */}
            <select
              value={form.type}
              onChange={e => setForm({...form, type: e.target.value})}
              // py-2 vs py-3 for smaller height, text-xs vs text-sm for smaller font
              className="w-full pl-10 pr-4 py-2 sm:py-3 border border-cyan-800/80 bg-gray-900 rounded-sm text-gray-300 appearance-none focus:ring-1 focus:ring-cyan-400 focus:border-cyan-400 font-mono text-xs sm:text-sm"
            >
              {CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>{cat.toUpperCase()}</option>
              ))}
            </select>
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-500">
                &#9660;
            </div>
          </div>
          
          {/* Action Buttons (Padding and text size adjusted) */}
          <div className="flex justify-end gap-3 pt-2">
            <button 
                type="button" 
                onClick={onClose} 
                className="text-gray-500 border border-gray-700 hover:bg-gray-800 px-3 py-1.5 sm:px-4 sm:py-2 rounded-sm transition text-xs sm:text-sm tracking-wider"
            >
                CANCEL
            </button>
            <button 
                type="submit" 
                className="bg-cyan-500 text-gray-900 font-bold px-3 py-1.5 sm:px-4 sm:py-2 rounded-sm transition hover:bg-cyan-400 disabled:opacity-50 text-xs sm:text-sm tracking-wider"
                disabled={!form.file || !form.courseCode || !form.title}
            >
                INITIATE UPLOAD
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}