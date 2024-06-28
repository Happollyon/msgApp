import React  from 'react';
import { View, Text } from 'react-native';
import { Button,useTheme } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../../AuthContext';
import { useContext } from 'react';

export default function ProfileScreen() {

    
    const { setLoggedIn } = useContext(AuthContext);
    const logout = async () => {
        console.log("logout");
        await AsyncStorage.removeItem('isLoggedIn');
        await AsyncStorage.removeItem('loggedInTime');
        await AsyncStorage.removeItem('token');
        setLoggedIn(false);
    }
    const theme = useTheme();
    return (
        <View>
       
       <Button onPress={logout} style={{width:"50%", marginBottom:"2%"}} textColor='#fff' icon="arrow-right-thick" mode='elevated' buttonColor = {theme.colors.primary}>
                Next
        </Button>
        </View>
    );
    }