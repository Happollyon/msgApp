import * as React from 'react';
import { View } from 'react-native';
import { createNativeStackNavigator} from '@react-navigation/native-stack';
import ChatScreen from './ChatScreen';
import ChatComponent from './ChatComponent';

const Stack = createNativeStackNavigator(); // Create a stack navigator

export default function ChatStack({navigation}) {
    return (
        <Stack.Navigator initialRouteName='ChatComponent'>
            <Stack.Screen name="ChatScreen" navigation={navigation} component={ChatScreen} options={{ headerShown: false }} />
            <Stack.Screen name="ChatComponent" navigation={navigation}component={ChatComponent}options={{ headerShown: false, gestureEnabled:false }} />
        </Stack.Navigator>
    );
}