import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get("window");

const HomeScreen = () => {
  const userName = "Prithvi"; // Replace with dynamic user data if needed
  const streakDays = 7; // Example streak value

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <LinearGradient
          colors={["#E1306C", "#F77737", "#FDCB5D", "#8A3AB9", "#4C68D7"]}
          style={styles.gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Text style={styles.welcomeText}>Welcome, {userName}!</Text>
        </LinearGradient>
        <TouchableOpacity style={styles.avatarButton}>
          <Icon name="account-circle" size={40} color="#4F8EF7" />
        </TouchableOpacity>
      </View>

      {/* Study Streak Bar */}
      <View style={styles.streakBar}>
        <Text style={styles.streakText}>
          🔥 Study Streak: {streakDays} days
        </Text>
      </View>

      {/* Task Bar */}
      <View style={styles.taskBar}>
        <Text style={styles.taskTitle}>Tasks</Text>
        <TouchableOpacity style={styles.taskItem}>
          <Icon name="note-outline" size={24} color="#4F8EF7" />
          <Text style={styles.taskText}>Complete Science Notes</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.taskItem}>
          <Icon name="check-circle-outline" size={24} color="#4F8EF7" />
          <Text style={styles.taskText}>Finish History Assignment</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.taskItem}>
          <Icon name="checkbox-multiple-outline" size={24} color="#4F8EF7" />
          <Text style={styles.taskText}>Prepare for Math Quiz</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    margin: 5,
  },
  gradient: {
    width: 300,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#0B1215",
  },
  avatarButton: {
    padding: 5,
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
  },
  streakBar: {
    backgroundColor: "#FFD700",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  streakText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    textAlign: "center",
  },
  taskBar: {
    backgroundColor: "#f9f9f9",
    padding: 15,
    borderRadius: 10,
    elevation: 2, // For Android shadow
    shadowColor: "#000", // For iOS shadow
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
  },
  taskTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#4F8EF7",
    marginBottom: 10,
  },
  taskItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  taskText: {
    fontSize: 16,
    marginLeft: 10,
    color: "#333",
  },
});

export default HomeScreen;
