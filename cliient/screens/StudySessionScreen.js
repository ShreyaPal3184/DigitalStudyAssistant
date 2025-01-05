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

      const responseData = await response.json();
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
                  fontWeight: "900",
                  ...styles.boxShadow,
                }}
                placeholder="Add Session name..."
                placeholderTextColor="#aaa"
                value={sessionTitle}
                onChangeText={setSessionTitle}
              />
            </View>
          </View>

          {/* Session Time */}
          <View
            style={{
              flexDirection: "row",
              padding: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                width: width * 0.3,
                height: 1,
                backgroundColor: "#000",
                alignSelf: "center",
              }}
            />
            <View>
              <Text style={{ textAlign: "center", fontSize: 24, padding: 10 }}>
                Set Time
              </Text>
            </View>
            <View
              style={{
                width: width * 0.3,
                height: 1,
                backgroundColor: "#000",
                alignSelf: "center",
              }}
            />
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
                  borderTopWidth: 0,
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
              width: width * 0.6,
              height: 0.51,
              backgroundColor: "#000",
              alignSelf: "center",
              marginTop: 50,
            }}
          />

          {/* To do list */}
          <View style={{ paddingTop: 20, paddingLeft: 10 }}>
            <View style={{ padding: 10, paddingLeft: 0 }}>
              <Text style={{ fontSize: 16, fontWeight: "bold", color: "grey" }}>
                TO DO LIST
              </Text>
            </View>
          </View>

          <View style={styles.tasksContainer}>
            <ScrollView>
              {tasks.map((task, index) => (
                <View
                  key={index}
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    backgroundColor: "white",
                    padding: 7,
                    marginBottom: 7,
                    borderRadius: 10,
                  }}
                >
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Icon name="circle" size={10} color="#000" />
                    <Text style={{ fontSize: 18, marginLeft: 8, marginRight: 20 }}>
                      {task}
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={{ marginTop: 2 }}
                    onPress={() => deleteTask(index)}
                  >
                    <MaterialCommunityIcons
                      name="trash-can"
                      size={18}
                      color="grey"
                    />
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>

            <View
              style={{
                flexDirection: "row",
                alignItems: "flex-end",
                marginTop: 10,
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <TextInput
                style={{
                  height: 50,
                  width: "89%",
                  padding: 10,
                  borderRadius: 10,
                  backgroundColor: "#f5f5f5",
                  borderColor: "#b3d9ff",
                  borderWidth: 1,
                  flexWrap: "wrap",
                }}
                placeholder="Add a task"
                placeholderTextColor="#aaa"
                value={taskInput}
                onChangeText={setTaskInput}
                textAlignVertical="center"
              />
              <TouchableOpacity style={styles.addTaskButton} onPress={addTask}>
                <Image
                  style={{
                    height: 30,
                    width: 30,
                    marginTop: 0,
                    shadowColor: "red",
                    borderRadius: 10,
                    shadowOffset: {
                      width: 6,
                      height: 6,
                    },
                    shadowOpacity: 1,
                    shadowRadius: 9,
                    elevation: 10,
                  }}
                  source={require("../assets/add.png")}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Technique */}
          <View style={{ marginBottom: 15 }}>
            <View
              style={{
                width: "100%",
                backgroundColor: "pink",
                borderRadius: 15,
                height: 55,
                justifyContent: "center",
                marginTop: 15,
                shadowColor: "black",
                shadowOffset: {
                  width: 6,
                  height: 6,
                },
                shadowOpacity: 0.5,
                shadowRadius: 4,
                elevation: 10,
              }}
            >
              <Text style={{ textAlign: "center", fontSize: 16 }}>
                Techniques
              </Text>
            </View>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={data}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder="Select Technique"
                searchPlaceholder="Search..."
                value={value}
                onChange={(item) => {
                  setValue(item.value);
                }}
                renderLeftIcon={() => (
                  <AntDesign
                    style={styles.icon}
                    color="black"
                    name="Safety"
                    size={20}
                  />
                )}
              />
            </View>
          </View>

          {value === "1" && (
            <View
              style={{
                justifyContent: "space-",
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: "#b3d9ff",
                borderRadius: 15,
                borderWidth: 1,
                borderColor: "yellow",
              }}
            >
              <View
                style={{
                  padding: 20,
                  justifyContent: "center",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    flexDirection: "column",
                    margin: 20,
                    shadowColor: "#333333",
                    shadowOffset: {
                      width: 6,
                      height: 6,
                    },
                    shadowOpacity: 0.5,
                    shadowRadius: 4,
                    elevation: 10,
                  }}
                >
                  <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                    Study Time {"\n"} (mins)
                  </Text>
                  <TextInput
                    style={{
                      width: 80,
                      backgroundColor: "#f4f4f4",
                      margin: 5,
                      borderRadius: 8,
                      height: 70,
                      fontSize: 40,
                      fontWeight: "bold",
                    }}
                    placeholder=" 25"
                    placeholderTextColor="lightgrey"
                    keyboardType="numeric"
                    value={pomodoroTimers.studyTime}
                    onChangeText={(text) =>
                      setPomodoroTimers({ ...pomodoroTimers, studyTime: text })
                    }
                  />
                </View>

                <View style={{ flexDirection: "column" }}>
                  <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                    Short Break Time {"\n"} (mins)
                  </Text>
                  <TextInput
                    style={{
                      width: 80,
                      backgroundColor: "#f4f4f4",
                      margin: 5,
                      borderRadius: 8,
                      height: 70,
                      fontSize: 40,
                      fontWeight: "bold",
                    }}
                    keyboardType="numeric"
                    placeholder="05"
                    placeholderTextColor="lightgrey"
                    value={pomodoroTimers.shortBreak}
                    onChangeText={(text) =>
                      setPomodoroTimers({ ...pomodoroTimers, shortBreak: text })
                    }
                  />
                </View>

                <View style={{ flexDirection: "column" }}>
                  <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                    Long Break Time {"\n"} (mins)
                  </Text>
                  <TextInput
                    style={{
                      width: 80,
                      backgroundColor: "#f4f4f4",
                      margin: 5,
                      borderRadius: 8,
                      height: 70,
                      fontSize: 40,
                      fontWeight: "bold",
                    }}
                    placeholder="15"
                    placeholderTextColor="lightgrey"
                    keyboardType="numeric"
                    value={pomodoroTimers.longBreak}
                    onChangeText={(text) =>
                      setPomodoroTimers({ ...pomodoroTimers, longBreak: text })
                    }
                  />
                </View>
              </View>
            </View>
          )}

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
    shadowColor: "blue",
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
