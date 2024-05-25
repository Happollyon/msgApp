import * as React from 'react';
import { useState,setState} from 'react';
import { View } from 'react-native';
import { Platform,Image,KeyboardAvoidingView } from 'react-native';
import {useTheme,Checkbox, Text,TextInput,Button} from 'react-native-paper';

export default function Password({navigation}) {
    const theme = useTheme();
    const [state,setState] = useState({
        error:false,
        visible: false,
        password1:"",
        check1:"unchecked",
        check2:"unchecked",
        check3:"unchecked",
        password2:""
    });

    const passwordSanity=(text)=>{
        setState(prevState => ({...prevState, password1: text}));

        console.log("TEXT "+text)
        if(state.password1.length>8){
            setState(prevState => ({...prevState,check2:"checked"}))
        }else{
            setState(prevState => ({...prevState,check2:"unchecked"}))
        }

        if(state.password1.match(/[A-Z]/)){
            setState(prevState => ({...prevState,check3:"checked"}))
        }else{
            setState(prevState => ({...prevState,check3:"unchecked"}))
        }

        if(state.password1.match(/[0-9]/)){
            setState(prevState => ({...prevState,check1:"checked"}))
        }else{
            setState(prevState => ({...prevState,check1:"unchecked"}))
        }
        console.log("STATE "+ state.password1)
    }

    const hideModal = () => {
        setState({...state,visible:false})
    }
    return (
        <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ backgroundColor: theme.colors.background, flex: 1, alignItems: 'center',justifyContent: 'center'}}>
            
            <Image style={{marginBottom:"15%"}}source={require('../../assets/logo.png')} />   
            <TextInput onChangeText={(text)=>{passwordSanity(text)}} error={state.error} left={<TextInput.Icon icon="lock-outline" />}  placeholder="Enter your password" label="Password" style={{width:"80%",marginBottom:"4%"}} mode="outlined" />
            <TextInput error={state.error} left={<TextInput.Icon icon="lock-outline" />}  placeholder="Confirm your password" label="Confirm" style={{width:"80%", marginBottom:"20%"}} mode="outlined" />
            
            
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

            <Button onPress={() => navigation.navigate('Password')} style={{width:"50%", marginBottom:"2%"}} textColor='#fff' icon="arrow-right-thick" mode='elevated' buttonColor = {theme.colors.primary}>
                Next
            </Button>
        </KeyboardAvoidingView>    
    )
}