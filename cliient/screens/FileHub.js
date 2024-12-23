import React from "react";
import { View, Text, SafeAreaView, ScrollView } from "react-native";

const FileHub = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, marginTop: 30}}>
        <View style={{
          width: "100%",
          padding: 20,
          backgroundColor: "#6200ee",
          alignItems: "center",
          justifyContent: "center",
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
        }}>
          <Text style={{ fontSize: 24, fontWeight: "bold", color: "#ffffff" }}>File Hub</Text>
        </View>
        <View style={{ marginTop: 20, paddingHorizontal: 20, alignItems: "center", justifyContent: "center" }}>
          <Text style={{ fontSize: 18, color: "#333333" }}>Welcome to the File Hub</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default FileHub;
