import { useState } from 'react';
import * as React from 'react';
import { Platform,Image,KeyboardAvoidingView } from 'react-native';
import {useTheme, Text,TextInput,Button,Portal,Modal} from 'react-native-paper';

export default function Login({navigation}) {

    const theme = useTheme();

    const [state, setState] = useState({
        error: false,
        visible: false,
        email: "test@gmail.com",
        password: "test123",
        userEmail: "",
        hideModal: false,
        message: "Please enter your email and password"
    });

    const login = () => {
        console.log("aa");
        if (state.email !== "teswt@gmail.com" || state.password !== "testr123") {
            setState({ ...state, error: true,visible: true});

        } else {
           
        }
    };

    const hideModal = () => {
        console.log("bb");
        setState({ ...state, error: false,visible: false});

        navigation.navigate('Register')
    }
    return(
        <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ backgroundColor: theme.colors.background, flex: 1, alignItems: 'center',justifyContent: 'center'}}>
            <Image style={{marginBottom:"15%"}}source={require('../../assets/logo.png')} />
            <Text variant="displaySmall">Login into</Text>
            <Text variant="displaySmall">your account</Text>     
            <Text variant="titleMedium" style={{marginBottom:"15%"}}>Please, enter your details</Text>      
            <TextInput onChangeText = {(text)=>{setState({...state,userEmail:text})}} error={state.error} left={<TextInput.Icon icon="email-outline" />} icon="account-outline" placeholder="Enter your email" label="Email" style={{width:"80%", marginBottom:"2%"}} mode="outlined" />
            <TextInput left={<TextInput.Icon icon="lock-outline" />}  placeholder="Enter your password" label="Password" style={{width:"80%", marginBottom:"20%"}} mode="outlined" />

            <Button dark={true} onPress={login} style={{width:"50%", marginBottom:"2%"}} textColor='#fff' icon="arrow-right-thick" mode='elevated' buttonColor = {theme.colors.primary}>
                Next
            </Button>


        <Portal>
            <Modal visible={state.visible} onDismiss={hideModal} contentContainerStyle={{backgroundColor: 'white', padding: 20, height:"50%", width:"90%",borderRadius:30,alignSelf:"center"}} >
            <Text>{state.message}</Text>
            </Modal>
      </Portal>
        </KeyboardAvoidingView>    
    )
}