import React from "react";
import { View, Text, SafeAreaView } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import UsersScreen from "./UsersScreen";
import BlobPage from "./BlogPage";
import Icon from 'react-native-vector-icons/Ionicons';

const Tab = createMaterialTopTabNavigator();

const CommunityScreen = () => {
  return (
    <Tab.Navigator
      initialRouteName="Friends"
      backBehavior="initialRoute" // Set backBehavior to "initialRoute"
      style={{borderBottomRightRadius: 30, borderBottomLeftRadius: 30}}
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
          backgroundColor: 'black', // Indicator color
          height: 4, // Height of the indicator
          borderRadius: 30, // Rounded corners for the indicator
        },
      }}
    >
       <Tab.Screen 
          name="Friends" 
          component={UsersScreen} 
          options={{
            tabBarIcon: ({ focused, color, size }) => (
              <Icon
                name={focused ? 'people' : 'people-outline'}
                size={size}
                color={color}
              />
            )
          }}
        />

        {/* Icon for the "Blog" screen */}
        <Tab.Screen 
          name="Blog" 
          component={BlobPage} 
          options={{
            tabBarIcon: ({ focused, color, size }) => (
              <Icon
                name={focused ? 'book' : 'book-outline'} // Different icon for Blog
                size={size}
                color={color}
              />
            )
          }}
        />
    </Tab.Navigator>
  );
};

export default CommunityScreen;
