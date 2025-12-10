import React from 'react';
import { Upload } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Navigation({ onUpload }) {
    const { user, logout } = useApp();

    return (
        <nav className="bg-[#1f2937] border-b border-cyan-800/50 shadow-xl p-4 flex flex-col md:flex-row md:justify-between md:items-center sticky top-0 z-10">
            <div className="flex justify-between items-center w-full md:w-auto mb-3 md:mb-0">
                <h1 className="text-xl font-bold tracking-widest text-cyan-400">
                    CAMPUS-LINK
                </h1>
                <span className="text-xs text-gray-500 md:hidden tracking-wider border border-gray-700 px-2 py-1 rounded-sm">
                    {user.username}
                </span>
            </div>

            <div className="flex items-center space-x-2 md:space-x-4 w-full md:w-auto">
                <span className="text-sm text-gray-500 hidden md:inline tracking-wider mr-2">
                    {user.username} | {user.department}
                </span>
                
                <button 
                    onClick={onUpload} 
                    className="bg-cyan-500 text-gray-900 px-3 md:px-4 py-2 rounded-sm font-bold text-sm transition hover:bg-cyan-400 focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-[#111827] flex-grow md:flex-none"
                >
                    <Upload size={16} className='inline mr-1'/> UPLOAD
                </button>
                
                <button 
                    onClick={logout} 
                    className="text-red-500 border border-red-500 hover:bg-red-500 hover:text-white px-3 py-2 rounded-sm text-xs transition flex-grow md:flex-none"
                >
                    LOGOUT
                </button>
            </div>
        </nav>
    );
}