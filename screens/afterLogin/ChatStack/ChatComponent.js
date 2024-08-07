import * as React from 'react';
import { useRef, useState, useEffect } from 'react';
import { View, SafeAreaView, KeyboardAvoidingView, Platform, TouchableOpacity, ScrollView, Animated } from 'react-native';
import { Text, useTheme, Icon, Avatar, Switch, Button, TextInput } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import MessageComponent from './MessageComponent';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../../AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
const appConfig = require('../../../appConf.json');
const baseurlBack = appConfig.baseurlBack;

/**
 * @module ChatComponent
 * @description This module handles the chat functionality including sending, receiving, and displaying messages.
 * @autho Fagner Nunes
 */

const ExpandedView = ({ expanded, setSwitch, switchOn, blockUser, unblockUser, isBlocked }) => {
  const animation = useRef(new Animated.Value(0)).current;
  const theme = useTheme();
  
  useEffect(() => {
    Animated.timing(animation, {
      toValue: expanded ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [expanded]);

  const height = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 100],
  });

  return (
    <Animated.View style={{ width: '100%', overflow: 'hidden', height, backgroundColor: theme.colors.primary, display: "flex", flexDirection: "row", justifyContent: "space-around", alignItems: "center" }}>
      <Button
        mode="contained"
        icon="lock"
        textColor={theme.colors.primary}
        style={{ backgroundColor: theme.colors.background }}
        onPress={isBlocked ? unblockUser : blockUser}
      >
        {isBlocked ? 'Unblock' : 'Block'}
      </Button>
      <View style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
        <Text style={{ color: theme.colors.onPrimary }}>Disappearing message</Text>
        <Switch color="#06D6A0" disabled={false} value={switchOn} onValueChange={setSwitch} />
      </View>
    </Animated.View>
  );
};

const MoreOptions = ({ expanded, contactInfo }) => {
  const navigation = useNavigation();
  const animation = useRef(new Animated.Value(0)).current;
  const theme = useTheme();
  
  useEffect(() => {
    Animated.timing(animation, {
      toValue: expanded ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [expanded]);

  const height = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 100],
  });

  return (
    <Animated.View style={{ width: '100%', overflow: 'hidden', height, backgroundColor: theme.colors.primary, display: "flex", flexDirection: "row", justifyContent: "space-around", alignItems: "center" }}>
      <TouchableOpacity onPress={() => { navigation.navigate('Camera', { fromChat: true, icon: 'camera', contactInfo: contactInfo }) }}>
        <Icon source="camera" color={theme.colors.onPrimary} size="35%" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => { navigation.navigate('Camera', { fromChat: true, icon: 'picker', contactInfo: contactInfo }) }}>
        <Icon source="image" color={theme.colors.onPrimary} size="35%" />
      </TouchableOpacity>
    </Animated.View>
  );
};

