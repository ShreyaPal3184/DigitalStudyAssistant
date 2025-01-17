import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
  Switch,
  TextInput,
  Alert,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Icon from "react-native-vector-icons/Entypo";
import { Dropdown } from "react-native-element-dropdown";
import AntDesign from "@expo/vector-icons/AntDesign";
import DateTimePicker from "@react-native-community/datetimepicker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SESSION_API_END_POINT } from "../utils/constant";
import colors from "../styles/colors";

const { width, height } = Dimensions.get("window");

const StudySessionScreen = () => {
  const [sessionTitle, setSessionTitle] = useState("");
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);
  const [sessionStatus, setSessionStatus] = useState("Medium");

  const data = [
    { label: "POMODORO", value: "1" },
    { label: "FEYMAN", value: "2" },
    { label: "ACTIVE RECALL", value: "3" },
  ];

  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState("");
  const [value, setValue] = useState(null);
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  const [pomodoroTimers, setPomodoroTimers] = useState({
    studyTime: "",
    shortBreak: "",
    longBreak: "",
  });

  const addTask = () => {
    if (taskInput.trim() !== "") {
      setTasks((prevTasks) => [...prevTasks, taskInput]);
      setTaskInput("");
    }
  };

  const deleteTask = (taskIndex) => {
    setTasks((prevTasks) =>
      prevTasks.filter((_, index) => index !== taskIndex)
    );
  }; 

  const addSession = async () => {
    if (sessionTitle.trim() === "") {
      alert("Please enter a session title.");
      return;
    }

    if (startTime >= endTime) {
      alert("Start time must be less than end time.");
      return;
    }

    try {
      const token = await AsyncStorage.getItem("userToken");
      const response = await fetch(`${SESSION_API_END_POINT}/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          subject: sessionTitle,
          start_time: startTime,
          end_time: endTime,
          reminders: isEnabled,
          status: sessionStatus,
          technique: value, // Include the selected technique
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
        Alert.alert("Success", "Session created successfully.");
      } else {
        Alert.alert("Error", responseData.message || "Failed to create session.");
      }
    } catch (error) {
      Alert.alert("Error", error.message || "An error occurred.");
    }
  };

  const handleStartTimeChange = (event, selectedDate) => {
    const currentDate = selectedDate || startTime;
    setShowStartTimePicker(false);
    setStartTime(currentDate);
  };

  const handleEndTimeChange = (event, selectedDate) => {
    const currentDate = selectedDate || endTime;
    setShowEndTimePicker(false);
    setEndTime(currentDate);
  };

  return (
    <SafeAreaView style={styles.outerContainer}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.content}>
          <View style={{ paddingBottom: 30 }}>
            <Text style={{ fontSize: 50, fontWeight: "300" }}>New Session</Text>
          </View>
          <Image source={require('../assets/sessionphoto.jpg')} style={{height: height*0.3, width: width*0.9}}/>
          <View>
            <View style={{ padding: 10, paddingLeft: 0 }}>
              <Text style={{ fontSize: 16, fontWeight: "bold", color: "grey" }}>
                NAME:{" "}
              </Text>
            </View>
            <View style={{ ...styles.boxShadow }}>
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
                  fontWeight: "400",
                  ...styles.boxShadow,
                }}
                placeholder="Add Session name..."
                placeholderTextColor="#aaa"
                value={sessionTitle}
                onChangeText={setSessionTitle}
              />
            </View>
          </View>

          {/* Set start time and end time */}
          <View
            style={{ flexDirection: "row", justifyContent: "space-around", padding: 1 }}
          >
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <View style={{ padding: 10, paddingLeft: 0 }}>
                <Text
                  style={{ fontSize: 16, fontWeight: "bold", color: "grey" }}
                >
                  START TIME:{" "}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => setShowStartTimePicker(true)}
                style={{
                  backgroundColor: "white",
                  borderRadius: 10,
                  padding: 20,
                  borderWidth: 1,
                  borderBottomWidth: 0,
                  borderColor: "#b3d9ff",
                  ...styles.boxShadow,
                }}
              >
                <Text style={{ fontSize: 20, color: "black" }}>
                  {startTime.toLocaleTimeString()}
                </Text>
              </TouchableOpacity>
              {showStartTimePicker && (
                <DateTimePicker
                  value={startTime}
                  mode="time"
                  display="default"
                  onChange={handleStartTimeChange}
                />
              )}
            </View>

            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <View style={{ padding: 10, paddingLeft: 0 }}>
                <Text
                  style={{ fontSize: 16, fontWeight: "bold", color: "grey" }}
                >
                  END TIME:{" "}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => setShowEndTimePicker(true)}
                style={{
                  backgroundColor: "white",
                  borderRadius: 10,
                  padding: 20,
                  borderWidth: 1,
                  borderColor: "#b3d9ff",
                  ...styles.boxShadow,
                }}
              >
                <Text style={{ fontSize: 20, color: "black" }}>
                  {endTime.toLocaleTimeString()}
                </Text>
              </TouchableOpacity>
              {showEndTimePicker && (
                <DateTimePicker
                  value={endTime}
                  mode="time"
                  display="default"
                  onChange={handleEndTimeChange}
                />
              )}
            </View>
          </View>

          

          <View
            style={{
              marginVertical: 10,
              width: "90%",
              alignSelf: "center",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{
                fontSize: 14,
                color: colors.text,
                flex: 1,
                marginRight: 10,
              }}
            >
              Receive notifications about this Session
            </Text>
            <Switch
              trackColor={{ false: "#ccc", true: colors.primary }}
              thumbColor={isEnabled ? colors.secondary : "#f4f3f4"}
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </View>

          {/* Set Session */}
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 80,
            }}
          >
            <View
              style={{
                marginTop: 10,
                backgroundColor: "white",
                height: 50,
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
              }}
            >
              <TouchableOpacity style={{}} onPress={addSession}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "bold",
                    textAlign: "center",
                    color: "black",
                  }}
                >
                  Add Session
                </Text>
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
    backgroundColor: "white", // Fixed background color
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  content: {
    backgroundColor: "white", // Fixed background color
    flex: 1,
    padding: 20,
  },
  header: {
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
  tasksContainer: {
    width: "100%",
    height: height * 0.3,
    padding: 10,
    backgroundColor: "white",
    borderRadius: 15,
    borderWidth: 1,
    borderTopWidth: 0,
    borderBottomWidth: 0,
    borderColor: '#b3d9ff',
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
    width: "7%",
    color: "white",
    alignItems: "end",
  },
  taskItem: {
    fontSize: 16,
    marginVertical: 5,
  },
  dropdown: {
    margin: 16,
    height: 50,
    padding: 10,
    width: "90%",
    borderBottomColor: "gray",
    borderBottomWidth: 0.5,
    backgroundColor: "pink",
    borderRadius: 15,
    shadowColor: "#333333",
    shadowOffset: {
      width: 6,
      height: 6,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 10,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
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

export default StudySessionScreen;
