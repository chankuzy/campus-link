import React from 'react';
import { Download } from 'lucide-react';
import { showMessage } from '../../utils/helpers';

export default function ResourceCard({ resource, actionText = "VIEW" }) {
    const handleAction = () => {
        const message = `Resource: ${resource.title}\nType: ${resource.type}\nUploaded by: ${resource.uploaderUsername}\n\n[SIMULATING DOWNLOAD]`;
        showMessage(message);
    };

    return (
        <div className="bg-[#1f2937] p-3 sm:p-4 rounded-xl border border-gray-700/50 hover:border-cyan-600/70 transition duration-150 flex flex-col sm:flex-row items-start sm:items-center justify-between shadow-lg">
            <div className='font-sans overflow-hidden flex-grow mr-2 w-full'>
                <p className="text-xs text-cyan-400 font-light mb-1">{resource.courseCode} ({resource.uploaderDepartment})</p>
                <h4 className="font-semibold text-gray-50 truncate text-sm">{resource.title}</h4>
                <div className="flex text-xs text-gray-400 mt-1 gap-3 flex-wrap">
                    <span>Type: {resource.type}</span>
                    <span>| Uploader: {resource.uploaderUsername}</span>
                    <span className='hidden sm:inline'>| Date: {resource.uploadDate}</span>
                </div>
            </div>
            <button 
                onClick={handleAction}
                className="text-cyan-400 border border-cyan-600/50 px-3 py-1 mt-2 sm:mt-0 rounded-sm text-xs transition hover:bg-cyan-900/40 tracking-wider flex-shrink-0 w-full sm:w-auto"
            >
                <Download size={14} className="inline mr-1" /> {actionText}
            </button>
        </div>
    );
}