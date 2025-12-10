// src/context/AppContext.jsx
import React, { createContext, useState, useEffect, useContext } from 'react';
import { storageService } from '../services/storageService';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    storageService.init();
    const storedUser = storageService.getCurrentUser();
    const data = storageService.getData();
    
    if (storedUser) setUser(storedUser);
    if (data) setResources(data.resources);
    setLoading(false);
  }, []);

  const login = (username) => {
        try {
            const existingUser = storageService.loginUser(username);
            setUser(existingUser);
        } catch (error) {
            // This error will be handled by the AuthModal UI
            throw error;
        }
    };

    const register = (username, department) => {
        try {
            const newUser = storageService.registerUser(username, department);
            setUser(newUser);
        } catch (error) {
            throw error;
        }
    };

  const logout = () => {
    storageService.logout();
    setUser(null);
  };

  const uploadResource = (formData) => {
    // Construct the resource object
    const newResource = {
      id: 'r' + Date.now(),
      title: formData.title,
      courseCode: formData.courseCode,
      type: formData.type,
      uploaderId: user.id,
      uploaderName: user.username,
      uploadDate: new Date().toISOString().split('T')[0],
      fileSize: (Math.random() * 5).toFixed(1) + " MB", // Simulated size
      dummyLink: "#"
    };

    const updatedList = storageService.addResource(newResource);
    setResources(updatedList); // Update state to trigger re-render
  };

  return (
    <AppContext.Provider value={{ user, resources, register, login, logout, uploadResource, loading }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);