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
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SESSION_API_END_POINT } from "../utils/constant";

const { width, height } = Dimensions.get("window");

const SessionScreen = () => {
  const [sessions, setSessions] = useState([]);

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

  const startSessionNow = async (session) => {
    try {
      await AsyncStorage.setItem("upcomingSession", JSON.stringify(session));
      Alert.alert("Success", "Session started successfully.");
    } catch (error) {
      Alert.alert("Error", error.message || "An error occurred.");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View
          style={{
            height: height * 0.05,
            maxHeight: "20%",
            backgroundColor: "white",
            zIndex: 5,
          }}
        >
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              height: height * 0.05,
              maxHeight: "100%",
              backgroundColor: "black",
     
              zIndex: 10,
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
            backgroundColor: "black",
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
              borderColor: "blue",
            }}
          >
            {sessions.length === 0 ? (
              <Text style={{ fontSize: 18, color: "grey" }}>
                No sessions found.
              </Text>
            ) : (
              sessions.map((session, index) => (
                <View key={index} style={styles.sessionCard}>
                  <Text style={styles.sessionTitle}>{session.subject}</Text>
                  <Text style={styles.sessionDetails}>
                    Start Time: {new Date(session.start_time).toLocaleTimeString()}
                  </Text>
                  <Text style={styles.sessionDetails}>
                    End Time: {new Date(session.end_time).toLocaleTimeString()}
                  </Text>
                  <Text style={styles.sessionDetails}>
                    Technique: {session.technique}
                  </Text>
                  <Text style={styles.sessionDetails}>
                    Status: {session.status}
                  </Text>
                  <TouchableOpacity
                    style={styles.startButton}
                    onPress={() => startSessionNow(session)}
                  >
                    <Text style={styles.startButtonText}>Start Now</Text>
                  </TouchableOpacity>
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
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: "blue",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    borderWidth: 1,
    borderColor: "#b3d9ff",
  },
  sessionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  sessionDetails: {
    fontSize: 16,
    color: "black",
    fontWeight: "300",

  },
  startButton: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  startButtonText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
  },
});

export default SessionScreen;
