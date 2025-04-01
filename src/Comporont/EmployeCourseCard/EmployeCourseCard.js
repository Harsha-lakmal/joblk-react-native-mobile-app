import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, Alert, StyleSheet, ScrollView } from "react-native";
import { instance } from "../../services/AxiosHolder/AxiosHolder";
import joblkimg from "../../assets/joblk.png";
import AsyncStorage from '@react-native-async-storage/async-storage';

function EmployeCourseCard() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [courseImages, setCourseImages] = useState({});
    const [token, setToken] = useState("");

    useEffect(() => {
        const getToken = async () => {
            try {
                const tokenFromStorage = await AsyncStorage.getItem("authToken");
                if (tokenFromStorage) {
                    setToken(tokenFromStorage);
                }
            } catch (error) {
                console.error("Error retrieving token:", error);
            }
        };

        getToken();
    }, []);

    useEffect(() => {
        if (token) {
            getData();

            const interval = setInterval(() => {
                checkForChanges();
            }, 40000);

            return () => clearInterval(interval);
        }
    }, [token]);

    const getData = async () => {
        try {
            setLoading(true);
            const response = await instance.get("/course/getAllCourse", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setCourses(response.data.content);
            setLoading(false);

            response.data.content.forEach((course) => {
                if (!courseImages[course.courseId]) {
                    getimg(course.courseId);
                }
            });
        } catch (error) {
            setError("Failed to load courses.");
            setLoading(false);
            console.error(error);
        }
    };

    const getimg = async (courseId) => {
        try {
            const response = await instance.get(`course/get/image/${courseId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                responseType: 'arraybuffer',
            });

            const base64 = btoa(
                new Uint8Array(response.data).reduce((data, byte) => data + String.fromCharCode(byte), '')
            );

            const imageUri = `data:image/jpeg;base64,${base64}`;

            setCourseImages((prevImages) => ({
                ...prevImages,
                [courseId]: imageUri,
            }));
        } catch (err) {
            
        }
    };

    const checkForChanges = async () => {
        try {
            const response = await instance.get("/course/getAllCourse", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (JSON.stringify(response.data.content) !== JSON.stringify(courses)) {
                setCourses(response.data.content);
                response.data.content.forEach((course) => {
                    if (!courseImages[course.courseId]) {
                        getimg(course.courseId);
                    }
                });
            }
        } catch (error) {
            setError("Failed to check for course updates.");
            console.error(error);
        }
    };

    const cvUploadHandle = async () => {
        try {
            const storedUserData = await AsyncStorage.getItem('userData');
            const storedToken = await AsyncStorage.getItem('authToken');

            const parsedUserData = JSON.parse(storedUserData);
            const userId = parsedUserData.id;

            if (!userId || !storedToken) return;

            setError("");

            const response = await instance.get(`/user/getCvDocument/${userId}`, {
                headers: { Authorization: `Bearer ${storedToken}` },
                responseType: 'blob',
            });

            if (response.data) {
                const blob = response.data;
                const reader = new FileReader();
                reader.onloadend = () => {
                    const base64String = reader.result;
                    console.log(base64String);
                    Alert.alert('Success', 'CV uploaded successfully');
                };
                reader.readAsDataURL(blob);
            }

        } catch (err) {
            Alert.alert("Failed to  CV document ");
             Alert.alert('Failed', 'CV  document uploaded Unsuccessfully');
            console.error("Error fetching CV document:", err.response || err);
        }
    };

    return (
        <ScrollView style={styles.container}>
            {loading && <Text style={styles.loadingText}>Loading...</Text>}
            {error && <Text style={styles.errorText}>{error}</Text>}

            {courses.map((course) => (
                <View key={course.courseId} style={styles.card}>
                    <View style={styles.header}>
                        <Text style={styles.title}>{course.courseTitle}</Text>
                    </View>

                    <View style={styles.content}>
                        <View style={styles.imageContainer}>
                            <Image
                                source={courseImages[course.courseId]
                                    ? { uri: courseImages[course.courseId] }
                                    : joblkimg}
                                style={styles.image}
                            />
                        </View>

                        <View style={styles.courseDetails}>
                            <Text style={styles.label}>Course Description:</Text>
                            <Text style={styles.text}>{course.courseDescription}</Text>

                            <Text style={styles.label}>Course Content:</Text>
                            <Text style={styles.text}>{course.courseContent}</Text>

                            <Text style={styles.label}>Course Qualifications:</Text>
                            <Text style={styles.text}>{course.courseQualification}</Text>

                            <Text style={styles.label}>Course Start Date:</Text>
                            <Text style={styles.text}>{course.courseStartDate}</Text>

                            <Text style={styles.label}>Course Location:</Text>
                            <Text style={styles.text}>{course.courseLocation}</Text>
                        </View>

                        <TouchableOpacity style={styles.uploadButton} onPress={cvUploadHandle}>
                            <Text style={styles.uploadButtonText}>Upload CV</Text>
                        </TouchableOpacity>

                    </View>
                </View>
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    loadingText: {
        textAlign: "center",
        fontSize: 18,
        marginVertical: 20,
    },
    errorText: {
        textAlign: "center",
        fontSize: 18,
        marginVertical: 20,
        color: "red",
    },
    card: {
        backgroundColor: "white",
        marginBottom: 20,
        borderRadius: 10,
        padding: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    header: {
        marginBottom: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#333",
    },
    content: {
        alignItems: "center",
    },
    imageContainer: {
        marginBottom: 16,
    },
    image: {
        width: 200,
        height: 150,
        resizeMode: "cover",
        borderRadius: 10,
    },
    courseDetails: {
        width: "100%",
        marginBottom: 16,
    },
    label: {
        fontWeight: "bold",
        fontSize: 16,
        color: "#333",
    },
    text: {
        fontSize: 14,
        color: "#666",
    },
    uploadSection: {
        marginTop: 16,
        alignItems: "center",
    },
    uploadLabel: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 8,
    },
    uploadButton: {
        backgroundColor: "#007bff",
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 5,
    },
    uploadButtonText: {
        color: "white",
        fontSize: 16,
    },
    fileName: {
        fontSize: 16,
        marginTop: 8,
    },
});

export default EmployeCourseCard;
