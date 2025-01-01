import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Dimensions,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";

const { width, height } = Dimensions.get("window");

const FileHub = () => {
  // State to manage folders
  const [folders, setFolders] = useState([]);
  const [fName, setfName] = useState("");

  // Function to add a new folder
  const addFolder = () => {
    if (fName.trim() === "") {
      alert("Please enter a folder name");
      return;
    }

    const newFolder = {
      id: folders.length + 1,
      name: fName,
    };

    setFolders([...folders, newFolder]);
    setfName("");
  };

  const deleteFolder = (id) => {
    setFolders(folders.filter((folder) => folder.id !== id));
  };

  const confirmDelete = (id) => {
    Alert.alert(
      "Delete Folder",
      "Are you sure you want to delete this folder? (once deleted you wont be able to recover this item)",
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

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {/* Header Section */}
        <View style={styles.headerContainer}>
          <View style={styles.header}>
            <Text style={{ fontSize: 24, color: "black", fontWeight: "300", textAlign: 'center',}}>
              Welcome to your file-tastic pit stop!
            </Text>
          </View>
        </View>

        {/* Main Content Section */}
        <View style={styles.contentContainer}>
          {folders.length === 0 ? (
            <View style={{ justifyContent: "center", flex: 1 }}>
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <View style={{ position: "relative" }}>
                  {/* Image */}
                  <Image
                    source={require("../assets/blackboard.png")}
                    style={{
                      height: height * 0.2,
                      width: width * 0.5,
                      alignSelf: "center",
                    }}
                  />

                  {/* Text */}
                  <Text style={styles.overlayText}>
                    No {"\n"}Folders{"\n"}to {"\n"}show. {"\n"}
                    Create A new Folder.
                  </Text>
                </View>

                {/* Divider Line */}
                <View
                  style={{
                    width: width * 0.7,
                    height: 2,
                    backgroundColor: "#000",
                    alignSelf: "center",
                  }}
                />
              </View>
              <View style={{ marginBottom: 20 }}>
                <Text style={{ fontSize: 24, fontWeight: "200" }}>
                  Steps to create folder:{"\n"} i. Enter your folder
                  name{"\n"}ii. Press create folder button.{"\n"}
                </Text>
              </View>
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
          ) : (
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                maxWidth: width,
                ...styles.foldersContainer,
              }}
            >
              {folders.map((folder) => (
                <View
                  key={folder.id}
                  style={{
                    ...styles.boxShadow,
                    backgroundColor: "#f5f5f5",
                    borderRadius: 20,
                    padding: 10,
                    paddingLeft: 15,
                    paddingRight: 15,
                    marginBottom: 25,
                    flexWrap: 'wrap'
                  }}
                >
                  <TouchableOpacity
                    style={{}}
                    onLongPress={() => confirmDelete(folder.id)}
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
              ))}
            </View>
          )}
        </View>
      </ScrollView>

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
            value={fName}
            onChangeText={setfName}
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
          <TouchableOpacity onPress={addFolder}>
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
  },
  headerContainer: {
    width: width * 0.9,
    height: height * 0.075,
    backgroundColor: "#F2E3A1",
    borderRadius: 20,
    alignSelf: 'center',
    top: 2
  },
  header: {
    height: "100%",
    padding: 20,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
  },
  bannerContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    padding: 20,
    marginTop: 50,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "black",
  },
  overlayText: {
    position: "absolute",
    top: "30%", // Position text vertically in the center
    left: "35%", // Position text horizontally in the center
    transform: [{ translateX: -width * 0.25 }, { translateY: -height * 0.04 }], // Adjust to exactly center
    fontSize: 16,
    color: "black",
    fontWeight: "300",
    textAlign: "left",
  },
  bannerText: {
    fontSize: 16,
    color: "black",
    textAlign: "center",
    fontWeight: "bold",
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
});

export default FileHub;
