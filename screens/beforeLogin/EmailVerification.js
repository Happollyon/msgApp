import { useState,useRef} from "react";
import * as React from "react";
import { View, Platform, Image, KeyboardAvoidingView } from "react-native";
import { useTheme, Text, TextInput, Button, Portal, Modal } from "react-native-paper";
import ModalComp from '../ModalComp';
import AsyncStorage from '@react-native-async-storage/async-storage';

const appConfig = require('../../appConf.json');
const baseurlBack = appConfig.baseurlBack;


/**
 * EmailVerification component.
 * @module screens/beforeLogin/EmailVerification
 * @description This is the EmailVerification component. It is the screen where the user can verify the email by entering the code.
 * @author Fagmer Nunes
 * 
 * @param {Object} props - Component props.
 * @param {Object} props.navigation - Navigation object from react-navigation.
 * @returns {React.Element} Rendered component.
 * 
 */


export default function EmailVerification({ navigation }) {

    /**
     * State for the component.
     * @type {Object}
     * @property {string} number1 - The number1 state. this state is used to store the first number that the user typed.
     * @property {string} number2 - The number2 state. this state is used to store the second number that the user typed.
     * @property {string} number3 - The number3 state. this state is used to store the third number that the user typed.
     * @property {string} number4 - The number4 state. this state is used to store the fourth number that the user typed.
     * @property {boolean} modalVisible - The modalVisible state. this state is used by the Modal component to show the modal.
     * @property {string} message - The message state. this state is used to show the message in the modal.
     * @property {string} messageTitle - The messageTitle state. this state is used to show the message title in the modal.
     */
    const theme = useTheme();
    const [state, setState] = useState({
        number1: '',
        number2: '',
        number3: '',
        number4: '',
        message:"",
        messageTitle:"",
        modalVisible:false,
    })

    /**
     * Function to enter the code.
     * @function enterCode
     * @description This function is used to enter the code.
     * @param {number} input - The input number.
     * @param {string} numb - The number that the user typed.
     * @returns {void} This function does not return anything.
     */
    const input1 = useRef();
    const input2 = useRef();
    const input3 = useRef();
    const input4 = useRef();

    const enterCode = (input,numb) => {

        if(input == 1){ // Check if the input is 1
            setState({...state, number1: numb}) // Set the number1 to numb
            //focus on the next input
            if(numb !=""){ // Check if the numb is not empty
            input2.current.focus(); // Focus on the input2
             }
        }
        if(input == 2){// Check if the input is 2
            setState({...state, number2: numb})// Set the number2 to numb
            if(numb !=""){// Check if the numb is not empty
            input3.current.focus();// Focus on the input3
            }
        }
        if(input == 3){ // Check if the input is 3
            setState({...state, number3: numb}) // Set the number3 to numb
            if(numb !=""){ // Check if the numb is not empty
            input4.current.focus(); // Focus on the input4
            }
        }
        if(input == 4){ // Check if the input is 4
            setState({...state, number4: numb}) // Set the number4 to numb
        }
    }

    /**
     * Function to verify the code.
     * @function verifyCode
     * @description After user enters his email, a email containining a 4 digit code is sent to the user. 
     * - This function is used to verify the code.
     * @returns {void} This function does not return anything.
     * 
     */
    const verifyCode = async () => { // Function to verify the code
       
        let message = "";
        let messageTitle = "";
        let modalVisible = false;
      
        
        if(state.number1 == "" || state.number2 == "" || state.number3 == "" || state.number4 == ""){ // Check if the number1 or number2 or number3 or number4 is empty
            message = "Please enter the 4 digits code"; // Set the message to "Please enter the 4 digits code"
            messageTitle = "Error"; // Set the messageTitle to "Error"
            modalVisible = true; // Set the modalVisible to true
          
        }else{
            const token = await AsyncStorage.getItem('token'); // Get the token from the AsyncStorage
            const url = `${baseurlBack}/register/confirmation-code/${state.number1}${state.number2}${state.number3}${state.number4}`; // Set the url to the baseurlBack/register/verify-code/number1number2number3number4
           
            // fetch url and add token
             await fetch(url, {
                method: 'GET',
                headers: {
                    "authorization": `Bearer ${token}`
                }
        }).then( async response => {
            
            if(response.status == 200){ // Check if the response status is 200

               await  response.json().then(data => { // Parse the response to json
                    console.log(data)
                    if(data.error){ // Check if there is an error
                        message = data.errorMessage; // Set the message to data.errorMessage
                        messageTitle = "Error"; // Set the messageTitle to "Error"
                        modalVisible = true; // Set the modalVisible to true
                        console.log("Error:", data.errorMessage);
                    }else{
                        navigation.navigate('Password'); // Navigate to the PasswordReset screen
                    }
                    
                }); 
               
            
        }
    })
    }
       
        setState({...state, modalVisible:modalVisible,messageTitle:messageTitle, message: message})
        
    }
    
    return(
        <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ backgroundColor: theme.colors.background, flex: 1, alignItems: 'center',justifyContent: 'center'}}>
            <Image style={{marginBottom:"15%"}} source={require('../../assets/logo.png')} />
            <Text variant="displaySmall">Check your email</Text>
            <Text variant="titleMedium" style={{marginBottom:"15%"}}>We sent a code to fagnernunes@gmail.com</Text>  
            <View style={{display:"flex", flexDirection:"row",justifyContent:"space-around", width:"80%",marginBottom:"15%"}}>
                <View style={{ borderBottomWidth:"3px"}}>
                    <TextInput 
                        ref={input1}
                        maxLength={1}
                        keyboardType="numeric"
                        value={state.number1}
                        onChangeText={(text) => enterCode(1,text)}
                    />
                </View>
                <View style={{ borderBottomWidth:"3px"}}>
                    <TextInput
                        ref={input2}
                        maxLength={1}
                        keyboardType="numeric"
                        value={state.number2}
                        onChangeText={(text) => enterCode(2,text)}
                    />
                </View><View style={{ borderBottomWidth:"3px"}}>
                    <TextInput 
                        ref={input3}
                        maxLength={1}
                        keyboardType="numeric"
                        value={state.number3}
                        onChangeText={(text) => enterCode(3,text)}
                    />
                </View><View style={{ borderBottomWidth:"3px"}}>
                    <TextInput 
                        ref={input4}
                        maxLength={1}
                        keyboardType="numeric"
                        value={state.number4}
                        onChangeText={(text) => enterCode(4,text)}
                    />
                </View>
            </View>
            <Button dark={true} onPress={verifyCode}  style={{width:"50%", marginBottom:"2%"}} textColor='#fff' icon="arrow-right-thick" mode='elevated' buttonColor = {theme.colors.primary}>
                Next
            </Button>
            <Text variant="titleMedium" style={{marginBottom:"15%"}}>Didn’t receive the code? Click here!</Text>  

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