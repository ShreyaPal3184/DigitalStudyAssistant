import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const TimerScreen = () => {
  const [timeLeft, setTimeLeft] = useState(1500); // 25 minutes in seconds
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      clearInterval(interval);
      alert("Time's up! Take a break!");
    }

    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(1500); // Reset to 25 minutes
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.timerText}>{formatTime(timeLeft)}</Text>
      <TouchableOpacity style={styles.button} onPress={toggleTimer}>
        <Text style={styles.buttonText}>{isActive ? "Pause" : "Start"}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={resetTimer}>
        <Text style={styles.buttonText}>Reset</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  timerText: {
    fontSize: 50,
    fontWeight: "bold",
    color: "#333",
  },
  button: {
    backgroundColor: "#4F8EF7",
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default TimerScreen;
