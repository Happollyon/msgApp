import * as React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Avatar, Icon, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const appConfig = require('../../../appConf.json');
const baseurlBack = appConfig.baseurlBack;

export default function ContactItem({ contact }) {
    const theme = useTheme();
    const navigation = useNavigation();
   
    const removeFriend = async () => {
        console.log("remove friend")
        const token = await AsyncStorage.getItem("token");
        const url = `${baseurlBack}/contacts/delete-contact/${encodeURIComponent(contact.id)}`;
        console.log(url);
        try{
           await fetch(url, {method:'GET',
            headers: {'Authorization': `Bearer ${token}`}
           } ).then(async (response) => {
                if(response.status === 200){
                    console.log("Response 200");
                    await response.json().then(async (data) => {
                        console.log(data)
                        console.log("Friend removed");
                    })
                }else{
                    console.log(response.status);
                    console.log("Friend not removed");
                }

           })   
        }catch(error){
            console.log("error deleting contact: ",error);
        }
    }
    const addFriend = async () => {
        // add friend to the list
        console.log(contact.id);
        const token = await AsyncStorage.getItem("token");
        const url = `${baseurlBack}/contacts/add-contact/${encodeURIComponent(contact.id)}`;
        try{
        await fetch(url, { 
            method: 'GET',
            headers: {'Authorization': `Bearer ${token}`}
         }).then(async (response) => {
            if(response.status === 200){
                console.log("Response 200");
              await response.json().then(async (data) => {
                    console.log(data)
                    console.log("Friend added");
              })

            }else{
                console.log("Friend not added");
            }
         });
        }catch(error){
            console.log(error);
         }

        console.log(url);
        console.log("Add friend");
    }
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
                <TouchableOpacity onPress={contact.contact?removeFriend:addFriend}>
               {contact.contact?<Icon source="close" size={25}  color={theme.colors.primary} /> : <Icon source="plus" size={24}  color={theme.colors.primary} />}
            </TouchableOpacity> 
                
            </View>
            
        </View>
    )
}