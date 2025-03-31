import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import FilePickerManager from 'react-native-file-picker';
import EmployeCourseCard from '../../../Comporont/EmployeCourseCard/EmployeCourseCard';
import Banner from '../../../Comporont/Banner/Banner';

const CourseEmployeScreen = () => {
  

    return (
        <ScrollView contentContainerStyle={styles.cardContainer}>
           <EmployeCourseCard/>
           <Banner/>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        padding: 10,  
    }
 
});

export default CourseEmployeScreen;
