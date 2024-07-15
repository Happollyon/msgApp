import * as React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Avatar, Icon, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

export default function ContactItem({ contact }) {
    const theme = useTheme();
    const navigation = useNavigation();
    return(
        <View  style={{width:"100%",marginBottom: "3%",padding:4,borderRadius:10, display:"flex",alignItems:"cemer",justifyContent:"space-around",backgroundColor:contact.contact?"transparent":theme.colors.primaryContainer}}>
            <View style={{ width: "100%", display: 'flex', flexDirection: "row", alignItems: "center", justifyContent: 'space-between'}}>
                <TouchableOpacity onPress={()=>navigation.navigate("ChatComponent")} style={{ flexDirection: "row", alignItems: "center" }}>
                    <Avatar.Image size={64} source={{"uri": contact.avatarUrl}} />
                    <View style={{ flexDirection: "column", marginLeft: "3%", alignItems: "start", justifyContent: "center" }}>
                        <Text variant="titleLarge" style={{color:theme.colors.primary}}>{contact.name}</Text>
                    </View>
                    
                <View>
                
                    </View>
        
                </TouchableOpacity>
                <TouchableOpacity>
               {contact.contact?<Icon source="newspaper" size={25}  color={theme.colors.primary} /> : <Icon source="plus" size={24}  color={theme.colors.primary} />}
            </TouchableOpacity> 
                
            </View>
            
        </View>
    )
}