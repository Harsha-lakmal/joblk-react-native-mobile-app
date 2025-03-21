import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, KeyboardAvoidingView, Platform,TouchableWithoutFeedback, Keyboard} from 'react-native';
import { TextInput, Button, Text, Checkbox } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { instance, setAuthToken } from '../../services/AxiosHolder/AxiosHolder';
import Swal from 'sweetalert2';
import { Picker } from '@react-native-picker/picker';

const SignUpScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("");  // Track role
  const [tandc, setTandc] = useState(false);
  const [loading, setLoading] = useState(false);

  const successMessage = () => {
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "SignUp Successful",
      showConfirmButton: false,
      timer: 2000,
    });
  };

  const errorMessage = (msg) => {
    Swal.fire({
      position: "top-end",
      icon: "error",
      title: msg || "SignUp Unsuccessful",
      showConfirmButton: false,
      timer: 2000,
    });
  };

  const validateForm = () => {
    if (!username || !password || !email || !confirmPassword || !role) {
      errorMessage("Please fill all fields.");
      return false;
    }
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
      errorMessage("Please enter a valid email.");
      return false;
    }
    if (password !== confirmPassword) {
      errorMessage("Passwords do not match.");
      return false;
    }
    return true;
  };

  const handleSignUp = () => {
    if (!validateForm()) return;

        successMessage();

  };

  const roles = ['Admin ', ' Employee ', ' Trainer ', ' Employees']; // Define the roles

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.innerContainer}>
          <View style={styles.border}>
            <Text style={styles.title}>Sign Up</Text>

            <TextInput
              label="Username"
              value={username}
              onChangeText={setUsername}
              mode="outlined"
              style={styles.input}
              theme={{ colors: { text: '#ffff' } }}
            />

            <TextInput
              label="Email"
              value={email}
              onChangeText={setEmail}
              mode="outlined"
              style={styles.input}
              theme={{ colors: { text: '#ffff' } }}
            />
            <TextInput
              label="Password"
              value={password}
              onChangeText={setPassword}
              mode="outlined"
              secureTextEntry
              style={styles.input}
              theme={{ colors: { text: '#ffff' } }}
            />
            <TextInput
              label="Confirm Password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              mode="outlined"
              secureTextEntry
              style={styles.input}
              theme={{ colors: { text: '#ffff' } }}
            />

            {/* Role Selection Dropdown */}
            <View style={styles.roleContainer}>
              <Text style={styles.label}>Role</Text>
              <Picker
                selectedValue={role}
                onValueChange={(itemValue) => setRole(itemValue)}
                style={styles.picker}
              >
                <Picker.Item label="Select Role" value="" />
                {roles.map((roleOption, index) => (
                  <Picker.Item key={index} label={roleOption} value={roleOption} />
                ))}
              </Picker>
            </View>

            <View style={styles.checkboxContainer}>
              <Checkbox
                status={tandc ? 'checked' : 'unchecked'}
                onPress={() => setTandc(!tandc)}
              />
              <Text style={styles.checkboxText}>I agree to the Terms & Conditions</Text>
            </View>

            <Button
              mode="contained"
              onPress={handleSignUp}
              disabled={!tandc || loading} // Disable button while loading or if T&C is not checked
              style={styles.button}
            >
              {loading ? 'Signing up...' : 'Sign Up'}
            </Button>


            <Button
              mode="outlined"
              onPress={() => navigation.navigate('login')}
              style={styles.button}
            >
              Login
            </Button>

          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    position: "relative",
  },
  border: {
    position: "relative",
    top: -20,
  },
  innerContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: 'black',
  },
  input: {
    marginBottom: 10,
    backgroundColor: 'white',
    color: '#FFFFFF',
    height: 50,
    fontSize: 20,
  },
  roleContainer: {
    marginBottom: 10,
  },
  label: {
    color: 'black',
    marginBottom: 5,
    fontSize: 16,
  },
  picker: {
    height: 50,
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkboxText: {
    color: 'black',
    marginLeft: 8,
    fontSize: 25,
  },
  button: {
    marginBottom: 10,
    height: 45,
    justifyContent: 'center',
    width: '80%',
    alignSelf: 'center',
  },
});

export default SignUpScreen;
