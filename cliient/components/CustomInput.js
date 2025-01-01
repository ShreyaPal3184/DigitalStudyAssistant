import React from 'react';
import { TextInput, StyleSheet, View } from 'react-native';
import colors from '../styles/colors';

const CustomInput = ({ placeholder, secureTextEntry, value, onChangeText }) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#888"
        secureTextEntry={secureTextEntry}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    width: '90%',
    alignSelf: 'center',
  },
  input: {
    backgroundColor: colors.inputBackground,
    borderRadius: 25,
    padding: 10,
    fontSize: 16,
    borderColor: '#ccc',
    borderWidth: 1,
  },
});

export default CustomInput;
