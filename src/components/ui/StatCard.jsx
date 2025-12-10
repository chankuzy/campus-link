import React from 'react';

export default function StatCard({ Icon, title, value, colorClass, iconClass }) {
    return (
        <div className="p-4 sm:p-5 bg-[#1f2937] rounded-xl border border-gray-700/50 flex items-center shadow-lg">
            <div className={`p-2 sm:p-3 rounded-xl mr-2 sm:mr-4 ${iconClass} flex-shrink-0`}>
                <Icon size={20} className={colorClass} />
            </div>
            <div className='font-sans'>
                <p className="text-xs font-medium text-gray-500 uppercase truncate">{title}</p>
                <p className="text-xl sm:text-2xl font-bold text-gray-100">{value}</p>
            </div>
        </div>
    );
}
