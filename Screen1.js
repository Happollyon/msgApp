import * as React from 'react';
import { Text, View, StyleSheet,Button } from 'react-native';

export default function Screen1({navigation}) {
  return (
    <View style={styles.container}>
      <Text>Screen 1</Text>
    
        <Button
            title="Go to Screen 2"
            onPress={() => navigation.navigate('Screen2')}
            style={{opacity: 0.5}}/>
      
    </View>
  );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'green',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
  