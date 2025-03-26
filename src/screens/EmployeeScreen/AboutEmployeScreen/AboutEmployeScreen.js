import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, Alert, Button, StyleSheet, ScrollView } from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import UpdateUserCard from '../../../Comporont/UpdateUserCard/UpdateUserCard';

const AboutEmployeeScreen = () => {
    const [coverImage, setCoverImage] = useState(null);
    const [profileImage, setProfileImage] = useState(null);

    const pickImage = (setImage) => {
        ImagePicker.launchImageLibrary({ mediaType: 'photo' }, (response) => {
            if (!response.didCancel && !response.error && response.assets.length > 0) {
                setImage(response.assets[0].uri);
            }
        });
    };



    return (
        <ScrollView>

            <View style={styles.container}>
                <TouchableOpacity onPress={() => pickImage(setCoverImage)} style={styles.coverImageContainer}>
                    <Image
                        source={coverImage ? { uri: coverImage } : require('../../../assets/joblk.png')}
                        style={styles.coverImage}
                    />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => pickImage(setProfileImage)} style={styles.profileImageContainer}>
                    <Image
                        source={profileImage ? { uri: profileImage } : require('../../../assets/joblk.png')}
                        style={styles.profileImage}
                    />
                </TouchableOpacity>
                <View style={styles.infoContainer}>
                    {/* Employee Info */}
                    <View style={styles.infoRow}>
                        <Text style={styles.label}>Name</Text>
                        <Text style={styles.value}>Harsha Lakmal</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.label}>Email</Text>
                        <Text style={styles.value}>Lakmalharsha@gmail.com</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.label}>Role</Text>
                        <Text style={styles.value}>User</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.label}>Password</Text>
                        <Text style={styles.value}>••••••</Text>
                    </View>
                </View>


                <View style={styles.buttonWrapper}>

                        <UpdateUserCard/>

                    <TouchableOpacity style={styles.loginButton}>
                        <Text style={styles.loginButtonText}>Login out </Text>
                    </TouchableOpacity>
                </View>


            </View>


        </ScrollView>



    );
};
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
    loginButton : {
        backgroundColor: 'red',
        padding: 15,
        borderRadius: 8,
        marginBottom: 15,
        alignItems: 'center',
        elevation: 3,
        width: "100%",
        height: 60 

    }, 
    loginButtonText : {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',

    }
});


export default AboutEmployeeScreen;
