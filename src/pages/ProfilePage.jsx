import React from 'react';
import { User, Upload, DollarSign } from 'lucide-react';
import { useApp } from '../context/AppContext';
import ResourceCard from '../components/ui/ResourceCard';
import { showMessage } from '../utils/helpers';

function ProfileDetail({ label, value, fullWidth = false, valueClass = 'text-gray-300' }) {
    return (
        <div className={`p-2 bg-gray-900/50 rounded-sm ${fullWidth ? 'sm:col-span-2' : ''}`}>
            <p className="text-xs text-gray-500 uppercase tracking-wider">{label}</p>
            <p className={`mt-1 truncate ${valueClass}`}>{value}</p>
        </div>
    );
}

export default function ProfilePage({ onNavigate }) {
    const { user, resources } = useApp();
    const userUploads = resources.filter(res => res.uploaderId === user.id);

    const handleUpgrade = () => {
        const message = `PREMIUM ACTIVATION: Please proceed to the payment gateway to upgrade your account! [SIMULATED]`;
        showMessage(message);
    };

    return (
        <div className="pt-4 font-sans grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-3">
                <h2 className="text-2xl font-bold text-gray-100 mb-6 border-b border-gray-700/50 pb-2">
                    USER PROFILE <span className="text-gray-400">| {user.username}</span>
                </h2>

                <div className="bg-[#1f2937] p-6 rounded-xl border border-cyan-800/80 shadow-xl mb-8">
                    <h3 className="text-lg font-bold text-cyan-400 mb-4 flex items-center gap-2">
                        <User size={18} /> ACCOUNT DETAILS
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm font-sans">
                        <ProfileDetail label="Username" value={user.username} />
                        <ProfileDetail label="Matric Number" value={user.matricNumber} />
                        <ProfileDetail label="Email" value={user.email} />
                        <ProfileDetail label="Department" value={user.department} />
                        <ProfileDetail label="User ID" value={user.id} fullWidth={true} />
                        <ProfileDetail 
                            label="Membership" 
                            value={user.isPremium ? "PREMIUM (Active)" : "STANDARD"} 
                            valueClass={user.isPremium ? "text-yellow-400 font-bold" : "text-gray-400"}
                        />
                    </div>
                </div>

                <div className="mt-8">
                    <h3 className="text-lg font-bold border-b border-gray-700/50 pb-2 mb-4 flex items-center gap-2 text-gray-300">
                        <Upload size={18} className='text-cyan-400'/> YOUR CONTRIBUTIONS ({userUploads.length})
                    </h3>
                    
                    {userUploads.length === 0 ? (
                        <div className="text-center p-8 border-dashed border-2 border-gray-700/50 rounded-sm text-gray-500 font-sans">
                            NO UPLOAD HISTORY FOUND.
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-4"> 
                            {userUploads.map(res => (
                                <ResourceCard key={res.id} resource={res} actionText="MANAGE" />
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <div className="lg:col-span-1 space-y-6">
                <div className="bg-gradient-to-br from-yellow-900/50 to-yellow-900/10 p-5 rounded-sm border border-yellow-700/50 shadow-xl">
                    <div className='flex items-center space-x-2 mb-2'>
                        <DollarSign size={20} className='text-yellow-400'/>
                        <h4 className="text-lg font-bold text-yellow-400 font-sans">PREMIUM ACCESS</h4>
                    </div>
                    <p className="text-xs text-gray-300 mb-3">
                        Unlock ad-free experience, priority downloads, and exclusive access to verified study materials.
                    </p>
                    <button 
                        className="w-full bg-yellow-500 text-gray-900 font-bold py-2 rounded-sm text-sm transition hover:bg-yellow-400"
                        onClick={handleUpgrade}
                    >
                        UPGRADE NOW
                    </button>
                </div>
                
                <div className="bg-[#1f2937] p-5 rounded-sm border border-gray-700/50">
                    <h4 className="text-lg font-bold text-gray-300 mb-3 border-b border-gray-700/50 pb-2 font-sans">
                        PLATFORM AD
                    </h4>
                    <p className="text-sm text-cyan-400 font-sans mb-2">
                        JOIN STUDY GROUP
                    </p>
                    <p className="text-xs text-gray-400">
                        Discuss CSC403 assignments in real-time. Collaborative learning is key to success. Find your group today!
                    </p>
                    <button 
                        className="w-full mt-4 bg-gray-700 text-gray-200 py-1 rounded-sm text-xs transition hover:bg-gray-600 font-sans"
                        onClick={() => onNavigate('dashboard')}
                    >
                        EXPLORE GROUPS
                    </button>
                </div>
            </div>
        </div>
    );
}