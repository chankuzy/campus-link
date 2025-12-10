// src/components/AuthModal.jsx (Updated for Mobile Responsiveness)

import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { User, Briefcase, Lock, LogIn, UserPlus } from 'lucide-react';

export default function AuthModal() {
  const { login, register } = useApp();
  const [isRegistering, setIsRegistering] = useState(false);
  const [username, setUsername] = useState('');
  const [department, setDepartment] = useState('Computer Science');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    try {
      if (isRegistering) {
        register(username.trim(), department);
      } else {
        login(username.trim());
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const title = isRegistering ? "CREATE_PROFILE_SEQUENCE" : "AUTHENTICATION_REQUIRED";
  const ButtonIcon = isRegistering ? UserPlus : LogIn;

  return (
    // P-6 for desktop, reduced to p-5 for mobile. max-w-sm on mobile, max-w-md on desktop.
    <div className="relative bg-[#1f2937] p-5 sm:p-8 rounded-sm shadow-2xl w-full max-w-sm sm:max-w-md border border-cyan-800/80">
      
      {/* --- Header --- */}
      <h2 className="text-lg sm:text-xl font-bold tracking-widest text-cyan-400 mb-2 font-mono">
          $ {title}
      </h2>
      <p className="text-xs sm:text-sm text-gray-500 mb-5 sm:mb-6 font-mono">
          // {isRegistering ? "INPUT NEW CREDENTIALS AND DEPARTMENT." : "ENTER USERNAME TO ACCESS SESSION."}
      </p>

      {/* Spacing reduced from space-y-5 to space-y-4 on mobile */}
      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
        
        {/* Username Input */}
        <AuthInput 
          Icon={User} 
          placeholder="USERNAME (e.g., csc-a101)" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)}
        />

        {/* Department Select (Only for Register) */}
        {isRegistering && (
          <div className="relative">
            <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} /> {/* Icon size reduced */}
            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              // py-2 vs py-3 for smaller height
              className="w-full pl-10 pr-4 py-2 sm:py-3 border border-gray-700 bg-gray-900 rounded-sm focus:ring-cyan-400 focus:border-cyan-400 text-gray-300 appearance-none font-mono text-xs sm:text-sm"
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
        )}
        
        {/* Error Message */}
        {error && <p className="text-red-500 text-center text-xs font-mono">// ERROR: {error}</p>}

        {/* Submit Button (Padding adjusted) */}
        <button
          type="submit"
          className="w-full bg-cyan-500 text-gray-900 font-bold py-2 sm:py-3 rounded-sm transition duration-200 shadow-md disabled:opacity-50 flex items-center justify-center gap-2 hover:bg-cyan-400 font-mono tracking-widest text-sm"
          disabled={!username.trim()}
        >
          <ButtonIcon size={16} /> {/* Icon size reduced */}
          {isRegistering ? "REGISTER & CONNECT" : "LOGIN_INITIATE"}
        </button>
      </form>

      {/* --- Mode Switcher (Spacing adjusted) --- */}
      <p className="mt-5 sm:mt-6 text-center text-xs sm:text-sm text-gray-500 font-mono">
        {isRegistering ? ":: ALREADY A USER? " : ":: NO USER PROFILE FOUND? "}
        <button 
          type="button" 
          onClick={() => { setIsRegistering(!isRegistering); setError(''); }} 
          className="text-yellow-400 hover:text-yellow-300 font-bold"
        >
          {isRegistering ? "LOGIN" : "REGISTER_NEW_USER"}
        </button>
      </p>
    </div>
  );
}

// Reusable Dark Mode Input (HTB Terminal Input Style)
const AuthInput = ({ Icon, ...props }) => (
    <div className="relative">
        <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cyan-400" size={18} /> {/* Icon size reduced */}
        <input
            type="text"
            // py-2 vs py-3 for smaller height
            className="w-full pl-10 pr-4 py-2 sm:py-3 border border-cyan-800/80 bg-gray-900 rounded-sm focus:ring-1 focus:ring-cyan-400 focus:border-cyan-400 placeholder-gray-500 text-gray-300 transition duration-150 font-mono text-xs sm:text-sm"
            required
            {...props}
        />
    </div>
);