// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   Alert,
//   TextInput,
//   Image,
//   SafeAreaView,
//   KeyboardAvoidingView,
//   Platform,
//   TouchableWithoutFeedback,
//   Keyboard,
// } from "react-native";
// import CustomInput from "../components/CustomInput";
// import CustomButton from "../components/CustomButton";
// import NotificationCheckbox from "../components/NotificationCheckbox";
// import colors from "../styles/colors";
// import { USER_API_END_POINT } from "../utils/constant";
// import axios from "axios";
// import AsyncStorage from "@react-native-async-storage/async-storage"; // For storing token
// import LinearGradient from 'react-native-linear-gradient';

// const LoginScreen = ({ navigation, setIsLoggedIn }) => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleLogin = async () => {
//     if (!email || !password) {
//       Alert.alert('Error', 'Please enter both email and password');
//       return;
//     }

//     setLoading(true);

//     try {
//       // Send the login request to the server
//       const response = await axios.post(`${USER_API_END_POINT}/login`, { email, password }, {
//         withCredentials: true, // This helps send cookies if needed
//       });

//       console.log("Response data:", response.data);  // Log the response to check if the token is returned

//       if (response.data.success) {
//         Alert.alert('Login Successful', response.data.message);

//         // Store the JWT token from the response in AsyncStorage
//         const token = response.data.token;
//         if (token) {
//           console.log("Received token:", token);  // Log token to ensure it is received
//           await AsyncStorage.setItem('userToken', token);  // Store it in AsyncStorage
//         } else {
//           Alert.alert('Error', 'Token is missing in the response.');
//         }

//         // Set logged-in state to true and navigate to Tabs
//         setIsLoggedIn(true);
//         navigation.replace('Tabs'); // Navigate to Tabs after successful login
//       } else {
//         Alert.alert('Login Failed', response.data.message);
//       }
//     } catch (error) {
//       Alert.alert('Error', 'An error occurred during login');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <SafeAreaView style={styles.Outercontainer}>
//       <SafeAreaView style={styles.innerContainer}>
//       <KeyboardAvoidingView
//         style={{ flex: 1 }}
//         behavior={Platform.OS === "ios" ? "padding" : "height"}
//       >
//         <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
//           <View style={styles.content}>
//             {/* Upper Section - Logo/Image */}
//             <View style={styles.upperSection}>
//               <Image
//                 source={require("../assets/logo.png")} // Replace with your logo path
//                 style={styles.logo}
//                 resizeMode="cover"
//               />
//             </View>

//             {/* Horizontal Line */}
//             <View style={styles.line} />

//             {/* Lower Section - Login Form */}
//             <View style={styles.lowerSection}>
//               <Text style={styles.title}>Login</Text>
//               <CustomInput
//                 placeholder="Email"
//                 value={email}
//                 onChangeText={setEmail}
//               />
//               <CustomInput
//                 placeholder="Password"
//                 secureTextEntry
//                 value={password}
//                 onChangeText={setPassword}
//               />
//               <CustomButton
//                 title={loading ? "Logging in..." : "Login"}
//                 onPress={handleLogin}
                
//               />
//               <CustomButton
//                 title="Don't have an Account? Register"
//                 onPress={() => navigation.navigate("Register")}
//               />
              
//             </View>
//           </View>
//         </TouchableWithoutFeedback>
//       </KeyboardAvoidingView>
//       </SafeAreaView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   Outercontainer: {
//     flex: 1,
//     backgroundColor: "#d1f4ff",
//     justifyContent: 'center',
//     alignItems: 'center'
//   },
//   innerContainer: {
//     height: 600 ,
//     backgroundColor: "white",
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderRadius: 10,
//     overflow: 'hidden', // Important for shadow clipping
//     shadowColor: '#000',
//     shadowOpacity: 0.5,
//     shadowRadius: 10,
//     shadowOffset: { width: 0, height: 0 },
//     elevation: 5,
//   },
//   content: {
//     flex: 1,
//     justifyContent: "space-between",
//   },
//   upperSection: {
//     flex: 0.35,
//     justifyContent: "center",
//     alignItems: "center",
//     padding: 50,
//   },
//   logo: {
//     width: "80%",
//     height: "80%",
//   },
//   line: {
//     height: 1,
//     backgroundColor: colors.border,
//     width: "100%",
//   },
//   lowerSection: {
//     flex: 0.65,
//     justifyContent: "flex-start",
//     alignItems: "center",
//     paddingHorizontal: 20,
//     paddingBottom: 30,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//     color: colors.text,
//     marginBottom: 20,
//   },
// });

// export default LoginScreen;

import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  TextInput,
  Image,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import NotificationCheckbox from "../components/NotificationCheckbox";
import colors from "../styles/colors";
import { USER_API_END_POINT } from "../utils/constant";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage"; // For storing token

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
      // Send the login request to the server
      const response = await axios.post(
        `${USER_API_END_POINT}/login`,
        { email, password },
        {
          withCredentials: true, // This helps send cookies if needed
        }
      );

      console.log("Response data:", response.data); // Log the response to check if the token is returned

      if (response.data.success) {
        Alert.alert("Login Successful", response.data.message);

        // Store the JWT token from the response in AsyncStorage
        const token = response.data.token;
        if (token) {
          console.log("Received token:", token); // Log token to ensure it is received
          await AsyncStorage.setItem("userToken", token); // Store it in AsyncStorage
        } else {
          Alert.alert("Error", "Token is missing in the response.");
        }

        // Set logged-in state to true and navigate to Tabs
        setIsLoggedIn(true);
        navigation.replace("Tabs"); // Navigate to Tabs after successful login
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
      <SafeAreaView style={styles.innerContainer}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.content}>
              {/* Upper Section - Logo/Image */}
              <View style={styles.upperSection}>
                <Image
                  source={require("../assets/logo.png")} // Replace with your logo path
                  style={styles.logo}
                  resizeMode="cover"
                />
              </View>

              {/* Horizontal Line */}
              <View style={styles.line} />

              {/* Lower Section - Login Form */}
              <View style={styles.lowerSection}>
                <Text style={styles.title}>Login</Text>

                <View style={styles.innerInnerContainer}>
                  <Text style={styles.text}>Password</Text>
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
                <CustomButton
                  title="Don't have an Account? Register"
                  onPress={() => navigation.navigate("Register")}
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  Outercontainer: {
    flex: 1,
    backgroundColor: "hotpink",
    justifyContent: "flex-end",
    alignItems: "flex-start",
  },
  innerContainer: {
    width: "95%",
    height: 700,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderTopRightRadius: 100,
    overflow: "hidden", // Important for shadow clipping
    shadowColor: "#000",
    shadowOpacity: 0.5,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 0 },
    elevation: 5,
  },
  content: {
    flex: 1,
    justifyContent: "space-between",
  },
  upperSection: {
    flex: 0.35,
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 50,
    paddingRight: 50,
    paddingTop: 40,
  },
  logo: {
    width: "80%",
    height: "80%",
    borderRadius: 25,
  },
  line: {
    height: 1,
    backgroundColor: colors.border,
    width: "100%",
  },
  lowerSection: {
    flex: 0.85,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: 20,
  },
  text: {
    color: "grey",
    textAlign: "left",
  },
  innerInnerContainer: {
    alignItems: 'flex-end'
  }
});

export default LoginScreen;
