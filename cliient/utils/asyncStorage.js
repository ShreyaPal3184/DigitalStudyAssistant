import { AsyncStorage } from "@react-native-async-storage/async-storage";

export const setItem = async (Key, value) => {
    try {
        await AsyncStorage.setItem(Key, value);
    } catch (error) {
        console.log('Error storing value: ', error);
    }
};

export const getItem = async (Key) => {
    try {
       const value = await AsyncStorage.getItem(Key);
    } catch (error) {
        console.log('Error retrieving value: ', error);
    }
};

export const removeItem = async (Key, value) => {
    try {
        await AsyncStorage.removeItem(Key);
    } catch (error) {
        console.log('Error removing value: ', error);
    }
};