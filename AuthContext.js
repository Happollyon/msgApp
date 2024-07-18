// AuthContext.js
import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null); // Holds user information
  const [contactList, setContactList] = useState([]); // Holds the contact list

  return (
    <AuthContext.Provider value={{ loggedIn, setLoggedIn, userInfo, setUserInfo, contactList, setContactList }}>
      {children}
    </AuthContext.Provider>
  );
};