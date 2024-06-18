import { Appearance } from 'react-native';
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator} from '@react-navigation/native-stack';
import { PaperProvider,DefaultTheme, DarkTheme  } from 'react-native-paper';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; 


// ################### Screen Imports before Login ###################
import Screen1 from './screens/beforeLogin/LoginOrRegister';
import Register from './screens/beforeLogin/Register';
import Login from './screens/beforeLogin/Login';
import Password from './screens/beforeLogin/Password';
import EmailVerification from './screens/beforeLogin/EmailVerification';


// ################### Screen Imports after Login ###################
import ChatScreen from './screens/afterLogin/ChatScreen';
import ConatctsScreen from './screens/afterLogin/ContactsScreen';
import ProfileScreen from './screens/afterLogin/ProfileScreen';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator()
/**
 * @module App
 * @description This is the App component. It is the root component of the app.
 * @author Fagner Nunes
 * @returns {React.Element} Rendered component.
 */


function MainNavigation() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Chat" component={ChatScreen} />
      <Tab.Screen name="Contacts" component={ConatctsScreen} />
      <Tab.Screen name="ProfileScreen" component={ProfileScreen} />
      {/* Add more tabs as needed */}
    </Tab.Navigator>
  );
}

export default function App() {
  const colorScheme = Appearance.getColorScheme();
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Simulated logged-in state
  const theme = colorScheme === 'dark' ? DarkTheme : DefaultTheme;

   // Simulate checking login status (e.g., from AsyncStorage or context)
   useEffect(() => {
    // Check login status here and update isLoggedIn accordingly
    // For demonstration, let's assume the user is logged in
    setIsLoggedIn(false);
  }, []);

  return (
    <PaperProvider theme={theme} >
    <NavigationContainer theme={theme}>

      { 
      isLoggedIn ?(
        <MainNavigation />):(
      <Stack.Navigator initialRouteName="Register">
        <Stack.Screen name="LoginOrRegister" component={Screen1} options={{ headerShown: false }}/>
        <Stack.Screen name="Register" component={Register} options={{ headerShown: false }}/>
        <Stack.Screen name="EmailVerification" component={EmailVerification} options={{ headerShown: false }}/>
        <Stack.Screen name="Password" component={Password} options={{ headerShown: false }}/>
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}/>
      </Stack.Navigator>
    )}
    </NavigationContainer>
    </PaperProvider>
  );
}

