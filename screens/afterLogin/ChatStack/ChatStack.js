import * as React from 'react';
import { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ChatScreen from './ChatScreen';
import ChatComponent from './ChatComponent';
import { getFocusedRouteNameFromRoute, useNavigation } from '@react-navigation/native';

const Stack = createNativeStackNavigator(); // Create a stack navigator

/**
 * @module ChatStack
 * @description This module sets up the stack navigator for the chat screens.
 * @param {object} props - The properties passed to the component.
 * @param {object} props.navigation - The navigation object.
 * @param {object} props.routes - The routes object.
 * @returns {JSX.Element} The stack navigator for the chat screens.
 * @author Fagner Nunes
 */
export default function ChatStack({ navigation, routes }) {
    return (
        <Stack.Navigator initialRouteName='ChatScreen'>
            <Stack.Screen 
                name="ChatScreen" 
                component={ChatScreen} 
                options={{ headerShown: false }} 
            />
            <Stack.Screen 
                name="ChatComponent" 
                component={ChatComponent}   
                options={{
                     headerShown: false, gestureEnabled: false 
                  }}
            />
        </Stack.Navigator>
    );
}