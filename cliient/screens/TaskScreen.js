import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Modal,
  Button,
  Dimensions,
} from "react-native";
import { useFonts } from "expo-font";
import { TASK_API_END_POINT } from "../utils/constant";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";

const { width, height } = Dimensions.get("window");

const TaskScreen = () => {

  const [token, setToken] = useState("");

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

  const [taskTitle, setTaskTitle] = useState("");

  const [tasks, setTasks] = useState([]);

  const [taskDescription, setTaskDescription] = useState("");

  const [taskPriority, setTaskPriority] = useState("Medium");

  const [taskDueDate, setTaskDueDate] = useState(new Date());

  const [randomQuote, setRandomQuote] = useState(
    "The secret of getting ahead is getting started."
  );

  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || taskDueDate;
    setShowDatePicker(false);
    setTaskDueDate(currentDate);
  };

  const fetchTasks = async () => {
    try {
      const response = await fetch(`${TASK_API_END_POINT}/get`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });
      const contentType = response.headers.get("content-type");
      let responseData;
      if (contentType && contentType.includes("application/json")) {
        responseData = await response.json();
      } else {
        responseData = await response.text();
      }
      console.log("Response status:", response.status); // Log the response status
      console.log("Response data:", responseData); // Log the response data for debugging

      if (response.ok) {
        setTasks(responseData);
      } else {
        console.error("Failed to fetch tasks:", responseData);
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const addTask = async () => {
    if (taskTitle.trim() === "") {
      alert("Task title cannot be empty!");
      return;
    }

    if (taskDescription.trim() === "") {
      alert("Task description cannot be empty!");
      return;
    }

    try {
      const response = await fetch(`${TASK_API_END_POINT}/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`, // Include the authorization token
        },
        body: JSON.stringify({
          title: taskTitle,
          description: taskDescription,
          due_date: taskDueDate,
          priority: taskPriority,
          completed: false,
        }),
      });

      const contentType = response.headers.get("content-type");
      let responseData;
      if (contentType && contentType.includes("application/json")) {
        responseData = await response.json();
      } else {
        responseData = await response.text();
      }
      console.log("Response data:", responseData); // Log the response data for debugging

      if (response.ok) {
        fetchTasks();
        setTaskTitle(""); // Reset task title
        setTaskDescription(""); // Reset task description
        setTaskPriority("Medium"); // Reset task priority
        setTaskDueDate(new Date()); // Reset task due date
        alert("Task added successfully!");
      } else {
        console.error("Failed to add task:", responseData);
        alert("There was an error adding the task. Please try again.");
      }
    } catch (error) {
      console.error("Error adding task:", error);
      alert(
        "There was an error adding the task. Please check your network connection."
      );
    }
  };

  const deleteTask = async (id) => {
    try {
      const response = await fetch(`${TASK_API_END_POINT}/delete/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        fetchTasks();
        alert("Task deleted successfully!");
      } else {
        console.error("Failed to delete task");
        alert("There was an error deleting the task. Please try again.");
      }
    } catch (error) {
      console.error("Error deleting task:", error);
      alert(
        "There was an error deleting the task. Please check your network connection."
      );
    }
  };

  // Sample motivational quotes
  const quotes = [
    "The secret of getting ahead is getting started.",
    "Don't watch the clock; do what it does. Keep going.",
    "The best way to get something done is to begin.",
    "Start where you are. Use what you have. Do what you can.",
  ];

  // Function to fetch a random quote
  const getRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setRandomQuote(quotes[randomIndex]);
  };

  return (
    <SafeAreaView style={{ backgroundColor: "white", flex: 1 }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
          backgroundColor: "white",
        }}
      >
        <View style={styles.container}>
          <View style={{ paddingBottom: 30 }}>
            <Text style={{ fontSize: 50, fontWeight: "bold" }}>New Task</Text>
          </View>

          {/* Task Ttile*/}
          <View style={{}}>
            <View style={{ padding: 10, paddingLeft: 0 }}>
              <Text style={{ fontSize: 16, fontWeight: "bold", color: "grey" }}>
                TITLE:{" "}
              </Text>
            </View>

            <View style={{}}>
              <TextInput
                style={{
                  backgroundColor: "white",
                  color: "black",
                  borderRadius: 10,
                  padding: 10,
                  fontSize: 16,
                  flex: 1,
                  marginBottom: 20,
                  height: 50,
                  borderWidth: 1,
                  borderColor: "#b3d9ff",
                  borderTopWidth: 0,
                  fontSize: 20,
                  fontWeight: "900",
                }}
                placeholder="Add task title..."
                placeholderTextColor="#aaa"
                value={taskTitle}
                onChangeText={setTaskTitle}
              />
            </View>
          </View>

          {/* Task Description */}
          <View >
            <View style={{ padding: 10, paddingLeft: 0 }}>
              <Text style={{ fontSize: 16, fontWeight: "bold", color: "grey" }}>
                DESCRIPTION{" "}
              </Text>
            </View>
            <View style={styles.addTaskDesc}>
              <TextInput
                style={styles.input}
                placeholder="Add task Description..."
                placeholderTextColor="#aaa"
                value={taskDescription}
                onChangeText={setTaskDescription}
                multiline={true}
                scrollEnabled={true}
                textAlignVertical="top"
              />
            </View>
          </View>

          {/* Task Priority */}
          <View >
            <View style={{ padding: 10, paddingLeft: 0 }}>
              <Text style={{ fontSize: 16, fontWeight: "bold", color: "grey" }}>
                Priority{" "}
              </Text>
            </View>
            <View style={styles.addTaskPriority}>
              <Picker
                selectedValue={taskPriority}
                onValueChange={(itemValue) => setTaskPriority(itemValue)}
              >
                <Picker.Item label="Low" value="Low" />
                <Picker.Item label="Medium" value="Medium" />
                <Picker.Item label="High" value="High" />
              </Picker>
            </View>
          </View>

          {/* Task Due Date */}

          <View>
            <View style={{ padding: 10, paddingLeft: 0 }}>
              <Text style={{ fontSize: 16, fontWeight: "bold", color: "grey" }}>
                Due Date
              </Text>
            </View>
            <View style={{borderWidth: 1, borderTopWidth: 0, borderColor: 'black', ...styles.addTaskDueDate}}>
              <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                <Text style={{ fontSize: 20, color: "black" }}>
                  {taskDueDate.toDateString()}
                </Text>
              </TouchableOpacity>
              {showDatePicker && (
                <DateTimePicker
                  value={taskDueDate}
                  onChange={handleDateChange}
                  mode="date"
                  display="calendar"
                />
              )}
            </View>
          </View>

          {/* Add Task Button */}
          <View
            style={{
              marginTop: 10,
              marginBottom: 40,
              backgroundColor: "pink",
              height: height * 0.06,
              borderRadius: 100,
              width: "80%",
              shadowColor: "red",
              shadowOffset: {
                width: 6,
                height: 6,
              },
              shadowOpacity: 1,
              shadowRadius: 9,
              elevation: 10,
              justifyContent: "center",
              alignSelf: "center",
            }}
          >
            <TouchableOpacity style={{}} onPress={addTask}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "bold",
                  textAlign: "center",
                  color: "black",
                }}
              >
                Add Task
              </Text>
            </TouchableOpacity>
          </View>

          {/* User Tasks */}
          <ScrollView style={styles.userTasks}>
            <Text style={styles.taskLabel}>Your Tasks:</Text>
            <Text style={styles.taskText}>
              {taskDescription || "No task added yet!"}
            </Text>
          </ScrollView>

          {/* Quotes about Tasks */}
          {/* <View style={styles.randmQuotes}>
            <Text style={styles.quoteText}>"{randomQuote}"</Text>
          </View>*/}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white", // Light cyan background
    padding: 20,
  },
  addTaskBar: {
    backgroundColor: "#e6f7ff",
  },
  input: {
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: "#ffffff", // White background for input
    color: "#333333", // Dark grey text color
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
    flexWrap: "wrap",
    height: 50,
    fontSize: 20,
    fontWeight: "900",
    borderWidth: 1,
    borderColor: "#b3d9ff", // Light blue border color
  },
  header: {
    backgroundColor: "#007acc", // Deep sky blue background for header
    alignItems: "center",
    borderRadius: 10,
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffffff", // White text color
  },
  emoji: {
    fontSize: 24,
    marginLeft: 10,
  },
  addTaskDesc: {
    flex: 1,
    backgroundColor: "#ffffff", // White background for description
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
    height: height * 0.2,
    borderWidth: 1,
    borderColor: "#b3d9ff", // Light blue border color
  },
  addTaskPriority: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#b3d9ff", // Light blue border color
    borderRadius: 10,
    backgroundColor: "#ffffff", // White background for picker
  },
  addTaskDueDate: {
    marginBottom: 40,
    height: 50,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "#ffffff", // White background for due date
    borderWidth: 1,
    borderColor: "#b3d9ff", // Light blue border color
  },
  userTasks: {
    flex: 1,
    backgroundColor: "#ffffff", // White background for user tasks
    padding: 15,
    borderRadius: 10,
    marginBottom: 200,
    height: height * 0.3,
    borderWidth: 1,
    borderColor: "#b3d9ff", // Light blue border color
  },
  taskLabel: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#007acc", // Deep sky blue text color
    marginBottom: 10,
  },
  taskText: {
    fontSize: 16,
    color: "#333333", // Dark grey text color
  },
  addTaskButton: {
    backgroundColor: "#007acc", // Deep sky blue background for button
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 16,
    color: "#ffffff", // White text color
    fontWeight: "bold",
  },
  randmQuotes: {
    justifyContent: "center",
    alignContent: "center",
    backgroundColor: "#ffffff", // White background for quotes
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    height: 250,
  },
  quoteText: {
    fontSize: 16,
    color: "#007acc", // Deep sky blue text color
    fontStyle: "italic",
    textAlign: "center",
    fontFamily: "PlaywriteCOGuides",
    marginBottom: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalView: {
    margin: 20,
    backgroundColor: "#ffffff", // White background for modal
    borderRadius: 20,
    padding: 35,
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
  modalText: {
    marginBottom: 15,
    textAlign: "left",
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
});

export default TaskScreen;
