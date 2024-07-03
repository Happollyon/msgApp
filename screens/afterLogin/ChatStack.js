import * as React from 'react';
import { View } from 'react-native';
import { createNativeStackNavigator} from '@react-navigation/native-stack';
import ChatScreen from './ChatScreen';
import ChatComponent from './ChatComponent';

const Stack = createNativeStackNavigator(); // Create a stack navigator

export default function ChatStack({navigation}) {
    return (
        <Stack.Navigator>
            <Stack.Screen name="ChatScreen" navigation={navigation} component={ChatScreen} />
            <Stack.Screen name="ChatComponent" component={ChatComponent} />
        </Stack.Navigator>
    );
}