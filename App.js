import React from 'react';
import { View, StyleSheet ,Text  } from 'react-native';
import LoginScreen from './src/screens/LoginScreen/LoginScreen';
import SignUpScreen from './src/screens/SignUpScreen/SignUpScreen';
import HomeScreen from './src/screens/HomeScreen/HomeScreen';
import CourseEmployeScreen from './src/screens/EmployeeScreen/CourseEmployeScreen/CourseEmployeScreen';
import JobEmployeScreen from './src/screens/EmployeeScreen/JobEmployeScreen/JobEmployeScreen';
import AboutEmployeScreen from './src/screens/EmployeeScreen/AboutEmployeScreen/AboutEmployeScreen';
import HomeEmployeScreen from './src/screens/EmployeeScreen/HomeEmployeScreen/HomeEmployeScreen';
import EmployeNavigation from './src/screens/EmployeeScreen/EmployeNavigation/EmployeNavigation';
import EmployeesJobsCard from './src/component/JobsCard/EmployeesJobsCard';

function App() {
  return (
    <View style={styles.backgroundStyle}>
      {/* <LoginScreen /> */}
      {/* <SignUpScreen/> */}
        {/* <Text>My name is pakaya</Text> */}
        {/* <HomeScreen/> */}
        {/* <CourseEmployeScreen/> */}
        {/* <JobEmployeScreen/> */}
        {/* <AboutEmployeScreen/> */}
        {/* <HomeEmployeScreen/> */}

    <EmployeNavigation/>
    {/* <EmployeesJobsCard/> */}

    </View>
  );
}

const styles = StyleSheet.create({
  backgroundStyle: {
    flex: 1,
  }
 
});

export default App;
