import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = (user) => {
    setIsAuthenticated(true);
    localStorage.setItem('loggedInUser', JSON.stringify(user));
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('loggedInUser');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
