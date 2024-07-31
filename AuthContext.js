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
    let ws; // WebSocket instance
  
    const connectWebSocket = () => {
      ws = new WebSocket(webSocketUrl); // Create a new WebSocket
  
      ws.onopen = () => { // When the WebSocket connection is opened
        console.log('WebSocket connection opened');
        ws.send("id123456");
        setSocket(ws);
      };
  
      ws.onmessage = (event) => { // When a message is received from the server
        console.log(`Message from server: ${event.data}`);
        // Handle incoming messages here if needed
      };
  
      ws.onclose = (event) => {
        console.log(`WebSocket connection closed with code: ${event.code}, reason: ${event.reason}`);
        setSocket(null);
        // Attempt to reconnect after 5 seconds if the close code is 1001
        if (event.code === 1001) {
          setTimeout(connectWebSocket, 5000);
        }
      };
    };
  
    connectWebSocket();
  
    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, []);


  return (
    <AuthContext.Provider value={{ loggedIn, setLoggedIn, userInfo, setUserInfo, contactList, setContactList,socket }}>
      {children}
    </AuthContext.Provider>
  );
};