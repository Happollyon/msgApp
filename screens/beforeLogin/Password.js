import * as React from 'react';
import { useState,setState} from 'react';
import { View } from 'react-native';
import { Platform,Image,KeyboardAvoidingView } from 'react-native';
import {useTheme,Checkbox, Text,TextInput,Button,Portal} from 'react-native-paper';
import ModalComp from '../ModalComp';
import AsyncStorage from '@react-native-async-storage/async-storage';



const appConfig = require('../../appConf.json');
const baseurlBack = appConfig.baseurlBack;

/**
 * Password component.
 * @module screens/beforeLogin/Password
 * @description This is the Password component. It is the screen where the user can enter a password that follows the secure passoword gideline.
 *
 *@param {Object} props - Component props.
 *@param {Object} props.navigation - Navigation object from react-navigation. 
 *@returns {React.Element} Rendered component.
 */ 

export default function Password({navigation}) {
    const theme = useTheme();

    /**
     * State for the component.
     * @type {Object}
     * @property {boolean} error - The error state. this state is used by the TextInput component to show the error.
     * @property {boolean} visible - The visible state. this state is used by the Modal component to show the modal.
     * @property {string} password1 - The password1 state. this state is used to store the password that the user typed.
     * @property {string} check1 - The check1 state. this state is used to show the checkbox.
     * @property {string} check2 - The check2 state. this state is used to show the checkbox.
     * @property {string} check3 - The check3 state. this state is used to show the checkbox.
     * @property {string} password2 - The password2 state. this state is used to store the password that the user typed.
     * 
     */
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

    /**
     * Function to check the password.
     * @function passwordSanity
     * @description This function is used to check the password. It is used to check if the password has at least 1 number, 1 capital letter and is at least 8 chars long. 
     * @param {string} text - The text that the user typed.
     * @returns {void} This function does not return anything.
    */
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


   const  setPassword=  async () => {
        let message = "";
        let messageTitle = "";
        let modalVisible = false;
    
        if(state.password1===state.password2 && state.check1==="checked" && state.check2==="checked" && state.check3==="checked"){

           
        const token = await AsyncStorage.getItem('token'); // Get the token from the AsyncStorage
        
        console.log("setPassword",token)
        const url = `${baseurlBack}/register/password/${state.password1}`; // Set the url to the backend
        
       await fetch(url, { 
            method:'GET',
            headers: {'Authorization': `Bearer ${token}`}

        }).then(async response => {
            console.log(response.status)
            if(response.status===200){
                await response.json().then( data => {
                    if(data.error){
                        message = data.errorMessage;
                        messageTitle = "Error";
                        modalVisible = true;
                    }else{
                        console.log("before navigate",data)
                        //navigation.navigate('EmailVerification');
                    }
                })
            }else{
                message = "An error occurred. Try again.";
                messageTitle = "Error";
                modalVisible = true;
            }
        });
        
        }else{
            message = "The passwords do not match";
            messageTitle = "Error";
            modalVisible = true;
        }
        setState({...state,message:message,messageTitle:messageTitle,modalVisible:modalVisible})
   
    }
    return (
        <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ backgroundColor: theme.colors.background, flex: 1, alignItems: 'center',justifyContent: 'center'}}>
            
            <Image style={{marginBottom:"15%"}}source={require('../../assets/logo.png')} />   
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

            <Button onPress={setPassword} style={{width:"50%", marginBottom:"2%"}} textColor='#fff' icon="arrow-right-thick" mode='elevated' buttonColor = {theme.colors.primary}>
                Next
            </Button>

            <Portal>
            <ModalComp
                Title={state.messageTitle}
                Message={state.message}
                getVisible={() => state.modalVisible}
                onHide={() => setState({ ...state, modalVisible: false })}
                />  
            </Portal>
        </KeyboardAvoidingView>    
    )
}