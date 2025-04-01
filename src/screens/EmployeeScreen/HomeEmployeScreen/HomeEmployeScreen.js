import React from 'react';
import { StyleSheet, ScrollView, Text } from 'react-native';
import EmployeCourseCard from '../../../Comporont/EmployeCourseCard/EmployeCourseCard';
import EmployeJobsCard from '../../../Comporont/EmployeJobsCard/EmployeJobsCard';
import Banner from '../../../Comporont/Banner/Banner';

const HomeEmployeScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.cardContainer}>
      <Text style={styles.headerText}>Job opportunity</Text>
      <EmployeCourseCard /> 

      <Text style={styles.headerText}>Course opportunity</Text>
      <EmployeJobsCard />
      <Banner style={styles.banner}/>
     
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    padding: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
    color :"#6495ED"
  },
  banner: {
    position: 'relative', // Changed from 'absolute' and 'sticky' to 'fixed'
    bottom: 22,
    right: 20,
    zIndex: 1000


  }
});

export default HomeEmployeScreen;
