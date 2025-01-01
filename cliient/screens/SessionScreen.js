import React, { useState, useEffect } from "react";
import { Text, View, SafeAreaView, ScrollView, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const SessionScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View
          style={{
            height: height * 0.15,
            maxHeight: "20%",
            backgroundColor: "white",
            zIndex: 5
          }}
        >
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              height: height * 0.15,
              maxHeight: "100%",
              backgroundColor: "#171717",
              borderBottomRightRadius: 70,
              padding: 20,
              zIndex: 10,
            }}
          >
            <Text style={{ fontSize: 24, color: "white", fontWeight: "bold" }}>
              Sessions
            </Text>
          </View>
        </View>
        <View
          style={{
            height: height * 0.85,
            // padding: 20,
            backgroundColor: "#171717",
          }}
        >
          <View
            style={{
              height: height * 0.85,
              width: width*0.98,
              justifyContent: "center",
              alignItems: "center",
              alignSelf: 'flex-end',
              padding: 20,
              backgroundColor: "white",
              borderTopLeftRadius: 70,
            }}
          ></View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SessionScreen;
