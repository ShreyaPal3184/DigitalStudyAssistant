import React, { useState, useEffect, useCallback } from "react";
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
  Alert,
  RefreshControl,
  ImageBackground, // Add ImageBackground import
} from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TASK_API_END_POINT, SESSION_API_END_POINT } from "../utils/constant";

// Get the screen dimensions for responsiveness
const { width, height } = Dimensions.get("window");

const HomeScreen = () => {
  const [username, setUsername] = useState("");
  const [tasks, setTasks] = useState([]);
  const [token, setToken] = useState("");
  const [upcomingSession, setUpcomingSession] = useState(null);
  const [sessions, setSessions] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

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

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem("userToken");
        if (storedToken) {
          setToken(storedToken);
        }
      } catch (error) {
        console.error("Failed to fetch token from AsyncStorage:", error);
      }
    };

    fetchToken();
  }, []);

  //fetch sessions
  useEffect(() => {
    if (token) {
      fetchTasks();
      fetchUpcomingSession();
    }
  }, [token]);

  useFocusEffect(
    useCallback(() => {
      fetchUpcomingSession();
    }, [])
  );

  const fetchTasks = async () => {
    try {
      const response = await fetch(`${TASK_API_END_POINT}/user`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 401) {
        console.log("Unauthorized", "Please log in again.");
        return;
      }

      const contentType = response.headers.get("content-type");
      let responseData;
      if (contentType && contentType.includes("application/json")) {
        responseData = await response.json();
      } else {
        responseData = await response.text();
        console.error("Unexpected response format:", responseData);
        return;
      }

      if (response.ok) {
        setTasks(responseData);
      } else {
        console.error("Failed to fetch tasks:", responseData);
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  //fetch sessions
  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      const response = await fetch(`${SESSION_API_END_POINT}/get`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const responseData = await response.json();
      if (response.ok) {
        setSessions(responseData);
      } else {
        Alert.alert(
          "Error",
          responseData.message || "Failed to fetch sessions."
        );
      }
    } catch (error) {
      Alert.alert("Error", error.message || "An error occurred.");
    }
  };

  const fetchUpcomingSession = async () => {
    try {
      const storedSession = await AsyncStorage.getItem("upcomingSession");
      if (storedSession) {
        setUpcomingSession(JSON.parse(storedSession));
      }
    } catch (error) {
      console.error(
        "Failed to fetch upcoming session from AsyncStorage:",
        error
      );
    }
  };

  const removeUpcomingSession = async () => {
    try {
      await AsyncStorage.removeItem("upcomingSession");
      setUpcomingSession(null);
      Alert.alert("Success", "Session removed successfully.");
    } catch (error) {
      Alert.alert("Error", error.message || "An error occurred.");
    }
  };

  const completeTask = async (taskId) => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      const response = await fetch(`${TASK_API_END_POINT}/complete/${taskId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
        Alert.alert("Success", "Task completed successfully.");
        // No need to call fetchTasks() here as we are already updating the state
      } else {
        const responseData = await response.json();
        Alert.alert("Error", responseData.message || "Failed to complete task.");
      }
    } catch (error) {
      Alert.alert("Error", error.message || "An error occurred.");
    }
  };

  const colors = [
    "#F2E3A1", // Original
    "#F7E8B0", // Lighter shade
    "#ECE09A", // Slightly darker
    "#FFF2C3", // Pale yellow
    "#E8D891", // Muted gold
    "#D9C77A", // Deeper tone
    "#FAEDB5", // Soft pastel
    "#F1E09F", // Slightly warmer
    "#EFE6B0", // Neutral beige
    "#E6D99C", // Subtle brownish tint
  ];

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchTasks();
    fetchUpcomingSession();
    setRefreshing(false);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={{ paddingBottom: 20 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 20 }}>
              Study
              <Text style={{ color: "black", fontWeight: "900" }}>Master</Text>
            </Text>
            <View
              style={{
                flexDirection: "row",
                width: width * 0.25,
                justifyContent: "space-between",
              }}
            >
              {/* Bell Icon */}
              <TouchableOpacity
                onPress={() => navigation.navigate("NotificationScreen")}
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
          <View style={{ paddingTop: 20 }}>
            <Text style={{ fontSize: 50, fontWeight: "400" }}>Hello,</Text>
            <Text
              style={{ fontSize: 40, fontWeight: "bold", ...styles.textShadow, marginBottom: 10 }}
            >
              {username} 👋
            </Text>
            <Text style={{ fontSize: 30, fontWeight: "300" }}>
              What are you going to do today?
            </Text>
            <View
              style={{ flexDirection: "row", padding: 5, alignItems: "center" }}
            >
              <View style={styles.LeftSideDates}>
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 24,
                    fontWeight: "100",
                  }}
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
                  style={{
                    textAlign: "center",
                    fontSize: 32,
                    fontWeight: "200",
                  }}
                >
                  {day}
                </Text>
              </View>
              <View style={styles.RightSideDates}>
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 24,
                    fontWeight: "100",
                  }}
                >
                  {nextDay}
                </Text>
              </View>
            </View>
            <Text style={{ padding: 5, fontSize: 18, color: "grey" }}>
              {monthName}, {weekDayName}, {year}
            </Text>
          </View>
        </View>

        {/*  my tasks */}
        <View style={{ paddingTop: 0 }}>
          <Text style={{ fontSize: 30, fontWeight: "500" }}>
            your tasks<Text style={{ fontSize: 40 }}>,</Text>{" "}
          </Text>
          <View
            style={{
              paddingTop: 20,
              backgroundColor: "white",
              borderRadius: 20,
            }}
          >
            {tasks.length === 0 ? (
              <Text style={{ fontSize: 18, color: "grey" }}>
                No tasks found.
              </Text>
            ) : (
              <ScrollView
                style={{ borderRadius: 10, height: height * 0.27 }}
                contentContainerStyle={{ flexGrow: 1, alignItems: "center" }}
                nestedScrollEnabled={true}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                horizontal={true}
              >
                {tasks.map((task, index) => (
                  <View
                    key={index}
                    style={{
                      marginRight: 10,
                      marginBottom: 50,
                      height: height * 0.22,
                      width: width * 0.9,
                      backgroundColor: "white",
                      borderBottomRightRadius: 0,
                      shadowColor: colors[index % colors.length],
                      shadowOffset: {
                        width: 0,
                        height: 10,
                      },
                      shadowOpacity: 0.25,
                      shadowRadius: 3.5,
                      elevation: 10,
                      borderRadius: 20,
                    }}
                  >
                    <Image
                      source={require("../assets/tasksbg.jpg")}
                      style={{
                        height: "100%",
                        width: "100%",
                        borderRadius: 20,
                        position: "absolute",
                      }}
                    />
                    <View style={{ padding: 20 }}>
                      <Text
                        style={{
                          fontSize: 30,
                          fontWeight: "bold",
                          color: "white",
                          marginBottom: 10,
                        }}
                      >
                        {task.title}, <Text style={{color: 'white', fontSize: 15, fontWeight: '400'}}>{task.description}</Text>
                      </Text>

                      <View
                        style={{
                          borderRadius: 25,
                          borderWidth: 2,
                          borderColor: "lightblue",
                          padding: 7,
                          marginVertical: 5,
                          width: task.due_date.length * 9,
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 18,
                            color: "white",
                            textAlign: "center",
                          }}
                        >
                          Due Date: {new Date(task.due_date).toDateString()}
                        </Text>
                      </View>
                      <View
                        style={{
                          borderRadius: 25,
                          borderWidth: 2,
                          borderColor:
                            task.priority === "High"
                              ? "red"
                              : task.priority === "Medium"
                              ? "orange"
                              : "yellow",
                          padding: 5,
                          marginVertical: 5,
                          width: task.priority.length * 20,
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 18,
                            fontWeight: "900",
                            color: "white",
                            textAlign: "center",
                            color:
                              task.priority === "High"
                                ? "red"
                                : task.priority === "Medium"
                                ? "orange"
                                : "yellow",
                          }}
                        >
                          {task.priority}
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: "row",
                          padding: 1,
                          alignItems: "center",
                          alignSelf: "flex-end",
                        }}
                      >
                        <TouchableOpacity>
                          <Image
                            source={require("../assets/delete1.png")}
                            style={{ height: 30, width: 30 }}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                    
                  </View>
                ))}
              </ScrollView>
            )}
          </View>
        </View>

        {/* upcoming session */}
        <View>
          <Text style={{ fontSize: 35, fontWeight: "500", paddingTop: 0 }}>
            your session<Text style={{ fontSize: 40 }}>,</Text>
          </Text>
          {upcomingSession ? (
            <ImageBackground
              source={require("../assets/white1.png")}
              style={styles.upcomingSessionImage}
              imageStyle={{ borderRadius: 20 }}
            >
              <View style={styles.upcomingSessionDetails}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    padding: 1,
                  }}
                >
                  <Text
                    style={{ fontSize: 44, fontWeight: "bold", color: "black" }}
                  >
                    {upcomingSession.subject}
                  </Text>
                </View>
                <Text
                  style={{
                    fontSize: 18,
                    color: "black",
                    borderWidth: 1,
                    borderColor: "purple",
                    padding: 4,
                    borderRadius: 20,
                    width: upcomingSession.start_time.length * 8,
                    textAlign: "center",
                    marginBottom: 10,
                  }}
                >
                  Date: {new Date(upcomingSession.start_time).toDateString()}
                </Text>
                <Text
                  style={{
                    fontSize: 18,
                    color: "black",
                    borderWidth: 1,
                    borderColor: "blue",
                    padding: 4,
                    borderRadius: 20,
                    width: upcomingSession.start_time.length * 8,
                    textAlign: "center",
                  }}
                >
                  Start Time:{" "}
                  {new Date(upcomingSession.start_time).toLocaleTimeString()}
                </Text>
                <View style={{alignSelf: 'flex-end', marginTop: "10%"}}>
                  <TouchableOpacity
                    style={{alignSelf:'flex-end' ,...styles.removeButton}}
                    onPress={removeUpcomingSession}
                  >
                    <Text style={styles.removeButtonText}>Remove Session</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ImageBackground>
          ) : (
            <View
              style={{
                padding: 20,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{ fontSize: 18, color: "grey", fontStyle: "italic" }}
              >
                No upcoming sessions found. Please go to Your Sessions screen
                and start a session or create a new one.
              </Text>
            </View>
          )}
        </View>

        <View
          style={{
            backgroundColor: "white",
            justifyContent: "center",
            alignItems: "center",
            padding: 20,
            borderRadius: 20,
            marginTop: 20,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              if (upcomingSession) {
                navigation.navigate("StartstudyingScreen");
              }
            }}
            style={{
              borderRadius: 10,
              padding: 10,
              width: "80%",
              alignSelf: "center",
              marginTop: 20,
              borderWidth: 1,
              borderColor: "black",
              backgroundColor: upcomingSession ? "black" : "grey",
              ...styles.shadow,
            }}
            disabled={!upcomingSession}
          >
            <Text style={{ fontSize: 24, textAlign: "center", color: "white" }}>
              Start Studying
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "white",
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 100,
    padding: 20,
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
    textShadowOffset: { width: 2, height: 2 }, // Shadow offset
    textShadowRadius: 3, // Blur radius
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
  upcomingSessionImage: {
    height: 250,
    marginTop: 20,
    borderRadius: 20,
    overflow: "hidden",
  },
  upcomingSessionDetails: {
    flex: 1,
    padding: 20,
    borderRadius: 20,
  },
  removeButton: {
    marginTop: 10,
    padding: 5,
    borderRadius: 10,
  },
  removeButtonText: {
    color: "red",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 12,
    borderWidth: 1,
    borderRadius: 10,
    padding: 3,
  },
});

export default HomeScreen;
