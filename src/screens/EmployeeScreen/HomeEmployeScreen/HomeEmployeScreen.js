import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import FilePickerManager from 'react-native-file-picker';
import courseImge from '../../../assets/joblk.png';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window'); // Get the screen width

const HomeEmployeScreen = () => {
  const [jobs, setJobs] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchedJobs = [
      {
        jobId: '1',
        jobTitle: 'Software Engineer',
        jobDescription: 'Develop software solutions.',
        qualifications: 'Bachelor’s Degree in Computer Science',
        closingDate: '2025-03-30',
        location: 'Panadura',
      },
      {
        jobId: '2',
        jobTitle: 'Frontend Developer',
        jobDescription: 'Build user interfaces for web applications.',
        qualifications: 'Bachelor’s in IT or equivalent',
        closingDate: '2025-04-05',
        location: 'Colombo',
      },
    ];
    setJobs(fetchedJobs);
  }, []);

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

  function get(){
    const userData  =  AsyncStorage.getItem('userData');
    console.log("run ... ");
    console.log(userData);
    
  }

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

      <ScrollView contentContainerStyle={styles.cardContainer}>
        {jobs.length === 0 ? (
          <View style={styles.noJobsContainer}>
            <Text style={styles.noJobsText}>No jobs available at the moment.</Text>
          </View>
        ) : (
          jobs.map((job) => (
            <View key={job.jobId} style={styles.card}>
              <View style={styles.imageContainer}>
                <Image source={courseImge} style={styles.jobImage} />
              </View>
              <View style={styles.cardContent}>
                <Text style={styles.jobTitle}>{job.jobTitle}</Text>
                <Text style={styles.jobDescription}>{job.jobDescription}</Text>
                <View style={styles.jobDetails}>
                  <View style={styles.jobDetailItem}>
                    <Text style={styles.label}>Qualifications:</Text>
                    <Text style={styles.value}>{job.qualifications}</Text>
                  </View>
                  <View style={styles.jobDetailItem}>
                    <Text style={styles.label}>Closing Date:</Text>
                    <Text style={styles.value}>{job.closingDate}</Text>
                  </View>
                  <View style={styles.jobDetailItem}>
                    <Text style={styles.label}>Location:</Text>
                    <Text style={styles.value}>{job.location}</Text>
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

        <TouchableOpacity style={styles.uploadButton} onPress={get()}>
          <Text style={styles.uploadButtonText}>Test</Text>
        </TouchableOpacity>

      </ScrollView>
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
    width: width * 0.9, // Set width to 90% of the screen width
    alignSelf: 'center', // Center the card horizontally
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
  jobImage: {
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
  jobTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  jobDescription: {
    marginTop: 10,
    fontSize: 14,
    color: '#666',
  },
  courseDetails: {
    marginTop: 15,
  },
  jobDetails: {
    marginTop: 15,
  },
  courseDetailItem: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  jobDetailItem: {
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
  noJobsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  noJobsText: {
    fontSize: 16,
    color: 'gray',
  },
});

export default HomeEmployeScreen;
