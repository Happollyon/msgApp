import * as React from 'react';
import { View, Image } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { useTheme } from 'react-native-paper';

/**
 * @module screens/beforeLogin/LoginOrRegister
 * @description This is the LoginOrRegister component. It is the screen where the user can choose to login or register.
 * @param {Object} param0 - Component props.
 * @param {Object} param0.navigation - Navigation object from react-navigation.
 * @returns {React.Element} Rendered component.
 * @throws Will throw an error if the navigation fails.
 */
export default function LoginOrRegister({ navigation }) {
  const theme = useTheme();

  /**
   * Navigate to the Register screen.
   * @function navigateToRegister
   * @description This function navigates the user to the Register screen.
   * @returns {void} This function does not return anything.
   * @throws Will throw an error if the navigation fails.
   */
  const navigateToRegister = () => {
    navigation.navigate('Register');
  };

  /**
   * Navigate to the Login screen.
   * @function navigateToLogin
   * @description This function navigates the user to the Login screen.
   * @returns {void} This function does not return anything.
   * @throws Will throw an error if the navigation fails.
   */
  const navigateToLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={{ backgroundColor: theme.colors.background, flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Image style={{ marginBottom: "15%" }} source={require('../../assets/logo.png')} />
      <Text variant="displaySmall">Welcome to</Text>
      <Text variant="displaySmall">StealthComms</Text>
      <Text variant="displaySmall">Where Your Privacy</Text>
      <Text variant="displaySmall">Comes First!</Text>
      <Text variant="titleMedium">Your messages are encrypted end-to-end</Text>
      <Text variant="titleMedium">,ensuring your conversations</Text>
      <Text variant="titleMedium" style={{ marginBottom: "15%" }}>remain yours and yours alone</Text>
      <Button style={{ width: "80%", marginBottom: "2%" }} mode="contained" onPress={navigateToRegister} buttonColor={theme.colors.primary}>
        Register
      </Button>
      <Button style={{ width: "80%" }} mode="contained" onPress={navigateToLogin} buttonColor={theme.colors.secondary}>
        Login
      </Button>
    </View>
  );
}