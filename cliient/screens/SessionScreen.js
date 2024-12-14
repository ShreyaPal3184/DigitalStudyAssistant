import React, { Component } from 'react'
import { Text, View, StyleSheet} from 'react-native'

const SessionScreen = () => {
    return(
        <View style={styles.SessionScreen}>
            <Text>Task Screen</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    SessionScreen: {
        backgroundColor: 'black',
    },
});

export default SessionScreen;