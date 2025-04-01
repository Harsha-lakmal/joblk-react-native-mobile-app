import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import FilePickerManager from 'react-native-file-picker';
import EmployeCourseCard from '../../../Comporont/EmployeCourseCard/EmployeCourseCard';
import Banner from '../../../Comporont/Banner/Banner';

const CourseEmployeScreen = () => {
  

    return (
        <ScrollView contentContainerStyle={styles.cardContainer}>
                  <Text style={styles.headerText}>Course opportunity</Text>
            
           <EmployeCourseCard/>
           <Banner style={styles.banner}/>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        padding: 10,  
    } ,   headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 10,
        color :"#6495ED"
      },
    
 
});

export default CourseEmployeScreen;
