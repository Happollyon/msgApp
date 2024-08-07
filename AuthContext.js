// AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';

/**
 * @module AuthContext
 * @description Provides authentication context and WebSocket connection management. 
 * @autho GitHub Copilot
 */

export const AuthContext = createContext();

const appConfig = require('./appConf.json');
const webSocketUrl = appConfig.webSocketUrl;

/**
 * @function AuthProvider
 * @description Provides authentication context to its children.
 * @param {Object} children - The child components that will consume the context.
 * @returns {JSX.Element} The AuthContext provider with its value.
 */
export const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null); // Holds user information
  const [contactList, setContactList] = useState([]); // Holds the contact list
  const [socket, setSocket] = useState(null);
  const [chats, setChats] = useState([]);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (loggedIn) {
      /**
       * @function getuserData
       * @description Fetches user data from the backend.
       * @throws Will throw an error if the network request fails.
       */
      const getuserData = async () => {
        const token = await AsyncStorage.getItem('token');
        try {
          const baseurlBack = appConfig.baseurlBack + "/user/getUser";

          const response = await fetch(baseurlBack, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });

          if (response.status === 200) {
            const responseData = await response.json();
            if (!responseData.error) {
              
              const userData = {
                id: responseData.data.id, // Assuming the ID is part of the response data
                name: responseData.data.name,
                email: responseData.data.email,
                avatarUrl: responseData.data.avatarUrl,
                status: responseData.data.status,
                messages: responseData.data.messages,
                description: responseData.data.description,
                vibration: responseData.data.vibration,
                sound: responseData.data.sound,
                notification: responseData.data.notification
              };

              setUserInfo(userData);
            } else {
              console.error("Error getting data:", responseData.error);
            }
          } else {
            console.error("Error getting data:", response.status);
          }
        } catch (e) {
          console.error("Network Error:", e);
        }
      };

      getuserData();
    }
  }, [loggedIn]);

  useEffect(() => {
    if (loggedIn && userInfo && userInfo.id) { // If the user is logged in and the user info is available
      let ws; // WebSocket instance

      /**
       * @function connectWebSocket
       * @description Establishes a WebSocket connection and handles events.
       */
      const connectWebSocket = () => {
        ws = new WebSocket(webSocketUrl); // Create a new WebSocket

        ws.onopen = () => { // When the WebSocket connection is opened
          ws.send(userInfo.id); // Send the user ID to the server
          setSocket(ws);
        };

        ws.onmessage = (event) => { // When a message is received from the server
          getChatsAndMessages();
        };

        ws.onclose = (event) => {
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
    }
  }, [loggedIn, userInfo]);

  /**
   * @function getChatsAndMessages
   * @description Fetches chats and messages from the backend.
   * @throws Will throw an error if the network request fails.
   */
  const getChatsAndMessages = async () => {
    const token = await AsyncStorage.getItem('token');
    try {
      const baseurlBack = appConfig.baseurlBack + "/chats/getChatsAndMessages";
      
      const response = await fetch(baseurlBack, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.status === 200) {
        const responseData = await response.json();
        if (!responseData.error) {
          setChats(responseData.chats);
        } else {
          console.error("Error getting chats and messages:", responseData.error);
        }
      } else {
        console.error("Error getting chats and messages:", response.status);
      }
    } catch (e) {
      console.error("Network Error:", e);
    }
  };

  useEffect(() => {
    if (loggedIn && userInfo && userInfo.id) {
      getChatsAndMessages();
    }
  }, [loggedIn, userInfo]);

  return (
    <AuthContext.Provider value={{ loggedIn, setLoggedIn, userInfo, setUserInfo, contactList, setContactList, socket, messages, setMessages, setChats, chats }}>
      {children}
    </AuthContext.Provider>
  );
};