import * as React from 'react';
import { TouchableOpacity, View } from 'react-native';

import { Text,useTheme,Avatar, Divider} from 'react-native-paper';

export default function ChatItem({contactInfo,name, msg, avatarUrl, lastMsgTimeStamp,msgCount, navigation}) {
    const theme = useTheme();

    function convertTimeStamp(timestamp) {
        // Convert timestamp to milliseconds to create a Date object
        const msgDate = new Date(timestamp * 1000);
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

    const workWithMsg=  (msg) => {
        if(msg.length > 15){
            return msg.substring(0,15) + "...";
        }
        return msg;
    }
    return(
      <TouchableOpacity  onPress={()=>navigation.navigate('ChatComponent',{contactInfo:contactInfo})} style={{width:"100%",marginBottom: "3%", display:"flex",alignItems:"flex-end"}}>
            <View style={{ width: "100%", display: 'flex', flexDirection: "row", alignItems: "center", justifyContent: 'space-between'}}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Avatar.Image size={64} source={{"uri": avatarUrl}} />
                    <View style={{ flexDirection: "column", marginLeft: "3%", alignItems: "start", justifyContent: "center" }}>
                        <Text variant="titleLarge" style={{color:theme.colors.primary}}>{name}</Text>
                        <Text variant="titleSmall" style={{ color: theme.colors.secondary }}>{workWithMsg(msg)}</Text>
                        
                    </View>
                </View>
                <View style={{ alignItems: "flex-end" }}>
                    <Text style={{color:theme.colors.secondary}}>{convertTimeStamp(lastMsgTimeStamp)}</Text>
                    <View style={{ backgroundColor: theme.colors.secondary, borderRadius: "50%"}}>
                        <Text style={{color: theme.colors.onSecondary}}> {msgCount} </Text>
                    </View>
                    
                </View>
            </View> 
            <Divider style={{width: "80%",marginTop:"1%"}}/>
        </TouchableOpacity>
       
    )
}