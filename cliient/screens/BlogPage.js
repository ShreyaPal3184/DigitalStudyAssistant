import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity, Linking } from 'react-native';
import axios from 'axios';

const BlobPage = ({ navigation }) => {
  const [blobs, setBlobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchBlobs = async () => {
      try {
        const response = await axios.get("https://dsasp-api.azurewebsites.net/api/resource/get");
        setBlobs(response.data); 
        setLoading(false);
      } catch (err) {
        setError(err.message || 'Something went wrong');
        setLoading(false);
      }
    };

    fetchBlobs();
  }, []);

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

  const handleFilePress = (fileUrl) => {
    Linking.openURL(fileUrl).catch((err) =>
      console.error("Failed to open URL:", err)
    );
  };

  const renderBlob = ({ item }) => (
    <TouchableOpacity onPress={() => handleFilePress(item.metadata.fileUrl)}>
      <View style={styles.blobItem}>
        <Text style={styles.blobName}>File Name: {item.filename}</Text>
        <Text style={styles.description}>Description: {item.metadata.description}</Text>
        <Text style={styles.userInfo}>Uploaded by: {item.user.username}</Text>
        <Text style={styles.date}>Upload Date: {new Date(item.metadata.uploadDate).toLocaleDateString()}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    
    <View style={styles.container}>
      <Text style={{ fontSize: 30, textAlign: 'center', marginBottom: 15 }}>Files</Text>
      <Button title="Add files" onPress={() => navigation.navigate("AddFile")} />  
      <FlatList
        data={blobs}
        keyExtractor={(item) => item.metadata.id.toString()}
        renderItem={renderBlob}
      />
    </View>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
    paddingBottom: 100
  },
  blobItem: {
    marginBottom: 16,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
  },
  blobName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    marginTop: 4,
    color: '#555',
  },
  userInfo: {
    fontSize: 14,
    marginTop: 4,
    color: '#007BFF',
  },
  date: {
    fontSize: 12,
    marginTop: 4,
    color: '#999',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
  },
});

export default BlobPage;
