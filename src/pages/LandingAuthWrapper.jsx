import React from 'react';
import AuthForm from '../components/auth/AuthForm';

export default function LandingAuthWrapper() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#111827] p-4">
            <AuthForm />
        </div>
    );
}