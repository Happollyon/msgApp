import { useState } from 'react';
import * as React from 'react';
import { Platform,Image,KeyboardAvoidingView } from 'react-native';
import {useTheme, Text,TextInput,Button,Portal,Modal} from 'react-native-paper';

export default function Login({navigation}) {

    const theme = useTheme();

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

    // Function to login
    const login = () => {
        // Check if the email and password are correct
        if (state.email == state.userEmail && state.password == state.userPassword) {
            setState({ ...state, error: false}); // Set the error to false
            navigation.navigate('Register') // Navigate to the Register screen

        } else {// If the email and password are incorrect
            setState({ ...state, error: true,visible: true});// Set the error to true
        }
    };

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


        <Portal>
            <Modal visible={state.visible} onDismiss={hideModal} contentContainerStyle={{backgroundColor: 'white', padding: 20, height:"50%", width:"90%",borderRadius:30,alignSelf:"center",display:"flex",justifyContent:"center",alignItems:"center"}} >
            <Text variant="displaySmall" style={{marginBottom:"15%"}}>Error</Text>
            <Text variant="titleMedium" style={{marginBottom:"15%"}}>{state.message}</Text>     
            </Modal>
      </Portal>
      <Portal>
            <Modal visible={"visible"} onDismiss={hideModal} contentContainerStyle={{backgroundColor: 'white', padding: 20, height:"50%", width:"90%",borderRadius:30,alignSelf:"center",display:"flex",justifyContent:"center",alignItems:"center"}} >
                <Text variant="headlineLarge" style={{marginBottom:"15%"}}>2 Steps Verification</Text>
                <Text variant="titleMedium" style={{marginBottom:"15%"}}>Enter the code below</Text>
                <Text variant="titleMedium" style={{marginBottom:"15%"}}>in the verification app</Text>   
                <Text variant="displaySmall" style={{marginBottom:"15%"}}>55</Text>     
            </Modal>
      </Portal>
        </KeyboardAvoidingView>    
    )
}