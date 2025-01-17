import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Dimensions,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
  FlatList,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import * as DocumentPicker from "expo-document-picker";
import { FOLDER_API_END_POINT } from "../utils/constant";

const { width, height } = Dimensions.get("window");

const FileHub = () => {
  const [folders, setFolders] = useState([]);
  const [folderName, setFolderName] = useState("");
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [files, setFiles] = useState([]);
  const [token, setToken] = useState("");

  const navigation = useNavigation();

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem("userToken");
        if (storedToken) {
          setToken(storedToken);
          fetchFolders(storedToken); // Call fetchFolders after fetching the token
        }
      } catch (error) {
        console.error("Failed to fetch token from AsyncStorage:", error);
      }
    };

    fetchToken();
  }, []);

  const fetchFolders = async (token) => {
    try {
      const response = await fetch(`${FOLDER_API_END_POINT}/get`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const responseData = await response.json();
      if (response.ok) {
        setFolders(responseData);
      } else {
        Alert.alert("Error", responseData.message || "Failed to fetch folders.");
      }
    } catch (error) {
      Alert.alert("Error", error.message || "An error occurred.");
    }
  };

  const createFolder = async () => {
    if (!folderName) {
      Alert.alert("Error", "Folder name is required.");
      return;
    }

    try {
      const response = await fetch(`${FOLDER_API_END_POINT}/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name: folderName }),
      });

      const responseData = await response.json();
      if (response.ok) {
        setFolders([...folders, responseData]);
        setFolderName("");
        Alert.alert("Success", "Folder created successfully.");
      } else {
        Alert.alert("Error", responseData.message || "Failed to create folder.");
      }
    } catch (error) {
      Alert.alert("Error", error.message || "An error occurred.");
    }
  };

  const deleteFolder = async (folderId) => {
    try {
      const response = await fetch(`${FOLDER_API_END_POINT}/delete-folder/${folderId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const responseData = await response.json();
      if (response.ok) {
        setFolders(folders.filter((folder) => folder.id !== folderId));
        Alert.alert("Success", "Folder deleted successfully.");
      } else {
        Alert.alert("Error", responseData.message || "Failed to delete folder.");
      }
    } catch (error) {
      Alert.alert("Error", error.message || "An error occurred.");
    }
  };

  const fetchFiles = async (folderId) => {
    try {
      const response = await fetch(`${FOLDER_API_END_POINT}/get-files/${folderId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      let responseData;
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        responseData = await response.json();
      } else {
        responseData = await response.text();
        try {
          responseData = JSON.parse(responseData);
        } catch (e) {
          console.error("Failed to parse response as JSON:", responseData);
        }
      }

      if (response.ok) {
        setFiles(responseData);
      } else {
        Alert.alert("Error", responseData.message || "Failed to fetch files.");
      }
    } catch (error) {
      Alert.alert("Error", error.message || "An error occurred.");
    }
  };

  const uploadFile = async (folderId) => {
    const result = await DocumentPicker.getDocumentAsync({});
    if (result.type === "cancel") {
      return;
    }

    const file = result.file;
    const formData = new FormData();
    formData.append("file", {
      uri: file.uri,
      name: file.name,
      type: file.mimeType,
    });

    try {
      const response = await fetch(`${FOLDER_API_END_POINT}/upload-file/${folderId}`, {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const responseData = await response.json();
      if (response.ok) {
        setFiles([...files, responseData]);
        Alert.alert("Success", "File uploaded successfully.");
      } else {
        Alert.alert("Error", responseData.message || "Failed to upload file.");
      }
    } catch (error) {
      Alert.alert("Error", error.message || "An error occurred.");
    }
  };

  const deleteFile = async (folderId, fileId) => {
    try {
      const response = await fetch(`${FOLDER_API_END_POINT}/delete-file/${folderId}/${fileId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      let responseData;
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        responseData = await response.json();
      } else {
        responseData = await response.text();
        try {
          responseData = JSON.parse(responseData);
        } catch (e) {
          console.error("Failed to parse response as JSON:", responseData);
        }
      }

      if (response.ok) {
        setFiles(files.filter((file) => file.id !== fileId));
        Alert.alert("Success", "File deleted successfully.");
      } else {
        Alert.alert("Error", responseData.message || "Failed to delete file.");
      }
    } catch (error) {
      Alert.alert("Error", error.message || "An error occurred.");
    }
  };

  const confirmDeleteFolder = (id) => {
    Alert.alert(
      "Delete Folder",
      "Are you sure you want to delete this folder? (once deleted you won't be able to recover this item)",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => deleteFolder(id),
          style: "destructive",
        },
      ],
      { cancelable: true }
    );
  };

  const confirmDeleteFile = (folderId, fileId) => {
    Alert.alert(
      "Delete File",
      "Are you sure you want to delete this file? (once deleted you won't be able to recover this item)",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => deleteFile(folderId, fileId),
          style: "destructive",
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={folders}
        keyExtractor={(item) => item.id?.toString() || item.name}
        ListHeaderComponent={
          <View style={{ width: width * 0.3, padding: 10, height: height * 0.1, paddingBottom: 0 }}>
            <Text style={{ fontSize: 30, fontWeight: "600" }}>FileHub</Text>
          </View>
        }
        ListEmptyComponent={
          <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
            <Image
              source={require("../assets/fileimagee.jpg")}
              style={{ height: height * 0.5, width: width * 0.9 }}
            />
            <View style={{ flexDirection: "row" }}>
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
                Long press on the folder to delete them.
              </Text>
            </View>
          </View>
        }
        renderItem={({ item: folder }) => (
          <View
            key={folder.id || folder.name}
            style={{
              ...styles.boxShadow,
              backgroundColor: "#f5f5f5",
              borderRadius: 20,
              padding: 10,
              paddingLeft: 15,
              paddingRight: 15,
              marginBottom: 25,
              flexWrap: "wrap",
            }}
          >
            <TouchableOpacity
              style={{}}
              onLongPress={() => confirmDeleteFolder(folder.id)}
              onPress={() => {
                setSelectedFolder(folder.id);
                fetchFiles(folder.id);
              }}
            >
              <Image
                source={require("../assets/folder1.png")}
                style={{ height: 150, width: 150 }}
              />
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                {folder.name}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      />

      {selectedFolder && (
        <View style={styles.filesContainer}>
          <Text style={styles.filesHeader}>Files in {folders.find(f => f.id === selectedFolder)?.name}</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => uploadFile(selectedFolder)}
          >
            <Text style={styles.buttonText}>Upload File</Text>
          </TouchableOpacity>
          <FlatList
            data={files}
            keyExtractor={(item) => item.id?.toString() || item.name}
            renderItem={({ item }) => (
              <View style={styles.fileContainer} key={item.id || item.name}>
                <Text style={styles.fileText}>{item.name}</Text>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => confirmDeleteFile(selectedFolder, item.id)}
                >
                  <Text style={styles.deleteButtonText}>Delete</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
      )}

      <View
        style={{
          justifyContent: "center",
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 50,
        }}
      >
        {/* Text Input for folder name */}
        <View
          style={{
            padding: 10,
            borderRadius: 20,
            flex: 1, // Allows the input to take available space in the row
          }}
        >
          <TextInput
            style={styles.input}
            placeholder="Enter Folder Name"
            value={folderName}
            onChangeText={setFolderName}
          />
        </View>

        {/* Button to add folder */}
        <View
          style={{
            padding: 10,
            borderRadius: 50,
            marginLeft: 10, // Adds space between the input and the button
            marginBottom: 10,
          }}
        >
          <TouchableOpacity onPress={createFolder}>
            <Image
              source={require("../assets/folder.png")}
              style={{ height: 50, width: 50 }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
  },
  headerContainer: {
    width: width * 0.9,
    height: height * 0.075,
    backgroundColor: "#F2E3A1",
    borderRadius: 20,
    alignSelf: "center",
    top: 2,
  },
  header: {
    height: "100%",
    padding: 20,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  foldersContainer: {
    marginTop: 20,
    justifyContent: "space-between",
  },
  folderItem: {
    padding: 15,
    marginBottom: 10,
    backgroundColor: "black",
    borderRadius: 10,
  },
  folderText: {
    fontSize: 18,
    color: "white",
  },
  input: {
    width: width * 0.7,
    height: 40,
    borderColor: "gray",
    borderWidth: 2,
    marginBottom: 10,
    paddingLeft: 15,
    alignSelf: "center",
    borderRadius: 25,
  },
  boxShadow: {
    shadowColor: "red",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.5,
    shadowRadius: 1,
    elevation: 5,
  },
  button: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
  },
  fileContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "gray",
  },
  fileText: {
    fontSize: 16,
    color: 'black'
  },
  deleteButton: {
    backgroundColor: "red",
    padding: 5,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: "white",
    fontSize: 14,
  },
  filesContainer: {
    padding: 10,
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    marginTop: 20,
  },
  filesHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
});

export default FileHub;
