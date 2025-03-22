import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { View, Text, SafeAreaView, Image } from "react-native";
import JobEmployeScreen from "../JobEmployeScreen/JobEmployeScreen";
import HomeEmployeScreen from "../HomeEmployeScreen/HomeEmployeScreen";
import CourseEmployeScreen from "../CourseEmployeScreen/CourseEmployeScreen";
import AboutEmployeScreen from "../AboutEmployeScreen/AboutEmployeScreen";

const homeIcon = require("../../../assets/home.png");
const aboutIcon = require("../../../assets/about.png");
const jobIcon = require("../../../assets/job.png");
const courseIcon = require("../../../assets/course.png");

// Dummy Screens
const HomeScreen = () => (
  <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <HomeEmployeScreen />
  </SafeAreaView>
);

const AboutScreen = () => (
  <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <AboutEmployeScreen />
  </SafeAreaView>
);

const JobScreen = () => (
  <View style={{ flex: 1 }}>
    <JobEmployeScreen />
  </View>
);

const CourseScreen = () => (
  <View style={{ flex: 1 }}>
    <CourseEmployeScreen />
  </View>
);

// Create Bottom Tab Navigator
const Tab = createBottomTabNavigator();

export default function EmployeNavigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused }) => {
            let iconSource;
            if (route.name === "Home") {
              iconSource = homeIcon;
            } else if (route.name === "About") {
              iconSource = aboutIcon;
            } else if (route.name === "Job") {
              iconSource = jobIcon;
            } else if (route.name === "Course") {
              iconSource = courseIcon;
            }
            return (
              <Image
                source={iconSource}
                style={{
                  width: 30, // Increased icon size
                  height: 30, // Increased icon size
                  tintColor: focused ? "tomato" : "gray",
                }}
              />
            );
          },
          tabBarStyle: {
            height: 80, // Increased tab bar height
            paddingBottom: 15, // Adjust padding for better alignment
            paddingTop: 10,
          },
          tabBarActiveTintColor: "tomato",
          tabBarInactiveTintColor: "gray",
          headerShown: false, // Hide header
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="About" component={AboutScreen} />
        <Tab.Screen name="Job" component={JobScreen} />
        <Tab.Screen name="Course" component={CourseScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
