import React, { useState } from 'react';
import {  View, StyleSheet, ScrollView, KeyboardAvoidingView, Platform,  TouchableWithoutFeedback, Keyboard} from 'react-native';
import { TextInput, Button, Text, Checkbox } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { instance, setAuthToken } from '../../services/AxiosHolder/AxiosHolder';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [tandc, setTandc] = useState(false);
    const [loading, setLoading] = useState(false); 
    const navigation = useNavigation(); 

 

    const validateForm = () => {
        if (!username || !password) {
            return false;
        }
       
    };

 
    const handleLogin = () => {
        if (!validateForm()) return; 

        setLoading(true); 
        instance.post('/user/login', { username, password })
            .then((response) => {
                setLoading(false); 

                if (response.data) {
                    setAuthToken(response.data.token);
                    successMessage();
                    fetchUserData();
                } else {
                    errorMessage(response.data.message || "Login failed!");
                }
            })
            .catch((error) => {
                setLoading(false); 
                console.error("Login error:", error);
                errorMessage(error.response?.data?.message || "An error occurred. Try again.");
            });
    };

    const fetchUserData = () => {
        instance.get(`/user/getUser/${username}`)
            .then((response) => {
                AsyncStorage.setItem("userData", JSON.stringify(response.data))
                    .then(() => {
                        switch (response.data.role) {
                            case "Admin":
                                navigation.navigate('AdminDashboard');
                                break;
                            case "Employee":
                                navigation.navigate('EmployeeDashboard');
                                break;
                            case "Trainer":
                                navigation.navigate('TrainersDashboard');
                                break;
                            default:
                                errorMessage("Invalid user role");
                        }
                    })
                    .catch(() => errorMessage("Could not save user data."));
            })
            .catch((error) => {
                console.error('Error fetching user data:', error);
                errorMessage("Could not fetch user data. Please try again.");
            });
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView contentContainerStyle={styles.innerContainer}>
                    <View style={styles.border}>
                        <Text style={styles.title}>Login</Text>

                        <TextInput
                            label="Username"
                            value={username}
                            onChangeText={setUsername}
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

                        <View style={styles.checkboxContainer}>
                            <Checkbox
                                status={tandc ? 'checked' : 'unchecked'}
                                onPress={() => setTandc(!tandc)}
                            />
                            <Text style={styles.checkboxText}>I agree to the Terms & Conditions</Text>
                        </View>

                        <Button
                            mode="contained"
                            onPress={handleLogin}
                            disabled={!tandc || loading} 
                            style={styles.button}
                        >
                            {loading ? 'Logging in...' : 'Login'}
                        </Button>

                        <Button
                            mode="outlined"
                            onPress={() => navigation.navigate('SignUp')}
                            style={styles.button}
                        >
                            Sign Up
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

export default LoginScreen;
