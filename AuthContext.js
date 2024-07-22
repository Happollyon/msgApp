// AuthContext.js
import React, { createContext, useState,useEffect } from 'react';

export const AuthContext = createContext();

const appConfig = require('./appConf.json');
const webSocketUrl = appConfig.webSocketUrl;

export const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null); // Holds user information
  const [contactList, setContactList] = useState([]); // Holds the contact list
  const [socket, setSocket] = useState(null);
  useEffect(() => {
    const ws = new WebSocket(webSocketUrl);

    ws.onopen = () => {
        console.log('WebSocket connection opened');
        setSocket(ws);
    };

    ws.onmessage = (event) => {
        console.log(`Message from server: ${event.data}`);
        // Handle incoming messages here if needed
    };

    ws.onclose = () => {
        console.log('WebSocket connection closed');
        setSocket(null);
    };

    /*return () => {
        ws.close();
    };*/
}, []);


  return (
    <AuthContext.Provider value={{ loggedIn, setLoggedIn, userInfo, setUserInfo, contactList, setContactList,socket }}>
      {children}
    </AuthContext.Provider>
  );
};