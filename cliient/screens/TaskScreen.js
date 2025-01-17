import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Dimensions,
  Image,
} from "react-native";
import { TASK_API_END_POINT } from "../utils/constant";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width, height } = Dimensions.get("window");

const TaskScreen = () => {
  const [token, setToken] = useState("");
  const [taskTitle, setTaskTitle] = useState("");
  const [tasks, setTasks] = useState([]);
  const [taskDescription, setTaskDescription] = useState("");
  const [taskPriority, setTaskPriority] = useState("Medium");
  const [taskDueDate, setTaskDueDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

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

  useEffect(() => {
    if (token) {
      fetchTasks();
    }
  }, [token]);

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || taskDueDate;
    setShowDatePicker(false);
    setTaskDueDate(currentDate);
  };

  const fetchTasks = async () => {
    try {
      const response = await fetch(`${TASK_API_END_POINT}/user`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

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
          Authorization: `Bearer ${token}`,
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
        console.error("Unexpected response format:", responseData);
        return;
      }

      if (response.ok) {
        fetchTasks();
        setTaskTitle("");
        setTaskDescription("");
        setTaskPriority("Medium");
        setTaskDueDate(new Date());
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
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        fetchTasks();
        alert("Task deleted successfully!");
      } else {
        const responseData = await response.text();
        console.error("Failed to delete task:", responseData);
        alert("There was an error deleting the task. Please try again.");
      }
    } catch (error) {
      console.error("Error deleting task:", error);
      alert(
        "There was an error deleting the task. Please check your network connection."
      );
    }
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
          <View style={{}}>
            <Text style={{ fontSize: 50, fontWeight: "300" }}>New Task</Text>
          </View>

          <Image
            source={require("../assets/taskimagee.jpg")}
            style={{ height: height * 0.4, width: width * 0.9 }}
          />

          {/* Task Title */}
          <View>
            <View style={{ padding: 10, paddingLeft: 0 }}>
              <Text style={{ fontSize: 16, fontWeight: "bold", color: "grey" }}>
                TITLE:{" "}
              </Text>
            </View>
            <View>
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
                  borderColor: "#FAD5A5",
                  borderTopWidth: 0,
                  fontSize: 20,
                  fontWeight: "400",
                  ...styles.boxShadow,
                }}
                placeholder="Add task title..."
                placeholderTextColor="#aaa"
                value={taskTitle}
                onChangeText={setTaskTitle}
              />
            </View>
          </View>

          {/* Task Description */}
          <View>
            <View style={{ padding: 10, paddingLeft: 0 }}>
              <Text style={{ fontSize: 16, fontWeight: "bold", color: "grey" }}>
                DESCRIPTION{" "}
              </Text>
            </View>
            <View style={{ ...styles.addTaskDesc }}>
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
          <View>
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
            <View
              style={{
                ...styles.boxShadow,
                ...styles.addTaskDueDate,
              }}
            >
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
              backgroundColor: "white",
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

          <View style={{ marginBottom: 20 }} />

          {/* User Tasks */}
          <Text style={styles.taskLabel}>Your Tasks:</Text>
          <ScrollView
            style={styles.userTasks}
            contentContainerStyle={{ flexGrow: 1 }}
            nestedScrollEnabled={true}
          >
            <View>
              {tasks.length === 0 ? (
                <Text style={{ fontSize: 18, color: "grey" }}>
                  No tasks found.
                </Text>
              ) : (
                tasks.map((task, index) => (
                  <View key={index} style={styles.taskItem}>
                    <Text style={styles.taskTitle}>Title: {task.title}</Text>
                    <Text style={styles.taskDescription}>
                      Description: {task.description}
                    </Text>
                    <Text style={styles.taskDetails}>
                      Due Date: {new Date(task.due_date).toDateString()}
                    </Text>
                    <Text style={styles.taskDetails}>
                      Priority: {task.priority}
                    </Text>
                    <TouchableOpacity onPress={() => deleteTask(task.id)}>
                      <Text style={styles.deleteButton}>Delete</Text>
                    </TouchableOpacity>
                  </View>
                ))
              )}
            </View>
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
  },
  input: {
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: "#ffffff",
    color: "#333333",
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
    flexWrap: "wrap",
    height: 50,
    fontSize: 20,
    fontWeight: "400",
  },
  addTaskDesc: {
    flex: 1,
    backgroundColor: "#ffffff",
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderTopWidth: 0,
    borderColor: "#FAD5A5",
  },
  addTaskPriority: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#FAD5A5",
    borderRadius: 10,
    backgroundColor: "#ffffff",
  },
  addTaskDueDate: {
    marginBottom: 40,
    height: 50,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "#ffffff",
    borderWidth: 1,

    borderColor: "#FAD5A5",
  },
  userTasks: {
    backgroundColor: "#ffffff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 200,
    borderWidth: 1,
    borderColor: "#b3d9ff",
    height: height * 0.4,
  },
  taskLabel: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#007acc",
    marginBottom: 10,
  },
  taskItem: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#b3d9ff",
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  taskDescription: {
    fontSize: 14,
    color: "#333333",
  },
  taskDetails: {
    fontSize: 14,
    color: "#666666",
  },
  deleteButton: {
    fontSize: 14,
    color: "red",
    marginTop: 10,
  },
  boxShadow: {
    shadowColor: "black",
    shadowOffset: {
      width: 6,
      height: 6,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 10,
  },
});

export default TaskScreen;
