import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';

const FAQScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Frequently Asked Questions</Text>

      {/* Question 1 */}
      <Text style={styles.question}>1. What is the Digital Study Assistant?</Text>
      <Text style={styles.answer}>
        The Digital Study Assistant is a productivity app designed to help students organize their study routines, manage tasks, track progress, and access study materials with ease. It includes features like session management, streak tracking, and PDF organization to make studying more effective and stress-free.
      </Text>

      {/* Question 2 */}
      <Text style={styles.question}>2. How do I create a study session?</Text>
      <Text style={styles.answer}>
        To create a study session, navigate to the Session Management screen, set your session duration, choose tasks to complete, and optionally select a study technique like Pomodoro. Once everything is set, tap the “Start Studying” button to begin your session.
      </Text>

      {/* Question 3 */}
      <Text style={styles.question}>3. What is the Digital Tracker feature?</Text>
      <Text style={styles.answer}>
        The Digital Tracker helps you monitor your daily streak, average task completion, and total study sessions. It provides visual insights to keep you motivated and on track with your goals.
      </Text>

      {/* Question 4 */}
      <Text style={styles.question}>4. Can I upload and organize my PDFs?</Text>
      <Text style={styles.answer}>
        Yes! You can create folders and upload PDFs to organize your study materials. This feature ensures all your resources are easily accessible and well-structured.
      </Text>

      {/* Question 5 */}
      <Text style={styles.question}>5. How does the app help me stay focused?</Text>
      <Text style={styles.answer}>
        The app integrates proven productivity techniques like Pomodoro and Time Blocking to help you stay focused during study sessions. You can set goals and reminders to enhance your efficiency.
      </Text>

      {/* Question 6 */}
      <Text style={styles.question}>6. Is my data safe in this app?</Text>
      <Text style={styles.answer}>
        Absolutely! We prioritize your privacy and ensure that all your data is securely stored. The app uses modern security practices and integrates with trusted platforms like Azure Cloud.
      </Text>

      {/* Question 7 */}
      <Text style={styles.question}>7. Can I customize the features?</Text>
      <Text style={styles.answer}>
        Yes! Many features, such as session duration, tasks, and techniques, are fully customizable to match your personal study preferences.
      </Text>

      {/* Question 8 */}
      <Text style={styles.question}>8. Is the app free to use?</Text>
      <Text style={styles.answer}>
        The Digital Study Assistant is free to use with all basic features included. Some advanced features may require a premium subscription to support ongoing development.
      </Text>

      {/* Question 9 */}
      <Text style={styles.question}>9. Who can use this app?</Text>
      <Text style={styles.answer}>
        The app is designed for students of all ages who want to organize their study routines and improve productivity. It’s user-friendly and adaptable for various academic needs.
      </Text>

      {/* Question 10 */}
      <Text style={styles.question}>10. How do I contact support?</Text>
      <Text style={styles.answer}>
        You can contact our support team by navigating to the Help & Support section in the app. Alternatively, email us at support@digitalstudyassistant.com for assistance.
      </Text>
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
  question: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#34495E',
    marginTop: 20,
  },
  answer: {
    fontSize: 16,
    lineHeight: 24,
    color: '#4A4A4A',
    marginTop: 10,
  },
});

export default FAQScreen;
