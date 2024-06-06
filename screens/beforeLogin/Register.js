import * as React from 'react';
import { useState } from 'react';
import { Platform,Image,KeyboardAvoidingView } from 'react-native';
import { useTheme, Text,TextInput,Button} from 'react-native-paper';
import ModalComp from '../ModalComp';


export default function Register({navigation}) {
  const theme = useTheme();
  const [state,setState] = useState({
    name:"",
    email:"",
    nameerror:false,
    emailerror:false,
    message:"",
    modalVisible:false,
  });

  const handleNameChange = (name) => {
    setState({...state,name:name})
  }
  const handleEmailChange = (email) => {
    setState({...state,email:email})
  }

  const submitNameEmail = () => {
    let nameError = false;
    let emailError = false;
    let message = "";
    let modalVisible = false;
  
    if(state.name == ""){
      nameError = true;

    }
    if(state.email == ""){
      emailError = true;
    }
    // check if email follows the email pattern
    if(!state.email.includes('@') || !state.email.includes('.')){
      emailError = true;
      message = "Please enter a valid email";
      modalVisible = true;

    }
    if(state.name != "" && state.email != "" && !emailError && !nameError){
      navigation.navigate('Password');
    }
  
    setState({...state, nameerror: nameError, emailerror: emailError, message: message,modalVisible: modalVisible});
    console.log(state);
  }
  
  return (
    <KeyboardAvoidingView
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ backgroundColor: theme.colors.surface, flex: 1, alignItems: 'center',justifyContent: 'center'}}>
      <Image style={{marginBottom:"15%"}}source={require('../../assets/logo.png')} />
      <Text variant="displaySmall">Create an account</Text>    
      <Text variant="titleMedium" style={{marginBottom:"5%"}}>Welcome! Please enter your details. </Text>
     
      <TextInput error={state.nameerror} left={<TextInput.Icon  icon="account-outline" />} icon="account-outline" placeholder="Enter your name" label="Name" style={{width:"80%", marginBottom:"2%"}} mode="outlined" />
      <TextInput error={state.emailerror} left={<TextInput.Icon  icon="email-outline" />}  placeholder="Enter your email" label="Email" style={{width:"80%", marginBottom:"20%"}} mode="outlined" />

      <Button onPress={submitNameEmail} style={{width:"50%", marginBottom:"2%"}} textColor='#fff' icon="arrow-right-thick" mode='elevated' buttonColor = {theme.colors.primary}>
        Next
      </Button>

      <ModalComp getVisible={() => state.modalVisible} Title="Error" Message="Please enter your email and password"/>
        
    </KeyboardAvoidingView>
  );
}
