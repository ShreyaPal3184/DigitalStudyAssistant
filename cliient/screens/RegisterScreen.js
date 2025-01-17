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
  ActivityIndicator, // Import ActivityIndicator
} from "react-native";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import NotificationCheckbox from "../components/NotificationCheckbox";
import colors from "../styles/colors";
import axios from "axios";
import { USER_API_END_POINT } from "../utils/constant";
import Icon from "react-native-vector-icons/FontAwesome";
import { TextInput } from "react-native-gesture-handler";

const { width, height } = Dimensions.get("window");

const RegisterScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [notifications, setNotifications] = useState(false); // Default to false
  const [loading, setLoading] = useState(false);
  const [error, setErr] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleRegister = async () => {
    if (!username || !email || !password || !confirmPassword) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    if (password.length < 8) {
      setErr("Password must be at least 8 characters long");
    } else {
      setErr("Password is valid");
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      // Sending POST request to the backend API for registration
      const response = await axios.post(`${USER_API_END_POINT}/register`, {
        username,
        email,
        password,
        confirmPassword,
        notifications,
      });

      if (response.data.message === "User created successfully.") {
        Alert.alert("Registration Successful", response.data.message);
        navigation.navigate("Login"); // Navigate to the Login screen after successful registration
      } else {
        Alert.alert("Registration Failed", response.data.message);
      }
    } catch (error) {
      Alert.alert(
        "Error",
        error.response?.data?.message ||
          error.message ||
          "An error occurred during registration"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <ScrollView
            contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
            showsVerticalScrollIndicator={false}
          >
            <View style={{}}>
              {/* image */}
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Image
                  source={require("../assets/login/register1.png")}
                  style={{ height: height * 0.3, width: width }}
                />
              </View>
              <View
                style={{
                  width: width * 0.9,
                  height: 0.8,
                  backgroundColor: "#000",
                  alignSelf: "center",
                }}
              />
              <View style={{ padding: 20 }}>
                <Text
                  style={{
                    fontSize: 28,
                    fontStyle: "normal",
                    fontWeight: "bold",
                  }}
                >
                  Register
                </Text>
                <Text style={{ fontSize: 16, fontStyle: "italic", padding: 2 }}>
                  Please Register to Login.
                </Text>
              </View>

              <CustomInput
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
              />
              <CustomInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
              />

              <View
                style={styles.containerr}
              >
                <TextInput
                  style={styles.input}
                  placeholder="Password"
                  placeholderTextColor={"#888"}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  style={{}}
                >
                  <Icon
                    name={showPassword ? "eye-slash" : "eye"}
                    size={20}
                    color="#888"
                  />
                </TouchableOpacity>
              </View>

              <View
                style={styles.containerr}
              >
                <TextInput
                  style={styles.input}
                  placeholder="Confirm Password"
                  placeholderTextColor={"#888"}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry={!showConfirmPassword}
                />
                <TouchableOpacity
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                  style={{}}
                > 
                  <Icon
                    name={showConfirmPassword ? "eye-slash" : "eye"}
                    size={20}
                    color="#888"
                  />
                </TouchableOpacity>
              </View>

              {/* <CustomInput
                placeholder="Confirm Password"
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              /> */}

              <NotificationCheckbox
                value={notifications}
                onValueChange={setNotifications}
              />

              <View>
                {error ? <Text style={styles.error}>{error}</Text> : null}
              </View>
              <CustomButton
                title={loading ? "Registering..." : "Register"}
                onPress={handleRegister}
                disabled={loading}
              />
              {loading && (
                <ActivityIndicator size="large" color={colors.primary} />
              )}

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
                  Already have an Account?{" "}
                </Text>
                <TouchableOpacity onPress={() => navigation.navigate("Login")} >
                  <Text
                    style={{
                      fontSize: 20,
                      fontStyle: "italic",
                      color: "blue",
                      textAlign: "center",
                    }}
                  >
                    Login
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  error: {
    color: "red",
    marginBottom: 12,
    alignSelf: "center",
  },
  containerr: {
    marginVertical: 10,
    width: "90%",
    alignSelf: "center",
    borderRadius: 25,
    backgroundColor: colors.inputBackground,
    borderColor: "#ccc",
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingLeft: 0,
  },
  input: {
    backgroundColor: colors.inputBackground,
    width: "80%",
    padding: 10,
    fontSize: 16,
    borderRadius: 25,
  },
});

export default RegisterScreen;
