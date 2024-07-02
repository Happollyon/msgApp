import { Appearance } from 'react-native';
import React, {useContext,useState,useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator} from '@react-navigation/native-stack';
import { PaperProvider,DefaultTheme, DarkTheme,BottomNavigation,useTheme  } from 'react-native-paper';
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
import ContactsScreen from './screens/afterLogin/ContactsScreen';
import ProfileScreen from './screens/afterLogin/ProfileScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';


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

const MainNavigation = () => {
  const theme = useTheme();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'chat',title: 'Chat', focusedIcon: 'message-text',unfocusedIcon: 'message-text-outline' },
    { key: 'contacts', title: 'Contacts', focusedIcon: 'account-multiple',unfocusedIcon: 'account-multiple-outline'},
    { key: 'profile', title: 'Profile', focusedIcon: 'account-circle' ,unfocusedIcon: 'account-circle-outline'},
  ]);

  const renderScene = BottomNavigation.SceneMap({
    chat: ChatRoute,
    contacts: ContactsRoute,
    profile: ProfileRoute,
  });

  return (
    <BottomNavigation
      barStyle={{backgroundColor: theme.colors.primary}}
      inactiveColor={theme.colors.onPrimary}
      activeColor={theme.colors.onPrimaryContainer}
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
};

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
        console.log(lastLogin,typeOfLogin,now,"last login date ",lastLoginDate, diff,"diff in hours ",diffHours);
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

