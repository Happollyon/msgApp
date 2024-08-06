import React, { useContext, useEffect, useState } from 'react';
import { View, Button, Image, StyleSheet,Platform, TouchableOpacity, Text,KeyboardAvoidingView,SafeAreaView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useCameraPermissions } from 'expo-camera';
import { useTheme } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../AuthContext';
import * as ImageManipulator from 'expo-image-manipulator';


const appConf = require('../appConf.json'); // Load the configuration file
const baseurlBack = appConf.baseurlBack; // URL of the backend server

export default function Camera({route}) {
  // State variables
  const [facing, setFacing] = useState('back'); // Camera facing
  const [permission, requestPermission] = useCameraPermissions() ;// Camera permissions. It will be an object with the keys granted, canAskAgain, and status.
  const [image, setImage] = useState(null); // Image URI. It will be null if no image is taken.
  const {userInfo, setUserInfo} = React.useContext(AuthContext);// User information. It will be an object with the keys id, username, email, and avatarUrl.
  const theme = useTheme(); // Theme object. It will be an object with the keys dark, roundness, colors, and more.
  const navigation = useNavigation(); // Navigation object. It will be an object with the keys navigate, goBack, addListener, and more.
  const {socket} = React.useContext(AuthContext);// Socket object. It will be an object with the keys on, emit, off, and more.
  const {contactInfo} = route.params.contactInfo;
  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) { // Camera permissions are not granted.
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}> 
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }else{
    if (route.params.fromChat) {
      if(route.params.icon === 'camera'){
        takePhoto();
      }else{
        pickImage()
      }
  }
}
  //run fucnions when the screen is loaded
  
  
  function toggleCameraFacing() { // Toggle the camera facing
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  async function takePhoto() { // Take a photo
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, // Only images are allowed
      allowsEditing: true, // The user can edit the image. The aspect ratio is 4:3
      aspect: [4, 3],
      quality: 1, // The image quality is 100% (the highest quality)
    });

    console.log(result.assets[0].uri); // Log the result to debug

    if (!result.canceled) { // The user took a photo
      const manipResult = await ImageManipulator.manipulateAsync( // Resize the image to 800x600 pixels and compress it to 80% quality
        result.assets[0].uri,
        [{ resize: { width: 800, height: 600 } }], // Resize the image to 800x600 pixels
        { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG } // Compress the image to 80% quality
      );
      console.log('Resized image URI:', manipResult.uri);
      //naviga to chat component if the photo was taken from chat
       if (route.params.fromChat) {
        navigation.navigate('ChatComponent',{contactInfo:contactInfo});
      }else{
        navigation.navigate('Profile');
      } 
        
      setImage(manipResult.uri); 
      await uploadImage(manipResult.uri); // Upload the image to the server
    } else {
      console.log('Error taking photo or photo cancelled');
    }
  }

  
    const sendMessage = async (imgUlr) => {
      
      const token = await AsyncStorage.getItem('token');
      const message = {
        type: 'message',
        token:token,
        delivered: false,
        read: false,
        msgObj: {
          message: null,
          sender: userInfo.id,
          receiver: contactInfo.id,
          imageLink: imgUlr
        }
      }
      
      if ( socket) {
          console.log('Sending message:');
          socket.send(JSON.stringify(message));
          console.log('Message sent' ,JSON.stringify(message));
          //const finalMessage = {...message.msgObj, msgTimestamp: new Date().getTime(),delivered:false,read:false};
          //setState({ ...state, msgsToRender: [...state.msgsToRender, finalMessage] });
          //setState({ ...state, msg: '' });
         
      }
  };
    async function uploadImage(uri) { // Upload the image to the server
      console.log('Uploading image:', uri);
      const token = await AsyncStorage.getItem('token');
      let formData = new FormData();
      formData.append('photo', {
        uri,
        name: 'photo.jpg',
        type: 'image/jpeg',
      });
    
      try {
        const endpoint = route.params.fromChat ? `${baseurlBack}/send-image` : `${baseurlBack}/upload-profile-picture`;
        console.log(endpoint); //
        await fetch(endpoint, {
          method: 'POST',
          body: formData,
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}` // Send the token in the Authorization header
          },
        }).then(async (response) => {
          if(response.status === 200) { // The image was uploaded successfully
            console.log('Image uploaded successfully');
            
            await response.json().then(async (response) => {
              
              if (route.params.fromChat) {
                console.log('Sending message with image link:', response.data);
                sendMessage(response.data.imageUrl);
                //navigation.navigate('ChatComponent',{contactInfo:contactInfo});
              } else {
                setUserInfo({...userInfo, avatarUrl: response.data.profilePictureUrl}); // Update the user information with the new avatar URL
              }
            });
          } else {
            console.log('Error uploading image code ' + response.status); // Log the error to debug
          }
        });
      } catch (error) {
        console.error('Error uploading image:', error); // Log the error to debug
      }
    }

  async function pickImage() { // Pick an image from the gallery 
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    
    if (!result.canceled) { // The user picked an image
      const manipResult = await ImageManipulator.manipulateAsync( // Resize the image to 800x600 pixels and compress it to 80% quality
        result.assets[0].uri,
        [{ resize: { width: 800, height: 600 } }], // Resize the image to 800x600 pixels
        { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG } // Compress the image to 80% quality
      );
      console.log('Resized image URI:', manipResult.uri);
      //naviga to chat component if the photo was taken from chat
       if (route.params.fromChat) {
        navigation.navigate('ChatComponent',{contactInfo:contactInfo});
      }else{
        navigation.navigate('Profile');
      } 
        
      setImage(manipResult.uri); 
      await uploadImage(manipResult.uri); // Upload the image to the server
    }
  }

  return (
    <SafeAreaView style={{flex:1,backgroundColor:"transparent"}}>
    <KeyboardAvoidingView
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ backgroundColor: theme.colors.background, flex: 1,flexDirection:"row", alignItems:"center", paddingLeft:"3%", justifyContent: 'space-around'}}>
    {/* user should be able to change avatar and edit user name*/}
    
        { 
        route.params.fromChat ?<View></View> : <View style={{flexDirection:"row", alignItems:"center", justifyContent:"center"}}>
        <TouchableOpacity style={styles.button} onPress={takePhoto}>
          <Icon name='camera' size={64} color={theme.colors.primary} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={pickImage}>
          <Icon name='folder-multiple-image' size={64} color={theme.colors.primary} />
        </TouchableOpacity>
        </View>
        } 
        </KeyboardAvoidingView>
        </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    margin: 10,
  },
  preview: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
    marginTop: 20,
  },
});