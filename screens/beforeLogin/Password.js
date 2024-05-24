import * as React from 'react';
import { View } from 'react-native';
import { Platform,Image,KeyboardAvoidingView } from 'react-native';
import {useTheme,Checkbox, Text,TextInput,Button} from 'react-native-paper';

export default function Password({navigation}) {
    const theme = useTheme();
    return (
        <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ backgroundColor: theme.colors.background, flex: 1, alignItems: 'center',justifyContent: 'center'}}>
            
            <Image style={{marginBottom:"15%"}}source={require('../../assets/logo.png')} />   
            <TextInput error="true" left={<TextInput.Icon icon="lock-outline" />}  placeholder="Enter your password" label="Password" style={{width:"80%",marginBottom:"4%"}} mode="outlined" />
            <TextInput error="true" left={<TextInput.Icon icon="lock-outline" />}  placeholder="Confirm your password" label="Confirm" style={{width:"80%", marginBottom:"20%"}} mode="outlined" />
            
            
            <View style={{display:"flex", flexDirection:"Column", marginBottom:"20%"}}>
                <View style={{display:"flex", flexDirection:"row",alignItems:"center"}}>
                    <Checkbox status="checked"/> 
                    <Text variant="titleMedium">Must have numbers</Text>
                </View>
                <View style={{display:"flex", flexDirection:"row",alignItems:"center"}}>
                    <Checkbox status="checked"/> 
                    <Text variant="titleMedium">Must be at least 8 Chars long</Text>
                </View>
                <View style={{display:"flex", flexDirection:"row", alignItems:"center"}}>
                    <Checkbox status="checked"/> 
                    <Text variant="titleMedium">Must have at least 1 capital letter</Text>
                </View>
            </View>

            <Button onPress={() => navigation.navigate('Password')} style={{width:"50%", marginBottom:"2%"}} textColor='#fff' icon="arrow-right-thick" mode='elevated' buttonColor = {theme.colors.primary}>
                Next
            </Button>
        </KeyboardAvoidingView>    
    )
}