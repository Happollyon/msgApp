import React  from 'react';
import { View, KeyboardAvoidingView,Platform,TouchableOpacity,SafeAreaView } from 'react-native';
import { Avatar, Button,useTheme,Text, Divider,Switch, TextInput }from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../../../AuthContext';
import { useContext, useEffect } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons' ;
import { useNavigation } from '@react-navigation/native';

const appConfig = require('../../../appConf.json');
const baseurlBack = appConfig.baseurlBack; 

export default function ProfileScreen() {
    const [switchSound, setSwitchSound] = React.useState(false);
    const [switchVibration, setSwitchVibration] = React.useState();
    const [switchNotifications, setSwitchNotifications] = React.useState();
    const [switchDescription, setswitchDescription] = React.useState();
    const {userInfo,setUserInfo} = useContext(AuthContext);
    const [userInformation, setUserInformation] = React.useState(userInfo);
    
    const { setLoggedIn } = useContext(AuthContext);
    const logout = async () => {
        console.log("logout");
        await AsyncStorage.removeItem('isLoggedIn');
        await AsyncStorage.removeItem('loggedInTime');
        await AsyncStorage.removeItem('token');
        setLoggedIn(false);
    }

    const navigate = useNavigation();
    const [username, setUsername] = React.useState(""); 
    const [description, setDescription] = React.useState("");
    const [toggleUsername, setToggleUsername] = React.useState(false);

    const theme = useTheme();

    const updateDescripton = async (toggle) => {
        const token = await AsyncStorage.getItem('token');
        const url = `${baseurlBack}/user/update-description/${description}`;
          
        if(toggle){
            try{
                await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`}
                    }).then(async (response) =>
                        {
                        if(response.status ===200){
                            await response.json().then((data) => {
                                if(!data.error)
                                {
                                    console.log("updated description ",data);
                                    setUserInfo({...userInfo, description: description});
                                    setswitchDescription(!switchDescription); // Toggle after successful update
                                }else{
                                    console.log("error updating description ",data);
                                }
                            })
                        }else{
                            console.log("error updating description ",response.status);
                        }
            })
            }catch(e){
                console.log("error updating description ",e);
            }
    }else{
        setswitchDescription(!switchDescription); // Toggle after successful update
    }
}

    const updateToggles = async (sound,notification,vibration) => {
        setUserInformation({...userInformation, sound: sound, notification: notification, vibration: vibration});
        try{
            const token = await AsyncStorage.getItem('token');
            const url = `${baseurlBack}/user/update-toggles/${sound}/${notification}/${vibration}`;
            await fetch(url, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }}).then(async (response) =>{
                    if(response.status ===200){
                        await response.json().then((data) => {
                            if(!data.error)
                            {
                                console.log("updated toggles ",data);
                                setUserInfo({...userInfo, sound: sound, notification: notification, vibration: vibration});
                                setUserInformation({...userInformation, sound: sound, notification: notification, vibration: vibration});
                                
                               
                            }else{
                                console.log("error updating toggles ",data);
                            }
                        })
                    }else{
                        console.log("error updating toggles ",response.status);
                    }
                })
        }
        catch(e){
            console.log("error updating toggles ",e);}
        
    }
    
    const updateUsername = async (toggle) => {

        const token = await AsyncStorage.getItem('token');
        const url = `${baseurlBack}/user/update-name/${username}`;
          
        if(toggle){
            try{
                await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`}
                    }).then(async (response) =>
                        {
                        if(response.status ===200){
                            await response.json().then((data) => {
                                if(!data.error)
                                {
                                    console.log("updated name ",data);
                                    setUserInfo({...userInfo, name: username});
                                    setToggleUsername(!toggleUsername); // Toggle after successful update
                                }else{
                                    console.log("error updating name ",data);
                                }
                            })
                        }else{
                            console.log("error updating name ",response.status);
                        }
            })
            }catch(e){
                console.log("error updating name ",e);
            }
    }else{
        setToggleUsername(!toggleUsername); // Toggle after successful update
    }
}
    useEffect(() => {
        setUserInfo(userInfo);
        setUserInformation(userInfo);
        
    }, [userInfo]);
    return (
        <SafeAreaView style={{flex:1,backgroundColor:"transparent"}}>
        <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ backgroundColor: theme.colors.background, flex: 1, alignItems:"flex-start", paddingLeft:"3%", justifyContent: 'space-around'}}>
        {/* user should be able to change avatar and edit user name*/}
        
        <View style={{marginBottom:"3%",display:"flex",flexDirection:"row", justifyContent:"space-around",alignItems:"center"}}>
            
            <View style={{}}>
                <Avatar.Image size={64} source={{uri:userInformation.avatarUrl}} />
                <TouchableOpacity onPress={()=>navigate.navigate('Camera')}style={{position:"absolute",bottom:0,right:0,backgroundColor:"white",borderRadius:50}}><Icon color={theme.colors.secondary} size={20} name="image-edit-outline"/></TouchableOpacity>
            </View>
            {/*when user clicks on icon he should be prompted to enter a new username */}
            <View style={{display:"flex",flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
                {   toggleUsername ?
                    <TextInput onChangeText={(text)=>setUsername(text)} style={{width:"60%"}}/>:
                    <Text variant="titleLarge">{userInformation.name}</Text>

                }
                <TouchableOpacity onPress={()=>updateUsername(toggleUsername)} style={{marginLeft:"5%"}}><Icon size={16} name="circle-edit-outline" /></TouchableOpacity>
    
                
            </View>
           
        </View>
        <Divider style={{width:"90%", marginBottom:"3%"}}/>
        <View style={{display:"flex", backgroundColor:theme.colors.primaryContainer,flexDirection:"row",justifyContent:"space-between",alignItems:"center",height:"10%",width:"80%",}}>
            {
                !switchDescription ?
            <Text variant='bodyMedium' style={{alignSelf:"flex-start", color:theme.colors.onPrimaryContainer,paddingLeft:"2%",paddingTop:"2%",paddingBottom:"2%"}}>{userInformation.description}</Text>
                :
                <TextInput style={{width:"60%"}} onChangeText={(text)=>setDescription(text)}/>
            }
            <TouchableOpacity onPress={()=>updateDescripton(switchDescription)} style={{position:"absolute",right:3,bottom:3}}>
                <Icon name="circle-edit-outline" size={24} color={theme.colors.primary} />
            </TouchableOpacity>
            
        </View>
        <Divider style={{width:"90%", marginBottom:"3%"}}/>
        <Text variant='titleLarge' style={{alignSelf:"flex-start"}}>Disguise</Text>
        <View style={{display:"flex",flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
            <TouchableOpacity >
                <Icon name="calculator-variant" size={50} color={theme.colors.primary}/>
            </TouchableOpacity>
            <TouchableOpacity style={{backgroundColor:theme.colors.primary, height:37,width:37,borderRadius:5,display:"flex",justifyContent:"center",alignItems:"center"}}>
                <Icon name="gamepad" size={35} color={theme.colors.onPrimary}/>
            </TouchableOpacity>
           
        </View>
        <Divider style={{width:"90%", marginBottom:"3%"}}/>
        <Button onPress={()=>navigate.navigate('UpdatePassword')} style={{width:"50%", marginBottom:"2%"}} textColor='#fff' icon="pen" mode='elevated' buttonColor = {theme.colors.primary}>
                Update Password
        </Button>
       <Button onPress={logout} style={{width:"50%", marginBottom:"2%"}} textColor='#fff' icon="clock" mode='elevated' buttonColor = {theme.colors.primary}>
                Logout
        </Button>
        <Divider style={{width:"90%", marginBottom:"3%"}}/>
        
        <View>
            <View style={{display:"flex",flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
                <Text variant="labelLarge">Sound</Text>
                <Switch color="#06D6A0" disabled={false} value={userInformation.sound} onValueChange={()=>updateToggles(!userInformation.sound,userInformation.notification,userInformation.vibration)} />
            </View>
            <View style={{display:"flex",flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
                <Text variant="labelLarge">Notification</Text>
                <Switch color="#06D6A0" style={{marginLeft:"2%"}} disabled={false} value={userInformation.notification} onValueChange={()=>updateToggles(userInformation.sound,!userInformation.notification,userInformation.vibration)} />
            </View>
            <View style={{display:"flex",flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
                <Text variant="labelLarge">Vibration</Text>
                <Switch color="#06D6A0" disabled={false} style={{marginLeft:"2%"}} value={userInformation.vibration} onValueChange={()=>updateToggles(userInformation.sound,userInformation.notification,!userInformation.vibration)} />
            </View>
        
        </View>
        </KeyboardAvoidingView>
        </SafeAreaView>
    );
    }