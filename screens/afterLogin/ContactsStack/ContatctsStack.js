/**
 * @module ContactsStack
 * @description Stack navigator for the contacts-related screens.
 * @author Fagner Nunes
 */

import * as React from 'react';
import { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ContactsScreen from './ContactsScreen';
import { NavigationContainer, useNavigation, useRoute } from '@react-navigation/native';
import TestScreen from './TestScreen';

const Stack = createNativeStackNavigator(); // Create a stack navigator

/**
 * @function ContactsStack
 * @description This function sets up the stack navigator for the contacts-related screens.
 * @memberof ContactsStack
 * @param {object} navigation - The navigation prop passed to the component.
 * @returns {JSX.Element} The stack navigator component.
 */
export default function ContactsStack({ navigation }) {
    return (
        <Stack.Navigator initialRouteName='ContactsScreen'>
            <Stack.Screen 
                name="ContactsScreen" 
                component={ContactsScreen} 
                options={{ headerShown: false }} 
            />
        </Stack.Navigator>
    );
}