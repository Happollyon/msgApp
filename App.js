import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PaperProvider } from 'react-native-paper';


// ################### Screen Imports before Login ###################
import Screen1 from './screens/beforeLogin/LoginOrRegister';
import Register from './screens/beforeLogin/Register';
import Login from './screens/beforeLogin/Login';
import Password from './screens/beforeLogin/Password';


const Stack = createNativeStackNavigator();
export default function App() {

  return (
    <PaperProvider >
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Password">
        <Stack.Screen name="LoginOrRegister" component={Screen1} options={{ headerShown: false }}/>
        <Stack.Screen name="Register" component={Register} options={{ headerShown: false }}/>
        <Stack.Screen name="Password" component={Password} options={{ headerShown: false }}/>
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
    </PaperProvider>
  );
}

