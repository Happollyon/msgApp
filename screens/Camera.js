import React, { useContext, useState } from 'react';
import { View, Button, Image, StyleSheet,Platform, TouchableOpacity, Text,KeyboardAvoidingView,SafeAreaView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useCameraPermissions } from 'expo-camera';
import { useTheme } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../AuthContext';
import * as ImageManipulator from 'expo-image-manipulator';


const appConf = require('../appConf.json');
const baseurlBack = appConf.baseurlBack;

export default function Camera() {
  const [facing, setFacing] = useState('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [image, setImage] = useState(null);
  const {userInfo, setUserInfo} = React.useContext(AuthContext);
  const theme = useTheme();

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  async function takePhoto() {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result.assets[0].uri); // Log the result to debug

    if (!result.canceled) {
      const manipResult = await ImageManipulator.manipulateAsync(
        result.assets[0].uri,
        [{ resize: { width: 800, height: 600 } }],
        { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG }
      );
      console.log('Resized image URI:', manipResult.uri);
      setImage(manipResult.uri);
      await uploadImage(manipResult.uri);
    } else {
      console.log('Error taking photo or photo cancelled');
    }
  }

  async function uploadImage(uri) {
    console.log('Uploading image:', uri);
    const token = await AsyncStorage.getItem('token');
    let formData = new FormData();
    formData.append('photo', {
      uri,
      name: 'photo.jpg',
      type: 'image/jpeg',
    });

    try {
      console.log(`${baseurlBack}/upload-profile-picture`);
      await fetch(`${baseurlBack}/upload-profile-picture`, {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        },
      }).then(async (response) => {
        if(response.status === 200) {
          console.log('Image uploaded successfully');
          console.log(response);
          await response.json().then(async (response) => {

            console.log(response);
            setUserInfo({...userInfo, avatarUrl: response.data.profilePictureUrl});

          });
          
        }else{
          console.log('Error uploading image code ' + response.status);
        }
      });

     
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  }

  async function pickImage() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result); // Log the result to debug

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      await uploadImage(result.assets[0].uri);
    }
  }

  return (
    <SafeAreaView style={{flex:1,backgroundColor:"transparent"}}>
    <KeyboardAvoidingView
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ backgroundColor: theme.colors.background, flex: 1,flexDirection:"row", alignItems:"center", paddingLeft:"3%", justifyContent: 'space-around'}}>
    {/* user should be able to change avatar and edit user name*/}
    
        
        <TouchableOpacity style={styles.button} onPress={takePhoto}>
          <Icon name='camera' size={64} color={theme.colors.primary} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={pickImage}>
          <Icon name='folder-multiple-image' size={64} color={theme.colors.primary} />
        </TouchableOpacity>
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