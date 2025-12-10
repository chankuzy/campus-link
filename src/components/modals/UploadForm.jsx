import React, { useState } from 'react';
import { FileText, BookOpen, History } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import AuthInput from '../ui/AuthInput';

export default function UploadForm({ onClose }) {
    const { uploadResource, user } = useApp();
    const [title, setTitle] = useState('');
    const [courseCode, setCourseCode] = useState('');
    const [type, setType] = useState('Lecture Note');
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setUploading(true);
        setMessage('');

        if (!user) {
            setMessage("Error: User not authenticated.");
            setUploading(false);
            return;
        }

        try {
            uploadResource({
                title,
                courseCode: courseCode.toUpperCase(),
                type,
                fileSize: file ? `${(file.size / 1024).toFixed(1)} KB` : 'N/A' 
            });

            setMessage(`SUCCESS: Resource "${title}" uploaded.`);
            setTitle('');
            setCourseCode('');
            setFile(null);

            setTimeout(() => {
                onClose();
            }, 1500);

        } catch (error) {
            setMessage("Upload Failed: Check console for details.");
            console.error(error);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
            <div className="bg-[#1f2937] p-6 sm:p-8 rounded-xl shadow-2xl w-full max-w-lg border border-cyan-800/80">
                <h2 className="text-xl font-bold tracking-widest text-cyan-400 mb-4 font-sans">
                    RESOURCE UPLOAD JOB
                </h2>
                <p className="text-sm text-gray-500 mb-6 font-sans">
                    Uploader: {user.username} ({user.department})
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <AuthInput
                        Icon={FileText}
                        placeholder="Resource Title (e.g., Computer Arch. Chapter 3)"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                    <AuthInput
                        Icon={BookOpen}
                        placeholder="Course Code (e.g., CSC301)"
                        value={courseCode}
                        onChange={(e) => setCourseCode(e.target.value)}
                        required
                    />
                    <div className="relative">
                        <History className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={16} />
                        <select
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 sm:py-3 border border-gray-700 bg-gray-900 rounded-sm focus:ring-cyan-400 focus:border-cyan-400 text-gray-300 appearance-none font-sans text-xs sm:text-sm"
                        >
                            <option value="Lecture Note">Lecture Note</option>
                            <option value="Assignment">Assignment</option>
                            <option value="Past Question">Past Question</option>
                            <option value="Research Paper">Research Paper</option>
                        </select>
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-500">
                            &#9660;
                        </div>
                    </div>
                    
                    <div className="border border-dashed border-gray-600 p-4 rounded-sm text-center">
                        <input
                            type="file"
                            id="file-upload"
                            onChange={(e) => setFile(e.target.files[0])}
                            className="hidden"
                            required
                        />
                        <label htmlFor="file-upload" className="cursor-pointer text-cyan-400 hover:text-cyan-300 transition block">
                            {file ? `File Selected: ${file.name}` : "Click to select file (PDF, DOCX, etc.)"}
                        </label>
                        {file && <p className="text-xs text-gray-500 mt-1">Size: {(file.size / 1024).toFixed(1)} KB</p>}
                    </div>

                    {message && <p className={`text-center font-sans ${message.includes('SUCCESS') ? 'text-green-400' : 'text-red-400'}`}>{message}</p>}

                    <div className="flex space-x-4 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="w-1/2 border border-gray-600 text-gray-400 py-2 rounded-sm transition hover:bg-gray-700/50 font-sans"
                            disabled={uploading}
                        >
                            CANCEL
                        </button>
                        <button
                            type="submit"
                            className="w-1/2 bg-cyan-500 text-gray-900 font-bold py-2 rounded-sm transition hover:bg-cyan-400 font-sans disabled:opacity-50"
                            disabled={uploading || !file}
                        >
                            {uploading ? "UPLOADING..." : "UPLOAD"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}