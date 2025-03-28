import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import { TextInput, Button, Text, Checkbox } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { instance } from '../../services/AxiosHolder/AxiosHolder';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [tandc, setTandc] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();

    const successAlert = () => {
        Alert.alert(
            'Successful Login',
            'Welcome to the Dashboard',
            [
                {
                    text: 'OK',
                    onPress: () => console.log('OK Pressed'),
                },
            ],
            { cancelable: true }
        );
    };

    const errorAlert = () => {
        Alert.alert(
            'Unsuccessful Login',
            'Try Again Later',
            [
                {
                    text: 'OK',
                    onPress: () => console.log('OK Pressed'),
                },
            ],
            { cancelable: true }
        );
    };

    const errorMessage = (message) => {
        Alert.alert('Error', message, [{ text: 'OK' }], { cancelable: true });
    };

    const validateForm = () => {
        if (!username || !password) {
            return false;
        }
        return true;
    };

    const handleLogin = () => {
        if (!validateForm()) {
            errorMessage('Please fill in all fields');
            return;
        }

        setLoading(true);
        instance.post('/user/login', { username, password })
            .then((response) => {
                setLoading(false);
                successAlert();

                if (response.data) {
                    console.log(response.data);

                    AsyncStorage.setItem('authToken', response.data)
                        .then(() => {
                            fetchUserData();
                        })
                        .catch(() => errorMessage('Could not save auth token.'));
                } else {
                    errorMessage(response.data.message || 'Login failed!');
                }
            })
            .catch((error) => {
                console.log(error);
                
                setLoading(false);
                console.error('Login error:', error?.response?.data || error);
                errorMessage(error?.response?.data?.message || 'An error occurred. Try again.');
            });
    };

    const fetchUserData = async () => {
        try {
            const token = await AsyncStorage.getItem('authToken');
            console.log("token : " + token);
            console.log(username);

            instance.get(`/user/getUser/${username}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            })
                .then((response) => {
                    
                    AsyncStorage.setItem('userData', JSON.stringify(response.data))
                        .catch(() => errorMessage('Could not save user data.'));
                    

                        const navigateRole = response.data.role; 
                        console.log("response role : " + navigateRole);
    
                        if (navigateRole === "Employee") { 
                            console.log("open to menu");
    
                            navigation.navigate('Menu');
                        } else {
                            console.log("open to error");
    
                            navigation.navigate('error'); 
                        }
                })
                .catch((error) => {
                    console.error('Error fetching user data:', error);
                    errorMessage('Could not fetch user data. Please try again.');
                });
        } catch (error) {
            console.error('Error getting auth token:', error);
            errorMessage('Could not retrieve auth token. Please try again.');
        }
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
        position: 'relative',
    },
    border: {
        position: 'relative',
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
