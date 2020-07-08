import React, { useState, useEffect } from 'react';
import {
  FlatList,
  View,
  StyleSheet,
  Dimensions,
  Text,
  SafeAreaView,
} from 'react-native';
import AppBar from '../AppBar';

const ListItem = ({ item }) => {
  return (
    <View style={styles.item}>
      <Text style={styles.itemTextBold}>{item.title}</Text>
      <Text style={styles.itemText}>{item.shortTitle}</Text>
    </View>
  );
};

const CourseList = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const getCourses = async () => {
      try {
        const response = await fetch(
          'http://0c3f024331fb.ngrok.io/api/courses/'
        );
        const json = await response.json();
        setCourses(json);
      } catch (e) {
        console.log(e);
      }
    };
    getCourses();
  }, []);

  const ItemSeparator = () => <View style={styles.separator} />;

  return (
    <View style={styles.container}>
      <AppBar title='Kurssit' />
      <FlatList
        data={courses}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <ListItem item={item} />}
        ItemSeparatorComponent={ItemSeparator}
      />
    </View>
  );
};

export default CourseList;

const window = Dimensions.get('window');

const styles = StyleSheet.create({
  separator: {
    height: 1,
    width: window.width,
    backgroundColor: 'black',
  },
  item: {
    borderStyle: 'solid',
    borderWidth: 1,
    height: 60,
    width: window.width,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  itemText: {
    marginLeft: 10,
  },
  itemTextBold: {
    marginLeft: 10,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
  },
  headerBar: {
    height: 40,
    backgroundColor: '#f0951f',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: 'white',
  },
});
