import React from "react";
import { View, Text, SafeAreaView } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import UsersScreen from "./UsersScreen";
import BlobPage from "./BlogPage";

const Tab = createMaterialTopTabNavigator();

const CommunityScreen = () => {
  return (
    // <SafeAreaView>
      <Tab.Navigator style={{marginTop: 30}}>
        <Tab.Screen name="Friends" component={UsersScreen} />
        <Tab.Screen name="Blog" component={BlobPage} />
      </Tab.Navigator>
    // </SafeAreaView>
  );
};

export default CommunityScreen;
