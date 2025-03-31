import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import JoblkImge from '../../../assets/joblk.png';
import EmployeJobsCard from '../../../Comporont/EmployeJobsCard/EmployeJobsCard';
import Banner from '../../../Comporont/Banner/Banner';


const JobEmployeScreen = () => {
  

  return (
    <ScrollView contentContainerStyle={styles.cardContainer}>
      
        <EmployeJobsCard/>
        <Banner/>
     
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    padding: 10,
  }
 
});

export default JobEmployeScreen;
