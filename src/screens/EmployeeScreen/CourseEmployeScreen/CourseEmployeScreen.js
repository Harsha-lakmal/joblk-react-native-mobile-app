import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import FilePickerManager from 'react-native-file-picker';
import EmployeCourseCard from '../../../Comporont/EmployeCourseCard/EmployeCourseCard';
import Banner from '../../../Comporont/Banner/Banner';

const CourseEmployeScreen = () => {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.cardContainer}>
        <Text style={styles.headerText}>Course opportunity</Text>
        <EmployeCourseCard/>
      </ScrollView>
      
      <Banner />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  cardContainer: {
    padding: 10,
    paddingBottom: 100, 
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
    color: "#6495ED"
  },
});

export default CourseEmployeScreen;