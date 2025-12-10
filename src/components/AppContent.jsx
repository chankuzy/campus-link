import React from 'react';
import { Clock } from 'lucide-react';
import { useApp } from '../context/AppContext';
import LandingAuthWrapper from '../pages/LandingAuthWrapper';
import AppLayout from '../layout/AppLayout';

export default function AppContent() {
    const { user, loading } = useApp();

    if (loading) {
        return (
            <div className="h-screen flex flex-col justify-center items-center text-xl text-gray-400 bg-[#111827] font-sans">
                <Clock size={32} className="animate-spin text-cyan-400 mb-4" />
                // INITIALIZING LOCAL DATA STORE...
                <p className='text-sm mt-2 text-gray-500'>Checking browser persistence...</p>
            </div>
        );
    }

    if (!user) {
        return <LandingAuthWrapper />;
    }

    return <AppLayout />;
}