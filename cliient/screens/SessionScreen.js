import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Modal,
  Button,
} from "react-native";

const SessionScreen = () => {

  return(
    <SafeAreaView style={{flex:1, backgroundColor: '#f5f5f5'}}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={{justifyContent: 'center', alignItems: 'center', backgroundColor: 'blue', width: "100%", marginTop: 40, borderBottomLeftRadius: 10, borderBottomRightRadius: 10, padding: 20}}>
          <Text style={{fontSize: 24, color: 'white', fontWeight: 'bold'}}>Sessions</Text>
        </View>
        <View style={{justifyContent: 'center', alignItems: 'center', padding :20}}>
          <Text style={{ fontSize: 18, color: "#333333" }}> Welcome to your sessions</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SessionScreen;