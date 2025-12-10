import React from 'react';

export default function MobileNav({ navItems, currentPage, onNavigate }) {
    return (
        <div className="fixed bottom-0 left-0 right-0 bg-[#1f2937] border-t border-cyan-800/50 shadow-2xl z-20 flex justify-around p-2 md:hidden">
            {navItems.map(item => {
                const isActive = currentPage === item.id;
                const Icon = item.icon;
                return (
                    <button
                        key={item.id}
                        onClick={() => onNavigate(item.id)}
                        className={`flex flex-col items-center justify-center p-1 rounded-sm transition ${
                            isActive ? 'text-cyan-400' : 'text-gray-500 hover:text-gray-300'
                        }`}
                    >
                        <Icon size={20} />
                        <span className="text-xs mt-1">{item.label}</span>
                    </button>
                );
            })}
        </div>
    );
}