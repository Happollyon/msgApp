/**
 * @module ContactItem
 * @description Component to display a contact item with options to add or remove a friend.
 * @author Fagner Nunes
 */

import * as React from 'react';
import { useContext } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Avatar, Icon, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../../../AuthContext';

const appConfig = require('../../../appConf.json');
const baseurlBack = appConfig.baseurlBack;

export default function ContactItem({ contact }) {
    const theme = useTheme();
    const navigation = useNavigation();
    const { contactList, setContactList } = useContext(AuthContext);

    /**
     * @function removeFriend
     * @description Removes a friend from the contact list. It sends a request to the backend to remove the contact from the user's contact list.
     * @returns {Promise<void>}
     * @throws Will throw an error if the contact cannot be removed.
     */
    const removeFriend = async () => {
        const token = await AsyncStorage.getItem("token");
        const url = `${baseurlBack}/contacts/delete-contact/${encodeURIComponent(contact.id)}`;
        try {
            await fetch(url, {
                method: 'GET',
                headers: { 'Authorization': `Bearer ${token}` }
            }).then(async (response) => {
                if (response.status === 200) {
                    await response.json().then(async (data) => {
                        let contacts = await AsyncStorage.getItem("contacts");
                        if (contacts) {
                            contacts = JSON.parse(contacts);
                            const updatedContacts = contacts.filter(c => c.id !== contact.id);
                            await AsyncStorage.setItem("contacts", JSON.stringify(updatedContacts));
                            await setContactList(updatedContacts);
                        }
                    });
                }
            });
        } catch (error) {
            console.error("Error deleting contact: ", error);
        }
    }

    /**
     * @function addFriend
     * @description Adds a friend to the contact list. It sends a request to the backend to add the contact to the user's contact list.
     * @returns {Promise<void>}
     * @throws Will throw an error if the contact cannot be added.
     */
    const addFriend = async () => {
        const token = await AsyncStorage.getItem("token");
        const url = `${baseurlBack}/contacts/add-contact/${encodeURIComponent(contact.id)}`;
        try {
            await fetch(url, {
                method: 'GET',
                headers: { 'Authorization': `Bearer ${token}` }
            }).then(async (response) => {
                if (response.status === 200) {
                    await response.json().then(async (data) => {
                        let contacts = await AsyncStorage.getItem("contacts");
                        if (contacts) {
                            contact.contact = true;
                            contacts = JSON.parse(contacts);
                            const updatedContacts = [...contacts, contact];
                            await AsyncStorage.setItem("contacts", JSON.stringify(updatedContacts));
                            await setContactList(updatedContacts);
                        }
                    });
                }
            });
        } catch (error) {
            console.error("Error adding contact: ", error);
        }
    }

    return (
        <View style={{ width: "100%", marginBottom: "3%", padding: 4, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "space-around", backgroundColor: contact.contact ? "transparent" : theme.colors.primaryContainer }}>
            <View style={{ width: "100%", display: 'flex', flexDirection: "row", alignItems: "center", justifyContent: 'space-between' }}>
                <TouchableOpacity onPress={() => navigation.navigate("ChatComponent", { contactInfo: contact })} style={{ flexDirection: "row", alignItems: "center" }}>
                    <Avatar.Image size={64} source={{ "uri": contact.avatarUrl }} />
                    <View style={{ flexDirection: "column", marginLeft: "3%", alignItems: "start", justifyContent: "center" }}>
                        <Text variant="titleLarge" style={{ color: theme.colors.primary }}>{contact.name}</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={contact.contact ? removeFriend : addFriend}>
                    {contact.contact ? <Icon source="close" size={25} color={theme.colors.primary} /> : <Icon source="plus" size={24} color={theme.colors.primary} />}
                </TouchableOpacity>
            </View>
        </View>
    )
}