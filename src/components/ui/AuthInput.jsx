import React from 'react';

export default function AuthInput({ Icon, type = "text", ...props }) {
    return (
        <div className="relative">
            <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cyan-400" size={16} />
            <input
                type={type}
                className="w-full pl-10 pr-4 py-2 sm:py-3 border border-cyan-800/80 bg-gray-900 rounded-sm focus:ring-1 focus:ring-cyan-400 focus:border-cyan-400 placeholder-gray-500 text-gray-300 transition duration-150 font-sans text-xs sm:text-sm"
                required
                {...props}
            />
        </div>
    );
}