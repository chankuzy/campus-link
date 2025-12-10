import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import ResourceCard from '../components/ui/ResourceCard';

export default function ResourceLibrary({ filterFn, title }) {
    const { resources } = useApp();
    const filteredResources = filterFn ? resources.filter(filterFn) : resources;
    const [searchTerm, setSearchTerm] = useState('');

    const searchFiltered = filteredResources.filter(res => 
        res.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        res.courseCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
        res.uploaderDepartment.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="font-sans">
            <h2 className="text-xl font-bold mt-8 mb-4 border-b border-cyan-800/80 pb-2 text-cyan-400 tracking-wide">
                {title || "RESOURCE LIBRARY | FEED"}
            </h2>
            
            <input 
                type="text"
                placeholder="Search by title, course, or department..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-3 mb-6 border border-gray-700 bg-[#1f2937] rounded-sm focus:ring-cyan-400 focus:border-cyan-400 text-gray-300 font-sans text-sm"
            />

            {searchFiltered.length === 0 ? (
                <div className="text-center p-10 border-dashed border-2 border-gray-700/50 rounded-sm text-gray-500 font-sans">
                    NO RESOURCES FOUND MATCHING CRITERIA.
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {searchFiltered.map(res => (
                        <ResourceCard key={res.id} resource={res} />
                    ))}
                </div>
            )}
        </div>
    );
}