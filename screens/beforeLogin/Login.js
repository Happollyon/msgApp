import { useState } from 'react';
import * as React from 'react';
import { Platform,Image,KeyboardAvoidingView } from 'react-native';
import {useTheme, Text,TextInput,Button,Portal,Modal} from 'react-native-paper';

import ModalComp from '../ModalComp';
 
/**
 * Login component.
 * @module screens/beforeLogin/Login
 * @description This is the Login component. It is the screen where the user can login into the app.
 * @author Fagmer Nunes
 * 
 * @param {Object} props - Component props.
 * @param {Object} props.navigation - Navigation object from react-navigation.
 * @returns {React.Element} Rendered component.
 */

export default function Login({navigation}) {

    const theme = useTheme();

     /**
     * State for the component.
     * @type {Object}
     * @property {boolean} error - The error state. this state is used by the TextInput component to show the error.
     * @property {boolean} visible - The visible state. this state is used by the Modal component to show the modal.
     * @property {string} userEmail - The userEmail state. this state is used to store the email that the user typed.
     * @property {string} userPassword - The userPassword state. this state is used to store the password that the user typed.
     * @property {boolean} hideModal - The hideModal state. this state is used to hide the modal.
     * @property {string} message - The message state. this state is used to show the message in the modal.
     */
    const [state, setState] = useState({
        error: false,
        visible: false,
        email: "fagner",
        password: "fagner",
        userEmail: "",
        userPassword: "",
        hideModal: false,
        message: "Please enter your email and password"
    });

    /**
     * Function to login.
     * @function login
     * @description This function is used to login into the app.
     * @returns {void} This function does not return anything.
     * 
     */
    const login = () => {
        // Check if the email and password are correct
        if (state.email == state.userEmail && state.password == state.userPassword) {
            setState({ ...state, error: false}); // Set the error to false
            navigation.navigate('Register') // Navigate to the Register screen

        } else {// If the email and password are incorrect
            setState({ ...state, error: true,visible: true});// Set the error to true
        }
    };

     /**
     * Function to hide the modal.
     * @function hideModal
     * @description This function is used to hide the modal.
     * @returns {void} This function does not return anything.
     * 
     */
    const hideModal = () => { // Function to hide the modal
       
        setState({ ...state, visible: false}); // Set the visible to false
    }
    return(
        <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ backgroundColor: theme.colors.background, flex: 1, alignItems: 'center',justifyContent: 'center'}}>
            <Image style={{marginBottom:"15%"}}source={require('../../assets/logo.png')} />
            <Text variant="displaySmall">Login into</Text>
            <Text variant="displaySmall">your account</Text>     
            <Text variant="titleMedium" style={{marginBottom:"15%"}}>Please, enter your details</Text>      
            <TextInput onChangeText = {(text)=>{setState({...state,userEmail:text})}} error={state.error} left={<TextInput.Icon icon="email-outline" />} icon="account-outline" placeholder="Enter your email" label="Email" style={{width:"80%", marginBottom:"2%"}} mode="outlined" />
            <TextInput onChange={((text)=>{setState({...state,userPassword:text})})}  error={state.error} left={<TextInput.Icon icon="lock-outline" />}  placeholder="Enter your password" label="Password" style={{width:"80%", marginBottom:"20%"}} mode="outlined" />

            <Button dark={true} onPress={login} style={{width:"50%", marginBottom:"2%"}} textColor='#fff' icon="arrow-right-thick" mode='elevated' buttonColor = {theme.colors.primary}>
                Next
            </Button>

            <ModalComp Title="Error" Message="Please enter your email and password"/>
        
            <Portal>
                <Modal visible={state.visible} onDismiss={hideModal} contentContainerStyle={{backgroundColor: 'white', padding: 20, height:"50%", width:"90%",borderRadius:30,alignSelf:"center",display:"flex",justifyContent:"center",alignItems:"center"}} >
                    <Text variant="headlineLarge" style={{marginBottom:"15%"}}>2 Steps Verification</Text>
                    <Text variant="titleMedium" style={{marginBottom:"15%"}}>Enter the code below</Text>
                    <Text variant="titleMedium" style={{marginBottom:"15%"}}>in the verification app</Text>   
                    <Text variant="displaySmall" style={{marginBottom:"15%"}}>55</Text>     
                </Modal>
            </Portal>
        </KeyboardAvoidingView>    
    )
}