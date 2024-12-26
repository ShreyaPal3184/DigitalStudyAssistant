import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Dimensions,
  ScrollView,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTailwind } from "tailwind-rn";

// Get the screen dimensions for responsiveness
const { width, height } = Dimensions.get("window");

const HomeScreen = () => {

  const userName = "Prithvi"; // Replace with dynamic user data

  const navigation = useNavigation();

  const handleProfile = () => {
    navigation.navigate("Profile");
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Make the whole content scrollable */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.outerHeader}>
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <Text style={styles.welcomeText}>
                Welcome, <Text style={styles.name}>{userName}!</Text>
              </Text>
            </View>

            {/* Profile Avatar */}
            <TouchableOpacity
              onPress={handleProfile}
              style={{
                backgroundColor: "white",
                borderRadius: "100%",
                height: width*0.09,
                width: width*0.09,
                justifyContent: "center",
                alignItems: "center",
                ...styles.shadow,
              }}
            >
              <Image
                source={require("../assets/user.png")}
                style={{ height: 25, width: 25 }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: width * 0.01, // 5% padding for responsiveness
    justifyContent: "space-evenly",
    flexDirection: "column",
  },
  scrollContent: {
    paddingBottom: 40, // To ensure there is some space at the bottom when scrolling
  },

  outerHeader: {
    padding: 5,
    backgroundColor: "pink",
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    marginBottom: 10,
    shadowColor: "#red",
    shadowOffset: {
      width: 6,
      height: 6,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    marginTop: 30,
    width: "100%",
    backgroundColor: "",
    borderRadius: 25,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  welcomeText: {
    fontSize: width * 0.06, // Dynamic font size based on screen width
    fontWeight: "bold",
    color: "#0B1215",
  },
  name: {
    fontSize: width * 0.08, // Dynamic font size based on screen width
    fontWeight: "bold",
    color: "blue",
  },
  
  shadow: {
    shadowColor: "red",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 10,
  },
});

export default HomeScreen;
