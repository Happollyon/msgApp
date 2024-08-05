// AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';

export const AuthContext = createContext();

const appConfig = require('./appConf.json');
const webSocketUrl = appConfig.webSocketUrl;

export const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null); // Holds user information
  const [contactList, setContactList] = useState([]); // Holds the contact list
  const [socket, setSocket] = useState(null);
  const [chats, setChats] = useState([]);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (loggedIn) {
      const getuserData = async () => {
        const token = await AsyncStorage.getItem('token');
        console.log("Screen loaded");
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
              console.log("error getting data");
              console.log(responseData.error);
            }
          } else {
            console.log("error getting data");
            console.log(response.status);
          }
        } catch (e) {
          console.log("network Error", e);
        }
      };

      getuserData();
    }
  }, [loggedIn]);

  useEffect(() => {
    if (loggedIn && userInfo && userInfo.id) { // If the user is logged in and the user info is available
      let ws; // WebSocket instance

      const connectWebSocket = () => {
        ws = new WebSocket(webSocketUrl); // Create a new WebSocket

        ws.onopen = () => { // When the WebSocket connection is opened
          console.log('WebSocket connection opened');
          console.log(userInfo.id);
          ws.send(userInfo.id); // Send the user ID to the server
          setSocket(ws);
        };

        ws.onmessage = (event) => { // When a message is received from the server
          console.log(`Message from server: ${event.data}`);
          
          // Handle incoming messages here if needed
          getChatsAndMessages();

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
    }
  }, [loggedIn, userInfo]);

  const getChatsAndMessages = async () => {
    const token = await AsyncStorage.getItem('token');
    try {
      const baseurlBack = appConfig.baseurlBack + "/chats/getChatsAndMessages";
      
      
      const response = await fetch(baseurlBack, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      if (response.status === 200) {
        
        const responseData = await response.json();
        if (!responseData.error) {
          console.log(responseData);
          setChats(responseData.chats);
          // Process and set the chats and messages data as needed
          // For example, you might want to update the contactList state or another state
          //set(responseData.data.chats);
        } else {
          console.log("error getting chats and messages");
          console.log(responseData.error);
        }
      } else {
        console.log("error getting chats and messages");
        console.log(response.status);
      }
    } catch (e) {
      console.log("network Error", e);
    }
  };
  useEffect(() => {

    if (loggedIn && userInfo && userInfo.id) {
     

      getChatsAndMessages();
    }
  }, [loggedIn, userInfo]);

  return (
    <AuthContext.Provider value={{ loggedIn, setLoggedIn, userInfo, setUserInfo, contactList, setContactList, socket,messages, setMessages,setChats,chats }}>
      {children}
    </AuthContext.Provider>
  );
};