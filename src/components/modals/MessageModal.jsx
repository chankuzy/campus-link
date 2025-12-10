import React from 'react';

export default function MessageModal() {
    const closeModal = () => {
        document.getElementById('message-modal').classList.add('hidden');
    };

    return (
        <div id="message-modal" className="fixed inset-0 bg-black bg-opacity-70 hidden items-center justify-center z-50 p-4">
            <div className="bg-[#1f2937] p-6 rounded-xl border border-yellow-800/80 w-full max-w-sm shadow-2xl">
                <h3 className="text-lg font-bold text-yellow-400 mb-3 font-sans">MESSAGE</h3>
                <pre id="app-message-content" className="text-sm text-gray-300 whitespace-pre-wrap font-sans bg-gray-900 p-3 rounded-sm border border-gray-700"></pre>
                <button 
                    onClick={closeModal}
                    className="mt-4 w-full bg-yellow-500 text-gray-900 py-2 rounded-sm font-bold text-sm transition hover:bg-yellow-400"
                >
                    ACKNOWLEDGE
                </button>
            </div>
        </div>
    );
}