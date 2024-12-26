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
} from "react-native";
import LottieView from "lottie-react-native";

const { width, height } = Dimensions.get("window");

const ProfileScreen = () => {
  const navigation = useNavigation();

  const handleBack = () => {
    navigation.navigate("Home");
  };

  const handleLogout = () => {
    navigation.navigate("Login");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "pink" }}>
      {/* header */}
      <View style={{ padding: 5, width: "30%" }}>
        <Text
          style={{
            fontSize: 30,
            fontWeight: "bold",
            paddingLeft: 20,
            paddingTop: 20,
          }}
        >
          {" "}
          Profile{" "}
        </Text>
      </View>

      <View
        style={{
          marginBottom: width * 0.02,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* <Image
          source={require("../assets/carouselImages/image1.png")}
          style={{
            height: width * 0.3,
            width: width * 0.3,
            borderRadius: 100,
            ...styles.shadow,
          }}
        /> */}

        <LottieView
          style={{
            height: width * 0.35,
            width: width * 0.35,
            borderRadius: 100,
            ...styles.shadow,
          }}
          source={require("../assets/animations/SheAvatar.json")}
          autoPlay={false}
          loop={true}
          ref={(animation) => {
            if (animation) animation.play();
          }}
          onError={(error) => console.log("Error loading animation:", error)}
        />

        <Text style={{ fontSize: 30,}}>Hello, Shreya</Text>
      </View>

      <View
        style={{
          backgroundColor: "white",
          height: height * 0.55,
          width: width,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          borderBottomLeftRadius: 30,
          borderBottomRightRadius: 30,
          marginBottom: 20,
          ...styles.shadow,
        }}
      ></View>

      {/* Logout */}
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "pink",
          height: width * 0.2,
        }}
      >
        <TouchableOpacity
          onPress={handleLogout}
          style={{
            width: width,
            height: width * 0.15,
            backgroundColor: "white",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            backgroundColor: "pink",
          }}
        >
          <Image
            source={require("../assets/sign-out.png")}
            style={{
              height: width * 0.05,
              width: width * 0.05,
              marginRight: width * 0.02,
            }}
          />
          <Text
            style={{ textAlign: "center", fontWeight: "bold", fontSize: 20 }}
          >
            logOut
          </Text>
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
    elevation: 10,
  },
});
export default ProfileScreen;
