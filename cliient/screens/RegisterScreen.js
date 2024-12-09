import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import NotificationCheckbox from '../components/NotificationCheckbox';
import colors from '../styles/colors';
import axios from 'axios';
import { USER_API_END_POINT } from '../utils/constant';

const RegisterScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [notifications, setNotifications] = useState(false); // Default to false
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!username || !email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      // Sending POST request to the backend API for registration
      const response = await axios.post(`${USER_API_END_POINT}/register`, {
        username,
        email,
        password,
        confirmPassword,
        notifications,
      });

      if (response.data.message === 'User created successfully.') {
        Alert.alert('Registration Successful', response.data.message);
        navigation.navigate('Login'); // Navigate to the Login screen after successful registration
      } else {
        Alert.alert('Registration Failed', response.data.message);
      }
    } catch (error) {
      Alert.alert('Error', error.message || 'An error occurred during registration');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      
      <CustomInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <CustomInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <CustomInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <CustomInput
        placeholder="Confirm Password"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      
      <NotificationCheckbox
        value={notifications}
        onValueChange={setNotifications}
      />
      
      <CustomButton
        title={loading ? 'Registering...' : 'Register'}
        onPress={handleRegister}
        disabled={loading}
      />
      
      <CustomButton
        title="Already have an Account? Login"
        onPress={() => navigation.navigate('Login')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 20,
  },
});

export default RegisterScreen;
