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
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import TopMenu from "../components/TopMenu.js";
import { useTailwind } from "tailwind-rn";

// Get the screen dimensions for responsiveness
const { width, height } = Dimensions.get("window");

const HomeScreen = () => {
  const tailwind = useTailwind();
  const [tasks, setTasks] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [loadingTasks, setLoadingTasks] = useState(true);
  const [loadingSessions, setLoadingSessions] = useState(true);
  const userName = "Prithvi"; // Replace with dynamic user data
  const streakDays = 7; // Example streak value
  const navigation = useNavigation();

  const today = new Date();
  const weekday = today.toLocaleString("en-US", { weekday: "long" }); // e.g., Monday
  const month = today.toLocaleString("en-US", { month: "long" }); // e.g., December
  const day = today.getDate(); // e.g., 23
  const year = today.getFullYear(); // e.g., 2024

  const prevDay = new Date(today);
  prevDay.setDate(today.getDate() - 1);

  const nextDay = new Date(today);
  nextDay.setDate(today.getDate() + 1);

  useEffect(() => {}, []);

  // Handle navigation
  const handleStartStudying = () => {
    navigation.navigate("Timer");
  };

  const handleLogout = () => {
    navigation.navigate("Login");
  };

  const handleViewSessionDetails = (sessionId) => {
    navigation.navigate("SessionDetails", { sessionId });
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
            <TouchableOpacity
              onPress={handleLogout}
              style={styles.logoutButton}
            >
              <Icon name="logout" size={30} color="black" />
            </TouchableOpacity>
          </View>
        </View>

        {/* date */}
        <View style={{ height: 100, width: "20%", }}>
          <View>
            <View> {/* prev day*/}
            <Text style={{fontSize: 24, fontWeight: 'bold', marginLeft: 5}}>{}</Text>
            </View>
          </View>
          <Text style={{fontSize: 24, fontWeight: 'bold', marginLeft: 5}}>{weekday}</Text>
        </View>

        {/* Daily Qoute */}
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View
            style={{
              width: "100%",
              padding: 20,
              borderRadius: 15,
              marginBottom: 10,
              backgroundColor: "#FEE0C1",
            }}
          >
            <Image
              source={require("../assets/qoutes/right.png")}
              style={{ height: 25, width: 25, alignSelf: "flex-start" }}
            />
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={{ maxHeight: 200 }}
              contentContainerStyle={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 25,
                  fontStyle: "italic",
                  textShadowRadius: 7,
                  padding: 20,
                  maxWidth: "85%",
                }}
              >
                Daily Motivational Quotes
              </Text>
            </ScrollView>
            <Image
              source={require("../assets/qoutes/left.png")}
              style={{ height: 25, width: 25, alignSelf: "flex-end" }}
            />
          </View>
        </ScrollView>

        {/* Digital Tracker Section */}
        {/* <View style={styles.digitalTracker}>
          <Text style={styles.trackerTitle}>📊 Digital Tracker</Text>
          <View style={styles.trackerContent}>
            <Text style={styles.trackerText}>Logged-in Days: 15</Text>
            <Text style={styles.trackerText}>Avg Task Completion: 85%</Text>
            <Text style={styles.trackerText}>Total Study Sessions: 22</Text>
          </View>
        </View> */}

        {/* Session Details */}

        <View
          style={{
            backgroundColor: "#bbb",
            minHeight: 300,
            padding: 5,
            margin: 3,
            ...styles.shadow,
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <Text style={{ fontSize: 24, fontWeight: "bold", padding: 5 }}>
              Session Name: {"    "}
            </Text>
            <Text
              style={{
                fontSize: 24,
                fontWeight: "bold",
                backgroundColor: "white",
                borderRadius: 10,
                padding: 5,
              }}
            >
              Pomodoro
            </Text>
          </View>
          <View style={{ ...styles.shadow }}>
            <Text
              style={{
                fontSize: 24,
                fontWeight: "bold",
                padding: 5,
                backgroundColor: "orange",
                width: 70,
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
              }}
            >
              Tasks
            </Text>
            <View
              style={{
                minHeight: 150,
                backgroundColor: "#f5f5f5",
                borderBottomLeftRadius: 10,
                borderBottomRightRadius: 10,
                borderTopRightRadius: 10,
                borderTopColor: "orange",
                borderTopWidth: 2,
                borderLeftColor: "orange",
                borderLeftWidth: 2,
                position: "relative",
                overflow: "hidden", // Ensures the shadow effect stays within the bounds
                // iOS Shadow Properties
                shadowColor: "orange",
                shadowOffset: { width: 0, height: 0 }, // No offset to keep it centered
                shadowOpacity: 0.5, // Adjust opacity for the shadow intensity
                shadowRadius: 10, // Adjust the blur radius for the inward shadow effect
                // Android Elevation (simulates shadow)
                elevation: 5,
              }}
            ></View>
          </View>
        </View>

        {/* Start Studying Button */}
        <View
          style={{
            marginTop: 10,
            backgroundColor: "#FF00FF",
            height: 50,
            borderRadius: 100,
            width: "80%",
            shadowColor: "red",
            shadowOffset: {
              width: 6,
              height: 6,
            },
            shadowOpacity: 1,
            shadowRadius: 9,
            elevation: 10,
            alignSelf: "center",
          }}
        >
          <TouchableOpacity style={{}} onPress={handleStartStudying}>
            <Text style={styles.startButtonText}>Start Studying</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FEE0C1",
    padding: width * 0.01, // 5% padding for responsiveness
    // margin: width * 0.009, // Adjust margin for different screen sizes
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
  digitalTracker: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    backgroundColor: "#F3F3F3", // Light background
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: -5,
      height: -5, // Create inward shadow
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    borderWidth: 2,
    borderColor: "#E0E0E0", // Border to enhance "carved" effect
  },
  trackerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
    textAlign: "center",
  },
  trackerContent: {
    backgroundColor: "#E6E6E6",
    borderRadius: 10,
    padding: 15,
    shadowColor: "#FFF",
    shadowOffset: {
      width: 3,
      height: 3, // Inner highlights
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  trackerText: {
    fontSize: 16,
    color: "#555",
    marginVertical: 5,
    textAlign: "center",
  },
  streakText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    textAlign: "center",
  },

  startButton: {
    backgroundColor: "blue",
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
    width: "90%",
    alignSelf: "center",
    shadowColor: "75FDF0",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  startButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
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

export default HomeScreen;
