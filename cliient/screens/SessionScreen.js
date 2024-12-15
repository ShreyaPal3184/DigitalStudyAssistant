import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Modal,
  Button,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import axios from "axios"; // Ensure axios is installed and imported
import { SESSION_API_END_POINT } from "../utils/constant";
import { token } from "../utils/constant";

const SessionScreen = () => {
  const [subject, setSubject] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [reminder, setReminder] = useState("");
  const [status, setStatus] = useState("");
  const [sessions, setSessions] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    // Fetch existing sessions when the component mounts
    const fetchSessions = async () => {
      try {
        const response = await axios.get(`${SESSION_API_END_POINT}/get`);
        setSessions(response.data);
      } catch (error) {
        console.error("Error fetching sessions:", error);
      }
    };

    fetchSessions();
  }, []);

  const handleAddSession = async () => {
    try {
      const newSession = {
        subject,
        start_time: startTime,
        end_time: endTime,
        reminders: reminder === "Yes" ? 1 : 0,
        status,
      };

      const response = await axios.post(`${SESSION_API_END_POINT}/add`, newSession, {
        headers: {
          Authorization: `Bearer ${token}`, // Add your authentication token
        },
      });

      setSessions([...sessions, response.data]);
      setSubject("");
      setStartTime("");
      setEndTime("");
      setReminder("");
      setStatus("");

    } catch (error) {
      console.error("Error adding session:", error);
    }
  };

  const handleDeleteSession = async (id) => {
    try {
      await axios.delete(`${SESSION_API_END_POINT}/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Add your authentication token
        },
      });
      setSessions(sessions.filter((session) => session.id !== id));
    } catch (error) {
      console.error("Error deleting session:", error);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView>
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerText}>Session Manager</Text>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <Text style={styles.emoji}>❓</Text>
            </TouchableOpacity>
          </View>

          {/* Add session details */}
          <View style={styles.sessionDetails}>
            <View style={styles.sessionItem}>
              <Text style={styles.sessionDetailsText}>Subject:</Text>
              <TextInput
                style={styles.inputText}
                placeholder="Enter subject"
                placeholderTextColor="#888"
                onChangeText={setSubject}
                value={subject}
              />
            </View>

            <View style={styles.sessionItem}>
              <Text style={styles.sessionDetailsText}>Start Time:</Text>
              <TextInput
                style={styles.inputText}
                placeholder="(YYYY/MM/DD HH:MM:SS)"
                placeholderTextColor="#888"
                onChangeText={setStartTime}
                value={startTime}
              />
            </View>

            <View style={styles.sessionItem}>
              <Text style={styles.sessionDetailsText}>End Time:</Text>
              <TextInput
                style={styles.inputText}
                placeholder="(YYYY/MM/DD HH:MM:SS)"
                placeholderTextColor="#888"
                onChangeText={setEndTime}
                value={endTime}
              />
            </View>

            <View style={styles.sessionItem}>
              <Text style={styles.sessionDetailsText}>Reminder:</Text>
              <Picker
                selectedValue={reminder}
                style={styles.picker}
                onValueChange={(itemValue) => setReminder(itemValue)}
              >
                <Picker.Item label="Yes" value="Yes" />
                <Picker.Item label="No" value="No" />
              </Picker>
            </View>

            <View style={styles.sessionItem}>
              <Text style={styles.sessionDetailsText}>Status:</Text>
              <Picker
                selectedValue={status}
                style={styles.picker}
                onValueChange={(itemValue) => setStatus(itemValue)}
              >
                <Picker.Item label="Completed" value="Completed" />
                <Picker.Item label="Active" value="Active" />
                <Picker.Item label="Pending" value="Pending" />
              </Picker>
            </View>

            <TouchableOpacity style={styles.addButton} onPress={handleAddSession}>
              <Text style={styles.addButtonText}>Add Session</Text>
            </TouchableOpacity>
          </View>

          {/* User Tasks */}
          <ScrollView style={styles.userTasks}>
            <Text style={styles.taskLabel}>Your sessions:</Text>
            {sessions.length === 0 ? (
              <Text style={styles.taskText}>No sessions added yet.</Text>
            ) : (
              sessions.map((session) => (
                <View key={session.id} style={styles.taskItem}>
                  <Text style={styles.taskText}>{session.subject}</Text>
                  <TouchableOpacity onPress={() => handleDeleteSession(session.id)}>
                    <Text style={styles.deleteButton}>Delete</Text>
                  </TouchableOpacity>
                </View>
              ))
            )}
          </ScrollView>
        </View>

        {/* Instructions Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>
                Welcome to the Session Screen {"\n"}
                {"\n"}
                Instructions: {"\n"}
                {"\n"}
                1. Select a subject. {"\n"}
                2. Enter start and end times. {"\n"}
                3. Choose a reminder option. {"\n"}
                4. Select the session status. {"\n"}
              </Text>
              <Button onPress={() => setModalVisible(false)} title="Close" />
            </View>
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    backgroundColor: "#555",
    alignItems: "center",
    borderRadius: 10,
    marginBottom: 15,
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headerText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  emoji: {
    fontSize: 20,
    marginLeft: 10,
  },
  sessionDetails: {
    flex: 1,
    justifyContent: "space-between",
    flexDirection: "column",
  },
  sessionItem: {
    marginBottom: 15,
  },
  sessionDetailsText: {
    fontStyle: "italic",
    fontSize: 18,
    color: "black",
    paddingBottom: 5,
  },
  inputText: {
    fontSize: 16,
    color: "#555",
    borderRadius: 10,
    padding: 10,
    backgroundColor: "white",
    borderColor: "#ccc",
    borderWidth: 1,
  },
  picker: {
    height: 50,
    width: "100%",
    backgroundColor: "white",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
  },
  userTasks: {
    flex: 1,
    backgroundColor: "#444",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    height: 200,
  },
  taskLabel: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#aaa",
    marginBottom: 10,
  },
  taskItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  taskText: {
    fontSize: 16,
    color: "#fff",
  },
  deleteButton: {
    fontSize: 16,
    color: "#ff0000",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
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
    textAlign: 'left',
  },
});

export default SessionScreen;