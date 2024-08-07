import * as React from 'react';
import { useState, useContext } from 'react';
import { View } from 'react-native';
import { Platform, Image, KeyboardAvoidingView } from 'react-native';
import { useTheme, Checkbox, Text, TextInput, Button, Portal } from 'react-native-paper';
import ModalComp from '../ModalComp';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../../AuthContext';

const appConfig = require('../../appConf.json');
const baseurlBack = appConfig.baseurlBack;

/**
 * Password component.
 * @module screens/beforeLogin/Password
 * @description This is the Password component. It is the screen where the user can enter a password that follows the secure password guideline.
 * It is only rendered when the user is not logged in and selects the register option.
 * @param {Object} props - Component props.
 * @param {Object} props.navigation - Navigation object from react-navigation.
 * @returns {React.Element} Rendered component.
 * @throws Will throw an error if the navigation fails.
 * @author Fagner Nunes
 */
export default function Password({ navigation }) {
    const theme = useTheme();

    /**
     * State for the component.
     * @type {Object}
     * @property {boolean} error - The error state. this state is used by the TextInput component to show the error.
     * @property {string} password1 - The password1 state. this state is used to store the password that the user typed.
     * @property {string} check1 - The check1 state. this state is used to show the checkbox.
     * @property {string} check2 - The check2 state. this state is used to show the checkbox.
     * @property {string} check3 - The check3 state. this state is used to show the checkbox.
     * @property {string} password2 - The password2 state. this state is used to store the password that the user typed.
     * @property {string} message - The message state. this state is used to show the message in the modal.
     * @property {string} messageTitle - The messageTitle state. this state is used to show the title of the modal.
     * @property {boolean} modalVisible - The modalVisible state. this state is used to show the modal.
     */
    const [state, setState] = useState({
        error: false,
        visible: false,
        password1: "",
        check1: "unchecked",
        check2: "unchecked",
        check3: "unchecked",
        password2: "",
        message: "",
        messageTitle: "",
        modalVisible: false,
    });

    /**
     * Function to check the password.
     * @function passwordSanity
     * @description This function is used to check the password. It is used to check if the password has at least 1 number, 1 capital letter and is at least 8 chars long.
     * @param {string} text - The text that the user typed.
     * @returns {void} This function does not return anything.
     */
    const passwordSanity = (text) => {
        setState(prevState => ({ ...prevState, password1: text })); // Set the password1 to text in the state

        if (text.length > 8) { // Check if the password1 is greater than 8
            setState(prevState => ({ ...prevState, check2: "checked" }));
        } else { // If the password1 is not greater than 8
            setState(prevState => ({ ...prevState, check2: "unchecked" }));
        }

        if (text.match(/[A-Z]/)) { // Check if the password1 has a capital letter
            setState(prevState => ({ ...prevState, check3: "checked" }));
        } else { // If the password1 does not have a capital letter
            setState(prevState => ({ ...prevState, check3: "unchecked" }));
        }

        if (text.match(/[0-9]/)) { // Check if the password1 has a number
            setState(prevState => ({ ...prevState, check1: "checked" }));
        } else { // If the password1 does not have a number
            setState(prevState => ({ ...prevState, check1: "unchecked" }));
        }
    };

    const { setLoggedIn } = useContext(AuthContext); // Get the setLoggedIn function from the AuthContext

    /**
     * Function to set the password.
     * @function setPassword
     * @description This function is used to set the password. It sends a request to the server to set the password.
     * It also saves the token in the AsyncStorage.
     * @returns {void} This function does not return anything.
     * @throws Will throw an error if the network request fails.
     */
    const setPassword = async () => { // user clicks on the next button
        let message = ""; // Initialize the message
        let messageTitle = ""; // Initialize the messageTitle
        let modalVisible = false; // Initialize the modalVisible

        if (state.password1 === state.password2 && state.check1 === "checked" && state.check2 === "checked" && state.check3 === "checked") { // Check if the passwords match and the password follows the guidelines
            const token = await AsyncStorage.getItem('token'); // Get the token from the AsyncStorage
            const url = `${baseurlBack}/register/password/${state.password1}`; // Set the url to the backend

            try {
                const response = await fetch(url, { // Fetch the URL
                    method: 'GET',
                    headers: { 'Authorization': `Bearer ${token}` } // Set the headers to the token from the AsyncStorage
                });

                if (response.status === 200) { // If the response status is 200 (OK)
                    const data = await response.json();
                    if (data.error) { // If the response has an error message
                        message = data.errorMessage; // Set the message to the error message
                        messageTitle = "Error"; // Set the messageTitle to "Error"
                        modalVisible = true; // Set the modalVisible to true
                    } else { // If the response does not have an error message because login is set to true
                        await AsyncStorage.setItem('token', data.token); // Set the token in the AsyncStorage to the token from the response
                        setLoggedIn(true); // Set the loggedIn to true
                    }
                } else { // If the response status is not 200 (OK)
                    message = "An error occurred. Try again.";
                    messageTitle = "Error";
                    modalVisible = true;
                }
            } catch (e) {
                message = "Network error. Please, try again.";
                messageTitle = "Error";
                modalVisible = true;
            }
        } else { // If the passwords do not match
            message = "The passwords do not match";
            messageTitle = "Error";
            modalVisible = true;
        }
        setState({ ...state, message: message, messageTitle: messageTitle, modalVisible: modalVisible });
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ backgroundColor: theme.colors.background, flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Image style={{ marginBottom: "15%" }} source={require('../../assets/logo.png')} />
            <TextInput onChangeText={(text) => { passwordSanity(text) }} error={state.error} left={<TextInput.Icon icon="lock-outline" />} placeholder="Enter your password" label="Password" style={{ width: "80%", marginBottom: "4%" }} mode="outlined" />
            <TextInput onChangeText={(text) => { setState({ ...state, password2: text }) }} error={state.error} left={<TextInput.Icon icon="lock-outline" />} placeholder="Confirm your password" label="Confirm" style={{ width: "80%", marginBottom: "20%" }} mode="outlined" />

            <View style={{ display: "flex", flexDirection: "Column", marginBottom: "20%" }}>
                <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                    <Checkbox status={state.check1} />
                    <Text variant="titleMedium">Must have numbers</Text>
                </View>
                <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                    <Checkbox status={state.check2} />
                    <Text variant="titleMedium">Must be at least 8 Chars long</Text>
                </View>
                <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                    <Checkbox status={state.check3} />
                    <Text variant="titleMedium">Must have at least 1 capital letter</Text>
                </View>
            </View>

            <Button onPress={setPassword} style={{ width: "50%", marginBottom: "2%" }} textColor='#fff' icon="arrow-right-thick" mode='elevated' buttonColor={theme.colors.primary}>
                Next
            </Button>

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