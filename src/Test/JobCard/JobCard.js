import React, { useState, useEffect } from 'react';
import { View, Text, Image, Button, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { instance } from '../../services/AxiosHolder/AxiosHolder'; 
import { FilePickerManager } from 'react-native-file-picker'; // Import FilePickerManager
import AsyncStorage from '@react-native-async-storage/async-storage';


function JobCard() {
  const [jobs, setJobs] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
  const [courseImages, setCourseImages] = useState({}); 
  const token = AsyncStorage.getItem('authToken'); // This should be replaced with AsyncStorage in React Native

  useEffect(() => {
    if (!token) {
      setError('No authentication token found.');
      setLoading(false);
      return;
    }
    getData();
    const interval = setInterval(() => {
      getData();
    }, 40000);

    return () => clearInterval(interval);
  }, []);

  function getData() {
    if (!token) return;
    instance
      .get('/job/getAllJobs', {
        headers: { 'Authorization': `Bearer ${token}` },
      })
      .then((response) => {
        setJobs(response.data.content);
        const newImages = {};
        response.data.content.forEach((job) => {
          getimg(job.jobId, newImages);
        });
        setLoading(false);
      })
      .catch((error) => {
        setError('Failed to load jobs.');
        setLoading(false);
        console.error(error);
      });
  }

  const getimg = (jobId, newImages) => {
    instance
      .get(`/job/get/image/${jobId}`, {
        headers: { 'Authorization': `Bearer ${token}` },
        responseType: 'blob',
      })
      .then((res) => {
        newImages[jobId] = { uri: URL.createObjectURL(res.data) };
        setCourseImages((prevImages) => ({ ...prevImages, ...newImages }));
      })
      .catch((err) => {
        console.error('Error fetching image:', err);
      });
  };

  const handleFileChange = () => {
    FilePickerManager.showFilePicker({}, (response) => {
      if (response.didCancel) {
        console.log('User cancelled file picker');
      } else if (response.error) {
        console.error('FilePickerManager Error: ', response.error);
      } else {
        console.log('Selected file:', response);
        // Implement file upload logic here
      }
    });
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text style={{ textAlign: 'center', color: 'red' }}>{error}</Text>;
  }

  return (
    <FlatList
      data={jobs}
      keyExtractor={(item) => item.jobId.toString()}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <View style={styles.imageContainer}>
            <Image
              source={courseImages[item.jobId] || require('../../assets/joblk.png')}
              style={styles.image}
            />
          </View>
          <View style={styles.content}>
            <Text style={styles.jobTitle}>{item.jobTitle}</Text>
            <Text style={styles.jobDescription}>{item.jobDescription}</Text>
            <View style={styles.details}>
              <Text style={styles.detailLabel}>Qualifications:</Text>
              <Text style={styles.detailText}>{item.qualifications}</Text>
              <Text style={styles.detailLabel}>Closing Date:</Text>
              <Text style={styles.detailText}>{item.jobClosingDate}</Text>
              <Text style={styles.detailLabel}>Location:</Text>
              <Text style={styles.detailText}>Panadura</Text>
            </View>
            <View style={styles.uploadSection}>
              <Text style={styles.uploadLabel}>Upload Your CV:</Text>
              <Button title="Upload CV" onPress={handleFileChange} />
            </View>
          </View>
        </View>
      )}
      ListEmptyComponent={<Text style={styles.noJobs}>No jobs available at the moment.</Text>}
    />
  );
}

const styles = {
  card: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    margin: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  imageContainer: {
    height: 200,
    marginBottom: 12,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
    resizeMode: 'cover',
  },
  content: {
    padding: 10,
  },
  jobTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  jobDescription: {
    marginTop: 8,
    color: 'gray',
  },
  details: {
    marginTop: 12,
  },
  detailLabel: {
    fontWeight: 'bold',
  },
  detailText: {
    color: 'gray',
  },
  uploadSection: {
    marginTop: 16,
  },
  uploadLabel: {
    fontSize: 14,
    marginBottom: 8,
  },
  noJobs: {
    textAlign: 'center',
    padding: 20,
    color: 'gray',
  },
};

export default JobCard;
