// UserContext.js
import React, { createContext, useState } from 'react';

// Create Context
export const UserContext = createContext();

// Create a Provider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // user object can store username and other data

  const login = (username) => {
    setUser({ username });
  };

  const logout = () => {
    setUser(null); // Clear the user data on logout
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
