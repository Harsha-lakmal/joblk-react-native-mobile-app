import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import JoblkImge from '../../../assets/joblk.png';
import EmployeJobsCard from '../../../Comporont/EmployeJobsCard/EmployeJobsCard';


const JobEmployeScreen = () => {
  

  return (
    <ScrollView contentContainerStyle={styles.cardContainer}>
      
        <EmployeJobsCard/>
     
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    padding: 10,
  }
 
});

export default JobEmployeScreen;
