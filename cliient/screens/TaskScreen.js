import React, { Component } from 'react'
import { Text, View, StyleSheet} from 'react-native'

const TaskScreen = () => {
    return(
        <View style={styles.taskScreen}>
            <Text>Task Screen</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    taskScreen: {
        backgroundColor: 'black',
    },
});

export default TaskScreen;