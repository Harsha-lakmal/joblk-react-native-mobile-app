import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { instance } from "../../services/AxiosHolder/AxiosHolder";

function UpdateUserCard() {
  const [show, setShow] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedUserData = await AsyncStorage.getItem('userData');
        const storedToken = await AsyncStorage.getItem('authToken');

        if (storedUserData) {
          const parsedUserData = JSON.parse(storedUserData);
          setUserId(parsedUserData.id);
          setUsername(parsedUserData.username);
          setEmail(parsedUserData.email);
        }

        if (storedToken) {
          setToken(storedToken);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const showSuccessMessage = () => {
    Alert.alert('Success', 'Account updated successfully!', [{ text: 'OK', onPress: () => handleClose() }]);
  };

  const showErrorMessage = (message) => {
    Alert.alert('Error', message, [{ text: 'OK' }]);
  };

  const handleClose = () => {
    setShow(false);
    handleClear();
  };

  const handleShow = () => setShow(true);

  const handleClear = () => {
    setUsername('');
    setEmail('');
    setPassword('');
  };

  const updateUser = async () => {
    try {
    

      const userData = { id: userId, username, password, email };

      await instance.put(`/user/updateUser`, userData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      showSuccessMessage();
      handleClear();
    } catch (error) {
      console.error("Error updating user:", error);
      showErrorMessage(error.response?.data?.message || "Failed to update user.");
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.updateButton} onPress={handleShow}>
        <Text style={styles.buttonText}>Update Your Account</Text>
      </TouchableOpacity>

      <Modal visible={show} animationType="slide" transparent={true}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.title}>Update User</Text>
            <TextInput
              style={styles.input}
              placeholder="Username"
              value={username}
              onChangeText={setUsername}
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />

            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.clearButton} onPress={handleClear}>
                <Text style={styles.buttonText}>Clear</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.saveButton} onPress={updateUser}>
                <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
                <Text style={styles.buttonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  updateButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    alignItems: 'center',
    elevation: 3,
    width: 410,
    height: 60,
  },
  buttonText: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  title: { fontSize: 24, marginBottom: 20 },
  input: { width: '100%', borderBottomWidth: 1, marginBottom: 10, padding: 5 },
  buttonContainer: { flexDirection: 'row', marginTop: 10 },
  clearButton: { padding: 10, backgroundColor: 'gray', marginRight: 10, borderRadius: 5 },
  saveButton: { padding: 10, backgroundColor: 'green', marginRight: 10, borderRadius: 5 },
  closeButton: { padding: 10, backgroundColor: 'red', borderRadius: 5 },
});

export default UpdateUserCard;
