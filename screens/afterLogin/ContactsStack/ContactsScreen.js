/**
 * @module ContactsScreen
 * @description Screen component for displaying and searching contacts. The user can search for contacts by name or email.
 * @author Fagner Nunes
 */

import React from 'react';
import { useState, useContext, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Searchbar, useTheme } from 'react-native-paper';
import { View, Text, Touchable, TouchableOpacity, KeyboardAvoidingView, SafeAreaView, Platform, ScrollView } from 'react-native';
import ContactItem from './ContactItem';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../../../AuthContext';

const appConfig = require('../../../appConf.json');
const baseurlBack = appConfig.baseurlBack;

export default function ContactsScreen({}) {
    const navigation = useNavigation();
    const theme = useTheme();
    const { contactList, setContactList } = useContext(AuthContext);
    const [state, setState] = useState({
        searchQuery: '',
        contactsToRender: contactList
    });

    useEffect(() => {
        setState((prevState) => ({
            ...prevState,
            contactsToRender: contactList
        }));
    }, [contactList]);

    /**
     * @function search
     * @description This function searches for contacts by name in the contacts in local storage or in the contacts on the server. In order to search for users in the database, the user must know the email. Calls are only made to the server if the user knows the email of the contact and a contact format is detected.
     * @memberof ContactsScreen
     * @param {string} name - The name of the contact to search for or the email of the contact to search for.
     * @returns {void} Nothing is returned. Instead, the state is updated with the contacts that match the search query.
     * @throws Will throw an error if the fetch request fails.
     */
    const search = async (name) => {
        const contactsFromStorage = await AsyncStorage.getItem('contacts');

        if (name === "") {
            const contacts = JSON.parse(contactsFromStorage);
            setState({ ...state, contactsToRender: contactList }); // reset the contacts
        } else {
            const token = await AsyncStorage.getItem('token');
            const emailFormat = /\S+@\S+\.\S+/;
            if (emailFormat.test(name)) {
                const url = `${baseurlBack}/contacts/search-user/${encodeURIComponent(name)}`;

                try {
                    await fetch(url, {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    }).then(async (response) => {
                        if (response.status === 200) {
                            await response.json().then(async (data) => {
                                if (!data.error) {
                                    setState({ contactsToRender: data.data }); // update the state
                                }
                            });
                        }
                    });
                } catch (e) {
                    throw new Error('Failed to fetch contacts from server');
                }
            } else {
                const filteredMsgs = state.contactsToRender.filter(contact => contact.name.includes(name)); // filter by name
                filteredMsgs.sort((a, b) => b.contact - a.contact); // sort by if is contact or not
                setState({ ...state, contactsToRender: filteredMsgs }); // update the state
            }
        }
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "transparent" }}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Searchbar
                    placeholder="Search"
                    onChangeText={(text) => { search(text) }}
                    style={{ width: "90%", marginBottom: "4%" }}
                />
                <ScrollView style={{ width: "90%", height: "100%", backgroundColor: theme.colors.background }} contentContainerStyle={{ flexGrow: 1, alignItems: "center", justifyContent: 'flex-start' }}>
                    {
                        state.contactsToRender.map((contact, index) => {
                            return <ContactItem key={index} contact={contact} />
                        })
                    }
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}