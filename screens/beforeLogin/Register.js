import * as React from 'react';
import { useState } from 'react';
import { Platform,Image,KeyboardAvoidingView } from 'react-native';
import { useTheme, Text,TextInput,Button} from 'react-native-paper';
import ModalComp from '../ModalComp';
const appConfig = require('../../appConf.json');
const baseurlBack = appConfig.baseurlBack;

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

  const submitNameEmail = async () => {
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
      const url = `${baseurlBack}/register/name-email/${encodeURIComponent(state.name)}/${encodeURIComponent(state.email)}`;
      console.log("Fetching URL:", url);
      try {
        const response = await fetch(url);
        console.log("Response:", response);
        console.log("Response status:", response.status);
       

        if (response.status == 200) {
          console.log("success");
          const data = await response.json();
          navigation.navigate('Password');
        } else {
          console.log("error");
          // Update the message and modalVisible based on the error
          message = "Registration failed. Please try again.";
          modalVisible = true;
        }
      } catch (error) {
        console.error("Fetch error:", error);
        message = "Network error. Please try again.";
        modalVisible = true;
      }
      
      
    }
  
    setState({...state, nameerror: nameError, emailerror: emailError, message: message,modalVisible: modalVisible});
   
  }
  
  return (
    <KeyboardAvoidingView
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ backgroundColor: theme.colors.surface, flex: 1, alignItems: 'center',justifyContent: 'center'}}>
      <Image style={{marginBottom:"15%"}}source={require('../../assets/logo.png')} />
      <Text variant="displaySmall">Create an account</Text>    
      <Text variant="titleMedium" style={{marginBottom:"5%"}}>Welcome! Please enter your details. </Text>
     
      <TextInput onChangeText={(text)=>{setState({...state,name:text})}} error={state.nameerror} left={<TextInput.Icon  icon="account-outline" />} icon="account-outline" placeholder="Enter your name" label="Name" style={{width:"80%", marginBottom:"2%"}} mode="outlined" />
      <TextInput onChangeText={(text)=>{setState({...state,email:text})}} error={state.emailerror} left={<TextInput.Icon  icon="email-outline" />}  placeholder="Enter your email" label="Email" style={{width:"80%", marginBottom:"20%"}} mode="outlined" />

      <Button onPress={submitNameEmail} style={{width:"50%", marginBottom:"2%"}} textColor='#fff' icon="arrow-right-thick" mode='elevated' buttonColor = {theme.colors.primary}>
        Next
      </Button>

      <ModalComp
  Title="Example Title"
  Message="This is an example message."
  getVisible={() => state.modalVisible}
  onHide={() => setState({ modalVisible: false })}
/>  
    </KeyboardAvoidingView>
  );
}
