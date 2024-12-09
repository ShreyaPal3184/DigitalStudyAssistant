import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { addTask } from "../services/taskService";

const AddTaskScreen = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigation = useNavigation();

  const handleAddTask = async () => {
    if (!title || !description) return;
    try {
      const taskData = {
        title,
        description,
        due_date: new Date().toISOString(),
        priority: "Normal",
      };
      await addTask(taskData);
      navigation.goBack(); // Navigate back to HomeScreen
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add New Task</Text>
      <TextInput
        style={styles.input}
        placeholder="Task Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Task Description"
        value={description}
        onChangeText={setDescription}
      />
      <TouchableOpacity style={styles.addButton} onPress={handleAddTask}>
        <Text style={styles.addButtonText}>Add Task</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  input: {
    height: 40,
    borderColor: "#ddd",
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 5,
  },
  addButton: {
    backgroundColor: "#4F8EF7",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  addButtonText: { color: "#fff", fontSize: 16 },
});

export default AddTaskScreen;
