import React, { useState } from 'react';
import { History, BookOpen, FileText, User } from 'lucide-react';
import Navigation from './Navigation';
import MobileNav from './MobileNav';
import UploadForm from '../components/modals/UploadForm';
import MessageModal from '../components/modals/MessageModal';
import Dashboard from '../pages/Dashboard';
import ResourceLibrary from '../pages/ResourceLibrary';
import PastQuestionsPage from '../pages/PastQuestionsPage';
import ProfilePage from '../pages/ProfilePage';

export default function AppLayout() {
    const [isUploading, setIsUploading] = useState(false);
    const [currentPage, setCurrentPage] = useState('dashboard');

    const navItems = [
        { id: 'dashboard', label: 'Dashboard', icon: History },
        { id: 'library', label: 'Resources', icon: BookOpen },
        { id: 'past-questions', label: 'Past Q', icon: FileText },
        { id: 'profile', label: 'Profile', icon: User },
    ];

    const renderPage = () => {
        switch (currentPage) {
            case 'dashboard':
                return <Dashboard onNavigate={setCurrentPage} />;
            case 'library':
                return <ResourceLibrary />;
            case 'past-questions':
                return <PastQuestionsPage />;
            case 'profile':
                return <ProfilePage onNavigate={setCurrentPage} />;
            default:
                return <Dashboard onNavigate={setCurrentPage} />;
        }
    };

    return (
        <div className="min-h-screen bg-[#111827] text-gray-100 font-sans">
            <Navigation onUpload={() => setIsUploading(true)} />
            
            <MobileNav 
                navItems={navItems} 
                currentPage={currentPage} 
                onNavigate={setCurrentPage} 
            />

            <div className="max-w-7xl mx-auto p-4 sm:p-6 pb-20 md:pb-6">
                <div className="hidden md:flex space-x-2 border-b border-gray-700/50 mb-6">
                    {navItems.map(item => (
                        <button
                            key={item.id}
                            onClick={() => setCurrentPage(item.id)}
                            className={`px-4 py-2 font-bold transition text-sm ${
                                currentPage === item.id
                                    ? 'text-cyan-400 border-b-2 border-cyan-400'
                                    : 'text-gray-500 hover:text-gray-300'
                            }`}
                        >
                            {item.label.toUpperCase()}
                        </button>
                    ))}
                </div>

                {renderPage()}
            </div>

            {isUploading && <UploadForm onClose={() => setIsUploading(false)} />}
            <MessageModal />
        </div>
    );
}