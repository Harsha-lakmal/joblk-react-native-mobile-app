import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './src/screens/LoginScreen/LoginScreen';
import SignUpScreen from './src/screens/SignUpScreen/SignUpScreen';
import EmployeMenu from './src/screens/EmployeeScreen/EmployeMenu/EmployeMenu';
import JobEmployeScreen from './src/screens/EmployeeScreen/JobEmployeScreen/JobEmployeScreen';
import AboutEmployeeScreen from './src/screens/EmployeeScreen/AboutEmployeScreen/AboutEmployeScreen';
import { Text ,View} from 'react-native';
const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Menu" component={EmployeMenu} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    // <View>
    //   <AboutEmployeeScreen/>
    // </View>
 
  
  ) ; 
}

export default App;
