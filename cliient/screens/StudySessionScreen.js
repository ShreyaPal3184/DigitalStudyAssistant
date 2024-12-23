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
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Icon from "react-native-vector-icons/Entypo";
import Carousel from "react-native-reanimated-carousel";
import { Dropdown } from "react-native-element-dropdown";
import AntDesign from "@expo/vector-icons/AntDesign";
import NotificationCheckbox from "../components/NotificationCheckbox";
import colors from "../styles/colors";

const StudySessionScreen = () => {
  const width = 600;
  const images = [
    require("../assets/carouselImages/image1.png"),
    require("../assets/carouselImages/image2.png"),
    require("../assets/carouselImages/image3.jpg"),
  ];

  const data = [
    { label: "POMODORO", value: "1" },
    { label: "FEYMAN", value: "2" },
    { label: "ACTIVE RECALL", value: "3" },
  ];

  const [tasks, setTasks] = useState([]);
  const [value, setValue] = useState(null);
  // const [notifications, setNotifications] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  const [pomodoroTimers, setPomodoroTimers] = useState({
    studyTime: "",
    shortBreak: "",
    longBreak: "",
  });

  const [studyyTime, setStudyTime] = useState({
    timeInHours: "",
    timeInMin: "",
  });

  const addTask = () => {
    setTasks((prevTasks) => [...prevTasks, "New Taskksksk"]);
  };

  const deleteTask = (taskIndex) => {
    setTasks((prevTasks) =>
      prevTasks.filter((_, index) => index !== taskIndex)
    );
  };

  const addSession = () => {
    console.log("seession added");
  };
  return (
    <SafeAreaView style={styles.outerContainer}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.content}>
          {/* Header
          <View style={styles.header}>
            <Text style={styles.headerText}>Start a Session:</Text>
          </View> */}

          {/* Session Time */}
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
            <Text style={{ textAlign: "center", fontSize: 16 }}>Set Time</Text>
          </View>
          <View
            style={{
              marginTop: 15,
              justifyContent: "space-",
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "#FFDAB9",
              borderRadius: 15,
              ...styles.boxShadow,
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
                <Text style={{ fontSize: 15, fontWeight: "bold" }}>HOURS</Text>
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
                  placeholder="  01"
                  placeholderTextColor="lightgrey"
                  keyboardType="numeric"
                  value={studyyTime.timeInHours}
                  onChangeText={(text) =>
                    setStudyTime({ ...studyyTime, timeInHours: text })
                  }
                />
              </View>

              <View style={{ flexDirection: "column" }}>
                <Text style={{ fontSize: 15, fontWeight: "bold" }}>MINUTE</Text>
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
                  placeholder="  00"
                  placeholderTextColor="lightgrey"
                  value={studyyTime.timeInMin}
                  onChangeText={(text) =>
                    setPomodoroTimers({ ...studyyTime, timeInMin: text })
                  }
                />
              </View>
            </View>
          </View>

          {/* Tasks */}
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
            <Text style={{ textAlign: "center", fontSize: 16 }}>Tasks</Text>
          </View>

          <View style={styles.tasksContainer}>
            <ScrollView>
              {tasks.map((task, index) => (
                <View
                  key={index}
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    backgroundColor: "pink",
                    padding: 7,
                    marginBottom: 7,
                    borderRadius: 10,
                    shadowColor: "red",
                    shadowOffset: {
                      width: 6,
                      height: 6,
                    },
                    shadowOpacity: 0.5,
                    shadowRadius: 14,
                    elevation: 5,
                  }}
                >
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Icon name="circle" size={10} color="#000" />
                    <Text style={{ fontSize: 18, marginLeft: 8 }}>{task}</Text>
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
                flexDirection: "column",
                // justifyContent: "end",
                alignItems: "flex-end",
                marginTop: 10,
              }}
            >
              <TouchableOpacity style={styles.addTaskButton} onPress={addTask}>
                <Image
                  style={{
                    height: 25,
                    width: 25,
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
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                marginTop: 15,
              }}
            >
              <Carousel
                loop
                width={width}
                height={width / 2}
                autoPlay={false}
                data={images}
                scrollAnimationDuration={3000}
                renderItem={({ item }) => (
                  <View
                    style={{
                      flex: 1,
                      borderWidth: 0,
                      borderColor: "#FDCEA5",
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: "#FDCEA5",
                    }}
                  >
                    <Image
                      source={item}
                      style={{
                        width: 350,
                        height: 300,
                        resizeMode: "cover",
                        borderRadius: 0,
                      }}
                    />
                  </View>
                )}
              />
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
                backgroundColor: "#FFDAB9",
                borderWidth: 1,
                borderColor: 'yellow'
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
                backgroundColor: "#FF00FF",
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
                  }}
                >
                  Add Session
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* <View style={{height: 70}}>
            <View></View>
          </View> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: "#FDCEA5", // Fixed background color
  },
  scrollViewContent: {
    flexGrow: 1,
    padding: 10, // Added padding inside the ScrollView
  },
  content: {
    backgroundColor: "#FDCEA5", // Fixed background color
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
  tasksContainer: {
    width: "100%",
    minHeight: 200,
    maxHeight: 300,
    padding: 10,
    marginTop: 15,
    backgroundColor: "#FFDAB9",
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