export default function ChatComponent({ route }) {
  const { socket } = React.useContext(AuthContext);
  const navigation = useNavigation();
  const { contactInfo } = route.params;
  const theme = useTheme();
  const [state, setState] = useState({
    visible: false,
    switchOn: false,
    moreOptionsVisible: false,
    msg: '',
    msgsToRender: [],
    isBlocked: false,
  });
  const { userInfo, setUserInfo } = React.useContext(AuthContext);
  const { chats, setChats } = React.useContext(AuthContext);

  const setVisible = (visible) => {
    setState({ ...state, visible });
  };

  const setSwitch = () => {
    setState({ ...state, switchOn: !state.switchOn });
  };

  const setmoreOptionsVisible = () => {
    setState({ ...state, moreOptionsVisible: !state.moreOptionsVisible });
  };

  /**
   * @function blockUser
   * @description Blocks the user by making an API call.
   * @throws Will throw an error if the API call fails.
   */
  const blockUser = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await fetch(`${baseurlBack}/user/block/${contactInfo.id}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.status === 200) {
        setState({ ...state, isBlocked: true });
      } else {
        console.log('Error blocking user:', response.status);
      }
    } catch (error) {
      console.error('Error blocking user:', error);
    }
  };

  /**
   * @function unblockUser
   * @description Unblocks the user by making an API call. 
   * @throws Will throw an error if the API call fails.
   */
  const unblockUser = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await fetch(`${baseurlBack}/user/unblock/${contactInfo.id}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.status === 200) {
        setState({ ...state, isBlocked: false });
      } else {
        console.log('Error unblocking user:', response.status);
      }
    } catch (error) {
      console.error('Error unblocking user:', error);
    }
  };

  /**
   * @function sendMessage
   * @description Sends a message through the socket. 
   * @param {string} imgUlr - The URL of the image to send.
   * @throws Will throw an error if the socket is not available.
   */
  const sendMessage = async (imgUlr) => {
    const input = state.msg;
    const token = await AsyncStorage.getItem('token');
    const message = {
      type: 'message',
      token: token,
      delivered: false,
      read: false,
      msgObj: {
        message: input,
        sender: userInfo.id,
        receiver: contactInfo.id,
        imageLink: imgUlr
      }
    };
    if (input && socket) {
      socket.send(JSON.stringify(message));
      setState({ ...state, msg: '' });
    }
  };

  /**
   * @function findChatByOtherUserId
   * @description Finds the chat by the other user's ID. 
   * @returns {Object|null} The chat object if found, otherwise null.
   */
  function findChatByOtherUserId() {
    for (let chat of chats) {
      if (chat.otherUser.id === contactInfo.id) {
        return chat;
      }
    }
    return null;
  }

  const scrollViewRef = useRef();
  useEffect(() => {
    scrollViewRef.current.scrollToEnd({ animated: true });
  }, [state.msgsToRender]);

  useEffect(() => {
    const chat = findChatByOtherUserId();
    if (chat) {
      setState({ ...state, msgsToRender: chat.messages });
    }
  }, [chats]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        await fetch(`${baseurlBack}/messages/${userInfo.id}/${contactInfo.id}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }).then(async response => {
          if (response.status === 200) {
            response.json().then(async data => {
              if (!data.error) {
                data.data.forEach(async (msg) => {
                  if (msg.receiver === userInfo.id && !msg.read) {
                    await fetch(`${baseurlBack}/messages/read/${msg.id}`, {
                      method: 'GET',
                      headers: {
                        'Authorization': `Bearer ${token}`
                      }
                    }).then(async response => {
                      if (response.status === 200) {
                        console.log("Message read successfully");
                      } else {
                        console.log("Error reading message code:", response.status);
                      }
                    });
                  }
                });
              } else {
                console.log("Error fetching messages");
              }
            });
          } else {
            console.log("Error fetching messages code:", response.status);
          }
        });
        setState({ ...state, msgsToRender: data });
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };
    if (route.params.imageUrl) {
      console.log(route.params.imageUrl, "image url in chat component");
    }
    const chat = findChatByOtherUserId();
    if (chat) {
      setState({ ...state, msgsToRender: chat.messages, isBlocked: contactInfo.blocked });
    } else {
      setState({ ...state, isBlocked: contactInfo.blocked });
    }
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.primary }}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ backgroundColor: theme.colors.background, flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <StatusBar style="light" backgroundColor='blue' />
        <ExpandedView expanded={state.visible} setSwitch={setSwitch} switchOn={state.switchOn} blockUser={blockUser} unblockUser={unblockUser} isBlocked={state.isBlocked} />
        <View style={{ width: '100%', height: '15%', backgroundColor: theme.colors.primary, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <TouchableOpacity onPress={() => { navigation.goBack(); }}>
            <Icon source="arrow-left" color={theme.colors.onPrimary} size="35%" />
          </TouchableOpacity>
          <TouchableOpacity style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <Avatar.Image size={64} source={{ uri: contactInfo.avatarUrl }} />
            <Text variant="titleLarge" style={{ color: theme.colors.onPrimary, marginLeft: '5%' }}>{contactInfo.name}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setVisible(!state.visible)}>
            <Icon source={state.visible ? "close" : "dots-vertical"} color={theme.colors.onPrimary} size="35%" />
          </TouchableOpacity>
        </View>
        <ScrollView ref={scrollViewRef} style={{ width: '90%', height: '72%' }} contentContainerStyle={{ alignItems: 'center', justifyContent: 'center' }}>
          {
            state.msgsToRender.map((item) => (
              <MessageComponent key={item.id} message={item} itsMe={item.sender === contactInfo.id ? false : true} />
            ))
          }
        </ScrollView>
        <View style={{ width: '100%', height: '13%', flexDirection: "column", alignItems: 'center', justifyContent: "center", display: "flex", backgroundColor: theme.colors.primary }}>
          <View style={{ borderRadius: 10, backgroundColor: "#fff", width: "90%", height: "85%", display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
            <TouchableOpacity style={{ marginLeft: "1%" }} onPress={setmoreOptionsVisible}>
              {state.moreOptionsVisible ? <Icon source="close" color={theme.colors.primary} size="35%" /> : <Icon source="plus" color={theme.colors.primary} size="35%" />}
            </TouchableOpacity>
            <TextInput 
              value={state.isBlocked ? "User is blocked" : state.msg} 
              style={{ width: "70%", backgroundColor: "white" }} 
              onChangeText={txt => setState({ ...state, msg: txt })} 
              placeholder="" 
              multiline={true} 
              disabled={state.isBlocked}
            /> 
            <TouchableOpacity style={{ marginRight: "1%" }} onPress={() => sendMessage(null)}>
              <Icon source="send" color={theme.colors.primary} size="35%" />
            </TouchableOpacity>
          </View>
        </View>
        <MoreOptions expanded={state.moreOptionsVisible} contactInfo={route.params} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}