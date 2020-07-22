import AsyncStorage from '@react-native-community/async-storage';

export const storeCourseList = async (courses) => {
  try {
    const stringifiedArray = JSON.stringify(courses);
    await AsyncStorage.setItem('@course_list', stringifiedArray);
  } catch (e) {
    console.log(e);
  }
};

export const getCourseList = async () => {
  try {
    const value = await AsyncStorage.getItem('@course_list');
    if (value !== null) {
      return JSON.parse(value);
    } else return [];
  } catch (e) {
    console.log(e);
  }
};

export const removeCourseList = async () => {
  try {
    await AsyncStorage.removeItem('@course_list');
  } catch (e) {
    console.log(e);
  }
};
