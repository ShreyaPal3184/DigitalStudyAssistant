import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import NotificationCheckbox from "../components/NotificationCheckbox";
import colors from "../styles/colors";
import axios from "axios";
import { USER_API_END_POINT } from "../utils/constant";

const RegisterScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [notifications, setNotifications] = useState(false); // Default to false
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!username || !email || !password || !confirmPassword) {
      Alert.alert("Error", "Please fill in all fields");
      return;
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
        error.response?.data?.message || error.message || "An error occurred during registration"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.Outercontainer}>
      <View style={styles.innerContainer}>
        <View style={styles.container}>
          <Text style={styles.title}>Register</Text>

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
          <CustomInput
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <CustomInput
            placeholder="Confirm Password"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword} 
          />

          <NotificationCheckbox
            value={notifications}
            onValueChange={setNotifications}
          />

          <CustomButton
            title={loading ? "Registering..." : "Register"}
            onPress={handleRegister}
            disabled={loading}
          />
          {loading && <ActivityIndicator size="large" color={colors.primary} />}

          <CustomButton
            title="Already have an Account? Login"
            onPress={() => navigation.navigate("Login")}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  Outercontainer: {
    flex: 1,
    backgroundColor: "#d1f4ff",
    justifyContent: "center",
    alignItems: "center",
  },
  innerContainer: {
    height: 600,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    overflow: "hidden", // Important for shadow clipping
    shadowColor: "#000",
    shadowOpacity: 0.5,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 0 },
    elevation: 5,
    padding: 20, // Added padding for better layout on small screens
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: 20,
  },
});

export default RegisterScreen;

// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   Alert,
//   ActivityIndicator,
//   SafeAreaView,
// } from "react-native";
// import CustomInput from "../components/CustomInput";
// import CustomButton from "../components/CustomButton";
// import NotificationCheckbox from "../components/NotificationCheckbox";
// import colors from "../styles/colors";
// import axios from "axios";
// import { USER_API_END_POINT } from "../utils/constant";

// const RegisterScreen = ({ navigation }) => {
//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [notifications, setNotifications] = useState(false); // Default to false
//   const [loading, setLoading] = useState(false);

//   const handleRegister = async () => {
//     if (!username || !email || !password || !confirmPassword) {
//       Alert.alert("Error", "Please fill in all fields");
//       return;
//     }

//     if (password !== confirmPassword) {
//       Alert.alert("Error", "Passwords do not match");
//       return;
//     }

//     setLoading(true);

//     try {
//       // Sending POST request to the backend API for registration
//       const response = await axios.post(`${USER_API_END_POINT}/register`, {
//         username,
//         email,
//         password,
//         confirmPassword,
//         notifications,
//       });

//       if (response.data.message === "User created successfully.") {
//         Alert.alert("Registration Successful", response.data.message);
//         navigation.navigate("Login"); // Navigate to the Login screen after successful registration
//       } else {
//         Alert.alert("Registration Failed", response.data.message);
//       }
//     } catch (error) {
//       Alert.alert(
//         "Error",
//         error.response?.data?.message || error.message || "An error occurred during registration"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <SafeAreaView style={styles.Outercontainer}>
//       <View style={styles.innerContainer}>
//         <View style={styles.container}>
          
//           <Text style={styles.title}>Register</Text>
//           <CustomInput 
//             placeholder="Username                                                              "
//             value={username}
//             onChangeText={setUsername}
//           />
//           <CustomInput
//             placeholder="Email                                                                        "
//             value={email}
//             onChangeText={setEmail}
//           />
//           <CustomInput
//             placeholder="Password                                                               "
//             secureTextEntry
//             value={password}
//             onChangeText={setPassword}
//           />
//           <CustomInput
//             placeholder="Confirm Password                                                "
//             secureTextEntry
//             value={confirmPassword}
//             onChangeText={setConfirmPassword}
//           />

//           <NotificationCheckbox
//             value={notifications}
//             onValueChange={setNotifications}
//           />

//           <CustomButton
//             title={loading ? "Registering..." : "Register"}
//             onPress={handleRegister}
//             disabled={loading}
//           />
//           {loading && <ActivityIndicator size="large" color={colors.primary} />}

//           <CustomButton
//             title="Already have an Account? Login"
//             onPress={() => navigation.navigate("Login")}
//           />
//         </View>
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   Outercontainer: {
//     flex: 1,
//     backgroundColor: "hotpink",
//     justifyContent: "flex-end",
//     alignItems: "flex-end",
//   },
//   innerContainer: {
//     width: "95%",
//     height: 800,
//     backgroundColor: "white",
//     justifyContent: "center",
//     alignItems: "center",
//     borderTopLeftRadius: 100,
//     overflow: "hidden", // Important for shadow clipping
//     shadowColor: "#000",
//     shadowOpacity: 0.5,
//     shadowRadius: 10,
//     shadowOffset: { width: 0, height: 0 },
//     elevation: 5,
//     padding: 20, // Added padding for better layout on small screens
//   },
//   container: {
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//     color: colors.text,
//     marginBottom: 20,
//   },
  
// });

// export default RegisterScreen;

