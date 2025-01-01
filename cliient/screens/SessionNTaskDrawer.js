import React from "react";
import { SafeAreaView, View } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import TaskScreen from "./TaskScreen";
import StudySessionScreen from "./StudySessionScreen";
import Icon from 'react-native-vector-icons/Ionicons';


const Tab = createMaterialTopTabNavigator();

const SessionNTaskDrawer = () => {
  return (
    <Tab.Navigator
      style={{ borderBottomRightRadius: 30, borderBottomLeftRadius: 30 }}
      screenOptions={{
        tabBarActiveTintColor: "black",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: {
          backgroundColor: "white",
          elevation: 0,
          borderBottomWidth: 1,
          borderColor: "white",
        },
        tabBarLabelStyle: {
          fontSize: 14, // Font size for labels
          fontWeight: "bold", // Font weight for labels
        },

        tabBarIndicatorStyle: {
          backgroundColor: "black", // Indicator color
          height: 4, // Height of the indicator
          borderRadius: 30, // Rounded corners for the indicator
        },
      }}
    >
      <Tab.Screen
        name="Create Session"
        component={StudySessionScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Icon
              name={focused ? "calendar" : "calendar-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Create Task"
        component={TaskScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Icon
              name={focused ? "clipboard" : "clipboard-outline"} 
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default SessionNTaskDrawer;
