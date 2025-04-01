import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import EmployeJobsCard from '../../../Comporont/EmployeJobsCard/EmployeJobsCard';
import Banner from '../../../Comporont/Banner/Banner';

const JobEmployeScreen = () => {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.cardContainer}>
        <Text style={styles.headerText}>Job opportunity</Text>
        <EmployeJobsCard/>
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

export default JobEmployeScreen;