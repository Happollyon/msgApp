// boiler plate code for ChatScreen.js

import React from 'react';
import { useState } from 'react';
import {SafeAreaView, ScrollView, KeyboardAvoidingView,Platform} from 'react-native';
import { Searchbar,useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import { AuthContext } from '../../../AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

// import app config
const appConfig = require('../../../appConf.json');

// import chatItem component
import ChatItem from './ChatItem';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const msgs = [
        {"name": "John Kiefel", "lastMsgTimeStamp": 1719915890, "avatarUrl": "https://scontent.cdninstagram.com/v/t39.30808-6/449442715_18442837969012232_2338445663121333116_n.jpg?stp=cp6_dst-jpegr_e35&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xNDM3eDE0MzcuaGRyLmYzMDgwOCJ9&_nc_ht=scontent.cdninstagram.com&_nc_cat=108&_nc_ohc=FG3fexBIk1UQ7kNvgEVnxLd&edm=APs17CUAAAAA&ccb=7-5&ig_cache_key=MzQwMDY1MDY2ODA5NzI4ODg1NQ%3D%3D.2-ccb7-5&oh=00_AYADT9gzdSt5u8zI8QenuEcXUTxCXXU0BmDXsO-RU22oTA&oe=6689C4C4&_nc_sid=10d13b", "msgCount": 5, "msg": "Hello"},
        {"name": "Jane Doe", "lastMsgTimeStamp": 1719915015, "avatarUrl": "https://scontent.cdninstagram.com/v/t39.30808-6/449442715_18442837969012232_2338445663121333116_n.jpg?stp=cp6_dst-jpegr_e35&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xNDM3eDE0MzcuaGRyLmYzMDgwOCJ9&_nc_ht=scontent.cdninstagram.com&_nc_cat=108&_nc_ohc=FG3fexBIk1UQ7kNvgEVnxLd&edm=APs17CUAAAAA&ccb=7-5&ig_cache_key=MzQwMDY1MDY2ODA5NzI4ODg1NQ%3D%3D.2-ccb7-5&oh=00_AYADT9gzdSt5u8zI8QenuEcXUTxCXXU0BmDXsO-RU22oTA&oe=6689C4C4&_nc_sid=10d13b", "msgCount": 3, "msg": "How are you?"},
        {"name": "Alice Smith", "lastMsgTimeStamp": 1720004415, "avatarUrl": "https://scontent.cdninstagram.com/v/t39.30808-6/449442715_18442837969012232_2338445663121333116_n.jpg?stp=cp6_dst-jpegr_e35&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xNDM3eDE0MzcuaGRyLmYzMDgwOCJ9&_nc_ht=scontent.cdninstagram.com&_nc_cat=108&_nc_ohc=FG3fexBIk1UQ7kNvgEVnxLd&edm=APs17CUAAAAA&ccb=7-5&ig_cache_key=MzQwMDY1MDY2ODA5NzI4ODg1NQ%3D%3D.2-ccb7-5&oh=00_AYADT9gzdSt5u8zI8QenuEcXUTxCXXU0BmDXsO-RU22oTA&oe=6689C4C4&_nc_sid=10d13b", "msgCount": 7, "msg": "Good morning! Wishing you a day filled with joy, positivity, and success. Embrace the opportunities ahead and make today amazing. Remember, every sunrise brings new hope. Have a wonderful day!"},
        {"name": "Bob Johnson", "lastMsgTimeStamp": 1719917210, "avatarUrl": "https://scontent.cdninstagram.com/v/t39.30808-6/449442715_18442837969012232_2338445663121333116_n.jpg?stp=cp6_dst-jpegr_e35&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xNDM3eDE0MzcuaGRyLmYzMDgwOCJ9&_nc_ht=scontent.cdninstagram.com&_nc_cat=108&_nc_ohc=FG3fexBIk1UQ7kNvgEVnxLd&edm=APs17CUAAAAA&ccb=7-5&ig_cache_key=MzQwMDY1MDY2ODA5NzI4ODg1NQ%3D%3D.2-ccb7-5&oh=00_AYADT9gzdSt5u8zI8QenuEcXUTxCXXU0BmDXsO-RU22oTA&oe=6689C4C4&_nc_sid=10d13b", "msgCount": 10, "msg": "See you soon"},
        {"name": "Charlie Brown", "lastMsgTimeStamp": 1719917215, "avatarUrl": "https://scontent.cdninstagram.com/v/t39.30808-6/449442715_18442837969012232_2338445663121333116_n.jpg?stp=cp6_dst-jpegr_e35&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xNDM3eDE0MzcuaGRyLmYzMDgwOCJ9&_nc_ht=scontent.cdninstagram.com&_nc_cat=108&_nc_ohc=FG3fexBIk1UQ7kNvgEVnxLd&edm=APs17CUAAAAA&ccb=7-5&ig_cache_key=MzQwMDY1MDY2ODA5NzI4ODg1NQ%3D%3D.2-ccb7-5&oh=00_AYADT9gzdSt5u8zI8QenuEcXUTxCXXU0BmDXsO-RU22oTA&oe=6689C4C4&_nc_sid=10d13b", "msgCount": 2, "msg": "Bye"},
        {"name": "David Wilson", "lastMsgTimeStamp": 1719917220, "avatarUrl": "https://scontent.cdninstagram.com/v/t39.30808-6/449442715_18442837969012232_2338445663121333116_n.jpg?stp=cp6_dst-jpegr_e35&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xNDM3eDE0MzcuaGRyLmYzMDgwOCJ9&_nc_ht=scontent.cdninstagram.com&_nc_cat=108&_nc_ohc=FG3fexBIk1UQ7kNvgEVnxLd&edm=APs17CUAAAAA&ccb=7-5&ig_cache_key=MzQwMDY1MDY2ODA5NzI4ODg1NQ%3D%3D.2-ccb7-5&oh=00_AYADT9gzdSt5u8zI8QenuEcXUTxCXXU0BmDXsO-RU22oTA&oe=6689C4C4&_nc_sid=10d13b", "msgCount": 4, "msg": "Yes"},
        {"name": "Eva Green", "lastMsgTimeStamp": 1719917225, "avatarUrl": "https://scontent.cdninstagram.com/v/t39.30808-6/449442715_18442837969012232_2338445663121333116_n.jpg?stp=cp6_dst-jpegr_e35&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xNDM3eDE0MzcuaGRyLmYzMDgwOCJ9&_nc_ht=scontent.cdninstagram.com&_nc_cat=108&_nc_ohc=FG3fexBIk1UQ7kNvgEVnxLd&edm=APs17CUAAAAA&ccb=7-5&ig_cache_key=MzQwMDY1MDY2ODA5NzI4ODg1NQ%3D%3D.2-ccb7-5&oh=00_AYADT9gzdSt5u8zI8QenuEcXUTxCXXU0BmDXsO-RU22oTA&oe=6689C4C4&_nc_sid=10d13b", "msgCount": 6, "msg": "Okay"},
        {"name": "Fiona Adams", "lastMsgTimeStamp": 1719917230, "avatarUrl": "https://scontent.cdninstagram.com/v/t39.30808-6/449442715_18442837969012232_2338445663121333116_n.jpg?stp=cp6_dst-jpegr_e35&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xNDM3eDE0MzcuaGRyLmYzMDgwOCJ9&_nc_ht=scontent.cdninstagram.com&_nc_cat=108&_nc_ohc=FG3fexBIk1UQ7kNvgEVnxLd&edm=APs17CUAAAAA&ccb=7-5&ig_cache_key=MzQwMDY1MDY2ODA5NzI4ODg1NQ%3D%3D.2-ccb7-5&oh=00_AYADT9gzdSt5u8zI8QenuEcXUTxCXXU0BmDXsO-RU22oTA&oe=6689C4C4&_nc_sid=10d13b", "msgCount": 8, "msg": "No problem"},
        {"name": "George Harris", "lastMsgTimeStamp": 1719917235, "avatarUrl": "https://scontent.cdninstagram.com/v/t39.30808-6/449442715_18442837969012232_2338445663121333116_n.jpg?stp=cp6_dst-jpegr_e35&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xNDM3eDE0MzcuaGRyLmYzMDgwOCJ9&_nc_ht=scontent.cdninstagram.com&_nc_cat=108&_nc_ohc=FG3fexBIk1UQ7kNvgEVnxLd&edm=APs17CUAAAAA&ccb=7-5&ig_cache_key=MzQwMDY1MDY2ODA5NzI4ODg1NQ%3D%3D.2-ccb7-5&oh=00_AYADT9gzdSt5u8zI8QenuEcXUTxCXXU0BmDXsO-RU22oTA&oe=6689C4C4&_nc_sid=10d13b", "msgCount": 1, "msg": "Thanks"},
        {"name": "Hannah Clark", "lastMsgTimeStamp": 1719917240, "avatarUrl": "https://scontent.cdninstagram.com/v/t39.30808-6/449442715_18442837969012232_2338445663121333116_n.jpg?stp=cp6_dst-jpegr_e35&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xNDM3eDE0MzcuaGRyLmYzMDgwOCJ9&_nc_ht=scontent.cdninstagram.com&_nc_cat=108&_nc_ohc=FG3fexBIk1UQ7kNvgEVnxLd&edm=APs17CUAAAAA&ccb=7-5&ig_cache_key=MzQwMDY1MDY2ODA5NzI4ODg1NQ%3D%3D.2-ccb7-5&oh=00_AYADT9gzdSt5u8zI8QenuEcXUTxCXXU0BmDXsO-RU22oTA&oe=6689C4C4&_nc_sid=10d13b", "msgCount": 9, "msg": "Great"},
        {"name": "Ian Robinson", "lastMsgTimeStamp": 1719917245, "avatarUrl": "https://scontent.cdninstagram.com/v/t39.30808-6/449442715_18442837969012232_2338445663121333116_n.jpg?stp=cp6_dst-jpegr_e35&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xNDM3eDE0MzcuaGRyLmYzMDgwOCJ9&_nc_ht=scontent.cdninstagram.com&_nc_cat=108&_nc_ohc=FG3fexBIk1UQ7kNvgEVnxLd&edm=APs17CUAAAAA&ccb=7-5&ig_cache_key=MzQwMDY1MDY2ODA5NzI4ODg1NQ%3D%3D.2-ccb7-5&oh=00_AYADT9gzdSt5u8zI8QenuEcXUTxCXXU0BmDXsO-RU22oTA&oe=6689C4C4&_nc_sid=10d13b", "msgCount": 12, "msg": "Amazing"},
        {"name": "Jessica Lee", "lastMsgTimeStamp": 1719830512, "avatarUrl": "https://scontent.cdninstagram.com/v/t39.30808-6/449442715_18442837969012232_2338445663121333116_n.jpg?stp=cp6_dst-jpegr_e35&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xNDM3eDE0MzcuaGRyLmYzMDgwOCJ9&_nc_ht=scontent.cdninstagram.com&_nc_cat=108&_nc_ohc=FG3fexBIk1UQ7kNvgEVnxLd&edm=APs17CUAAAAA&ccb=7-5&ig_cache_key=MzQwMDY1MDY2ODA5NzI4ODg1NQ%3D%3D.2-ccb7-5&oh=00_AYADT9gzdSt5u8zI8QenuEcXUTxCXXU0BmDXsO-RU22oTA&oe=6689C4C4&_nc_sid=10d13b", "msgCount": 11, "msg": "Congrats"},
        {"name": "Kevin Lewis", "lastMsgTimeStamp": 1720003312, "avatarUrl": "https://scontent.cdninstagram.com/v/t39.30808-6/449442715_18442837969012232_2338445663121333116_n.jpg?stp=cp6_dst-jpegr_e35&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xNDM3eDE0MzcuaGRyLmYzMDgwOCJ9&_nc_ht=scontent.cdninstagram.com&_nc_cat=108&_nc_ohc=FG3fexBIk1UQ7kNvgEVnxLd&edm=APs17CUAAAAA&ccb=7-5&ig_cache_key=MzQwMDY1MDY2ODA5NzI4ODg1NQ%3D%3D.2-ccb7-5&oh=00_AYADT9gzdSt5u8zI8QenuEcXUTxCXXU0BmDXsO-RU22oTA&oe=6689C4C4&_nc_sid=10d13b", "msgCount": 14, "msg": "Welcome"},
        {"name": "Laura Walker", "lastMsgTimeStamp": 1720002918, "avatarUrl": "https://scontent.cdninstagram.com/v/t39.30808-6/449442715_18442837969012232_2338445663121333116_n.jpg?stp=cp6_dst-jpegr_e35&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xNDM3eDE0MzcuaGRyLmYzMDgwOCJ9&_nc_ht=scontent.cdninstagram.com&_nc_cat=108&_nc_ohc=FG3fexBIk1UQ7kNvgEVnxLd&edm=APs17CUAAAAA&ccb=7-5&ig_cache_key=MzQwMDY1MDY2ODA5NzI4ODg1NQ%3D%3D.2-ccb7-5&oh=00_AYADT9gzdSt5u8zI8QenuEcXUTxCXXU0BmDXsO-RU22oTA&oe=6689C4C4&_nc_sid=10d13b", "msgCount": 13, "msg": "Happy birthday"}
        ]
    
export default function ChatScreen() {
    const navigation = useNavigation();
    const theme = useTheme();
    const [state, setState] = useState({
        searchQuery: '',
        msgsToRender: [...msgs]
    });
     
    const {userInfo, setUserInfo} = React.useContext(AuthContext);

   
    const getuserData = async () => {
        const token = await AsyncStorage.getItem('token');
        console.log("Screen loaded");
        // Add any other logic you want to execute on load
        try {
            const baseurlBack = appConfig.baseurlBack+"/user/getUser";
            
            await fetch(baseurlBack, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`}
            }).then(async (response) => {
                if(response.status ===200){ 
                    await response.json().then(async (response) => {
                        if(!response.error){
                            console.log(response);
                            const userData = {
                                name: response.data.name,
                                email: response.data.email,
                                avatarUrl: response.data.avatarUrl,
                                status: response.data.status,
                                messages: response.data.messages,
                                description: response.data.description,
                                vibration: response.data.vibration,
                                sound: response.data.sound,
                                notification:response.data.notification
                            }
                            
                            setUserInfo(userData);
                        }else{
                            console.log("error getting data")
                            console.log(response.error);
                        }
                    });
                }else{
                    console.log("error getting data")
                    console.log(response.status);
                }
            });
        }catch(e){
                console.log("network Error",e);
        }
    };

    useEffect(() => {
        getuserData();
    }, []);
    const search = async (name) => {
        
        
        if(name === ""){
            setState({msgsToRender: msgs});
        }else{
            const filteredMsgs = msgs.filter(msg => msg.name.includes(name));
            setState({msgsToRender: filteredMsgs});
        }
        console.log("state")
       

    }
    return (
        <SafeAreaView style={{flex:1,backgroundColor:"transparent"}}>
        <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ backgroundColor: theme.colors.background, flex: 1, alignItems: 'center',justifyContent: 'center'}}>
         
            <Searchbar
                placeholder="Search"
                onChangeText={(text) => {search(text)}}
                style={{width:"90%",marginBottom:"4%"}}
            />
            <ScrollView  style={{width:"90%",height:"50%"}} contentContainerStyle={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}>
                {/* Place your chat content here */
                    state.msgsToRender.map((msg,index) => {
                        return <ChatItem contactInfo={msg} navigation={navigation} key={index} name={msg.name} lastMsgTimeStamp={msg.lastMsgTimeStamp} avatarUrl={msg.avatarUrl} msgCount={msg.msgCount} msg={msg.msg}/>
                    })
                }
            </ScrollView>
            
        </KeyboardAvoidingView>
        </SafeAreaView>
    );
    }
    