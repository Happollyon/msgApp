import  React from 'react';
import {useState} from 'react';
import { KeyboardAvoidingView,Platform,SafeAreaView,View} from 'react-native';
import {Text,Button, TextInput,useTheme,Checkbox} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const appConfig = require('../../../appConf.json');
const baseUrlBack = appConfig.baseurlBack;

export default function UpdatePassword() {
    const [state,setState] = useState({
        error:false,
        visible: false,
        password1:"",
        check1:"unchecked",
        check2:"unchecked",
        check3:"unchecked",
        password2:"",
        message:"",
        messageTitle:"",
        modalVisible:false,
    });

    const navigation = useNavigation();

    const UpdatePassword = async()=>{
        const token = await AsyncStorage.getItem('token');
   
        const url =`${baseUrlBack}/user/update-password/${state.password1}`;
        console.log(url);
        
        if(state.password1===state.password2){
            try{
                await fetch(url,{
                    method:'GET',
                    headers:{
                        'Authorization':`Bearer ${token}`
                    }}).then(async(response)=>{
                        if(response.status===200){
                            await response.json().then(async(data)=>{
                                if(!data.error){
                                    console.log("password updated");
                                    navigation.navigate('Profile');
                                }else{
                                    console.log("password not updated");
                                      }
                            }
                        )
                        }else{
                            console.log("error updating password code ",response.status );
                        }
                    })
            }catch(e){
                console.log("error updating password: ",e);
            }
        }
    }
    const passwordSanity=(text)=>{


        setState(prevState => ({...prevState, password1: text}));// Set the password1 to text in the state

        if(state.password1.length>8){ // Check if the password1 is greater than 8
            setState(prevState => ({...prevState,check2:"checked"}))
        }else{ // If the password1 is not greater than 8
            setState(prevState => ({...prevState,check2:"unchecked"}))
        }

        if(state.password1.match(/[A-Z]/)){ // Check if the password1 has a capital letter
            setState(prevState => ({...prevState,check3:"checked"}))
        }else{ // If the password1 does not have a capital letter
            setState(prevState => ({...prevState,check3:"unchecked"}))
        }

        if(state.password1.match(/[0-9]/)){ // Check if the password1 has a number
            setState(prevState => ({...prevState,check1:"checked"}))
        }else{ // If the password1 does not have a number
            setState(prevState => ({...prevState,check1:"unchecked"}))
        }

    }
    return (
        <SafeAreaView style={{flex:1}}>
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{flex:1,justifyContent:'center',padding:20}}>
               
            <TextInput onChangeText={(text)=>{passwordSanity(text)}} error={state.error} left={<TextInput.Icon icon="lock-outline" />}  placeholder="Enter your password" label="Password" style={{width:"80%",marginBottom:"4%"}} mode="outlined" />
            <TextInput onChangeText={(text)=>{setState({...state,password2:text})}} error={state.error} left={<TextInput.Icon icon="lock-outline" />}  placeholder="Confirm your password" label="Confirm" style={{width:"80%", marginBottom:"20%"}} mode="outlined" />
            
                <View style={{display:"flex", flexDirection:"Column", marginBottom:"20%"}}>
                <View style={{display:"flex", flexDirection:"row",alignItems:"center"}}>
                    <Checkbox status={state.check1}/> 
                    <Text variant="titleMedium">Must have numbers</Text>
                </View>
                <View style={{display:"flex", flexDirection:"row",alignItems:"center"}}>
                    <Checkbox status={state.check2}/> 
                    <Text variant="titleMedium">Must be at least 8 Chars long</Text>
                </View>
                <View style={{display:"flex", flexDirection:"row", alignItems:"center"}}>
                    <Checkbox status={state.check3}/> 
                    <Text variant="titleMedium">Must have at least 1 capital letter</Text>
                </View>
            </View>
                <Button mode="contained" onPress={UpdatePassword}>Update</Button>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}