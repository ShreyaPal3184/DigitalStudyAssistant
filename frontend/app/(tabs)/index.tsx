import React, { useEffect, useState } from "react";
import { View, Text, FlatList, ActivityIndicator, StyleSheet, TouchableOpacity } from "react-native";
import axios from "axios";
import { Linking } from "react-native";

const BlobsList = () => {
  const [blobs, setBlobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlobs = async () => {
      try {
        // Replace with your API endpoint
        // const response = await axios.get("https://dsasp-api.azurewebsites.net/api/resource/get");
        const response = await axios.get("http://localhost:8080/api/resource/get");
        setBlobs(response.data);
        setLoading(false);
      } catch (err) {
        setError((err as any).message);
        setLoading(false);
      }
    };

    fetchBlobs();
  }, []);

  const handleFileClick = (fileUrl: string) => {
    // Opens the file in the default browser or app
    Linking.openURL(fileUrl).catch((err) => console.error("Error opening URL: ", err));
  };

  const renderBlobItem = ({ item }: { item: { filename: string; metadata?: { fileUrl?: string }; user: { username: string } } }) => (
    <TouchableOpacity
      style={styles.blobItem}
      onPress={() => handleFileClick(item.metadata?.fileUrl || "")} // Pass file URL to open
    >
      <Text style={styles.blobName}>{item.filename}</Text>
      {item.user && (
        <Text style={styles.metadata}>Owner: {item.user.username || "Unknown"}</Text>
      )}
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading blobs...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Blob List</Text>
      <FlatList
        data={blobs}
        keyExtractor={(item) => item.filename}
        renderItem={renderBlobItem}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  list: {
    paddingBottom: 20,
  },
  blobItem: {
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  blobName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  metadata: {
    marginTop: 5,
    color: "#555",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "red",
    fontSize: 16,
  },
});

export default BlobsList;
