import * as React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Text, useTheme, Avatar, Divider } from 'react-native-paper';

/**
 * @module ChatItem
 * @description A component that displays a chat item with user information, last message, and unread message count.
 * @author Fagner Nunes
 */

export default function ChatItem({ contactInfo, msg, lastMsgTimeStamp, navigation }) {
    const theme = useTheme();

    /**
     * @function convertTimeStamp
     * @description Converts a timestamp to a human-readable format. The function calculates the difference between the current date and the message date and returns a string with the time difference.
     * @param {number} timestamp - The timestamp to convert.
     * @returns {string} - The formatted time difference.
     * @throws {Error} - Throws an error if the timestamp is invalid.
     */
    function convertTimeStamp(timestamp) {
        const msgDate = new Date(timestamp);
        const currentDate = new Date();
        const diffInMs = currentDate - msgDate;
        const diffDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
        const diffHours = Math.floor((diffInMs / (1000 * 60 * 60)) % 24);
        const diffMinutes = Math.floor((diffInMs / (1000 * 60)) % 60);

        if (diffDays > 0) {
            return `${diffDays} days ago`;
        } else if (diffHours > 0) {
            return `${diffHours} hours ago`;
        } else if (diffMinutes > 0) {
            return `${diffMinutes} minutes ago`;
        } else {
            return 'Just now';
        }
    }

    /**
     * @function countUnreadMessages
     * @description Counts the number of unread messages. The function iterates over the messages array and counts the number of messages that are unread.
     * @param {Array} messages - The array of message objects.
     * @returns {number} - The count of unread messages.
     * @throws {Error} - Throws an error if the messages array is invalid.
     */
    function countUnreadMessages(messages) {
        let unreadCount = 0;
        for (let i = 0; i < messages.length; i++) {
            if (!messages[i].read) {
                unreadCount++;
            }
        }
        return unreadCount;
    }

    /**
     * @function workWithMsg
     * @description Processes the message to ensure it is displayed correctly. The function checks the length of the message and truncates it if it is too long.
     * @param {string} msg - The message to process.
     * @returns {string} - The processed message.
     * @throws {Error} - Throws an error if the message is invalid.
     */
    const workWithMsg = (msg) => {
        if (msg === undefined || msg === null) {
            return "image";
        }
        if (msg.length > 15) {
            return msg.substring(0, 15) + "...";
        }
        return msg;
    }

    return (
        <TouchableOpacity onPress={() => navigation.navigate('ChatComponent', { contactInfo: contactInfo.otherUser, chatInformation: contactInfo })} style={{ width: "100%", marginBottom: "3%", display: "flex", alignItems: "flex-end" }}>
            <View style={{ width: "100%", display: 'flex', flexDirection: "row", alignItems: "center", justifyContent: 'space-between' }}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Avatar.Image size={64} source={{ "uri": contactInfo.otherUser.avatarUrl }} />
                    <View style={{ flexDirection: "column", marginLeft: "3%", alignItems: "start", justifyContent: "center" }}>
                        <Text variant="titleLarge" style={{ color: theme.colors.primary }}>{contactInfo.otherUser.name}</Text>
                        <Text variant="titleSmall" style={{ color: theme.colors.secondary }}>{workWithMsg(msg)}</Text>
                    </View>
                </View>
                <View style={{ alignItems: "flex-end" }}>
                    <Text style={{ color: theme.colors.secondary }}>{convertTimeStamp(lastMsgTimeStamp)}</Text>
                    <View style={{ backgroundColor: theme.colors.secondary, borderRadius: "50%" }}>
                        <Text style={{ color: theme.colors.onSecondary }}> {countUnreadMessages(contactInfo.messages)} </Text>
                    </View>
                </View>
            </View>
            <Divider style={{ width: "80%", marginTop: "1%" }} />
        </TouchableOpacity>
    )
}