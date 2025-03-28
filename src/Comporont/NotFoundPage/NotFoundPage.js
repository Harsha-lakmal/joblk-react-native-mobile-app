import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const NotFoundPage = () => {
  const navigation = useNavigation();

  useEffect(() => {
    errorAlert();
  }, []);

  const errorAlert = () => {
    Alert.alert(
      'Error',
      'Error & Please Try Again later',
      [
        {
          text: 'OK',
          onPress: () => console.log('OK Pressed'),
        },
      ],
      { cancelable: true }
    );
  };

  function nav() {
    navigation.navigate('Login');
    console.log("Navigating to Login...");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Oops!</Text>
      <Text style={styles.subHeader}>404 - PAGE NOT FOUND</Text>
      <Text style={styles.message}>
        Only user (Employee) can log in. Please log in with a different account.
      </Text>

      <TouchableOpacity style={styles.button} onPress={nav}>
        <Text style={styles.buttonText}>Go to Signup</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 20,
   

  },
  header: {
    fontSize: 70,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  },
  subHeader: {
    fontSize: 34,
    fontWeight: '600',
    marginTop: 20,
    color: 'black',
  },
  message: {
    color: 'black',
    marginTop: 10,
    maxWidth: 280,
    textAlign: 'center',
    fontSize: 20,
  },
  button: {
    marginTop: 30,
    backgroundColor: '#1D4ED8',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default NotFoundPage;
