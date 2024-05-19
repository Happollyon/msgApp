import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default function Screen2() {
  return (
    <View style={styles.container}>
      <Text>Screen f</Text>
    </View>
  );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'blue',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
  