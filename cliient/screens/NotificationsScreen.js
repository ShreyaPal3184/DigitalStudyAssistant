import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {useState} from 'react';

const NotificationsScreen = () => {
    const [notifications, setNotifications] = useState([]);

    return (
        <View>
            {notifications.length > 0 ? (
                notifications.map((notification, index) => (
                    <Text key={index}>{notification}</Text>
                ))
            ) : (
                <View style={styles.container}>
                    <Text style={{fontSize: 16, color: 'black'}}>You have no notifications</Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default NotificationsScreen;