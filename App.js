import React from 'react';
import { View, StyleSheet ,Text  } from 'react-native';
import LoginScreen from './src/screens/LoginScreen/LoginScreen';
import SignUpScreen from './src/screens/SignUpScreen/SignUpScreen';

function App() {
  return (
    <View style={styles.backgroundStyle}>
      {/* <LoginScreen /> */}
      {/* <SignUpScreen/> */}
        <Text>My name is pakaya</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  backgroundStyle: {
    flex: 1,
  }
 
});

export default App;
