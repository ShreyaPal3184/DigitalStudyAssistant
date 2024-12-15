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
        const response = await axios.get("https://dsasp-api.azurewebsites.net/api/resource/get");
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
    Linking.openURL(fileUrl).catch((err) => console.error("Error opening URL: ", err));
  };

  const renderBlobItem = ({ item }: { item: { filename: string; metadata?: { fileUrl?: string; description?: string }; user: { username: string } } }) => (
    <TouchableOpacity
      style={styles.blobItem}
      onPress={() => handleFileClick(item.metadata?.fileUrl || "")}
    >
      <View style={styles.fileIcon}>
        <Text style={styles.fileIconText}>📄</Text>
      </View>
      <View style={styles.fileDetails}>
        <Text style={styles.blobName}>{item.filename}</Text>
        {item.user && <Text style={styles.metadata}>Owner: {item.user.username || "Unknown"}</Text>}
        {item.metadata?.description && <Text style={styles.metadata}>Description: {item.metadata.description}</Text>}
      </View>
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
      <Text style={styles.header}>Resources</Text>
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
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    borderLeftWidth: 5,
    borderLeftColor: "#007BFF",
  },
  fileIcon: {
    width: 40,
    height: 40,
    backgroundColor: "#e0f7ff",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  fileIconText: {
    fontSize: 20,
    color: "#007BFF",
  },
  fileDetails: {
    flex: 1,
  },
  blobName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  metadata: {
    color: "#555",
    fontSize: 14,
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
