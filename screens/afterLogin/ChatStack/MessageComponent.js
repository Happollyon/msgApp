import * as React from 'react';
import { useRef, useState, useEffect } from 'react';
import { View, Platform, TouchableOpacity,StyleSheet,Image} from 'react-native';
import { Text,useTheme} from 'react-native-paper';


// This component is used to display the messages in the chat screen it takes a prop message which is an array of objects
// Each object in the array has the following properties:
// id: A unique identifier for the message
// message: The message to be displayed
// imageLink: The link to the image of the sender
// time: The time at which the message was sent
// isMe: A boolean value indicating whether the message was sent by the user or not
export default function MessageComponent  ({ message,itsMe })  {
  function convertTimeStamp(timestamp) {
    // Convert timestamp to milliseconds to create a Date object
    const msgDate = new Date(timestamp);
    const currentDate = new Date();

    // Calculate difference in milliseconds
    const diffInMs = currentDate - msgDate;

    // Convert milliseconds to days, hours, and minutes
    const diffDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor((diffInMs / (1000 * 60 * 60)) % 24);
    const diffMinutes = Math.floor((diffInMs / (1000 * 60)) % 60);

    // Return the difference as an object or formatted string
    if (diffDays > 0) {
        return `${diffDays} days ago`;
    } else if (diffHours > 0) {
        return `${diffHours} hours ago`;
    } else if (diffMinutes > 0) {
        return `${diffMinutes} minutes ago`;
    } else {
        return 'Just now';
    }
    // Or return as a formatted string
    // return `${diffDays} days, ${diffHours} hours, ${diffMinutes} minutes ago`;
}

    return (
      
      
        message.imageLink==null ? (
            <View key={message.id} style={ itsMe ? styles.itIsMe: styles.itIsNotMe}>
              <Text style={{color:"white"}}>{message.message}</Text>
              <Text style={{color:"white",fontStyle:"italic", alignSelf:"flex-end",fontWeight:"light"}}>{convertTimeStamp(message.msgTimestamp)}</Text>
            </View>):(

              <View key={message.id} style={ itsMe ? styles.itIsMe: styles.itIsNotMe}>
              <Image 
          source={{ uri: message.imageLink }} 
          style={styles.image} 
          resizeMode="cover" // Adjust resizeMode as needed
        />
            <Text style={{color:"white",fontStyle:"italic", alignSelf:"flex-end",fontWeight:"light"}}>{convertTimeStamp(message.msgTimestamp)}</Text>
            </View>
            )
      
    );
}

//create styles for the message comp component
const styles = StyleSheet.create({
  
    itIsMe: {
      width: '60%',
      minHeight: 50,
      height: "auto",
      backgroundColor:'#7845AC',
      alignSelf: 'flex-end',
      justifyContent: 'center',
      margin: 10,
      borderRadius: 10,
      color:"white",
      padding:10
    },
    itIsNotMe: {
      padding:10,
      width: '60%',
      minHeight: 50,
      margin: 10,
      borderRadius: 10,
      height: "auto",
      backgroundColor:'#665A6F',
      alignSelf: 'flex-start',
      justifyContent: 'center',
      color:"white"
    }, image: {
      width: '100%', // Adjust width as needed
      height: 200, // Adjust height as needed
      borderRadius: 10, // Optional: if you want rounded corners
    },
  });
