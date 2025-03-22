import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import FilePickerManager from 'react-native-file-picker';
import courseImge from '../../../assets/joblk.png'

const CourseEmployeScreen = () => {
    const [courses, setCourses] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);

    useEffect(() => {
        const fetchedCourses = [
            {
                courseId: '1',
                courseTitle: 'Full Stack Web Development',
                courseDescription: 'Learn MERN stack development.',
                courseLocation: 'Online',
                courseQualification: 'Basic Programming Knowledge',
                courseContent: 'HTML, CSS, JavaScript, React, Node.js, MongoDB',
                courseStartDate: '2025-04-10',
                imgPath: require('../../../assets/joblk.png'), // Directly use require
            },
            {
                courseId: '2',
                courseTitle: 'Mobile App Development',
                courseDescription: 'Learn to build mobile apps using React Native.',
                courseLocation: 'Colombo',
                courseQualification: 'JavaScript Experience Required',
                courseContent: 'React Native, Firebase, Redux, UI/UX',
                courseStartDate: '2025-05-01',
                imgPath: require('../../../assets/joblk.png'),
            },
        ];
        setCourses(fetchedCourses);
    }, []);

    // Handle file selection
    const selectFile = () => {
        FilePickerManager.showFilePicker(null, (response) => {
            if (response.didCancel) {
                console.log('User cancelled file picker');
            } else if (response.error) {
                console.log('FilePicker Error: ', response.error);
            } else {
                setSelectedFile(response);
            }
        });
    };

    return (
        <ScrollView contentContainerStyle={styles.cardContainer}>
            {courses.length === 0 ? (
                <View style={styles.noCoursesContainer}>
                    <Text style={styles.noCoursesText}>No courses available at the moment.</Text>
                </View>
            ) : (
                courses.map((course) => (
                    <View key={course.courseId} style={styles.card}>
                        <View style={styles.imageContainer}>
                            <Image source={course.imgPath} style={styles.courseImage} />
                        </View>
                        <View style={styles.cardContent}>
                            <Text style={styles.courseTitle}>{course.courseTitle}</Text>
                            <Text style={styles.courseDescription}>{course.courseDescription}</Text>
                            <View style={styles.courseDetails}>
                                <View style={styles.courseDetailItem}>
                                    <Text style={styles.label}>Location:</Text>
                                    <Text style={styles.value}>{course.courseLocation}</Text>
                                </View>
                                <View style={styles.courseDetailItem}>
                                    <Text style={styles.label}>Qualification:</Text>
                                    <Text style={styles.value}>{course.courseQualification}</Text>
                                </View>
                                <View style={styles.courseDetailItem}>
                                    <Text style={styles.label}>Content:</Text>
                                    <Text style={styles.value}>{course.courseContent}</Text>
                                </View>
                                <View style={styles.courseDetailItem}>
                                    <Text style={styles.label}>Start Date:</Text>
                                    <Text style={styles.value}>{course.courseStartDate}</Text>
                                </View>
                            </View>

                            {/* File Upload Button */}
                            <TouchableOpacity style={styles.uploadButton} onPress={selectFile}>
                                <Text style={styles.uploadButtonText}>Upload CV</Text>
                            </TouchableOpacity>

                            {/* Display Selected File */}
                            {selectedFile && (
                                <Text style={styles.fileName}>Selected File: {selectedFile.fileName || 'Unnamed File'}</Text>
                            )}
                        </View>
                    </View>
                ))
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        padding: 10,
    },
    noCoursesContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    noCoursesText: {
        fontSize: 16,
        color: 'gray',
    },
    card: {
        backgroundColor: '#fff',
        borderWidth: 2,
        borderColor: '#ddd',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 4,
        marginBottom: 20,
        overflow: 'hidden',
        height: 400,
    },
    imageContainer: {
        width: '100%',
        height: 180,
        overflow: 'hidden',
    },
    courseImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    cardContent: {
        padding: 15,
    },
    courseTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    courseDescription: {
        marginTop: 10,
        fontSize: 14,
        color: '#666',
    },
    courseDetails: {
        marginTop: 15,
    },
    courseDetailItem: {
        flexDirection: 'row',
        marginBottom: 5,
    },
    label: {
        fontWeight: 'bold',
        color: '#333',
    },
    value: {
        color: '#666',
        marginLeft: 5,
    },
    uploadButton: {
        backgroundColor: '#007BFF',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 20,
    },
    uploadButtonText: {
        color: '#fff',
        fontSize: 16,
    },
    fileName: {
        marginTop: 10,
        color: '#333',
        fontSize: 14,
        textAlign: 'center',
    },
});

export default CourseEmployeScreen;
