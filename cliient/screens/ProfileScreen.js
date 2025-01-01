import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  SafeAreaView,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import LottieView from "lottie-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import { useEffect } from "react";

const { width, height } = Dimensions.get("window");

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState("");

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const storedUsername = await AsyncStorage.getItem("userName");
        if (storedUsername) {
          setUsername(storedUsername);
        }
      } catch (error) {
        console.error("Failed to fetch username from AsyncStorage:", error);
      }
    };

    fetchUsername();
  }, []);

  const handleBack = () => {
    navigation.navigate("Home");
  };

  const handleLogout = () => {
    navigation.navigate("Login");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView
        contentContainerStyle={{ flexgrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ flexDirection: "column" }}>
          <View
            style={{
              width: width,
              flexDirection: "row",
              paddingLeft: 20,
              paddingRight: 20,
              paddingTop: 10,
              justifyContent: "space-between",
            }}
          >
            <Text style={{ fontSize: 24 }}>Profile</Text>
            <TouchableOpacity
              onPress={() => console.log("Edit profile.")}
              style={{ alignSelf: "flex-end" }}
            >
              <Image
                source={require("../assets/edit.png")}
                style={{ height: 25, width: 25, alignSelf: "center" }}
              />
            </TouchableOpacity>
          </View>

          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "white",
              height: height * 0.27,
            }}
          >
            {/* Gradient Animation */}
            <View style={{ position: "relative" }}>
              <LottieView
                style={{
                  height: width * 0.65,
                  width: width * 0.7,
                  borderRadius: 0,
                }}
                source={require("../assets/animations/gradient1.json")}
                autoPlay={false}
                loop={true}
                ref={(animation) => {
                  if (animation) animation.play();
                }}
                onError={(error) =>
                  console.log("Error loading animation:", error)
                }
              />
            </View>

            {/* SheAvatar Animation */}
            <View
              style={{
                position: "absolute", // Position this view absolutely over the gradient
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <LottieView
                style={{
                  height: width * 0.3,
                  width: width * 0.3,
                  borderRadius: 100,
                  ...styles.shadow,
                }}
                source={require("../assets/animations/SheAvatar.json")}
                autoPlay={false}
                loop={true}
                ref={(animation) => {
                  if (animation) animation.play();
                }}
                onError={(error) =>
                  console.log("Error loading animation:", error)
                }
              />
              <Text style={{ fontWeight: "400", fontSize: 24, color: "white" }}>
                {username.split(" ")[0]}
              </Text>
            </View>
          </View>

          <View>
            <View style={{ padding: 15 }}>
              <Text style={{ color: "grey", paddingBottom: 5, fontSize: 12 }}>
                USER ID
              </Text>
              <Text style={{ fontSize: 20, fontWeight: "900" }}>#USERKAID</Text>
            </View>
            <View style={{ padding: 15 }}>
              <Text style={{ color: "grey", paddingBottom: 5, fontSize: 12 }}>
                USERNAME
              </Text>
              <Text style={{ fontSize: 20, fontWeight: "900" }}>
                {username}
              </Text>
            </View>
            <View style={{ padding: 15 }}>
              <Text style={{ color: "grey", paddingBottom: 5, fontSize: 12 }}>
                EMAIL
              </Text>
              <Text style={{ fontSize: 20, fontWeight: "900" }}>
                USER KA EMAIL
              </Text>
            </View>
          </View>

          <View
            style={{
              width: width * 0.9,
              height: 0.8,
              backgroundColor: "#000",
              alignSelf: "center",
            }}
          />

          <View style={{ padding: 15 }}>
            {/* SECURITY */}
            <View style={{ height: height * 0.12 }}>
              <Text
                style={{
                  color: "grey",
                  fontSize: 12,
                }}
              >
                SECURITY
              </Text>

              {/* Privacy policy */}
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("PrivacyPolicy");
                }}
                style={{ padding: 5, paddingLeft: 0 }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    padding: 1,
                  }}
                >
                  <Text style={{ fontSize: 20, fontWeight: "400" }}>
                    Privary Policy
                  </Text>
                  <Image
                    source={require("../assets/rightarrow.png")}
                    style={{ height: 28, width: 28 }}
                  />
                </View>
              </TouchableOpacity>

              {/* user data protections */}
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("UserDataProtection");
                }}
                style={{ padding: 5, paddingLeft: 0 }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    padding: 1,
                  }}
                >
                  <Text style={{ fontSize: 20, fontWeight: "400" }}>
                    User Data Protection
                  </Text>
                  <Image
                    source={require("../assets/rightarrow.png")}
                    style={{ height: 28, width: 28 }}
                  />
                </View>
              </TouchableOpacity>
            </View>

            {/* NOTIFICATIONS */}
            <View style={{ height: height * 0.08 }}>
              <Text
                style={{
                  color: "grey",
                  fontSize: 12,
                }}
              >
                NOTIFICATIONS
              </Text>
              <TouchableOpacity
                onPress={() => {
                  console.log("FAQ");
                }}
                style={{ padding: 5, paddingLeft: 0 }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    padding: 1,
                  }}
                >
                  <Text style={{ fontSize: 20, fontWeight: "400" }}>
                    Manage Notifications
                  </Text>
                  <Image
                    source={require("../assets/rightarrow.png")}
                    style={{ height: 28, width: 28 }}
                  />
                </View>
              </TouchableOpacity>
            </View>

            {/* HELP AND SUPPORT */}
            {/* ABOUT US */}
            <View style={{ height: height * 0.08 }}>
              <Text style={{ color: "grey", fontSize: 12 }}>
                HELP AND SUPPORT
              </Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("AboutUs");
                }}
                style={{ padding: 5, paddingLeft: 0 }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    padding: 1,
                  }}
                >
                  <Text style={{ fontSize: 20, fontWeight: "400" }}>
                    About Us
                  </Text>
                  <Image
                    source={require("../assets/rightarrow.png")}
                    style={{ height: 28, width: 28 }}
                  />
                </View>
              </TouchableOpacity>

              {/* FAQ */}
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("FAQ");
                }}
                style={{ padding: 5, paddingLeft: 0 }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    padding: 1,
                  }}
                >
                  <Text style={{ fontSize: 20, fontWeight: "400" }}>
                    Frequently Asked Questions
                  </Text>
                  <Image
                    source={require("../assets/rightarrow.png")}
                    style={{ height: 28, width: 28 }}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Logout */}
      <View style={{ padding: 15, justifyContent: "flex-end" }}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Login");
          }}
          style={{
            flexDirection: "row",
            padding: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            source={require("../assets/sign-out.png")}
            style={{ height: 20, width: 20 }}
          />
          <Text style={{ fontSize: 20 }}> Sign out</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "75FDF0",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});
export default ProfileScreen;
