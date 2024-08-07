import React, { useContext, useEffect, useState } from 'react';
import { View, Button, Image, StyleSheet, Platform, TouchableOpacity, Text, KeyboardAvoidingView, SafeAreaView } from 'react-native';
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

/**
 * @module Camera
 * @description Camera component for taking and uploading photos.
 * @autho GitHub Copilot
 */
export default function Camera({ route }) {
  const [facing, setFacing] = useState('back'); // Camera facing
  const [permission, requestPermission] = useCameraPermissions(); // Camera permissions
  const [image, setImage] = useState(null); // Image URI
  const { userInfo, setUserInfo } = React.useContext(AuthContext); // User information
  const theme = useTheme(); // Theme object
  const navigation = useNavigation(); // Navigation object
  const { socket } = React.useContext(AuthContext); // Socket object
  const { contactInfo } = route.params.contactInfo;

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  } else {
    if (route.params.fromChat) {
      if (route.params.icon === 'camera') {
        takePhoto();
      } else {
        pickImage();
      }
    }
  }

  /**
   * @function toggleCameraFacing
   * @description Toggle the camera facing direction.
   */
  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  /**
   * @function takePhoto
   * @description Take a photo using the camera.
   * @throws Will throw an error if the camera fails to take a photo.
   */
  async function takePhoto() {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const manipResult = await ImageManipulator.manipulateAsync(
        result.assets[0].uri,
        [{ resize: { width: 800, height: 600 } }],
        { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG }
      );

      if (route.params.fromChat) {
        navigation.navigate('ChatComponent', { contactInfo: contactInfo });
      } else {
        navigation.navigate('Profile');
      }

      setImage(manipResult.uri);
      await uploadImage(manipResult.uri);
    }
  }

  /**
   * @function sendMessage
   * @description Send a message with an image link.
   * @param {string} imgUlr - The URL of the image to send.
   * @throws Will throw an error if the message fails to send.
   */
  const sendMessage = async (imgUlr) => {
    const token = await AsyncStorage.getItem('token');
    const message = {
      type: 'message',
      token: token,
      delivered: false,
      read: false,
      msgObj: {
        message: null,
        sender: userInfo.id,
        receiver: contactInfo.id,
        imageLink: imgUlr
      }
    };

    if (socket) {
      socket.send(JSON.stringify(message));
    }
  };

  /**
   * @function uploadImage
   * @description Upload the image to the server.
   * @param {string} uri - The URI of the image to upload.
   * @throws Will throw an error if the image upload fails.
   */
  async function uploadImage(uri) {
    const token = await AsyncStorage.getItem('token');
    let formData = new FormData();
    formData.append('photo', {
      uri,
      name: 'photo.jpg',
      type: 'image/jpeg',
    });

    try {
      const endpoint = route.params.fromChat ? `${baseurlBack}/send-image` : `${baseurlBack}/upload-profile-picture`;
      await fetch(endpoint, {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        },
      }).then(async (response) => {
        if (response.status === 200) {
          await response.json().then(async (response) => {
            if (route.params.fromChat) {
              sendMessage(response.data.imageUrl);
            } else {
              setUserInfo({ ...userInfo, avatarUrl: response.data.profilePictureUrl });
            }
          });
        }
      });
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  }

  /**
   * @function pickImage
   * @description Pick an image from the gallery.
   * @throws Will throw an error if the image picking fails.
   */
  async function pickImage() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const manipResult = await ImageManipulator.manipulateAsync(
        result.assets[0].uri,
        [{ resize: { width: 800, height: 600 } }],
        { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG }
      );

      if (route.params.fromChat) {
        navigation.navigate('ChatComponent', { contactInfo: contactInfo });
      } else {
        navigation.navigate('Profile');
      }

      setImage(manipResult.uri);
      await uploadImage(manipResult.uri);
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "transparent" }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ backgroundColor: theme.colors.background, flex: 1, flexDirection: "row", alignItems: "center", paddingLeft: "3%", justifyContent: 'space-around' }}>
        {
          route.params.fromChat ? <View></View> : <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
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