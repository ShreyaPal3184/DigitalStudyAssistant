import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Alert,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  Dimensions,
  Image,
  ScrollView,
} from "react-native";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import { USER_API_END_POINT } from "../utils/constant";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width, height } = Dimensions.get("window");

const LoginScreen = ({ navigation, setIsLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter both email and password");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        `${USER_API_END_POINT}/login`,
        { email, password },
        {
          withCredentials: true,
        }
      );

      console.log("Response data:", response.data);

      if (response.data.success) {
        Alert.alert("Login Successful", response.data.message);

        const token = response.data.token;
        const username = response.data.username;

        if (token) {
          console.log("Received token:", token);
          await AsyncStorage.setItem("userToken", token);
        } else {
          Alert.alert("Error", "Token is missing in the response.");
        }

        if (username) {
          console.log("Received username:", username);
          await AsyncStorage.setItem("userName", username);
        } else {
          Alert.alert("Error", "Username is missing in the response.");
        }

        await AsyncStorage.setItem("userToken", token);
        await AsyncStorage.setItem("userName", username);

        setIsLoggedIn(true);
        navigation.replace("Tabs");
        
      } else {
        Alert.alert("Login Failed", response.data.message);
      }
    } catch (error) {
      Alert.alert("Error", "An error occurred during login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.Outercontainer}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <ScrollView contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}} showsVerticalScrollIndicator={false}>
            <View style={{ padding: 20}}>
              {/* image */}
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Image
                  source={require("../assets/login/login1.png")}
                  style={{ height: height * 0.45, width: width }}
                />
              </View>
              <View style={{ padding: 20 }}>
                <Text
                  style={{
                    fontSize: 28,
                    fontStyle: "normal",
                    fontWeight: "bold",
                  }}
                >
                  Login
                </Text>
                <Text style={{ fontSize: 16, fontStyle: "italic", padding: 2 }}>
                  Please Sign in to continue.
                </Text>
              </View>
              <CustomInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
              />
              <CustomInput
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
              <CustomButton
                title={loading ? "Logging in..." : "Login"}
                onPress={handleLogin}
              />
              <View
                style={{
                  flexDirection: "row",
                  padding: 10,
                  alignSelf: "center",
                }}
              >
                <Text 
                  style={{
                    fontSize: 20,
                    fontStyle: "italic",
                    color: "grey",
                    textAlign: "center",
                  }}
                >
                  Don't have an Account?{" "}
                </Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate("Register")}
                >
                  <Text
                    style={{
                      fontSize: 20,
                      fontStyle: "italic",
                      color: "blue",
                      textAlign: "center",
                    }}
                  >
                    Sign-up
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={{marginBottom: 100 }}/>
            </View>
            </ScrollView>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  Outercontainer: {
    flex: 1,
    backgroundColor: "white",
  },
});

export default LoginScreen;
