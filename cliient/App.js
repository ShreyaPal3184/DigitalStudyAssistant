import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import Tabs from "./components/Tabs"; // Import your Tabs component
import AddFile from "./screens/AddFileScreen";

const Stack = createStackNavigator();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to manage login status

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* Show Login Screen or Tabs based on the login state */}
        <Stack.Screen name="Login">
          {(props) => (
            <LoginScreen {...props} setIsLoggedIn={setIsLoggedIn} />
          )}
        </Stack.Screen>

        <Stack.Screen name="Register" component={RegisterScreen} />
        {/* Show Tabs only if the user is logged in */}
        {isLoggedIn && <Stack.Screen name="Tabs" component={Tabs} />}

        <Stack.Screen name="AddFile" component={AddFile}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
