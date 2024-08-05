import * as React from 'react';
import { useRef, useState, useEffect } from 'react';
import { View, SafeAreaView, KeyboardAvoidingView, Platform, TouchableOpacity, ScrollView, Animated } from 'react-native';
import { Text, useTheme, Icon, Avatar, Switch, Button,TextInput} from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import MessageComponent from './MessageComponent';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../../AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
const appConfig = require('../../../appConf.json');
const baseurlBack = appConfig.baseurlBack;

const ExpandedView = ({ expanded,setSwitch, switchOn}) => {
  const animation = useRef(new Animated.Value(0)).current;// Initial value for opacity: 0 (transparent) 
  const theme = useTheme();
  useEffect(() => { // Animation for expanding the view
    Animated.timing(animation, { // Animate over time
      toValue: expanded ? 1 : 0, // Animate to opacity: 1 (opaque)
      duration: 300, // Make it take a while
      useNativeDriver: false, // Add this line to improve performance  on Android and iOS 
    }).start(); // Starts the animation
  }, [expanded]); // Re-run the effect if the expanded state changes

  const height = animation.interpolate({ // Interpolate the height
    inputRange: [0, 1], // Map the input range
    outputRange: [0, 100], // Adjust the value to the desired height
  });

  return (
    <Animated.View style={{ width: '100%', overflow: 'hidden',  height,backgroundColor:theme.colors.primary , display:"flex",flexDirection:"row",justifyContent:"space-around",alignItems:"center"}}>
          <Button  mode="contained" icon="lock" textColor={theme.colors.primary} style={{ backgroundColor:theme.colors.background}} onPress={() => setVisible(false)}>Block</Button>
          <View style={{ display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
            <Text style={{color:theme.colors.onPrimary}}>Disappearing message</Text>
            <Switch color="#06D6A0" disabled={false} value={switchOn} onValueChange={setSwitch} />
          </View>
    </Animated.View>
  );
};


const message = [
  
    {"id":1,"message":"Hello! How are you?","imageLink":null,"time":"1720530597","isMe":true},
    {"id":2,"message":"Hi! I'm good, thanks. How about you?","imageLink":null,"time":"1720530697","isMe":false},
    {"id":3,"message":"I'm doing well, just finished some work.","imageLink":null,"time":"1720530797","isMe":true},
    {"id":4,"message":"That's great to hear! Have any plans for the weekend?","imageLink":null,"time":"1720530897","isMe":false},
    {"id":5,"message":"Not really, just planning to relax and maybe catch up on some reading.","imageLink":null,"time":"1720530997","isMe":true},
    {"id":6,"message":"That sounds like a good idea. Any books you're particularly excited about?","imageLink":null,"time":"1720531097","isMe":false},
    {"id":7,"message":"Yes, I've been meaning to start 'The Great Gatsby' for a while now.","imageLink":null,"time":"1720531197","isMe":true},
    {"id":8,"message":"Oh, that's a classic! You'll enjoy it for sure.","imageLink":null,"time":"1720531297","isMe":false},
    {"id":9,"message":"I hope so! Have you read it?","imageLink":null,"time":"1720531397","isMe":true},
    {"id":10,"message":"Yes, a few years ago. The writing is beautiful and the story is captivating.","imageLink":null,"time":"1720531497","isMe":false},
    {"id":11,"message":"I'm looking forward to it then. Thanks for the recommendation!","imageLink":null,"time":"1720531597","isMe":true},
    {"id":12,"message":"You're welcome! If you like it, you should also check out 'To Kill a Mockingbird'.You're welcome! If you like it, you should also check out 'To Kill a Mockingbird'.You're welcome! If you like it, you should also check out 'To Kill a Mockingbird'.You're welcome! If you like it, you should also check out 'To Kill a Mockingbird'.You're welcome! If you like it, you should also check out 'To Kill a Mockingbird'.","imageLink":null,"time":"1720531697","isMe":false},
    {"id":13,"message":"I've heard a lot about that one too. It's on my list!","imageLink":null,"time":"1720531797","isMe":true},
    {"id":14,"message":"Great! Happy reading!","imageLink":null,"time":"1720531897","isMe":false},
    {"id":15,"message":"","imageLink":"https://ichef.bbci.co.uk/news/976/cpsprodpb/174CE/production/_121483459_petportraitsgettyimages-1205315613.jpg.webp","time":"1720531997","isMe":true},
    {"id":16,"message":"Sure, have a good one!","imageLink":null,"time":"1720532097","isMe":false},
    {"id":17,"message":"Hey, did you see the game last night?","imageLink":null,"time":"1720532197","isMe":true},
    {"id":18,"message":"Yes, it was incredible! That last-minute goal was insane.","imageLink":null,"time":"1720532297","isMe":false},
    {"id":19,"message":"I know, right? I couldn't believe it!","imageLink":null,"time":"1720532397","isMe":true},
    {"id":20,"message":"Same here. It was one of the best games I've seen in a while.","imageLink":null,"time":"1720532497","isMe":false},
    {"id":21,"message":"Definitely! We should watch the next match together.","imageLink":null,"time":"1720532597","isMe":true},
    {"id":22,"message":"Sounds like a plan!","imageLink":null,"time":"1720532697","isMe":false}
  
  

];
const MoreOptions = ({expanded}) => {
  const navigation = useNavigation();
  const animation = useRef(new Animated.Value(0)).current;// Initial value for opacity: 0 (transparent) 
  const theme = useTheme();
  useEffect(() => { // Animation for expanding the view
    Animated.timing(animation, { // Animate over time
      toValue: expanded ? 1 : 0, // Animate to opacity: 1 (opaque)
      duration: 300, // Make it take a while
      useNativeDriver: false, // Add this line to improve performance  on Android and iOS 
    }).start(); // Starts the animation
  }, [expanded]); // Re-run the effect if the expanded state changes

  const height = animation.interpolate({ // Interpolate the height
    inputRange: [0, 1], // Map the input range
    outputRange: [0, 100], // Adjust the value to the desired height
  });

  return (
    <Animated.View style={{ width: '100%', overflow: 'hidden',  height,backgroundColor:theme.colors.primary , display:"flex",flexDirection:"row",justifyContent:"space-around",alignItems:"center"}}>
          <TouchableOpacity>
            <Icon source="camera" color={theme.colors.onPrimary} size="35%" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon source="image" color={theme.colors.onPrimary} size="35%" />
          </TouchableOpacity>
    </Animated.View>
  );
};

export default function ChatComponent({route} ) {
   const {socket} = React.useContext(AuthContext);
  const navigation = useNavigation();
  const {contactInfo} = route.params;
  const theme = useTheme();
  const [state, setState] = useState({
    visible: false,
    switchOn: false,
    moreOptionsVisible:false,
    msg:'',
    msgsToRender: []
  });
  const {userInfo, setUserInfo} = React.useContext(AuthContext);
  const {chats, setChats} = React.useContext(AuthContext);

  const setVisible = (visible) => {
    setState({ ...state, visible });
  };

  const setSwitch = () => {
    setState({ ...state, switchOn: !state.switchOn });
  };
  
  const setmoreOptionsVisible = () => {
    setState({ ...state, moreOptionsVisible: !state.moreOptionsVisible });
  }

  const sendMessage = async () => {
    const input = state.msg;
    const token = await AsyncStorage.getItem('token');
    const message = {
      type: 'message',
      token:token,
      delivered: false,
      read: false,
      msgObj: {
        message: input,
        sender: userInfo.id,
        receiver: contactInfo.id,
        imageLink: null
      }
    }
    console.log(input);
    if (input && socket) {
        console.log('Sending message:', input);
        socket.send(JSON.stringify(message));
        //const finalMessage = {...message.msgObj, msgTimestamp: new Date().getTime(),delivered:false,read:false};
        //setState({ ...state, msgsToRender: [...state.msgsToRender, finalMessage] });
        setState({ ...state, msg: '' });
       
    }
};
function findChatByOtherUserId() {
  for (let chat of chats) {
    if (chat.otherUser.id === contactInfo.id) {
      return chat;
    }
  }
  return null;
}
// create the scroll view ref
const scrollViewRef = useRef();
  useEffect(() => {
    scrollViewRef.current.scrollToEnd({ animated: true });
  }, [state.msgsToRender]);
  useEffect(() => {
 
    const chat = findChatByOtherUserId();
    setState({ ...state, msgsToRender: chat.messages });
    
   
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
        if(response.status === 200){
          response.json().then(async data => {
            if(!data.error){
                console.log("Messages fetched successfully:",data.data);
              data.data.forEach(async (msg) => {
                
                if (msg.receiver === userInfo.id && !msg.read) {
                  await fetch(`${baseurlBack}/messages/read/${msg.id}`, {
                    method: 'GET',
                    headers: {
                      'Authorization': `Bearer ${token}`
                    }
                  }).then(async response => {
                    if(response.status === 200){
                      console.log("Message read successfully");
                    }else{
                      console.log("Error reading message code:",response.status);
                    }
                  });
                }
              });
            }else{
              console.log("Error fetching messages");
            }
            
          });
        }else{
          console.log("Error fetching messages code:",response.status);
        }
      });
     
      setState({ ...state, msgsToRender: data });

     
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  //fetchMessages();
}, []);


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor:theme.colors.primary }}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ backgroundColor: theme.colors.background, flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <StatusBar style="light" backgroundColor='blue' />
        <ExpandedView expanded={state.visible} setSwitch={setSwitch} switchOn={state.switchOn}/>
        <View style={{ width: '100%', height: '15%', backgroundColor: theme.colors.primary, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <TouchableOpacity onPress={() => { navigation.goBack(); }}>
            <Icon source="arrow-left" color={theme.colors.onPrimary} size="35%" />
          </TouchableOpacity>
          <TouchableOpacity style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <Avatar.Image size={64} source={{ uri: contactInfo.avatarUrl }} />
            <Text variant="titleLarge" style={{ color: theme.colors.onPrimary, marginLeft: '5%' }}>{contactInfo.name}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setVisible(!state.visible)}>
            <Icon source={state.visible?"close":"dots-vertical"}color={theme.colors.onPrimary} size="35%" />
          </TouchableOpacity>
        </View>
        
        <ScrollView ref={scrollViewRef} style={{ width: '90%', height: '72%'}} contentContainerStyle={{  alignItems: 'center', justifyContent: 'center' }}>
          {
            state.msgsToRender.map((item) => (
              <MessageComponent key={item.id} message={item} itsMe={item.sender===contactInfo.id?false:true} />
            ))
          }
        </ScrollView>

       
        <View style={{ width: '100%', height: '13%',flexDirection:"column",alignItems:'center',justifyContent:"center",display:"flex",backgroundColor: theme.colors.primary}}>
            <View style={{borderRadius:10,backgroundColor:"#fff",width:"90%",height:"85%",display:"flex",flexDirection:"row", justifyContent:"space-between", alignItems:"center"}}>
              <TouchableOpacity style={{marginLeft:"1%"}} onPress={setmoreOptionsVisible}>
                <Icon source="plus" color={theme.colors.primary} size="35%" />
              </TouchableOpacity>
              <TextInput value={state.msg} style={{width:"70%",backgroundColor:"white"}} onChangeText={txt => setState({...state,msg:txt})} placeholder="" multiline={true} />
              <TouchableOpacity style={{marginRight:"1%"}} onPress={sendMessage}>
                <Icon source="send" color={theme.colors.primary} size="35%" />
              </TouchableOpacity>
            </View>
        </View>
        <MoreOptions expanded={state.moreOptionsVisible} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
