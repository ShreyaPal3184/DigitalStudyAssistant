import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import ProfileScreen from "../screens/ProfileScreen";
import FileHub from "../screens/FileHub";

const Drawer = createDrawerNavigator();

function AppNavigator() {
  return (
    <Drawer.Navigator screenOptions={{ headerShown: true }}>
      <Drawer.Screen name="Profile" component={ProfileScreen} />
      <Drawer.Screen name="Hub" component={FileHub} />
    </Drawer.Navigator>
  );
}

export default AppNavigator;