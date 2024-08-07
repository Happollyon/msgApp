import { useState, useRef } from "react";
import * as React from "react";
import { View, Platform, Image, KeyboardAvoidingView } from "react-native";
import { useTheme, Text, TextInput, Button, Portal } from "react-native-paper";
import ModalComp from '../ModalComp';
import AsyncStorage from '@react-native-async-storage/async-storage';

const appConfig = require('../../appConf.json');
const baseurlBack = appConfig.baseurlBack;

/**
 * EmailVerification component.
 * @module screens/beforeLogin/EmailVerification
 * @description This is the EmailVerification component. It is the screen where the user can verify the email by entering the code.
 * It is only rendered when the user is not logged in and selects the register option.
 * @author Fagner Nunes
 * 
 * @param {Object} props - Component props.
 * @param {Object} props.navigation - Navigation object from react-navigation.
 * @returns {React.Element} Rendered component.
 */
export default function EmailVerification({ navigation }) {
    const theme = useTheme();
    const [state, setState] = useState({
        number1: '',
        number2: '',
        number3: '',
        number4: '',
        message: "",
        messageTitle: "",
        modalVisible: false,
    });

    const input1 = useRef();
    const input2 = useRef();
    const input3 = useRef();
    const input4 = useRef();

    /**
     * Function to enter the code.
     * @function enterCode
     * @description This function is used to enter the code. It is used to set the number1, number2, number3 and number4 states.
     * @param {number} input - The input number.
     * @param {string} numb - The number that the user typed.
     * @returns {void} This function does not return anything.
     */
    const enterCode = (input, numb) => {
        if (input == 1) {
            setState({ ...state, number1: numb });
            if (numb != "") {
                input2.current.focus();
            }
        }
        if (input == 2) {
            setState({ ...state, number2: numb });
            if (numb != "") {
                input3.current.focus();
            }
        }
        if (input == 3) {
            setState({ ...state, number3: numb });
            if (numb != "") {
                input4.current.focus();
            }
        }
        if (input == 4) {
            setState({ ...state, number4: numb });
        }
    };

    /**
     * Function to verify the code.
     * @function verifyCode
     * @description After user enters his email, an email containing a 4-digit code is sent to the user. 
     * This function is used to verify the code.
     * @returns {void} This function does not return anything.
     * @throws Will throw an error if the network request fails.
     */
    const verifyCode = async () => {
        let message = "";
        let messageTitle = "";
        let modalVisible = false;

        if (state.number1 == "" || state.number2 == "" || state.number3 == "" || state.number4 == "") {
            message = "Please enter the 4 digits code";
            messageTitle = "Error";
            modalVisible = true;
        } else {
            const token = await AsyncStorage.getItem('token');
            const url = `${baseurlBack}/register/confirmation-code/${state.number1}${state.number2}${state.number3}${state.number4}`;

            await fetch(url, {
                method: 'GET',
                headers: {
                    "authorization": `Bearer ${token}`
                }
            }).then(async response => {
                if (response.status == 200) {
                    await response.json().then(data => {
                        if (data.error) {
                            message = data.errorMessage;
                            messageTitle = "Error";
                            modalVisible = true;
                        } else {
                            navigation.navigate('Password');
                        }
                    });
                }
            }).catch(error => {
                message = "A network error occurred. Please try again.";
                messageTitle = "Error";
                modalVisible = true;
            });
        }

        setState({ ...state, modalVisible: modalVisible, messageTitle: messageTitle, message: message });
    };

    /**
     * Function to resend the code.
     * @function resendcode
     * @description This function is used to resend the code. It is used to resend the code to the user's email.
     * @returns {void} This function does not return anything.
     * @throws Will throw an error if the network request fails.
     */
    const resendcode = async () => {
        let message = "";
        let messageTitle = "";
        let modalVisible = false;

        const token = await AsyncStorage.getItem('token');
        const url = `${baseurlBack}/register/resend-code`;

        await fetch(url, {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${token}` }
        }).then(async response => {
            if (response.status == 200) {
                await response.json().then(data => {
                    if (data.error) {
                        message = data.errorMessage;
                        messageTitle = "Error";
                        modalVisible = true;
                    } else {
                        message = "Code sent successfully";
                        messageTitle = "Success";
                        modalVisible = true;
                    }
                });
            } else {
                message = "A network error occurred. Please try again.";
                messageTitle = "Error";
                modalVisible = true;
            }
        }).catch(error => {
            message = "A network error occurred. Please try again.";
            messageTitle = "Error";
            modalVisible = true;
        });

        setState({ ...state, modalVisible: modalVisible, messageTitle: messageTitle, message: message });
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ backgroundColor: theme.colors.background, flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Image style={{ marginBottom: "15%" }} source={require('../../assets/logo.png')} />
            <Text variant="displaySmall">Check your email</Text>
            <Text variant="titleMedium" style={{ marginBottom: "15%" }}>We sent a code to fagnernunes@gmail.com</Text>
            <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-around", width: "80%", marginBottom: "15%" }}>
                <View style={{ borderBottomWidth: "3px" }}>
                    <TextInput
                        ref={input1}
                        maxLength={1}
                        keyboardType="numeric"
                        value={state.number1}
                        onChangeText={(text) => enterCode(1, text)}
                    />
                </View>
                <View style={{ borderBottomWidth: "3px" }}>
                    <TextInput
                        ref={input2}
                        maxLength={1}
                        keyboardType="numeric"
                        value={state.number2}
                        onChangeText={(text) => enterCode(2, text)}
                    />
                </View>
                <View style={{ borderBottomWidth: "3px" }}>
                    <TextInput
                        ref={input3}
                        maxLength={1}
                        keyboardType="numeric"
                        value={state.number3}
                        onChangeText={(text) => enterCode(3, text)}
                    />
                </View>
                <View style={{ borderBottomWidth: "3px" }}>
                    <TextInput
                        ref={input4}
                        maxLength={1}
                        keyboardType="numeric"
                        value={state.number4}
                        onChangeText={(text) => enterCode(4, text)}
                    />
                </View>
            </View>
            <Button dark={true} onPress={verifyCode} style={{ width: "50%", marginBottom: "2%" }} textColor='#fff' icon="arrow-right-thick" mode='elevated' buttonColor={theme.colors.primary}>
                Next
            </Button>
            <Text variant="titleMedium" style={{ marginBottom: "15%" }}>Didn’t receive the code? <Text onPress={resendcode} variant="titleMedium" style={{ fontWeight: "bold", color: theme.colors.primary }}>Click here!</Text></Text>

            <Portal>
                <ModalComp
                    Title={state.messageTitle}
                    Message={state.message}
                    getVisible={() => state.modalVisible}
                    onHide={() => setState({ ...state, modalVisible: false })}
                />
            </Portal>
        </KeyboardAvoidingView>
    );
}