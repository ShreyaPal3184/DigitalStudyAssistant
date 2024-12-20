import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Button,
  Image,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Icon from "react-native-vector-icons/Entypo";

const StudySessionScreen = () => {
  const [tasks, setTasks] = useState([]);

  const addTask = () => {
    setTasks((prevTasks) => [...prevTasks, "New Taskksksk"]);
  };

  const deleteTask = (taskIndex) => {
    setTasks((prevTasks) =>
      prevTasks.filter((_, index) => index !== taskIndex)
    );
  };

  return (
    <SafeAreaView style={styles.outerContainer}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerText}>Start a Session:</Text>
          </View>

          {/* Session Time */}
          <View style={styles.sessionContainer}>
            <View style={styles.sessionHeader}>
              <Text style={styles.sessionHeaderText}>Set Time: </Text>
            </View>
          </View>

          {/* Tasks */}
          <View style={styles.tasksContainer}>
            <View style={styles.tasksHeader}>
              <Text style={styles.taskHeaderText}>Tasks: </Text>
              {/* <View style={styles.addTaskButton}>
                <Button
                  onPress={addTask}
                  title="Add"
                  color="#841584"
                  accessibilityLabel="Learn more about this purple button"
                />
              </View> */}
            </View>
            <View
              style={{
                marginBottom: 10,
                borderBottomColor: "black",
                borderBottomWidth: StyleSheet.hairlineWidth,
              }}
            />

            {tasks.map((task, index) => (
              <View
                key={index}
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View style={{flexDirection: 'row', alignItems:'center'}}>
                  <Icon name="circle" size={10} color="#000" />
                  <Text style={{ fontSize: 18, marginLeft:8, }}>{task}</Text>
                </View>
                <TouchableOpacity
                  style={{ marginTop: 2 }}
                  onPress={() => deleteTask(index)}
                >
                  <MaterialCommunityIcons
                    name="trash-can"
                    size={18}
                    color="black"
                  />
                </TouchableOpacity>
              </View>
            ))}

            <View
              style={{
                marginTop: 10,
                marginBlock: 5,
                borderBottomColor: "black",
                borderBottomWidth: StyleSheet.hairlineWidth,
              }}
            />
            <View
              style={{
                flexDirection: "column",
                justifyContent: "end",
                alignItems: "flex-end",
              }}
            >
              <TouchableOpacity style={styles.addTaskButton} onPress={addTask}>
                <Image
                  style={{ height: 25, width: 25 }}
                  source={require("../assets/add.png")}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: "#ffffff", // Fixed background color
  },
  scrollViewContent: {
    flexGrow: 1,
    padding: 10, // Added padding inside the ScrollView
  },
  content: {
    backgroundColor: "#ffffff", // Fixed background color
    flex: 1,
    padding: 10,
  },
  header: {
    // marginTop: 10,
    backgroundColor: "#bbb",
    height: 50,
    justifyContent: "center",
    marginBottom: 10,
  },
  headerText: {
    fontSize: 24,
    margin: 5,
    fontWeight: "bold",
  },
  sessionContainer: {
    width: "100%",
    backgroundColor: "white",
    padding: 10, // Added padding to the session container for spacing
    borderRadius: 15,

    justifyContent: "flex-start",
    alignItems: "left",
    shadowColor: "blue",
    shadowOffset: {
      width: 6,
      height: 6,
    },
    shadowOpacity: 1,
    shadowRadius: 9,
    elevation: 10,
    marginBottom: 10,
  },
  sessionHeader: {
    marginBottom: 10, // Spacing for better separation of elements
  },
  sessionHeaderText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  tasksContainer: {
    width: "100%",
    minHeight: 200,
    padding: 10,
    backgroundColor: "white",
    borderRadius: 15,
    shadowColor: "blue",
    shadowOffset: {
      width: 6,
      height: 6,
    },
    shadowOpacity: 1,
    shadowRadius: 9,
    elevation: 10,
  },
  tasksHeader: {
    flexDirection: "row",
    marginBottom: 10,
    justifyContent: "space-between",
  },
  taskHeaderText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  addTaskButton: {
    width: "10%",
    color: "white",
    borderRadius: 15,
    backgroundColor: "white",
    alignItems: "end",
  },
  taskItem: {
    fontSize: 16,
    marginVertical: 5,
  },
  boxShadow: {
    shadowColor: "#333333",
    shadowOffset: {
      width: 6,
      height: 6,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 10,
  },
});

export default StudySessionScreen;
