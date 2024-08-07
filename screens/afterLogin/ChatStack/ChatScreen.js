// boiler plate code for ChatScreen.js

import React from 'react';
import { useState } from 'react';
import {SafeAreaView, ScrollView, KeyboardAvoidingView,Platform} from 'react-native';
import { Searchbar,useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import { AuthContext } from '../../../AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ChatItem from './ChatItem';

// import app config
const appConfig = require('../../../appConf.json');

const msgs = [
    // ... (same message array as before)
];

/**
 * @module ChatScreen
 * @description This module represents the chat screen of the application. It displays the chat messages and allows the user to search for messages.
 * @author Fagner Nunes
 */
export default function ChatScreen() {
    const navigation = useNavigation();
    const theme = useTheme();
    const [state, setState] = useState({
        searchQuery: '',
        msgsToRender: []
    });

    const { userInfo, setUserInfo } = React.useContext(AuthContext);
    const { chats, setChats } = React.useContext(AuthContext);

    /**
     * @function getuserData
     * @description Fetches user data from the backend and sets it in the context. It sends a request to the backend to get the user data.
     * @throws Will throw an error if the network request fails.
     */
    const getuserData = async () => {
        const token = await AsyncStorage.getItem('token');
        try {
            const baseurlBack = `${appConfig.baseurlBack}/user/getUser`;

            await fetch(baseurlBack, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then(async (response) => {
                if (response.status === 200) {
                    await response.json().then(async (response) => {
                        if (!response.error) {
                            const userData = {
                                id: response.data.id,
                                name: response.data.name,
                                email: response.data.email,
                                avatarUrl: response.data.avatarUrl,
                                status: response.data.status,
                                messages: response.data.messages,
                                description: response.data.description,
                                vibration: response.data.vibration,
                                sound: response.data.sound,
                                notification: response.data.notification
                            };

                            setUserInfo(userData);
                        } else {
                            console.error("Error getting data:", response.error);
                        }
                    });
                } else {
                    console.error("Error getting data:", response.status);
                }
            });
        } catch (e) {
            console.error("Network Error:", e);
        }
    };

    useEffect(() => {
        // getuserData();
    }, []);

    useEffect(() => {
        setState({ msgsToRender: chats });
    }, [chats]);

    /**
     * @function search
     * @description Filters the messages based on the search query. It filters the messages based on the name of the contact.
     * @param {string} name - The name to search for.
     */
    const search = async (name) => {
        if (name === "") {
            setState({ msgsToRender: msgs });
        } else {
            const filteredMsgs = msgs.filter(msg => msg.name.includes(name));
            setState({ msgsToRender: filteredMsgs });
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "transparent" }}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ backgroundColor: theme.colors.background, flex: 1, alignItems: 'center', justifyContent: 'center' }}
            >
                <Searchbar
                    placeholder="Search"
                    onChangeText={(text) => { search(text) }}
                    style={{ width: "90%", marginBottom: "4%" }}
                />
                <ScrollView style={{ width: "90%", height: "50%" }} contentContainerStyle={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}>
                    {
                        state.msgsToRender.map((msg, index) => {
                            return <ChatItem contactInfo={msg} navigation={navigation} key={index} lastMsgTimeStamp={msg.lastMessageTimestamp} msg={msg.lastMessage} />
                        })
                    }
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}