import React from 'react';
import { Upload, BookOpen, History, Users, TrendingUp, User } from 'lucide-react';
import { useApp } from '../context/AppContext';
import StatCard from '../components/ui/StatCard';

export default function Dashboard({ onNavigate }) {
    const { user, resources } = useApp();

    const userUploads = resources.filter(res => res.uploaderId === user.id);
    const totalGroupsJoined = 2;
    const totalResources = resources.length;
    const pastQuestionsCount = resources.filter(res => res.isPastQuestion).length;

    return (
        <div className="pt-4 font-sans">
            <h2 className="text-2xl font-bold text-gray-100 mb-6 border-b border-gray-700/50 pb-2">
              USER DASHBOARD <span className="text-gray-400">| {user.username}</span>
            </h2>

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
                    title="TOTAL RESOURCES" 
                    value={totalResources} 
                    colorClass="text-green-400"
                    iconClass="bg-green-900/40"
                />
                <StatCard 
                    Icon={History} 
                    title="PAST QUESTIONS LOAD" 
                    value={pastQuestionsCount} 
                    colorClass="text-yellow-400"
                    iconClass="bg-yellow-900/40"
                />
                <StatCard 
                    Icon={Users} 
                    title="GROUPS JOINED" 
                    value={totalGroupsJoined} 
                    colorClass="text-red-400"
                    iconClass="bg-red-900/40"
                />
            </div>

            <div className="mt-8">
                <h3 className="text-lg font-bold border-b border-gray-700/50 pb-2 mb-4 flex items-center gap-2 text-gray-300">
                    <TrendingUp size={18} className='text-cyan-400'/>QUICK LINKS
                </h3>
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                    <button onClick={() => onNavigate('past-questions')} className="bg-[#1f2937] p-4 rounded-xl border border-gray-700/50 hover:border-cyan-400 transition text-center text-sm font-sans text-cyan-400 flex flex-col items-center">
                        <History size={24} className="mb-2" />
                        Access Past Questions
                    </button>
                    <button onClick={() => onNavigate('profile')} className="bg-[#1f2937] p-4 rounded-xl border border-gray-700/50 hover:border-cyan-400 transition text-center text-sm font-sans text-cyan-400 flex flex-col items-center">
                        <User size={24} className="mb-2" />
                        View Profile & Uploads
                    </button>
                    <button onClick={() => onNavigate('library')} className="bg-[#1f2937] p-4 rounded-xl border border-gray-700/50 hover:border-cyan-400 transition text-center text-sm font-sans text-cyan-400 flex flex-col items-center">
                        <BookOpen size={24} className="mb-2" />
                        Full Resource Feed
                    </button>
                </div>
            </div>
        </div>
    );
}