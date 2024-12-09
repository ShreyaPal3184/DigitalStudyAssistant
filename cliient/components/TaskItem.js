import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const TaskItem = ({ task, onDelete }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{task.title}</Text>
      <Text style={styles.description}>{task.description}</Text>
      <TouchableOpacity onPress={() => onDelete(task.id)}>
        <Text style={styles.deleteButton}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  title: { fontSize: 16, fontWeight: "bold" },
  description: { color: "#555", marginBottom: 5 },
  deleteButton: { color: "red", marginTop: 5 },
});

export default TaskItem;



// import React from 'react';
// import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// const TaskItem = ({ task, onDelete }) => {
//   return (
//     <View style={styles.taskItem}>
//       <View style={styles.taskContent}>
//         <Text style={styles.taskText}>{task.title}</Text>
//         <Text style={styles.taskText}>{task.description}</Text>
//         <Text style={styles.taskText}>Due: {task.due_date}</Text>
//         <Text style={styles.taskText}>Priority: {task.priority}</Text>
//       </View>
//       <TouchableOpacity onPress={() => onDelete(task.id)} style={styles.deleteButton}>
//         <Icon name="delete" size={24} color="red" />
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   taskItem: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     padding: 15,
//     borderBottomWidth: 1,
//     borderBottomColor: '#ddd',
//   },
//   taskContent: {
//     flex: 1,
//   },
//   taskText: {
//     fontSize: 14,
//     color: '#333',
//   },
//   deleteButton: {
//     paddingLeft: 10,
//   },
// });

// export default TaskItem;
