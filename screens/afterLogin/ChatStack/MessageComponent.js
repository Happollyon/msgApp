import * as React from 'react';
import { useRef, useState, useEffect } from 'react';
import { View, Platform, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Text, useTheme } from 'react-native-paper';

/**
 * @module MessageComponent
 * @description This component is used to display the messages in the chat screen. It displays the message and the timestamp of the message.
 * @param {object} props - The properties passed to the component.
 * @param {object} props.message - The message object to be displayed.
 * @param {boolean} props.itsMe - A boolean value indicating whether the message was sent by the user or not.
 * @returns {JSX.Element} The message component.
 */
export default function MessageComponent({ message, itsMe }) {
    /**
     * @function convertTimeStamp
     * @description Converts a timestamp to a human-readable format. The function calculates the difference between the current date and the message date and returns a string with the time difference.
     * @param {number} timestamp - The timestamp to be converted.
     * @returns {string} The formatted time difference.
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

    return (
        message.imageLink == null ? (
            <View key={message.id} style={itsMe ? styles.itIsMe : styles.itIsNotMe}>
                <Text style={{ color: "white" }}>{message.message}</Text>
                <Text style={{ color: "white", fontStyle: "italic", alignSelf: "flex-end", fontWeight: "light" }}>{convertTimeStamp(message.msgTimestamp)}</Text>
            </View>) : (
            <View key={message.id} style={itsMe ? styles.itIsMe : styles.itIsNotMe}>
                <Image
                    source={{ uri: message.imageLink }}
                    style={styles.image}
                    resizeMode="cover"
                />
                <Text style={{ color: "white", fontStyle: "italic", alignSelf: "flex-end", fontWeight: "light" }}>{convertTimeStamp(message.msgTimestamp)}</Text>
            </View>
        )
    );
}

// Create styles for the message component
const styles = StyleSheet.create({
    itIsMe: {
        width: '60%',
        minHeight: 50,
        height: "auto",
        backgroundColor: '#7845AC',
        alignSelf: 'flex-end',
        justifyContent: 'center',
        margin: 10,
        borderRadius: 10,
        color: "white",
        padding: 10
    },
    itIsNotMe: {
        padding: 10,
        width: '60%',
        minHeight: 50,
        margin: 10,
        borderRadius: 10,
        height: "auto",
        backgroundColor: '#665A6F',
        alignSelf: 'flex-start',
        justifyContent: 'center',
        color: "white"
    },
    image: {
        width: '100%',
        height: 200,
        borderRadius: 10,
    },
});