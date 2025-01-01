import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';

const AboutusScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.paragraph}>
        Welcome to <Text style={styles.bold}>Digital Study Assistant</Text>, your one-stop solution to optimize your learning experience and help you stay on top of your academic goals. We understand the challenges students face, from managing time effectively to staying organized amidst a busy schedule. That's why we’ve built this app to make studying smarter, not harder.
      </Text>

      <Text style={styles.subHeader}>What We Do</Text>
      <Text style={styles.paragraph}>
        The Digital Study Assistant is a versatile platform designed to simplify and enhance your study routine. Here’s a breakdown of our key features:
      </Text>

      <Text style={styles.featureTitle}>1. Session Management</Text>
      <Text style={styles.paragraph}>
        - Plan your study sessions with precision using techniques like Pomodoro.{'\n'}
        - Customize session durations, tasks, and even select specific study methods.{'\n'}
        - Set reminders and keep track of your progress during each session.
      </Text>

      <Text style={styles.featureTitle}>2. Digital Tracker</Text>
      <Text style={styles.paragraph}>
        - Monitor your daily activity streak to maintain consistency in your study habits.{'\n'}
        - View insights such as the number of days you’ve logged in, your average task completion rate, and total study sessions completed.{'\n'}
        - Stay motivated with visual progress updates and streak goals.
      </Text>

      <Text style={styles.featureTitle}>3. Task Management</Text>
      <Text style={styles.paragraph}>
        - Break down your workload into manageable tasks.{'\n'}
        - Prioritize and categorize tasks to focus on what matters most.{'\n'}
        - Check off completed tasks to celebrate your productivity!
      </Text>

      <Text style={styles.featureTitle}>4. PDF Folder Organizer</Text>
      <Text style={styles.paragraph}>
        - Create folders to store, organize, and access your study materials seamlessly.{'\n'}
        - Upload PDFs and have all your resources at your fingertips.{'\n'}
        - Quickly find what you need without scrolling through clutter.
      </Text>

      <Text style={styles.featureTitle}>5. Integrated Techniques for Focus</Text>
      <Text style={styles.paragraph}>
        - Leverage proven techniques like Pomodoro or Time Blocking to improve focus and productivity.{'\n'}
        - Set goals for each session and track your ability to stay on task.
      </Text>

      <Text style={styles.featureTitle}>6. Carousel Integration for Quick Access</Text>
      <Text style={styles.paragraph}>
        - Merge session management and study techniques into a single interactive carousel.{'\n'}
        - Easily set up your study environment, session goals, and tasks in one screen.{'\n'}
        - Activate the <Text style={styles.bold}>Start Studying</Text> button once you’ve customized everything to begin immediately.
      </Text>

      <Text style={styles.subHeader}>Our Mission</Text>
      <Text style={styles.paragraph}>
        To make studying effective, organized, and stress-free for every student. We aim to empower you with tools that not only save time but also improve your overall learning outcomes.
      </Text>

      <Text style={styles.subHeader}>Why Choose Us?</Text>
      <Text style={styles.paragraph}>
        - <Text style={styles.bold}>User-Centric Design:</Text> We prioritize simplicity and ease of use.{'\n'}
        - <Text style={styles.bold}>Advanced Functionality:</Text> From reminders to detailed tracking, we’ve got you covered.{'\n'}
        - <Text style={styles.bold}>Tailored for Students:</Text> Built with students in mind, for students by students!
      </Text>

      <Text style={styles.paragraph}>
        Whether you’re preparing for exams, working on assignments, or building a habit of self-study, the <Text style={styles.bold}>Digital Study Assistant</Text> is here to make your study journey productive and enjoyable.
      </Text>

      <Text style={styles.paragraph}>Thank you for trusting us as your study companion. Together, let’s achieve your academic goals!</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2E86C1',
    textAlign: 'center',
    marginBottom: 20,
  },
  subHeader: {
    fontSize: 22,
    fontWeight: '600',
    color: '#34495E',
    marginTop: 20,
    marginBottom: 10,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2E86C1',
    marginTop: 10,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    color: '#4A4A4A',
    marginBottom: 10,
  },
  bold: {
    fontWeight: 'bold',
  },
});

export default AboutusScreen;
