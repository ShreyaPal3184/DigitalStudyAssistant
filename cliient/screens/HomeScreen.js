import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  FlatList,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { getTasks } from "../services/taskService"; // Import task fetching API

const { width } = Dimensions.get("window");

const HomeScreen = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const userName = "Prithvi"; // Replace with dynamic user data
  const streakDays = 7; // Example streak value
  const navigation = useNavigation();

  // Fetch tasks from the backend
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        const fetchedTasks = await getTasks();
        setTasks(fetchedTasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  // Navigate to Timer screen
  const handleStartStudying = () => {
    navigation.navigate("Timer");
  };

  // Navigate to AddTask screen
  const handleAddTask = () => {
    navigation.navigate("AddTask");
  };

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
        <Text style={styles.streakText}>🔥 Study Streak: {streakDays} days</Text>
      </View>

      {/* Task Bar */}
      <View style={styles.taskBar}>
        <View style={styles.taskHeader}>
          <Text style={styles.taskTitle}>Tasks</Text>
          <TouchableOpacity onPress={handleAddTask}>
            <Icon name="plus-circle" size={28} color="#4F8EF7" />
          </TouchableOpacity>
        </View>
        {loading ? (
          <Text>Loading tasks...</Text>
        ) : (
          <FlatList
            data={tasks}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.taskItem}>
                <Icon name="note-outline" size={24} color="#4F8EF7" />
                <Text style={styles.taskText}>{item.title}</Text>
              </View>
            )}
          />
        )}
      </View>

      {/* Start Studying Button */}
      <TouchableOpacity style={styles.startButton} onPress={handleStartStudying}>
        <Text style={styles.startButtonText}>Start Studying</Text>
      </TouchableOpacity>
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
    width: 250,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    marginTop: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 25,
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
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    marginBottom: 20,
  },
  taskHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  taskTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#4F8EF7",
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
  startButton: {
    backgroundColor: "#4F8EF7",
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
    width: "90%",
    alignSelf: "center",
  },
  startButtonText: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
    fontWeight: "bold",
  },
}); 

export default HomeScreen;
