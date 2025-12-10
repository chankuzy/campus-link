import React from 'react';
import ResourceLibrary from './ResourceLibrary';

export default function PastQuestionsPage() {
    return (
        <ResourceLibrary 
            filterFn={(res) => res.isPastQuestion} 
            title="PAST QUESTIONS | LIBRARY"
        />
    );
}