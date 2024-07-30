import { useState , useContext} from 'react';
import * as React from 'react';
import { Platform,Image,KeyboardAvoidingView } from 'react-native';
import {useTheme, Text,TextInput,Button,Portal,Modal} from 'react-native-paper';
import { AuthContext } from '../../AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';


const appConfig = require('../../appConf.json');
const baseurlBack = appConfig.baseurlBack;

import ModalComp from '../ModalComp';
 


/**
 * Login component.
 * @module screens/beforeLogin/Login
 * @description This is the Login component. It is the screen where the user can login into the app.
 * It is only rendered when the user is not logged in and selects the login option.
 * @author Fagmer Nunes
 * 
 * @param {Object} props - Component props.
 * @param {Object} props.navigation - Navigation object from react-navigation.
 * @returns {React.Element} Rendered component.
 */



export default function Login({navigation}) {

    const theme = useTheme();

     /**
     * State for the component.
     * @type {Object}
     * @property {boolean} error - The error state. this state is used by the TextInput component to show the error.
     * @property {boolean} modalVisible -  The modalVisible state. this state is used to show the modal.
     * @property {string} userEmail - The userEmail state. this state is used to store the email that the user typed.
     * @property {string} userPassword - The userPassword state. this state is used to store the password that the user typed.
     * @property {string} message - The message state. this state is used to show the message in the modal.
     */
    const [state, setState] = useState({
        message:"",
        error:false,
        modalVisible:false,
        userEmail:"",
        userPassword:"",
    });

    /**
     * Function to login.
     * @function login
     * @description This function is used to login the user. It sends a request to the server to login the user.
     * It also saves the token in the AsyncStorage. 
     * @returns {void} This function does not return anything.
     * 
     */

    const { setLoggedIn,loggedIn } = useContext(AuthContext); // Get the setLoggedIn function from the AuthContext
    const { contactList, setContactList } = useContext(AuthContext); // Get the setContactList function from the AuthContext
    //get messages 
    // get contacts 

    const getContacts=  async () => { // Get the contacts from the server
        const url = `${baseurlBack}/contacts/get-contacts`; // The url to get the contacts
        const token = await AsyncStorage.getItem('token'); // Get the token from the AsyncStorage
        
        try{
            await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`}
            }).then(async (response) => {
                if(response.status ===200){ 
                   await response.json().then(async (data) => {
                    if(!data.error){
                        
                       
                      await AsyncStorage.setItem('contacts', JSON.stringify(data.data));
                      setContactList(data.data);
                      console.log(contactStrure)

                    }else{
                       
                        console.log("error getting contacts")
                    }
                   }) 
                }else{
                    console.log(response.status)
                    console.log("answer not okay")
                }
            })
    }catch(e){
        console.log("networkerror ",e)
    }
    }
    const login = async () => {
        let message = "";
        let error = false;
        let messageTitle = "";
        let modalVisible= false

        if(state.userEmail === "" || state.userPassword === ""){
            message = "Please, fill all the fields.";
            error = true;
            messageTitle = "Error";
            modalVisible = true;
            }else{
                const url = `${baseurlBack}/login/${encodeURIComponent(state.userEmail)}/${encodeURIComponent(state.userPassword)}`;
                
                try{
             await fetch(url).then(async (response) => {
               
                if(response.status === 200){
                    
                    await response.json().then( async (responseData) => {
                        if(responseData.error){
                           
                            message = responseData.errorMessage;
                            error = true;
                            messageTitle = "Error";
                            modalVisible = true;

                        }else{
                            
                            //get contacts before setting logged in
                            await AsyncStorage.setItem('token', responseData.token);
                            await AsyncStorage.setItem('isLoggedIn', "true");
                            await AsyncStorage.setItem('loggedInTime', Date.now().toString());
                            await getContacts();
                            setLoggedIn(true);
                              // save token here to  with user id JWT
                            
                           
                            
                           
                        }
                });
                }});
                    
                        
                }catch(e){
                            message = "Net work error. Please, try again.";
                            error = true;
                            messageTitle = "Error";
                            modalVisible = true;
                    console.log(e);
                
                }
            }
       
        setState({...state,message:message,error:error,messageTitle:messageTitle,modalVisible:modalVisible});
    };


   
    return(
        <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ backgroundColor: theme.colors.background, flex: 1, alignItems: 'center',justifyContent: 'center'}}>
            <Image style={{marginBottom:"15%"}}source={require('../../assets/logo.png')} />
            <Text variant="displaySmall">Login into</Text>
            <Text variant="displaySmall">your account</Text>     
            <Text variant="titleMedium" style={{marginBottom:"15%"}}>Please, enter your details</Text>      
            <TextInput onChangeText = {(text)=>{setState({...state,userEmail:text})}}  left={<TextInput.Icon icon="email-outline" />} icon="account-outline" placeholder="Enter your email" label="Email" style={{width:"80%", marginBottom:"2%"}} mode="outlined" />
            <TextInput onChangeText={(text)=>{setState({...state,userPassword:text})}} left={<TextInput.Icon icon="lock-outline" />}  placeholder="Enter your password" label="Password" style={{width:"80%", marginBottom:"20%"}} mode="outlined" />

            <Button dark={true} onPress={login} style={{width:"50%", marginBottom:"2%"}} textColor='#fff' icon="arrow-right-thick" mode='elevated' buttonColor = {theme.colors.primary}>
                Next
            </Button>

           
        
            <ModalComp
            Title={state.messageTitle}
            Message={state.message}
            getVisible={() => state.modalVisible}
            onHide={() => setState({ ...state,modalVisible: false })}
            />  
        </KeyboardAvoidingView>    
    )
}