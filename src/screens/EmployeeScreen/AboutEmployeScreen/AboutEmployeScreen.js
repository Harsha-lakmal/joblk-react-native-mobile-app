import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, Alert  ,Button} from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import styled from 'styled-components/native';
import Toast from 'react-native-toast-message';


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
    function get() {
        Toast.show({
            position: 'top',
            text1: 'Sign Up Successful',
            text2: 'Welcome aboard!',
            type: 'success',
        });
    }

    const showToast = () => {
        Toast.show({
          type: 'success',
          position: 'top',
          text1: 'Hello',
          text2: 'This is a toast message',
        });
      };

    return (
        <Container>
            <CoverImageContainer onPress={() => pickImage(setCoverImage)}>
                <CoverImage source={coverImage ? { uri: coverImage } : require('../../../assets/joblk.png')} />
            </CoverImageContainer>
            <ProfileImageContainer onPress={() => pickImage(setProfileImage)}>
                <ProfileImage source={profileImage ? { uri: profileImage } : require('../../../assets/joblk.png')} />
            </ProfileImageContainer>
            <Name>John Doe</Name>
            <UploadButton onPress={() => Alert.alert('Upload functionality to be implemented')}>
                <UploadButtonText>Upload</UploadButtonText>
            </UploadButton>
            <UploadButton onPress={get()}>
                <UploadButtonText>test</UploadButtonText>
            </UploadButton>
            <View>
                <Button title="Show Toast" onPress={showToast} />
                <Toast />
            </View>
        </Container>

    );
};

const Container = styled.View`
    flex: 1;
    align-items: center;
    background-color: #f5f5f5;
`;

const CoverImageContainer = styled.TouchableOpacity`
    width: 100%;
    height: 200px;
`;

const CoverImage = styled.Image`
    width: 100%;
    height: 100%;
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
`;

const ProfileImageContainer = styled.TouchableOpacity`
    margin-top: -50px;
    border-radius: 50px;
    overflow: hidden;
    border-width: 3px;
    border-color: #fff;
`;

const ProfileImage = styled.Image`
    width: 100px;
    height: 100px;
    border-radius: 50px;
`;

const Name = styled.Text`
    font-size: 24px;
    font-weight: bold;
    margin-top: 10px;
    color: #333;
`;

const UploadButton = styled.TouchableOpacity`
    margin-top: 20px;
    padding: 12px 20px;
    background-color: #007bff;
    border-radius: 5px;
`;

const UploadButtonText = styled.Text`
    color: #fff;
    font-size: 16px;
    font-weight: bold;
`;

export default AboutEmployeeScreen;
