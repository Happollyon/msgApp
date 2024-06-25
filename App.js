import { Appearance } from 'react-native';
import React, {useContext } from 'react';
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


const InsideApp = () =>{
  const {loggedIn} = useContext(AuthContext);

  const colorScheme = Appearance.getColorScheme();
  const theme = colorScheme === 'dark' ? DarkTheme : DefaultTheme;
  return(
<PaperProvider theme={theme} >
      
      <NavigationContainer theme={theme}>

        { 
        loggedIn ?(
          <MainNavigation />):(
        <Stack.Navigator initialRouteName="Loggin">
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

