import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet, ActivityIndicator, Alert, TouchableOpacity, BackHandler } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

function UsersScreen() {
  const [users, setUsers] = useState([]);
  const [friends, setFriends] = useState([]);
  const [friendRequests, setFriendRequests] = useState([]);
  const [currentView, setCurrentView] = useState('users'); // Tracks which list to show
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigation = useNavigation();

  const getToken = async () => {
    try {
      return await AsyncStorage.getItem('userToken');
    } catch (err) {
      Alert.alert('Error', 'Failed to get token from storage.');
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://dsasp-api.azurewebsites.net/api/user/get');
        setUsers(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message || 'Something went wrong');
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

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

  const fetchFriendRequests = async () => {
    try {
      setLoading(true);
      const token = await getToken();

      if (!token) {
        Alert.alert('Error', 'Authentication token is missing.');
        setLoading(false);
        return;
      }

      const response = await axios.get('https://dsasp-api.azurewebsites.net/api/friendship/requests', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setFriendRequests(response.data);
      setCurrentView('requests');
      setLoading(false);
    } catch (err) {
      setError(err.message || 'Failed to fetch friend requests.');
      setLoading(false);
    }
  };

  const addFriend = async (userId) => {
    try {
      const token = await getToken();

      if (!token) {
        Alert.alert('Error', 'Authentication token is missing.');
        return;
      }

      const response = await axios.post(`https://dsasp-api.azurewebsites.net/api/friendship/add`,
        { friendId: userId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      Alert.alert('Success', `Friend request sent to user with ID ${userId}`);
    } catch (err) {
      Alert.alert('Failed to add friend.');
    }
  };

  const keyExtractor = (item, index) => (item.id ? item.id.toString() : index.toString());

  const renderUser = ({ item }) => (
    <View style={styles.userItem}>
      <Text style={styles.userName}>Name: {item.username}</Text>
      <Button
        title="Add"
        onPress={() => addFriend(item.id)}
        color="#007AFF" />
    </View>
  );

  const renderFriend = ({ item }) => (
    <View style={styles.userItem}>
      <Text style={styles.userName}>Name: {item.username}</Text>
    </View>
  );

  const renderFriendRequest = ({ item }) => (
    <View style={styles.userItem}>
      <Text style={styles.userName}>Name: {item.username}</Text>
    </View>
  );

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        navigation.navigate('Blog');
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => {
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      };
    }, [navigation])
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
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
      <Text style={styles.heading}>Users</Text>
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('MyFriendsScreen')}>
          <Text style={styles.buttonText}>My Friends</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={fetchFriendRequests}>
          <Text style={styles.buttonText}>Friend Requests</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={currentView === 'users'
          ? users
          : currentView === 'friends'
            ? friends
            : friendRequests}
        keyExtractor={keyExtractor}
        renderItem={currentView === 'users'
          ? renderUser
          : currentView === 'friends'
            ? renderFriend
            : renderFriendRequest} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: 'bold', 
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  button: {
    flex: 1,
    backgroundColor: 'black',
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  userItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
  },
});

export default UsersScreen;
