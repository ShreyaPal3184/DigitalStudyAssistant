const API_URL = "http://your-api-url.com/tasks";

export const getTasks = async () => {
  const response = await fetch(`${API_URL}`);
  return response.json();
};

export const addTask = async (taskData) => {
  await fetch(`${API_URL}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(taskData),
  });
};

export const deleteTask = async (taskId) => {
  await fetch(`${API_URL}/${taskId}`, { method: "DELETE" });
};


// import axios from 'axios';
// import { USER_API_END_POINT } from '../utils/constant';

// // Add task
// export const addTask = async (taskData, token) => {
//   try {
//     const response = await axios.post(
//       `${USER_API_END_POINT}/add`,
//       taskData,
//       { headers: { Authorization: `Bearer ${token}` } }
//     );
//     return response.data;
//   } catch (error) {
//     console.error("Error adding task", error);
//     throw error;
//   }
// };

// // Get tasks for the user
// export const getTasks = async (token) => {
//   try {
//     const response = await axios.get(
//       `${USER_API_END_POINT}/user`,
//       { headers: { Authorization: `Bearer ${token}` } }
//     );
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching tasks", error);
//     throw error;
//   }
// };

// // Delete task
// export const deleteTask = async (taskId, token) => {
//   try {
//     const response = await axios.delete(
//       `${USER_API_END_POINT}/delete/${taskId}`,
//       { headers: { Authorization: `Bearer ${token}` } }
//     );
//     return response.data;
//   } catch (error) {
//     console.error("Error deleting task", error);
//     throw error;
//   }
// };
