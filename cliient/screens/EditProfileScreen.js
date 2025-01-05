import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Alert,
} from "react-native";
import colors from "../styles/colors";
import { Switch } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { USER_API_END_POINT } from "../utils/constant";

const { width, height } = Dimensions.get("window");

const EditProfileScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedName = await AsyncStorage.getItem("userName");
        const storedEmail = await AsyncStorage.getItem("userEmail");
        const storedNotifications = await AsyncStorage.getItem("userNotifications");

        if (storedName) setName(storedName);
        if (storedEmail) setEmail(storedEmail);
        if (storedNotifications) setIsEnabled(JSON.parse(storedNotifications));
      } catch (error) {
        console.error("Failed to fetch user data from AsyncStorage:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleSave = async () => {
    if (!name || !email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    try {
      const token = await AsyncStorage.getItem("userToken");
      const userId = await AsyncStorage.getItem("userId");

      const response = await fetch(`${USER_API_END_POINT}/update/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          username: name,
          email: email,
          password: password,
          notifications: isEnabled,
        }),
      });

      const responseData = await response.json();
      if (response.ok) {
        await AsyncStorage.setItem("userName", name);
        await AsyncStorage.setItem("userEmail", email);
        await AsyncStorage.setItem("userNotifications", JSON.stringify(isEnabled));
        Alert.alert("Success", "Profile updated successfully.");
        navigation.goBack();
      } else {
        Alert.alert("Error", responseData.message || "Failed to update profile.");
      }
    } catch (error) {
      Alert.alert("Error", error.message || "An error occurred.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ paddingBottom: 10 }}>
        <Text style={{ fontSize: 40, fontWeight: "300" }}>Edit Profile</Text>
      </View>
      <Text style={styles.label}>Name</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} />
      <Text style={styles.label}>Email</Text>
      <TextInput style={styles.input} value={email} onChangeText={setEmail} />
      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <View
        style={{
          marginVertical: 10,
          width: "95%",
          alignSelf: "center",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            fontSize: 16,
            color: colors.text,
            flex: 1,
            marginRight: 10,
          }}
        >
          Continue to receive notifications
        </Text>
        <Switch
          trackColor={{ false: "#ccc", true: colors.primary }}
          thumbColor={isEnabled ? colors.secondary : "#f4f3f4"}
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
      <TouchableOpacity
        style={{
          width: width * 0.8,
          backgroundColor: "black",
          borderRadius: 10,
          padding: 7,
          alignSelf: "center",
        }}
        onPress={handleSave}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            color: "white",
            alignSelf: "center",
          }}
        >
          Save
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: "grey",
    paddingLeft: 10,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
    borderRadius: 15,
  },
});

export default EditProfileScreen;
