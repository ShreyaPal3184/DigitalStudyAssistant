import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Linking,
  Dimensions,
  Image,
  Alert,
} from "react-native";
import axios from "axios";
import * as DocumentPicker from "expo-document-picker";

const { width, height } = Dimensions.get("window");

const BlobPage = ({ navigation }) => {
  const [blobs, setBlobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlobs = async () => {
      try {
        const response = await axios.get(
          "https://dsasp-api.azurewebsites.net/api/resource/get"
        );
        setBlobs(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message || "Something went wrong");
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

  const handleAddFile = async () => {
    const result = await DocumentPicker.getDocumentAsync({});
    if (result.type === "cancel") {
      return;
    }

    const file = result;
    const description = "File description"; // Add a description for the file
    const formData = new FormData();
    formData.append("file", {
      uri: file.uri,
      name: file.name,
      type: file.mimeType || 'application/octet-stream', // Ensure MIME type is set
    });
    formData.append("description", description);

    try {
      const response = await axios.post("https://dsasp-api.azurewebsites.net/api/resource/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        Alert.alert("Success", "File uploaded successfully.");
        setBlobs([...blobs, response.data]);
      } else {
        Alert.alert("Error", "Failed to upload file.");
      }
    } catch (error) {
      console.error("Network error:", error);
      Alert.alert("Error", "Network error. Please check your connection and try again.");
    }
  };

  const renderBlob = ({ item }) => (
    <TouchableOpacity
      onLongPress={() => handleFilePress(item.metadata.fileUrl)}
    >
      <View style={styles.blobItem}>
        <Text style={styles.blobName}>{item.filename}</Text>
        <Text style={styles.description}>
          Description: {item.metadata.description}
        </Text>

        <View style={{ flexDirection: "row", alignSelf: 'baseline' }}>
          <View
            style={{
              borderRadius: 10,
              borderWidth: 2,
              borderColor: "green",
              width: width * 0.2,
              flexDirection: "row",
              padding: 10,
              justifyContent: "space-around",
              marginRight: 10,
            }}
          >
            <Image
              source={require("../assets/author1.png")}
              style={{ height: 17, width: 17 }}
            />
            <Text style={styles.date}>{item.user.username}</Text>
          </View>
          <View
            style={{
              borderRadius: 10,
              borderWidth: 2,
              borderColor: "green",
              width: width * 0.25,
              flexDirection: "row",
              padding: 5,
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <Image
              source={require("../assets/calendar.png")}
              style={{ height: 15, width: 15 }}
            />
          <Text style={{ textAlign: 'center', ...styles.date}}>
              {new Date(item.metadata.uploadDate).toLocaleDateString()}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text
        style={{
          fontSize: 30,
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: 15,
        }}
      >
        Files
      </Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
          alignItems: "center",
          padding: 5,
          marginBottom: 10,
        }}
      >
        <Text
          style={{
            color: "grey",
            fontSize: 24,
            textAlign: "center",
            fontStyle: "italic",
          }}
        >
          Wanna Contribute?
        </Text>
        <TouchableOpacity
          onPress={handleAddFile}
          style={{
            backgroundColor: "black",
            width: width * 0.4,
            alignSelf: "center",
            borderRadius: 10,
          }}
        >
          <Text
            style={{
              fontSize: 24,
              color: "white",
              textAlign: "center",
              padding: 5,
            }}
          >
            ADD FILE
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginBottom: 20,
        }}
      >
        <Image
          source={require("../assets/exclamation.png")}
          style={{
            height: 15,
            width: 15,
            alignSelf: "center",
            marginRight: 5,
          }}
        />
        <Text style={{ fontWeight: "500", fontStyle: "italic" }}>
          Long press on the file to download it.
        </Text>
      </View>
      <FlatList
        data={blobs}
        keyExtractor={(item) => item.metadata.id.toString()}
        renderItem={renderBlob}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
    paddingBottom: 100,
  },
  blobItem: {
    marginBottom: 16,
    padding: 20,
    borderWidth: 2,
    borderColor: "red",
    borderRadius: 8,
    backgroundColor: "white",
    height: height * 0.17,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  blobName: {
    fontSize: 24,
    fontWeight: "bold",
  },
  description: {
    fontSize: 14,
    marginTop: 4,
    color: "#555",
  },
  userInfo: {
    fontSize: 14,
    marginTop: 4,
    color: "#007BFF",
  },
  date: {
    fontSize: 14,
    color: "black",
  },
  errorText: {
    fontSize: 16,
    color: "red",
    textAlign: "center",
  },
});

export default BlobPage;
