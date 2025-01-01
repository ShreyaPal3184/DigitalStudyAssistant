import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
  Modal,
  Pressable,
  Dimensions,
  Button,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Get the screen dimensions for responsiveness
const { width, height } = Dimensions.get("window");

const HomeScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [username, setUsername] = useState("");

  const navigation = useNavigation();

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

  const handleProfile = () => {
    navigation.navigate("Profile");
  };

  const dateToday = new Date();
  const day = dateToday.getDate();
  const weekDay = dateToday.getDay();
  const weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const weekDayName = weekDays[weekDay];
  const month = dateToday.getMonth();
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const monthName = months[month];
  const year = dateToday.getFullYear();

  // Get the previous day
  const prevDate = new Date(dateToday); // Create a new Date object to not modify the original
  prevDate.setDate(day - 1); // Subtract 1 from the current date

  // Get the next day
  const nextDate = new Date(dateToday); // Create a new Date object
  nextDate.setDate(day + 1); // Add 1 to the current date

  // Get the previous day, next day as readable formats
  const prevDay = prevDate.getDate();
  const nextDay = nextDate.getDate();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            margin: 20,
          }}
        >
          <TouchableOpacity onPress={() => console.log("hamburger menu")}>
            <Image
              source={require("../assets/hamburger.png")}
              style={{ height: 25, width: 25 }}
            />
          </TouchableOpacity>
          <View
            style={{
              flexDirection: "row",
              width: width * 0.25,
              justifyContent: "space-between",
            }}
          >
            {/* Bell Icon */}
            <TouchableOpacity
              onPress={() => setModalVisible(true)}
              style={{
                backgroundColor: "white",
                borderRadius: 100,
                height: width * 0.09,
                width: width * 0.09,
                justifyContent: "center",
                alignItems: "center",
                ...styles.shadow,
              }}
            >
              <Image
                source={require("../assets/bell.png")} // Replace with the path to your bell icon
                style={{ height: 25, width: 25 }}
              />
            </TouchableOpacity>

            {/* Profile Icon */}
            <TouchableOpacity
              onPress={handleProfile}
              style={{
                backgroundColor: "white",
                borderRadius: 100,
                height: width * 0.09,
                width: width * 0.14,
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

        {/* user */}
        <View style={{ padding: 15 }}>
          <Text style={{ fontSize: 50, fontWeight: "400" }}>Hello,</Text>
          <Text
            style={{ fontSize: 50, fontWeight: "bold", ...styles.textShadow }}
          >
            {username} {" "}👋
          </Text>
        </View>

        <View style={{ padding: 15 }}>
          <Text style={{ fontSize: 30, fontWeight: "300" }}>
            What are you going to do today?
          </Text>
          <View
            style={{ flexDirection: "row", padding: 5, alignItems: "center" }}
          >
            <View style={styles.LeftSideDates}>
              <Text
                style={{ textAlign: "center", fontSize: 24, fontWeight: "100" }}
              >
                {prevDay}{" "}
              </Text>
            </View>
            <View
              style={{
                height: height * 0.07,
                backgroundColor: "#F2E3A1",
                width: width * 0.14,
                justifyContent: "center",
                borderRadius: 10,
                borderWidth: 1,
                borderColor: "grey",
                ...styles.shadow,
              }}
            >
              <Text
                style={{ textAlign: "center", fontSize: 32, fontWeight: "200" }}
              >
                {day}
              </Text>
            </View>
            <View style={styles.RightSideDates}>
              <Text
                style={{ textAlign: "center", fontSize: 24, fontWeight: "100" }}
              >
                {nextDay}
              </Text>
            </View>
          </View>
          <Text style={{ padding: 5, fontSize: 18, color: "grey" }}>
          {monthName}, {weekDayName}, {year}
          </Text>
        </View>

        {/* Notifications Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Notifications</Text>
              <ScrollView>
                <Text style={styles.notificationText}>
                  - You have a new message.
                </Text>
                <Text style={styles.notificationText}>
                  - Your session starts in 10 minutes.
                </Text>
                <Text style={styles.notificationText}>
                  - Reminder: Complete your task for today.
                </Text>
              </ScrollView>
              <Pressable
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.closeButtonText}>Close</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 40,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 20,
  },
  shadow: {
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 10,
  },
  textShadow: {
    textShadowColor: "rgba(0, 0, 0, 0.5)", // Shadow color
    textShadowOffset: { width: 2, height: 2 }, // Shadow offset
    textShadowRadius: 3, // Blur radius
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  notificationText: {
    fontSize: 16,
    marginBottom: 5,
  },
  closeButton: {
    marginTop: 15,
    backgroundColor: "blue",
    borderRadius: 10,
    padding: 10,
  },
  closeButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  LeftSideDates: {
    marginRight: 5,
    height: height * 0.05,
    backgroundColor: "white",
    width: width * 0.09,
    justifyContent: "center",
    borderRightWidth: 1,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "grey",
    borderRadius: 10,
  },
  RightSideDates: {
    marginLeft: 5,
    height: height * 0.05,
    backgroundColor: "white",
    width: width * 0.09,
    justifyContent: "center",
    borderLeftWidth: 1,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "grey",
    borderRadius: 10,
  },
});

export default HomeScreen;
