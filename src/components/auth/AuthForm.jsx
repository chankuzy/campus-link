import React, { useState } from 'react';
import { User, Briefcase, Lock, LogIn, UserPlus, Mail } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import AuthInput from '../ui/AuthInput';

export default function AuthForm() {
    const { login, register } = useApp();
    const [isRegistering, setIsRegistering] = useState(false);
    const [identifier, setIdentifier] = useState('');
    const [email, setEmail] = useState('');
    const [matricNumber, setMatricNumber] = useState('');
    const [department, setDepartment] = useState('Computer Science');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (!isRegistering) {
            try {
                login(identifier.trim(), password);
            } catch (err) {
                setError(err.message || "Login failed. Check your identifier.");
            }
            return;
        }

        if (password.length < 6) {
            setError("Password must be at least 6 characters.");
            return;
        }
        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        try {
            register({
                username: identifier.trim(),
                email: email.trim(),
                matricNumber: matricNumber.trim(),
                department,
                password,
            });
        } catch (err) {
            setError(err.message || "Registration failed. Please try again.");
        }
    };

    const resetForm = () => {
        setIsRegistering(!isRegistering);
        setError('');
        setIdentifier('');
        setEmail('');
        setMatricNumber('');
        setPassword('');
        setConfirmPassword('');
    };

    const title = isRegistering ? "CREATE_PROFILE_SEQUENCE" : "AUTHENTICATION_REQUIRED";
    const ButtonIcon = isRegistering ? UserPlus : LogIn;

    return (
        <div className="relative bg-[#1f2937] p-5 sm:p-8 rounded-sm shadow-2xl w-full max-w-sm sm:max-w-md border border-cyan-800/80">
            <h2 className="text-lg sm:text-xl font-bold tracking-widest text-cyan-400 mb-2 font-sans">
                {title}
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mb-5 sm:mb-6 font-sans">
                {isRegistering ? "INPUT ALL REQUIRED CREDENTIALS." : "ENTER USERNAME, EMAIL, OR MATRIC TO ACCESS SESSION."}
            </p>

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                <AuthInput 
                    Icon={User} 
                    placeholder={isRegistering ? "USERNAME (e.g., csc-a101)" : "IDENTIFIER (Username, Email, or Matric)"} 
                    value={identifier} 
                    onChange={(e) => setIdentifier(e.target.value)}
                />

                {isRegistering && (
                    <>
                        <AuthInput 
                            Icon={Mail} 
                            type="email"
                            placeholder="EMAIL ADDRESS" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <AuthInput 
                            Icon={User} 
                            placeholder="MATRIC NUMBER" 
                            value={matricNumber} 
                            onChange={(e) => setMatricNumber(e.target.value)}
                        />

                        <div className="relative">
                            <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={16} />
                            <select
                                value={department}
                                onChange={(e) => setDepartment(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 sm:py-3 border border-gray-700 bg-gray-900 rounded-sm focus:ring-cyan-400 focus:border-cyan-400 text-gray-300 appearance-none font-sans text-xs sm:text-sm"
                            >
                                <option value="Computer Science">Computer Science</option>
                                <option value="Mass Communication">Mass Communication</option>
                                <option value="Public Administration">Public Administration</option>
                                <option value="Physics">Physics</option>
                            </select>
                            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-500">
                                &#9660;
                            </div>
                        </div>
                    </>
                )}

                <AuthInput 
                    Icon={Lock} 
                    type="password"
                    placeholder="PASSWORD" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)}
                />

                {isRegistering && (
                    <AuthInput 
                        Icon={Lock} 
                        type="password"
                        placeholder="CONFIRM PASSWORD" 
                        value={confirmPassword} 
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                )}
                
                {error && <p className="text-red-500 text-center text-xs font-sans">ERROR: {error}</p>}

                <button
                    type="submit"
                    className="w-full bg-cyan-500 text-gray-900 font-bold py-2 sm:py-3 rounded-sm transition duration-200 shadow-md disabled:opacity-50 flex items-center justify-center gap-2 hover:bg-cyan-400 font-sans tracking-widest text-sm"
                    disabled={!identifier.trim() || !password || (isRegistering && (!email.trim() || !matricNumber.trim() || !confirmPassword))}
                >
                    <ButtonIcon size={16} />
                    {isRegistering ? "REGISTER & CONNECT" : "LOGIN"}
                </button>
            </form>

            <p className="mt-5 sm:mt-6 text-center text-xs sm:text-sm text-gray-500 font-sans">
                {isRegistering ? ":: ALREADY A USER? " : ":: NO USER PROFILE FOUND? "}
                <button 
                    type="button" 
                    onClick={resetForm} 
                    className="text-yellow-400 hover:text-yellow-300 font-bold"
                >
                    {isRegistering ? "LOGIN" : "REGISTER NEW USER"}
                </button>
            </p>
        </div>
    );
}