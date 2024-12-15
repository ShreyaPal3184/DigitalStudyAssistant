import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TimerScreen from "../screens/TimerScreen";
import HomeScreen from "../screens/HomeScreen";
import TaskScreen from "../screens/TaskScreen.js";
import SessionScreen from "../screens/SessionScreen";
import { Background } from "@react-navigation/elements";
import { StyleSheet } from "react-native";
import { View, Text, Image, TouchableOpacity } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          position: "absolute",
          bottom: 10,
          left: 20,
          right: 20,
          elevation: 0,
          backgroundColor: "#F5F5F5",
          borderRadius: 25,
          height: 90,
          ...styles.shadow
        },
        tabBarActiveTintColor: 'blue',    // Active tab color
        tabBarInactiveTintColor: '#aaa',  // Inactive tab color
        tabBarLabelStyle: {
          fontSize: 18,                 // Label font size
          fontWeight: 'bold',           // Label font weight
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ 
          headerShown: false, 
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="home" color={color} size={size} /> // Using AntDesign's "home" icon
          ),
        }}
      />

      <Tab.Screen
        name="Session"
        component={SessionScreen}
        options={{ 
          headerShown: false, 
          tabBarIcon: ({focused}) => (
            <View>
              <Image 
                source={require('../assets/tabIcons/self-directed-learning.png')}
                resizeMode= "contain"
                style={{
                  width: 25,
                  height: 25,
                }}
              />
            </View>
          )
        }}
      />

      <Tab.Screen
        name="Tasks"
        component={TaskScreen}
        options={{ 
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <View>
              <Image 
                source={require('../assets/tabIcons/clipboard.png')}
                resizeMode= "contain"
                style={{
                  width: 25,
                  height: 25,
                }}
              />
            </View>
          ) 
        }}
      />

      <Tab.Screen
        name="Community"
        component={TimerScreen}
        options={{ 
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <View>
              <Image 
                source={require('../assets/tabIcons/people.png')}
                resizeMode= "contain"
                style={{
                  width: 25,
                  height: 25,
                }}
              />
            </View>
          )
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '75FDF0',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5
  }
})

export default Tabs;
