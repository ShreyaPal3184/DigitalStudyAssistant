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

const Stack = createStackNavigator();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to manage login status

  const [showOnboarding, setShowOnBoarding] = useState(null);

  useEffect(() => {
    checkIfAlreadyOnboarded();
  }, []);

  const checkIfAlreadyOnboarded = async () => {
    let onBoarded = await getItem("onboarded");
    if (onBoarded == 1) {
      //hide onboarding
      setShowOnBoarding(false);
    } else {
      //show onboarding
      setShowOnBoarding(true);
    }
  };

  // if(showOnboarding===false){
  //   return (
  //     <NavigationContainer>
  //       <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Onboarding">
  //         <Stack.Screen name="Onboarding" component={OnboardingScreen} />
  //         {/* Show Login Screen or Tabs based on the login state */}
  //         <Stack.Screen name="Login">
  //           {(props) => (
  //             <LoginScreen {...props} setIsLoggedIn={setIsLoggedIn} />
  //           )}
  //         </Stack.Screen>

  //         <Stack.Screen name="Register" component={RegisterScreen} />
  //         {/* Show Tabs only if the user is logged in */}
  //         {isLoggedIn && <Stack.Screen name="Tabs" component={Tabs} />}

  //         <Stack.Screen name="AddFile" component={AddFile}/>
  //       </Stack.Navigator>
  //     </NavigationContainer>
  //   );
  // }else{
  //   return (
  //     <NavigationContainer>
  //       <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Login">
  //         <Stack.Screen name="Onboarding" component={OnboardingScreen} />
  //         {/* Show Login Screen or Tabs based on the login state */}
  //         <Stack.Screen name="Login">
  //           {(props) => (
  //             <LoginScreen {...props} setIsLoggedIn={setIsLoggedIn} />
  //           )}
  //         </Stack.Screen>

  //         <Stack.Screen name="Register" component={RegisterScreen} />
  //         {/* Show Tabs only if the user is logged in */}
  //         {isLoggedIn && <Stack.Screen name="Tabs" component={Tabs} />}

  //         <Stack.Screen name="AddFile" component={AddFile}/>
  //       </Stack.Navigator>
  //     </NavigationContainer>
  //   );
  // }

  return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{ headerShown: false }}
          initialRouteName="Onboarding"
        >
          <Stack.Screen name="Onboarding" component={OnboardingScreen} />
          {/* Show Login Screen or Tabs based on the login state */}
          <Stack.Screen name="Login">
            {(props) => (
              <LoginScreen {...props} setIsLoggedIn={setIsLoggedIn} />
            )}
          </Stack.Screen>

          <Stack.Screen name="Register" component={RegisterScreen} />
          {/* Show Tabs only if the user is logged in */}
          {isLoggedIn && <Stack.Screen name="Tabs" component={Tabs} />}

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
        </Stack.Navigator>

      </NavigationContainer>
  );
}
