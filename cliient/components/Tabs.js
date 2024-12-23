import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TimerScreen from "../screens/TimerScreen";
import HomeScreen from "../screens/HomeScreen";
import TaskScreen from "../screens/TaskScreen.js";
import SessionScreen from "../screens/SessionScreen";
import StudySessionScreen from "../screens/StudySessionScreen.js";
import { Background } from "@react-navigation/elements";
import { StyleSheet } from "react-native";
import { View, Text, Image, TouchableOpacity } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import FileHub from "../screens/FileHub.js";
import BlobPage from "../screens/BlogPage.js";
import UsersScreen from "../screens/UsersScreen.js";
import CommunityScreen from "../screens/CommunityScreen.js";
const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          position: "absolute",
          left: 20,
          right: 20,
          // marginEnd: 10,
          // marginStart: 10,
          elevation: 0,
          backgroundColor: "white",
          // borderRadius: 25,
          borderColor: "blue",
          // borderTopRightRadius: 25 ,
          // borderTopLeftRadius: 25,
          height: 71,
          ...styles.shadow,
          paddingBottom: 10, // Adjust this value to ensure the icon stays centered vertically
        },
        tabBarActiveTintColor: "blue", // Active tab color
        tabBarInactiveTintColor: "#aaa", // Inactive tab color
        tabBarLabelStyle: {
          fontSize: 18, // Label font size
          fontWeight: "bold", // Label font weight
        },
        tabBarIconStyle: {
          justifyContent: "center", // Vertically center the icons
          alignItems: "center", // Horizontally center the icons
        },
        tabBarButton: (props) => (
          <TouchableOpacity {...props} activeOpacity={1} /> // Removes ripple effect
        ),
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <View>
              <Image
                source={require("../assets/tabIcons/home-agreement.png")}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                }}
              />
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Sessions"
        component={SessionScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View>
              <Image
                source={require("../assets/tabIcons/self-directed-learning.png")}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                }}
              />
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Start a Session"
        component={StudySessionScreen}
        options={{
          headerShown: false,
          headerStyle: {
            backgroundColor: "#333333",
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
            shadowColor: "black",
            shadowOffset: {
              width: 6,
              height: 6,
            },
            shadowOpacity: 0.4,
            shadowRadius: 10,
            elevation: 10,
          },
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 20,
            color: "white", // Example title color
          },
          headerTitle: "Create Your Session", // Custom header title
          tabBarIcon: ({ focused }) => (
            <View>
              <Image
                source={require("../assets/tabIcons/plus.png")}
                resizeMode="contain"
                style={{
                  width: 75,
                  height: 75,
                }}
              />
            </View>
          ),
          tabBarLabel: "",
        }}
      />

      <Tab.Screen
        name="Hub"
        component={FileHub}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View>
              <Image
                source={require("../assets/tabIcons/open-folder.png")}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                }}
              />
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Community"
        component={CommunityScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View>
              <Image
                source={require("../assets/tabIcons/people.png")}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                }}
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "75FDF0",
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 5,
  },
});

export default Tabs;
