import React from 'react';
import { StyleSheet, ScrollView, Text } from 'react-native';
import EmployeCourseCard from '../../../Comporont/EmployeCourseCard/EmployeCourseCard';
import EmployeJobsCard from '../../../Comporont/EmployeJobsCard/EmployeJobsCard';

const HomeEmployeScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.cardContainer}>
      <Text style={styles.headerText}>Job opportunity</Text>
      <EmployeCourseCard />

      <Text style={styles.headerText}>Course opportunity</Text>
      <EmployeJobsCard />
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
  },
});

export default HomeEmployeScreen;
