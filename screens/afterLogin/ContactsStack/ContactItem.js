import * as React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Avatar, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

export default function ContactItem({ contact }) {
    const theme = useTheme();
    const navigation = useNavigation();
    return(
        <TouchableOpacity  onPress={()=>navigation.navigate("ChatComponent")}style={{width:"100%",marginBottom: "3%", display:"flex",alignItems:"flex-end"}}>
            <View style={{ width: "100%", display: 'flex', flexDirection: "row", alignItems: "center", justifyContent: 'space-between'}}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Avatar.Image size={64} source={{"uri": contact.avatarUrl}} />
                    <View style={{ flexDirection: "column", marginLeft: "3%", alignItems: "start", justifyContent: "center" }}>
                        <Text variant="titleLarge" style={{color:theme.colors.primary}}>{contact.name}</Text>
                    </View>
                </View>
            </View> 
        </TouchableOpacity>
    )
}