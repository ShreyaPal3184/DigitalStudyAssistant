import React from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native';

const PrivacyPolicyScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Privacy Policy</Text>
      <Text style={styles.paragraph}>
        At <Text style={styles.bold}>Digital Study Assistant</Text>, your privacy is our top priority. This Privacy Policy outlines how we collect, use, and protect your information when you use our app.
      </Text>

      <Text style={styles.subHeader}>1. Information We Collect</Text>
      <Text style={styles.paragraph}>
        - Personal details such as name, email address, and user preferences when you sign up.{'\n'}
        - App usage data to enhance features and improve the user experience.{'\n'}
        - Any uploaded content such as PDFs or study materials.
      </Text>

      <Text style={styles.subHeader}>2. How We Use Your Information</Text>
      <Text style={styles.paragraph}>
        - To provide and improve app features.{'\n'}
        - To personalize your experience and suggest relevant content.{'\n'}
        - To communicate updates, offers, and support-related messages.
      </Text>

      <Text style={styles.subHeader}>3. Sharing Your Data</Text>
      <Text style={styles.paragraph}>
        - We do not sell or share your personal data with third parties.{'\n'}
        - Data may be shared with trusted partners for app functionality, such as cloud storage providers.
      </Text>

      <Text style={styles.subHeader}>4. Data Security</Text>
      <Text style={styles.paragraph}>
        - Your data is stored securely using modern encryption technologies.{'\n'}
        - Access is restricted to authorized personnel only.
      </Text>

      <Text style={styles.subHeader}>5. Your Rights</Text>
      <Text style={styles.paragraph}>
        - You have the right to access, update, or delete your personal information.{'\n'}
        - Contact us at <Text style={styles.bold}>privacy@digitalstudyassistant.com</Text> for any data-related inquiries.
      </Text>

      <Text style={styles.paragraph}>
        By using our app, you agree to this Privacy Policy. We may update it periodically, and the latest version will always be available here.
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
  subHeader: {
    fontSize: 22,
    fontWeight: '600',
    color: '#34495E',
    marginTop: 20,
    marginBottom: 10,
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

export default PrivacyPolicyScreen;
