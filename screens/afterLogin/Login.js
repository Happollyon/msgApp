import * as React from 'react';
import { Platform,Image,KeyboardAvoidingView } from 'react-native';
import {useTheme, Text,TextInput,Button} from 'react-native-paper';

export default function Login() {

    const theme = useTheme();
    return(
        <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ backgroundColor: theme.colors.background, flex: 1, alignItems: 'center',justifyContent: 'center'}}>
            <Image style={{marginBottom:"15%"}}source={require('../../assets/logo.png')} />
            <Text variant="displaySmall">Login into</Text>
            <Text variant="displaySmall">your account</Text>     
            <Text variant="titleMedium" style={{marginBottom:"15%"}}>Please, enter your details</Text>      
            <TextInput left={<TextInput.Icon icon="email-outline" />} icon="account-outline" placeholder="Enter your email" label="Email" style={{width:"80%", marginBottom:"2%"}} mode="outlined" />
            <TextInput left={<TextInput.Icon icon="lock-outline" />}  placeholder="Enter your password" label="Password" style={{width:"80%", marginBottom:"20%"}} mode="outlined" />

            <Button dark={true} onPress={() => navigation.navigate('Register')} style={{width:"50%", marginBottom:"2%"}} textColor='#fff' icon="arrow-right-thick" mode='elevated' buttonColor = {theme.colors.primary}>
                Next
            </Button>
        </KeyboardAvoidingView>    
    )
}