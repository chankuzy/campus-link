import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { generateId } from '../utils/helpers';
import { loadFromStorage, saveToStorage, seedMockData } from '../utils/storage';

const LS_USER_KEY = 'campus_link_current_user';
const LS_PROFILES_KEY = 'campus_link_user_profiles';
const LS_RESOURCES_KEY = 'campus_link_resources';

const AppContext = createContext();

export const useApp = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
    const [user, setUser] = useState(() => loadFromStorage(LS_USER_KEY, null));
    const [loading, setLoading] = useState(true);
    const [resources, setResources] = useState(() => loadFromStorage(LS_RESOURCES_KEY, []));
    const [profiles, setProfiles] = useState(() => loadFromStorage(LS_PROFILES_KEY, []));

    useEffect(() => {
        if (resources.length === 0 || profiles.length === 0) {
            console.log("Seeding initial mock data...");
            seedMockData(profiles, user);
            setProfiles(loadFromStorage(LS_PROFILES_KEY, []));
            setResources(loadFromStorage(LS_RESOURCES_KEY, []));
        }
        setLoading(false);
    }, []);

    const register = useCallback((data) => {
        const existingUser = profiles.find(p => 
            p.username === data.username || 
            p.email === data.email || 
            p.matricNumber === data.matricNumber
        );
        
        if (existingUser) {
            throw new Error("Username, email, or matric number already exists.");
        }

        const userId = generateId();
        const newUserProfile = {
            id: userId,
            username: data.username,
            email: data.email,
            matricNumber: data.matricNumber,
            department: data.department,
            isPremium: false,
        };

        const newProfiles = [...profiles, newUserProfile];
        saveToStorage(LS_PROFILES_KEY, newProfiles);
        setProfiles(newProfiles);

        saveToStorage(LS_USER_KEY, newUserProfile);
        setUser(newUserProfile);
    }, [profiles]);

    const login = useCallback((identifier, password) => {
        const matchedProfile = profiles.find(p => 
            p.username === identifier || 
            p.email === identifier || 
            p.matricNumber === identifier
        );

        if (!matchedProfile) {
            throw new Error(`User with identifier '${identifier}' not found. Please register.`);
        }
        
        saveToStorage(LS_USER_KEY, matchedProfile);
        setUser(matchedProfile);
    }, [profiles]);

    const logout = useCallback(() => {
        saveToStorage(LS_USER_KEY, null);
        setUser(null);
    }, []);

    const uploadResource = useCallback((data) => {
        if (!user) {
            console.error("Cannot upload: User not authenticated.");
            return;
        }
        
        const newResource = {
            id: generateId(),
            ...data,
            uploaderId: user.id,
            uploaderUsername: user.username,
            uploaderMatric: user.matricNumber,
            uploaderDepartment: user.department,
            uploadDate: new Date().toISOString().split('T')[0],
            isPastQuestion: data.type.toLowerCase().includes('past question'),
        };

        const newResources = [newResource, ...resources];
        saveToStorage(LS_RESOURCES_KEY, newResources);
        setResources(newResources);
    }, [user, resources]);

    const value = {
        user,
        loading,
        resources,
        register,
        login,
        logout,
        uploadResource,
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};