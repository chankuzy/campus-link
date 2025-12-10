const KEY = 'campusLink_data';

const initialData = {
  users: [],
  resources: [
    {
      id: "r101",
      title: "Intro to Algorithms - Week 1",
      courseCode: "CSC201",
      type: "Lecture Note",
      uploaderId: "u1",
      uploaderName: "System Admin",
      uploadDate: "2023-10-24",
      fileSize: "2.4 MB"
    }
  ],
  groups: []
};

export const storageService = {
  // Initialize storage if empty
  init: () => {
    if (!localStorage.getItem(KEY)) {
      localStorage.setItem(KEY, JSON.stringify(initialData));
    }
  },

  getData: () => {
    return JSON.parse(localStorage.getItem(KEY));
  },

  saveData: (data) => {
    localStorage.setItem(KEY, JSON.stringify(data));
  },

  registerUser: (username, department) => {
      const data = storageService.getData();
      
      // Check for existing user (optional, but good practice)
      if (data.users.find(u => u.username.toLowerCase() === username.toLowerCase())) {
          throw new Error("Username already taken.");
      }

      const newUser = {
          id: 'u' + Date.now(),
          username: username,
          department: department,
          role: 'student',
      };
      
      data.users.push(newUser);
      storageService.saveData(data);
      localStorage.setItem('campusLink_currentUser', JSON.stringify(newUser));
      return newUser;
  },

  // Updated login function to find existing users
  loginUser: (username) => {
      const data = storageService.getData();
      const user = data.users.find(u => u.username.toLowerCase() === username.toLowerCase());
      
      if (!user) {
          // Throwing error prompts the UI to suggest sign up
          throw new Error("User not found. Please Sign Up.");
      }
      
      localStorage.setItem('campusLink_currentUser', JSON.stringify(user));
      return user;
  },

  getCurrentUser: () => {
    return JSON.parse(localStorage.getItem('campusLink_currentUser'));
  },

  logout: () => {
    localStorage.removeItem('campusLink_currentUser');
  },

  addResource: (resource) => {
    const data = JSON.parse(localStorage.getItem(KEY));
    data.resources.unshift(resource); // Add to top of list
    localStorage.setItem(KEY, JSON.stringify(data));
    return data.resources;
  }
};