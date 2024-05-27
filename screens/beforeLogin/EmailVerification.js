import { useState,useRef} from "react";
import * as React from "react";
import { View, Platform, Image, KeyboardAvoidingView } from "react-native";
import { useTheme, Text, TextInput, Button, Portal, Modal } from "react-native-paper";

export default function EmailVerification({ navigation }) {

    const theme = useTheme();
    const [state, setState] = useState({
        number1: '',
        number2: '',
        number3: '',
        number4: '',
        visible: false,
        message: ""
    })

    const input1 = useRef();
    const input2 = useRef();
    const input3 = useRef();
    const input4 = useRef();

    const enterCode = (input,numb) => {
        if(input == 1){
            setState({...state, number1: numb})
            //focus on the next input
            if(numb !=""){
            input2.current.focus();
             }
            
        }
        if(input == 2){
            console.log(numb)
            setState({...state, number2: numb})
            if(numb !=""){
            input3.current.focus();
            }
        }
        if(input == 3){
            setState({...state, number3: numb})
            if(numb !=""){
            input4.current.focus();
            }
        }
        if(input == 4){
            setState({...state, number4: numb})
        }
    }

    const verifyCode = () => {
        if(state.number1 == "1" && state.number2 == "2" && state.number3 == "3" && state.number4 == "4"){
            navigation.navigate('Register')
        }else{
            setState({...state, visible: true, message: "The code is incorrect"})
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