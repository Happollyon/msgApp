import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, Touchable, TouchableOpacity } from 'react-native';

export default function ContactsScreen({}) {
    const navigation = useNavigation();
    return (
        <View style={{flex:1,display:"flex",flexDirection:"column",justifyContent:"center"}}>
            <Text>Contacts Screen</Text>
                <Text>Chat Screen</Text>
                <TouchableOpacity onPress={() => navigation.navigate('TestScreen')}>
                    <Text>Go to Test Screen</Text>
                </TouchableOpacity>
        </View>
    );
    }