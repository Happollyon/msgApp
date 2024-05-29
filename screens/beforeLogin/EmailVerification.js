import { useState,useRef} from "react";
import * as React from "react";
import { View, Platform, Image, KeyboardAvoidingView } from "react-native";
import { useTheme, Text, TextInput, Button, Portal, Modal } from "react-native-paper";


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
     * @property {boolean} visible - The visible state. this state is used by the Modal component to show the modal.
     * @property {string} message - The message state. this state is used to show the message in the modal.
     */
    const theme = useTheme();
    const [state, setState] = useState({
        number1: '',
        number2: '',
        number3: '',
        number4: '',
        visible: false,
        message: ""
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
    const verifyCode = () => { // Function to verify the code
        if(state.number1 == "1" && state.number2 == "2" && state.number3 == "3" && state.number4 == "4"){
            navigation.navigate('Register') // Navigate to the Register screen if the code is correct
        }else{
            setState({...state, visible: true, message: "The code is incorrect"}) // Set the visible to true and the message to "The code is incorrect"
        }
    }
    
    const hideModal = () => { // Function to hide the modal
       
        setState({ ...state, visible: false}); // Set the visible to false
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
                <Modal visible={state.visible} onDismiss={hideModal} contentContainerStyle={{backgroundColor: 'white', padding: 20, height:"50%", width:"90%",borderRadius:30,alignSelf:"center",display:"flex",justifyContent:"center",alignItems:"center"}} >
                <Text variant="displaySmall" style={{marginBottom:"15%"}}>Error</Text>
                <Text variant="titleMedium" style={{marginBottom:"15%"}}>{state.message}</Text>     
                </Modal>
            </Portal>
        </KeyboardAvoidingView>
    )
}