import React, { Suspense, useState } from 'react';
import { View, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { TextInput, Button, Text, Checkbox } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import { instance } from '../../services/AxiosHolder/AxiosHolder';
import Toast from 'react-native-toast-message';

const SignUpScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('');
  const [tandc, setTandc] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  function successMessage() {
    Toast.show({
      position: 'top',
      text1: 'Sign Up Successful',
      text2: 'Welcome aboard!',
      type: 'success',
    });
  }

  function errorMessage(message) {
    Toast.show({
      position: 'top',
      text1: 'Sign Up Failed',
      text2: message || 'An unexpected error occurred',
      type: 'error',
    });
  }

  function test() {
    successMessage();
    console.log("username : "+username);
    console.log("passworld : "+password);
    console.log("comfom passowld :  "+confirmPassword);
    console.log("role : "+role);
    
    
    
    
  }

  const validateForm = () => {
    if (!username || !password || !email || !confirmPassword || !role) {
      errorMessage('Please fill all fields.');
      return false;
    }
    if (password !== confirmPassword) {
      errorMessage('Passwords do not match.');
      return false;
    }
    return true;
  };

  const handleSignUp = async () => {
    if (!validateForm() || loading) return;

    setLoading(true);

    

    const data = {
      username :  username , 
      email : email,
      password : password , 
      role : role 
    };


    console.log("data tika save : "+data.username);


    try {
      const response = await instance.post('user/register', data);
      setLoading(false);

      if (response.data.success) {
        successMessage();
        navigation.navigate('Login');
      } else {
        errorMessage(response.data.message || 'Sign Up Failed');
        console.log(response.data.message);
        
      }
    } catch (error) {
      console.log("error ekk"+error.response.data.message);
      setLoading(false);
      errorMessage(error.response?.data?.message || 'An unexpected error occurred');
      
    }
  };

  const roles = ['Employee', 'Trainer', 'Employees'];

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
            />

            <TextInput
              label="Email"
              value={email}
              onChangeText={setEmail}
              mode="outlined"
              style={styles.input}
            />

            <TextInput
              label="Password"
              value={password}
              onChangeText={setPassword}
              mode="outlined"
              secureTextEntry
              style={styles.input}
            />

            <TextInput
              label="Confirm Password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              mode="outlined"
              secureTextEntry
              style={styles.input}
            />

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
              disabled={!tandc || loading}
              style={styles.button}
            >
              {loading ? 'Signing up...' : 'Sign Up'}
            </Button>

            <Button
              mode="outlined"
              onPress={() => navigation.navigate('Login')}
              style={styles.button}
            >
              Login
            </Button>

            <Button
              mode="outlined"
              onPress={test} // Call test here directly
              style={styles.button}
            >
              Test
            </Button>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>

      <Toast />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  border: {
    top: -20,
  },
  innerContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    marginBottom: 10,
    backgroundColor: 'white',
    height: 50,
    fontSize: 20,
  },
  roleContainer: {
    marginBottom: 10,
  },
  label: {
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
    marginLeft: 8,
    fontSize: 16,
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
