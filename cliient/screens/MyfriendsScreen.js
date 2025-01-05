import React from 'react';
import { View, Text, Button, FlatList, StyleSheet, ActivityIndicator, Alert, TouchableOpacity, BackHandler } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


const MyfriendsScreen = () => {

      const [friends, setFriends] = useState([]);
      const [loading, setLoading] = useState(true);
        const [error, setError] = useState(null);
        const navigation = useNavigation();

      const keyExtractor = (item, index) => (item.id ? item.id.toString() : index.toString());

      const getToken = async () => {
        try {
          return await AsyncStorage.getItem('userToken');
        } catch (err) {
          Alert.alert('Error', 'Failed to get token from storage.');
        }
      }

      const fetchFriends = async () => {
        try {
          setLoading(true);
          const token = await getToken();
    
          if (!token) {
            Alert.alert('Error', 'Authentication token is missing.');
            setLoading(false);
            return;
          }
    
          const response = await axios.get('https://dsasp-api.azurewebsites.net/api/friendship/get', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
    
          if (!response.data) {
            Alert.alert('Error', 'No friends found.');
            setLoading(false);
            return;
          }
    
          setFriends(response.data);
          setCurrentView('friends');
          setLoading(false);
        } catch (err) {
          setError(err.message || 'Failed to fetch friends.');
          setLoading(false);
        }
      };

      const renderFriend = ({ item }) => (
        <View style={styles.userItem}>
          <Text style={styles.userName}>Name: {item.username}</Text>
        </View>
      );

        if (loading) {
          return (
            <View style={styles.container}>
              <ActivityIndicator size="large" color="black" />
            </View>
          );
        }
      
        if (error) {
          return (
            <View style={styles.container}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          );
        }

    return (
        <View style={styles.container}>
            <Text style={styles.text}>My Friends Screen</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default MyfriendsScreen;