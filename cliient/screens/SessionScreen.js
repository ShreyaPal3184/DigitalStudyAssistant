import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
  RefreshControl,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SESSION_API_END_POINT } from "../utils/constant";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

const SessionScreen = ({ navigation }) => {
  const [sessions, setSessions] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const images = [
    // require('../assets/sessionimages/red1.jpg'),
    // require('../assets/sessionimages/red2.jpg'),
    // require('../assets/sessionimages/red3.jpg'),
    require('../assets/sessionimages/black1.jpg'),
    // require('../assets/gold-glitter-abstract-white-background.jpg'),
  ];

  useEffect(() => {
    fetchSessions(); 
  }, []);

  const fetchSessions = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      const response = await fetch(`${SESSION_API_END_POINT}/user`, {
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

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchSessions();
    setRefreshing(false);
  };

  const startSessionNow = async (session) => {
    try {
      await AsyncStorage.setItem("upcomingSession", JSON.stringify(session));
      Alert.alert("Success", "Session started successfully. Go To HomeScreen");
    } catch (error) {
      Alert.alert("Error", error.message || "An error occurred.");
    }
  };

  const deleteSession = async (sessionId) => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      if (!token) {
        Alert.alert("Error", "No token.");
        return;
      }
      const response = await fetch(`${SESSION_API_END_POINT}/delete/${sessionId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const contentType = response.headers.get("content-type");
      let responseData;
      if (contentType && contentType.indexOf("application/json") !== -1) {
        responseData = await response.json();
      } else {
        responseData = await response.text();
      }

      console.log("Delete response:", responseData);
      if (response.ok) {
        Alert.alert("Success", "Task deleted successfully.");
        fetchSessions(); // Refresh sessions
      } else {
        Alert.alert("Error", responseData.message || responseData || "Failed to delete session.");
      }
    } catch (error) {
      Alert.alert("Error", error.message || "An error occurred.");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View
          style={{
            height: height * 0.05,
            maxHeight: "20%",
            backgroundColor: "white",
          }}
        >
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              height: height * 0.05,
              maxHeight: "100%",
              backgroundColor: "#2c2d2d",
            }}
          >
            <Text style={{ fontSize: 28, color: "white", fontWeight: "400" }}>
              Sessions
            </Text>
          </View>
        </View>
        <View
          style={{
            height: height * 0.95,
            backgroundColor: "#2c2d2d",
          }}
        >
          <View
            style={{
              height: height * 0.95,
              width: width,
              alignItems: "center",
              alignSelf: "center",
              padding: 20,
              backgroundColor: "white",
              borderTopLeftRadius: 50,
              borderTopRightRadius: 50,
              borderWidth: 5,
              borderColor: "purple",
            }}
          >
            {sessions.length === 0 ? (
              <Text style={{ fontSize: 18, color: "grey" }}>
                No sessions found.
              </Text>
            ) : (
              sessions.map((session, index) => (
                <View key={index} style={styles.sessionCard}>
                  <View style={styles.imageContainer}>
                    <Image
                      source={images[index % images.length]}
                      style={styles.sessionImage}
                    />
                  </View>
                  <View style={styles.sessionDetailsContainer}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', padding: 1, alignItems: 'center'}}>
                    <Text style={styles.sessionTitle}>{session.subject}</Text>
                    <TouchableOpacity onPress={() => deleteSession(session.id)}>
                    <Image source={require('../assets/delete1.png')} style={{height: 30, width: 30}} />
                    </TouchableOpacity>
                    </View>
                    <Text
                      style={{
                        width: session.start_time.length * 7.5,
                        padding: 10,
                        ...styles.sessionDetails,
                      }}
                    >
                      Start Time: {new Date(session.start_time).toLocaleTimeString()}
                    </Text>
                    <Text
                      style={{
                        width: session.end_time.length * 7,
                        padding: 10,
                        ...styles.sessionDetails,
                      }}
                    >
                      End Time: {new Date(session.end_time).toLocaleTimeString()}
                    </Text>
                    <TouchableOpacity
                      style={styles.startButton}
                      onPress={() => startSessionNow(session)}
                    >
                      <Text style={styles.startButtonText}>Start Now</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sessionCard: {
    width: "100%",
    height: height*0.25,
    borderRadius: 20,
    marginBottom: 15,
    shadowColor: "blue",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    borderWidth: 1,
    borderColor: "#b3d9ff",
    position: "relative",
  },
  imageContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 20,
    overflow: "hidden",
  },
  sessionImage: {
    height: "100%",
    width: "100%",
  },
  sessionDetailsContainer: {
    padding: 15,
    borderRadius: 20,
    zIndex: 1,
  },
  sessionTitle: {
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 5,
    color: "white",
  },
  sessionDetails: {
    fontSize: 16,
    color: "white",
    fontWeight: "400",
    borderRadius: 10,
    borderWidth: 1,
    borderColor:'purple',
    margin: 5,
  },
  startButton: {
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    borderWidth: 0.2,
    borderColor: 'white',
    width: "40%",
    alignSelf: 'flex-end'
  },
  startButtonText: {
    color: "white",
    textAlign: "center",
    fontSize: 24,
  },
  addButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "black",
    padding: 15,
    borderRadius: 50,
    alignItems: "center",
  },
  addButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default SessionScreen;
