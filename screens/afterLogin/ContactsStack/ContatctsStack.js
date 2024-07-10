import * as React from 'react';
import { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ContactsScreen from './ContactsScreen';
import { NavigationContainer, useNavigation, useRoute } from '@react-navigation/native';
import TestScreen from './TestScreen';

const Stack = createNativeStackNavigator(); // Create a stack navigator

export default function ContactsStack({ navigation}) {
   
    
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