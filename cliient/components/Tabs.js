import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import SessionScreen from "../screens/SessionScreen";
import { StyleSheet } from "react-native";
import { View, Dimensions, Image, TouchableOpacity } from "react-native";
import FileHub from "../screens/FileHub.js";
import CommunityScreen from "../screens/CommunityScreen.js";
import Animated, { useSharedValue, withSpring, useAnimatedStyle } from "react-native-reanimated";
import SessionNTaskDrawer from "../screens/SessionNTaskDrawer.js";

const Tab = createBottomTabNavigator();
const { width } = Dimensions.get("window");

const AnimatedIcon = ({ source, focused }) => {
  const scale = useSharedValue(focused ? 1.2 : 1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: withSpring(scale.value) }],
  }));

  return (
    <Animated.View style={animatedStyle}>
      <Image
        source={source}
        resizeMode="contain"
        style={{
          width: 25,
          height: 25,
          tintColor: focused ? "black" : "#aaa",
        }}
      />
    </Animated.View>
  );
};

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          position: "absolute",
          elevation: 0,
          backgroundColor: "white",
          height: width * 0.12,
          borderColor: "white",
        },
        tabBarActiveTintColor: "black",
        tabBarInactiveTintColor: "#aaa",
        tabBarHideOnKeyboard: true,
        tabBarInactiveBackgroundColor: "white",
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: "100",
        },
        tabBarButton: (props) => (
          <TouchableOpacity {...props} activeOpacity={1} />
        ),
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <AnimatedIcon
              source={require("../assets/tabIcons/home-agreement.png")}
              focused={focused}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Study Hub"
        component={SessionScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <AnimatedIcon
              source={require("../assets/tabIcons/self-directed-learning.png")}
              focused={focused}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Create"
        component={SessionNTaskDrawer}
        options={{
          headerShown: false,
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 20,
            color: "white",
          },
          headerTitle: "Create Your Session",
          tabBarIcon: ({ focused }) => (
            <AnimatedIcon
              source={require("../assets/tabIcons/plus.png")}
              focused={focused}
            />
          ),
        }}
        
      />

      <Tab.Screen
        name="File Hub"
        component={FileHub}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <AnimatedIcon
              source={require("../assets/tabIcons/open-folder.png")}
              focused={focused}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Community"
        component={CommunityScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <AnimatedIcon
              source={require("../assets/tabIcons/people.png")}
              focused={focused}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "800080",
    shadowOffset: {
      width: 6,
      height: 6,
    },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 10,
  },
});

export default Tabs;
