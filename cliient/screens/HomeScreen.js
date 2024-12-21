import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Dimensions,
  ScrollView, // Import ScrollView
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

  useEffect(() => {}, []);

  // Handle navigation
  const handleStartStudying = () => {
    navigation.navigate("Timer");
  };

  const handleAddTask = () => {
    navigation.navigate("AddTask");
  };

  const handleCreateSession = () => {
    navigation.navigate("CreateSession");
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

        {/* Digital Tracker Section */}
        <View style={styles.digitalTracker}>
          <Text style={styles.trackerTitle}>📊 Digital Tracker</Text>
          <View style={styles.trackerContent}>
            <Text style={styles.trackerText}>Logged-in Days: 15</Text>
            <Text style={styles.trackerText}>Avg Task Completion: 85%</Text>
            <Text style={styles.trackerText}>Total Study Sessions: 22</Text>
          </View>
        </View>

        {/* Tasks Section
        <View style={styles.taskBar}>
          <View style={styles.taskHeader}>
            <Text style={styles.taskTitle}>Tasks</Text>
            <TouchableOpacity onPress={handleAddTask}>
              <Icon name="plus-circle" size={28} color="#4F8EF7" />
            </TouchableOpacity>
          </View>
          {loadingTasks ? (
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

        {/* Active Sessions Section *
        <View style={styles.sessionBar}>
          <View style={styles.sessionHeader}>
            <Text style={styles.sessionTitle}>Active Sessions</Text>
            <TouchableOpacity
              onPress={handleLogout}
              style={styles.logoutButton}
            >
              <Icon name="logout" size={30} color="#fff" />
            </TouchableOpacity>
          </View>
          {loadingSessions ? (
            <Text>Loading sessions...</Text>
          ) : (
            <FlatList
              data={sessions}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.sessionItem}
                  onPress={() => handleViewSessionDetails(item.id)}
                >
                  <Text style={styles.sessionText}>
                    {item.subject} - {item.status}
                  </Text>
                  <Text style={styles.sessionText}>
                    {item.start_time} - {item.end_time}
                  </Text>
                </TouchableOpacity>
              )}
            />
          )}
        </View> */}

        <View style={styles.sessionConatiner}></View>

        {/* Start Studying Button */}
        <TouchableOpacity
          style={styles.startButton}
          onPress={handleStartStudying}
        >
          <Text style={styles.startButtonText}>Start Studying</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FDCEA5",
    padding: width * 0.01, // 5% padding for responsiveness
    // margin: width * 0.009, // Adjust margin for different screen sizes
    justifyContent: "space-between",
  },
  scrollContent: {
    paddingBottom: 20, // To ensure there is some space at the bottom when scrolling
  },
  
  outerHeader:{
    padding: 10,
    backgroundColor: 'lightyellow',
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    marginBottom: 10,
    // left: 20,
    ri: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    marginTop: 30,
    width: "100%",
    backgroundColor: '',
    borderRadius: 25,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  menu: {
    marginLeft: 10, // Adjust margin as needed
    backgroundColor: "#bbb",
    zIndex: 10,
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

  // taskBar: {
  //   backgroundColor: "#f9f9f9",
  //   padding: 15,
  //   borderRadius: 25,
  //   elevation: 2,
  //   shadowColor: "#000",
  //   shadowOffset: {
  //     width: -5,
  //     height: -5, // Create inward shadow
  //   },
  //   shadowOpacity: 0.1,
  //   shadowRadius: 10,
  //   elevation: 5,
  //   borderWidth: 2,
  //   borderColor: "#E0E0E0", // Border to enhance "carved" effect
  //   marginBottom: 20,
  //   height: height * 0.2, // Dynamic height for responsiveness
  // },
  // taskHeader: {
  //   flexDirection: "row",
  //   justifyContent: "space-between",
  //   alignItems: "center",
  //   marginBottom: 10,
  // },
  // taskTitle: {
  //   fontSize: 20,
  //   fontWeight: "bold",
  //   color: "#4F8EF7",
  // },
  // taskItem: {
  //   flexDirection: "row",
  //   alignItems: "center",
  //   paddingVertical: 10,
  //   borderBottomWidth: 1,
  //   borderBottomColor: "#ddd",
  // },
  // taskText: {
  //   fontSize: 16,
  //   marginLeft: 10,
  //   color: "#333",
  // },
  // sessionBar: {
  //   backgroundColor: "#f9f9f9",
  //   padding: 15,
  //   borderRadius: 25,
  //   elevation: 2,
  //   shadowColor: "#000",
  //   shadowOpacity: 0.1,
  //   shadowOffset: { width: -2, height: -2 },
  //   shadowRadius: 5,
  //   marginBottom: 10,
  //   height: height * 0.2, // Dynamic height for responsiveness,
  //   shadowColor: "75FDF0",
  //   shadowOffset: {
  //     width: 0,
  //     height: 10,
  //   },
  //   shadowOpacity: 0.25,
  //   shadowRadius: 3.5,
  //   elevation: 5,
  // },
  // sessionHeader: {
  //   flexDirection: "row",
  //   justifyContent: "space-between",
  //   alignItems: "center",
  //   marginBottom: 10,
  // },
  // sessionTitle: {
  //   fontSize: 20,
  //   fontWeight: "bold",
  //   color: "#4F8EF7",
  // },
  // sessionItem: {
  //   backgroundColor: "#f0f0f0",
  //   padding: 15,
  //   marginBottom: 10,
  //   borderRadius: 8,
  // },
  // sessionText: {
  //   fontSize: 16,
  //   color: "#333",
  // },

  sessionConatiner: {},

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
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
    fontWeight: "bold",
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
