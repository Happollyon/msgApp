import React  from 'react';
import { View, KeyboardAvoidingView,Platform,TouchableOpacity,SafeAreaView } from 'react-native';
import { Avatar, Button,useTheme,Text, Divider,Switch, TextInput }from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../../../AuthContext';
import { useContext } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons' ;

export default function ProfileScreen() {
    const [switchSound, setSwitchSound] = React.useState(false);
    const [switchVibration, setSwitchVibration] = React.useState(false);
    const [switchNotifications, setSwitchNotifications] = React.useState(false);
    const [switchDescription, setswitchDescription] = React.useState(false);

    
    const { setLoggedIn } = useContext(AuthContext);
    const logout = async () => {
        console.log("logout");
        await AsyncStorage.removeItem('isLoggedIn');
        await AsyncStorage.removeItem('loggedInTime');
        await AsyncStorage.removeItem('token');
        setLoggedIn(false);
    }
    const [username, setUsername] = React.useState("Fagner Nunes"); 
    const [toggleUsername, setToggleUsername] = React.useState(false);
    const theme = useTheme();
    return (
        <SafeAreaView style={{flex:1,backgroundColor:"transparent"}}>
        <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ backgroundColor: theme.colors.background, flex: 1, alignItems:"flex-start", paddingLeft:"3%", justifyContent: 'space-around'}}>
        {/* user should be able to change avatar and edit user name*/}
        
        <View style={{marginBottom:"3%",display:"flex",flexDirection:"row", justifyContent:"space-around",alignItems:"center"}}>
            
            <View style={{}}>
                <Avatar.Image size={64} source={{uri:"https://news.uchicago.edu/sites/default/files/styles/square_feature/public/images/2023-10/Adam-Mastroianni-square.jpg?h=daa376fd&itok=YR0-YXHv"}} />
                <TouchableOpacity style={{position:"absolute",bottom:0,right:0,backgroundColor:"white",borderRadius:50}}><Icon color={theme.colors.secondary} size={20} name="image-edit-outline"/></TouchableOpacity>
            </View>
            {/*when user clicks on icon he should be prompted to enter a new username */}
            <View style={{display:"flex",flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
                {   toggleUsername ?
                    <TextInput style={{width:"60%"}}/>:
                    <Text variant="titleLarge"> Fagner Nunes </Text>

                }
                <TouchableOpacity onPress={()=>setToggleUsername(!toggleUsername)}><Icon name="circle-edit-outline" /></TouchableOpacity>
    
                
            </View>
           
        </View>
        <Divider style={{width:"90%", marginBottom:"3%"}}/>
        <View style={{display:"flex", backgroundColor:theme.colors.primaryContainer,flexDirection:"row",justifyContent:"space-between",alignItems:"center",height:"10%",width:"80%",}}>
            {
                !switchDescription ?
            <Text variant='bodyMedium' style={{alignSelf:"flex-start", color:theme.colors.onPrimaryContainer,paddingLeft:"2%",paddingTop:"2%",paddingBottom:"2%"}}>Software Eng and tennis player</Text>
                :
                <TextInput style={{width:"60%"}}/>
            }
            <TouchableOpacity onPress={()=>setswitchDescription(!switchDescription)} style={{position:"absolute",right:3,bottom:3}}>
                <Icon name="circle-edit-outline" size={15} color={theme.colors.primary} />
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
        <Button onPress={logout} style={{width:"50%", marginBottom:"2%"}} textColor='#fff' icon="pen" mode='elevated' buttonColor = {theme.colors.primary}>
                Update Password
        </Button>
       <Button onPress={logout} style={{width:"50%", marginBottom:"2%"}} textColor='#fff' icon="clock" mode='elevated' buttonColor = {theme.colors.primary}>
                Logout
        </Button>
        <Divider style={{width:"90%", marginBottom:"3%"}}/>
        
        <View>
            <View style={{display:"flex",flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
                <Text variant="labelLarge">Sound</Text>
                <Switch color="#06D6A0" disabled={false} value={switchSound} onValueChange={setSwitchSound} />
            </View>
            <View style={{display:"flex",flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
                <Text variant="labelLarge">Notification</Text>
                <Switch color="#06D6A0" style={{marginLeft:"2%"}} disabled={false} value={switchNotifications} onValueChange={setSwitchNotifications} />
            </View>
            <View style={{display:"flex",flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
                <Text variant="labelLarge">Vibration</Text>
                <Switch color="#06D6A0" disabled={false} style={{marginLeft:"2%"}} value={switchVibration} onValueChange={setSwitchVibration} />
            </View>
        
        </View>
        </KeyboardAvoidingView>
        </SafeAreaView>
    );
    }