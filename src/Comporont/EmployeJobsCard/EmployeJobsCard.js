import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import JoblkImge from '../../assets/joblk.png';
import FilePickerManager from 'react-native-file-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { instance } from '../../../src/services/AxiosHolder/AxiosHolder';

const EmployeJobsCard = () => {
  const [jobs, setJobs] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [token, setToken] = useState(null);
  const [courseImages, setCourseImages] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const fetchedToken = await AsyncStorage.getItem('authToken');
        const fetchedUserData = await AsyncStorage.getItem('userData');
        
        if (!fetchedToken) {
          setError('No authentication token found.');
          setLoading(false);
          return;
        }
        setToken(fetchedToken);
        getData(fetchedToken);
      } catch (err) {
        setError('Error fetching user data.');
        setLoading(false);
      }
    };
    fetchUserData();

    const interval = setInterval(() => {
      if (token) {
        getData(token);
      }
    }, 40000);

    return () => clearInterval(interval);
  }, [token]);

  const getData = async (token) => {
    try {
      const response = await instance.get('/job/getAllJobs', {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      setJobs(response.data.content);
      setLoading(false);
      
      const newImages = {};
      for (const job of response.data.content) {
        await getimg(job.jobId, newImages);
      }
      setCourseImages(newImages);
    } catch (error) {
      setError('Failed to load jobs.');
      setLoading(false);
    }
  };

 const getimg = (jobId, newImages) => {
    instance
      .get(`/job/get/image/${jobId}`, {
        headers: { 'Authorization': `Bearer ${token}` },
        responseType: 'blob',
      })
      .then((res) => {
        newImages[jobId] = URL.createObjectURL(res.data);
        setCourseImages((prevImages) => ({ ...prevImages, ...newImages }));
      })
      .catch((err) => {
        console.error('Error fetching image:', err);
      });
  };

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
      {loading ? (
        <Text>Loading...</Text>
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : jobs.length === 0 ? (
        <View style={styles.noJobsContainer}>
          <Text style={styles.noJobsText}>No jobs available at the moment.</Text>
        </View>
      ) : (
        jobs.map((job) => (
          <View key={job.jobId} style={styles.card}>
            <View style={styles.imageContainer}>
              <Image source={courseImages[job.jobId] ? { uri: courseImages[job.jobId] } : JoblkImge} style={styles.jobImage} />
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
                  <Text style={styles.value}>{job.jobClosingDate}</Text>
                </View>
              </View>

              <TouchableOpacity style={styles.uploadButton} onPress={selectFile}>
                <Text style={styles.uploadButtonText}>Upload CV</Text>
              </TouchableOpacity>

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
  cardContainer: { padding: 10 },
  errorText: { color: 'red', fontSize: 16, textAlign: 'center', marginTop: 20 },
  noJobsContainer: { justifyContent: 'center', alignItems: 'center', padding: 20 },
  noJobsText: { fontSize: 16, color: 'gray' },
  card: { backgroundColor: '#fff', borderWidth: 2, borderColor: '#ddd', borderRadius: 10, marginBottom: 20, height: 400 },
  imageContainer: { width: '100%', height: 180 },
  jobImage: { width: '100%', height: '100%', resizeMode: 'cover' },
  cardContent: { padding: 15 },
  jobTitle: { fontSize: 20, fontWeight: 'bold', color: '#333' },
  jobDescription: { marginTop: 10, fontSize: 14, color: '#666' },
  jobDetails: { marginTop: 15 },
  jobDetailItem: { flexDirection: 'row', marginBottom: 5 },
  label: { fontWeight: 'bold', color: '#333' },
  value: { color: '#666', marginLeft: 5 },
  uploadButton: { backgroundColor: '#007BFF', padding: 10, borderRadius: 5, alignItems: 'center', marginTop: 20 },
  uploadButtonText: { color: '#fff', fontSize: 16 },
  fileName: { marginTop: 10, color: '#333', fontSize: 14, textAlign: 'center' },
});

export default EmployeJobsCard;
