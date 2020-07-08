import AsyncStorage from '@react-native-community/async-storage';

export const storeAccessKey = async (key) => {
  try {
    await AsyncStorage.setItem('@access_key', key);
  } catch (e) {
    console.log(e);
  }
};

export const getAccessKey = async () => {
  try {
    const value = await AsyncStorage.getItem('@access_key');
    if (value !== null) {
      return value;
    }
  } catch (e) {
    console.log(e);
  }
};

export const removeAccessKey = async () => {
  try {
    await AsyncStorage.removeItem('@access_key');
  } catch (e) {
    console.log(e);
  }
};
