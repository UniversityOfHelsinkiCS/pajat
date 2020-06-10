import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import AppBar from './components/AppBar';
import CourseList from './components/CourseList';

export default function App() {
  return (
    <SafeAreaView style={styles.default}>
      <AppBar />
      <CourseList />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  default: {
    flex: 1,
    backgroundColor: 'black',
  },
});
