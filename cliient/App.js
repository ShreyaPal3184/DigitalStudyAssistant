import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import Tabs from "./components/Tabs"; // Import your Tabs component
import AddFile from "./screens/AddFileScreen";
import OnboardingScreen from "./screens/OnboardingScreen";
import ProfileScreen from "./screens/ProfileScreen";
import AppNavigator from "./HamburgerNavigation/AppNavigator";
import "react-native-gesture-handler";
import AboutusScreen from "./screens/AboutusScreen";
import FAQScreen from "./screens/FAQScreen";
import PrivacyPolicyScreen from "./screens/PrivacyPolicyScreen";
import UserDataProtectionScreen from "./screens/UserDataProtectionScreen";
import NotificationsScreen from "./screens/NotificationsScreen";
import EditProfileScreen from "./screens/EditProfileScreen";
import CommunityScreen from "./screens/CommunityScreen";
import MyFriendsScreen from "./screens/MyfriendsScreen";
import StartstudyingScreen from "./screens/StartstudyingScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createStackNavigator();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to manage login status
  const [showOnboarding, setShowOnBoarding] = useState(null);

  useEffect(() => {
    checkIfAlreadyOnboarded();
    checkLoginStatus();
  }, []);

  const checkIfAlreadyOnboarded = async () => {
    let onBoarded = await AsyncStorage.getItem("onboarded");
    if (onBoarded == 1) {
      //hide onboarding
      setShowOnBoarding(false);
    } else {
      //show onboarding
      setShowOnBoarding(true);
    }
  };

  const checkLoginStatus = async () => {
    const token = await AsyncStorage.getItem("userToken");
    if (token) {
      setIsLoggedIn(true);
    }
  };

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        // initialRouteName={showOnboarding ? "Onboarding" : isLoggedIn ? "Tabs" : "Login"}
        initialRouteName="Onboarding"
      >
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="Login">
          {(props) => (
            <LoginScreen {...props} setIsLoggedIn={setIsLoggedIn} />
          )}
        </Stack.Screen>
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Tabs" component={Tabs} />
        <Stack.Screen name="AddFile" component={AddFile} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="HamburgerMenu" component={AppNavigator} />
        <Stack.Screen name="AboutUs" component={AboutusScreen} />
        <Stack.Screen name="FAQ" component={FAQScreen} />
        <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} />
        <Stack.Screen name="UserDataProtection" component={UserDataProtectionScreen} />
        <Stack.Screen name="NotificationScreen" component={NotificationsScreen} />
        <Stack.Screen name="EditProfile" component={EditProfileScreen} />
        <Stack.Screen name="Myfriends" component={MyFriendsScreen} />
        <Stack.Screen name="StartstudyingScreen" component={StartstudyingScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
