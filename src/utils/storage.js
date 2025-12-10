import { generateId } from './helpers';

const LS_USER_KEY = 'campus_link_current_user';
const LS_PROFILES_KEY = 'campus_link_user_profiles';
const LS_RESOURCES_KEY = 'campus_link_resources';

export const loadFromStorage = (key, defaultValue) => {
    try {
        const stored = localStorage.getItem(key);
        return stored ? JSON.parse(stored) : defaultValue;
    } catch (e) {
        console.error(`Error loading key ${key} from localStorage:`, e);
        return defaultValue;
    }
};

export const saveToStorage = (key, data) => {
    try {
        localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
        console.error(`Error saving key ${key} to localStorage:`, e);
    }
};

export const seedMockData = (profiles, user) => {
    const defaultAdminId = 'sys-admin-001';
    const hasAdmin = profiles.some(p => p.id === defaultAdminId);

    if (!hasAdmin) {
        const adminProfile = {
            id: defaultAdminId,
            username: 'admin_user',
            email: 'admin@kasu.edu',
            matricNumber: 'A1000',
            department: 'System',
            isPremium: true,
        };
        profiles.push(adminProfile);
        saveToStorage(LS_PROFILES_KEY, profiles);
    }
    
    const mockResources = [
        { 
            id: generateId(), 
            title: 'CSC301 Midterm Past Questions (2023)', 
            courseCode: 'CSC301', 
            type: 'Past Question', 
            uploaderId: defaultAdminId, 
            uploaderUsername: 'Admin', 
            uploaderDepartment: 'Computer Science', 
            uploadDate: '2023-10-15', 
            isPastQuestion: true, 
            fileSize: '540 KB' 
        },
        { 
            id: generateId(), 
            title: 'PHY101 Intro to Mechanics Notes', 
            courseCode: 'PHY101', 
            type: 'Lecture Note', 
            uploaderId: defaultAdminId, 
            uploaderUsername: 'Admin', 
            uploaderDepartment: 'Physics', 
            uploadDate: '2023-09-01', 
            isPastQuestion: false, 
            fileSize: '1.2 MB' 
        },
        { 
            id: generateId(), 
            title: 'MAC402 Broadcast Media Theory', 
            courseCode: 'MAC402', 
            type: 'Lecture Note', 
            uploaderId: user?.id || defaultAdminId, 
            uploaderUsername: user?.username || 'Guest', 
            uploaderDepartment: user?.department || 'Computer Science', 
            uploadDate: '2024-01-20', 
            isPastQuestion: false, 
            fileSize: '800 KB' 
        },
        { 
            id: generateId(), 
            title: 'PAD305 Fiscal Federalism Report', 
            courseCode: 'PAD305', 
            type: 'Assignment', 
            uploaderId: defaultAdminId, 
            uploaderUsername: 'Admin', 
            uploaderDepartment: 'Public Administration', 
            uploadDate: '2024-02-05', 
            isPastQuestion: false, 
            fileSize: '300 KB' 
        },
    ];
    saveToStorage(LS_RESOURCES_KEY, mockResources);
};