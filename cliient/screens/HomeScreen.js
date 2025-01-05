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
} from "react-native";
import { useNavigation } from "@react-navigation/native";
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
      // fetchUpcomingSession();
    }
  }, [token]);

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
        Alert.alert("Unauthorized", "Please log in again.");
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
          "Authorization": `Bearer ${token}`,
        },
      });

      const responseData = await response.json();
      if (response.ok) {
        setSessions(responseData);
      } else {
        Alert.alert("Error", responseData.message || "Failed to fetch sessions.");
      }
    } catch (error) {
      Alert.alert("Error", error.message || "An error occurred.");
    }
  };

  // const fetchUpcomingSession = async () => {
  //   try {
  //     const response = await fetch(`${SESSION_API_END_POINT}/upcoming`, {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });

  //     if (response.status === 401) {
  //       Alert.alert("Unauthorized", "Please log in again.");
  //       return;
  //     }

  //     const contentType = response.headers.get("content-type");
  //     let responseData;
  //     if (contentType && contentType.includes("application/json")) {
  //       responseData = await response.json();
  //     } else {
  //       responseData = await response.text();
  //       console.error("Unexpected response format:", responseData);
  //       return;
  //     }

  //     if (response.ok) {
  //       setUpcomingSession(responseData);
  //     } else {
  //       Alert.alert("Error", responseData.message || "Failed to fetch upcoming session.");
  //     }
  //   } catch (error) {
  //     console.error("Error fetching upcoming session:", error);
  //     Alert.alert("Error", error.message || "An error occurred.");
  //   }
  // };

  // useEffect(() => {
  //   const fetchStoredUpcomingSession = async () => {
  //     try {
  //       const storedSession = await AsyncStorage.getItem("upcomingSession");
  //       if (storedSession) {
  //         setUpcomingSession(JSON.parse(storedSession));
  //       }
  //     } catch (error) {
  //       console.error("Failed to fetch upcoming session from AsyncStorage:", error);
  //     }
  //   };

  //   fetchStoredUpcomingSession();
  // }, []);

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
  "#E6D99C"  // Subtle brownish tint

  ];

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchTasks();
    // fetchUpcomingSession();
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
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
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
            style={{ fontSize: 50, fontWeight: "bold", ...styles.textShadow }}
          >
            {username} 👋
          </Text>
        </View>

        <View style={{ paddingTop: 20 }}>
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

        {/* my tasks */}
        <View style={{ paddingTop: 20 }}>
          <Text style={{ fontSize: 35, fontWeight: "bold" }}>my tasks: </Text>
          <View style={{ paddingTop: 20, backgroundColor: "white", borderRadius: 20 }}>
            {tasks.length === 0 ? (
              <Text style={{ fontSize: 18, color: "grey" }}>
                No tasks found.
              </Text>
            ) : (
              <ScrollView
                style={{ borderRadius: 10, height: height * 0.45, }}
                contentContainerStyle={{ flexGrow: 1, alignItems: "center" }}
                nestedScrollEnabled={true}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
              >
                {tasks.map((task, index) => (
                  <View
                    key={index}
                    style={{
                      marginBottom: 50,
                      height: height * 0.17,
                      width: width * 0.9,
                      backgroundColor: (task.priority === "High" ? 'red' :(task.priority === "Medium" ? 'orange' : 'green')),
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
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignSelf: "flex-end",
                        width: width * 0.86,
                        height: height * 0.14,
                        padding: 20,
                        borderWidth: 1,
                        borderTopColor: 'grey',
                        borderRadius: 20,
                        borderBottomRightRadius: 0,
                        backgroundColor: "white",
                      }}
                    >
                      <View
                        style={{
                          backgroundColor: "white",
                          borderRadius: 35,
                          padding: 1,
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Image
                          source={require("../assets/checklist.png")}
                          style={{ height: 75, width: 75 }}
                        />
                      </View>
                      <View style={{ flexDirection: "column", width: "67%" }}>
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            marginBottom: 5,
                          }}
                        >
                          <Text style={{ fontSize: 24, fontWeight: "bold" }}>
                            {task.title}
                          </Text>
                        </View>
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            marginBottom: 5,
                          }}
                        >
                          <Text
                            style={{
                              fontSize: 16,
                              color: "grey",
                              paddingRight: 5,
                            }}
                          >
                            due date:{" "}
                          </Text>
                          <Text style={{ fontSize: 20, fontWeight: "400" }}>
                            {new Date(task.due_date).toDateString()}
                          </Text>
                        </View>
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                          }}
                        >
                          <Text
                            style={{
                              fontSize: 16,
                              color: "grey",
                              paddingRight: 5,
                            }}
                          >
                            priority:{" "}
                          </Text>
                          <Text style={{ fontSize: 20, fontWeight: "400" }}>
                            {task.priority}
                          </Text>
                        </View>
                      </View>
                    </View>
                    <View style={{flexDirection: 'row', alignSelf: 'flex-end'}}>
                    <TouchableOpacity onPress={() => deleteTask(task.id)} style={{ backgroundColor: "white", borderRadius: 10, padding: 10, width: width*0.32, alignSelf: "flex-end", borderColor: colors[index % colors.length], borderBottomRightRadius: 0, borderTopRightRadius:0, borderWidth:1,borderColor: 'black' }}>
                      <Text style={{textAlign:'center', fontSize: 20}}>Task Complete</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => deleteTask(task.id)} style={{ backgroundColor: "white", padding: 10, alignSelf: "flex-end", borderColor: colors[index % colors.length], borderBottomRightRadius: 0, borderTopRightRadius:0, borderWidth:1,borderColor: 'black' }}>
                      <Image source={require("../assets/delete.png")} style={{height: 24, width: 25}}/>
                    </TouchableOpacity>
                    </View>
                  </View>
                ))}
              </ScrollView>
            )}
          </View>
        </View>

        {/* upcoming session */}
        {/* <View>
          <Text style={{ fontSize: 35, fontWeight: "bold", paddingTop: 20 }}>
            upcoming session:
          </Text>
          {upcomingSession ? (
            <View style={{ marginTop: 10, paddingTop: 20, borderWidth: 1, borderColor: "grey", borderRadius: 20, backgroundColor: "white", padding: 20, width: width * 0.9, height: height * 0.25 }}>
              <Text style={{ fontSize: 24, fontWeight: "bold" }}>{upcomingSession.subject}</Text>
              <Text style={{ fontSize: 18, color: "grey" }}>Start Time: {new Date(upcomingSession.start_time).toLocaleTimeString()}</Text>
              <Text style={{ fontSize: 18, color: "grey" }}>End Time: {new Date(upcomingSession.end_time).toLocaleTimeString()}</Text>
              <Text style={{ fontSize: 18, color: "grey" }}>Status: {upcomingSession.status}</Text>
            </View>
          ) : (
            <Text style={{ fontSize: 18, color: "grey" }}>No upcoming sessions found.</Text>
          )}
        </View> */}

        <View style={{backgroundColor:'white', justifyContent: 'center', alignItems: 'center', padding: 20, borderRadius: 20, marginTop: 20}}>
          <TouchableOpacity onPress={()=>navigation.navigate('StartstudyingScreen')} style={{  borderRadius: 10, padding: 20, width: "80%", alignSelf: "center", marginTop: 20, borderWidth: 1, borderColor: 'black' }}>
            <Text style={{fontSize: 24, textAlign: 'center'}}>Start Studying</Text>
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
