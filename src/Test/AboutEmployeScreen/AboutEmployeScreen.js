import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, Alert, StyleSheet, ScrollView } from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import UpdateUserCard from '../../Comporont/UpdateUserCard/UpdateUserCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { instance } from "../../services/AxiosHolder/AxiosHolder";

const AboutEmployeeScreen = () => {
    const [coverImage, setCoverImage] = useState(null);
    const [profileImage, setProfileImage] = useState(null);  
    const [userData, setUserData] = useState(null);
    const [userId, setUserId] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    // const navigation = useNavigation(); 

    // Fetch user data from AsyncStorage
    useEffect(() => {
        const fetchData = async () => {
            try {
                const storedUserData = await AsyncStorage.getItem('userData');
                const storedToken = await AsyncStorage.getItem('authToken');

                if (storedUserData) {
                    const parsedUserData = JSON.parse(storedUserData);
                    setUserData(parsedUserData);
                    setUserId(parsedUserData.id);
                    
                    // Call these after we have the user ID
                    getCoverImage(parsedUserData.id);
                    getProfileImage(parsedUserData.id);
                }
                
                if (storedToken) {
                    setToken(storedToken);
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (userId) {
            getCoverImage();
            getProfileImage();
        }
    }, [userId]);

    const pickImage = (setImage) => {
        const options = {
            mediaType: 'photo',
            includeBase64: false,
        };

        ImagePicker.launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.errorCode) {
                console.log('ImagePicker Error: ', response.errorMessage);
            } else if (response.assets && response.assets.length > 0) {
                const selectedImage = response.assets[0];
                setImage(selectedImage);
                
                // Determine which upload function to call based on the image type
                if (setImage === setCoverImage) {
                    uploadCoverImg(selectedImage);
                } else if (setImage === setProfileImage) {
                    uploadProfileImg(selectedImage);
                }
            }
        });
    };

    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem('userData');
            await AsyncStorage.removeItem('authToken');
            Alert.alert('Logged out successfully');
            // navigation.navigate('Login');
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    const uploadCoverImg = async (file) => {
        if (!userId || !file) {
            console.error("User ID or file is missing!");
            return;
        }

        setLoading(true);
        setError("");

        const formData = new FormData();
        formData.append("file", {
            uri: file.uri,
            type: file.type,
            name: file.fileName
        });

        try {
            const response = await instance.post(`/user/uploadCover/${userId}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            });

            console.log("Cover image upload successful", response.data);
            await getCoverImage();
        } catch (err) {
            setError("Failed to upload cover image.");
            console.error("Error uploading cover image:", err.response || err);
        } finally {
            setLoading(false);
        }
    };

    const uploadProfileImg = async (file) => {
        if (!userId || !file) {
            console.error("User ID or file is missing!");
            return;
        }

        setLoading(true);
        setError("");

        const formData = new FormData();
        formData.append("file", {
            uri: file.uri,
            type: file.type,
            name: file.fileName
        });

        try {
            const response = await instance.post(`/user/uploadProfile/${userId}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            });

            console.log("Profile image upload successful", response.data);
            await getProfileImage();
        } catch (err) {
            setError("Failed to upload profile image.");
            console.error("Error uploading profile image:", err.response || err);
        } finally {
            setLoading(false);
        }
    };

    const getCoverImage = async () => {
        if (!userId) return;

        setLoading(true);
        setError("");

        try {
            const response = await instance.get(`/user/get/imageCover/${userId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            console.log("Cover Image Response:", response.data);
            
            if (response.data && response.data.coverImage) {
                setCoverImage({ uri: response.data.coverImage });
            }
        } catch (err) {
            setError("Failed to load cover image.");
            console.error("Error fetching cover image:", err.response || err);
        } finally {
            setLoading(false);
        }
    };

    const getProfileImage = async () => {
        if (!userId) return;

        setLoading(true);
        setError("");

        try {
            const response = await instance.get(`/user/get/imageProfile/${userId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            console.log("Profile Image Response:", response.data);

            if (response.data && response.data.profileImage) {
                setProfileImage({ uri: response.data.profileImage });
            }
        } catch (err) {
            setError("Failed to load profile image.");
            console.error("Error fetching profile image:", err.response || err);
        } finally {
            setLoading(false);
        }
    };

    // Add logging to help diagnose image display issues
    useEffect(() => {
        console.log("Cover Image State:", coverImage);
        console.log("Profile Image State:", profileImage);
    }, [coverImage, profileImage]);

    return (
        <ScrollView>
            <View style={styles.container}>
                <TouchableOpacity onPress={() => pickImage(setCoverImage)} style={styles.coverImageContainer}>
                    <Image
                        source={
                            coverImage && coverImage.uri 
                                ? { uri: coverImage.uri }
                                : require('../../assets/joblk.png')
                        }
                        style={styles.coverImage}
                        resizeMode="cover"
                    />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => pickImage(setProfileImage)} style={styles.profileImageContainer}>
                    <Image
                        source={
                            profileImage && profileImage.uri 
                                ? { uri: profileImage.uri }
                                : require('../../assets/joblk.png')
                        }
                        style={styles.profileImage}
                        resizeMode="cover"
                    />
                </TouchableOpacity>

                <View style={styles.infoContainer}>
                    {userData && (
                        <>
                            <View style={styles.infoRow}>
                                <Text style={styles.label}>Name</Text>
                                <Text style={styles.value}>{userData.username}</Text>
                            </View>
                            <View style={styles.infoRow}>
                                <Text style={styles.label}>Email</Text>
                                <Text style={styles.value}>{userData.email}</Text>
                            </View>
                            <View style={styles.infoRow}>
                                <Text style={styles.label}>Role</Text>
                                <Text style={styles.value}>{userData.role}</Text>
                            </View>
                            <View style={styles.infoRow}>
                                <Text style={styles.label}>Password</Text>
                                <Text style={styles.value}>••••••</Text>
                            </View>
                        </>
                    )}
                </View>

                <View style={styles.buttonWrapper}>
                    <UpdateUserCard />

                    <TouchableOpacity style={styles.loginButton} onPress={handleLogout}>
                        <Text style={styles.loginButtonText}>Logout</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f5f5f5',
        padding: 20,
    },
    coverImageContainer: {
        width: '100%',
        height: 300,
        backgroundColor: '#ddd',
        borderRadius: 15,
        overflow: 'hidden',
        marginBottom: 30,
    },
    coverImage: {
        width: '100%',
        height: '100%',
        borderRadius: 15,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
    },
    profileImageContainer: {
        width: 120,
        height: 120,
        borderRadius: 60,
        overflow: 'hidden',
        borderWidth: 4,
        borderColor: '#fff',
        marginTop: -60,
        backgroundColor: '#fff',
    },
    profileImage: {
        width: '100%',
        height: '100%',
        borderRadius: 60,
    },
    buttonWrapper: {
        width: '100%',
        marginTop: 30,
    },
    uploadButton: {
        backgroundColor: '#007bff',
        padding: 15,
        borderRadius: 8,
        marginBottom: 15,
        alignItems: 'center',
        elevation: 3,
        width: "100%",
        height: 60
    },
    uploadButtonText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
    cardName: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 8,
        marginBottom: 15,
        alignItems: 'flex-start',
        elevation: 3,
        width: '100%',
        marginBottom: 30,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    name: {
        color: '#000',
        fontSize: 22,
        fontWeight: 'bold',
    },
    email: {
        color: '#000',
        fontSize: 16,
        marginTop: 10,
    },
    role: {
        color: '#000',
        fontSize: 16,
        marginTop: 10,
    },
    password: {
        color: '#000',
        fontSize: 16,
        marginTop: 10,
    },

    infoContainer: {
        width: '100%',
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        elevation: 2,
        marginBottom: 20,
    },
    infoRow: {
        flexDirection: 'row',
        marginBottom: 10,
        justifyContent: 'space-between',
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#007bff',
    },
    value: {
        fontSize: 16,
        color: '#333',
    },
    loginButton: {
        backgroundColor: 'red',
        paddingVertical: 15,
        borderRadius: 8,
        marginBottom: 15,
        alignItems: 'center',
        elevation: 3,
        width: "100%",
    },
    loginButtonText: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
    }
});

export default AboutEmployeeScreen;