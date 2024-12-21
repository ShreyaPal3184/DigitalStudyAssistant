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
} from "react-native";
import { useFonts } from "expo-font";
import { TASK_API_END_POINT} from "../utils/constant";

const TaskScreen = () => {
  const [fontsLoaded] = useFonts({
    PlaywriteCOGuides: require("../assets/fonts/PlaywriteCOGuides-Regular.ttf"),
  });

  const [taskDescription, setTaskDescription] = useState("");
  const [randomQuote, setRandomQuote] = useState(
    "The secret of getting ahead is getting started."
  );
  const [modalVisible, setModalVisible] = useState(false);

  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }

  const fetchTasks = async () => {
    try {
      const response = await fetch(`${TASK_API_END_POINT}/get`);
      if (response.ok) {
        const data = await response.json();
        setTasks(data);
      } else {
        console.error("Failed to fetch tasks");
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };
  
  const addTask = async () => {
    if (taskDescription.trim() === "") {
      alert("Task description cannot be empty!");
      return;
    }
  
    try {
      const response = await fetch(`${TASK_API_END_POINT}/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: taskDescription,
          description: taskDescription,
          due_date: new Date(),
          priority: "Medium",
          completed: false,
        }),
      });
  
      if (response.ok) {
        fetchTasks();
        setTaskDescription("");
        alert("Task added successfully!");
      } else {
        console.error("Failed to add task");
        alert("There was an error adding the task. Please try again.");
      }
    } catch (error) {
      console.error("Error adding task:", error);
      alert("There was an error adding the task. Please check your network connection.");
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
      alert("There was an error deleting the task. Please check your network connection.");
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
    <SafeAreaView>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerText}>Task Manager</Text>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <Text style={styles.emoji}>❓</Text>
            </TouchableOpacity>
          </View>

          {/* Add Task Bar */}
          <View style={styles.addTaskBar}>
            <TextInput
              style={styles.input}
              placeholder="Add a new task..."
              placeholderTextColor="#aaa"
              value={taskDescription}
              onChangeText={setTaskDescription}
            />
          </View>

          {/* Task Description */}
          <View style={styles.addTaskDesc}>
            <TextInput
              style={styles.input}
              placeholder="Add task Description..."
              placeholderTextColor="#aaa"
              value={taskDescription}
              onChangeText={setTaskDescription}
            />
          </View>

          {/* User Tasks */}
          <ScrollView style={styles.userTasks}>
            <Text style={styles.taskLabel}>Your Tasks:</Text>
            <Text style={styles.taskText}>
              {taskDescription || "No task added yet!"}
            </Text>
          </ScrollView>

          {/* Add Task Button */}
          <TouchableOpacity
            style={styles.addTaskButton}
            onPress={() => alert(`Task Added: ${taskDescription}`)}
          >
            <Text style={styles.buttonText}>Add Task</Text>
          </TouchableOpacity>

          {/* Quotes about Tasks */}
          <View style={styles.randmQuotes}>
            <Text style={styles.quoteText}>"{randomQuote}"</Text>
          </View>
        </View>
      </ScrollView>

      <Modal
        animationType=""
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
              1. selecte start time {"\n"}
              2. select end time {"\n"}
              3. selecet reminder
            </Text>
            <Button onPress={() => setModalVisible(false)} title="Close" />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    padding: 20,
  },
  addTaskBar: {
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#444",
    color: "#fff",
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
    flex: 1,
    marginBottom: 20,
    height: 50,
  },
  header: {
    backgroundColor: '#555',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 15,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  emoji: {
    fontSize: 20,
    marginLeft: 10,
  },
  addTaskDesc: {
    flex: 1,
    backgroundColor: "#444",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    height: 200,
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
  taskText: {
    fontSize: 16,
    color: "#fff",
  },
  addTaskButton: {
    backgroundColor: "#007BFF",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
  randmQuotes: {
    justifyContent: "center",
    alignContent: "center",
    backgroundColor: "#f5f5f5",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    height: 250,
  },
  quoteText: {
    fontSize: 16,
    color: "#333",
    fontStyle: "italic",
    textAlign: "center",
    fontFamily: "PlaywriteCOGuides",
    marginBottom: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
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

export default TaskScreen;

// import React, { useState, useEffect } from "react";
// import { Text, View, StyleSheet, TextInput, TouchableOpacity, ScrollView, SafeAreaView, Modal, Button, } from "react-native";
// import { useFonts } from "expo-font";

// const TaskScreen = () => {
//   const [fontsLoaded] = useFonts({
//     PlaywriteCOGuides: require("../assets/fonts/PlaywriteCOGuides-Regular.ttf"),
//   });
//   const [taskDescription, setTaskDescription] = useState("");
//   const [tasks, setTasks] = useState([]);
//   const [randomQuote, setRandomQuote] = useState("The secret of getting ahead is getting started.");
//   const [modalVisible, setModalVisible] = useState(false);

//   useEffect(() => {
//     fetchTasks();
//   }, []);

//   if (!fontsLoaded) {
//     return <Text>Loading...</Text>;
//   }

//   const fetchTasks = async () => {
//     try {
//       const response = await fetch("http://localhost:3000/get");
//       const data = await response.json();
//       setTasks(data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const addTask = async () => {
//     if (taskDescription.trim() === "") {
//       alert("Task description cannot be empty!");
//       return;
//     }
//     try {
//       const response = await fetch("http://localhost:3000/add", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           title: taskDescription,
//           description: taskDescription,
//           due_date: new Date(),
//           priority: "Medium",
//           completed: false,
//         }),
//       });
//       if (response.ok) {
//         fetchTasks();
//         setTaskDescription("");
//       } else {
//         console.error("Failed to add task");
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const deleteTask = async (id) => {
//     try {
//       const response = await fetch(`http://localhost:3000/delete/${id}`, {
//         method: "DELETE",
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });
//       if (response.ok) {
//         fetchTasks();
//       } else {
//         console.error("Failed to delete task");
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const getRandomQuote = () => {
//     const quotes = [
//       "The secret of getting ahead is getting started.",
//       "Don't watch the clock; do what it does. Keep going.",
//       "The best way to get something done is to begin.",
//       "Start where you are. Use what you have. Do what you can.",
//     ];
//     const randomIndex = Math.floor(Math.random() * quotes.length);
//     setRandomQuote(quotes[randomIndex]);
//   };

//   return (
//     <SafeAreaView>
//       <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
//         <View style={styles.container}>
//           <View style={styles.header}>
//             <Text style={styles.headerText}>Task Manager</Text>
//             <TouchableOpacity onPress={() => setModalVisible(true)}>
//               <Text style={styles.emoji}>❓</Text>
//             </TouchableOpacity>
//           </View>

//           <View style={styles.addTaskBar}>
//             <TextInput
//               style={styles.input}
//               placeholder="Add a new task..."
//               placeholderTextColor="#aaa"
//               value={taskDescription}
//               onChangeText={setTaskDescription}
//             />
//             <TouchableOpacity style={styles.addTaskButton} onPress={addTask}>
//               <Text style={styles.buttonText}>Add Task</Text>
//             </TouchableOpacity>
//           </View>

//           <View style={styles.userTasks}>
//             <Text style={styles.taskLabel}>Your Tasks:</Text>
//             {tasks.length === 0 ? (
//               <Text style={styles.taskText}>No tasks added yet!</Text>
//             ) : (
//               tasks.map((task) => (
//                 <View key={task.id} style={styles.taskItem}>
//                   <Text style={styles.taskText}>{task.description}</Text>
//                   <TouchableOpacity onPress={() => deleteTask(task.id)}>
//                     <Text style={styles.deleteButton}>Delete</Text>
//                   </TouchableOpacity>
//                 </View>
//               ))
//             )}
//           </View>

//           <View style={styles.randmQuotes}>
//             <Text style={styles.quoteText}>"{randomQuote}"</Text>
//             <TouchableOpacity onPress={getRandomQuote}>
//               <Text style={styles.quoteButton}>Get Random Quote</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </ScrollView>

//       <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
//         <View style={styles.centeredView}>
//           <View style={styles.modalView}>
//             <Text style={styles.modalText}>
//               Welcome to the Session Screen {"\n"}
//               {"\n"}
//               Instructions: {"\n"}
//               {"\n"}
//               1. Select start time {"\n"}
//               2. Select end time {"\n"}
//               3. Select reminder
//             </Text>
//             <Button onPress={() => setModalVisible(false)} title="Close" />
//           </View>
//         </View>
//       </Modal>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#F5F5F5",
//     padding: 20,
//   },
//   addTaskBar: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginBottom: 20,
//   },
//   input: {
//     backgroundColor: "#444",
//     color: "#fff",
//     borderRadius: 10,
//     padding: 10,
//     fontSize: 16,
//     flex: 1,
//     marginRight: 10,
//   },
//   header: {
//     backgroundColor: '#555',
