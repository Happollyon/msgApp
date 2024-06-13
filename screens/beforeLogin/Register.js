import * as React from 'react';
import { useState } from 'react';
import { Platform,Image,KeyboardAvoidingView } from 'react-native';
import { useTheme, Text,TextInput,Button} from 'react-native-paper';
import ModalComp from '../ModalComp';
import AsyncStorage from '@react-native-async-storage/async-storage';


const appConfig = require('../../appConf.json');
const baseurlBack = appConfig.baseurlBack;

/**
 * 
 *@module screens/beforeLogin/Register
 *@description This is the Register component. It is the screen where the user begin the registration flow into the app.
 *@author Fagner Nunes
 *
 *@param {Object} props - Component props.
 *@param {Object} props.navigation - Navigation object from react-navigation.
 *@returns {React.Element} Rendered component. 
 */

export default function Register({navigation}) {
  const theme = useTheme();

  /**
   * State for the component.
   * @type {Object}
   * @property {string} name - The name state. this state is used to store the name that the user typed.
   * @property {string} email - The email state. this state is used to store the email that the user typed.
   * @property {boolean} nameerror - The nameerror state. this state is used by the TextInput component to show the error.
   * @property {boolean} emailerror - The emailerror state. this state is used by the TextInput component to show the error.
   * @property {string} message - The message state. this state is used to show the message in the modal.
   * @property {boolean} modalVisible - The modalVisible state. this state is used to show the modal.
   * 
   */
  const [state,setState] = useState({
    name:"",
    email:"",
    nameerror:false,
    emailerror:false,
    message:"",
    messageTitle:"",
    modalVisible:false,
  });



  /**
   * @function handleNameChange
   * @description This function is used to handle the name change.
   * @param {string} name - The name to be updated.
   * @returns {void} This function does not return anything.
   */
  const handleNameChange = (name) => {
    setState({...state,name:name})
  }

  /**
   * @function handleEmailChange
   * @description This function is used to handle the email change.
   * @param {string} email - The email to be updated.
   * @returns {void} This function does not return anything.
   */
  // Function to handle the email change
  const handleEmailChange = (email) => {
    setState({...state,email:email})
  }

  /**
   * @function submitNameEmail
   * @description This function is used to submit the name and email to the server and navigate to the code screen. It also validates the name and email.
   * @returns {void} This function does not return anything.
   * 
   */
  const submitNameEmail = async () => {
    //initialize the variables
    let nameError = false;
    let emailError = false;
    let message = "";
    let messageTitle = "";
    let modalVisible = false;
  
    if(state.name == ""){ // check if the name is empty
      nameError = true;
    }
    if(state.email == ""){// check if the email is empty
      emailError = true;
    }
    // check if email follows the email pattern and update the emailError,message and modalvisible variable
    if(!state.email.includes('@') || !state.email.includes('.')){
      emailError = true;
      message = "Please enter a valid email";
      modalVisible = true;
    }
    if(state.name != "" && state.email != "" && !emailError && !nameError){ // if the name and email are not empty and the email is valid
      // Fetch the URL
      const url = `${baseurlBack}/register/name-email/${encodeURIComponent(state.name)}/${encodeURIComponent(state.email)}`;
      
      try {
        const response = await fetch(url); // Fetch the URL

        if (response.status == 200) { // If the response status is 200 (OK)
         await response.json().then(async (data) => {
            console.log("Data:", data); 
            if(!data.error){

              // save token here to  with user id JWT
              await AsyncStorage.setItem('stoken', data.token);
              navigation.navigate('EmailVerification');
            }else{
              console.log("Error:", data.errorMessage);
              // Update the message and modalVisible based on the error
              message = data.errorMessage;
              messageTitle = "Error";
              modalVisible = true;
            }
            
          });
          
        } else {
          // Update the message and modalVisible based on the error
          message = "Registration failed. Please try again.";
          messageTitle = "Error";
          modalVisible = true;
        }
      } catch (error) {
        // Update the message and modalVisible based on the error
        console.error("Fetch error:", error);
        messageTitle = "Network error";
        message = "Network error. Please try again.";
        modalVisible = true;
      }
      
      
    }
  
    // Update the state
    setState({...state, nameerror: nameError, emailerror: emailError, message: message,modalVisible: modalVisible, messageTitle: messageTitle});
   
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
  Title={state.messageTitle}
  Message={state.message}
  getVisible={() => state.modalVisible}
  onHide={() => setState({ modalVisible: false })}
/>  
    </KeyboardAvoidingView>
  );
}
