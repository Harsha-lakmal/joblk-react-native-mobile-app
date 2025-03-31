import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './src/screens/LoginScreen/LoginScreen';
import SignUpScreen from './src/screens/SignUpScreen/SignUpScreen';
import EmployeMenu from './src/screens/EmployeeScreen/EmployeMenu/EmployeMenu';
import NotFoundPage from './src/Comporont/NotFoundPage/NotFoundPage';
import Banner from './src/Comporont/Banner/Banner';
import { View ,Text} from 'react-native';
const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Menu" component={EmployeMenu} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="error" component={NotFoundPage} />
      </Stack.Navigator>
    </NavigationContainer>  
    // <View>
    //   <Banner/>
    // </View>
  ) ;  
}

export default App;
