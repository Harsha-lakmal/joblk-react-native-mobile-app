import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, SafeAreaView, Image } from "react-native";
import JobEmployeScreen from "../JobEmployeScreen/JobEmployeScreen";
import HomeEmployeScreen from "../HomeEmployeScreen/HomeEmployeScreen";
import CourseEmployeScreen from "../CourseEmployeScreen/CourseEmployeScreen";
import AboutEmployeScreen from "../AboutEmployeScreen/AboutEmployeScreen";

// Import Icons
const homeIcon = require("../../../assets/home.png");
const aboutIcon = require("../../../assets/about.png");
const jobIcon = require("../../../assets/job.png");
const courseIcon = require("../../../assets/course.png");

// Dummy Screens Wrapping Actual Components
const HomeScreen = () => (
  <SafeAreaView style={{ flex: 1 }}>
    <HomeEmployeScreen />
  </SafeAreaView>
);

const AboutScreen = () => (
  <SafeAreaView style={{ flex: 1 }}>
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

// Bottom Tab Navigator
const Tab = createBottomTabNavigator();

export default function EmployeMenu() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let iconSource;

          switch (route.name) {
            case "Home":
              iconSource = homeIcon;
              break;
            case "About":
              iconSource = aboutIcon;
              break;
            case "Job":
              iconSource = jobIcon;
              break;
            case "Course":
              iconSource = courseIcon;
              break;
            default:
              iconSource = homeIcon;
          }

          return (
            <Image
              source={iconSource}
              style={{
                width: 30,
                height: 30,
                tintColor: focused ? "tomato" : "gray",
              }}
            />
          );
        },
        tabBarStyle: {
          height: 80,
          paddingBottom: 15,
          paddingTop: 10,
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="About" component={AboutScreen} />
      <Tab.Screen name="Job" component={JobScreen} />
      <Tab.Screen name="Course" component={CourseScreen} />
    </Tab.Navigator>
  );
}
