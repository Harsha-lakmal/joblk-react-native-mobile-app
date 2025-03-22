import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import JobEmployeScreen from "../EmployeeScreen/JobEmployeScreen/JobEmployeScreen";
import CourseEmployeScreen from "../EmployeeScreen/CourseEmployeScreen/CourseEmployeScreen";
import AboutEmployeScreen from "../EmployeeScreen/AboutEmployeScreen/AboutEmployeScreen";


const Tab = createBottomTabNavigator();

// Create a separate component for the actual Home content
function HomeContent() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Home Screen</Text>
    </View>
  );
}

export default function HomeScreen() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = "home-outline";
          } else if (route.name === "About") {
            iconName = "information-circle-outline";
          } else if (route.name === "CourseEmploye") {
            iconName = "school-outline";
          } else if (route.name === "JobEmploye") {
            iconName = "briefcase-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
      })}
    >
      {/* Tab Screens */}
      <Tab.Screen name="Home" component={HomeContent} />
      <Tab.Screen name="About" component={AboutEmployeScreen} />
      <Tab.Screen name="CourseEmploye" component={CourseEmployeScreen} />
      <Tab.Screen name="JobEmploye" component={JobEmployeScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
});