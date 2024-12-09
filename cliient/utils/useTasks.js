// /utils/useTasks.js
import { useState, useEffect } from 'react';
import { getTasks } from '../services/taskService';

const useTasks = (token) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch tasks from the backend
  const fetchTasks = async () => {
    try {
      const fetchedTasks = await getTasks(token);
      setTasks(fetchedTasks);
    } catch (error) {
      console.error("Error fetching tasks", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
    // Set an interval to refresh tasks after midnight
    const intervalId = setInterval(() => {
      const now = new Date();
      if (now.getHours() === 2 && now.getMinutes() === 0) {
        fetchTasks();
      }
    }, 60000); // Check every minute for midnight refresh

    return () => clearInterval(intervalId);
  }, [token]);

  return { tasks, loading, fetchTasks };
};

export default useTasks;
