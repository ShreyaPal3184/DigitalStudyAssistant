import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import colors from '../styles/colors';

const NotificationCheckbox = () => {
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        Receive notifications about study streaks and more
      </Text>
      <Switch
        trackColor={{ false: '#ccc', true: colors.primary }}
        thumbColor={isEnabled ? colors.secondary : '#f4f3f4'}
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    width: '90%',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  label: {
    fontSize: 14,
    color: colors.text,
    flex: 1,
    marginRight: 10,
  },
});

export default NotificationCheckbox;
