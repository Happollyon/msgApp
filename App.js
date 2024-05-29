import { StatusBar } from 'expo-status-bar';
import { Appearance } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PaperProvider,DefaultTheme, DarkTheme  } from 'react-native-paper';


// ################### Screen Imports before Login ###################
import Screen1 from './screens/beforeLogin/LoginOrRegister';
import Register from './screens/beforeLogin/Register';
import Login from './screens/beforeLogin/Login';
import Password from './screens/beforeLogin/Password';
import EmailVerification from './screens/beforeLogin/EmailVerification';


const Stack = createNativeStackNavigator();
/**
 * @module App
 * @description This is the App component. It is the root component of the app.
 * @author Fagner Nunes
 * @returns {React.Element} Rendered component.
 */

export default function App() {
  const colorScheme = Appearance.getColorScheme();

  const theme = colorScheme === 'dark' ? DarkTheme : DefaultTheme;
  return (
    <PaperProvider theme={theme} >
    <NavigationContainer theme={theme}>
      <Stack.Navigator initialRouteName="LoginOrRegister">
        <Stack.Screen name="LoginOrRegister" component={Screen1} options={{ headerShown: false }}/>
        <Stack.Screen name="Register" component={Register} options={{ headerShown: false }}/>
        <Stack.Screen name="EmailVerification" component={EmailVerification} options={{ headerShown: false }}/>
        <Stack.Screen name="Password" component={Password} options={{ headerShown: false }}/>
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
    </PaperProvider>
  );
}

