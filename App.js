import { Appearance,View } from 'react-native';
import React, {useContext,useState,useEffect } from 'react';
import { NavigationContainer,getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createNativeStackNavigator} from '@react-navigation/native-stack';
import { PaperProvider,DefaultTheme, DarkTheme,BottomNavigation,useTheme  } from 'react-native-paper';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; 
import { AuthProvider, AuthContext } from './AuthContext';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';



// ################### Screen Imports before Login ###################
import Screen1 from './screens/beforeLogin/LoginOrRegister';
import Register from './screens/beforeLogin/Register';
import Login from './screens/beforeLogin/Login';
import Password from './screens/beforeLogin/Password';
import EmailVerification from './screens/beforeLogin/EmailVerification';
import LoadingScreen from './screens/beforeLogin/LoadingScreen';


// ################### Screen Imports after Login ###################

import ChatStack from './screens/afterLogin/ChatStack/ChatStack';
import ContactsScreen from './screens/afterLogin/ContactsStack/ContactsScreen';
import ProfileScreen from './screens/afterLogin/ProfileScreen';
import ContactsStack from './screens/afterLogin/ContactsStack/ContatctsStack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TestScreen from './screens/afterLogin/ContactsStack/TestScreen';
import ChatComponent from './screens/afterLogin/ChatStack/ChatComponent';
import ChatScreen from './screens/afterLogin/ChatStack/ChatScreen';



const Stack = createNativeStackNavigator(); // Create a stack navigator
const Tab = createBottomTabNavigator() // Create a bottom tab navigator


/**
 * @module App
 * @description This is the App component. It is the root component of the app.
 * @author Fagner Nunes
 * @returns {React.Element} Rendered component.
 */

/**
 * @function MainNavigation
 * @description This is the main navigation component. It contains the tabs for the app. 
 * It is only rendered when the user is logged in.
 * @memberof App 
 * @returns {React.Element} Rendered component.
 */


const ChatRoute = () => <ChatScreen />;
const ContactsRoute = () => <ContactsScreen />;
const ProfileRoute = () => <ProfileScreen />;

const StackTest = () => {
  return(
    <Stack.Navigator>
      <Stack.Screen name="MainNavigation" component={MainNavigation} options={{ headerShown: false }}/>
      <Stack.Screen name="ChatComponent" component={ChatComponent} options={{ headerShown: false }}/>
      <Stack.Screen name="TestScreen" component={TestScreen} options={{ headerShown: false }}/>
    </Stack.Navigator>
  )
}

const MainNavigation = () => {
  // bottom tab navigator using react navigation
  const theme = useTheme();
  return (
    <Tab.Navigator initialRouteName='Contacts'  style={{backgroundColor:theme.colors.primary}} screenOptions={({ route }) => ({
      
      tabBarStyle: {
        
        backgroundColor: theme.colors.primary,
      },
      tabBarActiveTintColor: theme.colors.onPrimary,
      tabBarInactiveTintColor: theme.colors.onPrimaryContainer,
      tabBarIcon: ({ color, size,focused }) => {
        let iconName;

        if (route.name === 'Chat') {
          iconName = 'chat';
          
        } else if (route.name === 'Contacts') {
          iconName = 'account-multiple';
        } else if (route.name === 'Profile') {
          iconName = 'account';
        }

        return (
          <View style={{ 
            backgroundColor: focused ? theme.colors.primaryContainer : 'transparent', 
            borderRadius: 8, 
            padding: 5 
          }}>
        <Icon name={iconName} color={color} size={size} />
        </View>);
      },
    })}>
      <Tab.Screen name="Chat" component={ChatRoute} options={{ headerShown: false }}/>
      <Tab.Screen name="Contacts" component={ContactsRoute} options={{ headerShown: false }}/>
      <Tab.Screen name="Profile" component={ProfileRoute}options={{ headerShown: false }} />
    </Tab.Navigator>
  );

}
/**
 * @function InsideApp
 * @description This is the inside app component. It is the main component of the app.
 * It contains the navigation container and the main navigation component.
 * @memberof App
 * @returns {React.Element} Rendered component.
 * 
*/

 const InsideApp =  () =>{
  const { loggedIn, setLoggedIn } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true); // Add a loading state

  /**
   * @function checkLoggedInStatus
   * @description This function checks if the user is logged in by fetching the value from AsyncStorage.
   * It also sets the loading state to false after checking.
   * @memberof InsideApp
   * @returns {void}
  */

  useEffect(() => {
    const checkLoggedInStatus = async () => {
      try {
          
        const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
        // check that user hasnt being logged in for more than 24 hours
        const lastLogin = await AsyncStorage.getItem('loggedInTime');

        const typeOfLogin = typeof(lastLogin)
        const now = new Date();
        const lastLoginDate = new Date(parseInt(lastLogin,10));
        const diff = now - lastLoginDate;
        const diffHours = diff / (1000 * 60 * 60);
        
        if (isLoggedIn === "true" && diffHours < 24) {
          // If the value exists, update the context or state accordingly
          setLoggedIn(isLoggedIn === 'true');
        }
        setLoggedIn(isLoggedIn === 'true');
      } catch (error) {
        console.error('Failed to fetch logged in status', error);
      }

      setIsLoading(false); // Set loading to false after checking
    };

    checkLoggedInStatus();
  }, []);

  if (isLoading) {
    return <LoadingScreen />; // Render a loading screen or null while checking
  }

  const colorScheme = Appearance.getColorScheme();
  const theme = colorScheme === 'dark' ? DarkTheme : DefaultTheme;
  return(
<PaperProvider theme={theme} >
      
      <NavigationContainer theme={theme}>

        { 
        loggedIn ?(
          <StackTest />):(
          <Stack.Navigator initialRouteName="LoginOrRegister">
          <Stack.Screen name="LoginOrRegister" component={Screen1} options={{ headerShown: false }}/>
          <Stack.Screen name="Register" component={Register} options={{ headerShown: false }}/>
          <Stack.Screen name="EmailVerification" component={EmailVerification} options={{ headerShown: false }}/>
          <Stack.Screen name="Password" component={Password} options={{ headerShown: false }}/>
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}/>
        </Stack.Navigator>
      )}
      </NavigationContainer>
     
    </PaperProvider>
  )
}

/**
 * @function App
 * @description This is the main app component. It is the root component of the app.
 * It contains the AuthProvider and the InsideApp component.
 * @memberof App
 * @returns {React.Element} Rendered component.
*/
export default function App() {
 

  return (
    <AuthProvider>
      <InsideApp />
  </AuthProvider>
  );
}
