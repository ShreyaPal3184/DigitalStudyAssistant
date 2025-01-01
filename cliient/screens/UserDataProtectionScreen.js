import React from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native';

const UserDataProtectionScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>User Data Protection</Text>
      <Text style={styles.paragraph}>
        We take data protection seriously at <Text style={styles.bold}>Digital Study Assistant</Text>. This section highlights our commitment to safeguarding your personal information.
      </Text>

      <Text style={styles.subHeader}>1. Data Encryption</Text>
      <Text style={styles.paragraph}>
        All your personal data, including account details and uploaded materials, is encrypted during storage and transmission. This ensures unauthorized parties cannot access your information.
      </Text>

      <Text style={styles.subHeader}>2. Access Control</Text>
      <Text style={styles.paragraph}>
        Only authorized personnel have access to your data. Our systems are designed to limit access based on roles and responsibilities.
      </Text>

      <Text style={styles.subHeader}>3. User Control</Text>
      <Text style={styles.paragraph}>
        - You can view, edit, or delete your data directly from the app.{'\n'}
        - Request a full export of your data anytime by contacting <Text style={styles.bold}>support@digitalstudyassistant.com</Text>.
      </Text>

      <Text style={styles.subHeader}>4. Third-Party Integrations</Text>
      <Text style={styles.paragraph}>
        We use trusted services, such as Azure Cloud, to provide functionality. All integrations comply with global data protection standards.
      </Text>

      <Text style={styles.subHeader}>5. Compliance</Text>
      <Text style={styles.paragraph}>
        - We adhere to GDPR, CCPA, and other relevant data protection regulations.{'\n'}
        - Regular audits are conducted to ensure compliance.
      </Text>

      <Text style={styles.paragraph}>
        Your trust is important to us. If you have any questions or concerns about data protection, please email us at <Text style={styles.bold}>privacy@digitalstudyassistant.com</Text>.
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

export default UserDataProtectionScreen;
