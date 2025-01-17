import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ImageBackground,
  SafeAreaView,
  Alert,
  TouchableOpacity,
  BackHandler,
  PermissionsAndroid,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import { ScrollView } from "react-native-gesture-handler";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import * as Permissions from "expo-permissions";
import * as Notifications from "expo-notifications";
import { Audio } from "expo-av";
import { TASK_API_END_POINT } from "../utils/constant";
import { Colors } from "react-native/Libraries/NewAppScreen";

const { width, height } = Dimensions.get("window");

const StartstudyingScreen = () => {
  const [session, setSession] = useState(null);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const soundRef = useRef(null);
  const [tasks, setTasks] = useState([]);
  const [token, setToken] = useState("");

  const navigation = useNavigation();

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem("userToken");
        if (storedToken) {
          setToken(storedToken);
          fetchTasks(storedToken); // Call fetchTasks after fetching the token
        }
      } catch (error) {
        console.error("Failed to fetch token from AsyncStorage:", error);
      }
    };

    fetchToken();
  }, []);

  const fetchTasks = async (token) => {
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

  const requestNotificationPermission = async () => {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== "granted") {
      alert("Permission to access notifications was denied");
    }
  };

  const configureNotifications = async () => {
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: false,
        shouldPlaySound: false,
        shouldSetBadge: false,
      }),
    });
  };

  const loadSound = async () => {
    if (!soundRef.current) {
      const { sound } = await Audio.Sound.createAsync(
        require("../assets/audio/music1.mp3") // Replace with your music file
      );
      soundRef.current = sound;
    }
  };

  const playSound = async () => {
    if (soundRef.current) {
      await soundRef.current.playAsync();
      setIsPlaying(true);
    }
  };

  const stopSound = async () => {
    console.log("stopSound called");
    if (soundRef.current) {
      console.log("Stopping sound");
      await soundRef.current.stopAsync();
      setIsPlaying(false);
    } else {
      console.log("No sound to stop");
    }
  };

  const toggleSound = async () => {
    if (isPlaying) {
      await stopSound();
    } else {
      await playSound();
    }
  };

  useEffect(() => {
    requestNotificationPermission();
    configureNotifications();
    loadSound().then(playSound);

    return () => {
      stopSound();
    };
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      // Screen is focused
      playSound();

      return () => {
        // Screen is unfocused
        stopSound();
      };
    }, [])
  );

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const storedSession = await AsyncStorage.getItem("upcomingSession");
        if (storedSession) {
          const sessionData = JSON.parse(storedSession);
          setSession(sessionData);
          const startTime = new Date(sessionData.start_time);
          const endTime = new Date(sessionData.end_time);
          const sessionDuration = (endTime - startTime) / 1000; // duration in seconds
          setDuration(sessionDuration);
        }
      } catch (error) {
        console.error("Failed to fetch session from AsyncStorage:", error);
      }
    };

    fetchSession();
  }, []);

  useEffect(() => {
    const backAction = () => {
      Alert.alert("Hold on!", "Do you want to exit the session?", [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel",
        },
        { text: "YES", onPress: () => navigation.goBack() },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <ImageBackground
          source={require("../assets/studybg.jpg")}
          resizeMode="cover"
          style={{ height: height, width: width }}
        >
          {session && (
            <View style={styles.timerContainer}>
              <CountdownCircleTimer
                trailColor="red"
                size={300}
                isPlaying
                duration={duration}
                colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
                colorsTime={[7, 5, 2, 0]}
                onComplete={() => {
                  // Actions to perform when the timer completes
                  alert("Session completed!");
                  stopSound();
                }}
              >
                {({ remainingTime }) => (
                  <Text style={styles.timerText}>
                    {Math.floor(remainingTime / 60)}:{remainingTime % 60}
                  </Text>
                )}
              </CountdownCircleTimer>
            </View>
          )}
          <View
            style={{
              paddingTop: 20,

              borderRadius: 20,
            }}
          >
            {tasks.length === 0 ? (
              <Text style={{ fontSize: 18, color: "grey" }}>
                No tasks found.
              </Text>
            ) : (
              <View style={{ alignItems: "center" }}>
                {tasks.map((task, index) => (
                  <View
                    key={index}
                    style={{
                      marginBottom: 20,
                      height: height * 0.22,
                      width: width * 0.9,
                      backgroundColor: "white",
                      borderBottomRightRadius: 0,
                      shadowColor: 'black',
                      shadowOffset: {
                        width: 0,
                        height: 10,
                      },
                      shadowOpacity: 0.25,
                      shadowRadius: 3.5,
                      elevation: 10,
                      borderRadius: 20,
                      position: "absolute",
                      top: index * 10,
                      zIndex: tasks.length - index,
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
                        {task.title}
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
                        <TouchableOpacity
                          style={{ marginRight: 10 }}
                          onPress={() => completeTask(task.id)}
                        >
                          <Text style={{ color: "white", fontSize: 20 }}>
                            Mark as Complete
                          </Text>
                        </TouchableOpacity>
              
                      </View>
                    </View>
                  </View>
                ))}
              </View>
            )}
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: "flex-end",
              alignItems: "center",
              marginBottom: 20,
            }}
          >
            <TouchableOpacity onPress={toggleSound}>
              <Image
                source={require("../assets/music2.png")}
                style={{ height: 50, width: 50 }}
              />
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#d1dff6",
  },
  timerContainer: {
    marginBottom: 20,
    alignItems: "center",
  },
  timerText: {
    fontSize: 80,
    fontWeight: "bold",
    color: "white",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
  tasksContainer: {
    padding: 20,
  },
  tasksTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  taskItem: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  taskText: {
    fontSize: 18,
  },
});

export default StartstudyingScreen;
