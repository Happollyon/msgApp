import { Appearance } from 'react-native';
import React, {useContext,useState,useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator} from '@react-navigation/native-stack';
import { PaperProvider,DefaultTheme, DarkTheme  } from 'react-native-paper';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; 
import { AuthProvider, AuthContext } from './AuthContext';




// ################### Screen Imports before Login ###################
import Screen1 from './screens/beforeLogin/LoginOrRegister';
import Register from './screens/beforeLogin/Register';
import Login from './screens/beforeLogin/Login';
import Password from './screens/beforeLogin/Password';
import EmailVerification from './screens/beforeLogin/EmailVerification';
import LoadingScreen from './screens/beforeLogin/LoadingScreen';


// ################### Screen Imports after Login ###################
import ChatScreen from './screens/afterLogin/ChatScreen';
import ConatctsScreen from './screens/afterLogin/ContactsScreen';
import ProfileScreen from './screens/afterLogin/ProfileScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator()


/**
 * @module App
 * @description This is the App component. It is the root component of the app.
 * @author Fagner Nunes
 * @returns {React.Element} Rendered component.
 */


function  MainNavigation () {
 
  return (
    <Tab.Navigator>
      <Tab.Screen name="Chat" component={ChatScreen} />
      <Tab.Screen name="Contacts" component={ConatctsScreen} />
      <Tab.Screen name="ProfileScreen" component={ProfileScreen} />
      {/* Add more tabs as needed */}
    </Tab.Navigator>
  );
}


 const InsideApp =  () =>{
  const { loggedIn, setLoggedIn } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true); // Add a loading state

  useEffect(() => {
    const checkLoggedInStatus = async () => {
      try {
          
        const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
      
        if (isLoggedIn === "true") {
          // If the value exists, update the context or state accordingly
          setLoggedIn(isLoggedIn === 'true');
        }
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
          <MainNavigation />):(
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

export default function App() {
 

  return (
    <AuthProvider>
      <InsideApp />
  </AuthProvider>
  );
}

